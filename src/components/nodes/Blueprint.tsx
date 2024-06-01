import { TReactProps } from "@/index.types";
import React from "react";
import { TITLE_MAP } from "./constants";

type TBluePrintProps = {
  type: string;
  icon: JSX.Element;
  color: string;
};

const Blueprint: TReactProps<TBluePrintProps> = (props) => {
  const { color, icon, type } = props;

  function onDragStart(event: React.DragEvent<HTMLDivElement>) {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
  }

  return (
    <div
      style={{ borderColor: color }}
      className={`w-full px-[20px] py-[15px] rounded-[6px] border flex gap-[10px] items-center cursor-grab`}
      onDragStart={(event) => onDragStart(event)}
      draggable
    >
      {icon}
      <div
        style={{ color: color }}
        className="text-[16px] leading-[22px] tracking-[0.5px] font-semibold"
      >
        {TITLE_MAP?.[type] || ""}
      </div>
    </div>
  );
};
export default Blueprint;
