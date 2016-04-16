# Uses python3
n = int(input())
a = list(map(int, input().split()))
b = list(map(int, input().split()))
b.sort(reverse=True)
a.sort()
total = 0
for i in range(n):
	total += a[i] * b[i]
print(total)