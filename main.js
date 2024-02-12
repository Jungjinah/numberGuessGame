//랜덤번호 지정
//user가 번호를 입력 -> go 라는 버튼을 누름
//만약 user가 랜덤번호를 맞추면, 맞췄습니다!
//랜덤번호 < user 번호, Down!
//랜덤번호 > user 번호, Up!
//Reset 버튼을 누르면 게임이 리셋
//5번의 기회를 다 쓰면 게임이 끝남 (더 이상 추측 불가, 버튼 disable)
//user가 1~100 범위 밖의 숫자를 입력하면 알려줌. 기회를 깎지 않음
//user가 이미 입력한 숫자를 또 입력하면 알려줌. 기회를 깎지 않음

let computerNum = 0;
//document(웹페이지) 안에 id로 선택해서 가져옴 
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history = [];

//버튼을 클릭했을때, 실행할 함수 (play() <- 이렇게 쓰면 함수를 바로 실행하는 것임)
// 그래서 play() 가 아닌 play 라고 써야함 (함수를 매개변수로 전달한다고 생각)
playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);

function pickRandomNum() {
    //랜덤번호 지정
    computerNum = Math.floor(Math.random()*100) + 1;
}

function play() {
    //user가 번호를 입력 (go 버튼 기능)
    let userValue = userInput.value;

    if(userValue < 1 || userValue > 100) {
        resultArea.textContent = "1과 100 사이 숫자를 입력하시오"
        return;
    }

    if(history.includes(userValue)) {
        resultArea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력하십시오"
        return;
    }

    chances -- ;
    chanceArea.textContent = `남은기회 : ${chances}번`;

    if(userValue < computerNum) {
        resultArea.textContent = "Up Up!";

    } else if (userValue > computerNum) {
        resultArea.textContent = "Down Down!";

    } else {
        resultArea.textContent = "정답!!";
        gameOver = true;
    }

    history.push(userValue);

    if(chances < 1) {
        gameOver = true;
    }

    if(gameOver == true) {
        playButton.disabled = true;
    }

    userInput.value = "";
 }

//엔터키 누를 때
function enterKey(e) {
    if(e.key == "Enter") {
        play();
    }
}

//숫자 길이 두자리 수 제한
function numberMaxLength(e) {
    if(e.value.length > e.maxLength) {
        e.value = e.value.slice(0, e.maxLength);
    }
}

//리셋버튼
function reset() {
    //user input이 reset
    userInput.value = "";
    //새로운번호가 생성
    pickRandomNum();
    chanceArea.textContent = `남은기회 : 5번`;
    resultArea.textContent = "결과는??";
}

pickRandomNum();


