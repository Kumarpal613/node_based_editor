import cv2
from .base import BaseNode

class ResizeNode(BaseNode):
    def process(self, inputs):
        if not inputs or inputs[0] is None: return None
        img = inputs[0]
        
        # 1. Get absolute pixels from frontend data.width and data.height
        # Use existing image dimensions as fallback to avoid 0x0 errors
        target_width = int(self.params.get('width', img.shape[1]))
        target_height = int(self.params.get('height', img.shape[0]))
        
        # 2. Sanity check: ensure dimensions are at least 1px
        if target_width <= 0: target_width = 1
        if target_height <= 0: target_height = 1
        
        # 3. Apply resize
        # INTER_AREA is great for shrinking; INTER_LINEAR is better for enlarging
        self.output = cv2.resize(img, (target_width, target_height), interpolation=cv2.INTER_AREA)
        return self.output