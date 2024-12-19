import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { engLocalizedStrings } from "utils/localizedStrings/english";
import { VnLocalizedStrings } from "utils/localizedStrings/vietnam";

const resources = {
  vi: { translation: VnLocalizedStrings },
  en: { translation: engLocalizedStrings },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "vi",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
