import React, { useState, useCallback, useRef } from 'react';
import { 
  useNodesState, 
  useEdgesState, 
  addEdge, 
  useReactFlow, 
  ReactFlowProvider 
} from 'reactflow';
import 'reactflow/dist/style.css'; // Standard ReactFlow styles 
import './components/Dashboard.css';

// Import Components
import Header from './components/Header';
import SidebarLeft from './components/SidebarLeft';
import SidebarRight from './components/SidebarRight';
import FlowCanvas from './components/FlowCanvas';

// Import Logic
import { processGraph } from './api/api';

const initialNodes = [{ id: '1', type: 'imageInput', position: { x: 50, y: 100 }, data: { label: 'Input' }}];

// Inner component where the main logic lives
function FlowEditor() {
  // --- STATE ---
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedElement, setSelectedElement] = useState(null); 
  const [isProcessing, setIsProcessing] = useState(false);
  
  

  const { getNodes } = useReactFlow();



  // Optimized Connection Handler: Propagates data IMMEDIATELY when link nodes
  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge(params, eds));
    
    // Auto-pass image from Source -> Target upon connection
    setNodes((nds) => {
      const sourceNode = nds.find(n => n.id === params.source);
      if (sourceNode) {
        // Check if source has an original image or a processed result
        const imageToPass = sourceNode.data.resultImageUrl || sourceNode.data.image_url;
        if (imageToPass) {
           return nds.map(n => 
             n.id === params.target 
             ? { ...n, data: { ...n.data, inputImageUrl: imageToPass } } // Pass it to the target
             : n
           );
        }
      }
      return nds;
    });
  }, [setEdges, setNodes]);

  


  // --- 3. STANDARD ACTIONS ---
  const onNodeClick = useCallback((e, node) => setSelectedElement({ type: 'node', data: node }), []);
  const onEdgeClick = useCallback((e, edge) => setSelectedElement({ type: 'edge', data: edge }), []);
  const onPaneClick = useCallback(() => setSelectedElement(null), []);

  const addNode = (type, defaultData) => {
    const newNode = {
      id: `${getNodes().length + 1}-${Date.now()}`, // Safer unique ID
      type,
      position: { x: 250 + Math.random() * 50, y: 100 + Math.random() * 50 },
      data: { ...defaultData, x: 0, y: 0, w: 100, h: 100 }
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const deleteSelected = () => {
    if (!selectedElement) return;
    if (selectedElement.type === 'node') {
      setNodes((nds) => nds.filter((n) => n.id !== selectedElement.data.id));
      setEdges((eds) => eds.filter((e) => e.source !== selectedElement.data.id && e.target !== selectedElement.data.id));
    } else if (selectedElement.type === 'edge') {
      setEdges((eds) => eds.filter((e) => e.id !== selectedElement.data.id));
    }
    setSelectedElement(null);
  };

  const handleProcess = async () => {
  setIsProcessing(true);
  try {
    const currentNodes = getNodes();
    const results = await processGraph(currentNodes, edges);

    // Create a timestamp to bust the browser cache
    const timestamp = Date.now();

    setNodes((nds) => 
      nds.map((node) => {
        // 1. Check if the backend returned a result for this specific node
        if (results[node.id]) {
          // Force a refresh by adding the timestamp to the URL
          const freshUrl = `${results[node.id]}?t=${timestamp}`;
          
          return {
            ...node,
            data: { ...node.data, resultImageUrl: freshUrl }
          };
        }

        // 2. Logic for OutputNode: Update it based on what is connected to it
        if (node.type === 'output') {
          const incomingEdge = edges.find((e) => e.target === node.id);
          if (incomingEdge && results[incomingEdge.source]) {
            const parentUrl = `${results[incomingEdge.source]}?t=${timestamp}`;
            return {
              ...node,
              data: { ...node.data, resultImageUrl: parentUrl }
            };
          }
        }

        return node;
      })
    );
  } catch (err) {
    console.error("Processing failed", err);
  } finally {
    setIsProcessing(false);
  }
};

  
  // --- RENDER ---
  return (
    <div className="app-container">
      <Header 
        onProcess={handleProcess} 
        isProcessing={isProcessing} 
        onDelete={deleteSelected} 
        hasSelection={!!selectedElement} 
      />

      <div className="workspace" style={{ display: 'flex', width: '100%', overflow: 'hidden' }}>
        
             
        <SidebarLeft onAddNode={addNode} />
        
        {/* CANVAS (Fills remaining space) */}
        <div style={{ flexGrow: 1, height: '100%' }}>
            <FlowCanvas 
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              onEdgeClick={onEdgeClick}
              onPaneClick={onPaneClick}
            />
        </div>
        
        <SidebarRight selectedElement={selectedElement} />
      </div>
    </div>
  );
}

// 4. MAIN EXPORT (Wraps logic in Provider)
export default function App() {
  return (
    <ReactFlowProvider>
      <FlowEditor />
    </ReactFlowProvider>
  );
}