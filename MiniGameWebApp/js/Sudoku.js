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
        alert('정답입니다!');
    }
    else {
        alert('다시 해보세요');
    }
}

document.getElementById('form').addEventListener('submit',function(e) {
    e.preventDefault();
    checkAnswer();
}
);