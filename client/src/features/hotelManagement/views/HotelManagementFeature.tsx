import React from "react";
import HotelManagementViewModel from "../viewModel/HotelManagementViewModel";
import { Card, Col, Form, Input, Row, Select } from "antd";
import { strings } from "utils/localizedStrings";
import { FilterButtons } from "components/filterButtons";
import { IoArrowRedoCircleOutline, IoSearchOutline } from "react-icons/io5";
import TableComponent from "components/tableComponent/TableComponent";
import { HotelsResponseModel } from "api/repositories/hotels/model/HotelResponseModel";

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
    setPage,
    setPageSize,
    setModal,
    handleSearch,
    handleTableChange,
    fetchList,
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
            {FilterButtons({
              searchLg: 8,
              htmlType: "submit",
              redoIcon: <IoArrowRedoCircleOutline />,
              redoLg: 8,
              searchIcon: <IoSearchOutline />,
              redoName: strings.GlobalLabels.Redo,
              searchName: strings.GlobalLabels.Search,
              type: "primary",
              onRedoClick: async () => {
                setPage(0);
                filterForm.resetFields();
                await fetchList();
              },
            })}
            <TableComponent<HotelsResponseModel>
              data={{
                columns: mainCoumns,
                dataSource: list,
                handleTableChange,
                loading,
                loadingTitle: "...Loading",
                page,
                pageSize,
                total,
                totalTitle: strings.HotelManagement.Total,
                scroll: { x: 1100, y: 900 },
              }}
            />
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default HotelManagementFeature;
