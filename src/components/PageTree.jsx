import {
  useEffect,
  useMemo,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import { getLayoutedElements } from "../utils/dagreUtils";
import HomeSections from "./HomeSections";

const CustomNode = ({ data }) => {
  const isHome = data.type === "home";

  return (
    <div
      className={`${
        isHome ? "w-65" : "w-40 p-2"
      } rounded-md border border border-[#2a2a2a] shadow-xl backdrop-blur-md bg-white/5 transition-all duration-300 hover:scale-[1.02]`}
    >
      {isHome ? (
        <HomeSections sections={data.sections} onChange={data.onChange} />
      ) : (
        <div className="text-white text-lg font-semibold text-center">
          {data.label}
        </div>
      )}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "#60a5fa", border: "none" }}
      />
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "#60a5fa", border: "none" }}
      />
    </div>
  );
};

const PageTree = forwardRef(({ homeSections, setHomeSections }, ref) => {
  const [layouted, setLayouted] = useState(false);

  const nodeTypes = useMemo(
    () => ({
      custom: CustomNode,
    }),
    []
  );

  const baseNodes = [
    {
      id: "home",
      type: "custom",
      data: {
        type: "home",
        label: "Home",
        sections: homeSections,
        onChange: setHomeSections,
      },
      position: { x: 0, y: 0 },
    },
    {
      id: "about",
      data: { label: "About" },
      position: { x: 0, y: 0 },
      type: "custom",
    },
    {
      id: "services",
      data: { label: "Services" },
      position: { x: 0, y: 0 },
      type: "custom",
    },
    {
      id: "blog",
      data: { label: "Blog" },
      position: { x: 0, y: 0 },
      type: "custom",
    },
    {
      id: "contact",
      data: { label: "Contact" },
      position: { x: 0, y: 0 },
      type: "custom",
    },
    {
      id: "service1",
      data: { label: "Service Detail 1" },
      position: { x: 0, y: 0 },
      type: "custom",
    },
    {
      id: "service2",
      data: { label: "Service Detail 2" },
      position: { x: 0, y: 0 },
      type: "custom",
    },
    {
      id: "blog1",
      data: { label: "Blog Post 1" },
      position: { x: 0, y: 0 },
      type: "custom",
    },
    {
      id: "blog2",
      data: { label: "Blog Post 2" },
      position: { x: 0, y: 0 },
      type: "custom",
    },
    {
      id: "author",
      data: { label: "Author Page" },
      position: { x: 0, y: 0 },
      type: "custom",
    },
    {
      id: "location",
      data: { label: "Location Info" },
      position: { x: 0, y: 0 },
      type: "custom",
    },
    {
      id: "support",
      data: { label: "Support Page" },
      position: { x: 0, y: 0 },
      type: "custom",
    },
  ];

  const baseEdges = [
    { id: "e1", source: "home", target: "about" },
    { id: "e2", source: "home", target: "services" },
    { id: "e3", source: "home", target: "blog" },
    { id: "e4", source: "home", target: "contact" },
    { id: "e5", source: "services", target: "service1" },
    { id: "e6", source: "services", target: "service2" },
    { id: "e7", source: "blog", target: "blog1" },
    { id: "e8", source: "blog", target: "blog2" },
    { id: "e9", source: "blog", target: "author" },
    { id: "e10", source: "contact", target: "location" },
    { id: "e11", source: "contact", target: "support" },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useImperativeHandle(ref, () => ({
    getGraphData: () => ({
      nodes,
      edges,
    }),
  }));

  useEffect(() => {
    if (!layouted) {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(baseNodes, baseEdges);
      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
      setLayouted(true);
    }
  }, [layouted]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === "home"
          ? {
              ...node,
              data: {
                ...node.data,
                sections: homeSections,
              },
            }
          : node
      )
    );
  }, [homeSections]);

  return (
    <div className="h-[500px] w-full rounded-md border border-gray-700 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#312e81] shadow-lg">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap
            nodeColor={(node) => (node.id === "home" ? "#818cf8" : "#4ade80")}
            maskColor="rgba(255, 255, 255, 0.28)"
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              width: 150,
              height: 100,
              background: "rgba(255, 255, 255, 0.1)",
            }}
          />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
});

export default PageTree;
