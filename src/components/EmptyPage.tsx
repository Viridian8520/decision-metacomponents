/* @jsxImportSource @emotion/react */
import { Empty } from 'antd';
import type { FC, ReactElement } from 'react';

const EmptyPage: FC = (): ReactElement => (
  <Empty
    css={{
      position: 'absolute',
      top: '40%',
      left: '50%',
    }}
    description='暂无数据，请点击侧边栏！'
  />
)

export default EmptyPage;