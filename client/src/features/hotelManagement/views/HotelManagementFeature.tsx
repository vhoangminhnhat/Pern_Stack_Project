import React from "react";
import HotelManagementViewModel from "../viewModel/HotelManagementViewModel";
import { Card, Col, Form, Input, Row, Select } from "antd";
import { strings } from "utils/localizedStrings";

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
    cityList,
    setModal,
    handleSearch,
    handleTableChange,
  } = HotelManagementViewModel();

  return (
    <div
      style={{
        flex: 1,
        height: "100vh",
        marginBottom: 80,
      }}
      className="px-2 py-1"
    >
      <Card title={strings.HotelManagement.Title} className="shadow-2xl">
        <Form form={filterForm}>
          <Row gutter={[5, 5]}>
            <Col span={24} lg={12}>
              <div>{strings.HotelManagement.Columns.Name}</div>
              <Form.Item name={"name"}>
                <Input placeholder={strings.GlobalMessage.Name} />
              </Form.Item>
            </Col>
            <Col span={24} lg={12}>
              <div>{strings.HotelManagement.Columns.City}</div>
              <Form.Item name={"city"}>
                <Select
                  showSearch
                  options={cityList?.map((item) => {
                    return {
                      label: item?.province_name,
                      value: item?.province_name,
                    };
                  })}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default HotelManagementFeature;
