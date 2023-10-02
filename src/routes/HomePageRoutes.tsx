import { Suspense, memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from '@/components/Loading';
import EmptyPage from '@/components/EmptyPage';
import useLazyRoutes from '@/hooks/useLazyRoutes';
import { routesConfig } from './routesConfig';
import type { FC, ReactElement } from 'react';

const HomePageRouters: FC = (): ReactElement => {
  const lazyRoutes = useLazyRoutes(routesConfig);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {lazyRoutes.map(({ pathname, Component }) => {
          return <Route path={pathname} element={<Component />} key={pathname} />;
        })}
        <Route path="*" element={<EmptyPage />} />
      </Routes>
    </Suspense>
  );
};

export default memo(HomePageRouters);