import React from "react";
import HotelManagementViewModel from "../viewModel/HotelManagementViewModel";

const HotelManagementFeature = () => {
  const {
    actionForm,
    detailInfo,
    filterForm,
    list,
    loading,
    modalLoading,
    page,
    pageSize,
    total,
    mainCoumns,
    modal,
    setModal,
    handleSearch,
    handleTableChange,
  } = HotelManagementViewModel();

  return <div>HotelManagementFeature</div>;
};

export default HotelManagementFeature;
