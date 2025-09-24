import {
  Button,
  Form,
  Input,
  Modal,
} from "antd";
import { CreateSubjectResponseModel } from "api/repositories/subjectManagement/model/CreateSubjectResponseModel";
import { UpdateSubjectResponseModel } from "api/repositories/subjectManagement/model/UpdateSubjectResponseModel";
import { defaultSubjectManagementRepository } from "api/repositories/subjectManagement/SubjectManagementRepository";
import { AuthenticationContext } from "context/AuthenticationContext";
import { ISubjectManagementAction } from "pages/subjectManagement/interface/ISubjectManagement";
import { useEffect, useState } from "react";
import { getMessage } from "utils/helpersInTs/helpersInTs";

const SubjectManagementActionFeature = (props: ISubjectManagementAction) => {
  const { open, onClose, onSuccess, subjectId, isEdit } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { localStrings } = AuthenticationContext();

  useEffect(() => {
    if (open) {
      form.resetFields();
    }
  }, [open, form]);

  const handleSubmit = async (values: CreateSubjectResponseModel | UpdateSubjectResponseModel) => {
    try {
      setLoading(true);

      let response;
      if (isEdit && subjectId) {
        response = await defaultSubjectManagementRepository.updateSubject(subjectId, values as UpdateSubjectResponseModel);
        if (response?.data) {
          getMessage(localStrings.SubjectManagement.UpdateSubjectSuccess, 4, "success");
        }
      } else {
        response = await defaultSubjectManagementRepository.createSubject(values as CreateSubjectResponseModel);
        if (response?.data) {
          getMessage(localStrings.SubjectManagement.CreateSubjectSuccess, 4, "success");
        }
      }
      
      if (response?.data) {
        onSuccess();
        onClose();
      }
    } catch (error) {
      if (isEdit) {
        getMessage(localStrings.SubjectManagement.UpdateSubjectFailed, 4, "error");
      } else {
        getMessage(localStrings.SubjectManagement.CreateSubjectFailed, 4, "error");
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
      title={isEdit ? localStrings.SubjectManagement.EditSubject : localStrings.SubjectManagement.CreateSubject}
      open={open}
      centered
      onCancel={handleCancel}
      footer={null}
      styles={{
        header: { backgroundColor: "#f0f2f5", borderBottom: "1px solid #d9d9d9" },
        body: { padding: "24px" },
      }}
      width={600}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <div className="space-y-4">
          <div className="text-lg font-semibold text-blue-600 mb-4">
            {localStrings.SubjectManagement.Sections.SubjectInfo}
          </div>
          
          <Form.Item
            label={localStrings.SubjectManagement.Labels.name}
            name="name"
            rules={[
              { required: true, message: `Please enter ${localStrings.SubjectManagement.Labels.name.toLowerCase()}` },
              { min: 2, message: "Subject name must be at least 2 characters" }
            ]}
          >
            <Input placeholder={localStrings.SubjectManagement.Placeholders.enterSubjectName} />
          </Form.Item>

          <Form.Item
            label={localStrings.SubjectManagement.Labels.code}
            name="code"
            rules={[
              { required: true, message: `Please enter ${localStrings.SubjectManagement.Labels.code.toLowerCase()}` },
              { min: 2, message: "Subject code must be at least 2 characters" }
            ]}
          >
            <Input placeholder={localStrings.SubjectManagement.Placeholders.enterSubjectCode} />
          </Form.Item>
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

export default SubjectManagementActionFeature;
