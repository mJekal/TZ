var form = document.getElementById("form");
var input = document.getElementById("input");
var tdList = document.querySelectorAll("[id^='td']");
var tdScoreList = document.querySelectorAll("[id^='tscore']");
var result = document.getElementById("result");

// 리모컨 버튼 눌렀을 때
document.addEventListener('keydown', function(e) {
	switch (e.keyCode) {
	// 왼쪽 버튼은 돌아가기 버튼에 포커스
	case 37:
		e.preventDefault();
		document.getElementById("GoBackHome").focus();
		break;
	// 상하우 버튼 누르면 입력 form에 포커스
	case 38:
	case 39:
	case 40:
		document.getElementById("input").focus();
		break;
	// enter 값 누르면 숫자 제출
	case 13:
		if (document.activeElement.id === "GoBackHome") {
			document.getElementById("GoBackHome").click(); // 돌아가기 버튼 클릭
		} else {
			document.getElementById("form").dispatchEvent(new Event("submit"));
		}
		break;
	// 키보드 숫자에 맞게 입력 폼에 해당 숫자 입력
	case 48:
	case 49:
	case 50:
	case 51:
	case 52:
	case 53:
	case 54:
	case 55:
	case 56:
	case 57:
		var number = e.keyCode - 48;
		document.getElementById("input").value += number;
		break;
	}
});

var number;
var answer;
var answer_st;

var submitCount = 0;

/** 4자리 숫자 임의로 만들어주는 함수 (내가 맞춰야할 숫자) */

function makeAnswer() {
	number = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
	answer = [];
	for (var i = 0; i < 4; i++) {
		var choice = number.splice(Math.floor(Math.random() * (9 - i)), 1);
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
		for (var i = 0; i < 4; i++) {
			// 숫자와 위치 둘다 일치 (strike)
			if (Number(input.value[i]) === answer[i]) {
				strike += 1;
			} // 숫자만 일치 (ball)
			else if (answer_st.indexOf(input.value[i]) > -1) {
				ball += 1;
			}
		}
		// 결과값 table에 표시
		td_score.textContent = "strike : " + strike + " ball : " + ball;
	}
	input.value = "";
}

makeAnswer();
answer_st = answer.join('');

form.addEventListener('submit', function(e) {
	e.preventDefault();

	// 입력한 숫자가 4자리 수가 맞는지 확인
	if (input.value.length === 4) {
		start(tdList[submitCount], tdScoreList[submitCount]);
		submitCount++; // 제출(기회) 횟수 count

		// 기회 9번 다 쓰면
		if (submitCount === 9) {
			input.disabled = true;
			result.textContent = "실패하였습니다. 정답은 " + answer_st + " 입니다";
		}

	}
	// 4자리 숫자가 아닐 때
	else {
		alert("숫자 4자리를 입력해 주세요");
	}

});

// index.html로 이동 (뒤로가기)
document.getElementById("GoBackHome").addEventListener("click", function() {
	// index.html로 이동 (뒤로가기)
	window.location.href = "index.html";
});
