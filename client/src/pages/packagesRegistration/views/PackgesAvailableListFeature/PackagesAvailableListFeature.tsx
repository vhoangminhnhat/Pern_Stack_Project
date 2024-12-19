import { RedoOutlined, SearchOutlined } from "@ant-design/icons";
import { Form, Modal, Row } from "antd";
import { TopupResponseModel } from "api/repositories/packagesManagement/topupManagement/model/TopupResponseModel";
import { FilterButtons } from "components/generalComponents/filterButtons";
import { FilterComponent } from "components/generalComponents/filterComponents/FilterComponents";
import TableComponent from "components/generalComponents/tableComponent/TableComponent";
import { isEmpty, isUndefined } from "lodash";
import { IPackgesAvailableList } from "pages/packagesRegistration/interfaces/IPackagesRegistration";
import { colorFormat } from "utils/format/ColorFormat";
import { PackagesRegistrationFilterAttributes } from "../filterAttributes/PackagesRegistrationFilterAttributes";
import { AuthenticationContext } from "context/AuthenticationContext";

const PackagesAvailableListFeature = (props: IPackgesAvailableList) => {
  const {
    totalPackage,
    columns,
    featureLoading,
    filterForm,
    modal,
    page,
    pageSize,
    packageList,
    defaultPackageList,
    handleSearch,
    handleTableChange,
    setModal,
    setPage,
    setParamsExport,
    setSelectedRowDatas,
    onRoamingRegistration,
    setPackageList,
  } = props?.data;
  const { localStrings } = AuthenticationContext();
  return (
    <Modal
      open={modal}
      title={localStrings.RoamingRegistration.ModalTitle}
      centered
      destroyOnClose
      okText={localStrings.RoamingRegistration.Register}
      okButtonProps={{
        style: {
          backgroundColor: colorFormat?.Green,
        },
      }}
      cancelText={localStrings.GlobalLabels.Cancel}
      width={1400}
      onOk={async () => {
        await onRoamingRegistration(filterForm?.getFieldsValue(true));
      }}
      onCancel={() => {
        setSelectedRowDatas([]);
        setPage(0);
        setPackageList({});
        setParamsExport({ page: 0, limit: 10 });
        filterForm?.resetFields();
        setModal(false);
      }}
    >
      <Form
        form={filterForm}
        // onFinish={(value) => handleSearch(filterForm?.getFieldsValue(true))}
        onValuesChange={(value) =>
          handleSearch(filterForm?.getFieldsValue(true))
        }
      >
        <Row gutter={[4, 0]}>
          {FilterComponent(
            PackagesRegistrationFilterAttributes(filterForm, localStrings)
          )}
          <div className="w-full flex justify-center items-center text-center mb-3">
            <p className="font-semibold italic">
              <span className="text-rose-700">{"(*)"}</span>{" "}
              {!isEmpty(filterForm?.getFieldValue("phone"))
                ? `${
                    localStrings.RoamingRegistration.Message
                      .PackagesForSearchedPhone
                  } ${filterForm?.getFieldValue("phone")}`
                : localStrings.RoamingRegistration.Message
                    .PhoneRegistrationWarning}
            </p>
          </div>
          {!isEmpty(packageList?.basePackage) && (
            <div className="w-full flex justify-center items-center text-center">
              <p className="font-semibold italic text-red-700">{`${localStrings.RoamingRegistration.Message.BasePackagesExisted} ${packageList?.basePackage?.packageName}, ${localStrings.RoamingRegistration.Message.RemoveBasePackages}`}</p>
            </div>
          )}
          <br />
          <TableComponent<TopupResponseModel>
            data={{
              columns,
              dataSource:
                isEmpty(filterForm?.getFieldValue("phone")) ||
                isUndefined(filterForm?.getFieldValue("phone"))
                  ? defaultPackageList
                  : packageList?.items,
              handleTableChange,
              loading: featureLoading,
              loadingTitle: "Loading...",
              page,
              pageSize,
              total: totalPackage,
              totalTitle: localStrings.TopupManagement.Total,
              scroll: { x: 1300, y: 700 },
            }}
          />
        </Row>
      </Form>
    </Modal>
  );
};

export default PackagesAvailableListFeature;
