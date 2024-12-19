// import SearchModal from './header/SearchModal';
import { AuthenticationContext } from "context/AuthenticationContext";
import Notifications from "./header/Notifications";
// import Help from './header/Help';
import { lazy } from "react";
import UserMenu from "./header/UserMenu";
const LanguageSwitchingComponent = lazy(
  () => import("./languageSwitchingComponent/LanguageSwitchingComponent")
);

function Header({ sidebarOpen, setSidebarOpen }) {
  const { language, setLanguage } = AuthenticationContext();
  return (
    <header className="sticky top-0 bg-blue-800 border-b border-gray-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex">
            {/* Hamburger button */}
            <button
              className="text-white hover:text-white xl:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center">
            {/* <SearchModal /> */}
            <Notifications />
            <LanguageSwitchingComponent
              data={{
                language: language!,
                setLanguage: setLanguage!,
                color: "#ffffff",
              }}
            />
            {/* <Help /> */}
            {/*  Divider */}
            <hr className="w-px h-6 bg-blue-800 mx-3" />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
