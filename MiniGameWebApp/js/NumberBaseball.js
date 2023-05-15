var form = document.getElementById("form");
var input = document.getElementById("input");
var tdList = document.querySelectorAll("[id^='td']");
var tdScoreList = document.querySelectorAll("[id^='tscore']");
var result = document.getElementById("result");

var number;
var answer;
var answer_st;

var submitCount = 0;


/** 4자리 숫자 임의로 만들어주는 함수 (내가 맞춰야할 숫자) */

function makeAnswer(){
    number = [1,2,3,4,5,6,7,8,9];
    answer = [];
    for(var i = 0; i < 4; i++){
        var choice = number.splice(Math.floor(Math.random() * (9-i)),1);
        answer.push(choice[0]);
    }
}

// 게임 시작 : 스트라이크, 볼 초기화
function start(td, td_score) {
    var strike = 0;
    var ball = 0;
    td.innerHTML = input.value;

    // 정답과 제출한 숫자가 정확하게 일치 (홈런)
    if (input.value === answer_st) {
        td_score.textContent = "Home Run!";
        result.textContent = "성공하였습니다!";
        input.disabled = true;
        } else {
            for (var i = 0; i < 4 ; i++){
                // 숫자와 위치 둘다 일치 (strike) 
                if (Number(input.value[i]) === answer[i] ){
                    strike += 1;
                } // 숫자만 일치 (ball)
                else if (answer_st.indexOf(input.value[i])>-1) {
                        ball += 1;
                    }
            } 
            // 결과값 table에 표시
            td_score.textContent = "strike : " + strike + " ball : " + ball;
        }
    input.value="";
}


makeAnswer();
answer_st = answer.join('');


form.addEventListener('submit', function(e) {
    e.preventDefault();

    // 입력한 숫자가 4자리 수가 맞는지 확인
    if(input.value.length === 4) {
        start(tdList[submitCount],tdScoreList[submitCount]);
        submitCount ++; // 제출(기회) 횟수 count
    
    // 기회 9번 다 쓰면
    if (submitCount === 9){
        input.disabled = true;
        result.textContent = "실패하였습니다. 정답은 " + answer_st + " 입니다";
    }
        
    } 
    // 4자리 숫자가 아닐 때
    else {
        alert("숫자 4자리를 입력해 주세요");
    }
    
    }); 