import { useLocation } from 'react-router-dom';
import { firstLevelMenuEnum, secondaryMenuEnum } from '@/utils/constant';

interface CurrentPathInterface {
  firstLevelPathKey: string,  // 一级路由键
  firstLevelPathKeValue: string,  // 一级路由值
  secondaryPathKey: string,  // 二级路由键
  secondaryPathValue: string,  // 二级路由值
}

/**
 * 获取当前路由路径
 *
 * @return  {CurrentPathInterface}
 */
const useCurrentPath = (): CurrentPathInterface => {
  const { pathname } = useLocation();

  return {
    firstLevelPathKey: pathname.split('/')[1],
    firstLevelPathKeValue: firstLevelMenuEnum[pathname.split('/')[1] as keyof typeof firstLevelMenuEnum],
    secondaryPathKey: pathname.split('/')[2],
    secondaryPathValue: secondaryMenuEnum[pathname.split('/')[2] as keyof typeof secondaryMenuEnum],
  }
}

export default useCurrentPath;