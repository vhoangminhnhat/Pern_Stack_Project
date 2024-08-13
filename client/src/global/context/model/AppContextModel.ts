import { Dispatch, SetStateAction } from "react";

export class AppContextModel {
    onLogout: () => void;
    isAuthen: boolean;
    setIsAuthen: Dispatch<SetStateAction<boolean>>;
    token: string;
    setToken: Dispatch<SetStateAction<string>>
}