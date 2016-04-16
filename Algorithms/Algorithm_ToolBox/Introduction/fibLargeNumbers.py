# Uses python2
import sys

I2 = [[1, 0], [0, 1]]
baseMatrix = [[0, 1], [1, 1]]
M = 10000000
def squareMulMat(m1, m2):
	result = [[0, 0], [0, 0]]
	for i in range(len(m1)):
		for j in range(len(m1)):
			for k in range(len(m2)):
				result[i][j] = (((m1[i][k] * m2[k][j]) % M) + result[i][j]) % M

	return result



def fastExponientation(p):
	#print("Solving for ", p)
	if p == 0:
		return I2
	elif p == 1:
		return baseMatrix
	else:
		aux = fastExponientation(p/2)
		aux = squareMulMat(aux, aux)
		if (p % 2) == 1:
			aux = squareMulMat(aux, baseMatrix)
		return aux

def fib(n):
	aux = fastExponientation(n)
	return aux[0][1] % M


input = sys.stdin.read()
n, M = map(long, input.split())
print(fib(n))