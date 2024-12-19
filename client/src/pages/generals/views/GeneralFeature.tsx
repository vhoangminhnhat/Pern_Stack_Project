import { Col, Row } from "antd";
import {
  GeneralRepository,
  defaultGeneralRepository,
} from "api/repositories/general/GeneralRepository";
import popUpComponent from "components/generalComponents/popUpComponent/PopUpComponent";
import { useEffect } from "react";
import { DataFormater } from "utils/helpersInTs/helpersInTs";
import ChartComponent from "../components/chartComponent/ChartComponent";
import RevenueComponent from "../components/revenueComponent/RevenueComponent";
import GeneralViewModel from "../viewModel/GeneralViewModel";

interface IGeneralFeature {
  generalRepository?: GeneralRepository;
}

const GeneralFeature: React.FC<IGeneralFeature | any> = (
  props: IGeneralFeature
) => {
  const { dataForCharts, revenue, resultObject, loading } = GeneralViewModel(
    props?.generalRepository || defaultGeneralRepository
  );

  useEffect(() => {
    if (resultObject?.message) {
      switch (resultObject?.type) {
        case "success":
          popUpComponent.success(resultObject?.message, 5);
          break;
        case "error":
          popUpComponent.error(resultObject?.message, 5);
          break;
        default:
          break;
      }
    }
  }, [resultObject]);

  return (
    <Row gutter={[8, 8]} className="p-6">
      <Col span={24}>
        <RevenueComponent data={revenue} loading={loading} />
      </Col>
      <Col span={24}>
        <ChartComponent
          data={dataForCharts}
          loading={loading}
          dataFormat={DataFormater}
        />
      </Col>
    </Row>
  );
};
export default GeneralFeature;
