import React, { memo, useCallback, useState } from "react";
import { renderRoutes } from "react-router-config";
import { logout } from '@/services/login'

import { Layout, Menu, Breadcrumb } from "antd";
import {
  PieChartOutlined,
  UserOutlined,
  FileOutlined,
  DesktopOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default memo(function Admin(props) {
  const { route } = props;

  const [collapsed, setCollapsed] = useState(false);

  // console.log("側邊欄重渲染")

  const onCollapse = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <Link
          to="/login"
          onClick={() => {
            logout().then(res => {
              console.log(res)
            })
          }}
          style={{
            height: "32px",
            margin: "16px",
            display: "flex",
            fontSize: "1.5vw",
            color: "white",
            cursor: "pointer"
          }}
        >Sign out</Link>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1">
          <Link to="/admin/workbanch">
            <PieChartOutlined />
            <span>工作台</span>
          </Link> 
          </Menu.Item>
          <Menu.Item key="2">
          <Link to="/admin/member/1">
          <DesktopOutlined />
            <span>會員管理</span>
          </Link>
            
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <UserOutlined />
                <span>文章管理</span>
              </span>
            }
          >
            <Menu.Item key="3">
              <Link to="/admin/addArticle">
                <span>添加文章</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/admin/articleList/1">
                <span>文章列表</span>
              </Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="9">
            <Link to="/admin/commentBoard/1">
            <FileOutlined />
              <span>留言管理</span>
            </Link>  
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        {/* <Header style={{ background: "#fff", padding: 0 }} /> */}
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {/* <Breadcrumb.Item>後台管理</Breadcrumb.Item>
            <Breadcrumb.Item>Ｆ</Breadcrumb.Item> */}
          </Breadcrumb>
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            {renderRoutes(route.routes)}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>CoderLand.com</Footer>
      </Layout>
    </Layout>
  );
});
