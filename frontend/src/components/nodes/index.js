import ImageInputNode from './ImageUploadNode';;
import OutputNode from './OutputNode';
import CropNode from './CropNode';
import GaussianBlurNode from './GaussianBlurNode';

// --- Import New Nodes ---
import BrightnessNode from './BrightnessNode';
import RotateNode from './RotateNode';
import ResizeNode from './ResizeNode';
import ConvolutionNode from './ConvolutionNode';

// 1. REGISTER NODE TYPES
// The keys (left side) must match the 'type' string used in nodeCategories below
export const nodeTypes = {
  imageInput: ImageInputNode,
  output: OutputNode,
  crop: CropNode,
  gaussianBlur: GaussianBlurNode,
  // New Nodes
  brightness: BrightnessNode,
  rotate: RotateNode,
  resize: ResizeNode,
  convolution: ConvolutionNode
};

// 2. SIDEBAR CATEGORIES
// These define the buttons in your Left Sidebar
export const nodeCategories = {
  'Input': [
    { 
      type: 'imageInput', 
      label: '📷 Image Input', 
      defaultData: { label: 'Image Input' } 
    }
  ],
  'Filters': [
    { 
      type: 'crop', 
      label: '✂️ Crop', 
      defaultData: { label: 'Crop', x: 10, y: 10, w: 100, h: 100 } 
    },
    { 
      type: 'gaussianBlur', 
      label: '💧 Blur', 
      defaultData: { label: 'Blur', intensity: 5 } 
    },
    { 
      type: 'brightness', 
      label: '☀️ Brightness', 
      defaultData: { label: 'Brightness', brightness: 1.0 } 
    },
    { 
      type: 'convolution', 
      label: '🧠 Convolution', 
      defaultData: { label: 'Convolution', kernel: 'sharpen' } 
    }
  ],
  'Transform': [
    { 
      type: 'rotate', 
      label: '🔄 Rotate', 
      defaultData: { label: 'Rotate', angle: 90 } 
    },
    { 
      type: 'resize', 
      label: '📏 Resize', 
      defaultData: { label: 'Resize', width: 512, height: 512 } 
    }
  ],
  'Output': [
    { 
      type: 'output', 
      label: '🏁 Output', 
      defaultData: { label: 'Output' } 
    }
  ]
};