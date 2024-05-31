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
    setNodes((nds: Node[]) => {
      const newNodes = nds.map((node) => {
        if (node.id === selectedNodeId) {
          node.data = {
            text: value,
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
    const timer = setTimeout(() => setFieldValue(), 1000);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <Textarea value={value} onChange={(e) => setValue(e.currentTarget.value)} />
  );
};

export default TextNode;
