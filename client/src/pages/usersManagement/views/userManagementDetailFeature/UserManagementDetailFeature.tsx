import { LoadingOutlined } from "@ant-design/icons";
import { Button, Form, InputNumber, Modal, Spin } from "antd";
import { UserManagementCreateRequest } from "api/repositories/userManagement/model/createAction/UserManagementCreateRequest";
import { UserManagementResponseModel } from "api/repositories/userManagement/model/UserManagementResponse";
import ActionsComponent from "components/generalComponents/actionsComponent/ActionsComponent";
import { AuthenticationContext } from "context/AuthenticationContext";
import _, { isEmpty } from "lodash";
import React, { useEffect } from "react";
import { convertToISO } from "utils/helpersInTs/helpersInTs";
import { IUserManagementDetail } from "./userInterfaces/IUserManagementDetail";
import { userManagementDetailAttributes } from "./userManagementDetailAttributes/UserManagementDetailAttributes";

const UserManagementDetailFeature = (props: IUserManagementDetail) => {
  const {
    detailModal,
    formDetail,
    handleDetailAction,
    modalLoading,
    setDetailModal,
    detailInfo,
    setDetailInfo,
    partnerList,
    roleList,
  } = props?.data;
  const [role, setRole] = React.useState<string | undefined>(
    !isEmpty(detailInfo?.roles) ? detailInfo?.roles[0]?.name : undefined
  );

  useEffect(() => {
    const currentRole = formDetail.getFieldValue("roles") || undefined;
    if (currentRole !== undefined) {
      setRole(currentRole);
    }
  }, [formDetail, detailInfo]);
  const { localStrings } = AuthenticationContext();

  const checkingData = async (values: any) => {
    let body: UserManagementCreateRequest = {
      ...values,
      birthDay: isEmpty(values?.birthDay)
        ? undefined
        : convertToISO(values?.birthDay),
      partner:
        values?.partner === "" ||
        values?.partner === localStrings.GlobalLabels.NoPartner ||
        values?.partner === "null"
          ? undefined
          : values?.partner,
      description:
        values?.description === "" || values?.description === null
          ? undefined
          : values?.description,
      address:
        values?.address === "" || values?.address === null
          ? undefined
          : values?.address,
      phone: values?.phone,
    };

    await handleDetailAction(body, isEmpty(detailInfo) ? "create" : "update");
  };
  return (
    <Modal
      open={detailModal}
      width={550}
      styles={{
        body: {
          overflowY: "auto",
          maxHeight: "calc(100vh - 120px)",
          scrollbarWidth: "thin",
          overflowX: "hidden",
        },
      }}
      maskClosable={false}
      title={
        isEmpty(detailInfo)
          ? localStrings.GlobalLabels.Create
          : localStrings.GlobalLabels.Update
      }
      centered
      destroyOnClose
      closeIcon={null}
      footer={null}
      onCancel={() => {
        setDetailInfo({});
        formDetail.setFieldsValue(new UserManagementResponseModel());
        setRole(undefined);
        setDetailModal(false);
      }}
    >
      <Spin
        spinning={modalLoading}
        indicator={<LoadingOutlined />}
        tip={"Loading..."}
      >
        <Form
          form={formDetail}
          onFinish={async (value) => checkingData(value)}
          layout="vertical"
        >
          <ActionsComponent
            data={userManagementDetailAttributes(
              partnerList,
              roleList.filter(
                (item) => item.code !== localStrings.GlobalLabels.All
              ),
              detailInfo,
              role,
              setRole,
              localStrings
            )}
            info={detailInfo}
          />
          <Form.Item
            label={localStrings.UserManagement.Columns.Balance}
            name={"balance"}
            initialValue={
              !isEmpty(detailInfo) ? _.get(detailInfo, "balance") : 0
            }
            rules={[
              {
                required: true,
                message: localStrings.UserManagement.RuleMessage.Balance,
              },
            ]}
          >
            <InputNumber<number>
              size="large"
              style={{ width: "100%" }}
              suffix={<span className="text-green-800 font-semibold">VND</span>}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) =>
                value.replace(/\$\s?|(,*)/g, "") as unknown as number
              }
            />
          </Form.Item>
          <div className="flex justify-center items-center gap-3">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {!isEmpty(detailInfo)
                  ? localStrings.GlobalLabels.Update
                  : localStrings.GlobalLabels.Create}
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                onClick={() => {
                  setDetailInfo({});
                  formDetail.setFieldsValue(new UserManagementResponseModel());
                  setRole(undefined);
                  setDetailModal(false);
                }}
                type="default"
              >
                {localStrings.GlobalLabels.Cancel}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Spin>
    </Modal>
  );
};

export default UserManagementDetailFeature;
