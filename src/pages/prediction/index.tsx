/* @jsxImportSource @emotion/react */
import useCurrentPath from '@/hooks/useCurrentPath';
import { Fragment, type FC, type ReactElement } from 'react';
import Staff from './staff';
import Wealth from './wealth';
import Convey from './convey';
import Production from './production';
import Sale from './sale';
import EmptyPage from '@/components/EmptyPage';

const prediction: FC = (): ReactElement => {

  const { firstLevelPathKey } = useCurrentPath()

  return (
    <Fragment>
      {
        firstLevelPathKey === "staff" ?
          <Staff /> : firstLevelPathKey === "wealth" ?
            <Wealth /> : firstLevelPathKey === "convey" ?
              <Convey /> : firstLevelPathKey === "production" ?
                <Production /> : firstLevelPathKey === "sale" ?
                  <Sale /> : <EmptyPage />
      }
    </Fragment>
  )
}

export default prediction;