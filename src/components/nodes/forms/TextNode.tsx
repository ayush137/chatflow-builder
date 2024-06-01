import { nodesAtom, selectedNodeAtom } from "@/atom/chatflow-atoms";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Node } from "reactflow";

const TextNode = () => {
  const [nodes, setNodes] = useAtom(nodesAtom);
  const selectedNodeId = useAtomValue(selectedNodeAtom);
  const selectedNodeIndex = nodes.findIndex(
    (item) => item?.id === selectedNodeId
  );
  const selectedNode = nodes[selectedNodeIndex];
  const [value, setValue] = useState(selectedNode?.data?.text);

  const setFieldValue = () => {
    setNodes((nds: Node[]) => {
      const newNodes = nds.map((node) => {
        if (node.id === selectedNodeId) {
          node.data = {
            text: value,
            error: "",
          };
        }
        return node;
      });

      return newNodes as Node[];
    });
  };

  useEffect(() => {
    setValue(selectedNode?.data?.text);
  }, [selectedNode]);

  useEffect(() => {
    if (!selectedNode) return;
    const timer = setTimeout(() => setFieldValue(), 500);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="flex flex-col gap-[5px]">
      <Textarea
        placeholder="Enter message"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
      {selectedNode?.data?.error ? (
        <div className="text-red-500 text-[14px] leading-[16px] tracking-[0.5px]">
          {selectedNode?.data?.error}
        </div>
      ) : null}
    </div>
  );
};

export default TextNode;
