import { Form, UploadFile } from "antd";
import { RcFile, UploadChangeParam } from "antd/es/upload";
import { VideoGenerationRequestModel } from "api/repositories/videoGeneration/model/VideoGenerationRequestModel";
import { VideoGenerationResponseModel } from "api/repositories/videoGeneration/model/VideoGenerationResponseModel";
import { defaultVideoGenerationRepository } from "api/repositories/videoGeneration/VideoGenerationRepository";
import { AuthenticationContext } from "context/AuthenticationContext";
import { useState } from "react";
import { getMessage } from "utils/helpersInTs/helpersInTs";

const VideoGenerationViewModel = () => {
  const { localStrings, sessionLog, setSessionLog } = AuthenticationContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [importFile, setImportFile] = useState<UploadFile[]>([]);
  const [genResults, setGenResults] = useState<VideoGenerationResponseModel>(
    {}
  );
  const [genForm] = Form?.useForm();

  const handleGeneration = async (body: VideoGenerationRequestModel) => {
    try {
      setLoading(true);
      let formData = new FormData();
      let keys = Object.keys(body);
      keys?.forEach((item) => {
        if (item !== "file" && !!body[item]) {
          formData?.append(item, body[item]);
        }
      });
      importFile?.forEach((file) =>
        formData?.append("file", file?.originFileObj, file?.name)
      );
      const res = await defaultVideoGenerationRepository?.genVideo(formData);
      if (res) {
        setGenResults(res?.data);
        setSessionLog((prev) => ({
          sessionId: [...prev?.sessionId, res?.data?.sessionId],
          portrait: importFile[0],
          image: res?.data?.image[0],
        }));
      }
    } catch (error) {
      getMessage(
        `${localStrings.GlobalMessage.Error} - ${error?.error?.message}`,
        5,
        "error"
      );
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadChange =
    (type: "videocall") => (info: UploadChangeParam) => {
      setImportFile((prevState) => info?.fileList as RcFile[]);
    };

  return {
    loading,
    localStrings,
    importFile,
    genResults,
    genForm,
    sessionLog,
    setSessionLog,
    setLoading,
    setImportFile,
    setGenResults,
    handleUploadChange,
    handleGeneration,
  };
};

export default VideoGenerationViewModel;
