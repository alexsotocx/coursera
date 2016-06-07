#python3
from collections import deque
from collections import namedtuple
Package = namedtuple('Package', ['pos', 'arrive_time', 'proccesing_time'])

class NetworkUnit:
	max_buffer_size = 0
	_buffer = deque()
	current_time = 0
	times = None
	last_processed = None #start_time, finish_time

	def __init__(self, max_buffer_size, count_packages):
		self.max_buffer_size = max_buffer_size
		self.times = [-1 for x in range(count_packages)]

	def process(self, package):
		if package is None:
			package = self._buffer.popleft()
			return self.process(package)
		else:
			current_time = max(current_time, package.arrive_time)
			last_processed = (current_time, current_time + package.arrive_time)
			current_time += package.arrive_time
			times[package.pos] = current_time

	def enqueue(self, package):
		if len(self._buffer) < self.max_buffer_size:
			self._buffer.append(package)
		else:
			#The buffer is full


def main():
	s, n = map(int, input())
	network_unit = NetworkUnit(s, n)
	inp = deque()
	for i in range(n):
		a, p = map(int, input())
		package = Package(i, a, p)
		inp.append(package)

	while(len(inp) > 0):
		package = inp.popleft()
		










