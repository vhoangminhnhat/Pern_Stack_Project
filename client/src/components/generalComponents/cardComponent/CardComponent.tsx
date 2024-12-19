import { Card } from "antd";
import { ReactNode } from "react";

export interface ICardComponent {
  data: {
    title: string;
    extra: ReactNode;
    children: ReactNode;
  };
}

const CardComponent = (props: ICardComponent) => {
  const { children, extra, title } = props?.data;
  return (
    <div
      style={{
        flex: 1,
        height: "100vh",
        marginBottom: 70,
      }}
      className="px-2 py-1"
    >
      <Card title={title} className="shadow-2xl" extra={[extra]}>
        {children}
      </Card>
    </div>
  );
};

export default CardComponent;
