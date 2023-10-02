import { Link } from 'react-router-dom';
import { firstLevelMenuEnum, secondaryMenuEnum } from '@/utils/constant';
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];
export interface RoutesConfigInterface {
  pathname: string;
  componentPath: string;
}

const firstLevelMenuItems = Object.keys(firstLevelMenuEnum);  // 一级菜单项
const secondaryMenuItems = Object.keys(secondaryMenuEnum);  // 二级菜单项

/**
 * 获取菜单项
 * @param label 显示内容
 * @param key 唯一标识符
 * @param children 子菜单列表
 * @param icon 图标
 * @returns 菜单项
 */
const getMenuItem = (
  label: React.ReactNode,
  key: React.Key,
  children?: MenuItem[],
  icon?: React.ReactNode,
): MenuItem => (
  {
    key,
    icon,
    children,
    label,
  } as MenuItem
);

/**
 * 获取一级菜单下的二级菜单
 * @param firstLevelMenuKey 一级菜单的唯一标识符
 * @returns 二级菜单
 */
const getSecondaryMenuItem = (firstLevelMenuKey: string): MenuItem[] => (
  secondaryMenuItems.map(secondaryMenuItem => (
    getMenuItem(
      <Link to={`${firstLevelMenuKey}/${secondaryMenuItem}`} >{secondaryMenuEnum[secondaryMenuItem as keyof typeof secondaryMenuEnum]}</Link>,
      `${firstLevelMenuKey}/${secondaryMenuItem}`,
    )
  ))
)

/**
 * 获取页面组件路径
 * @param name 组件名
 * @returns 页面组件路径
 */
const getComponentPath = (name: string) => `/src/pages/${name}/index.tsx`;

// 菜单配置项
const meunItems: MenuItem[] = [];
firstLevelMenuItems.forEach(key => {
  const label = firstLevelMenuEnum[key as keyof typeof firstLevelMenuEnum];
  meunItems.push(getMenuItem(label, key, getSecondaryMenuItem(key)))
})
export { meunItems };

// 路由配置
const routesConfig: RoutesConfigInterface[] = [];
firstLevelMenuItems.forEach(firstLevelMeniItem => {
  const routeConfig = secondaryMenuItems.map(secondaryMenuItem => {
    return {
      pathname: `${firstLevelMeniItem}/${secondaryMenuItem}`,
      componentPath: getComponentPath(secondaryMenuItem),
    }
  });
  routesConfig.push(...routeConfig);
})
export { routesConfig };