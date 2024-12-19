import { Form, Row, Col, Input, DatePicker, Select, Space, Button } from 'antd';
import { CountrySelect } from 'components/generalComponents/countrySelection/CountrySelection';
import popUpComponent from 'components/generalComponents/popUpComponent/PopUpComponent';
import { AuthenticationContext } from 'context/AuthenticationContext';
import dayjs from 'dayjs';
import { IConfirmForm } from 'pages/travelSimList/interfaces/CreateProfileInterface';
import { useEffect, useState } from 'react';
import { CountryIso2 } from 'react-international-phone';
import { createFormRules } from 'utils/helpersInTs/helpersInTs';

const ConfirmForm: React.FC<IConfirmForm> = (props: IConfirmForm) => {
  const {
    userData,
    confirmInfo,
    loading,
    nationList,
    profileType
  } = props;
  const [form] = Form.useForm();
  const { localStrings } = AuthenticationContext();
  const [iso2, setIso2] = useState<CountryIso2>('us');

  const dateFormats = ['DD/MM/YYYY', 'DD-MM-YYYY', 'YYYY-MM-DD', 'YYYY/MM/DD', 'DD/MM/YYYY HH:mm:ss'];

  const isValidDate = (dateString: string) => {
    return dayjs(dateString, dateFormats, true).isValid();
  };

  const parseDateOrNull = (dateString: string) => {
    return isValidDate(dateString) ? dayjs(dateString, dateFormats) : null;
  };

  useEffect(() => {
    if (userData) {
      setIso2(userData?.dialCode || 'us');
    }
  }, [userData]);

  return (
    <Form form={form} layout="vertical" requiredMark={false} className='mt-6'>
      <Row gutter={32}>
        <Col span={24} md={8}>
          <Form.Item
            name="createdDate"
            label={
              <span className="font-bold">
                {localStrings.TravelSimListManagement.Labels.Time}
              </span>
            }
            initialValue={parseDateOrNull(dayjs().format("DD/MM/YYYY HH:mm:ss") || '')}
            rules={[
              {
                required: true,
                message: localStrings.TravelSimListManagement.Message.EmptyField,
              },
            ]}
          >
            <DatePicker
              format="DD/MM/YYYY HH:mm:ss"
              showTime={{ format: 'HH:mm:ss' }}
              placeholder={localStrings.TravelSimListManagement.Labels.Time}
              style={{ width: '100%' }}
              allowClear={false}
            />
          </Form.Item>
        </Col>
        <Col span={24} md={8}>
          <Form.Item
            name="idNumber"
            label={
              <span className="font-bold">
                {localStrings.TravelSimListManagement.Labels.IdNumber}
              </span>
            }
            initialValue={
              userData?.idNumber && userData?.idNumber !== '-'
                ? userData?.idNumber
                : null
            }
            rules={[
              {
                required: true,
                message: localStrings.TravelSimListManagement.Message.EmptyField,
              },
            ]}
          >
            <Input
              placeholder={localStrings.TravelSimListManagement.Labels.IdNumber}
            />
          </Form.Item>
        </Col>
        <Col span={24} md={8}>
          <Form.Item
            name="name"
            label={
              <span className="font-bold">
                {localStrings.TravelSimListManagement.Labels.Name}
              </span>
            }
            initialValue={
              userData?.name && userData?.name !== '-' ? userData?.name : null
            }
            rules={[
              {
                required: true,
                message: localStrings.TravelSimListManagement.Message.EmptyField,
              },
            ]}
          >
            <Input placeholder={localStrings.TravelSimListManagement.Labels.Name} />
          </Form.Item>
        </Col>
        <Col span={24} md={8}>
          <Form.Item
            name="birthDay"
            label={
              <span className="font-bold">
                {localStrings.TravelSimListManagement.Labels.Birthday}
              </span>
            }
            initialValue={parseDateOrNull(userData?.birthDay || '')}
            rules={[
              {
                validator: (_, value) => {
                  if (isValidDate(value)) {
                    if (value > dayjs()) {
                      return Promise.reject(
                        new Error(localStrings.TravelSimListManagement.Message.DateError),
                      );
                    } else {
                      return Promise.resolve();
                    }
                  } else {
                    return Promise.reject(
                      new Error(localStrings.TravelSimListManagement.Message.EmptyField),
                    );
                  }
                },
              },
            ]}
          >
            <DatePicker
              format="DD/MM/YYYY"
              style={{ width: '100%' }}
              allowClear={false}
              disabledDate={(current) => current && current > dayjs()}
              placeholder={localStrings.TravelSimListManagement.Labels.Birthday}
            />
          </Form.Item>
        </Col>
        <Col span={24} md={8}>
          <Form.Item
            name="sex"
            label={
              <span className="font-bold">
                {localStrings.TravelSimListManagement.Labels.Sex}
              </span>
            }
            initialValue={
              userData?.sex && userData?.sex !== '-'
                ? Number(userData?.sex)
                : null
            }
            rules={[
              {
                required: true,
                message: localStrings.TravelSimListManagement.Message.EmptyField,
              },
            ]}
          >
            <Select
              options={[
                { value: 1, label: localStrings.GlobalLabels.Male },
                { value: 2, label: localStrings.GlobalLabels.Female },
              ]}
              placeholder={localStrings.TravelSimListManagement.Labels.Sex}
            />
          </Form.Item>
        </Col>
        <Col span={24} md={8}>
          <Form.Item
            name="address"
            label={
              <>
                <span className="font-bold">
                  {localStrings.TravelSimListManagement.Labels.Address}
                </span>
              </>
            }
            initialValue={
              userData?.address && userData?.address !== '-'
                ? userData?.address
                : ""
            }
            rules={createFormRules(true, "string", localStrings.TravelSimListManagement.Message.EmptyField)}
          >
            <Input
              placeholder={
                localStrings.TravelSimListManagement.Labels.Address
              }
            />
          </Form.Item>
        </Col>
        <Col span={24} md={8}>
          <Form.Item
            name="placeOfOrigin"
            label={
              <>
                <span className="font-bold">
                  {localStrings.TravelSimListManagement.Labels.PlaceOfOrigin}
                </span>
              </>
            }
            initialValue={
              userData?.placeOfOrigin && userData?.placeOfOrigin !== '-'
                ? nationList?.find(
                  (item) =>
                    item?.name?.toLowerCase() ===
                    userData?.placeOfOrigin?.toLowerCase(),
                )?.code
                : null
            }
            rules={createFormRules(true, "string", localStrings.TravelSimListManagement.Message.EmptyField)}
          >
            <Select
              options={nationList?.map((item) => {
                return {
                  label: item?.name,
                  value: item?.code,
                };
              })}
              showSearch
              filterOption={(inputValue, option) => {
                if (typeof option?.label === 'string') {
                  return option?.label
                    .toLowerCase()
                    .includes(inputValue.toLowerCase());
                }
                return false;
              }}
              placeholder={localStrings.TravelSimListManagement.Labels.PlaceOfOrigin}
              onChange={(value) => {
                form.validateFields()
              }}
            />
          </Form.Item>
        </Col>
        <Col span={24} md={8}>
          <Form.Item
            name="issueDate"
            label={
              <span className="font-bold">
                {localStrings.TravelSimListManagement.Labels.IssueDate}
              </span>
            }
            initialValue={parseDateOrNull(userData?.issueDate || '')}
            rules={[
              {
                validator: (_, value) => {
                  if (isValidDate(value)) {
                    if (value > dayjs()) {
                      return Promise.reject(
                        new Error(localStrings.TravelSimListManagement.Message.DateError),
                      );
                    } else {
                      return Promise.resolve();
                    }
                  } else {
                    return Promise.reject(
                      new Error(localStrings.TravelSimListManagement.Message.EmptyField),
                    );
                  }
                },
              },
            ]}
          >
            <DatePicker
              format="DD/MM/YYYY"
              style={{ width: '100%' }}
              allowClear={false}
              disabledDate={(current) => current && current > dayjs()}
              placeholder={localStrings.TravelSimListManagement.Labels.IssueDate}
            />
          </Form.Item>
        </Col>
        <Col span={24} md={8}>
          <Form.Item
            name="issuePlace"
            label={
              <>
                <span className="font-bold">
                  {localStrings.TravelSimListManagement.Labels.IssuePlace}
                </span>
                <span className="text-gray-400 ml-2 text-xs">{`(${localStrings.TravelSimListManagement.Message.NationalityNote})`}</span>
              </>
            }
            initialValue={
              nationList?.find((item) => item?.code === userData?.issuePlace)
                ? userData?.issuePlace
                : null
            }
            rules={createFormRules(true, "string", localStrings.TravelSimListManagement.Message.EmptyField)}
          >
            <Input
              placeholder={localStrings.TravelSimListManagement.Labels.IssuePlace}
              className='pointer-events-none'
              onChange={() => form.validateFields()}
            />
          </Form.Item>
        </Col>
        <Col span={24} md={8}>
          <Form.Item
            name="nationality"
            label={
              <span className="font-bold">
                {localStrings.TravelSimListManagement.Labels.Nationality}
              </span>
            }
            initialValue={
              userData?.nationality && userData?.nationality !== '-'
                ? nationList?.find(
                  (item) =>
                    item?.name?.toLowerCase() ===
                    userData?.nationality?.toLowerCase(),
                )?.code
                : null
            }
            rules={createFormRules(
              true,
              'string',
              localStrings.TravelSimListManagement.Message.EmptyField,
            )}
          >
            <Select
              options={nationList?.filter((item) => item?.name.toLowerCase() !== 'vietnam')
                .map((item) => {
                return {
                  label: item?.name,
                  value: item?.code,
                };
              })}
              showSearch
              filterOption={(inputValue, option) => {
                if (typeof option?.label === 'string') {
                  return option?.label
                    .toLowerCase()
                    .includes(inputValue.toLowerCase());
                }
                return false;
              }}
              placeholder={localStrings.TravelSimListManagement.Labels.Nationality}
              onChange={(value) => {
                form.setFieldValue("issuePlace", value);
                form.validateFields()
              }}
            />
          </Form.Item>
        </Col>
        <Col span={24} md={8}>
          <Form.Item
            name="sim"
            label={
              <span className="font-bold">
                {localStrings.TravelSimListManagement.Labels.Sim}
              </span>
            }
            initialValue={
              userData?.sim && userData?.sim !== '-' ? userData?.sim : null
            }
            rules={[
              {
                required: true,
                message: localStrings.TravelSimListManagement.Message.EmptyField,
              },
              {
                pattern: /^\d{8,15}$/,
                message: localStrings.TravelSimListManagement.Message.InvalidPhone,
              },
            ]}
          >
            <Input
              maxLength={15}
              minLength={8}
              placeholder={localStrings.TravelSimListManagement.Labels.Sim}
              readOnly={userData?.sim && userData?.sim !== '-' ? true : false}
            />
          </Form.Item>
        </Col>
        <Col span={24} md={8}>
          <Form.Item
            name="serial"
            label={
              <span className="font-bold">
                {localStrings.TravelSimListManagement.Labels.Serial}
              </span>
            }
            initialValue={
              userData?.serial && userData?.serial !== '-'
                ? userData?.serial
                : null
            }
            rules={[
              {
                required: true,
                message: localStrings.TravelSimListManagement.Message.EmptyField,
              },
            ]}
          >
            <Input
              placeholder={localStrings.TravelSimListManagement.Labels.Serial}
              readOnly={
                userData?.serial && userData?.serial !== '-' ? true : false
              }
            />
          </Form.Item>
        </Col>
        <Col span={24} md={8}>
          <Form.Item
            name="emailContact"
            label={
              <span className="font-bold">
                {localStrings.TravelSimListManagement.Labels.EmailContact}
              </span>
            }
            initialValue={userData?.emailContact}
            rules={[
              {
                required: true,
                message: localStrings.TravelSimListManagement.Message.EmptyField,
              },
              {
                type: 'email',
                message: localStrings.TravelSimListManagement.Message.InvalidEmail,
              },
            ]}
          >
            <Input
              placeholder={localStrings.TravelSimListManagement.Labels.EmailContact}
              type="email"
            />
          </Form.Item>
        </Col>
        <Col span={24} md={8}>
          <Form.Item
            name="phoneContact"
            initialValue={userData?.phoneContact}
            label={
              <span className="font-bold">
                {localStrings.TravelSimListManagement.Labels.PhoneContact}
              </span>
            }
            rules={[
              {
                required: true,
                message: localStrings.TravelSimListManagement.Message.EmptyField,
              },
              {
                pattern: /^\d{6,15}$/,
                message: localStrings.TravelSimListManagement.Message.InvalidPhone,
              },
            ]}
          >
            <Space.Compact style={{ width: '100%' }}>
              <CountrySelect
                iso2={iso2}
                setIso2={setIso2}
                variant="outlined"
              />
              <Input
                variant="outlined"
                placeholder={localStrings.TravelSimListManagement.Labels.PhoneContact}
                minLength={6}
                maxLength={15}
                defaultValue={userData?.phoneContact}
                type="tel"
              />
            </Space.Compact>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={32} justify={'end'}>
        <Col span={8} md={4}>
          <Form.Item>
            <Button
              type="primary"
              className="w-full"
              loading={loading}
              onClick={() => {
                form.validateFields().then(() => {
                  confirmInfo({
                    ...form.getFieldsValue(true),
                    profileType,
                    dialCode: iso2,
                  });
                }).catch((errorInfo) => {
                  const errorMessages = errorInfo.errorFields?.map(
                    (field: any) => {
                      return field.errors;
                    },
                  );
                  popUpComponent.error(errorMessages?.[0], 4);
                });
              }}
            >
              {localStrings.GlobalLabels.Confirmed}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default ConfirmForm