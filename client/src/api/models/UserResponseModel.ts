export interface UserResponseModel {
    id: string;
    username: string;
    fullName: string;
    gender: number;
    profileAvatar?: string;
    code?: string;
    birthDay?: Date;
    placeOfOrigin?: string;
    identifyCard?: string;
    dateOfIssue?: Date;
    placeOfIssue?: string;
    religion?: string;
    createdAt: Date;
    updatedAt: Date;
} 