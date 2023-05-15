var curCell = document.getElementById('cell_1');
curCell.focus();

document.addEventListener('keydown', function(e) {
  var keyCode = e.keyCode;
  var cellNumber = parseInt(curCell.id.split("_")[1]);
  var row = Math.floor((cellNumber - 1) / 9);
  var col = (cellNumber - 1) % 9;
  
  switch(keyCode) {
    case 37:
      col = col === 0 ? 8 : col - 1;
      break;
    case 38:
      row = row === 0 ? 8 : row - 1;
      break;
    case 39:
      col = col === 8 ? 0 : col + 1;
      break;
    case 40:
      row = row === 8 ? 0 : row + 1;
      break;
    default:
      return;
  }
  
  var nextCellNumber = row * 9 + col + 1;
  var nextCell = document.getElementById('cell_' + nextCellNumber);
  nextCell.focus();
  curCell = nextCell;
});


var sudokuBoard = [
    "1------45",
    "--45-17-2",
    "---2--9--",
    "-------58",
    "48--57--6",
    "-3---2---",
    "---67----",
    "-51-9-86-",
    "--6----3-"
];

var answer = [
    "128739645",
    "394561782",
    "567284913",
    "712946358",
    "489357126",
    "635812479",
    "843675291",
    "251493867",
    "976128534"
];

for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        var k = i * 9 + j + 1;
        var cell = document.getElementById('cell_' + k);
        if (sudokuBoard[i][j] !== '-') {
            cell.classList.add('board-input');
            cell.value = sudokuBoard[i][j];
        }
    }
}

function checkAnswer() {
    var cnt = 0;
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            var inputvalue = document.getElementById('cell_' + (i*9+j+1)).value;
            if (inputvalue !== answer[i][j]) {
                cnt++;
            } 
        }
    }
    if (cnt === 0) {
        window.alert('정답입니다!');
    }
    else {
        window.alert('틀렸습니다. 다시 해보세요');
    }
}

document.getElementById('form').addEventListener('submit',function(e) {
    e.preventDefault();
    checkAnswer();
}
);