import { Form } from "antd";
import { UserResponseModel } from "api/repositories/myProfile/models/UserResponseModel";
import { myProfileRepository } from "api/repositories/myProfile/MyProfileRepository";
import { useEffect, useState } from "react";
import { FormattedUserData } from "../interfaces/IGeneralInfo";

const GeneralViewModel = () => {
  const [list, setList] = useState<FormattedUserData>({
    id: "",
    username: "",
    fullName: "",
    gender: "male",
    profileAvatar: "",
    code: "",
    birthDay: "",
    placeOfOrigin: "",
    identifyCard: "",
    dateOfIssue: "",
    placeOfIssue: "",
    religion: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const [page, setPage] = useState<number>(0);
  const [form] = Form.useForm();

  const fetchInfo = async () => {
    try {
      const response = await myProfileRepository.getProfile();
      if (response.data) {
        const formattedData: FormattedUserData = {
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

  const updateProfile = async (values: FormattedUserData) => {
    try {
      const formattedValues: Partial<UserResponseModel> = {
        ...values,
        birthDay: values.birthDay ? new Date(values.birthDay) : undefined,
        dateOfIssue: values.dateOfIssue
          ? new Date(values.dateOfIssue)
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
