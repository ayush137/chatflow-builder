import { nodesAtom, selectedNodeAtom } from "@/atom/chatflow-atoms";
import { NODE_TYPE_MAP } from "@/components/nodes";
import Blueprint from "@/components/nodes/Blueprint";
import { useAtom, useAtomValue } from "jotai";
import React, { useMemo } from "react";

const SideBar = () => {
  const nodes = useAtomValue(nodesAtom);
  const [selectedNodeId] = useAtom(selectedNodeAtom);
  const BluePrintBar = useMemo(() => {
    return Object.keys(NODE_TYPE_MAP)?.map((item) => {
      const { color, icon } = NODE_TYPE_MAP[item];
      return <Blueprint color={color} icon={icon} type={item} key={item} />;
    });
  }, []);

  const selectedNode = nodes?.find((item) => item?.id === selectedNodeId);

  const CurrentEditMenu = selectedNode?.type
    ? NODE_TYPE_MAP?.[selectedNode.type]?.form
    : "";

  console.log(nodes);

  return (
    <div className="w-full  py-[30px] px-[10px] flex flex-col gap-[30px]">
      {selectedNode ? <CurrentEditMenu key={selectedNode} /> : BluePrintBar}
    </div>
  );
};

export default SideBar;
