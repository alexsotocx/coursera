# Uses python2
import sys

class Item(object):
	value = 0.0
	weight = 0.0
	def __lt__(self, other):
		return (self.value / self.weight) < (other.value / other.weight)

def solve(items, W, n):
	total = 0.0
	i = 0
	while W > 0 and i < n:
		item = items[i]
		w = min(W, item.weight)
		W -= w
		total += w * (item.value / item.weight)
		i+= 1
	return total


data = list(map(long, sys.stdin.read().split()))
n, W = data[:2]
items = []
for i in range(n):
	c = i + 1 
	v, w = data[(c*2):(c*2+2)]
	item = Item()
	item.value = float(v)
	item.weight = float(w)
	items.append(item)

items.sort(reverse=True)

print("{:.10f}".format(solve(items, W, n)))