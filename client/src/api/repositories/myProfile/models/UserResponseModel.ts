export class UserResponseModel {
  id?: string;
  username?: string;
  fullName?: string;
  gender?: "male" | "female";
  profileAvatar?: string;
  code?: string;
  birthDay?: Date;
  placeOfOrigin?: string;
  identifyCard?: string;
  dateOfIssue?: Date;
  placeOfIssue?: string;
  religion?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
