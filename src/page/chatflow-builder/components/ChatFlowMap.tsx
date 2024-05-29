import { edgesAtom, nodesAtom, selectedNodeAtom } from "@/atom/chatflow-atoms";
import { NODE_TYPE_MAP, nodeTypes } from "@/components/nodes";
import { useAtom, useSetAtom } from "jotai";
import { useCallback, useRef, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  ReactFlowInstance,
  ReactFlowProvider,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import { nanoid } from "nanoid";
import "reactflow/dist/style.css";

const ChatFlowMap = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes] = useAtom(nodesAtom);
  const [edges, setEdges] = useAtom(edgesAtom);
  const setSelectedNode = useSetAtom(selectedNodeAtom);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    if (event?.dataTransfer?.dropEffect) event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type =
        event?.dataTransfer &&
        event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type || !reactFlowInstance) {
        return;
      }
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode: Node = {
        id: nanoid(),
        type,
        position,
        data: NODE_TYPE_MAP?.[type]?.blueprint,
      };

      setNodes((nds) => nds.concat(newNode));
      setSelectedNode(newNode?.id);
    },
    [reactFlowInstance]
  );

  return (
    <ReactFlowProvider>
      <div className="reactflow-wrapper h-full w-full" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onInit={setReactFlowInstance}
          fitView
          maxZoom={1}
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          <Background color="#ccc" variant={BackgroundVariant.Dots} />
          <MiniMap nodeStrokeWidth={3} zoomable pannable />
          <Controls />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

export default ChatFlowMap;
