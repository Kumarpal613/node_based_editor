import React from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap 
} from 'reactflow';
import 'reactflow/dist/style.css';

// Import the custom node types we defined earlier

import { nodeTypes } from './nodes/index'; 



const FlowCanvas = ({ 
  nodes, 
  edges, 
  onNodesChange, 
  onEdgesChange, 
  onConnect, 
  onNodeClick, 
  onEdgeClick,
  onPaneClick
}) => {
  
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes} // <--- IMPORTANT: Registers your custom nodes
        fitView
      >
        <Background variant="dots" gap={12} size={1} />
        <Controls />
        <MiniMap 
          nodeColor={(node) => {
            if (node.type === 'imageInput') return '#007bff';
            if (node.type === 'output') return '#28a745';
            return '#ff0072';
          }}
          style={{ height: 100 }} 
        />
      </ReactFlow>
    </div>
  );
};

export default FlowCanvas;