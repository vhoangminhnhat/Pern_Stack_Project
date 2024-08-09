export class HotelListRequestModel {
    name?: string;
    code?: string;
};

export class HotelListResponseModel {
    hotelId?: string;
    name?: string;
    code?: string;
    address?: string;
    description?: string
}