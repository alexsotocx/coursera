var Node = function(value) {
  this.next = null;
  this.previus = null;
  this.value = value;
}

var Deque = function() {
  this.first = null;
  this.last = null;
  this.size = 0;
}

Deque.prototype.append = function(value) {
  var node = new Node(value);
  if(!this.first)
    this.first = node;
  if(this.last){
    this.last.next = node;
    node.previus = this.last;
  }
  this.last = node;
  this.size++;
}

Deque.prototype.appendLeft = function(value) {
  var node = new Node(value);
  if(this.first){
    this.first.previus = node;
    node.next = this.first;
  }
  this.first = node;
  if(this.last)
    this.last.next = node;
  this.size++;
};

Deque.prototype.front = function() {
  if(this.first) 
    return this.first.value;
  throw new Error("No a valid operation");
};

Deque.prototype.back = function() {
  if(this.last) 
    return this.last.value;
  throw new Error("No a valid operation");
}

Deque.prototype.pop = function() {
  if(this.last) {
    var node = this.last;
    this.last = node.previus;
    if(this.last)
      this.last.next = null;
    else 
      this.first = null;
    this.size--;
    return node.value;
  }
  throw new Error("No a valid operation");
}

Deque.prototype.popLeft = function() {
  if(this.first) {
    var node = this.first;
    this.first = node.next;
    if(this.first)
      this.first.previus = null;
    else 
      this.last = null;
    this.size--;
    return node.value;
  }
  throw new Error("No a valid operation");
}


function solve(data) {
  var deque = new Deque();
  data = data.toString();
  var closers = {")": "(", "}" : "{", "]":"["} 
  for(var i = 0; i < data.length; i++) {
    var x = data[i];
    if ("[{()}]".indexOf(x) == -1) 
      continue;
    if(("[{(".indexOf(x) != -1)) {
      deque.append({char: x, pos: (i + 1)});
    } else {
      if(deque.size == 0) {

        return (i+1);
      }
      else {
        var closer = closers[x];
        if(closer != deque.back().char) {

          return (i + 1);
          return;
        } else {
          deque.pop();
        }
      }
    }
  }
  if(deque.size == 0)
    return "Success";
  else
    return deque.front().pos;
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
  console.log(solve(all));
  process.exit();
})