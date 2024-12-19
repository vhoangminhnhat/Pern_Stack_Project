import { Button, Col, DatePicker, Form, Modal, Row } from "antd";
import { UpdateProfileStatusRequestModel } from "api/repositories/travelSim/model/updateProfileStatus/UpdateProfileStatusRequestModel";
import ActionsComponent from "components/generalComponents/actionsComponent/ActionsComponent";
import { AuthenticationContext } from "context/AuthenticationContext";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import { updateStatusComponent } from "pages/travelSimList/constants/TravelSimConstants";
import { IUpdateProfileStatus } from "pages/travelSimList/interfaces/TravelSimInterfaces";
import { useState } from "react";
import { createFormRules } from "utils/helpersInTs/helpersInTs";
dayjs.extend(weekday);
dayjs.extend(localeData);

const UpdateProfileStatusFeature = (props: IUpdateProfileStatus) => {
  const {
    modal,
    profileId,
    setModal,
    updateForm,
    detail,
    updateProfileStatus,
  } = props?.data;

  const { localStrings } = AuthenticationContext();
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Modal
      open={modal}
      title={localStrings.TravelSimListManagement.Labels.UpdateStatus}
      destroyOnClose
      centered
      footer={null}
      onCancel={() => {
        setModal(false);
        updateForm?.setFieldsValue(new UpdateProfileStatusRequestModel());
      }}
    >
      <Form
        form={updateForm}
        onFinish={async () => {
          setLoading(true);
          await updateProfileStatus(updateForm?.getFieldsValue(true)).finally(
            () => setLoading(false)
          );
        }}
      >
        <Row gutter={[4, 4]} align={"middle"}>
          <Col span={24} lg={24}>
            <Form.Item
              name={"connectedTime"}
              label={localStrings.TravelSimListManagement.Labels.ConnectedTime}
              valuePropName={"date"}
              rules={createFormRules(
                true,
                "object" as const,
                localStrings.GlobalPlaceholder.InvalidValue
              )}
            >
              <DatePicker
                showTime={{ format: "HH:mm:ss" }}
                style={{ width: "100%" }}
                placeholder={localStrings.GlobalPlaceholder.Date}
                format={"DD-MM-YYYY HH:mm:ss"}
              />
            </Form.Item>
          </Col>
          <ActionsComponent
            info={detail}
            data={updateStatusComponent(localStrings, profileId)}
          />
          <div className="flex justify-center items-center w-full gap-3">
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                {loading === true
                  ? localStrings?.GlobalLabels.PleaseWait
                  : localStrings.GlobalLabels.Update}
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="default"
                onClick={() => {
                  setModal(false);
                  updateForm?.setFieldsValue(
                    new UpdateProfileStatusRequestModel()
                  );
                }}
              >
                {localStrings.GlobalLabels.Cancel}
              </Button>
            </Form.Item>
          </div>
        </Row>
      </Form>
    </Modal>
  );
};

export default UpdateProfileStatusFeature;
