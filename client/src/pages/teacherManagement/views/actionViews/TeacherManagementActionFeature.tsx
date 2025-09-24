import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
} from "antd";
import { CreateTeacherResponseModel } from "api/repositories/teacherManagement/model/CreateTeacherResponseModel";
import { UpdateTeacherResponseModel } from "api/repositories/teacherManagement/model/UpdateTeacherResponseModel";
import { defaultTeacherManagementRepository } from "api/repositories/teacherManagement/TeacherManagementRepository";
import { AuthenticationContext } from "context/AuthenticationContext";
import dayjs from "dayjs";
import { ITeacherManagementAction } from "pages/teacherManagement/interface/ITeacherManagement";
import { useEffect, useState } from "react";
import { getMessage } from "utils/helpersInTs/helpersInTs";

const TeacherManagementActionFeature = (props: ITeacherManagementAction) => {
  const { open, onClose, onSuccess, teacherId, isEdit } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { localStrings } = AuthenticationContext();

  useEffect(() => {
    if (open) {
      form.resetFields();
    }
  }, [open, form]);

  const handleSubmit = async (values: CreateTeacherResponseModel | UpdateTeacherResponseModel) => {
    try {
      setLoading(true);
      
      // Format the data for submission
      const submitData = {
        ...values,
        birthDay: values.birthDay ? dayjs(values.birthDay).format('YYYY-MM-DD') : undefined,
        dateOfIssue: values.dateOfIssue ? dayjs(values.dateOfIssue).format('YYYY-MM-DD') : undefined,
      };

      let response;
      if (isEdit && teacherId) {
        response = await defaultTeacherManagementRepository.updateTeacher(teacherId, submitData as UpdateTeacherResponseModel);
        if (response?.data) {
          getMessage(localStrings.TeacherManagement.UpdateTeacherSuccess, 4, "success");
        }
      } else {
        response = await defaultTeacherManagementRepository.createTeacher(submitData as CreateTeacherResponseModel);
        if (response?.data) {
          getMessage(localStrings.TeacherManagement.CreateTeacherSuccess, 4, "success");
        }
      }
      
      if (response?.data) {
        onSuccess();
        onClose();
      }
    } catch (error) {
      if (isEdit) {
        getMessage(localStrings.TeacherManagement.UpdateTeacherFailed, 4, "error");
      } else {
        getMessage(localStrings.TeacherManagement.CreateTeacherFailed, 4, "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={isEdit ? localStrings.TeacherManagement.EditTeacher : localStrings.TeacherManagement.CreateTeacher}
      open={open}
      centered
      onCancel={handleCancel}
      footer={null}
      styles={{
        header: { backgroundColor: "#f0f2f5", borderBottom: "1px solid #d9d9d9" },
        body: { padding: "24px" },
      }}
      width={900}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <div className="space-y-4">
          <div className="text-lg font-semibold text-blue-600 mb-4">
            {localStrings.TeacherManagement.Sections.BasicInfo}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label={localStrings.TeacherManagement.Labels.username}
              name="username"
              rules={[
                { required: true, message: `Please enter ${localStrings.TeacherManagement.Labels.username.toLowerCase()}` },
                { min: 3, message: "Username must be at least 3 characters" }
              ]}
            >
              <Input placeholder={localStrings.TeacherManagement.Placeholders.enterUsername} />
            </Form.Item>

            <Form.Item
              label={localStrings.TeacherManagement.Labels.fullName}
              name="fullName"
              rules={[
                { required: true, message: `Please enter ${localStrings.TeacherManagement.Labels.fullName.toLowerCase()}` },
                { min: 2, message: "Full name must be at least 2 characters" }
              ]}
            >
              <Input placeholder={localStrings.TeacherManagement.Placeholders.enterFullName} />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label={localStrings.TeacherManagement.Labels.password}
              name="password"
              rules={[
                { required: !isEdit, message: `Please enter ${localStrings.TeacherManagement.Labels.password.toLowerCase()}` },
                { min: 6, message: "Password must be at least 6 characters" }
              ]}
            >
              <Input.Password placeholder={localStrings.TeacherManagement.Placeholders.enterPassword} />
            </Form.Item>

            <Form.Item
              label={localStrings.TeacherManagement.Labels.gender}
              name="gender"
              rules={[
                { required: true, message: `Please select ${localStrings.TeacherManagement.Labels.gender.toLowerCase()}` }
              ]}
            >
              <Select placeholder={localStrings.TeacherManagement.Placeholders.selectGender}>
                <Select.Option value="male">{localStrings.GlobalLabels.Male}</Select.Option>
                <Select.Option value="female">{localStrings.GlobalLabels.Female}</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label={localStrings.TeacherManagement.Labels.profileAvatar}
              name="profileAvatar"
            >
              <Input placeholder={localStrings.TeacherManagement.Placeholders.enterProfileAvatar} />
            </Form.Item>

            <Form.Item
              label={localStrings.TeacherManagement.Labels.code}
              name="code"
            >
              <Input placeholder={localStrings.TeacherManagement.Placeholders.enterCode} />
            </Form.Item>
          </div>

          <div className="text-lg font-semibold text-blue-600 mb-4 mt-6">
            {localStrings.TeacherManagement.Sections.PersonalInfo}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label={localStrings.TeacherManagement.Labels.birthDay}
              name="birthDay"
            >
              <DatePicker
                format="YYYY-MM-DD"
                placeholder={localStrings.TeacherManagement.Placeholders.selectBirthDay}
                className="w-full"
              />
            </Form.Item>

            <Form.Item
              label={localStrings.TeacherManagement.Labels.placeOfOrigin}
              name="placeOfOrigin"
            >
              <Input placeholder={localStrings.TeacherManagement.Placeholders.enterPlaceOfOrigin} />
            </Form.Item>
          </div>

          <div className="text-lg font-semibold text-blue-600 mb-4 mt-6">
            {localStrings.TeacherManagement.Sections.IdentityInfo}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label={localStrings.TeacherManagement.Labels.identifyCard}
              name="identifyCard"
            >
              <Input placeholder={localStrings.TeacherManagement.Placeholders.enterIdentifyCard} />
            </Form.Item>

            <Form.Item
              label={localStrings.TeacherManagement.Labels.dateOfIssue}
              name="dateOfIssue"
            >
              <DatePicker
                format="YYYY-MM-DD"
                placeholder={localStrings.TeacherManagement.Placeholders.selectDateOfIssue}
                className="w-full"
              />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label={localStrings.TeacherManagement.Labels.placeOfIssue}
              name="placeOfIssue"
            >
              <Input placeholder={localStrings.TeacherManagement.Placeholders.enterPlaceOfIssue} />
            </Form.Item>

            <Form.Item
              label={localStrings.TeacherManagement.Labels.religion}
              name="religion"
            >
              <Input placeholder={localStrings.TeacherManagement.Placeholders.enterReligion} />
            </Form.Item>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button onClick={handleCancel}>
            {localStrings.GlobalLabels.Cancel}
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="bg-blue-500 hover:bg-blue-600"
          >
            {isEdit ? localStrings.GlobalLabels.Update : localStrings.GlobalLabels.Create}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default TeacherManagementActionFeature;
