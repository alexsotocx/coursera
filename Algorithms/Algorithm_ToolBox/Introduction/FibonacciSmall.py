# Uses python3
n = int(input())
a = 0
b = 1
if n <= 1:
	print(n)
else:
	for i in range(2, n + 1):
		c = b
		b = a + b
		a = c
	print(b)
