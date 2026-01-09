import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const ConvolutionNode = ({ data }) => {
  return (
    <div style={nodeStyle}>
      <Handle type="target" position={Position.Left} style={handleStyle} />
      
      <div style={headerStyle}>🧠 Convolution</div>
      
      <div style={contentStyle}>
        <label style={labelStyle}>Kernel Type</label>
        <select 
          className="nodrag"
          onChange={(e) => data.kernel = e.target.value}
          defaultValue={data.kernel || 'sharpen'}
          style={selectStyle}
        >
          <option value="sharpen">Sharpen</option>
          <option value="box_blur">Box Blur</option>
          <option value="edge_detection">Edge Detect</option>
          <option value="emboss">Emboss</option>
        </select>
      </div>

      <Handle type="source" position={Position.Right} style={handleStyle} />
    </div>
  );
};

const nodeStyle = { background: '#1e1e1e', border: '1px solid #555', borderRadius: '8px', minWidth: '180px', color: '#fff', fontSize: '12px', overflow: 'hidden' };
const headerStyle = { background: '#333', padding: '8px', fontWeight: 'bold', borderBottom: '1px solid #444' };
const contentStyle = { padding: '15px' };
const labelStyle = { display: 'block', marginBottom: '5px', color: '#aaa', fontSize: '11px' };
const handleStyle = { background: '#555', width: '10px', height: '10px' };
const selectStyle = { width: '100%', padding: '6px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px', cursor: 'pointer', outline: 'none' };

export default memo(ConvolutionNode);