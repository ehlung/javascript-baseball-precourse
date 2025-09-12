/* 기능 구현 1. 사용자 입력 처리 & 잘못된 값 입력 판별 기능
  - 규칙 : 길이 3, 각 자리 1~9 숫자, 중복 안됨
  - 잘못된 입력이면 alert 띄우기
*/

export default function BaseballGame() {
  this.play = function (computerInputNumbers, userInputNumbers) {
    const computerInput = String(computerInputNumbers);
    const userInput = String(userInputNumbers);

    if (!isValidInput(userInput)) {
      window.alert("올바르지 않은 입력입니다.");
      return "";
    }
    const { ball, strike } = judgeCorrect(computerInput, userInput);
    return resultJudge(ball, strike);
  };
}

// 유저가 입력한 값이 유효한지 검사하는 함수
function isValidInput(userInput) {
  // 1) 길이가 3이 아니면 false
  if (userInput.length !== 3) return false;

  // 2) 각 자리 숫자가 1~9인지 검사
  const first = userInput[0],
    second = userInput[1],
    third = userInput[2];
  if (first < "1" || first > "9") return false;
  if (second < "1" || second > "9") return false;
  if (third < "1" || third > "9") return false;

  // 3) 중복 확인
  if (first === second) return false;
  if (first === third) return false;
  if (second === third) return false;

  return true;
}

/* 기능 구현 2. 볼/스트라이크 판정 기능 추가
  - 규칙 : 같은 수가 같은 자리 > 스트라이크 / 다른 자리 > 볼 / 전혀 없으면 > 낫싱
*/

function judgeCorrect(computerInput, userInput) {
  let ball = 0;
  let strike = 0;

  for (let i = 0; i < 3; i++) {
    // 같은 수가 같은 자리에 있을 경우
    if (userInput[i] === computerInput[i]) {
      strike += 1;
    }
    // 같은 수가 다른 자리에 있을 경우
    else if (includesChar(computerInput, userInput[i])) {
      ball += 1;
    }
  }
  return { ball, strike };
}

function includesChar(str, ch) {
  for (let i = 0; i < str.length; i += 1) {
    if (str[i] === ch) return true;
  }
  return false;
}

/* 기능 구현 3. 판정 결과 문자열 출력 기능
    - 낫싱/볼/스트라이크/볼+스트라이크
    - 볼과 스트라이크 동시에 나오면 볼이 먼저
*/

function resultJudge(ball, strike) {
  if (ball === 0 && strike === 0) {
    return "낫싱";
  } else if (ball > 0 && strike > 0) {
    return `${ball}볼 ${strike}스트라이크`;
  } else if (ball > 0) {
    return `${ball}볼`;
  } else {
    return `${strike}스트라이크`;
  }
}
