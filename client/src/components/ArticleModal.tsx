import { Button, Form, Input, message, Modal, Typography, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import React, { useEffect, useState } from "react";
import { ArticleModel } from "../models/article/ArticleModel";
import { ArticleManagementViewModel } from "../viewmodels/ArticleManagementViewModel";

interface ArticleModalProps {
  viewModel: ArticleManagementViewModel;
}

const ArticleModal: React.FC<ArticleModalProps> = ({ viewModel }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (viewModel.selectedArticle) {
      form.setFieldsValue({
        name: viewModel.selectedArticle.name,
        code: viewModel.selectedArticle.code,
        url: viewModel.selectedArticle.url,
      });
      if (viewModel.selectedArticle.file) {
        setFileList([
          {
            uid: "-1",
            name: viewModel.selectedArticle.file.name,
            status: "done",
            url: URL.createObjectURL(viewModel.selectedArticle.file),
          },
        ]);
      }
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [viewModel.selectedArticle, form]);

  const handleSubmit = async (values: any) => {
    try {
      const articleData = new ArticleModel(
        values.name,
        values.code,
        values.url,
        fileList[0]?.originFileObj || null,
        viewModel.selectedArticle?.id
      );

      const success = viewModel.isCreateMode
        ? await viewModel.createArticle(articleData)
        : await viewModel.updateArticle(articleData);

      if (success) {
        message.success(
          viewModel.isCreateMode
            ? "Article created successfully"
            : "Article updated successfully"
        );
      }
    } catch (err: any) {
      message.error(err.response?.data?.error?.message || "An error occurred");
    }
  };

  const beforeUpload = (file: File) => {
    const isPDF = file.type === "application/pdf";
    const isXLSX =
      file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    if (!isPDF && !isXLSX) {
      message.error("You can only upload PDF and XLSX files!");
      return Upload.LIST_IGNORE;
    }
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error("File must be smaller than 10MB!");
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  const handleFileChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);
  };

  return (
    <Modal
      title={viewModel.modalTitle}
      open={viewModel.isModalOpen}
      onCancel={viewModel.closeModal}
      footer={null}
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ name: "", code: "", url: "" }}
      >
        <Form.Item
          name="name"
          label="Article Name"
          rules={[{ required: true, message: "Please input article name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="code"
          label="Article Code"
          rules={[{ required: true, message: "Please input article code!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="url" label="Article URL">
          <Input />
        </Form.Item>

        <Form.Item label="File Upload">
          <Upload
            beforeUpload={beforeUpload}
            fileList={fileList}
            onChange={handleFileChange}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Upload PDF/XLSX</Button>
          </Upload>
          <Typography.Text
            type="secondary"
            style={{ display: "block", marginTop: 8 }}
          >
            Only PDF and XLSX files are allowed. Max file size: 10MB
          </Typography.Text>
        </Form.Item>

        <Form.Item>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <Button onClick={viewModel.closeModal}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={viewModel.loading}
            >
              {viewModel.isCreateMode ? "Create" : "Update"}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ArticleModal;
