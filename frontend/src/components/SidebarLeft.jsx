import React from 'react';
import { nodeCategories } from './nodes'; // Imports your category list
import './SidebarLeft.css'; // <--- CRITICAL: Import the CSS here

const SidebarLeft = ({ onAddNode }) => {
  return (
    <div className="left-panel">
      {/* Header */}
      <div className="panel-header">
        <h3>Add Nodes</h3>
      </div>

      {/* List */}
      <div className="panel-content">
        {Object.entries(nodeCategories).map(([category, items]) => (
          <div key={category} className="category-wrapper">
            
            {/* Category Name */}
            <div className="category-title">
              {category}
            </div>

            {/* Node Items */}
            <div className="category-items">
              {items.map((node) => (
                <div 
                  key={node.type} 
                  className="node-btn" 
                  onClick={() => onAddNode(node.type, node.defaultData)}
                  title={`Add ${node.label}`}
                >
                  {/* Optional: You can put an icon here if your data has one */}
                  {node.label}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarLeft;