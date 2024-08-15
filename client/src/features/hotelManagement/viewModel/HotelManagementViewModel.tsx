import { Button, Form } from "antd";
import { DefaultPagingModel } from "api/repositories/defaultPagingModel/DefaultPagingModel";
import { defaultHotelsRepository } from "api/repositories/hotels/HotelsRepository";
import { HotelsResponseModel } from "api/repositories/hotels/model/HotelResponseModel";
import { HotelsRequestModel } from "api/repositories/hotels/model/HotelsRequestModel";
import { useEffect, useState } from "react";
import { strings } from "utils/localizedStrings";
import { hotelManagementConstants } from "../constants/HotelManagementConstants";
import { MdModeEditOutline } from "react-icons/md";

const HotelManagementViewModel = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [detailInfo, setDetailInfo] = useState<HotelsResponseModel>({});
  const [list, setList] = useState<HotelsResponseModel[]>([]);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [filterForm] = Form.useForm();
  const [actionForm] = Form.useForm();

  const fetchList = async (params?: HotelsRequestModel) => {
    try {
      setLoading(false);
      const res = await defaultHotelsRepository.getList(params);
      if (res) {
        setList(res?.data);
        setTotal(res?.data?.length);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDetail = async (id: string) => {
    try {
      setModalLoading(true);
      const res = await defaultHotelsRepository.getDetail(id);
      if (res) {
        setDetailInfo(res?.data);
        setModal(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setModalLoading(false);
    }
  };

  const handleSearch = async (values: any) => {
    let params: HotelsRequestModel = {
      name:
        values?.name === undefined || values?.name === ""
          ? undefined
          : values?.name,
      city:
        values?.city === strings.GlobalLabels.All ? undefined : values?.city,
    };
    await fetchList(params);
  };

  const mainCoumns: typeof hotelManagementConstants.columns = [
    ...hotelManagementConstants.columns,
    {
      title: strings.GlobalLabels.Actions,
      key: "hotelActions",
      render: (record: HotelsResponseModel) => (
        <>
          <Button
            ghost
            icon={<MdModeEditOutline />}
            onClick={async () => await fetchDetail(record.id)}
          >
            {strings.GlobalLabels.Detail}
          </Button>
        </>
      ),
    },
  ];

  const handleTableChange = async (pagination: DefaultPagingModel | any) => {
    setPage(pagination?.current! - 1);
    setPageSize(pagination?.pageSize!);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return {
    list,
    loading,
    page,
    pageSize,
    total,
    modalLoading,
    detailInfo,
    filterForm,
    actionForm,
    mainCoumns,
    modal,
    setModal,
    handleTableChange,
    handleSearch,
  };
};

export default HotelManagementViewModel;
