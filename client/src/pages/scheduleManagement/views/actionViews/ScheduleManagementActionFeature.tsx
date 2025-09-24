import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
} from "antd";
import { CreateScheduleResponseModel } from "api/repositories/scheduleManagement/model/CreateScheduleResponseModel";
import { UpdateScheduleResponseModel } from "api/repositories/scheduleManagement/model/UpdateScheduleResponseModel";
import { defaultScheduleManagementRepository } from "api/repositories/scheduleManagement/ScheduleManagementRepository";
import { AuthenticationContext } from "context/AuthenticationContext";
import dayjs from "dayjs";
import { IScheduleManagementAction } from "pages/scheduleManagement/interface/IScheduleManagement";
import { useEffect, useState } from "react";
import { getMessage } from "utils/helpersInTs/helpersInTs";

const ScheduleManagementActionFeature = (props: IScheduleManagementAction) => {
  const { open, onClose, onSuccess, scheduleId, isEdit } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { localStrings } = AuthenticationContext();

  // Mock data for teachers and subjects - in real app, these would come from API
  const [teachers] = useState([
    { value: "teacher1", label: "John Doe" },
    { value: "teacher2", label: "Jane Smith" },
    { value: "teacher3", label: "Mike Johnson" },
  ]);

  const [subjects] = useState([
    { value: "subject1", label: "Mathematics" },
    { value: "subject2", label: "Physics" },
    { value: "subject3", label: "Chemistry" },
    { value: "subject4", label: "Biology" },
    { value: "subject5", label: "English" },
  ]);

  useEffect(() => {
    if (open) {
      form.resetFields();
    }
  }, [open, form]);

  const handleSubmit = async (values: CreateScheduleResponseModel | UpdateScheduleResponseModel) => {
    try {
      setLoading(true);
      
      // Format the data for submission
      const submitData = {
        ...values,
        startTime: values.startTime ? dayjs(values.startTime).toISOString() : undefined,
        endTime: values.endTime ? dayjs(values.endTime).toISOString() : undefined,
      };

      let response;
      if (isEdit && scheduleId) {
        response = await defaultScheduleManagementRepository.updateSchedule(scheduleId, submitData as UpdateScheduleResponseModel);
        if (response?.data) {
          getMessage(localStrings.ScheduleManagement.UpdateScheduleSuccess, 4, "success");
        }
      } else {
        response = await defaultScheduleManagementRepository.createSchedule(submitData as CreateScheduleResponseModel);
        if (response?.data) {
          getMessage(localStrings.ScheduleManagement.CreateScheduleSuccess, 4, "success");
        }
      }
      
      if (response?.data) {
        onSuccess();
        onClose();
      }
    } catch (error) {
      if (isEdit) {
        getMessage(localStrings.ScheduleManagement.UpdateScheduleFailed, 4, "error");
      } else {
        getMessage(localStrings.ScheduleManagement.CreateScheduleFailed, 4, "error");
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
      title={isEdit ? localStrings.ScheduleManagement.EditSchedule : localStrings.ScheduleManagement.CreateSchedule}
      open={open}
      centered
      onCancel={handleCancel}
      footer={null}
      styles={{
        header: { backgroundColor: "#f0f2f5", borderBottom: "1px solid #d9d9d9" },
        body: { padding: "24px" },
      }}
      width={800}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          startTime: dayjs(),
          endTime: dayjs().add(2, 'hour'),
        }}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label={localStrings.ScheduleManagement.Labels.teacher}
              name="teacherId"
              rules={[
                { required: true, message: `Please select ${localStrings.ScheduleManagement.Labels.teacher.toLowerCase()}` }
              ]}
            >
              <Select
                placeholder={localStrings.ScheduleManagement.Placeholders.selectTeacher}
                options={teachers}
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
              />
            </Form.Item>

            <Form.Item
              label={localStrings.ScheduleManagement.Labels.subject}
              name="subjectId"
              rules={[
                { required: true, message: `Please select ${localStrings.ScheduleManagement.Labels.subject.toLowerCase()}` }
              ]}
            >
              <Select
                placeholder={localStrings.ScheduleManagement.Placeholders.selectSubject}
                options={subjects}
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
              />
            </Form.Item>
          </div>

          <Form.Item
            label={localStrings.ScheduleManagement.Labels.className}
            name="className"
            rules={[
              { required: true, message: `Please enter ${localStrings.ScheduleManagement.Labels.className.toLowerCase()}` },
              { min: 2, message: "Class name must be at least 2 characters" }
            ]}
          >
            <Input placeholder={localStrings.ScheduleManagement.Placeholders.enterClassName} />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label={localStrings.ScheduleManagement.Labels.startTime}
              name="startTime"
              rules={[
                { required: true, message: `Please select ${localStrings.ScheduleManagement.Labels.startTime.toLowerCase()}` }
              ]}
            >
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm"
                placeholder={localStrings.ScheduleManagement.Placeholders.selectStartTime}
                className="w-full"
              />
            </Form.Item>

            <Form.Item
              label={localStrings.ScheduleManagement.Labels.endTime}
              name="endTime"
              rules={[
                { required: true, message: `Please select ${localStrings.ScheduleManagement.Labels.endTime.toLowerCase()}` }
              ]}
            >
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm"
                placeholder={localStrings.ScheduleManagement.Placeholders.selectEndTime}
                className="w-full"
              />
            </Form.Item>
          </div>

          <Form.Item
            label={localStrings.ScheduleManagement.Labels.location}
            name="location"
          >
            <Input placeholder={localStrings.ScheduleManagement.Placeholders.enterLocation} />
          </Form.Item>

          <Form.Item
            label={localStrings.ScheduleManagement.Labels.note}
            name="note"
          >
            <Input.TextArea
              rows={3}
              placeholder={localStrings.ScheduleManagement.Placeholders.enterNote}
            />
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

export default ScheduleManagementActionFeature;
