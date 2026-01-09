import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const OutputNode = ({ data }) => {
  
  // 1. ROBUST CHECK: Look for the image in multiple places
  //    - inputImageUrl: Usually passed when connecting nodes
  //    - resultImageUrl: If the previous node finished processing
  //    - image_url: Fallback for raw images
  const imageToShow = data.inputImageUrl || data.resultImageUrl || data.image_url || data.previewUrl;

  return (
    <div style={nodeStyle}>
      {/* Input Handle (Left Side) */}
      <Handle 
        type="target" 
        position={Position.Left} 
        style={{ background: '#fff', width: '12px', height: '12px' }} 
      />
      
      {/* Header */}
      <div style={headerStyle}>
        👁️ Final Output
      </div>

      {/* Content Area */}
      <div style={contentStyle}>
        {imageToShow ? (
          <div style={imageContainerStyle}>
            <img 
              src={imageToShow} 
              alt="Output" 
              style={imageStyle} 
            />
          </div>
        ) : (
          <div style={emptyStateStyle}>
            <span style={{ fontSize: '24px', marginBottom: '5px' }}>🔌</span>
            <span>Connect a node to view result</span>
          </div>
        )}
      </div>
    </div>
  );
};

// --- STYLES (Kept consistent with your dark theme) ---

const nodeStyle = {
  background: '#1e1e1e', // Dark grey to match sidebar
  border: '2px solid #4ade80', // Green border to signify "Output"
  borderRadius: '8px',
  minWidth: '220px',
  color: '#fff',
  overflow: 'hidden',
  boxShadow: '0 4px 6px rgba(0,0,0,0.4)',
};

const headerStyle = {
  background: '#333',
  padding: '8px 12px',
  fontSize: '12px',
  fontWeight: 'bold',
  borderBottom: '1px solid #444',
  textAlign: 'center',
  color: '#4ade80' // Green text
};

const contentStyle = {
  padding: '0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '150px',
  background: '#000',
};

const imageContainerStyle = {
  width: '100%',
  height: '180px', // Fixed height for consistency
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
};

const imageStyle = {
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain', // Ensures image is fully visible
};

const emptyStateStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#555',
  fontSize: '12px',
  fontStyle: 'italic',
  padding: '20px'
};

export default memo(OutputNode);