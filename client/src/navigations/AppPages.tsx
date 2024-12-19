import Notfound from "pages/notFound/NotFound";
import { lazy } from "react";

class AppPages {
  static PageKeys: Record<string, React.LazyExoticComponent<React.FC<any>>> = {
    GeneralsFeature: lazy(
      () => import("pages/generalFeature/views/GeneralFeature")
    ),
    ClassFeature: lazy(() => import("pages/classFeature/views/ClassFeature")),
    ArticleFeature: lazy(
      () => import("pages/articleManagement/views/ArticleManagementFeature")
    ),
  };

  static getPage(key: string): any {
    return this.PageKeys[key] || Notfound;
  }
}

export default AppPages;
