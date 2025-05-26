import { Avatar, Col, Descriptions, Row } from "antd";
import UserAvatar from "assets/images/default-avatar.png";
import CardComponent from "components/generalComponents/cardComponent/CardComponent";
import { AuthenticationContext } from "context/AuthenticationContext";
import { Fragment } from "react";
import GeneralViewModel from "../viewModel/GeneralViewModel";

const GeneralInfoFeature = () => {
  const { localStrings } = AuthenticationContext();
  const { form, list } = GeneralViewModel();
  const displayFields = [
    { key: "fullName", label: "Họ tên" },
    { key: "code", label: "Mã số" },
    { key: "birthDay", label: "Ngày sinh" },
    { key: "placeOfOrigin", label: "Nơi sinh" },
    { key: "gender", label: "Giới tính" },
    { key: "identifyCard", label: "CMND/CCCD" },
    { key: "dateOfIssue", label: "Ngày cấp" },
    { key: "placeOfIssue", label: "Nơi cấp" },
    { key: "religion", label: "Tôn giáo" },
  ];

  return (
    <CardComponent
      data={{
        children: (
          <div className="p-4">
            <Row gutter={[24, 10]}>
              <Col span={4} className="flex justify-center">
                <Avatar
                  size={100}
                  src={UserAvatar}
                  className="border-2 border-gray-200"
                />
              </Col>
              <Col span={20}>
                <Descriptions bordered={false} column={1}>
                  {displayFields.map(({ key, label }) => {
                    if (!list[key]) return null;

                    if (key === "gender") {
                      return (
                        <Descriptions.Item
                          key={key}
                          label={label}
                          className="py-2"
                        >
                          <span className="font-medium text-gray-700">
                            {list[key] === "male"
                              ? localStrings.GeneralInfo.Male
                              : localStrings.GeneralInfo.Female}
                          </span>
                        </Descriptions.Item>
                      );
                    }

                    return (
                      <Descriptions.Item
                        key={key}
                        label={label}
                        className="py-2"
                      >
                        <span className="font-medium text-gray-700">
                          {list[key]}
                        </span>
                      </Descriptions.Item>
                    );
                  })}
                </Descriptions>
              </Col>
            </Row>
          </div>
        ),
        title: "Thông tin cá nhân",
        extra: <Fragment key={0}></Fragment>,
      }}
    />
  );
};

export default GeneralInfoFeature;
