import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import App from './App';
import { allRoutePaths } from './routes';
import { site } from './config/site';
import { services } from './config/services';
import { locationList } from './config/locations';
import { firstTimeOffer } from './config/content';
import { blogPosts } from './lib/blog';

export { allRoutePaths, site, services, locationList, firstTimeOffer, blogPosts };

export function render(url: string) {
  const helmetContext: { helmet?: HelmetServerState } = {};
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </StaticRouter>
    </HelmetProvider>,
  );
  const h = helmetContext.helmet!;
  const head = [h.title.toString(), h.priority.toString(), h.meta.toString(), h.link.toString(), h.script.toString()].join('\n');
  return { html, head };
}
