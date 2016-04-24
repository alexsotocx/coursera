#python3
from collections import namedtuple
Item = namedtuple('Item', ['v', 'w'])
def knapsackWithR(W, items):
	value = [0]
	for w in range(1, W + 1):
		value.append(0)
		for item in items:
			if item.w <= w:
				value[w] = max(value[w], value[w - item.w] + item.v)
	return value[W]

def knapsackWithoutR(W, items):
	n = len(items) + 1
	wl = W + 1
	D = [[0 for x in range(n)] for x in range(wl)]
	for i in range(1, n):
		item = items[i - 1]
		for w in range(1, wl):
			D[w][i] = D[w][i - 1]
			if w >= item.w:
				D[w][i] = max(D[w - item.w][i - 1] + item.v, D[w][i])
	return D[W][n - 1]


W, n = map(int, input().split())
items = []
for w in list(map(int, input().split())):
	items.append(Item(w,w))

#print("knapsackWithR = %d" % (knapsackWithR(W, items)))
print(knapsackWithoutR(W, items))

