#python3
import sys
import heapq

threads, jobs = map(int, sys.stdin.readline().split())
array = list(map(int, sys.stdin.readline().split()))
threads_time = [0 for h in range(threads)]
queue = []
i = 0
while(i < min(threads, jobs)):
	heapq.heappush(queue, (array[i] + threads_time[i], i, i, threads_time[i]))#Total time, job, thread
	i += 1
times = [None for h in range(jobs)]
while len(queue) > 0:
	total_time, thread, job, start_time = heapq.heappop(queue)
	times[job] = (thread, start_time)
	threads_time[thread] = total_time
	if i < jobs:
		heapq.heappush(queue, (threads_time[thread] + array[i], thread, i , threads_time[thread]))
		i += 1

for time in times:
	print(time[0], time[1])

	
