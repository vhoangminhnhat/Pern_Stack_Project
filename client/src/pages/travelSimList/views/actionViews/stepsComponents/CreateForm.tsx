import { Button, Col, Collapse, ConfigProvider, Form, Row, Spin } from 'antd';
import popUpComponent from 'components/generalComponents/popUpComponent/PopUpComponent';
import UploadItem from 'components/generalComponents/UploadItemComponent/UploadItem';
import { AuthenticationContext } from 'context/AuthenticationContext';
import { ICreateForm } from 'pages/travelSimList/interfaces/CreateProfileInterface';
import React, {  } from 'react'
import SignatureCanvas from 'react-signature-canvas';

const CreateForm: React.FC<ICreateForm> = (props: ICreateForm) => {
  const {
    signature,
    setSignature,
    submitLoading,
    clearSignature,
    uploadInfo,
    setProfileType,
    sectionIds,
    userFiles
  } = props;
  const [form] = Form.useForm();
  const { localStrings } = AuthenticationContext();

  return (
    <Form form={form} layout='vertical' className='mt-4'>
      <Row gutter={32}>
        <UploadItem
          form={form}
          name="portrait"
          submitLoading={submitLoading}
          title={localStrings.TravelSimListManagement.Labels.Portrait}
          imgFile={userFiles?.portrait}
        />
        <UploadItem
          form={form}
          name="videocall"
          submitLoading={submitLoading}
          title={localStrings.TravelSimListManagement.Labels.Videocall}
          imgFile={userFiles?.videocall}
        />
        <UploadItem
          form={form}
          name="front"
          submitLoading={submitLoading}
          title={localStrings.TravelSimListManagement.Labels.Passport}
        />
        {/* <UploadItem
          form={form}
          name="sim"
          submitLoading={submitLoading}
          title={localStrings.TravelSimListManagement.Labels.QRSim}
        /> */}
      </Row>
      <Row gutter={32}>
        <Col span={24}>
          <ConfigProvider
            theme={{
              components: {
                Collapse: {
                  contentPadding: 0,
                  headerPadding: 0
                }
              }
            }}
          >
            <Collapse
              ghost
              collapsible='icon'
              defaultActiveKey={['sign']}
              items={[
                {
                  key: "sign",
                  label: <span className="text-start text-lg font-semibold italic pb-2">
                    {localStrings.TravelSimListManagement.Labels.SignPad}
                  </span>,
                  extra:
                    <Button
                      type='primary'
                      ghost
                      size="small"
                      onClick={clearSignature}
                      className="w-full"
                    >
                      <span className="font-bold">
                        {localStrings.TravelSimListManagement.Labels.ClearSignature}
                      </span>
                    </Button>,
                  showArrow: false,
                  children: <>
                    <SignatureCanvas
                      ref={(ref) => setSignature(ref as SignatureCanvas)}
                      canvasProps={{
                        style: {
                          maxWidth: "100%",
                        },
                        className: 'sigCanvas w-full shadow-lg rounded-lg border-[1px] border-gray-300 lg:h-56 h-72',
                      }}
                      penColor={"#0194f3"}
                      clearOnResize={false}
                    />
                  </>,
                }
              ]}
            />
          </ConfigProvider>
        </Col>
      </Row>
      <Row gutter={32} justify={'center'}>
        <Col xs={12} lg={4}>
          <Form.Item>
            <Button
              type="primary"
              size="large"
              className="w-full"
              onClick={() => {
                form
                  .validateFields()
                  .then(async () => {
                    if (signature?.isEmpty() === true) {
                      return popUpComponent.error(
                        localStrings.TravelSimListManagement.Message.SignatureError,
                        4,
                      );
                    } else {
                      setProfileType(0);
                      await uploadInfo({
                        ...form.getFieldsValue(true),
                        sectionIds: sectionIds,
                        ...userFiles,
                      });
                    }
                  })
                  .catch((errorInfo) => {
                    const errorMessages = errorInfo.errorFields?.map(
                      (field: any) => {
                        return field.errors;
                      },
                    );
                    popUpComponent.error(errorMessages?.[0], 4);
                  });
              }}
            >
              <span className="font-bold">
                {localStrings.TravelSimListManagement.Labels.CreateProfile}
              </span>
            </Button>
          </Form.Item>
        </Col>
        <Col xs={12} lg={4}>
          <Form.Item>
            <Button
              type="primary"
              ghost
              size="large"
              className="w-full"
              onClick={() => {
                form
                  .validateFields()
                  .then(async () => {
                    if (signature?.isEmpty() === true) {
                      return popUpComponent.error(
                        localStrings.TravelSimListManagement.Message.SignatureError,
                        4,
                      );
                    } else {
                      setProfileType(1);
                      await uploadInfo({
                        ...form.getFieldsValue(true),
                        sectionIds: sectionIds,
                        ...userFiles,
                      });
                    }
                  })
                  .catch((errorInfo) => {
                    const errorMessages = errorInfo.errorFields?.map(
                      (field: any) => {
                        return field.errors;
                      },
                    );
                    popUpComponent.error(errorMessages?.[0], 4);
                  });
              }}
            >
              <span className="font-bold">
                {localStrings.TravelSimListManagement.Labels.Connect}
              </span>
            </Button>
          </Form.Item>
        </Col>
        <Spin spinning={submitLoading} size='large' fullscreen />
      </Row>
    </Form>
  )
}

export default CreateForm