export class HotelListRequestModel {
    name?: string;
    code?: string;
};

export class HotelListResponseModel {
    id?: string;
    name?: string;
    code?: string;
    address?: string;
    description?: string
};

export class DetailHotelRequestModel {
    hotelId?: string
};

export class CreateHotelRequestModel {
    name?: string;
    code?: string;
    address?: string;
    description?: string
}