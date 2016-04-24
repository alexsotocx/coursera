#python3
#input
# 5 1 5 8 12 13
# 5 8 1 23 1 11
# output
# 2 0 -1 0 -1 
def binarySearch(array, item):
	low = 0
	high = len(array) - 1
	while low <= high:
		mid = (low + high) //2
		if array[mid] == item:
			return mid
		elif array[mid] > item:
			high = mid - 1
		else:
			low = mid + 1

	return -1

#Main
n, *array = map(int, input().split())
q, *queries = map(int, input().split())
for i in range(q):
	print(binarySearch(array, queries[i]), end = ' ')