import { Result } from "api/baseApiResponseModel/BaseApiResponseModel";
import { GeneralRepository } from "api/repositories/general/GeneralRepository";
import { AuthenticationContext } from "context/AuthenticationContext";
import moment from "moment";
import { useEffect, useState } from "react";

const GeneralViewModel = (repository: GeneralRepository) => {
  const [loading, setLoading] = useState(false);
  const [dataForCharts, setDataForCharts] = useState([]);
  const [revenue, setRevenue] = useState({});
  const [resultObject, setResultObject] = useState<Result | null>(null);
  const { localStrings } = AuthenticationContext();

  const getDataForReports = async () => {
    try {
      setLoading(true);
      const res = await repository.getGeneralData();
      if (res?.data) {
        let temp = res?.data?.map((item) => {
          const time = moment(item?.time, "MM-YYYY").format("MM-YYYY");
          const data = {
            time: time,
            value: item?.total,
            count: item?.count,
          };
          return data;
        });
        setDataForCharts(temp);
        setRevenue(res?.report);
      } else {
        setResultObject({
          type: "error",
          message: res?.message || localStrings.GlobalMessage.Error,
        });
      }
    } catch (error) {
      console.error(error);
      setResultObject({
        type: "error",
        message: localStrings.GlobalMessage.Error,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataForReports();
  }, []);

  return {
    loading,
    dataForCharts,
    revenue,
    resultObject,
  };
};

export default GeneralViewModel;
