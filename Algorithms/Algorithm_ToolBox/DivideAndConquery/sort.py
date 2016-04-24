#python3
n = int(input())
array = list(map(int, input().split()))
array.sort()
for x in array:
	print(x, end = " ")
