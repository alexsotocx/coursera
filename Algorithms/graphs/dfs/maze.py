#python3
global visited


def dfs(node, adj):
    global visited
    if not visited[node]:
        visited[node] = True
        for node in adj[node]:
            dfs(node, adj)

def main():
    global visited
    n,m = map(int, input().split())
    adj = [[] for x in range(n)]
    visited = [False for  x in range(n)]
    for i in range(m):
        a,b = map(int, input().split())
        a -=1
        b -=1
        adj[a].append(b)
        adj[b].append(a)
    u, v = map(int, input().split())
    # connected_components = 0
    # for i in range(n):
    #     if not visited[i]:
    #         connected_components += 1
    #         dfs(i, adj)
    dfs(u-1, adj)

    if visited[v-1]:
        print(1)
    else:
        print(0)

main()
