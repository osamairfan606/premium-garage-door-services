import { useLocation } from 'react-router-dom';
import { getLocation, type Location } from '../config/locations';
import { getPost } from '../lib/blog';

/**
 * Returns the service location for the current route (/locations/:id/..., or a blog post written for one city),
 * or undefined on general pages.
 */
export function useActiveLocation(): Location | undefined {
  const { pathname } = useLocation();
  const match = pathname.match(/^\/locations\/([^/]+)/);
  if (match) return getLocation(match[1]);
  const post = pathname.match(/^\/blog\/([^/]+)/);
  return post ? getLocation(getPost(post[1])?.city) : undefined;
}
