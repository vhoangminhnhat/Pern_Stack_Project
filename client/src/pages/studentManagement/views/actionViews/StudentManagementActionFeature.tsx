import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Switch,
} from "antd";
import { CreateStudentResponseModel } from "api/repositories/studentManagement/model/create/CreateStudentResponseModel";
import { defaultStudentManagementRepository } from "api/repositories/studentManagement/StudentManagementRepository";
import { AuthenticationContext } from "context/AuthenticationContext";
import dayjs from "dayjs";
import { IStudentManagementAction } from "pages/studentManagement/interface/IStudentManagement";
import { useEffect, useState } from "react";
import { getMessage } from "utils/helpersInTs/helpersInTs";

const StudentManagementActionFeature = (props: IStudentManagementAction) => {
  const { open, onClose, onSuccess } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { localStrings } = AuthenticationContext();

  useEffect(() => {
    if (open) {
      form.resetFields();
    }
  }, [open, form]);

  const handleSubmit = async (values: CreateStudentResponseModel) => {
    try {
      setLoading(true);
      
      // Format the data for submission
      const submitData = {
        ...values,
        birthDate: values.birthDate ? dayjs(values.birthDate).format('YYYY-MM-DD') : undefined,
        curricularUnits1stSemEnrolled: values.curricularUnits1stSemEnrolled || 0,
        curricularUnits1stSemApproved: values.curricularUnits1stSemApproved || 0,
        curricularUnits1stSemGrade: values.curricularUnits1stSemGrade || 0.0,
        curricularUnits2ndSemEnrolled: values.curricularUnits2ndSemEnrolled || 0,
        curricularUnits2ndSemApproved: values.curricularUnits2ndSemApproved || 0,
        curricularUnits2ndSemGrade: values.curricularUnits2ndSemGrade || 0.0,
        debtor: values.debtor || false,
        tuitionFeesUpToDate: values.tuitionFeesUpToDate !== undefined ? values.tuitionFeesUpToDate : true,
        totalEnrolled: values.totalEnrolled || 0,
        totalApproved: values.totalApproved || 0,
        totalFailed: values.totalFailed || 0,
        averageGrade: values.averageGrade || 0.0,
        unpassedCourses: values.unpassedCourses || 0,
      };

      const response = await defaultStudentManagementRepository.createStudent(submitData);
      
      if (response?.data) {
        getMessage(localStrings.StudentManagement.CreateStudentSuccess, 4, "success");
        onSuccess();
        onClose();
      }
    } catch (error) {
      getMessage(localStrings.StudentManagement.CreateStudentFailed, 4, "error");
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
      title={localStrings.StudentManagement.CreateStudent}
      open={open}
      centered
      onCancel={handleCancel}
      footer={null}
      styles={{
        body: {
          overflowY: "auto",
          maxHeight: "calc(100vh - 110px)",
          scrollbarWidth: "none",
          overflowX: "hidden",
        },
      }}
      width={800}
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          gender: "male",
          debtor: false,
          tuitionFeesUpToDate: true,
          curricularUnits1stSemEnrolled: 0,
          curricularUnits1stSemApproved: 0,
          curricularUnits1stSemGrade: 0.0,
          curricularUnits2ndSemEnrolled: 0,
          curricularUnits2ndSemApproved: 0,
          curricularUnits2ndSemGrade: 0.0,
          totalEnrolled: 0,
          totalApproved: 0,
          totalFailed: 0,
          averageGrade: 0.0,
          unpassedCourses: 0,
        }}
      >
        <div className="grid grid-cols-2 gap-4">
          {/* Basic Information */}
          <div className="col-span-2">
            <h3 className="text-lg font-semibold mb-3 text-blue-600">
              {localStrings.StudentManagement.Sections.BasicInfo}
            </h3>
          </div>

          <Form.Item
            label={localStrings.StudentManagement.Labels.studentId}
            name="studentId"
            rules={[
              {
                required: true,
                message: `Please enter ${localStrings.StudentManagement.Labels.studentId.toLowerCase()}`,
              },
              { min: 3, message: "Student ID must be at least 3 characters" },
            ]}
          >
            <Input
              placeholder={
                localStrings.StudentManagement.Placeholders.enterStudentId
              }
            />
          </Form.Item>

          <Form.Item
            label={localStrings.StudentManagement.Labels.fullName}
            name="fullName"
            rules={[
              {
                required: true,
                message: `Please enter ${localStrings.StudentManagement.Labels.fullName.toLowerCase()}`,
              },
              { min: 2, message: "Full name must be at least 2 characters" },
            ]}
          >
            <Input
              placeholder={
                localStrings.StudentManagement.Placeholders.enterFullName
              }
            />
          </Form.Item>

          <Form.Item
            label={localStrings.StudentManagement.Labels.gender}
            name="gender"
            rules={[
              {
                required: true,
                message: `Please select ${localStrings.StudentManagement.Labels.gender.toLowerCase()}`,
              },
            ]}
          >
            <Select
              placeholder={
                localStrings.StudentManagement.Placeholders.selectGender
              }
            >
              <Select.Option value="male">
                {localStrings.GlobalLabels.Male}
              </Select.Option>
              <Select.Option value="female">
                {localStrings.GlobalLabels.Female}
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label={localStrings.StudentManagement.Labels.birthDate}
            name="birthDate"
            rules={[
              {
                validator: (_, value) => {
                  if (value && !dayjs(value).isValid()) {
                    return Promise.reject(new Error('Please enter a valid date'));
                  }
                  return Promise.resolve();
                }
              }
            ]}
          >
            <DatePicker 
              style={{ width: '100%' }} 
              placeholder={localStrings.StudentManagement.Placeholders.selectBirthDate}
              format="YYYY-MM-DD"
              disabledDate={(current) => {
                // Disable future dates
                return current && current > dayjs().endOf('day');
              }}
            />
          </Form.Item>

          {/* First Semester */}
          <div className="col-span-2">
            <h3 className="text-lg font-semibold mb-3 text-green-600">
              {localStrings.StudentManagement.Sections.FirstSemester}
            </h3>
          </div>

          <Form.Item
            label={
              localStrings.StudentManagement.Labels
                .curricularUnits1stSemEnrolled
            }
            name="curricularUnits1stSemEnrolled"
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              placeholder={
                localStrings.StudentManagement.Placeholders.enterUnitsEnrolled
              }
            />
          </Form.Item>

          <Form.Item
            label={
              localStrings.StudentManagement.Labels
                .curricularUnits1stSemApproved
            }
            name="curricularUnits1stSemApproved"
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              placeholder={
                localStrings.StudentManagement.Placeholders.enterUnitsApproved
              }
            />
          </Form.Item>

          <Form.Item
            label={
              localStrings.StudentManagement.Labels.curricularUnits1stSemGrade
            }
            name="curricularUnits1stSemGrade"
            rules={[
              {
                type: "number",
                min: 0,
                max: 20,
                message: "Grade must be between 0 and 20",
              },
            ]}
          >
            <InputNumber
              min={0}
              max={20}
              step={0.1}
              style={{ width: "100%" }}
              placeholder={
                localStrings.StudentManagement.Placeholders.enterGrade
              }
            />
          </Form.Item>

          {/* Second Semester */}
          <div className="col-span-2">
            <h3 className="text-lg font-semibold mb-3 text-purple-600">
              {localStrings.StudentManagement.Sections.SecondSemester}
            </h3>
          </div>

          <Form.Item
            label={
              localStrings.StudentManagement.Labels
                .curricularUnits2ndSemEnrolled
            }
            name="curricularUnits2ndSemEnrolled"
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              placeholder={
                localStrings.StudentManagement.Placeholders.enterUnitsEnrolled
              }
            />
          </Form.Item>

          <Form.Item
            label={
              localStrings.StudentManagement.Labels
                .curricularUnits2ndSemApproved
            }
            name="curricularUnits2ndSemApproved"
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              placeholder={
                localStrings.StudentManagement.Placeholders.enterUnitsApproved
              }
            />
          </Form.Item>

          <Form.Item
            label={
              localStrings.StudentManagement.Labels.curricularUnits2ndSemGrade
            }
            name="curricularUnits2ndSemGrade"
            rules={[
              {
                type: "number",
                min: 0,
                max: 20,
                message: "Grade must be between 0 and 20",
              },
            ]}
          >
            <InputNumber
              min={0}
              max={20}
              step={0.1}
              style={{ width: "100%" }}
              placeholder={
                localStrings.StudentManagement.Placeholders.enterGrade
              }
            />
          </Form.Item>

          {/* Financial Status */}
          <div className="col-span-2">
            <h3 className="text-lg font-semibold mb-3 text-orange-600">
              {localStrings.StudentManagement.Sections.FinancialStatus}
            </h3>
          </div>

          <Form.Item
            label={localStrings.StudentManagement.Labels.debtor}
            name="debtor"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            label={localStrings.StudentManagement.Labels.tuitionFeesUpToDate}
            name="tuitionFeesUpToDate"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          {/* Academic Summary */}
          <div className="col-span-2">
            <h3 className="text-lg font-semibold mb-3 text-red-600">
              {localStrings.StudentManagement.Sections.AcademicSummary}
            </h3>
          </div>

          <Form.Item
            label={localStrings.StudentManagement.Labels.totalEnrolled}
            name="totalEnrolled"
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              placeholder={
                localStrings.StudentManagement.Placeholders.enterTotalEnrolled
              }
            />
          </Form.Item>

          <Form.Item
            label={localStrings.StudentManagement.Labels.totalApproved}
            name="totalApproved"
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              placeholder={
                localStrings.StudentManagement.Placeholders.enterTotalApproved
              }
            />
          </Form.Item>

          <Form.Item
            label={localStrings.StudentManagement.Labels.totalFailed}
            name="totalFailed"
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              placeholder={
                localStrings.StudentManagement.Placeholders.enterTotalFailed
              }
            />
          </Form.Item>

          <Form.Item
            label={localStrings.StudentManagement.Labels.averageGrade}
            name="averageGrade"
            rules={[
              {
                type: "number",
                min: 0,
                max: 20,
                message: "Grade must be between 0 and 20",
              },
            ]}
          >
            <InputNumber
              min={0}
              max={20}
              step={0.1}
              style={{ width: "100%" }}
              placeholder={
                localStrings.StudentManagement.Placeholders.enterAverageGrade
              }
            />
          </Form.Item>

          <Form.Item
            label={localStrings.StudentManagement.Labels.unpassedCourses}
            name="unpassedCourses"
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              placeholder={
                localStrings.StudentManagement.Placeholders.enterUnpassedCourses
              }
            />
          </Form.Item>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
          <Button onClick={handleCancel}>
            {localStrings.GlobalLabels.Cancel}
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="bg-blue-500 hover:bg-blue-600"
          >
            {localStrings.StudentManagement.CreateStudent}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default StudentManagementActionFeature;
