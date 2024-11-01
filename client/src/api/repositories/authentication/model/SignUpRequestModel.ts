import { Gender } from "@prisma/client";

export class SignUpRequestModel {
  fullName?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  gender?: Gender;
}
