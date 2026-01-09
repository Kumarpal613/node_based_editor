import React, { memo, useState, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const CropNode = ({ data }) => {
  // Initial Crop State
  const [crop, setCrop] = useState({ unit: 'px', x: 0, y: 0, width: 100, height: 100 });
  const imgRef = useRef(null);

  // When crop changes, update the data params for the Backend
  const handleCropChange = (newCrop) => {
    setCrop(newCrop);
    
    if (imgRef.current) {
      const image = imgRef.current;
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      // Save real coordinates to 'data' so Backend can read them
      data.x = Math.round(newCrop.x * scaleX);
      data.y = Math.round(newCrop.y * scaleY);
      data.w = Math.round(newCrop.width * scaleX);
      data.h = Math.round(newCrop.height * scaleY);
    }
  };

  return (
    <div style={{ 
      background: '#222', 
      padding: '10px', 
      border: '1px solid #FF9800', 
      borderRadius: '8px', 
      minWidth: '300px', 
      color: '#fff' 
    }}>
      <Handle type="target" position={Position.Left} style={{ background: '#FF9800' }} />
      
      <div style={{ fontWeight: 'bold', marginBottom: '10px', borderBottom:'1px solid #444', paddingBottom:'5px' }}>
        ✂️ Visual Crop
      </div>
      
      <div style={{ background: '#000', minHeight: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        
        {/* CHECK: Do we have an input image? */}
        {data.inputImageUrl ? (
          <ReactCrop 
            crop={crop} 
            onChange={(c) => setCrop(c)} 
            onComplete={handleCropChange}
          >
            <img 
              ref={imgRef}
              src={data.inputImageUrl} 
              alt="Crop Source" 
              crossOrigin="anonymous"
              style={{ maxWidth: '100%', maxHeight: '300px', display: 'block' }} 
            />
          </ReactCrop>
        ) : (
          <div style={{ padding: '30px', color: '#666', fontSize: '12px', fontStyle: 'italic' }}>
            Connect an Image Source<br/>to start cropping
          </div>
        )}

      </div>
      
      <div style={{ fontSize:'10px', color:'#aaa', marginTop:'5px', textAlign:'center' }}>
        X: {data.x||0} Y: {data.y||0} W: {data.w||0} H: {data.h||0}
      </div>

      <Handle type="source" position={Position.Right} style={{ background: '#FF9800' }} />
    </div>
  );
};

export default memo(CropNode);