#python3
from collections import deque
from collections import namedtuple
OpenB = namedtuple('OpenB', ['char', 'pos'])
def check_sintax(code):
	opens = deque()
	closers = {")": "(", "}" : "{", "]":"["}
	for i in range(len(code)):
		x = code[i]
		if not(x in "[{()}]"):
			continue
		if x in "[{(":
			opens.append(OpenB(x, i + 1))
		else:
			if len(opens) == 0:
				print(i + 1)
				return
			else:
				closer = closers[x]
				if closer != opens[-1].char:
					print(i + 1) 
					return
				else:
					opens.pop()
	if len(opens) == 0:
		print("Success")
	else:
		print(opens[0].pos)

check_sintax(input())

