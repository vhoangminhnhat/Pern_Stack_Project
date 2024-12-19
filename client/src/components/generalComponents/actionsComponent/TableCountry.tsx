import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Select,
  Table,
  Typography,
} from "antd";
import { AuthenticationContext } from "context/AuthenticationContext";
import React, { useEffect, useState } from "react";

interface CountryFormProps {
  countries: any[];
  roamingPartners: any[];
  dataSources: any[];
  onDataChange: (data: any[]) => void;
}

const CountryForm: React.FC<CountryFormProps> = ({
  countries,
  roamingPartners,
  dataSources,
  onDataChange,
}) => {
  const { localStrings } = AuthenticationContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentCountry, setCurrentCountry] = useState<any>(null);

  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState(dataSources);

  const [editingKey, setEditingKey] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  const handleAddCountry = () => {
    setCurrentCountry(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditCountry = (record: any) => {
    setCurrentCountry(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDeleteCountry = (id: string) => {
    const newData = dataSource.filter((item) => item.id !== id);
    setDataSource(newData);
    onDataChange(newData);
  };

  const handleSave = async () => {
    try {
      const row = await form.validateFields();
      const newData = [...dataSource];
      const index = newData.findIndex((item) => item.id === currentCountry?.id);

      if (index > -1) {
        newData[index] = { ...currentCountry, ...row };
      } else {
        newData.push({ ...row, id: row.id });
      }
      setDataSource(newData);
      onDataChange(newData);
      setIsModalVisible(false);
      form.resetFields();
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (values.roamingPartner?.length === 0) {
          form.setFields([
            {
              name: "roamingPartner",
              errors: [
                `Vui lòng thêm ít nhất 1 ${localStrings.RoamingManagement.RoamingPartner.Title}.`,
              ],
            },
          ]);
        } else {
          handleSave();
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  useEffect(() => {
    setDataSource(dataSources);
  }, [dataSources]);

  useEffect(() => {
    if (onDataChange) {
      onDataChange(dataSource);
    }
  }, [dataSource, onDataChange]);

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    children,
    ...restProps
  }: any) => {
    const inputNode =
      inputType === "select" ? (
        <Select
          placeholder={`Chọn ${title}`}
          options={dataIndex === "id" ? countries : roamingPartners}
          fieldNames={{ label: "name", value: "id" }}
        />
      ) : (
        <Input />
      );
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Vui lòng nhập ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const isEditing = (record: any) => record.id === editingKey;

  const columns = [
    {
      title: localStrings.RoamingManagement.Country.Title,
      dataIndex: "id",
      editable: true,
      render: (text: any) => {
        const country = countries?.find((c: any) => c.id === text);
        return country ? country.name : "";
      },
    },
    {
      title: localStrings.GlobalLabels.Actions,
      dataIndex: "action",
      render: (_: any, record: any) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button onClick={handleSave} style={{ marginRight: 8 }}>
              OK
            </Button>
            <Button onClick={() => setEditingKey("")}>
              {localStrings.GlobalLabels.Cancel}
            </Button>
          </span>
        ) : (
          <>
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEditCountry(record)}
              style={{ marginRight: 8 }}
            />
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteCountry(record.id)}
            />
          </>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => ({
    ...col,
    onCell: (record: any) => ({
      record,
      inputType: col.dataIndex === "id" ? "select" : "text",
      dataIndex: col.dataIndex,
      title: col.title,
      editing: isEditing(record),
    }),
  }));

  return (
    <>
      <div style={{ display: "flex" }}>
        <Typography.Title style={{ marginRight: "5px" }} level={5}>
          Danh sách quốc gia
        </Typography.Title>

        <Button
          style={{ width: "10%", background: "#218017" }}
          type="primary"
          onClick={handleAddCountry}
          icon={<PlusCircleOutlined className="font-bold" />}
          block
        >
          {localStrings.GlobalLabels.Create}
        </Button>
      </div>

      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={dataSource}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            onChange: (page) => setCurrentPage(page),
          }}
        />
      </Form>

      <Modal
        title={
          currentCountry
            ? localStrings.RoamingManagement.Country.Edit
            : localStrings.RoamingManagement.Country.Add
        }
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="id"
            label="Country"
            required={true}
            rules={[
              {
                required: true,
                message: localStrings.RoamingManagement.PlaceHolder.Country,
              },
            ]}
          >
            <Select
              placeholder={localStrings.RoamingManagement.Country.Add}
              options={countries}
              fieldNames={{ label: "name", value: "id" }}
            />
          </Form.Item>
          <Form.List name="roamingPartner">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name }) => (
                  <Card
                    size="small"
                    key={key}
                    extra={<CloseOutlined onClick={() => remove(name)} />}
                  >
                    <Form.Item
                      name={[name, "id"]}
                      label={
                        localStrings.RoamingManagement.RoamingPartner.Title
                      }
                      required={true}
                    >
                      <Select
                        placeholder={
                          localStrings.RoamingManagement.RoamingPartner.Select
                        }
                        options={roamingPartners}
                        fieldNames={{ label: "name", value: "id" }}
                        aria-required={true}
                      />
                    </Form.Item>
                    <Form.Item
                      name={[name, "handSet"]}
                      label="Handset"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập Handset.",
                        },
                      ]}
                      required={true}
                    >
                      <Input placeholder="Handset" />
                    </Form.Item>
                    <Form.Item
                      name={[name, "codeMobileDevice"]}
                      label="Code Mobile Device"
                    >
                      <Input placeholder="Code Mobile Device" />
                    </Form.Item>
                    <Form.Item
                      name={[name, "transferredAccountDataInterchangeGroup"]}
                      label="Transferred Account Data Interchange Group"
                    >
                      <Input placeholder="Transferred Account Data Interchange Group" />
                    </Form.Item>
                  </Card>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  {localStrings.RoamingManagement.RoamingPartner.Add}
                </Button>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </>
  );
};

export default CountryForm;
