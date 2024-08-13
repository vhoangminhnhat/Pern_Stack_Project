import { Col, ConfigProvider, Menu, Modal, Row } from "antd";
import { Routers } from "api/repositories/routes/Routes";
import { AppContextConfig } from "global/context/AppContext";
import { colorFormat } from "global/GlobalStyles";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { strings } from "utils/localizedStrings";

const Sidebar = ({ sideNav, itemsNav, onClick }: any) => {
  const { pathname } = useLocation();
  let path = pathname.replace?.("/", "");
  const { onLogout } = AppContextConfig();
  const navigate = useNavigate();

  const [defaultOpenKeys, setDefaultOpenKeys] = useState<string[]>([
    `/${pathname?.split("/")?.[1]}`,
  ]);
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState<string[]>([
    pathname,
  ]);

  useEffect(() => {
    onClickMenuItem({ key: path });
  }, []);

  const getItem = useCallback(
    (path: string): Routers | undefined => {
      let foundedItem: any;
      sideNav.forEach((e: any) => {
        if (e.item.path.includes(path)) {
          return (foundedItem = e);
        }

        e.children?.forEach((e: any) => {
          if (e.path.includes(path)) {
            return (foundedItem = e);
          }
        });
      });
      return foundedItem;
    },
    [sideNav]
  );

  const onClickMenuItem = (e: any) => {
    let path = e.key;
    let item = getItem(path);

    onClick?.(item);
    if (e.key === "/sign-out") {
      return Modal.confirm({
        title: strings.GlobalMessage.LogoutConfirmed,
        okText: strings.GlobalLabels.Confirm,
        okType: "danger",
        okCancel: true,
        autoFocusButton: "cancel",
        cancelText: strings.GlobalLabels.Cancel,
        onOk: () => onLogout(),
      });
    } else {
      navigate(e.key);
    }
  };

  return (
    <>
      <Row gutter={[4, 0]} style={{ padding: "10% 12%" }}>
        <Col
          span={24}
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          {/* <Image
            src={require("assets/images/logo_mobifone.png")}
            alt="sidebarLogo"
            preview={false}
          /> */}
        </Col>
      </Row>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemHoverBg: colorFormat.Dark_Blue,
              subMenuItemBg: colorFormat.Dark_Blue,
            },
          },
        }}
      >
        <Menu
          style={{
            background: "transparent",
            borderInlineEnd: "none",
          }}
          theme="light"
          mode="inline"
          onClick={onClickMenuItem}
          defaultSelectedKeys={defaultSelectedKeys}
          defaultOpenKeys={defaultOpenKeys}
          items={itemsNav}
        />
      </ConfigProvider>
    </>
  );
};

export default Sidebar;
