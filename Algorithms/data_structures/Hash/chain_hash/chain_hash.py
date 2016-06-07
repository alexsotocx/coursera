#python3
from collections import deque
class HashChain:
	buckets = None
	p = 1000000007
	x = 263
	m = 0
	pot = [1]
	hashed = {}
	def __init__(self, m):
		self.buckets = [deque() for x in range(m)]
		self.m = m
		for i in range(1, 16):
			self.pot.append((self.pot[i-1] * self.x ) % self.p)

	def operate(self, operation, operand):
		if operation == "add":
			return self.add(operand)
		elif operation == "check":
			return self.check(int(operand))
		elif operation == "del":
			return self.delete(operand)
		elif operation == "find":
			found = self.find(operand)
			if found:
				print("yes")
			else:
				print("no")

	def _hash(self, value):
		if value in self.hashed:
			return self.hashed[value]
		else:
			sumx = 0
			for i in range(len(value)):
				val = ord(value[i])
				sumx = (sumx + (val * self.pot[i]) % self.p) % self.p
			self.hashed[value] = (sumx % self.m)
			return self.hashed[value]

	def check(self, value):
		chain = list(self.buckets[value])
		print(' '.join(chain))

	def delete(self, value):
		chain = self._getChain(value)
		if self.find(value, chain):
			chain.remove(value)



	def _getChain(self, value):
		hash_value = self._hash(value)
		return self.buckets[hash_value]

	def find(self, value, chain = None):
		if chain is None:
			chain = self._getChain(value)
		for val in chain:
			if val == value:
				return True
		return False

	def add(self, value):
		hash_value = self._hash(value)
		chain = self._getChain(value)

		if not(self.find(value, chain)):
			chain.appendleft(value)


m = int(input())
q = int(input())
hashChain = HashChain(m)
while(q > 0):
	action, operand = input().split()
	hashChain.operate(action, operand)
	q -= 1