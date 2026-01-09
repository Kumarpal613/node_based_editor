import React from 'react';
import './SidebarRight.css'; // <--- Imports the CSS file

const SidebarRight = ({ selectedElement }) => {
  
  // Logic: Extract the image URL safely
  
  const inspectorImage = selectedElement?.type === 'node' 
    ? (selectedElement.data.data.resultImageUrl || selectedElement.data.data.image_url)
    : null;

  return (
    <div className="right-panel">
      {/* 1. Standard Header */}
      <div className="panel-header">
        <h3>Inspector</h3>
      </div>

      {/* 2. Content Area */}
      {selectedElement ? (
        <div className="inspector-content">
          
          {/* Node Type Info */}
          <div className="info-row">
            <span className="info-label">Type</span>
            <div className="info-value">
              {selectedElement.type === 'node' ? selectedElement.data.data.label : 'Link'}
            </div>
          </div>

          {/* Node ID Info */}
          <div className="info-row">
            <span className="info-label">ID</span>
            <div className="info-value">
              {selectedElement.data.id}
            </div>
          </div>

          {/* Image Preview Section */}
          <div className="info-row">
            <span className="info-label">Output Preview</span>
            <div className="preview-box">
              {inspectorImage ? (
                <img 
                  src={inspectorImage} 
                  alt="Preview" 
                  className="preview-img" /* <--- Uses CSS max-width/max-height */
                />
              ) : (
                <span style={{ color: '#555', fontSize: '11px' }}>
                  {selectedElement.type === 'edge' ? 'Link Selected' : 'No Image Data'}
                </span>
              )}
            </div>
          </div>

        </div>
      ) : (
        /* 3. Empty State */
        <div className="empty-state">
          Select a node to view properties.
        </div>
      )}
    </div>
  );
};

export default SidebarRight;