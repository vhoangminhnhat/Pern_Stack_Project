export class CountryListRequestModel {
  name?: string | null;
  code?: string | null;
  capital?: string | null;
  region?: string | null;
  active?: number | null | string;
  order?: string | null;
  page?: number;
  limit?: number;
}
