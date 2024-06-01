import { nodesAtom, selectedNodeAtom } from "@/atom/chatflow-atoms";
import { NODE_TYPE_MAP } from "@/components/nodes";
import Blueprint from "@/components/nodes/Blueprint";
import { useAtom } from "jotai";
import { useMemo } from "react";
import BackArrow from "../../../assets/BackArrow.svg";

const SideBar = () => {
  const [nodes, setNodes] = useAtom(nodesAtom);
  const [selectedNodeId, setSelectedNodeId] = useAtom(selectedNodeAtom);

  const selectedNode = nodes?.find((item) => item?.id === selectedNodeId);
  const CurrentEditMenu = selectedNode?.type
    ? NODE_TYPE_MAP?.[selectedNode.type]?.form
    : "";

  const BluePrintBar = useMemo(() => {
    return Object.keys(NODE_TYPE_MAP)?.map((item) => {
      const { color, icon } = NODE_TYPE_MAP[item];
      return <Blueprint color={color} icon={icon} type={item} key={item} />;
    });
  }, []);

  function handleRemoveSelectedNode() {
    const currentNodeIndex = nodes?.findIndex(
      (item) => item?.id === selectedNodeId
    );
    if (currentNodeIndex !== -1 && !nodes?.[currentNodeIndex]?.data?.text) {
      setNodes((nds) => {
        nds[currentNodeIndex].data.error = "Required";
        return [...nds];
      });
    } else {
      setSelectedNodeId(null);
    }
  }

  return (
    <>
      {selectedNode ? (
        <div
          className="flex justify-between items-center border px-[20px] py-[20px] hover:bg-slate-300 transition-colors duration-200 cursor-pointer"
          onClick={handleRemoveSelectedNode}
        >
          <img src={BackArrow} />
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
