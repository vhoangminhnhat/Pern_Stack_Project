import { Button, Col, Form } from "antd";
import { ReactNode } from "react";

export type filterButtonsProps = {
  searchLg: number;
  redoLg: number;
  type: "primary" | "dashed" | "default" | "link" | "text";
  htmlType: "button" | "reset" | "submit";
  searchIcon: ReactNode;
  needButtonTitle?: boolean;
  searchName: string;
  redoName: string;
  redoIcon: ReactNode;
  onRedoClick: () => Promise<void>;
};

export const FilterButtons = <T extends filterButtonsProps>(data: T) => {
  return (
    <>
      <Col span={24} lg={data?.searchLg}>
        <Form.Item>
          {!!data?.needButtonTitle && data?.needButtonTitle === true ? (
            <div className="lg:flex hidden text-white">{"title"}</div>
          ) : null}
          <Button
            type={data?.type}
            htmlType={data?.htmlType}
            style={{ width: "100%" }}
            icon={data?.searchIcon}
            size="middle"
          >
            {data?.searchName}
          </Button>
        </Form.Item>
      </Col>
      <Col span={24} lg={data?.redoLg}>
        <Form.Item>
          <Button
            type="primary"
            danger
            size="middle"
            style={{ width: "100%" }}
            icon={data?.redoIcon}
            onClick={data?.onRedoClick}
          >
            {data?.redoName}
          </Button>
        </Form.Item>
      </Col>
    </>
  );
};
