'use client'
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  getOutgoers,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
  Handle,
  Position
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';


const initialNodes = [
  {
    id: '1',
    position: { x: 100, y: 200 },
    type: 'custom',
    data: {
      label: 'Node 1qqas',
    },
  },
  {
    id: '2',
    position: { x: 105, y: 100 },
    data: { label: 'Node 2' },
    draggable: true
  },
];
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' }
];

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const fitViewOptions = { padding: 1 };

  const onConnect = (params: any) => setEdges((eds) => addEdge(params, eds))

  return (
    <div className='h-screen'>
      <ReactFlow
        proOptions={{ hideAttribution: true }}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={{ custom: CustomNode }}
        onConnect={onConnect}
      >
        <Controls position="top-left" fitViewOptions={fitViewOptions} />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
      <div>
        <pre>
          {JSON.stringify(nodes, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default Flow;



function CustomNode({ data }: { data: any }) {
  return (
    <div className='bg-blue-200 border border-b rounded-xl p-2'>
      <Handle type="target" position={Position.Top} /> {/* Input */}
      <div>{data.label}</div>
      <Handle type="source" position={Position.Right} /> {/* Output */}
    </div>
  );
}