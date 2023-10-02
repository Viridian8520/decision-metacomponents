import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import BaseLayout from '@/components/BaseLayout';
import Loading from '@/components/Loading';
import type { FC, ReactElement } from 'react';

const App: FC = (): ReactElement => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path='*' element={<BaseLayout />} />
      </Routes>
    </Suspense>
  )
}

export default App;