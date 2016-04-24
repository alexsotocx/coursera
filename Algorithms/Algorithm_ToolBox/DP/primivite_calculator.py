#python3
from collections import deque
def solve(number):
	op = [0, 0]
	for i in range(2, number + 1):
		op1 = op[i - 1] + 1
		op2 = 100000000000000
		op3 = 100000000000000
		if (i % 2) == 0:
			op2 = op[(i // 2)] + 1
		if (i % 3) == 0:
			op2 = op[(i // 3)] + 1
		op.append(min(op1, op2, op3))
	return op
def backtrack(n, solution):
	ans = deque()
	ans.append(n)
	while(n != 1):
		if solution[n] - 1 == solution[n - 1]:
			ans.appendleft(n - 1)
			n -= 1
			pass
		elif (n % 2) == 0 and solution[n] - 1 == solution[n // 2]:
			ans.appendleft(n // 2)
			n //= 2
			pass
		elif (n % 3) == 0 and solution[n] - 1 == solution[n // 3]:
			ans.appendleft(n // 3)
			n //= 3
			pass
	return ans
		

n = int(input())
solution = solve(n)
print(solution[n])
exp = backtrack(n, solution)
for elem in exp:
	print(elem, end=" ")

