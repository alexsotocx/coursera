# Uses python3
def gcd(a,b):
	if b == 0:
		return a
	else:
		return gcd(b, a % b)

inp = input().split()
a = int(inp[0])
b = int(inp[1])

print("GCD of %d and %d is %d" % (a, b, gcd(a,b)))