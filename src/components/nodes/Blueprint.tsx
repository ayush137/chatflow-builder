import { TReactProps } from "@/index.types";
import React from "react";

type TBluePrintProps = {
  type: string;
  icon: JSX.Element;
  color: string;
};

const Blueprint: TReactProps<TBluePrintProps> = (props) => {
  const { color, icon, type } = props;
  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <div
      style={{ borderColor: color }}
      className={`w-full px-[20px] py-[15px] rounded-[6px] border`}
      onDragStart={(event) => onDragStart(event)}
      draggable
    >
      {icon}
    </div>
  );
};
export default Blueprint;
