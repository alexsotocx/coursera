var DisjoinSet = function(n, dataSize) {
	this.parent = new Array(n);
	this.rank = new Array(n);
	this.dataSize = dataSize;
	for(var i = 0; i < n; i++) {
		this.parent[i] = i;
		this.rank[i] = 0;
	}
};

DisjoinSet.prototype.find = function(x) {
	return (this.parent[x] == x) ? x : this.parent[x] = this.find(this.parent[x]);
}

DisjoinSet.prototype.union = function(a, b) {
	var rootA = this.find(a);
	var rootB = this.find(b);
	if(rootA != rootB) {
		if(this.rank[rootA] > this.rank[rootB]){
			this.parent[rootB] = rootA;
			return this.dataSize[rootA] += this.dataSize[rootB];
		}
		else {
			this.parent[rootA] = rootB;
			if(this.rank[rootA] === this.rank[rootB])
				this.rank[rootB]++;
			return this.dataSize[rootB] += this.dataSize[rootA];
		}
	} else {
		return this.dataSize[rootA];
	}
}


process.stdin.setEncoding('utf8');
var all = "";
process.stdin.on('readable', function() {  
  var data = process.stdin.read();  
  if(data !== null) { 
    all += data;
  }
});

process.stdin.on('end', function() {
  all = all.split('\n');
  var n = Number(all[0].split(' ')[0]);
  var m = Number(all[0].split(' ')[1]);
  var dataSize = all[1].split(' ').map(function(num) {return Number(num)});
  var max = Math.max.apply(null, dataSize);
  var disjoinSet = new DisjoinSet(n, dataSize);
  var i = 2;
  while(m--) {
  	var a = Number(all[i].split(' ')[0]);
  	var b = Number(all[i++].split(' ')[1]);
  	console.log(max = Math.max(max, disjoinSet.union(a-1,b-1)));
  }
  process.exit();
})