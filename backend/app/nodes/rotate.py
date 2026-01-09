import cv2
from .base import BaseNode

class RotateNode(BaseNode):
    def process(self, inputs):
        if not inputs or inputs[0] is None: return None
        img = inputs[0]
        angle = int(self.params.get('angle', 0))
        
        # Rotate around center
        (h, w) = img.shape[:2]
        center = (w // 2, h // 2)
        M = cv2.getRotationMatrix2D(center, angle, 1.0)
        self.output = cv2.warpAffine(img, M, (w, h))
        return self.output