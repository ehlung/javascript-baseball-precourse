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
    return "";
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
