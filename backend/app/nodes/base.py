import numpy as np

class BaseNode:
    def __init__(self, node_id, params=None):
        self.node_id = node_id
        self.params = params or {}
        self.output = None

    def process(self, inputs):
        """
        inputs: A list or dictionary of data from previous nodes.
        This method must be overridden by child classes.
        """
        raise NotImplementedError("Process method not implemented")