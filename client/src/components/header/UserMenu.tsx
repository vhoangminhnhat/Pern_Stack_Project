import adminAvatar from "assets/images/admin.png";
import UserAvatar from "assets/images/default-avatar.png";
import { AuthenticationContext } from "context/AuthenticationContext";
import { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Transition from "utils/Transition";

const UserMenu = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, info, localStrings } = AuthenticationContext();
  const trigger = useRef(null);
  const history = useHistory();
  const dropdown = useRef(null);

  const clickHandler = ({ target }) => {
    if (
      !dropdownOpen ||
      dropdown.current?.contains(target) ||
      trigger.current?.contains(target)
    )
      return;
    setDropdownOpen(false);
  };

  // close on click outside
  useEffect(() => {
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const onLogout = () => {
    setDropdownOpen(!dropdownOpen);
    localStorage.clear();
  };

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <img
          className="w-8 h-8 rounded-full"
          src={user?.isAdmin === true ? adminAvatar : UserAvatar}
          width="32"
          height="32"
          alt="User"
        />
        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-sm font-medium text-white">
            {user?.fullName}
          </span>
          <svg
            className="w-3 h-3 flex-shrink-0 ml-1 fill-current text-gray-100"
            viewBox="0 0 12 12"
          >
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <Transition
        className="origin-top-right z-50 absolute top-full right-0 min-w-44 bg-white border border-gray-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        appear={undefined}
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200">
            <div className="font-medium text-gray-800">{user?.fullName}</div>
            {/* <div className="text-xs text-gray-500 italic">
              {user?.isAdmin
                ? "Admin"
                : user.isModerator
                ? `${info[0]?.toUpperCase() + info?.slice(1)}`
                : ""}
            </div> */}
            <div className="text-xs text-gray-500 italic">{user?.email}</div>
          </div>
          <ul>
            <li>
              <Link
                className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                to="/change-password"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {localStrings.ChangePassword.Title}
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                to="/login"
                onClick={onLogout}
              >
                {localStrings.GlobalLabels.Logout}
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
};

export default UserMenu;
