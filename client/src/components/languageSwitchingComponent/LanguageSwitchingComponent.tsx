import { Dropdown, MenuProps } from "antd";
import english from "assets/images/united-kingdom.png";
import vietnam from "assets/images/vietnam.png";
import { AuthenticationContext } from "context/AuthenticationContext";
import translateLanguageHooks from "hooks/translateLanguageHooks";
import { FaAngleDown } from "react-icons/fa";
import { LanguageSwitchingModel } from "./model/LanguageSwitchingModel";

const LanguageSwitchingComponent = (props: LanguageSwitchingModel) => {
  const { language, setLanguage, color } = props?.data;
  const { getSidebar, user } = AuthenticationContext();

  const items: MenuProps["items"] = [
    {
      key: "vi",
      label: (
        <div className="flex justify-start items-center w-full">
          <div className="flex justify-center items-start">
            <img
              src={vietnam}
              alt="vi-lang"
              className="object-scale-down w-8 h-4"
            />
          </div>
          <span className="font-semibold flex justify-center item-start text-xs">
            Vietnamese
          </span>
        </div>
      ),
    },
    {
      key: "en",
      label: (
        <div className="flex justify-start items-center w-full">
          <div className="flex justify-center items-start">
            <img
              src={english}
              alt="en-lang"
              className="object-scale-down w-8 h-4"
            />
          </div>
          <span className="font-semibold flex justify-center item-start text-xs">
            English
          </span>
        </div>
      ),
    },
  ];

  const onClick: MenuProps["onClick"] = async ({ key }) => {
    setLanguage(key);
    translateLanguageHooks(key);
    await getSidebar(user?.isAdmin, key);
  };

  return (
    <div className="flex justify-start ml-3 z-50">
      <Dropdown menu={{ items, onClick }}>
        <a className="flex" href="#">
          <div className="w-full flex justify-center items-center gap-2">
            <div className="flex justify-center items-center w-4">
              <img
                src={language === "vi" ? vietnam : english}
                alt={`${language}-lang`}
                className="object-scale-down w-full h-full"
              />
            </div>
            <span
              className="font-semibold flex text-base"
              style={{ color: color }}
            >
              {language === "vi" ? "Vietnamese" : "English"}
            </span>
            <FaAngleDown style={{ color: color }} />
          </div>
        </a>
      </Dropdown>
    </div>
  );
};

export default LanguageSwitchingComponent;
