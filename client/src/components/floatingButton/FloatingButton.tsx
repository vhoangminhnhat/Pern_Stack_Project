import { FloatButton } from "antd";
import { ReactNode } from "react";

interface FloatingButtonProps {
  icon: ReactNode;
  onClick: () => void;
  className?: string;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  icon,
  onClick,
  className = "",
}) => {
  return (
    <FloatButton
      type="primary"
      shape="circle"
      icon={icon}
      onClick={onClick}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "48px",
        height: "48px",
        padding: 0,
        insetInlineEnd: 24 + 10,
      }}
      className={`bottom-8`}
    />
  );
};

export default FloatingButton;
