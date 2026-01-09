import cv2
import numpy as np
from .base import BaseNode

class BrightnessNode(BaseNode):
    def process(self, inputs):
        if not inputs or inputs[0] is None: 
            return None
            
        img = inputs[0]
        
        # 1. Match the key 'brightness' from your JSX data.brightness
        # Default to 1.0 (no change) if not found
        factor = float(self.params.get('brightness', 1.0))
        
        # 2. Use multiplicative brightness (Scaling)
        # Using convertScaleAbs with alpha as the factor and beta as 0
        # Formula: output = img * alpha + beta
        self.output = cv2.convertScaleAbs(img, alpha=factor, beta=0)
        
        return self.output