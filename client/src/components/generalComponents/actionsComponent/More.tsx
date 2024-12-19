import { CloseOutlined, FileAddOutlined, FileOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Modal, Space } from 'antd';
import { AuthenticationContext } from 'context/AuthenticationContext';
import { colorFormat } from 'utils/format/ColorFormat';

interface MoreModalProps {
  visible: boolean;
  onClose: () => void;
  form: any;
  add: () => void;  
  fields: any[];
  remove: (name: number) => void;
}

const MoreModal: React.FC<MoreModalProps> = ({ visible, onClose, form, add, fields, remove }) => {
  const {localStrings} = AuthenticationContext();
  const handleSave = () => {
    const fieldNames = fields.map(field => [
      ['more', field.name, 'items']
    ]);
    form.validateFields(fieldNames)
      .then(values => {
        onClose(); 
      })
      .catch(info => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      open={visible}
      width={1300}
      centered
      destroyOnClose
      footer={null}
      title={localStrings.GlobalLabels.Create}
      onCancel={onClose}
    >
      <div className="grid lg:grid-cols-2 grid-cols-1 grid-flow-row gap-2 mt-3">
        {fields.map(field => {
          const fieldName = form.getFieldValue(['more', field.name, 'name']);
          if (fieldName === 'Phạm vi') {
            return null;
          }

          return (
            <Card
              size="small"
              title={localStrings.TopupManagement.More}
              key={field.key}
              className="w-full"
              extra={
                <CloseOutlined onClick={() => remove(field.name)} />
              }
            >
              <Form.Item
                label={localStrings.TopupManagement.MoreInfoName}
                name={[field.name, 'name']}
              >
                <Input
                  placeholder="Nhập tên thông tin"
                  prefix={<FileOutlined className="pr-1" />}
                />
              </Form.Item>

              <Form.Item label={localStrings.TopupManagement.MoreInfoItems}>
                <Form.List name={[field.name, 'items']}>
                  {(subFields, subOpt) => (
                    <>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          rowGap: 10,
                        }}
                      >
                        {subFields.map(subField => (
                          <div className="flex gap-2 cursor-pointer items-center">
                            <Form.Item
                              name={[subField?.name]}
                              className="w-full h-full"
                            >
                              <Input.TextArea
                                placeholder="Nhập thông tin chi tiết"
                                style={{ width: '100%' }}
                              />
                            </Form.Item>
                            <CloseOutlined
                              className="text-base"
                              onClick={() => subOpt.remove(subField.name)}
                            />
                          </div>
                        ))}
                      </div>
                      <Button
                        type="primary"
                        shape="round"
                        icon={<PlusCircleOutlined />}
                        onClick={() => subOpt.add()}
                      >
                        {localStrings.TopupManagement.Add}
                      </Button>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Card>
          );
        })}
      </div>
      <Button
        type="primary"
        shape="round"
        icon={<FileAddOutlined />}
        onClick={() => {
          add();
        }}
      >
        {localStrings.TopupManagement.AddMore}
      </Button>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <Button
          type="primary"
          shape="round"
          onClick={handleSave} 
        >
          Lưu
        </Button>
      </div>
    </Modal>
  );
};

export default MoreModal;
