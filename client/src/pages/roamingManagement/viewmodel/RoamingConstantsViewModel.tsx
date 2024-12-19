import { defaultCountryManagementRepository } from "api/repositories/countryManagement/CountryManagementRepository";
import { CountryListRequestModel } from "api/repositories/countryManagement/model/CountryListRequestModel";
import { CountryListResponseModel } from "api/repositories/countryManagement/model/CountryListResponseModel";
import { PartnerRoamingModel } from "api/repositories/packagesManagement/roamingManagement/model/RoamingManagementResponseModel";
import { defaultRoamingManagementRepository } from "api/repositories/packagesManagement/roamingManagement/RoamingManagementRepository";
import { useEffect, useState } from "react";

const RoamingConstantsViewModel = () => {
  const [countryList, setCountryList] = useState<CountryListResponseModel[]>(
    []
  );
  const [partnerList, setPartnerList] = useState<PartnerRoamingModel[]>([]);

  const fetchCountryList = async (params: CountryListRequestModel) => {
    try {
      const res = await defaultCountryManagementRepository?.getList(params);
      if (res) {
        setCountryList(res?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRoamingPartnerList = async () => {
    try {
      const res = await defaultRoamingManagementRepository.getPartnerRoaming();
      if (res) {
        setPartnerList(res?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCountryList({ page: 0, limit: 10 });
    fetchRoamingPartnerList();
  }, []);

  return { countryList, partnerList };
};

export default RoamingConstantsViewModel;
