import { nodesAtom, selectedNodeAtom } from "@/atom/chatflow-atoms";
import { NODE_TYPE_MAP } from "@/components/nodes";
import Blueprint from "@/components/nodes/Blueprint";
import { useAtom, useAtomValue } from "jotai";
import React, { useMemo } from "react";

const SideBar = () => {
  const nodes = useAtomValue(nodesAtom);
  const [selectedNodeId, setSelectedNodeId] = useAtom(selectedNodeAtom);
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

  return (
    <>
      {selectedNode ? (
        <div
          className="flex justify-between items-center border px-[20px] py-[20px] hover:bg-slate-300 transition-colors duration-200 cursor-pointer"
          onClick={() => setSelectedNodeId(null)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#000000"
            viewBox="0 0 256 256"
          >
            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm40,112H107.31l18.35,18.34a8,8,0,0,1-11.32,11.32l-32-32a8,8,0,0,1,0-11.32l32-32a8,8,0,0,1,11.32,11.32L107.31,120H168a8,8,0,0,1,0,16Z"></path>
          </svg>
          <span className="block w-full text-center">Message</span>
        </div>
      ) : null}
      <div className="w-full  py-[30px] px-[10px] flex flex-col gap-[30px]">
        {selectedNode ? (
          <>
            <CurrentEditMenu key={selectedNode} />
          </>
        ) : (
          BluePrintBar
        )}
      </div>
    </>
  );
};

export default SideBar;
