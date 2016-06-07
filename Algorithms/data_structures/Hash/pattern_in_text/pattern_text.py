#python3
p = input()
t = input()
def kmp_preprocess(p):
	m = len(p)
	i = 0; j = -1; b = [-1]
	while(i < m):
		while(j >= 0 and p[i] != p[j]):
			j = b[j]
		j += 1; i += 1
		b.append(j)
	return b

def kmp_search(b, p, t):
	m = len(p)
	n = len(t)
	i = 0; j = 0
	out = []
	while(i < n):
		while(j >= 0 and t[i] != p[j]):
			j = b[j]
		j += 1; i += 1
		if j == m:
			print(i-j, end=" ")
			j = b[j]

b = kmp_preprocess(p)
print(b)
kmp_search(b, p, t)
