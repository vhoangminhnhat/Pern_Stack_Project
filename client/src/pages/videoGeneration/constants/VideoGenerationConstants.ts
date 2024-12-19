import { VideoGenerationRequestModel } from "api/repositories/videoGeneration/model/VideoGenerationRequestModel";
import { ActionsComponentType } from "components/generalComponents/actionsComponent/model/ActionsComponentModel";
import { strings } from "utils/localizedStrings";

export class VideoGenerationConstants {
  static uploadProps = {
    format: "file",
    accept: ".jpg, .jpeg, .png",
    multiple: false,
    beforeUpload() {
      return false;
    },
  };

  static filterAttributes(localStrings: typeof strings) {
    return [
      {
        colLg: 12,
        label: localStrings?.VideoGeneration?.Labels?.Prompt,
        name: "prompt",
        type: "text-area",
        detailKey: "prompt",
        placeholder: localStrings?.VideoGeneration?.Placeholder?.Prompt,
      },
      {
        colLg: 12,
        label: localStrings?.VideoGeneration?.Labels?.NativePrompt,
        name: "nativePrompt",
        type: "text-area",
        detailKey: "nativePrompt",
        placeholder: localStrings?.VideoGeneration?.Placeholder?.NativePrompt,
      },
    ] as ActionsComponentType<VideoGenerationRequestModel>[];
  }
}
