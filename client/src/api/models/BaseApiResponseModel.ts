export interface BaseApiResponseModel<T> {
    data: T;
    message: string;
    error?: {
        code: number;
        message: string;
    };
} 