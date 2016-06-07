#python3
import sys

n = int(sys.stdin.readline())
array = list(map(int, sys.stdin.readline().split()))
def left_child(i):
	return i*2 + 1
def right_child(i):
	return i*2 + 2

def make_heap(n, array):
	operations = []
	lens = n//2

	def shift_down(index):
		while(True):
			minChild = index
			left = left_child(index)
			right = right_child(index)
			if (left < len(array) and array[left] < array[minChild]):
				minChild = left
			if (right < len(array) and array[right] < array[minChild]):
				minChild = right
			if(index != minChild):
				operations.append((index, minChild))
				array[index], array[minChild] = array[minChild], array[index]
				index = minChild
			else:
				break;

	while(lens >= 0):
		shift_down(lens)
		lens -= 1
	print(len(operations))
	for operation in operations:
		print(operation[0], operation[1])

make_heap(n, array)

