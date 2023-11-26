/* @jsxImportSource @emotion/react */
import { Spin } from 'antd';
import { center_flex } from '@/utils/commonStyles';
import type { FC, ReactElement } from 'react';

const Loading: FC = (): ReactElement => (
  <div
    css={{
      ...center_flex,
      height: '97%',
    }}
  >
    <Spin size='large'>
      {/* 消除警告：Warning: [antd: Spin] `tip` only work in nest pattern. */}
      <></>
    </Spin>
  </div>
)


export default Loading;