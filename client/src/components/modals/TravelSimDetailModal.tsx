import { ApiOutlined, DownloadOutlined } from "@ant-design/icons";
import { Button, Col, ConfigProvider, Image, Modal, Row } from "antd";
import { TravelSimDetailRequestModel } from "api/repositories/travelSim/model/TravelSimDetailRequestModel";
import { TravelSimResponseModel } from "api/repositories/travelSim/model/TravelSimResponseModel";
import { AuthenticationContext } from "context/AuthenticationContext";
import dayjs from "dayjs";
import { debounce } from "lodash";
import {
  statusOption,
  typeOption,
} from "pages/travelSimList/constants/TravelSimConstants";
import React, { useEffect, useState } from "react";
import { IoImagesSharp } from "react-icons/io5";
import { colorFormat } from "utils/format/ColorFormat";
import { renderPhoneWithDialCode } from "utils/helpersInTs/GetCountryByDialCode";
import { downloadFile } from "utils/helpersInTs/helpersInTs";

const TravelSimDetailModal = ({
  open,
  onCancel,
  profileId,
  detail,
  loading,
  getTravelSimDetail,
  onAction,
}: {
  open: boolean;
  onCancel: () => void;
  profileId: string;
  detail: TravelSimResponseModel;
  loading: boolean;
  getTravelSimDetail: (
    params: TravelSimDetailRequestModel,
    type: "detail" | "action"
  ) => Promise<void>;
  onAction: (
    body: unknown,
    action: "ocr" | "update" | "confirm" | "connect"
  ) => Promise<void>;
}) => {
  const { localStrings } = AuthenticationContext();
  const [downloadType, setDownloadType] = useState<string>(
    localStrings.GlobalLabels.All
  );
  const [connectLoading, setConnectLoading] = useState<boolean>(false);

  const renderItem = (
    label: string,
    value: React.ReactNode,
    color = "black"
  ) => {
    return (
      <div className="flex justify-between w-full my-2">
        <span className="font-bold">{label}:</span>
        <span
          style={{
            color: color,
            fontWeight: color !== "black" ? "bold" : "",
            textAlign: "right",
          }}
          className="overflow-visible text-ellipsis"
        >
          {value && value !== "-" && value !== "Invalid Date"
            ? value
            : localStrings.GlobalLabels.NoInfo}
        </span>
      </div>
    );
  };

  const renderGender = (gender: number) => {
    switch (gender) {
      case 1:
        return localStrings.TravelSimListManagement.Gender.Female;
      case 0:
        return localStrings.TravelSimListManagement.Gender.Male;
      default:
        return localStrings.GlobalLabels.NoInfo;
    }
  };

  const handleDownloadFiles = debounce(async () => {
    detail?.imagesPath?.forEach(async (item) => {
      await downloadFile(
        item?.path,
        `${detail?.profileId}_${item?.type}_image`
      );
    });
  }, 500);

  const renderImage = (key?: string, path?: string) => {
    return (
      <Col xs={24} md={6} key={key}>
        <div
          className="border border-gray-300 border-dashed flex items-center flex-col rounded p-4"
          key={key}
        >
          <div className="w-full flex items-center flex-col">
            {key && path ? (
              <Image
                style={{
                  objectFit: "contain",
                  minHeight: "160px",
                  height: "250px",
                }}
                preview={{
                  imageRender: (image) => {
                    if (key === "sign") {
                      return (
                        <div className="bg-white flex justify-center items-center p-10">
                          {image}
                        </div>
                      );
                    } else return image;
                  },
                }}
                src={path}
                width={"100%"}
              />
            ) : (
              <IoImagesSharp className="w-1/2 h-[250px] text-gray-300" />
            )}
          </div>
          <div className="w-full text-center font-bold mt-4">
            {localStrings.TravelSimListManagement.ImagePaths[key]}
          </div>
        </div>
      </Col>
    );
  };

  useEffect(() => {
    if (!open) return;
    getTravelSimDetail(
      {
        profileId,
      },
      "detail"
    );
  }, [open, profileId]);

  return (
    <Modal
      loading={loading}
      open={open}
      onCancel={onCancel}
      centered
      styles={{
        body: {
          overflowY: "auto",
          maxHeight: "calc(100vh - 120px)",
          scrollbarWidth: "none",
          overflowX: "hidden",
        },
      }}
      footer={
        <>
          <div className="flex justify-center items-center gap-5">
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={async () => await handleDownloadFiles()}
            >
              {localStrings.TravelSimListManagement.Labels.DownloadFile}
            </Button>
            {detail?.status === 4 && (
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: colorFormat?.Green,
                  },
                }}
              >
                <Button
                  type="primary"
                  loading={connectLoading}
                  icon={<ApiOutlined />}
                  onClick={async () => {
                    setConnectLoading(true);
                    await onAction(detail, "connect").finally(() =>
                      setConnectLoading(false)
                    );
                  }}
                >
                  {connectLoading === true
                    ? localStrings.GlobalLabels.PleaseWait
                    : localStrings.TravelSimListManagement.Labels.Connect}
                </Button>
              </ConfigProvider>
            )}
          </div>
        </>
      }
      title={
        <span className="font-bold">
          {localStrings.TravelSimListManagement.Detail}
        </span>
      }
      width={1200}
    >
      <Row gutter={[8, 32]} justify={"space-between"} className="mt-4 mb-10">
        <Col xs={24} lg={7}>
          {renderItem(
            localStrings.TravelSimListManagement.Labels.Time,
            dayjs(detail?.createdAt).format("DD/MM/YYYY HH:mm:ss")
          )}
          {renderItem(
            localStrings.TravelSimListManagement.Labels.Status,
            statusOption(localStrings)?.find(
              (status) => status.value === detail?.status && status.value !== ""
            )?.label,
            statusOption(localStrings)?.find(
              (status) => status.value === detail?.status && status.value !== ""
            )?.color
          )}
          {renderItem(
            localStrings.TravelSimListManagement.Labels.Sim,
            detail?.sim
          )}
          {renderItem(
            localStrings.TravelSimListManagement.Labels.Serial,
            detail?.serial
          )}
          {renderItem(
            localStrings.TravelSimListManagement.Labels.ConnectedTime,
            detail?.connectedTime
          )}
          {renderItem(
            localStrings.TravelSimListManagement.Labels.Reason,
            detail?.reason
          )}
        </Col>
        <Col xs={24} lg={7}>
          {renderItem(
            localStrings.TravelSimListManagement.Labels.ProfileId,
            detail?.profileId
          )}
          {renderItem(
            localStrings.TravelSimListManagement.Labels.Type,
            typeOption(localStrings)?.find(
              (type) => type.value === detail?.type && type.value !== ""
            )?.label
          )}
          {renderItem(
            localStrings.TravelSimListManagement.Labels.Name,
            detail?.name
          )}
          {renderItem(
            localStrings.TravelSimListManagement.Labels.IdNumber,
            detail?.idNumber
          )}
          {renderItem(
            localStrings.TravelSimListManagement.Labels.Birthday,
            detail?.birthDay
          )}
          {renderItem(
            localStrings.TravelSimListManagement.Labels.Sex,
            renderGender(Number(detail?.sex))
          )}
        </Col>
        <Col xs={24} lg={7}>
          {renderItem(
            localStrings.TravelSimListManagement.Labels.PhoneContact,
            renderPhoneWithDialCode(detail?.phoneContact, detail?.dialCode)
          )}
          {renderItem(
            localStrings.TravelSimListManagement.Labels.EmailContact,
            detail?.emailContact
          )}
          {renderItem(
            localStrings.TravelSimListManagement.Labels.PlaceOfOrigin,
            detail?.placeOfOrigin
          )}
          {renderItem(
            localStrings.TravelSimListManagement.Labels.IssueDate,
            detail?.issueDate
          )}
          {renderItem(
            localStrings.TravelSimListManagement.Labels.IssuePlace,
            detail?.issuePlace
          )}
          {renderItem(
            localStrings.TravelSimListManagement.Labels.Nationality,
            detail?.nationality
          )}
        </Col>
      </Row>
      <Row gutter={[8, 32]} justify={"center"} className="mt-4 mb-10">
        {detail?.imagesPath?.length > 0 &&
          detail?.imagesPath?.map((image) => {
            return renderImage(image?.type, image?.path);
          })}
      </Row>
    </Modal>
  );
};

export default TravelSimDetailModal;
