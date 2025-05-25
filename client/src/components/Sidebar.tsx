import { Menu } from "antd";
import { MenuConfigModel } from "api/repositories/sidebarMenu/model/SidebarMenuConfigModel";
import { AuthenticationContext } from "context/AuthenticationContext";
import useThemes from "hooks/useThemes";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import SidebarLogo from "../assets/images/hcmus.png";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { menuConfig, language, setLanguage } = AuthenticationContext();
  const { pathname } = location;
  const page = pathname.split("/")[1];
  const subPage = pathname.split("/")[2];
  const trigger = useRef(null);
  const sidebar = useRef(null);
  const navigate = useHistory();
  const [defaultOpenKeys, setDefaultOpenKeys] = useState([`/${page}`]);
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState([pathname]);
  const { sideBarColor } = useThemes();

  const getMenuItem = (
    label: string,
    key: string,
    icon: ReactNode,
    children?: any,
    type?: any
  ) => {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  };

  const sideNav = useMemo(() => {
    let sideNav = menuConfig?.menu.map((menu) => {
      return {
        item: new MenuConfigModel(
          menu.name,
          menu.path,
          menu.componentName,
          menu?.icon
        ),
        children:
          menu.subMenu?.length > 0
            ? menu?.subMenu.map(
                (subMenu) =>
                  new MenuConfigModel(
                    subMenu.name,
                    subMenu.path,
                    subMenu.componentName,
                    subMenu?.icon
                  )
              )
            : undefined,
      };
    });
    return sideNav;
  }, [menuConfig]);

  const itemsNav = useMemo(() => {
    return sideNav?.map((nav) => {
      return getMenuItem(
        nav.item.name,
        nav.item.path,
        nav.item.icon,
        nav.children?.map((subNav) => {
          return getMenuItem(subNav.name, subNav.path, subNav.icon);
        })
      );
    });
  }, [sideNav]);

  const onClickMenuItem = (e) => {
    navigate.push(e.key);
  };

  // close on click outside

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebar.current && !sidebar.current.contains(event.target)) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebar]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="xl:w-[270px] w-0">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-opacity-30 z-40 xl:hidden xl:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        ref={sidebar}
        id="sidebar"
        className={`absolute z-50 left-0 top-0 xl:static xl:left-auto lg:top-auto xl:translate-x-0 transform h-screen overflow-y-scroll xl:overflow-y-auto no-scrollbar w-[270px] flex-shrink-0 bg-white px-2 py-4 transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-[270px]"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex flex-col justify-between mb-4 pr-2 sm:px-1">
          {/* Close button */}
          <button
            ref={trigger}
            className="xl:hidden text-gray-500 hover:text-gray-400 mb-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink exact to="/dashboard" className="block">
            <div
              className="flex flex-col justify-center items-center object-contain rounded-lg px-4 py-2"
              style={{ backgroundColor: sideBarColor }}
            >
              <img
                src={SidebarLogo}
                height={40}
                width={100}
                alt="sidebarLogo"
              />
            </div>
          </NavLink>
        </div>
        <Menu
          mode="inline"
          items={itemsNav}
          onClick={onClickMenuItem}
          defaultOpenKeys={defaultOpenKeys}
          defaultSelectedKeys={defaultSelectedKeys}
          style={{ borderInlineEnd: "none", fontWeight: 500 }}
        />
      </div>
    </div>
  );
}

export default Sidebar;
