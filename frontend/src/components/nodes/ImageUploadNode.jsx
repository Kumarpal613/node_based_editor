import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { uploadImage } from '../../api/api';

const ImageUploadNode = ({ data }) => {
  // inside ImageUploadNode.jsx

  const handleUpload = async (evt) => {
    const file = evt.target.files[0];
    if (!file) return;
    
    try {
      const res = await uploadImage(file);
      
      // Save BOTH path (for backend) and url (for frontend)
      data.image_path = res.path;
      data.image_url = res.url; // <--- This is new
      
      // Force update by creating a new object reference (optional but safer)
      // but usually direct assignment works in this simplified setup
      
      alert("Image Uploaded!");
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    }
  };

  return (
    <div style={{ background: '#222', padding: '10px', border: '1px solid #fff', borderRadius: '5px', color: '#fff' }}>
      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>📷 Image Input</div>
      <input type="file" onChange={handleUpload} style={{ fontSize: '10px', color: '#aaa', width: '100%' }} />
      <Handle type="source" position={Position.Right} style={{ background: '#555' }} />
    </div>
  );
};

export default memo(ImageUploadNode);