# Uses python3
n = int(input())
nums = []
for i in range(1, n + 1):
	if (n - i) > i:
		nums.append(i)
		n-= i
	else:
		nums.append(n)
		break
print(len(nums))
for num in nums:
	print(num, end=' ')