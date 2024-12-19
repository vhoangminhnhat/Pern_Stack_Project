import { useEffect, useState } from "react";
import { colorFormat } from "utils/format/ColorFormat";

const useThemes = () => {
  const [primaryColor, setPrimaryColor] = useState<string>("");
  const [lightPrimaryColor, setLightPrimaryColor] = useState<string>("");
  const [sideBarColor, setSideBarColor] = useState<string>("")

  useEffect(() => {
    setPrimaryColor(colorFormat?.Blue);
    setLightPrimaryColor(colorFormat?.Blue);
    setSideBarColor(colorFormat?.Slate)
  }, []);

  return {
    primaryColor,
    lightPrimaryColor,
    sideBarColor,
    setSideBarColor,
    setPrimaryColor,
    setLightPrimaryColor,
  };
};

export default useThemes;
