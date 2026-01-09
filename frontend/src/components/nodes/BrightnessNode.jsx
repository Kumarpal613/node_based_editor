import React, { memo, useState, useEffect } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';

const BrightnessNode = ({ data, id }) => {
  // 1. Initialize local state from data (or default to 1.0)
  const [brightness, setBrightness] = useState(data.brightness ?? 1.0);

  // 2. Access React Flow instance to update global state safely
  const { setNodes } = useReactFlow();

  // 3. Sync local state to global node data whenever it changes
  useEffect(() => {
    // This ensures that when you drag the slider, the actual node data updates
    data.brightness = brightness; 
    
    // Optional: If you need to force a global re-render (rarely needed but safer)
    /*
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          node.data = { ...node.data, brightness: brightness };
        }
        return node;
      })
    );
    */
  }, [brightness, data, id, setNodes]);

  const handleChange = (evt) => {
    const val = parseFloat(evt.target.value);
    if (!isNaN(val)) {
      setBrightness(val);
    }
  };

  return (
    <div style={nodeStyle}>
      <Handle type="target" position={Position.Left} style={handleStyle} />
      
      <div style={headerStyle}>☀️ Brightness</div>
      
      <div style={contentStyle}>
        <label style={labelStyle}>Factor (0.0 - 3.0)</label>
        
        {/* Number Input for precision */}
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="number" 
            className="nodrag"
            min="0"
            max="3"
            step="0.1"
            value={brightness}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        {/* Slider Input */}
        <input 
          type="range" 
          className="nodrag" 
          min="0" 
          max="3" 
          step="0.1" 
          value={brightness} 
          onChange={handleChange}
          style={{ width: '100%', cursor: 'pointer' }}
        />
        
        <div style={{ fontSize: '10px', color: '#888', marginTop: '5px', textAlign: 'center' }}>
          {brightness < 1 ? 'Darker' : brightness > 1 ? 'Brighter' : 'Normal'}
        </div>
      </div>

      <Handle type="source" position={Position.Right} style={handleStyle} />
    </div>
  );
};

// --- Styles ---
const nodeStyle = { background: '#1e1e1e', border: '1px solid #555', borderRadius: '8px', minWidth: '160px', color: '#fff', fontSize: '12px', overflow: 'hidden' };
const headerStyle = { background: '#333', padding: '8px', fontWeight: 'bold', borderBottom: '1px solid #444' };
const contentStyle = { padding: '15px' };
const labelStyle = { display: 'block', marginBottom: '5px', color: '#aaa', fontSize: '11px' };
const handleStyle = { background: '#555', width: '10px', height: '10px' };
const inputStyle = { width: '100%', padding: '5px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px', boxSizing: 'border-box' };

export default memo(BrightnessNode);