export interface FormattedUserData {
  id?: string;
  username?: string;
  fullName?: string;
  gender?: "male" | "female";
  profileAvatar?: string;
  code?: string;
  birthDay?: string;
  placeOfOrigin?: string;
  identifyCard?: string;
  dateOfIssue?: string;
  placeOfIssue?: string;
  religion?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
