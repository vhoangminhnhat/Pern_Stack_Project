import { Button } from "antd";
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
    <Button
      type="primary"
      shape="circle"
      icon={icon}
      onClick={onClick}
      className={`fixed bottom-8 right-8 w-12 h-12 text-lg ${className}`}
    />
  );
};

export default FloatingButton; 