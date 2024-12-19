import { ConfigProvider, Skeleton } from "antd";
import { MenuConfigModel } from "api/repositories/sidebarMenu/model/SidebarMenuConfigModel";
import PrivateRoute from "components/layoutComponent/PrivateRoute";
import { AuthenticationContext } from "context/AuthenticationContext";
import { focusHandling } from "cruip-js-toolkit";
import AppPages from "navigations/AppPages";
import GeneralFeature from "pages/generals/views/GeneralFeature";
import { ReactNode, Suspense, useEffect, useMemo } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { colorFormat } from "utils/format/ColorFormat";
import Login from "./pages/login/Login";
import NotFound from "./pages/notFound/NotFound";
import ChangePasswordFeature from "pages/changePassword/views/ChangePasswordFeature";

function App() {
  const location = useLocation();
  const { menuConfig, language, setLanguage } = AuthenticationContext();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage!(savedLanguage);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", language!);
    }
  }, [language]);

  const mapMenuToRoutes = (menu: MenuConfigModel) => {
    const Components = AppPages?.getPage(menu?.componentName);
    return (
      <PrivateRoute exact path={menu?.path} key={menu?.path}>
        <Suspense
          fallback={
            <Skeleton active paragraph={{ rows: 5 }} className="px-5 mt-4" />
          }
        >
          <Components />
        </Suspense>
      </PrivateRoute>
    );
  };

  const routeRendering = useMemo(() => {
    let routes: Array<ReactNode> = [];
    menuConfig?.menu?.forEach((menu) => {
      routes.push(mapMenuToRoutes(menu));
      if (menu.subMenu?.length > 0) {
        menu.subMenu.forEach((subMenu) => {
          routes.push(mapMenuToRoutes(subMenu));
        });
      }
    });
    return routes;
  }, [menuConfig]);

  const pageRendering = () => {
    if (typeof window === undefined) {
      return (
        <div className="loader">
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--text"></div>
        </div>
      );
    } else {
      return (
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: colorFormat?.Blue,
              colorError: colorFormat?.Red_Dark,
            },
            components: {
              Menu: {
                itemColor: colorFormat?.Black,
                itemBg: "transparent",
                subMenuItemBg: "transparent",
                itemSelectedColor: colorFormat?.Blue,
                itemSelectedBg: "transparent",
                itemActiveBg: "transparent",
              },
            },
          }}
        >
          <PrivateRoute exact path={"/"} key={"generals"}>
            <Suspense
              fallback={
                <Skeleton
                  active
                  paragraph={{ rows: 5 }}
                  className="px-5 mt-4"
                />
              }
            >
              <GeneralFeature />
            </Suspense>
          </PrivateRoute>
          <PrivateRoute exact path={"/change-password"} key={"changePass"}>
            <Suspense
              fallback={
                <Skeleton
                  active
                  paragraph={{ rows: 5 }}
                  className="px-5 mt-4"
                />
              }
            >
              <ChangePasswordFeature />
            </Suspense>
          </PrivateRoute>
          {routeRendering}
        </ConfigProvider>
      );
    }
  };

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
    focusHandling(null);
  }, [location.pathname]);

  return (
    <Switch>
      <Route exact path="/login" component={Login}></Route>
      <>{pageRendering()}</>
      <Route path="/404" component={NotFound} />
      <Redirect from="*" to="/404" />
    </Switch>
  );
}

export default App;
