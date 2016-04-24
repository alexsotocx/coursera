#python3
majority = {}
n = int(input())
array = map(int, input().split())
ismajority = 0
for x in array:
	majority[x] = majority.get(x, 0) + 1
	if majority[x] > n//2:
		ismajority = 1
		break
print(ismajority)



