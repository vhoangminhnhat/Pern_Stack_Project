import { UsersResponseModel } from "./Users";

export class LoginRequestModel {
    userName?: string;
    password?: string;
};

export class LoginResponseModel {
    jwt?: string;
    user?: UsersResponseModel
}

export class SignUpRequestModel {
    userName?: string;
    password?: string;
    email?: string;
    phone?: string;
    roles?: string;
};

export class SignUpResponseModel {
    user?: UsersResponseModel
}