import React from 'react';
import { availableNodes } from './nodes'; // Import list from registry

const Toolbar = ({ onAddNode }) => {
  return (
    <div style={{ width: '200px', background: '#1e1e1e', padding: '15px', borderRight: '1px solid #333', color: '#fff' }}>
      <h3 style={{ marginTop: 0 }}>Add Nodes</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {availableNodes.map((node) => (
          <button
            key={node.type}
            onClick={() => onAddNode(node.type, node.label)}
            style={{
              padding: '10px',
              background: '#333',
              color: '#fff',
              border: '1px solid #555',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            {node.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;