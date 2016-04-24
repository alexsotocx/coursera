# Uses python2
queries = list(map(int, input().split()))
for a in queries:
	total = 0
	amount = a
	if (a >= 20):
		total += (a // 20)
		a -= (a//20) * 20
	if (a >= 8):
		total += (a // 8)
		a -= (a//8) * 8
	total += a

	print("A = %d => Coins %d" % (amount, total))