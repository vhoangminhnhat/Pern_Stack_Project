import { Form } from "antd";
import { myProfileRepository } from "api/repositories/myProfile/MyProfileRepository";
import { useEffect, useState } from "react";

const GeneralViewModel = () => {
  const [list, setList] = useState<Object>({});
  const [page, setPage] = useState<number>(0);
  const [form] = Form.useForm();

  const fetchInfo = async () => {
    try {
      const response = await myProfileRepository.getProfile();
      if (response.data) {
        const formattedData = {
          ...response.data,
          birthDay: response.data.birthDay
            ? new Date(response.data.birthDay).toLocaleDateString("vi-VN")
            : "",
          dateOfIssue: response.data.dateOfIssue
            ? new Date(response.data.dateOfIssue).toLocaleDateString("vi-VN")
            : "",
        };
        setList(formattedData);
        form.setFieldsValue(formattedData);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const updateProfile = async (values: any) => {
    try {
      const formattedValues = {
        ...values,
        birthDay: values.birthDay
          ? new Date(values.birthDay).toISOString()
          : undefined,
        dateOfIssue: values.dateOfIssue
          ? new Date(values.dateOfIssue).toISOString()
          : undefined,
      };

      await myProfileRepository.updateProfile(formattedValues);
      await fetchInfo(); // Refresh data after update
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return {
    list,
    page,
    form,
    updateProfile,
  };
};

export default GeneralViewModel;
