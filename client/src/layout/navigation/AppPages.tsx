import { lazy } from "react";

class AppPages {
  static PAGES: { [key: string]: any } = {
    HotelsFeature: lazy(
      () => import("features/hotelManagement/views/HotelManagementFeature")
    ),
  };

  static getPage(key: string): any {
    return this.PAGES[key];
  }
}

export const DEFAULT_PAGES = {
  HotelsFeature: lazy(
    () => import("features/hotelManagement/views/HotelManagementFeature")
  ),
};

export default AppPages;
