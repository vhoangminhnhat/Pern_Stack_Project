import { Button } from 'antd';
import { AuthenticationContext } from 'context/AuthenticationContext';
import { IGenerateForm } from 'pages/travelSimList/interfaces/CreateProfileInterface';
import VideoGenerationFeature from 'pages/videoGeneration/views/VideoGenerationFeature';

const GenerateVideocall: React.FC<IGenerateForm> = (props: IGenerateForm) => {
  const { localStrings } = AuthenticationContext();
  const {
    handleGenerateFiles,
    sessionLog
  } = props;

  return (
    <div className='mt-6'>
      <VideoGenerationFeature
        data={{
          buttonProps: <Button
            type="primary"
            onClick={() => {
              handleGenerateFiles(sessionLog)
            }}
          >
            <span className="font-bold">
              {localStrings.GlobalLabels.Next}
            </span>
          </Button>
        }}
      />
    </div>
  )
}

export default GenerateVideocall