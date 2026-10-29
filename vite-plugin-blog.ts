import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import type { Plugin } from 'vite';

/**
 * Turns content/blog/*.md into HTML at build time. See docs/blog-guide.md.
 *
 * - `virtual:blog-posts` exports the post list. In the client bundle it holds only the metadata
 *   plus a lazy loader per post, so the Markdown and the `marked` library never reach the browser.
 *   The SSR bundle (used by the prerender) also includes each post's HTML.
 * - `virtual:blog-html/<slug>` exports one post's HTML as a small separate chunk.
 *
 * Files starting with "_" (like _template.md) and posts with `draft: true` are not published.
 * The build fails with a clear message if a post is missing required fields, so a broken post
 * can never be deployed.
 */

const POSTS_ID = 'virtual:blog-posts';
const HTML_ID = 'virtual:blog-html/';

interface ParsedPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  image?: string;
  imageAlt: string;
  tags: string[];
  services: string[];
  city?: string;
  readingMinutes: number;
  html: string;
}

function parseFrontmatter(raw: string, file: string): { data: Record<string, string>; body: string } {
  const m = raw.replace(/^﻿/, '').match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error(`Blog post ${file}: missing the --- frontmatter block at the top`);
  const data: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z]+):\s*(.*)$/);
    if (kv) data[kv[1]] = kv[2].trim().replace(/^["'](.*)["']$/, '$1');
  }
  return { data, body: m[2] };
}

const list = (v?: string) => (v ?? '').replace(/^\[|\]$/g, '').split(',').map(s => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);

marked.use({
  gfm: true,
  renderer: {
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const external = /^https?:\/\//.test(href) && !href.includes('premiumdoorservices.com');
      return `<a href="${href}"${title ? ` title="${title}"` : ''}${external ? ' target="_blank" rel="noopener"' : ''}>${text}</a>`;
    },
  },
});

export default function blogPlugin(): Plugin {
  let root = process.cwd();
  const blogDir = () => path.join(root, 'content/blog');

  function imageNames(): string[] {
    const src = fs.readFileSync(path.join(root, 'src/config/images.generated.ts'), 'utf8');
    return [...src.matchAll(/^ {2}"([a-z0-9-]+)": \{/gm)].map(m => m[1]);
  }

  let cache: ParsedPost[] | null = null;

  function load(): ParsedPost[] {
    if (cache) return cache;
    const images = imageNames();
    const posts: ParsedPost[] = [];
    for (const file of fs.readdirSync(blogDir()).filter(f => f.endsWith('.md')).sort()) {
      if (file.startsWith('_')) continue;
      const { data, body } = parseFrontmatter(fs.readFileSync(path.join(blogDir(), file), 'utf8'), file);
      if (data.draft === 'true') continue;
      const slug = file.replace(/\.md$/, '');
      if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) throw new Error(`Blog post ${file}: file name must be lowercase-words-with-dashes.md`);
      for (const k of ['title', 'description', 'date']) {
        if (!data[k]) throw new Error(`Blog post ${file}: "${k}:" is required in the frontmatter`);
      }
      if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date)) throw new Error(`Blog post ${file}: date must look like 2026-10-22`);
      if (data.image && !images.includes(data.image)) {
        throw new Error(`Blog post ${file}: image "${data.image}" not found. Use one of: ${images.filter(n => !n.startsWith('brand') && !n.startsWith('logo')).join(', ')}`);
      }
      if (data.city && data.city !== 'chicago' && data.city !== 'indianapolis') throw new Error(`Blog post ${file}: city must be chicago or indianapolis`);
      const words = body.split(/\s+/).filter(Boolean).length;
      posts.push({
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        updated: data.updated || undefined,
        author: data.author || 'Premium Garage Door Services',
        image: data.image || undefined,
        imageAlt: data.imageAlt || data.title,
        tags: list(data.tags),
        services: list(data.services),
        city: data.city || undefined,
        readingMinutes: Math.max(1, Math.round(words / 220)),
        html: marked.parse(body, { async: false }) as string,
      });
    }
    cache = posts.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
    return cache;
  }

  return {
    name: 'premium-blog',
    configResolved(config) {
      root = config.root;
    },
    resolveId(id) {
      if (id === POSTS_ID || id.startsWith(HTML_ID)) return '\0' + id;
    },
    load(id, options) {
      if (id === '\0' + POSTS_ID) {
        const posts = load();
        for (const f of fs.readdirSync(blogDir())) this.addWatchFile(path.join(blogDir(), f));
        if (options?.ssr) return `export const posts = ${JSON.stringify(posts)};\nexport const loaders = {};`;
        const meta = posts.map(({ html: _html, ...rest }) => rest);
        const loaders = posts.map(p => `  ${JSON.stringify(p.slug)}: () => import(${JSON.stringify(HTML_ID + p.slug)}).then(m => m.default),`).join('\n');
        return `export const posts = ${JSON.stringify(meta)};\nexport const loaders = {\n${loaders}\n};`;
      }
      if (id.startsWith('\0' + HTML_ID)) {
        const slug = id.slice(('\0' + HTML_ID).length);
        const post = load().find(p => p.slug === slug);
        if (!post) throw new Error(`Blog post "${slug}" not found`);
        return `export default ${JSON.stringify(post.html)};`;
      }
    },
    configureServer(server) {
      // In dev, reload the page when a post is added, changed or removed.
      server.watcher.add(blogDir());
      const reload = (file: string) => {
        if (!file.startsWith(blogDir())) return;
        cache = null;
        for (const mod of [...server.moduleGraph.idToModuleMap.values()]) {
          if (mod.id?.startsWith('\0virtual:blog-')) server.moduleGraph.invalidateModule(mod);
        }
        server.ws.send({ type: 'full-reload' });
      };
      server.watcher.on('add', reload).on('change', reload).on('unlink', reload);
    },
  };
}
