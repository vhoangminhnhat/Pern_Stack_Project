import { Form, UploadFile } from "antd";
import { RcFile, UploadChangeParam } from "antd/es/upload";
import { Result } from "api/baseApiResponseModel/BaseApiResponseModel";
import { NationListResponseModel } from "api/repositories/travelSim/model/nationList/NationListResponseModel";
import { TravelSimDetailRequestModel } from "api/repositories/travelSim/model/TravelSimDetailRequestModel";
import { TravelSimListRequestModel } from "api/repositories/travelSim/model/TravelSimListRequestModel";
import { TravelSimOcrRequestModel } from "api/repositories/travelSim/model/travelSimOcr/TravelSimOcrRequestModel";
import { TravelSimResponseModel } from "api/repositories/travelSim/model/TravelSimResponseModel";
import {
  defaultTravelSimRepository,
  ITravelSimRepository,
} from "api/repositories/travelSim/TravelSimRepository";
import { AuthenticationContext } from "context/AuthenticationContext";
import dayjs from "dayjs";
import { isEmpty, set } from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { CountryIso2 } from "react-international-phone";
import { convertToAntdDate, getMessage, urlToFile } from "utils/helpersInTs/helpersInTs";
import { ITravelSimImages } from "../interfaces/TravelSimInterfaces";
import SignatureCanvas from 'react-signature-canvas';
import { TravelSimConfirmRequestModel } from "api/repositories/travelSim/model/travelSimConfirm/TravelSimConfirmRequestModel";

export const TravelSimListViewModel = (repository: ITravelSimRepository) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [detailLoading, setDetailLoading] = useState<boolean>(false);
  const [travelSimList, setTravelSimList] = useState<TravelSimResponseModel[]>(
    []
  );
  const [travelSimDetail, setTravelSimDetail] =
    useState<TravelSimResponseModel | null>(null);
  const [resultObject, setResultObject] = useState<Result | null>(null);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [query, setQuery] = useState<TravelSimListRequestModel>({
    page: 0,
    limit: 10,
    fromDate: dayjs().subtract(12, "day").format("YYYY-MM-DD"),
    toDate: dayjs().format("YYYY-MM-DD"),
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [selectedProfileId, setSelectedProfileId] = useState<string>("");
  const [detailImages, setDetailImages] = useState<ITravelSimImages>({
    front: [],
    portrait: [],
    sim: [],
    signature: [],
    videocall: [],
  });
  const [actionModal, setActionModal] = useState<boolean>(false);
  const [dialCode, setDialCode] = useState<CountryIso2>("us");
  const [actionForm] = Form.useForm();
  const [filterForm] = Form.useForm();
  const [updateForm] = Form.useForm();
  const [nationList, setNationList] = useState<NationListResponseModel[]>([]);
  const { localStrings } = AuthenticationContext();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [signature, setSignature] = useState<SignatureCanvas>();
  const [signPad, setSignPad] = useState<any>(undefined);
  const [createStep, setCreateStep] = useState(0);
  const [userData, setUserData] = useState<TravelSimResponseModel | undefined>(undefined);
  const [profileType, setProfileType] = useState<number>(0);
  const [sectionIds, setSectionIds] = useState<string[]>([]);
  const [userFiles, setUserFiles] = useState<{ portrait: UploadFile | string; videocall: UploadFile }>({
    portrait: undefined,
    videocall: undefined
  });

  const getTravelSimList = async (params: TravelSimListRequestModel) => {
    try {
      setLoading(true);
      const res = await repository.getList(params);
      if (res?.data) {
        setTravelSimList(res?.data);
        setTotal(res?.pagination?.total);
        setLimit(res?.pagination?.limit);
      }
    } catch (error: any) {
      console.error(error);
      setResultObject({
        type: "error",
        message: error?.error?.message || localStrings.GlobalMessage.Error,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchNation = async () => {
    try {
      const res = await defaultTravelSimRepository?.getNationList();
      if (res?.data) {
        setNationList(res?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTravelSimDetail = async (
    params: TravelSimDetailRequestModel,
    type: "detail" | "action"
  ) => {
    try {
      setDetailLoading(true);
      const res = await repository.getTravelSimDetail(params);
      if (res?.data) {
        switch (type) {
          case "detail":
            setTravelSimDetail(res?.data);
            break;
          case "action":
            setTravelSimDetail({
              ...res?.data,
              birthDay: !isEmpty(res?.data?.birthDay)
                ? convertToAntdDate(res?.data?.birthDay)
                : (dayjs() as any),
              issueDate: !isEmpty(res?.data?.issueDate)
                ? convertToAntdDate(res?.data?.issueDate)
                : (dayjs() as any),
            });
            setDialCode(res?.data?.dialCode);
            let portrait = await urlToFile(
              res?.data?.imagesPath?.find((item) => item?.type === "portrait")
                ?.path,
              "portrait"
            );
            let front = await urlToFile(
              res?.data?.imagesPath?.find((item) => item?.type === "front")
                ?.path,
              "front"
            );
            let sim = await urlToFile(
              res?.data?.imagesPath?.find((item) => item?.type === "sim")?.path,
              "sim"
            );
            let signature = await urlToFile(
              res?.data?.imagesPath?.find((item) => item?.type === "sign")
                ?.path,
              "sign"
            );
            let videocall = await urlToFile(
              res?.data?.imagesPath?.find((item) => item?.type === "videocall")
                ?.path,
              "videocall"
            );
            setDetailImages({
              front: [front],
              portrait: [portrait],
              sim: [sim],
              signature: [signature],
              videocall: [videocall],
            });
            break;
        }
      }
    } catch (error: any) {
      console.error(error);
      setResultObject({
        type: "error",
        message: error?.error?.message || localStrings.GlobalMessage.Error,
      });
    } finally {
      setDetailLoading(false);
    }
  };

  const handleUploadChange =
    (type: "portrait" | "signature" | "front" | "sim" | "videocall") =>
      (info: UploadChangeParam) => {
        setDetailImages((prevState) => ({
          ...prevState,
          [type]: info?.fileList as RcFile[],
        }));
      };

  const onAction = async (
    body: unknown,
    action: "ocr" | "update" | "confirm" | "connect"
  ) => {
    let afterBody = {
      profileId: body["profileId"],
      sex: body["sex"],
      address: "",
      birthDay: body["birthDay"],
      dialCode: dialCode,
      emailContact: body["emailContact"],
      idNumber: body["idNumber"],
      issueDate: body["issueDate"],
      issuePlace: body["issuePlace"],
      name: body["name"],
      nationality: body["nationality"],
      phoneContact: body["phoneContact"],
      placeOfOrigin: body["placeOfOrigin"],
      serial: body["serial"],
      sim: body["sim"],
      type: body["type"],
    };
    switch (action) {
      case "ocr":
        try {
          body as TravelSimOcrRequestModel;
          let formData = new FormData();
          formData.append("profileId", body["profileId"]);
          detailImages?.portrait?.forEach((file) => {
            if (file.originFileObj) {
              formData.append(
                "file",
                file.originFileObj,
                "portrait_images.png"
              );
            }
          });
          detailImages?.front?.forEach((file) => {
            if (file.originFileObj) {
              formData.append("file", file.originFileObj, "front_images.png");
            }
          });
          detailImages?.videocall?.forEach((file) => {
            if (file.originFileObj) {
              formData.append(
                "file",
                file.originFileObj,
                "videocall_images.png"
              );
            }
          });
          const res = await defaultTravelSimRepository?.getOcrInfo(formData);
          if (res) {
            setTravelSimDetail((prev: any) => {
              return {
                ...prev,
                ...res?.data,
                birthDay: !isEmpty(res?.data?.birthDay)
                  ? convertToAntdDate(res?.data?.birthDay)
                  : dayjs(),
                issueDate: !isEmpty(res?.data?.issueDate)
                  ? convertToAntdDate(res?.data?.issueDate)
                  : dayjs(),
              };
            });
            actionForm?.setFieldsValue({
              ...travelSimDetail,
              ...res?.data,
              birthDay: !isEmpty(res?.data?.birthDay)
                ? convertToAntdDate(res?.data?.birthDay)
                : dayjs(),
              issueDate: !isEmpty(res?.data?.issueDate)
                ? convertToAntdDate(res?.data?.issueDate)
                : dayjs(),
            });
            getMessage(
              localStrings?.TravelSimListManagement?.Message?.OcrSuccess,
              4,
              "success"
            );
          }
        } catch (error: any) {
          getMessage(
            `${localStrings?.GlobalMessage?.Failed}: ${error?.error?.message}`,
            4,
            "error"
          );
          console.log(error);
        }
        break;
      case "confirm":
        try {
          if (body["status"] === 3) {
            getMessage(
              localStrings.TravelSimListManagement.Message.ProfileError,
              4,
              "warning"
            );
          } else {
            const res = await defaultTravelSimRepository?.confirmInfo({
              ...afterBody,
              birthDay: moment(afterBody?.birthDay?.$d).format("DD/MM/YYYY"),
              issueDate: moment(afterBody?.issueDate?.$d).format("DD/MM/YYYY"),
            });
            if (res) {
              setActionModal(false);
              setTravelSimDetail({});
              actionForm.setFieldsValue(new TravelSimResponseModel());
              getMessage(
                localStrings?.GlobalMessage.UpdateSuccessfully,
                4,
                "success"
              );
              await getTravelSimList({ page: 0, limit: 10 });
            }
          }
        } catch (error: any) {
          console.log(error);
          getMessage(
            `${localStrings.GlobalMessage.Error}: ${error?.error?.message}`,
            4,
            "error"
          );
        }
        break;
      case "connect":
        try {
          let afterBody = {
            profileId: body["profileId"],
          };
          const res = await defaultTravelSimRepository?.simConnecting(
            afterBody
          );
          if (res) {
            getMessage(
              localStrings.TravelSimListManagement.Message.ConnectSuccessfully,
              4,
              "success"
            );
            setShowModal(false);
            setTravelSimDetail({});
            setPage(0);
            await getTravelSimList({ page: 0, limit: 10 });
          }
        } catch (error) {
          console.log(error);
          getMessage(
            `${localStrings.TravelSimListManagement.Message.ConnectFailed}: ${error?.error?.message}`,
            4,
            "error"
          );
        };
        break;
    }
  };

  const handleTableChange = (pagination?: any) => {
    setPage(pagination?.current - 1);
    setLimit(pagination?.pageSize);
    setQuery({
      ...query,
      page: pagination?.current - 1,
      limit: pagination?.pageSize,
    });
  };

  const updateProfileStatus = async (body: any) => {
    try {
      let afterBody = {
        ...body,
        connectedTime: moment(body?.connectedTime?.$d as any).format(
          "DD-MM-YYYY HH:mm:ss"
        ),
      };
      const res = await defaultTravelSimRepository?.updateProfileStatus(
        afterBody
      );
      if (res) {
        getMessage(localStrings.GlobalMessage.UpdateSuccessfully, 4, "success");
        setUpdateModal(false);
        updateForm?.setFieldsValue(new TravelSimResponseModel());
        await getTravelSimList({ page: 0, limit: 10 });
        setPage(0);
      }
    } catch (error) {
      console.log(error);
      getMessage(
        `${localStrings.GlobalMessage.UpdateFailed} ${error?.error?.message}`,
        4,
        "error"
      );
    }
  };

  const clearSignature = () => {
    setSignPad(undefined);
    return signature?.clear();
  };

  const uploadInfo = async (values: any) => {
    const data = signature?.getTrimmedCanvas();
    const signBlob = await new Promise<Blob>((resolve) => {
      data!.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          console.error('Failed to create Blob from canvas');
        }
      }, 'signature/png');
    });
    setSignPad(signBlob);
    if (!values?.videocall) {
      setResultObject({
        type: 'error',
        message: localStrings.GlobalMessage.Error,
      });
      console.error("Videocall image not found");
      return;
    }
    try {
      setSubmitLoading(true);
      const formData = new FormData();
      formData.append('type', 'passport');
      // formData.append('emailContact', values?.emailContact);
      // formData.append('phoneContact', values?.phoneContact);
      // formData.append('dialCode', values?.dialCode);
      formData.append(
        'file',
        values?.portrait[0]?.originFileObj,
        `portrait_${values?.portrait[0]?.originFileObj?.name}`,
      );
      formData.append(
        'file',
        values?.front[0]?.originFileObj,
        `front_${values?.front[0]?.originFileObj?.name}`,
      );
      // formData.append(
      //   'file',
      //   values?.sim[0]?.originFileObj,
      //   `sim_${values?.sim[0]?.originFileObj?.name}`,
      // );
      formData.append(
        'file',
        values?.videocall[0]?.originFileObj,
        `videocall_${values?.videocall[0]?.originFileObj?.name}`,
      );
      formData.append('file', signBlob, 'sign_image.png');
      const res = await defaultTravelSimRepository?.createProfile(formData);
      if (res?.data) {
        setUserData(res?.data);
        setCreateStep(2);
      }
    } catch (error: any) {
      console.error(error);
      const message = error?.error?.message;
      if (message.includes('Process failed for front')) {
        setResultObject({
          type: 'error',
          message: localStrings.TravelSimListManagement.Message.InvalidFront,
        });
      } else if (message.includes('Process failed for portrait')) {
        setResultObject({
          type: 'error',
          message: localStrings.TravelSimListManagement.Message.InvalidPortrait,
        });
      } else if (message?.includes('2021-Unknown Error')) {
        setResultObject({
          type: 'error',
          message: localStrings.GlobalMessage.Error,
        });
      } else {
        setResultObject({
          type: 'error',
          message: message,
        });
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  const confirmInfo = async (values: any) => {
    try {
      setConfirmLoading(true);
      const params: TravelSimConfirmRequestModel = {
        profileId: userData?.profileId,
        idNumber: values?.idNumber,
        name: values?.name,
        birthDay: dayjs(values?.birthDay).format('DD/MM/YYYY'),
        sex: values?.sex,
        placeOfOrigin: values?.placeOfOrigin,
        issueDate: dayjs(values?.issueDate).format('DD/MM/YYYY'),
        issuePlace: values?.issuePlace,
        nationality: values?.nationality,
        sim: values?.sim,
        serial: values?.serial,
        emailContact: values?.emailContact,
        phoneContact: values?.phoneContact,
        dialCode: values?.dialCode,
        createdDate: dayjs(values?.createdDate).format('DD/MM/YYYY HH:mm:ss'),
        profileType: values?.profileType,
      };
      setResultObject({
        type: 'success',
        message: localStrings.TravelSimListManagement.Message.CreateSuccess,
      });
      setSelectedProfileId("34802509")
      setShowModal(true);
      setCreateModal(false);
      filterForm.resetFields();
      await getTravelSimList({
        page: 0,
        limit: 10,
        fromDate: dayjs().subtract(12, "day").format("YYYY-MM-DD"),
        toDate: dayjs().format("YYYY-MM-DD"),
      });

      // const res = await defaultTravelSimRepository?.confirmInfoV2(params);
      // if (res?.data) {
      //   setResultObject({
      //     type: 'success',
      //     message: localStrings.TravelSimListManagement.Message.CreateSuccess,
      //   });
      //   setSelectedProfileId(userData?.profileId)
      //   setShowModal(true);
      //   setCreateModal(false);
      //   filterForm.resetFields();
      //   await getTravelSimList({
      //     page: 0,
      //     limit: 10,
      //     fromDate: dayjs().subtract(12, "day").format("YYYY-MM-DD"),
      //     toDate: dayjs().format("YYYY-MM-DD"),
      //   });
      // }
    } catch (error: any) {
      console.error(error);
      setResultObject({
        type: 'error',
        message: error?.error?.message,
      });
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleGenerateFiles = async (data: {
    sessionId: Array<string>;
    portrait: UploadFile | string;
    image: string;
  }) => {
    const videocallFile = await urlToFile(data?.image as string, '');

    setSectionIds(data?.sessionId);
    setUserFiles({
      portrait: data?.portrait,
      videocall: videocallFile
    });
    setCreateStep(1);
  };

  useEffect(() => {
    getTravelSimList(query);
    fetchNation();
  }, [query]);

  return {
    loading,
    detailLoading,
    travelSimList,
    travelSimDetail,
    resultObject,
    actionModal,
    actionForm,
    dialCode,
    page,
    limit,
    total,
    showModal,
    detailImages,
    selectedProfileId,
    filterForm,
    nationList,
    updateModal,
    updateForm,
    setUpdateModal,
    updateProfileStatus,
    setNationList,
    fetchNation,
    setDialCode,
    setTravelSimDetail,
    setActionModal,
    getTravelSimDetail,
    handleTableChange,
    handleUploadChange,
    setQuery,
    setPage,
    setLimit,
    setDetailImages,
    setShowModal,
    onAction,
    setSelectedProfileId,
    createModal,
    setCreateModal,
    signature,
    setSignature,
    submitLoading,
    clearSignature,
    uploadInfo,
    createStep,
    userData,
    confirmInfo,
    confirmLoading,
    profileType,
    setProfileType,
    sectionIds,
    userFiles,
    handleGenerateFiles,
    setCreateStep
  };
};
