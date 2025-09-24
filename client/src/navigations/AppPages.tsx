import Notfound from "pages/notFound/NotFound";
import { lazy } from "react";

class AppPages {
  static PageKeys: Record<string, React.LazyExoticComponent<React.FC<any>>> = {
    GeneralsFeature: lazy(
      () => import("pages/generalFeature/views/GeneralInfoFeature")
    ),
    ClassFeature: lazy(() => import("pages/classFeature/views/ClassFeature")),
    ArticleFeature: lazy(
      () => import("pages/articleManagement/views/ArticleManagementFeature")
    ),
    StudentManagementFeature: lazy(
      () => import("pages/studentManagement/views/StudentManagementFeature")
    ),
    TeacherManagementFeature: lazy(
      () => import("pages/teacherManagement/views/TeacherManagementFeature")
    ),
    SubjectManagementFeature: lazy(
      () => import("pages/subjectManagement/views/SubjectManagementFeature")
    ),
    ScheduleManagementFeature: lazy(
      () => import("pages/scheduleManagement/views/ScheduleManagementFeature")
    ),
  };

  static getPage(key: string): any {
    return this.PageKeys[key] || Notfound;
  }
}

export default AppPages;
