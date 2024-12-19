import { Col, Form, FormInstance, Upload } from 'antd'
import { useEffect, useState } from 'react';
import { AuthenticationContext } from 'context/AuthenticationContext';
import { IoImagesSharp } from 'react-icons/io5';

const UploadItem = ({
  form,
  name,
  submitLoading,
  title,
  imgFile
}: {
  form: FormInstance,
  name: string,
  submitLoading: boolean,
  title: string,
  imgFile?: any
}) => {
  const { localStrings } = AuthenticationContext();
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const handleUploadChange = (info: any) => {
    try {
      const { file } = info;
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
        form.setFieldsValue({
          [name]: [file],
        });
      };
      reader.readAsDataURL(file.originFileObj);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (imgFile) {
      handleUploadChange({ file: imgFile })
    }
  }, [imgFile])

  return (
    <Col xs={24} lg={8} className='w-full'>
      <div className="text-start text-lg font-semibold italic pb-2">
        {title}
      </div>
      <Form.Item
        name={name}
        valuePropName={'fileList'}
        getValueFromEvent={(event) => event?.fileList}
        rules={[
          {
            required: true,
            message: localStrings.TravelSimListManagement.Message.EmptyField,
          },
        ]}
      >
        <Upload.Dragger
          maxCount={1}
          accept="image/*"
          className="w-full"
          onChange={handleUploadChange}
          showUploadList={false}
          disabled={submitLoading}
          openFileDialogOnClick={name === 'front'}
          style={{ pointerEvents: name === 'front' ? 'auto' : 'none' }}
        >
          {imageUrl ? (
            <>
              <div className="ant-upload-drag-icon md:h-[220px] flex flex-col justify-center items-center">
                <img
                  style={{
                    objectFit: 'contain',
                  }}
                  className='md:h-[200px] h-full md:w-full w-[271px]'
                  src={imageUrl}
                  alt={name}
                />
                {!imgFile && (
                  <p className="ant-upload-hint mt-2 hover:cursor-pointer">
                    {localStrings.TravelSimListManagement.Labels.UploadAgain}
                  </p>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="ant-upload-drag-icon md:h-[220px] flex flex-col justify-center items-center">
                <div
                  className="w-full flex justify-center mb-3"
                >
                  <IoImagesSharp className="w-1/2 h-[120px] text-gray-300" />
                </div>
                <div className="flex flex-col text-center justify-between">
                  <p className="ant-upload-text">
                    {localStrings.TravelSimListManagement.Labels.UploadNote}
                  </p>
                  <p className="ant-upload-hint">
                    {localStrings.TravelSimListManagement.Labels.UploadHint}
                  </p>
                </div>
              </div>
            </>
          )}
        </Upload.Dragger>
      </Form.Item>
    </Col>
  )
}

export default UploadItem