#python3
class Item(object):
	min = 10000000000000
	max = -10000000000000
	def __init__(self, min, max):
		self.min = min
		self.max = max
	def __repr__(self):
		return "(m = %d, M = %d)" % (self.min, self.max)

def solveOperation(num1, operation, num2):
	if operation == "+":
		return num1 + num2
	elif operation == "-":
		return num1 - num2
	elif operation == "*":
		return num1 * num2
	elif operation == "/" and num2 != 0:
		return num1 / num2


def minMax(i,j, op, M):
	mm = Item(10000000000000, -10000000000000)
	for k in range(i, j):
		a = solveOperation(M[i][k].max, op[k], M[k+1][j].max)
		b = solveOperation(M[i][k].max, op[k], M[k+1][j].min)
		c = solveOperation(M[i][k].min, op[k], M[k+1][j].max)
		d = solveOperation(M[i][k].min, op[k], M[k+1][j].min)
		mm.max = max(mm.max, a, b, c, d)
		mm.min = min(mm.min, a, b, c, d)
	return mm

def parenetheses(d, op):
	n = len(d)
	M = [[0 for x in range(n)] for x in range(n)]
	for i in range(n):
		M[i][i] = Item(d[i], d[i])
	
	for s in range(1, n):
		for i in range(0, n - s):
			j = s + i
			M[i][j] = minMax(i, j, op, M)
	return M[0][n - 1]

inp = input()
d = []
op = []
for i in inp:
	if i in ["+", "-", "*", "/"]:
		op.append(i)
	else:
		d.append(int(i))


print(parenetheses(d, op).max)
