import { Dispatch, SetStateAction } from "react";
import RoamingRegistrationViewModel from "../viewModel/PackagesRegistrationViewModel";
import PackagesAvailableListFeature from "./PackgesAvailableListFeature/PackagesAvailableListFeature";

const PackagesRegistrationFeature = (props: {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    modal,
    setModal
  } = props
  const {
    packageList,
    featureLoading,
    page,
    pageSize,
    totalPackage,
    filterForm,
    selectedRowDatas,
    columns,
    packagesForSelect,
    setPackageList,
    onCheckRecord,
    setPage,
    setParamsExport,
    setSelectedRowDatas,
    fetchPackagesList,
    handleSearch,
    handleTableChange,
    onRoamingRegistration,
  } = RoamingRegistrationViewModel({
    modal,
    setModal
  });
  return (
    <PackagesAvailableListFeature
      data={{
        columns,
        featureLoading,
        fetchPackagesList,
        filterForm,
        handleSearch,
        handleTableChange,
        modal,
        onCheckRecord,
        page,
        pageSize,
        packageList,
        selectedRowDatas,
        defaultPackageList: packagesForSelect,
        setModal,
        setPage,
        setParamsExport,
        setSelectedRowDatas,
        onRoamingRegistration,
        totalPackage,
        setPackageList,
      }}
    />
  );
};

export default PackagesRegistrationFeature;
