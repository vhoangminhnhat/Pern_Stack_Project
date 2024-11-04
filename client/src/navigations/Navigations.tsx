import { lazy, ReactNode } from "react";
const HomeFeature = lazy(
  () => import("features/homeFeature/views/HomeFeature")
);

class Navigations {
  static appPages: Array<{
    path: string;
    component: ReactNode;
  }> = [
    {
      component: <HomeFeature />,
      path: "/home",
    },
  ];
}

export default Navigations;
