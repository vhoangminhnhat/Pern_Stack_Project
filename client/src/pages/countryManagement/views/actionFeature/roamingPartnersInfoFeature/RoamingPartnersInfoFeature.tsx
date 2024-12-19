import { Col, Row } from "antd";
import {
  CountryDetailResponseModel,
  MobileDataInfoModel,
  RoamingPartnerModel,
} from "api/repositories/countryManagement/model/details/CountryDetailReponseModel";
import { SelectOps } from "components/generalComponents/selectComponent/model/SelectOpsModel";
import TableComponent from "components/generalComponents/tableComponent/TableComponent";
import { AuthenticationContext } from "context/AuthenticationContext";
import { countryManagementConstants } from "pages/countryManagement/constants/CountryManagementConstants";

const RoamingPartnersInfoFeature = (props: {
  detailInfo: CountryDetailResponseModel;
  regionList: SelectOps[];
}) => {
  const { regionList } = props;
  const { localStrings } = AuthenticationContext();
  return (
    <Row gutter={[4, 1]} align={"middle"}>
      <Col span={24}>
        <TableComponent<RoamingPartnerModel>
          data={{
            columns: countryManagementConstants(localStrings, regionList)
              .roamingPartner,
            dataSource: props?.detailInfo?.roamingPartner,
            loading: false,
            page: 0,
            pageSize: props?.detailInfo?.roamingPartner?.length,
            total: props?.detailInfo?.roamingPartner?.length,
            totalTitle: localStrings.GlobalLabels.Total,
            scroll: { x: 600, y: 600 },
          }}
        />
      </Col>
      <Col span={24}>
        <TableComponent<MobileDataInfoModel>
          data={{
            columns: countryManagementConstants(localStrings, regionList)
              .mobileDataColumns,
            dataSource: props?.detailInfo?.mobileData,
            loading: false,
            page: 0,
            pageSize: props?.detailInfo?.mobileData?.length,
            total: props?.detailInfo?.mobileData?.length,
            totalTitle: localStrings.GlobalLabels.Total,
            scroll: { x: 1300, y: 600 },
          }}
        />
      </Col>
    </Row>
  );
};

export default RoamingPartnersInfoFeature;
