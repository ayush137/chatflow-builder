import { nodesAtom, selectedNodeAtom } from "@/atom/chatflow-atoms";
import { useAtom, useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
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
    const currentNodes = [...nodes];
    currentNodes[selectedNodeIndex].data.text = value;
    setNodes((nds: Node[]) => {
      const newNodes = nds.map((node) => {
        if (node.id === selectedNodeId) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.data = {
            text: value,
          };
          return node;
        }
      });
      return newNodes as Node[];
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => setFieldValue(), 1000);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <Textarea value={value} onChange={(e) => setValue(e.currentTarget.value)} />
  );
};

export default TextNode;
