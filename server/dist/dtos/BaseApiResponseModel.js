"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error = exports.BaseApiResponseModel = void 0;
class BaseApiResponseModel {
    constructor(message, error, paging, pagination, data) {
        this.message = message;
        this.error = error;
        this.paging = paging;
        this.pagination = pagination;
        this.data = data;
    }
}
exports.BaseApiResponseModel = BaseApiResponseModel;
class Error {
}
exports.Error = Error;
