# Node-Based Image Editor

A powerful, visual node-based image processing editor built with **React Flow** and **OpenCV (Python)**. This application allows users to build image processing pipelines by connecting various functional nodes like Blur, Rotate, Resize, and Brightness adjustments.

## 🚀 Features

- **Visual Workflow**: Drag-and-drop nodes to create custom image processing logic.
- **Dynamic Previews**: View real-time results at any stage of the pipeline via the Inspector or Output nodes.
- **Image Processing Suite**:
  - 📷 **Image Input**: Upload and preview your source images.
  - ☀️ **Brightness**: Adjust intensity with synchronized slider and number inputs.
  - 📏 **Resize**: Change dimensions in absolute pixels.
  - 🔄 **Rotate**: Rotate images with a 0-360 degree scale.
  - 💧 **Filters**: Gaussian Blur and Convolution kernels (Sharpen, Emboss, etc.).
- **Smart Backend**: Python/Flask engine using Kahn's Algorithm for topological graph execution.

## 🛠️ Tech Stack

- **Frontend**: React, React Flow, Axios, Vite.
- **Backend**: Python, Flask, OpenCV (cv2), NumPy.

## 📦 Installation & Setup

### Backend
1. Navigate to the `/backend` folder.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt