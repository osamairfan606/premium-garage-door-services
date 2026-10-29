import { posts, loaders } from 'virtual:blog-posts';
import type { ImageName } from '../config/images.generated';
import type { LocationId } from '../config/locations';

/**
 * Blog posts are Markdown files in content/blog/. See docs/blog-guide.md.
 * They are parsed and validated at build time by vite-plugin-blog.ts: the browser gets only the
 * post list, and each post's HTML is loaded on that post's page.
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
  readingMinutes: number;
  /** Present only in the SSR build; in the browser use loadPostHtml(). */
  html?: string;
}

export const blogPosts = posts as BlogPost[];

export const getPost = (slug: string) => blogPosts.find(p => p.slug === slug);

/** Loads a post's HTML in the browser (a small separate chunk per post). */
export const loadPostHtml = (slug: string): Promise<string> =>
  getPost(slug)?.html !== undefined ? Promise.resolve(getPost(slug)!.html!) : (loaders[slug]?.() ?? Promise.resolve(''));

export const postsForService = (slug: string, limit = 3) => blogPosts.filter(p => p.services.includes(slug)).slice(0, limit);

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
