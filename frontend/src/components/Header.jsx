import React from 'react';
import './Header.css'; // <--- Import the styles

const Header = ({ onProcess, isProcessing, onDelete, hasSelection }) => {
  return (
    <div className="header">
      {/* Left Side: Title/Logo */}
      <div className="logo-area">
        <span style={{ fontSize: '20px' }}>⚡</span>
        <h1 className="logo-text">NodeEditor</h1>
      </div>

      {/* Right Side: Action Buttons */}
      <div className="header-controls">
        
        {/* Delete Button - Only enabled if something is selected */}
        <button 
          className="btn btn-danger" 
          onClick={onDelete} 
          disabled={!hasSelection}
          title="Delete selected node"
        >
          🗑️ Delete Selected
        </button>

        {/* Process Button - Shows spinner when processing */}
        <button 
          className="btn btn-primary" 
          onClick={onProcess} 
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>⏳ Processing...</>
          ) : (
            <>▶ Process Graph</>
          )}
        </button>
      </div>
    </div>
  );
};

export default Header;