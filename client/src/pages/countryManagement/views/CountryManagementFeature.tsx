import {
  PlusCircleOutlined,
  RedoOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Col, ConfigProvider, Form, Row } from "antd";
import { CountryListResponseModel } from "api/repositories/countryManagement/model/CountryListResponseModel";
import { CountryDetailResponseModel } from "api/repositories/countryManagement/model/details/CountryDetailReponseModel";
import CardComponent from "components/generalComponents/cardComponent/CardComponent";
import { FilterButtons } from "components/generalComponents/filterButtons";
import { FilterComponent } from "components/generalComponents/filterComponents/FilterComponents";
import TableComponent from "components/generalComponents/tableComponent/TableComponent";
import { AuthenticationContext } from "context/AuthenticationContext";
import { colorFormat } from "utils/format/ColorFormat";
import { countryManagementConstants } from "../constants/CountryManagementConstants";
import CountryManagementViewModel from "../viewModel/CountryManagementViewModel";
import CountryUpdateCreateFeature from "./actionFeature/CountryUpdateCreateFeature";

const CountryManagementFeature = () => {
  const {
    actionForm,
    detailInfo,
    detailModal,
    list,
    loading,
    modalLoading,
    page,
    pageSize,
    total,
    filterForm,
    columns,
    importFile,
    regionList,
    setImportFile,
    setPage,
    setParamsExport,
    setDetailInfo,
    setDetailModal,
    fetchCountryList,
    handleActions,
    handleSearch,
    handleTableChange,
  } = CountryManagementViewModel();
  const { localStrings } = AuthenticationContext();
  return (
    <CardComponent
      data={{
        title: localStrings.CountryManagement.Title,
        extra: <></>,
        children: (
          <>
            <Form
              form={filterForm}
              layout="vertical"
              onFinish={async (values) => await handleSearch(values)}
            >
              <Row gutter={[4, 4]} align={"middle"}>
                {/* Filters */}
                {FilterComponent(
                  countryManagementConstants(localStrings, regionList)
                    .filterAttributes
                )}
                {/* Buttons */}
                {FilterButtons({
                  searchLg: 8,
                  htmlType: "submit",
                  redoIcon: <RedoOutlined />,
                  redoLg: 8,
                  searchIcon: <SearchOutlined />,
                  redoName: localStrings.GlobalLabels.Redo,
                  searchName: localStrings.GlobalLabels.Search,
                  type: "primary",
                  onRedoClick: async () => {
                    setPage(0);
                    filterForm.resetFields();
                    setParamsExport({ page: 0, limit: 10 });
                    await fetchCountryList({ page: 0, limit: 10 });
                  },
                })}
                <Col span={24} lg={8}>
                  <Form.Item>
                    <ConfigProvider
                      theme={{
                        token: {
                          // Seed Token
                          colorPrimary: colorFormat.Green,
                        },
                      }}
                    >
                      <Button
                        type="primary"
                        onClick={() => {
                          setImportFile({
                            coverFiles: [],
                            ensignFiles: [],
                          });
                          setDetailInfo({});
                          actionForm.setFieldsValue(
                            new CountryDetailResponseModel()
                          );
                          setDetailModal(true);
                        }}
                        className="w-full"
                        icon={<PlusCircleOutlined />}
                      >
                        {localStrings.GlobalLabels.Create}
                      </Button>
                    </ConfigProvider>
                  </Form.Item>
                </Col>
                {/* Table list */}
                <TableComponent<CountryListResponseModel>
                  data={{
                    columns,
                    dataSource: list,
                    handleTableChange,
                    loading,
                    loadingTitle: "...Loading",
                    page,
                    pageSize,
                    total,
                    totalTitle: localStrings.CountryManagement.Total,
                    scroll: { x: 1400, y: 900 },
                  }}
                />
              </Row>
            </Form>
            <CountryUpdateCreateFeature
              data={{
                actionForm,
                detailInfo,
                detailModal,
                handleActions,
                modalLoading,
                setDetailInfo,
                setDetailModal,
                setImportFile,
                importFile,
                regionList
              }}
            />
          </>
        ),
      }}
    />
  );
};

export default CountryManagementFeature;
