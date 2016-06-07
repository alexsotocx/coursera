#python3
from collections import namedtuple
import sys, threading
sys.setrecursionlimit(10**8) # max depth of recursion
threading.stack_size(2**30)  # new thread will get stack of such size
Node = namedtuple('Node', ['value', 'left', 'right'])

class BTree:
	nodes = None
	parents = None

	def __init__(self, num_nodes):
		self.nodes = [None for x in range(num_nodes)]
		self.parents = [-1 for x in range(num_nodes)]

	def add_node(self, index, value, left, right):
		if left == -1:
			left = None
		else:
			self.parents[left] = index
		if right == -1:
			right = None
		else:
			self.parents[right] = index
		self.nodes[index] = Node(value, left, right)

	def inorder(self, index):
		if not(index is None):
			node = self.nodes[index]
			self.inorder(node.left)
			print(node.value, end=" ")
			self.inorder(node.right)

	def preorder(self, index):
		if not(index is None):
			node = self.nodes[index]
			print(node.value, end=" ")
			self.preorder(node.left)
			self.preorder(node.right)

	def postorder(self, index):
		if not(index is None):
			node = self.nodes[index]
			self.postorder(node.left)
			self.postorder(node.right)
			print(node.value, end=" ")


def main():
	m = int(input())
	tree = BTree(m)
	for i in range(m):
		value, left, right = map(int, input().split())
		tree.add_node(i, value, left, right)

	tree.inorder(0)
	print("")
	tree.preorder(0)
	print("")
	tree.postorder(0)  

threading.Thread(target=main).start()
