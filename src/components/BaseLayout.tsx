/* @jsxImportSource @emotion/react */
import { useState, useRef } from 'react';
import { Layout, Menu, Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import BackToTopButton from './BackToTopButton';
import HomePageRouters from '@/routes/HomePageRoutes';
import { meunItems } from '@/routes/routesConfig';
import useCurrentPath from '@/hooks/useCurrentPath';
import type { FC, ReactElement } from 'react';

const { Header, Footer, Sider, Content } = Layout;

const BaseLayout: FC = (): ReactElement => {
  const [collapsed, setCollapsed] = useState(false);  // 侧边栏的展示与隐藏
  const contentElement = useRef<HTMLElement>(null);  // 内容区

  let { firstLevelPathValue, secondaryPathValue } = useCurrentPath();  // 当前路由路径
  if (firstLevelPathValue === undefined) {
    firstLevelPathValue = '';
    secondaryPathValue = '';
  } else {
    firstLevelPathValue = `/${firstLevelPathValue}`;
    if (secondaryPathValue === undefined) {
      secondaryPathValue = '';
    } else {
      secondaryPathValue = `/${secondaryPathValue}`;
    }
  }

  return (
    <Layout
      css={{ height: '100%', overflow: 'hidden' }}
    >
      <Header
        css={{
          display: 'flex',
          alignItems: 'center',
          height: '8%',
          lineHeight: '8%',
          fontSize: '20px',
          borderBottom: '1px solid #EDEDED',
          backgroundColor: '#F5F5F5'
        }}
      >
        决策元构件
        <div
          css={{
            margin: '0 50px',
            fontSize: '12px',
          }}
        >
          <span
            css={{
              color: '#9A9A9A',
            }}
          >{`首页${firstLevelPathValue}`}</span>
          <span>{secondaryPathValue}</span>
        </div>
      </Header>
      <Layout>
        <Sider
          css={{
            overflowY: 'auto',
          }}
          theme='light' trigger={null} collapsible collapsed={collapsed}
        >
          <Menu mode='inline' items={meunItems} />
        </Sider>
        <Content
          ref={contentElement}
          css={{
            padding: '10px',
            overflow: 'auto',
          }}
        >
          <HomePageRouters />
          <BackToTopButton targetElement={contentElement.current as HTMLElement} />
        </Content>
      </Layout>
      <Footer
        css={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          bottom: 0,
          height: '5%',
          borderTop: '1px solid #EDEDED'
        }}
      >
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? '展示侧边栏' : '隐藏侧边栏'}
        </Button>
      </Footer>
    </Layout>
  )
}

export default BaseLayout