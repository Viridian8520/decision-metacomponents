/* @jsxImportSource @emotion/react */
import Operation from './Operation';
import TableElement from './TableElement';
import useCurrentPath from '@/hooks/useCurrentPath';
import { earlyWarningTitle } from '@/utils/constant';
import type { FC, ReactElement } from 'react';

const earlyWarning: FC = (): ReactElement => {
  const { firstLevelPathKey } = useCurrentPath();  // 当前路由
  const title = earlyWarningTitle[firstLevelPathKey as keyof typeof earlyWarningTitle];  // 根据当前路由获取标题

  return (
    <>
      <div>
        <div
          css={{
            display: 'inline-block',
            padding: '0 20px',
            border: '1px solid #d4d4d4',
            fontSize: '16px',
            lineHeight: '36px',
            color: '#1677ff',
          }}
        >
          {title}
        </div>
        <Operation firstLevelPathKey={firstLevelPathKey} />
        <TableElement firstLevelPathKey={firstLevelPathKey} />
      </div>
    </>
  )
}

export default earlyWarning;