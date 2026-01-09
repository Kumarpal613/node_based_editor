import cv2
from .base import BaseNode

class CropNode(BaseNode):
    def process(self, inputs):
        if not inputs or inputs[0] is None:
            return None
        
        img = inputs[0]
        h_img, w_img = img.shape[:2]

        # Get params (Default to 0,0 and 100x100 if missing)
        try:
            x = int(self.params.get('x', 0))
            y = int(self.params.get('y', 0))
            w = int(self.params.get('w', 100))
            h = int(self.params.get('h', 100))
        except ValueError:
            x, y, w, h = 0, 0, 100, 100

        # Safety Check: Prevent crashing if crop is outside image
        x = max(0, min(x, w_img - 1))
        y = max(0, min(y, h_img - 1))
        w = max(1, min(w, w_img - x))
        h = max(1, min(h, h_img - y))

        # Perform Crop: image[y:y+h, x:x+w]
        self.output = img[y:y+h, x:x+w]
        return self.output