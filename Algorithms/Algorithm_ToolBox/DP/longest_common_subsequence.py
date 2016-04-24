#python3
def longestCommonSubsequence(A,B):
	n = len(A) + 1
	m = len(B) + 1
	D = [[0 for x in range(m)] for x in range(n)]
	for x in range(n):
		D[x][0] = x
	for x in range(m):
		D[0][x] = x

	for i in range(1, n):
		for j in range(1, m):
			dij_1 = D[i][j-1]
			di_1j = D[i-1][j]
			if A[i-1] == B[j-1]:
				D[i][j] = max(dij_1, di_1j, D[i-1][j-1] + 1)
			else:
				D[i][j] = max(dij_1, di_1j, D[i-1][j-1])

	return D[n-1][m-1]

A = input()
B = input()
print(editDistance(A,B))