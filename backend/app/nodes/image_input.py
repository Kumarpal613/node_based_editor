# backend/app/nodes/image_input.py
from .base import BaseNode
import cv2
import os

class ImageInputNode(BaseNode):
    def process(self, inputs):
        # The frontend will send 'image_path' in the params
        image_path = self.params.get('image_path')
        
        if not image_path:
            print(f"Node {self.node_id}: No image path provided.")
            return None
            
        # Ensure path is valid relative to backend
        if not os.path.exists(image_path):
             # Try looking in static/uploads if relative path fails
             image_path = os.path.join('static/uploads', os.path.basename(image_path))

        img = cv2.imread(image_path)
        
        if img is None:
            print(f"Node {self.node_id}: Failed to load image at {image_path}")
            return None
            
        self.output = img
        return self.output