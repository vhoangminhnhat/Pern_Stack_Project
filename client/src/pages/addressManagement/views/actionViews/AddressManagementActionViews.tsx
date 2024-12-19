import { LoadingOutlined } from "@ant-design/icons";
import { Button, Col, Form, Modal, Row, Select, Spin } from "antd";
import { DistrictDetailResponseModel } from "api/repositories/address/district/model/detail/DistrictDetailResponseModel";
import { ProvinceDetailResponseModel } from "api/repositories/address/province/model/detail/ProvinceDetailResponseModel";
import { WardDetailResponseModel } from "api/repositories/address/ward/model/detail/WardDetailResponseModel";
import ActionsComponent from "components/generalComponents/actionsComponent/ActionsComponent";
import { AuthenticationContext } from "context/AuthenticationContext";
import { isEmpty } from "lodash";
import { addressManagementConstants } from "pages/addressManagement/constants/AddressManagementConstants";
import { createFormRules } from "utils/helpersInTs/helpersInTs";
import { IAddressManagementActions } from "./interfaces/AddressManagementActionInterfaces";

const AddressManagementActionViews = (props: IAddressManagementActions) => {
  const {
    actionForm,
    dataType,
    detailInfo,
    detailModal,
    modalLoading,
    regions,
    units,
    province,
    district,
    setDetailInfo,
    setDetailModal,
    handleActions,
    fetchList,
  } = props?.data;
  const { localStrings } = AuthenticationContext();
  return (
    <Modal
      open={detailModal}
      centered
      destroyOnClose
      footer={null}
      title={
        isEmpty(detailInfo)
          ? localStrings.GlobalLabels.Create
          : localStrings.GlobalLabels.Update
      }
      onCancel={() => {
        setDetailInfo({});
        actionForm.setFieldsValue(
          dataType === "province"
            ? new ProvinceDetailResponseModel()
            : dataType === "district"
            ? new DistrictDetailResponseModel()
            : new WardDetailResponseModel()
        );
        setDetailModal(false);
      }}
    >
      <Spin
        spinning={modalLoading}
        indicator={<LoadingOutlined />}
        tip={"Loading..."}
      >
        <Form
          form={actionForm}
          layout="vertical"
          onFinish={async (value) => {
            await handleActions(
              actionForm?.getFieldsValue(true),
              isEmpty(detailInfo) ? "create" : "update",
              dataType
            );
          }}
        >
          <Row gutter={[12, 4]} align={"middle"}>
            <ActionsComponent
              data={addressManagementConstants.actionFilters(
                localStrings,
                detailInfo
              )}
              info={detailInfo}
            />
            <Col span={24} lg={12}>
              <Form.Item
                name={"administrativeUnitId"}
                label={localStrings.GlobalLabels.Type}
                rules={createFormRules(
                  true,
                  "number",
                  localStrings.AddressManagement.Placeholder.Units
                )}
                initialValue={
                  !isEmpty(detailInfo)
                    ? detailInfo?.administrativeUnitId?.id
                    : undefined
                }
              >
                <Select
                  placeholder={localStrings.AddressManagement.Placeholder.Units}
                  options={units?.map((item) => {
                    return {
                      label: item?.fullName,
                      value: item?.id,
                    };
                  })}
                />
              </Form.Item>
            </Col>
            {dataType === "district" && (
              <Col span={24} lg={12}>
                <Form.Item
                  name={"provinceCode"}
                  label={localStrings.AddressManagement.Columns.Province}
                  rules={createFormRules(
                    true,
                    "string",
                    localStrings.GlobalPlaceholder.Name
                  )}
                  initialValue={
                    !isEmpty(detailInfo)
                      ? province?.filter(
                          (item) => item?.code === detailInfo?.provinceCode
                        )[0]?.code
                      : undefined
                  }
                >
                  <Select
                    placeholder={localStrings.AddressManagement.Province}
                    options={province?.map((item) => {
                      return {
                        label: item?.fullName,
                        value: item?.code,
                      };
                    })}
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
            )}
            {dataType === "ward" && (
              <>
                <Col span={24} lg={12}>
                  <Form.Item
                    name={"provinceCode"}
                    label={localStrings.AddressManagement.Columns.Province}
                    rules={createFormRules(
                      true,
                      "string",
                      localStrings.GlobalPlaceholder.Name
                    )}
                    initialValue={
                      !isEmpty(detailInfo)
                        ? province?.filter(
                            (item) => item?.code === detailInfo?.provinceCode
                          )[0]?.code
                        : undefined
                    }
                  >
                    <Select
                      placeholder={localStrings.AddressManagement.Province}
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
                      options={province?.map((item) => {
                        return {
                          label: item?.fullName,
                          value: item?.code,
                        };
                      })}
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
                <Col span={24} lg={12}>
                  <Form.Item
                    name={"districtCode"}
                    label={localStrings.AddressManagement.Columns.District}
                    rules={createFormRules(
                      true,
                      "string",
                      localStrings.GlobalPlaceholder.Name
                    )}
                    initialValue={
                      !isEmpty(detailInfo)
                        ? district?.filter(
                            (item) => item?.code === detailInfo?.districtCode
                          )[0]?.code
                        : undefined
                    }
                  >
                    <Select
                      placeholder={localStrings.AddressManagement.District}
                      showSearch
                      filterOption={(inputValue, option) => {
                        if (typeof option?.label === "string") {
                          return option?.label
                            .toLowerCase()
                            .includes(inputValue.toLowerCase());
                        }
                        return false;
                      }}
                      options={district?.map((item) => {
                        return {
                          label: item?.fullName,
                          value: item?.code,
                        };
                      })}
                    />
                  </Form.Item>
                </Col>
              </>
            )}
            {dataType === "province" && (
              <Col span={24} lg={12}>
                <Form.Item
                  name={"administrativeRegionId"}
                  label={localStrings.GlobalLabels.Regions}
                  rules={createFormRules(
                    true,
                    "number",
                    localStrings.AddressManagement.Placeholder.Regions
                  )}
                  initialValue={
                    !isEmpty(detailInfo)
                      ? detailInfo?.administrativeRegionId?.id
                      : undefined
                  }
                >
                  <Select
                    placeholder={
                      localStrings.AddressManagement.Placeholder.Regions
                    }
                    options={regions?.map((item) => {
                      return {
                        label: item?.name,
                        value: item?.id,
                      };
                    })}
                  />
                </Form.Item>
              </Col>
            )}
            <Col span={24}>
              <br />
              <div className="flex justify-center items-center gap-3">
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="bg-blue-700"
                  >
                    {!isEmpty(detailInfo)
                      ? localStrings.GlobalLabels.Update
                      : localStrings.GlobalLabels.Create}
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    onClick={() => {
                      setDetailInfo({});
                      actionForm.setFieldsValue(
                        dataType === "province"
                          ? new ProvinceDetailResponseModel()
                          : dataType === "district"
                          ? new DistrictDetailResponseModel()
                          : new WardDetailResponseModel()
                      );
                      setDetailModal(false);
                    }}
                    type="default"
                  >
                    {localStrings.GlobalLabels.Cancel}
                  </Button>
                </Form.Item>
              </div>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Modal>
  );
};

export default AddressManagementActionViews;
