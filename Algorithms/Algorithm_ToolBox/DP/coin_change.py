#uses python3
inifity = 1000000000000
coins = list(map(int, input().split()))
print(coins)
q, *queries = map(int, input().split())
coinChange = [0]
for m in range(1, 100):
	coinChange.append(inifity)
	for coin in coins:
		if coin <= m:
			coinChange[m] = min(coinChange[m], coinChange[m - coin] + 1)

for query in queries:
	print("Ammount = %d => Coins = %d" % (query, coinChange[query]))