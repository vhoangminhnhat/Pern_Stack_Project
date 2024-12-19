import {
  PlusCircleOutlined,
  RedoOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, ConfigProvider, Form, Row, Select } from "antd";
import { DistrictDetailResponseModel } from "api/repositories/address/district/model/detail/DistrictDetailResponseModel";
import { DistrictListResponseModel } from "api/repositories/address/district/model/DistrictListResponseModel";
import { ProvinceDetailResponseModel } from "api/repositories/address/province/model/detail/ProvinceDetailResponseModel";
import { ProvinceListResponseModel } from "api/repositories/address/province/model/ProvinceListResponseModel";
import { WardDetailResponseModel } from "api/repositories/address/ward/model/detail/WardDetailResponseModel";
import { WardListResponseModel } from "api/repositories/address/ward/model/WardListResponseModel";
import { FilterButtons } from "components/generalComponents/filterButtons";
import { FilterComponent } from "components/generalComponents/filterComponents/FilterComponents";
import TableComponent from "components/generalComponents/tableComponent/TableComponent";
import { AuthenticationContext } from "context/AuthenticationContext";
import { colorFormat } from "utils/format/ColorFormat";
import { addressManagementConstants } from "../constants/AddressManagementConstants";
import AddressManagementViewModel from "../viewModel/AddressManagementViewModel";
import AddressManagementActionViews from "./actionViews/AddressManagementActionViews";

const AddressManagementFeature = () => {
  const {
    createColumns,
    dataType,
    detailInfo,
    district,
    fetchDetail,
    filterForm,
    handleSearch,
    handleTableChange,
    list,
    loading,
    modal,
    page,
    pageSize,
    province,
    setDetailInfo,
    setDataType,
    setPage,
    fetchList,
    setModal,
    actionForm,
    total,
    wards,
    regions,
    units,
    modalLoading,
    setModalLoading,
    handleActions,
  } = AddressManagementViewModel();
  const { localStrings } = AuthenticationContext();

  return (
    <div
      style={{
        flex: 1,
        height: "100vh",
        marginBottom: 70,
      }}
      className="px-2 py-1"
    >
      <Card title={localStrings.AddressManagement.Title} className="shadow-2xl">
        <Form
          form={filterForm}
          layout="vertical"
          onFinish={async (values) =>
            await handleSearch(filterForm?.getFieldsValue(true))
          }
        >
          <Row gutter={[4, 0]} align={"middle"}>
            {/* Filters */}
            <Col
              span={24}
              lg={dataType === "province" ? 6 : dataType === "district" ? 6 : 4}
            >
              <div>{localStrings.AddressManagement.DataType}</div>
              <Form.Item name={"filter"} initialValue={dataType}>
                <Select
                  onChange={(value) => setDataType(value)}
                  options={[
                    {
                      label: localStrings.AddressManagement.Province,
                      value: "province",
                    },
                    {
                      label: localStrings.AddressManagement.District,
                      value: "district",
                    },
                    {
                      label: localStrings.AddressManagement.Wards,
                      value: "ward",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            {FilterComponent(
              addressManagementConstants.filters(
                dataType,
                units,
                regions,
                localStrings
              )
            )}
            {dataType === "district" ? (
              <Col span={24} lg={6}>
                <div>{localStrings.AddressManagement.Columns.Province}</div>
                <Form.Item
                  name={"provinceCode"}
                  initialValue={localStrings.GlobalLabels.All}
                >
                  <Select
                    options={province
                      ?.map((item) => {
                        return {
                          label: item?.fullName,
                          value: item?.code,
                        };
                      })
                      ?.concat(
                        ...[
                          {
                            label: localStrings.GlobalLabels.All,
                            value: localStrings.GlobalLabels.All,
                          },
                        ]
                      )
                      ?.reverse()}
                    showSearch
                    filterOption={(inputValue, option) => {
                      if (typeof option?.label === "string") {
                        return option?.label
                          .toLowerCase()
                          .includes(inputValue.toLowerCase());
                      }
                      return false;
                    }}
                    onChange={async (value) => {
                      await fetchList(
                        {
                          pagination: 1,
                          provinceCode:
                            value === localStrings?.GlobalLabels?.All
                              ? undefined
                              : (value as unknown as string),
                        },
                        "district",
                        "filters"
                      );
                    }}
                  />
                </Form.Item>
              </Col>
            ) : (
              <></>
            )}
            {dataType === "ward" && (
              <>
                <Col span={24} lg={4}>
                  <div>{localStrings.AddressManagement.Columns.Province}</div>
                  <Form.Item
                    name={"provinceCode"}
                    initialValue={localStrings.GlobalLabels.All}
                  >
                    <Select
                      onChange={async (value) => {
                        await fetchList(
                          {
                            pagination: 1,
                            provinceCode:
                              value === localStrings?.GlobalLabels?.All
                                ? undefined
                                : (value as unknown as string),
                          },
                          "district",
                          "filters"
                        );
                      }}
                      options={province
                        ?.map((item) => {
                          return {
                            label: item?.fullName,
                            value: item?.code,
                          };
                        })
                        ?.concat(
                          ...[
                            {
                              label: localStrings.GlobalLabels.All,
                              value: localStrings.GlobalLabels.All,
                            },
                          ]
                        )
                        ?.reverse()}
                      showSearch
                      filterOption={(inputValue, option) => {
                        if (typeof option?.label === "string") {
                          return option?.label
                            .toLowerCase()
                            .includes(inputValue.toLowerCase());
                        }
                        return false;
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={24} lg={8}>
                  <div>{localStrings.AddressManagement.Columns.District}</div>
                  <Form.Item
                    name={"districtCode"}
                    initialValue={localStrings.GlobalLabels.All}
                  >
                    <Select
                      showSearch
                      filterOption={(inputValue, option) => {
                        if (typeof option?.label === "string") {
                          return option?.label
                            .toLowerCase()
                            .includes(inputValue.toLowerCase());
                        }
                        return false;
                      }}
                      options={district
                        ?.map((item) => {
                          return {
                            label: item?.fullName,
                            value: item?.code,
                          };
                        })
                        ?.concat(
                          ...[
                            {
                              label: localStrings.GlobalLabels.All,
                              value: localStrings.GlobalLabels.All,
                            },
                          ]
                        )
                        ?.reverse()}
                    />
                  </Form.Item>
                </Col>
              </>
            )}
            {/* Buttons */}
            {FilterButtons({
              searchLg: 8,
              htmlType: "submit",
              redoIcon: <RedoOutlined />,
              redoLg: 8,
              searchIcon: <SearchOutlined />,
              redoName: localStrings.GlobalLabels.Redo,
              searchName: `${localStrings.GlobalLabels.Search} ${
                dataType === "province"
                  ? localStrings.AddressManagement.Columns.Province?.toLowerCase()
                  : dataType === "district"
                  ? localStrings.AddressManagement.Columns.District?.toLowerCase()
                  : localStrings.AddressManagement.Columns.Ward?.toLowerCase()
              }`,
              type: "primary",
              onRedoClick: async () => {
                setPage(0);
                filterForm.resetFields();
                await fetchList(
                  { page: 0, limit: 10, pagination: 1 },
                  dataType,
                  "search"
                );
              },
            })}
            <Col span={24} lg={8}>
              <Form.Item>
                <ConfigProvider
                  theme={{
                    token: {
                      // Seed Token
                      colorPrimary: colorFormat?.Green,
                    },
                  }}
                >
                  <Button
                    type="primary"
                    onClick={() => {
                      setDetailInfo({});
                      actionForm.setFieldsValue(
                        dataType === "province"
                          ? new ProvinceDetailResponseModel()
                          : dataType === "district"
                          ? new DistrictDetailResponseModel()
                          : new WardDetailResponseModel()
                      );
                      setModal(true);
                    }}
                    className="w-full"
                    icon={<PlusCircleOutlined className="font-bold" />}
                  >
                    {dataType === "province"
                      ? `${localStrings.GlobalLabels.Create} ${localStrings.AddressManagement.Columns.Province}`
                      : dataType === "district"
                      ? `${localStrings.GlobalLabels.Create} ${localStrings.AddressManagement.Columns.District}`
                      : `${localStrings.GlobalLabels.Create} ${localStrings.AddressManagement.Columns.Ward}`}
                  </Button>
                </ConfigProvider>
              </Form.Item>
            </Col>
            {/* Table list */}
            <TableComponent<
              | ProvinceListResponseModel
              | DistrictListResponseModel
              | WardListResponseModel
            >
              data={{
                columns: createColumns(dataType),
                dataSource: list,
                handleTableChange,
                loading,
                loadingTitle: "Loading...",
                page,
                pageSize,
                total: total,
                totalTitle: localStrings.GlobalLabels.Total,
                scroll: { x: 1300, y: 900 },
              }}
            />
          </Row>
        </Form>
        <AddressManagementActionViews
          data={{
            actionForm,
            dataType,
            detailInfo,
            detailModal: modal,
            modalLoading,
            regions,
            setDetailInfo,
            setDetailModal: setModal,
            units,
            handleActions,
            province,
            district,
            fetchList,
          }}
        />
      </Card>
    </div>
  );
};

export default AddressManagementFeature;
