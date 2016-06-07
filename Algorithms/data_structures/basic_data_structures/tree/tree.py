# python3

import sys, threading
sys.setrecursionlimit(10**8) # max depth of recursion
threading.stack_size(2**30)  # new thread will get stack of such size

class TreeHeight:
		def read(self):
				self.n = int(sys.stdin.readline())
				parents = list(map(int, sys.stdin.readline().split()))
				self.nodes = [[] for x in range(self.n)]
				self.root = -1
				for i in range(len(parents)):
					parent = parents[i]
					if parent == -1:
						self.root = i
					else:
						self.nodes[parent].append(i)

		def compute_height(self):
				# Replace this code with a faster implementation
				return self._height(self.root)

		def _height(self, node):
			if len(self.nodes[node]) == 0:
				return 1
			maxh = -1
			for i in self.nodes[node]:
				maxh = max(self._height(i), maxh)
			return maxh + 1

def main():
  tree = TreeHeight()
  tree.read()
  print(tree.compute_height())

threading.Thread(target=main).start()
