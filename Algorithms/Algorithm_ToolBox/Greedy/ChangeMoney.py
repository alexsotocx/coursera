# Uses python2
a = long(input())
total = 0
if (a >= 10):
	total += (a / 10)
	a -= (a/10) * 10
if (a >= 5):
	total += (a / 5)
	a -= (a/5) * 5
total += a

print(total)