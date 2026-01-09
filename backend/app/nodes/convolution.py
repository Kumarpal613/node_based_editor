import cv2
import numpy as np
from .base import BaseNode

class ConvolutionNode(BaseNode):
    def process(self, inputs):
        if not inputs or inputs[0] is None: return None
        img = inputs[0]
        
        # 1. Get the kernel type from frontend (default to sharpen)
        # Matches <select onChange={(e) => data.kernel = e.target.value}>
        kernel_type = self.params.get('kernel', 'sharpen')
        
        # 2. Define standard matrices
        if kernel_type == 'sharpen':
            kernel = np.array([[0, -1, 0], 
                               [-1, 5, -1], 
                               [0, -1, 0]])
        elif kernel_type == 'edge_detection':
            kernel = np.array([[-1, -1, -1], 
                               [-1,  8, -1], 
                               [-1, -1, -1]])
        elif kernel_type == 'emboss':
            kernel = np.array([[-2, -1, 0], 
                               [-1,  1, 1], 
                               [ 0,  1, 2]])
        elif kernel_type == 'box_blur':
            # Averaging kernel
            kernel = np.ones((3, 3), np.float32) / 9
        else:
            # Fallback to identity (no change)
            kernel = np.array([[0, 0, 0], [0, 1, 0], [0, 0, 0]])

        self.output = cv2.filter2D(img, -1, kernel)
        return self.output