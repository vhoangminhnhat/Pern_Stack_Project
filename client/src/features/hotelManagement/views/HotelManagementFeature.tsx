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
    setModal,
    handleSearch,
    handleTableChange,
  } = HotelManagementViewModel();

  return (
    <div
      style={{
        flex: 1,
        height: '100vh',
        marginBottom: 80,
      }}
      className="px-2 py-1">
        <Card title={strings.HotelManagement.Title} className="shadow-2xl">
          <Form form={filterForm}>
            <Row gutter={[5,5]}>
              <Col span={24} lg={12}>
                <div>{strings.HotelManagement.Columns.Name}</div>
                <Form.Item name={"name"}>
                  <Input placeholder={strings.GlobalMessage.Name}/>
                </Form.Item>
              </Col>
              <Col span={24} lg={12}>
                <div>{strings.HotelManagement.Columns.City}</div>
                <Form.Item name={"city"}>
                  <Select showSearch options={[
                    {
                      label: strings.GlobalLabels.All,
                      value: strings.GlobalLabels.All
                    },
                    {
                      label: strings.HotelManagement.City.HN,
                      value: "hanoi"
                    },
                    {
                      label: strings.HotelManagement.City.DN,
                      value: "danang"
                    },
                    {
                      label: strings.HotelManagement.City.HCM,
                      value: "hcm"
                    }
                  ]}/>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
  )
};

export default HotelManagementFeature;
