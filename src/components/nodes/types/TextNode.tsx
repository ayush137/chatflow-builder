import { nodesAtom, selectedNodeAtom } from "@/atom/chatflow-atoms";
import { useAtom } from "jotai";
import { Handle, NodeProps, Position } from "reactflow";

export type TTextNodeData = {
  text?: string;
};

export default function TextNode(props: NodeProps<TTextNodeData>) {
  const [selectedNode, setSelectedNode] = useAtom(selectedNodeAtom);
  const [nodes, setNodes] = useAtom(nodesAtom);

  const handleNodeSelection = () => {
    const currentNodeIndex = nodes?.findIndex(
      (item) => item?.id === selectedNode
    );
    if (currentNodeIndex !== -1 && !nodes?.[currentNodeIndex]?.data?.text) {
      setNodes((nds) => {
        nds[currentNodeIndex].data.error = "Required";
        return [...nds];
      });
    } else {
      setSelectedNode(props?.id);
    }
  };

  return (
    <div
      className={`w-[300px] relative border ${
        selectedNode === props?.id ? " border-green-600" : ""
      } rounded-[6px] bg-white`}
      onClick={handleNodeSelection}
    >
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={props.isConnectable}
      />
      <div className="bg-green-200 px-[10px] py-[6px] rounded-[6px] font-semibold">
        Send Message
      </div>
      <div
        className={`px-[10px] py-[20px] ${
          props?.data?.text ? "" : "text-[#6d7175] text-center"
        }`}
      >
        {props?.data?.text || "Provide Text"}
      </div>
      <Handle type="source" position={Position.Right} id="hell" />
    </div>
  );
}
