import React, { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';

const RotateNode = ({ data }) => {
  // 1. Use Local State to keep inputs in sync
  const [angle, setAngle] = useState(data.angle || 0);

  // 2. Unified Change Handler
  const onAngleChange = (evt) => {
    const newValue = parseInt(evt.target.value) || 0; // Handle NaN gracefully
    
    // Update local state (Updates the UI instantly)
    setAngle(newValue);
    
    // Update React Flow data (Updates the backend logic)
    data.angle = newValue;
  };

  return (
    <div style={nodeStyle}>
      <Handle type="target" position={Position.Left} style={handleStyle} />
      
      <div style={headerStyle}>🔄 Rotate</div>
      
      <div style={contentStyle}>
        <label style={labelStyle}>Angle (Degrees)</label>
        
        {/* NUMBER INPUT */}
        <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
            <input 
              type="number" 
              className="nodrag"
              value={angle}  /* <--- Controlled by state */
              onChange={onAngleChange}
              style={inputStyle}
            />
        </div>

        {/* SLIDER INPUT */}
        <input 
          type="range" 
          className="nodrag"
          min="0" 
          max="360" 
          step="1"       /* Changed to 1 for smooth syncing */
          value={angle}  /* <--- Controlled by state */
          onChange={onAngleChange}
          style={{ width: '100%', cursor: 'pointer' }}
        />
        
        {/* Helper Text */}
        <div style={{ fontSize: '10px', color: '#888', marginTop: '5px', textAlign: 'center' }}>
          Current: {angle}°
        </div>
      </div>

      <Handle type="source" position={Position.Right} style={handleStyle} />
    </div>
  );
};

// --- STYLES ---
const nodeStyle = { background: '#1e1e1e', border: '1px solid #555', borderRadius: '8px', minWidth: '160px', color: '#fff', fontSize: '12px', overflow: 'hidden' };
const headerStyle = { background: '#333', padding: '8px', fontWeight: 'bold', borderBottom: '1px solid #444' };
const contentStyle = { padding: '15px' };
const labelStyle = { display: 'block', marginBottom: '5px', color: '#aaa', fontSize: '11px' };
const handleStyle = { background: '#555', width: '10px', height: '10px' };
const inputStyle = { width: '100%', padding: '5px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px', boxSizing: 'border-box' };

export default memo(RotateNode);