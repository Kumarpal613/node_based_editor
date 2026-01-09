# backend/app/routes.py
import os
import cv2
import numpy as np
from flask import request, jsonify, current_app
from .graph_engine import GraphEngine

# Initialize Engine
engine = GraphEngine()

def init_routes(app):
    
    @app.route('/upload', methods=['POST'])
    def upload_image():
        if 'image' not in request.files:
            return jsonify({'error': 'No file part'}), 400
        
        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
            
        # 1. Save to static/uploads
        static_folder = os.path.join(current_app.root_path, 'static')
        upload_folder = os.path.join(static_folder, 'uploads')
        
        if not os.path.exists(upload_folder):
            os.makedirs(upload_folder)
            
        filepath = os.path.join(upload_folder, file.filename)
        file.save(filepath)
        
        # 2. Return the Web URL (This is the fix!)
        # This gives React a valid link like "http://localhost:5000/static/uploads/image.jpg"
        web_url = f"http://localhost:5000/static/uploads/{file.filename}"
        
        return jsonify({
            'filename': file.filename, 
            'path': filepath,   # For internal Python use
            'url': web_url      # For React to display
        })

    @app.route('/process', methods=['POST'])
    def process_graph():
        graph_data = request.json
        try:
            # 1. Run the Engine
            results = engine.process_graph(graph_data)
            
            response_data = {}
            static_folder = os.path.join(current_app.root_path, 'static')
            if not os.path.exists(static_folder):
                os.makedirs(static_folder)

            # 2. Save EVERY node's output to disk
            for node_id, img_data in results.items():
                if img_data is not None:
                    # Save as node_1.jpg, node_2.jpg, etc.
                    filename = f"node_{node_id}.jpg"
                    filepath = os.path.join(static_folder, filename)
                    cv2.imwrite(filepath, img_data)
                    
                    # Return the URL for this specific node
                    response_data[node_id] = f"http://localhost:5000/static/{filename}"

            # Returns: { "1": "http.../node_1.jpg", "2": "http.../node_2.jpg" }
            return jsonify(response_data) 
            
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({"error": str(e)}), 500