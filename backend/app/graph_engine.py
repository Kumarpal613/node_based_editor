from collections import deque

from .nodes.image_input import ImageInputNode
from .nodes.gaussian_blur import GaussianBlurNode
from .nodes.crop import CropNode
from .nodes.rotate import RotateNode        # New
from .nodes.brightness import BrightnessNode # New
from .nodes.resize import ResizeNode        # New
from .nodes.convolution import ConvolutionNode # New

NODE_REGISTRY = {
    'imageInput': ImageInputNode,
    'gaussianBlur': GaussianBlurNode,
    'crop': CropNode,
    'rotate': RotateNode,         # New
    'brightness': BrightnessNode, # New
    'resize': ResizeNode,         # New
    'convolution': ConvolutionNode # New
}

class GraphEngine:
    def process_graph(self, graph_data):
        nodes = graph_data['nodes']
        edges = graph_data['edges']
        
        
        adj_list = {node['id']: [] for node in nodes}
        in_degree = {node['id']: 0 for node in nodes}
        node_map = {node['id']: node for node in nodes}
        
        for edge in edges:
            src = edge['source']
            tgt = edge['target']
            adj_list[src].append(tgt)
            in_degree[tgt] += 1

        # 2. Topological Sort (Kahn's Algorithm)
        queue = deque([n_id for n_id, degree in in_degree.items() if degree == 0])
        execution_order = []
        
        while queue:
            node_id = queue.popleft()
            execution_order.append(node_id)
            
            for neighbor in adj_list[node_id]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)

        # 3. Execute Nodes
        results = {} # Store output of every node by ID
        
        for node_id in execution_order:
            node_info = node_map[node_id]
            node_type = node_info['type']
            params = node_info.get('data', {})
            
            # Find inputs for this node from 'results' using edges
            # (Find edges where target == current node_id)
            input_data = []
            for edge in edges:
                if edge['target'] == node_id:
                    source_id = edge['source']
                    if source_id in results:
                        input_data.append(results[source_id])
            
            # Instantiate and Process
            if node_type in NODE_REGISTRY:
                processor = NODE_REGISTRY[node_type](node_id, params)
                output = processor.process(input_data)
                results[node_id] = output
                
        return results # Contains all intermediate images