function parent(i) {return Math.floor((i - 1) / 2)};
function leftChild(i) {return i*2 + 1;};
function rightChild(i) {return i*2 + 2};

function makeHeap(n, array) {
  var results = '';
  var operations = 0;
  function shiftDown(index) {
    var left, right, minChild;
    while(true) {
      minChild = index;
      left = leftChild(index);
      right = rightChild(index);
      if(left < n && array[left] < array[minChild])
        minChild = left;
      if(right < n && array[right] < array[minChild]) 
        minChild = right;
      if(minChild != index) {
        results += index + ' ' + minChild + '\n';
        operations++;
        array[index] = [array[minChild], array[minChild] = array[index]][0];
        index = minChild;
      } else {
        break;
      }
    }
    
  }
  var limit = Math.floor(n/2);
  for (var i = limit; i >= 0; i--) {
    shiftDown(i);
  }
  process.stdout.write(operations + '\n' + results);
}

var readline = require('readline')
var rl = readline.createInterface({
      input: process.stdin,
      terminal: false});

rl.on('line', readLine);

var n = -1
var array = []
var lines = 0;

rl.on('close', function() {
  makeHeap(n, array);
  process.exit();
})

function readLine(line) {
  if(line != null) {
    if(++lines == 1){
      n = parseInt(line.toString());
    } else if(lines == 2) {
      array = line.toString().split(' ').map(function(num) {return parseInt(num)});
    }  
  }
  
}


