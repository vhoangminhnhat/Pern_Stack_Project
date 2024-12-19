import { Modal, Steps } from 'antd';
import { AuthenticationContext } from 'context/AuthenticationContext';
import CreateForm from './stepsComponents/CreateForm';
import { IConfirmForm, ICreateForm, IGenerateForm } from 'pages/travelSimList/interfaces/CreateProfileInterface';
import { useCallback, useState } from 'react';
import ConfirmForm from './stepsComponents/ConfirmForm';
import GenerateVideocall from './stepsComponents/GenerateVideocall';

const CreateProfileFeature = ({
  open,
  onCancel,
  step,
  generateStepProps,
  createStepProps,
  confirmStepProps
}: {
  open: boolean;
  onCancel: () => void;
  step: number;
  generateStepProps: IGenerateForm;
  createStepProps: ICreateForm;
  confirmStepProps: IConfirmForm;
}) => {
  const { localStrings } = AuthenticationContext();

  const renderStepContent = useCallback(() => {
    switch (step) {
      case 0:
        return <GenerateVideocall  {...generateStepProps} />;
      case 1:
        return <CreateForm {...createStepProps} />;
      case 2:
        return <ConfirmForm {...confirmStepProps} />;
      default:
        return null;
    }
  }, [step, createStepProps]);

  return (
    <Modal
      open={open}
      maskClosable={false}
      title={<span className='font-bold text-xl'>{localStrings.TravelSimListManagement.Labels.CreateProfile}</span>}
      destroyOnClose
      getContainer={document.body}
      centered
      footer={null}
      onCancel={onCancel}
      width={1200}
      styles={{
        body: {
          overflowY: "auto",
          maxHeight: "calc(98vh - 60px)",
          scrollbarWidth: "none",
          overflowX: "hidden",
        },
      }}
    >
      <div className='flex justify-center'>
        <Steps
          items={[
            { title: <span className='font-bold'>{localStrings.TravelSimListManagement.Labels.VideocallGenate}</span> },
            { title: <span className='font-bold'>{localStrings.TravelSimListManagement.Labels.SubmitInfo}</span> },
            { title: <span className='font-bold'>{localStrings.TravelSimListManagement.Labels.ConfirmInfo}</span> },
          ]}
          current={step}
          style={{ width: "60%" }}
        />
      </div>
      {renderStepContent()}
    </Modal>
  )
}

export default CreateProfileFeature
