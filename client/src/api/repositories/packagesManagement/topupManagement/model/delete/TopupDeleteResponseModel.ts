export class TopupDeleteResponseModel {
  passedDelete: [
    {
      code?: string;
      descriptionSuccess?: string;
    },
  ];
  failedDelete?: [
    {
      code?: string;
      descriptionError?: string;
    },
  ];
}
