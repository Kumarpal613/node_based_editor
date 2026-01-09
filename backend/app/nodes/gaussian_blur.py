from .base import BaseNode
import cv2

class GaussianBlurNode(BaseNode):
    def process(self, inputs):
        # Inputs[0] is the image from the previous node
        if not inputs or inputs[0] is None:
            return None
            
        input_image = inputs[0]
        kernel_size = int(self.params.get('ksize', 5))
        # Ensure kernel size is odd
        if kernel_size % 2 == 0: kernel_size += 1
            
        self.output = cv2.GaussianBlur(input_image, (kernel_size, kernel_size), 0)
        return self.output