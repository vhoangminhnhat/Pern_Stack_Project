import { Button, Col, ConfigProvider, Drawer, Layout, Row } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Routers } from "api/repositories/routes/Routes";
import { AppContextConfig } from "global/context/AppContext";
import { colorFormat } from "global/GlobalStyles";
import Sidebar from "layout/sidebar/Sidebar";
import { ReactNode, useMemo, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { useLocation } from "react-router-dom";

const getMenuItem = (
  label: string,
  key: string,
  icon: ReactNode = <></>,
  children: any = null,
  type: any = null
) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
};

const MainLayout = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const { pathname } = useLocation();
  const page = pathname.split("/")[1];
  const { isAuthen, config } = AppContextConfig();

  const sideNav = useMemo(() => {
    let sideNav = config.menu.map((menu) => {
      return {
        item: new Routers(
          menu.path,
          menu.name,
          menu.path,
          menu.icon,
          menu.componentName
        ),
        children:
          menu.subMenu?.length > 0
            ? menu.subMenu.map(
                (subMenu) =>
                  new Routers(
                    subMenu.path,
                    subMenu.name,
                    subMenu.path,
                    subMenu.icon,
                    subMenu.componentName
                  )
              )
            : undefined,
      };
    });
    return sideNav;
  }, [config]);

  const itemsNav = useMemo(() => {
    return sideNav.map((nav) => {
      return getMenuItem(
        nav.item.title,
        nav.item.path,
        nav.item.icon,
        nav.children?.map((subNav: any) => {
          return getMenuItem(subNav.title, subNav.path, subNav.icon);
        })
      );
    });
  }, [sideNav]);

  const renderDrawerMode = () => {
    return (
      <Drawer
        title={false}
        placement={"left"}
        closable={false}
        onClose={() => setVisible(false)}
        open={visible}
        key={"left"}
        width={275}
      >
        <Layout style={{ width: "100%" }}>
          <Sider
            collapsedWidth="0"
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
            trigger={null}
            width="100%"
            theme="light"
          >
            <Sidebar sideNav={sideNav} itemsNav={itemsNav} />
          </Sider>
        </Layout>
      </Drawer>
    );
  };

  const renderNormalMode = () => {
    return (
      <>
        <Sider
          collapsedWidth="0"
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          trigger={null}
          width={260}
          theme="light"
          className={"sidebar-responsive"}
          style={{ backgroundColor: "white" }}
        >
          <Sidebar sideNav={sideNav} itemsNav={itemsNav} />
        </Sider>

        <Layout
          style={{ minHeight: "80vh", overflowY: "auto", overflowX: "hidden" }}
        >
          <Content>{children}</Content>
        </Layout>
      </>
    );
  };

  return (
    <>
      <Row className="drawer-responsive" style={{ backgroundColor: "white" }}>
        <Col span={24}>
          <Button
            type="link"
            className=""
            onClick={() => setVisible(!visible)}
            icon={<IoMenu style={{ color: "black", fontSize: 20 }} />}
            size="large"
          />
        </Col>
      </Row>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: colorFormat?.Dark_Blue,
          },
        }}
      >
        <Layout
          style={{
            flex: 1,
            minHeight: "100vh",
          }}
        >
          {renderDrawerMode()}
          {renderNormalMode()}
        </Layout>
      </ConfigProvider>
    </>
  );
};

export default MainLayout;
