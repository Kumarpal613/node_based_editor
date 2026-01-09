import React, { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';

const ResizeNode = ({ data }) => {
  // 1. Initialize State
  const [width, setWidth] = useState(data.width || 512);
  const [height, setHeight] = useState(data.height || 512);

  // 2. Handlers
  const onWidthChange = (evt) => {
    const val = parseInt(evt.target.value);
    setWidth(val);
    data.width = val;
  };

  const onHeightChange = (evt) => {
    const val = parseInt(evt.target.value);
    setHeight(val);
    data.height = val;
  };

  return (
    <div style={nodeStyle}>
      <Handle type="target" position={Position.Left} style={handleStyle} />
      
      <div style={headerStyle}>📏 Resize</div>
      
      <div style={contentStyle}>
        
        {/* Width Control */}
        <div style={{ marginBottom: '10px' }}>
          <label style={labelStyle}>Width (px)</label>
          <input 
            type="number" 
            className="nodrag"
            value={width} 
            onChange={onWidthChange}
            style={inputStyle}
            min="10"
          />
        </div>

        {/* Height Control */}
        <div>
          <label style={labelStyle}>Height (px)</label>
          <input 
            type="number" 
            className="nodrag"
            value={height} 
            onChange={onHeightChange}
            style={inputStyle}
            min="10"
          />
        </div>

        {/* Optional: Resolution Indicator */}
        <div style={{ marginTop: '10px', fontSize: '10px', color: '#666', textAlign: 'center' }}>
          {width} x {height}
        </div>
      </div>

      <Handle type="source" position={Position.Right} style={handleStyle} />
    </div>
  );
};

// Styles
const nodeStyle = { background: '#1e1e1e', border: '1px solid #555', borderRadius: '8px', minWidth: '150px', color: '#fff', fontSize: '12px', overflow: 'hidden' };
const headerStyle = { background: '#333', padding: '8px', fontWeight: 'bold', borderBottom: '1px solid #444' };
const contentStyle = { padding: '15px' };
const labelStyle = { display: 'block', marginBottom: '4px', color: '#aaa', fontSize: '10px', textTransform: 'uppercase' };
const handleStyle = { background: '#555', width: '10px', height: '10px' };
const inputStyle = { width: '100%', padding: '5px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px', boxSizing: 'border-box' };

export default memo(ResizeNode);