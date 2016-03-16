# Uses python3
# Input
# 3
# 1 2 3
# Output
# 6
inp = input()
n = int(inp)
inp = input()
maxNumber1 = -1
maxNumber2 = -1
for number in inp.split():
	number = int(number)
	if maxNumber1 < number:
		maxNumber2 = maxNumber1
		maxNumber1 = number
	elif maxNumber2 < number:
		maxNumber2 = number

print(maxNumber1  * maxNumber2)