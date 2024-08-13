export class UsersResponseModel {
    name?: string;
    email?: string;
    phone?: string;
    roles?: string;
    address?: string;
    description?: string;
};

export class UsersRequestModel {
    email?: string;
    phone?: string;
    roles?: string
}