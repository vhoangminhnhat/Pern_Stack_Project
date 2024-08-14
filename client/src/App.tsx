import { Skeleton } from "antd";
import { HOST_MENUS } from "api/repositories/routes/Routes";
import { MenuConfigModel } from "api/repositories/sidebar/model/SidebarConfigModel";
import { AppContextConfig } from "global/context/AppContext";
import MainLayout from "layout/mainLayout/MainLayout";
import AppPages from "layout/navigation/AppPages";
import { ReactNode, Suspense, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  const { isAuthen, config } = AppContextConfig();

  const mapMenuItemToRoute = (menu: MenuConfigModel): any => {
    const Component = AppPages.getPage(menu.componentName);
    return (
      <Route
        key={menu.path}
        path={menu.path}
        element={
          <Suspense fallback={<Skeleton active />}>
            <Component />
          </Suspense>
        }
      />
    );
  };

  const routes = useMemo(() => {
    let routes: Array<ReactNode> = [];
    config?.menu?.forEach((menu) => {
      routes.push(mapMenuItemToRoute(menu));

      //Temp Limit depth 1
      if (menu.subMenu?.length > 0) {
        menu.subMenu.forEach((subMenu) => {
          routes.push(mapMenuItemToRoute(subMenu));
        });
      }
    });
    return routes;
  }, [config]);

  const renderHostRoutes = () => {
    return (
      <Routes>
        {HOST_MENUS.map((menu: MenuConfigModel) => {
          const Component = AppPages.getPage(menu.componentName);
          return (
            <Route
              key={menu.path}
              path={menu.path}
              element={
                <Suspense fallback={<Skeleton active />}>
                  <Component />
                </Suspense>
              }
            />
          );
        })}
      </Routes>
    );
  };

  const renderContent = () => {
    if (!isAuthen) {
      return renderHostRoutes();
    } else if (!config?.menu) {
      return <Skeleton active />;
    }

    return (
      <MainLayout>
        <Routes>{routes}</Routes>
      </MainLayout>
    );
  };
  return <div className="App">{renderContent()}</div>;
}

export default App;
