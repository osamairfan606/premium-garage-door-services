import { Route, Routes, useLocation } from 'react-router-dom';
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import { appRoutes } from './routes';
import Layout from './components/layout/Layout';
import NotFound from './pages/NotFound';

export default function App() {
  const location = useLocation();
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
        <Layout>
          {/* Keyed by path so each page re-runs its entrance animation on navigation. */}
          <Routes location={location} key={location.pathname}>
            {appRoutes.map(r => (
              <Route key={r.path} path={r.path} element={r.element} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </MotionConfig>
    </LazyMotion>
  );
}
