# Uses python2
import sys
def gcd(a,b):
	if b == 0:
		return a
	else:
		return gcd(b, a % b)

input = sys.stdin.read()
a, b = map(int, input.split())
print(gcd(a,b))