export class RoomsResponseModel {
    id?: string;
    name?: string;
    code?: string;
    description?: string;
    hotelRef?: string
};

export class RoomsRequestModel {
    name?: string;
    code?: string;
    hotelRef?: string
}