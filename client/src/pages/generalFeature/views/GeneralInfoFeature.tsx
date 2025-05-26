import { Col, Descriptions, Row } from "antd";
import CardComponent from "components/generalComponents/cardComponent/CardComponent";
import { AuthenticationContext } from "context/AuthenticationContext";
import { Fragment } from "react";
import GeneralViewModel from "../viewModel/GeneralViewModel";

const GeneralInfoFeature = () => {
  const { localStrings } = AuthenticationContext();
  const { form, list, page } = GeneralViewModel();

  return (
    <CardComponent
      data={{
        children: (
          <>
            <Row gutter={[5, 5]}>
              <Col span={24}>
                <Descriptions bordered={false} column={1}>
                  {Object?.entries(list)?.map(([key, val]) => {
                    if (key === "sex") {
                      return (
                        <Descriptions.Item
                          style={{ textAlign: "center" }}
                          label={localStrings?.GeneralInfo?.Personal[key]}
                        >
                          <span className="font-semibold italic">
                            {val === 0
                              ? localStrings.GeneralInfo.Male
                              : localStrings.GeneralInfo.Female}
                          </span>
                        </Descriptions.Item>
                      );
                    } else {
                      return (
                        <Descriptions.Item
                          style={{ textAlign: "center" }}
                          label={localStrings.GeneralInfo.Personal[key]}
                        >
                          <span className="font-semibold italic">{val}</span>
                        </Descriptions.Item>
                      );
                    }
                  })}
                </Descriptions>
              </Col>
            </Row>
          </>
        ),
        title: localStrings.TestSidebar.Personal.General,
        extra: <Fragment key={0}></Fragment>,
      }}
    />
  );
};

export default GeneralInfoFeature;
