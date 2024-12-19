import i18n from "i18n/i18n";

const translateLanguageHooks = (value: string) => {
  switch (value) {
    case "vi":
      return i18n.changeLanguage("vi");
    case "en":
      return i18n.changeLanguage("en");
    default:
      return i18n.changeLanguage("vi");
  }
};

export default translateLanguageHooks;
