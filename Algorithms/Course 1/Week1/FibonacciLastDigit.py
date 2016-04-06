# Uses python2
n = int(input())
a = 0
b = 1
if n <= 1:
	print(n)
else:
	for i in range(2, n + 1):
		c = b
		b = ((a % 10) + (b % 10)) % 10
		a = (c  % 10)
	print(b % 10)
