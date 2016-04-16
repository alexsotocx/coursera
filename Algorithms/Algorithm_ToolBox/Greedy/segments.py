# Uses python3
import sys
from collections import namedtuple

Segment = namedtuple('Segment', 'end start')

def solve(segments, n):
	points = []
	i = 0
	while i < n:
		end_point = segments[i].end
		points.append(end_point)
		i += 1
		while i < n and end_point >= segments[i].start and  segments[i].end >= end_point:
			i+= 1
	return points


if __name__ == '__main__':
    input = sys.stdin.read()
    n, *data = map(int, input.split())
    segments = list(map(lambda x: Segment(x[1], x[0]), zip(data[::2], data[1::2])))
    segments.sort()
    points = solve(segments, n)
    print(len(points))
    for p in points:
        print(p, end=' ')


