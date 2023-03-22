const restartBtn = document.getElementById("restart_btn");
const clearBtn = document.getElementById("clear_btn");
const hoursField = document.getElementById("hours");
const minutesField = document.getElementById("minutes");
const secondsField = document.getElementById("seconds");
const boxList = document.getElementsByClassName("box");
const body = document.getElementsByTagName("body")[0];
const resultDiv = document.getElementById("result");
const resultTitle = document.getElementById("result_title");
let time = 0;
let result = "";
let boxValue = ["0", "0", "0", "0", "0", "0", "0", "0", "0"];
const setTime = (time) => {
  let hours = Math.floor(time / 60 / 60);
  let minutes = Math.floor((time - hours * 60) / 60);
  let seconds = time - hours * 60 - minutes * 60;
  hoursField.innerText = hours;
  minutesField.innerText = minutes;
  secondsField.innerText = seconds;
};

function reset(state) {
  hoursField.innerText = 0;
  minutesField.innerText = 0;
  secondsField.innerText = 0;
  time = -1;
  for (let i = 0; i < boxList.length; i++) {
    if (state === "restart") {
      boxList[i].style.display = "flex";
    }
    boxList[i].classList.remove("not-allowed");
  }
  boxValue = ["0", "0", "0", "0", "0", "0", "0", "0", "0"];
  result = "";
  resultDiv.style.display = "none";
}
restartBtn.addEventListener("click", function () {
  for (let i = 0; i < boxList.length; i++) {
    boxList[i].style.display = "flex";
    boxList[i].style.color = "white";
    boxList[i].style.backgroundColor = "white";
    boxList[i].innerText = "X";
  }
  reset("restart");
  timeTravel = setInterval(() => {
    time += 1;
    setTime(time);
  }, 1000);
});
clearBtn.addEventListener("click", function () {
  for (let i = 0; i < boxList.length; i++) {
    boxList[i].style.display = "none";
  }
  clearInterval(timeTravel);
  reset("clear");
});

const endGame = (one, two, three) => {
  for (let index = 0; index < boxList.length; index++) {
    const element = boxList[index];
    element.classList.add("not-allowed");
    element.style.cursor = "not-allowed";
    if (index === one || index === two || index === three) {
      if (result === "X") {
        element.style.backgroundColor = "#19a7ce";
        element.style.color = "white";
      } else if (result === "O") {
        element.style.backgroundColor = "#7149c6";
        element.style.color = "white";
      }
    }
  }
  time = -1;
  resultDiv.style.display = "flex";
  resultTitle.innerText = result === "X" ? "You Win!" : "Your opponent won!";
  clearInterval(timeTravel);
};
const checkWin = () => {
  if (
    boxValue[0] == boxValue[1] &&
    boxValue[1] == boxValue[2] &&
    boxValue[0] != "0"
  ) {
    result = boxValue[0];
    endGame(0, 1, 2);
  } else if (
    boxValue[0] == boxValue[3] &&
    boxValue[3] == boxValue[6] &&
    boxValue[0] != "0"
  ) {
    result = boxValue[0];
    endGame(0, 3, 6);
  } else if (
    boxValue[0] == boxValue[4] &&
    boxValue[4] == boxValue[8] &&
    boxValue[0] != "0"
  ) {
    result = boxValue[0];
    endGame(0, 4, 8);
  } else if (
    boxValue[1] == boxValue[4] &&
    boxValue[4] == boxValue[7] &&
    boxValue[1] != "0"
  ) {
    result = boxValue[1];
    endGame(1, 4, 7);
  } else if (
    boxValue[2] == boxValue[4] &&
    boxValue[4] == boxValue[6] &&
    boxValue[2] != "0"
  ) {
    result = boxValue[2];
    endGame(2, 4, 6);
  } else if (
    boxValue[2] == boxValue[5] &&
    boxValue[5] == boxValue[8] &&
    boxValue[2] != "0"
  ) {
    result = boxValue[2];
    endGame(2, 5, 8);
  } else if (
    boxValue[3] == boxValue[4] &&
    boxValue[4] == boxValue[5] &&
    boxValue[3] != "0"
  ) {
    result = boxValue[3];
    endGame(3, 4, 5);
  } else if (
    boxValue[6] == boxValue[7] &&
    boxValue[7] == boxValue[8] &&
    boxValue[6] != "0"
  ) {
    result = boxValue[6];
    endGame(6, 7, 8);
  } else {
  }
};

for (let i = 0; i < boxList.length; i++) {
  boxList[i].addEventListener("click", function () {
    if (boxValue[i] === "0" && result === "") {
      boxList[i].innerText = "X";
      boxList[i].classList.add("not-allowed");
      boxList[i].style.color = "#19a7ce";
      boxValue[i] = "X";
      checkWin();
      if (result === "") {
        const give = computerMakeGoal();
        if (give === false) {
          opponentPlay(i);
        }
        checkWin();
        if (boxValue.filter((value) => value === "0").length === 0) {
          resultDiv.style.display = "flex";
          resultTitle.innerText = "Match Draw!";
        }
      }
    }
  });
}

function getRandomItem(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  const item = arr[randomIndex];
  const findEmpty = boxValue.find((value) => value == "0");
  if (findEmpty == undefined) {
    return -1;
  }
  return item;
}
const array = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const opponentPlay = (i) => {
  // 0
  if (i == 0) {
    if (protectGoal(1, 2) == "yes") {
      return;
    }
    if (protectGoal(2, 1) == "yes") {
      return;
    }
    if (protectGoal(3, 6) == "yes") {
      return;
    }
    if (protectGoal(6, 3) == "yes") {
      return;
    }
    if (protectGoal(4, 8) == "yes") {
      return;
    }
    if (protectGoal(8, 4) == "yes") {
      return;
    }
    randomSelect(i);
  }
  //   1
  if (i == 1) {
    if (protectGoal(0, 2) == "yes") {
      return;
    }
    if (protectGoal(2, 0) == "yes") {
      return;
    }
    if (protectGoal(4, 7) == "yes") {
      return;
    }
    if (protectGoal(7, 4) == "yes") {
      return;
    }
    randomSelect(i);
  }
  //   2
  if (i == 2) {
    if (protectGoal(1, 0) == "yes") {
      return;
    }
    if (protectGoal(0, 1) == "yes") {
      return;
    }
    if (protectGoal(5, 8) == "yes") {
      return;
    }
    if (protectGoal(8, 5) == "yes") {
      return;
    }
    if (protectGoal(4, 6) == "yes") {
      return;
    }
    if (protectGoal(6, 4) == "yes") {
      return;
    }
    randomSelect(i);
  }
  //   3
  if (i == 3) {
    if (protectGoal(0, 6) == "yes") {
      return;
    }
    if (protectGoal(6, 0) == "yes") {
      return;
    }
    if (protectGoal(4, 5) == "yes") {
      return;
    }
    if (protectGoal(5, 4) == "yes") {
      return;
    }
    randomSelect(i);
  }
  //   4
  if (i == 4) {
    if (protectGoal(0, 8) == "yes") {
      return;
    }
    if (protectGoal(8, 0) == "yes") {
      return;
    }
    if (protectGoal(2, 6) == "yes") {
      return;
    }
    if (protectGoal(6, 2) == "yes") {
      return;
    }
    if (protectGoal(1, 7) == "yes") {
      return;
    }
    if (protectGoal(7, 1) == "yes") {
      return;
    }
    if (protectGoal(3, 5) == "yes") {
      return;
    }
    if (protectGoal(5, 3) == "yes") {
      return;
    }
    randomSelect(i);
  }
  //   5
  if (i == 5) {
    if (protectGoal(2, 8) == "yes") {
      return;
    }
    if (protectGoal(8, 2) == "yes") {
      return;
    }
    if (protectGoal(3, 4) == "yes") {
      return;
    }
    if (protectGoal(4, 3) == "yes") {
      return;
    }
    randomSelect(i);
  }
  //   6
  if (i == 6) {
    if (protectGoal(0, 3) == "yes") {
      return;
    }
    if (protectGoal(3, 0) == "yes") {
      return;
    }
    if (protectGoal(7, 8) == "yes") {
      return;
    }
    if (protectGoal(8, 7) == "yes") {
      return;
    }
    if (protectGoal(4, 2) == "yes") {
      return;
    }
    if (protectGoal(2, 4) == "yes") {
      return;
    }
    randomSelect(i);
  }
  //   7
  if (i == 7) {
    if (protectGoal(6, 8) == "yes") {
      return;
    }
    if (protectGoal(4, 1) == "yes") {
      return;
    }
    if (protectGoal(8, 6) == "yes") {
      return;
    }
    if (protectGoal(1, 4) == "yes") {
      return;
    }
    randomSelect(i);
  }
  //   8
  if (i == 8) {
    if (protectGoal(0, 4) == "yes") {
      return;
    }
    if (protectGoal(4, 0) == "yes") {
      return;
    }
    if (protectGoal(6, 7) == "yes") {
      return;
    }
    if (protectGoal(7, 6) == "yes") {
      return;
    }
    if (protectGoal(2, 5) == "yes") {
      return;
    }
    if (protectGoal(5, 2) == "yes") {
      return;
    }
    randomSelect(i);
  }
};

const protectGoal = (first, second) => {
  if (boxValue[first] === "X") {
    if (boxValue[second] === "0") {
      boxValue[second] = "O";
      boxList[second].innerText = "O";
      boxList[second].classList.add("not-allowed");
      boxList[second].style.color = "#7149c6";
      checkWin();
      return "yes";
    }
  }
  return "no";
};

const randomSelect = (i) => {
  let j = 0;
  while (j < 1000) {
    let randomIndex = getRandomItem(array);
    if (randomIndex === -1) {
      clearInterval(timeTravel);
      return;
    } else if (boxValue[randomIndex] === "0" && result === "") {
      boxValue[randomIndex] = "O";
      boxList[randomIndex].innerText = "O";
      boxList[randomIndex].classList.add("not-allowed");
      boxList[randomIndex].style.color = "#7149c6";
      return;
    }
  }
};
const computerMakeGoal = () => {
  const checkList = [
    { data: [0, 1, 2] },
    { data: [0, 3, 6] },
    { data: [0, 4, 8] },
    { data: [1, 4, 7] },
    { data: [2, 4, 6] },
    { data: [2, 5, 8] },
    { data: [3, 4, 5] },
    { data: [6, 7, 8] },
  ];
  for (let index = 0; index < checkList.length; index++) {
    const element = checkList[index];
    if (checkComputerCanMakeGoal(element?.data) === true) {
      return true;
    }
  }
  return false;
};

const checkComputerCanMakeGoal = (pArray) => {
  const valueArray = [
    boxValue[pArray[0]],
    boxValue[pArray[1]],
    boxValue[pArray[2]],
  ];
  const foundComputerSymbol = valueArray.filter((value) => value === "O");
  const foundEmptySymbol = valueArray.filter((value) => value === "0");

  if (foundComputerSymbol.length === 2 && foundEmptySymbol.length === 1) {
    let index = pArray[valueArray.indexOf("0")];
    boxValue[index] = "O";
    boxList[index].innerText = "O";
    boxList[index].classList.add("not-allowed");
    boxList[index].style.color = "#7149c6";
    return true;
  }

  return false;
};
