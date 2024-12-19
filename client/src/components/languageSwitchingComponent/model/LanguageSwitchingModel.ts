import { Dispatch, SetStateAction } from "react";

export class LanguageSwitchingModel {
  data: {
    language: string;
    setLanguage: Dispatch<SetStateAction<string>>;
    color: string
  };
}
