import { useLocation } from 'react-router-dom';
import { getLocation, type Location } from '../config/locations';

/** Returns the service location for the current route (/locations/:id/...), or undefined on general pages. */
export function useActiveLocation(): Location | undefined {
  const { pathname } = useLocation();
  const match = pathname.match(/^\/locations\/([^/]+)/);
  return getLocation(match?.[1]);
}
