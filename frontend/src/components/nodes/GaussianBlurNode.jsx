import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const GaussianBlurNode = ({ data }) => {
  const handleChange = (e) => {
    data.ksize = e.target.value;
  };

  return (
    <div style={{ background: '#222', padding: '10px', border: '1px solid #2196F3', borderRadius: '5px', color: '#fff', minWidth: '120px' }}>
      <Handle type="target" position={Position.Left} style={{ background: '#555' }} />
      <div style={{ fontWeight: 'bold', marginBottom: '5px', fontSize: '12px' }}>💧 Gaussian Blur</div>
      
      <label style={{ fontSize: '10px', display: 'block' }}>Kernel Size:</label>
      <input 
        type="number" 
        defaultValue={data.ksize || 5} 
        onChange={handleChange}
        style={{ width: '100%', padding: '2px', background: '#333', border: 'none', color: '#fff' }} 
      />
      
      <Handle type="source" position={Position.Right} style={{ background: '#555' }} />
    </div>
  );
};

export default memo(GaussianBlurNode);