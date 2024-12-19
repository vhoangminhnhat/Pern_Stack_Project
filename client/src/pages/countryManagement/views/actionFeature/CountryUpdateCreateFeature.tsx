import { ConfigProvider, Modal, Tabs, TabsProps } from "antd";
import { RcFile, UploadChangeParam } from "antd/es/upload";
import { CountryDetailResponseModel } from "api/repositories/countryManagement/model/details/CountryDetailReponseModel";
import { AuthenticationContext } from "context/AuthenticationContext";
import { isEmpty } from "lodash";
import { useState } from "react";
import { ICountryActionType } from "./actionTypeModel/CountryActionType";
import RoamingPartnersInfoFeature from "./roamingPartnersInfoFeature/RoamingPartnersInfoFeature";
import UpdateCreateFeature from "./updateCreateFeature/UpdateCreateFeature";

const CountryUpdateCreateFeature = (props: ICountryActionType) => {
  const {
    actionForm,
    handleActions,
    modalLoading,
    detailInfo,
    detailModal,
    setDetailInfo,
    setDetailModal,
    setImportFile,
    importFile,
    regionList,
  } = props?.data;

  const [tabLable, setTabLable] = useState<string>("update-create");
  const { localStrings } = AuthenticationContext();

  const handleUploadChange =
    (type: "coverFiles" | "ensignFiles") => (info: UploadChangeParam) => {
      setImportFile((prevState) => ({
        ...prevState,
        [type]: info?.fileList as RcFile[],
      }));
    };

  const tabItems: TabsProps["items"] = [
    {
      key: "update-create",
      label: (
        <span className="font-semibold">
          {isEmpty(detailInfo)
            ? localStrings.GlobalLabels.Create
            : localStrings.GlobalLabels.Update}
        </span>
      ),
      children: (
        <UpdateCreateFeature
          data={{
            actionForm,
            detailInfo,
            detailModal,
            handleActions,
            handleUploadChange,
            importFile,
            modalLoading,
            setDetailInfo,
            setDetailModal,
            setImportFile,
            regionList,
          }}
        />
      ),
    },
    {
      key: "roaming-partners",
      label: <span className="font-semibold">Roaming Partners</span>,
      children: (
        <RoamingPartnersInfoFeature
          detailInfo={detailInfo}
          regionList={regionList}
        />
      ),
    },
  ];
  return (
    <Modal
      open={detailModal}
      width={tabLable === "roaming-partners" ? 1000 : 600}
      centered
      destroyOnClose
      closeIcon={null}
      footer={null}
      onCancel={() => {
        setDetailInfo({});
        actionForm.setFieldsValue(new CountryDetailResponseModel());
        setDetailModal(false);
        setTabLable("update-create");
      }}
    >
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              itemSelectedColor: "#1e3a8a",
              inkBarColor: "#1e3a8a",
              itemHoverColor: "#1e3a8a",
            },
          },
        }}
      >
        <Tabs
          centered
          type="line"
          defaultActiveKey="update-create"
          items={
            isEmpty(detailInfo)
              ? tabItems?.filter((item) => item?.key === "update-create")
              : tabItems
          }
          onChange={(value) => setTabLable(value)}
        />
      </ConfigProvider>
    </Modal>
  );
};

export default CountryUpdateCreateFeature;
