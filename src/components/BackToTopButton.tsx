import { FloatButton } from 'antd';
import type { ReactElement } from 'react';

/**
 * 渲染回到顶部按钮
 * @param props.targetElement 需要监听其滚动事件的元素
 * @returns 回到顶部按钮
 */
const BackToTopButton = (props: { targetElement: HTMLElement }): ReactElement => {
  const { targetElement } = props;

  return <FloatButton.BackTop target={() => targetElement} />
}

export default BackToTopButton;