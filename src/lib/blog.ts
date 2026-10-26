import { marked } from 'marked';
import { imageManifest, type ImageName } from '../config/images.generated';
import type { LocationId } from '../config/locations';

/**
 * Blog posts are Markdown files in content/blog/. See docs/blog-guide.md.
 * Files starting with "_" (like _template.md) and posts with `draft: true` are not published.
 * The build fails with a clear message if a post is missing required fields, so a broken post
 * can never be deployed.
 */
export interface BlogPost {
  slug: string;
  title: string;
  /** Meta description, 120–160 characters. */
  description: string;
  /** YYYY-MM-DD */
  date: string;
  updated?: string;
  author: string;
  image?: ImageName;
  imageAlt: string;
  tags: string[];
  /** Service page slugs this post supports; it is listed under "Related articles" on those pages. */
  services: string[];
  /** Optional: shows the post's call-to-action with that city's number only. */
  city?: LocationId;
  html: string;
  readingMinutes: number;
}

const files = import.meta.glob('../../content/blog/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

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

function load(): BlogPost[] {
  const posts: BlogPost[] = [];
  for (const [path, raw] of Object.entries(files)) {
    const file = path.split('/').pop()!;
    if (file.startsWith('_')) continue;
    const { data, body } = parseFrontmatter(raw, file);
    if (data.draft === 'true') continue;
    const slug = file.replace(/\.md$/, '');
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) throw new Error(`Blog post ${file}: file name must be lowercase-words-with-dashes.md`);
    for (const k of ['title', 'description', 'date']) {
      if (!data[k]) throw new Error(`Blog post ${file}: "${k}:" is required in the frontmatter`);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date)) throw new Error(`Blog post ${file}: date must look like 2026-10-22`);
    if (data.image && !(data.image in imageManifest)) {
      throw new Error(`Blog post ${file}: image "${data.image}" not found. Use one of: ${Object.keys(imageManifest).filter(n => !n.startsWith('brand') && !n.startsWith('logo')).join(', ')}`);
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
      image: (data.image as ImageName) || undefined,
      imageAlt: data.imageAlt || data.title,
      tags: list(data.tags),
      services: list(data.services),
      city: (data.city as LocationId) || undefined,
      html: marked.parse(body, { async: false }) as string,
      readingMinutes: Math.max(1, Math.round(words / 220)),
    });
  }
  return posts.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
}

export const blogPosts = load();

export const getPost = (slug: string) => blogPosts.find(p => p.slug === slug);

export const postsForService = (slug: string, limit = 3) => blogPosts.filter(p => p.services.includes(slug)).slice(0, limit);

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
