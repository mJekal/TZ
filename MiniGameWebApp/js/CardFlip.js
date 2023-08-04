var IsClicked = [];

// TV 리모컨

function TVRemoteControl(event) {
    var focusedCard = document.querySelector('.card.focus');

    switch (event.keyCode) {
        case 13:
            if (focusedCard) {
                focusedCard.classList.toggle('flipped');
                IsClicked.push(focusedCard);
                if (IsClicked.length === 2) {
                    ClickCard();
                }
            }
            break;
        case 37: 
            if (focusedCard && focusedCard.previousElementSibling) {
                focusedCard.classList.remove('focus');
                focusedCard.previousElementSibling.classList.add('focus');
            }
            break;
        case 39:
            if (focusedCard && focusedCard.nextElementSibling) {
                focusedCard.classList.remove('focus');
                focusedCard.nextElementSibling.classList.add('focus');
            }
            break;
        default:
            break;
    }
}

// TV 포커스 
function TVFocusNavigation() {
    var cards = document.querySelectorAll('.card');

    cards.forEach(function (card, index) {
        card.addEventListener('click', function () {
            this.classList.toggle('flipped');
            IsClicked.push(this);
            this.focus();
            
            if (IsClicked.length === 2) {
                ClickCard();
            }
        });

        card.addEventListener('focus', function () {
            this.classList.add('focus');
        });

        card.addEventListener('blur', function () {
            this.classList.remove('focus');
        });

        if (index === 0) {
            card.classList.add('focus');
        }
    });
}

document.addEventListener('keydown', TVRemoteControl);

TVFocusNavigation();


// 게임 (웹에서도 동작)

var container = document.querySelector('#container');
var images = [];

// 이미지 배열에 이미지 넣기
for (var i = 1; i <= 10; i++) {
    images.push(i + '.png');
}

var IsShuffle = [];
var IsClicked = [];
var IsCompleted = [];

// 카드 이미지 섞기
function shuffling() {
    var temp = images.concat(images);
    for (var i = 0; temp.length > 0; i += 1) {
        var randomIndex = Math.floor(Math.random() * temp.length);
        IsShuffle = IsShuffle.concat(temp.splice(randomIndex, 1));
    }
}

// html div 태그 생성 (카드 생성)
function createCard(i) {
    var card = document.createElement('div');
    card.className = 'card';
    var cardInner = document.createElement('div');
    cardInner.className = 'card-inner';
    var cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    var cardBack = document.createElement('div');
    cardBack.className = 'card-back';

    var imgBack = document.createElement('img');
    imgBack.src = 'images/' + IsShuffle[i];
    cardBack.appendChild(imgBack);

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    return card;
}

// 카드 클릭하면 뒤집기
function ClickCard() {
    // 이미 뒤집힌 카드거나 방금 클릭한 카드면 못 뒤집게 
    if (IsCompleted.indexOf(this) !== -1 || IsClicked[0] === this) {
        return;
    }

    this.classList.toggle('flipped');
    IsClicked.push(this);

    // 카드 두개 뒤집혔는가?
    if (IsClicked.length !== 2) {
        return;
    }

    var firstImage = IsClicked[0].querySelector('.card-back img').src;
    var secondImage = IsClicked[1].querySelector('.card-back img').src;

    // 카드 두개 모양 같으면
    if (firstImage === secondImage) {
        IsCompleted.push(IsClicked[0]);
        IsCompleted.push(IsClicked[1]);
        IsClicked = [];

        // 성공했냐?
        if (IsCompleted.length !== 20) {
            return;
        }

        // 성공 알람
        setTimeout(function () {
            alert('성공');
            gameReset();
        }, 1000);

        return;
    }

    // 둘다 다시 뒤집기
    setTimeout(function () {
        IsClicked[0].classList.remove('flipped');
        IsClicked[1].classList.remove('flipped');
        IsClicked = [];
    }, 500);
}

function GameStart() {
    shuffling();

    for (var i = 0; i < 20; i += 1) {
        var card = createCard(i);
        card.addEventListener('click', ClickCard);
        container.appendChild(card);
    }

    document.querySelectorAll('.card').forEach(function (card) {
        setTimeout(function () {
            card.classList.add('flipped');
        }, 1000);
    });

    setTimeout(function () {
        document.querySelectorAll('.card').forEach(function (card) {
            card.classList.remove('flipped');
        });
    }, 5000);
}

GameStart();

// 리셋
function gameReset() {
    container.innerHTML = '';
    IsShuffle = [];
    IsCompleted = [];
    GameStart();
}

//index.html로 이동 (뒤로가기)
document.getElementById("GoBackHome").addEventListener("click", function() {
	// index.html로 이동 (뒤로가기)
	window.location.href = "index.html";
});
