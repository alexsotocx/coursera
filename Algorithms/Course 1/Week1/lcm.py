# Uses python2
import sys
def gcd(a,b):
	if b == 0:
		return a
	else:
		return gcd(b, a % b)

def lcm(a,b):
	return long(a*b/gcd(a,b))

input = sys.stdin.read()
a, b = map(long, input.split())
print(lcm(a,b))