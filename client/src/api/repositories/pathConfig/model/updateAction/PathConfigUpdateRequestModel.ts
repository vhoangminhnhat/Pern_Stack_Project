import { ServiceConfigInfo } from "../PathConfigResponseModel"

export class PathConfigUpdateRequestModel {
    title?: string;
    code?: string;
    imageUrl?: string;
    description?: string;
    path?: string;
    config?: Record<string, unknown>;
    active: number;
}