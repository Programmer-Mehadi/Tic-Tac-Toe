const restartBtn = document.getElementById("restart_btn");
const clearBtn = document.getElementById("clear_btn");
const hoursField = document.getElementById("hours");
const minutesField = document.getElementById("minutes");
const secondsField = document.getElementById("seconds");
const boxList = document.getElementsByClassName("box");
const body = document.getElementsByTagName("body")[0];
let time = 0;
let boxValue = ["0", "0", "0", " 0", "0", "0", "0", "0", "0"];
const setTime = (time) => {
  let hours = Math.floor(time / 60 / 60);
  let minutes = Math.floor((time - hours * 60) / 60);
  let seconds = time - hours * 60 - minutes * 60;
  hoursField.innerText = hours;
  minutesField.innerText = minutes;
  secondsField.innerText = seconds;
};

function reset() {
  hoursField.innerText = 0;
  minutesField.innerText = 0;
  secondsField.innerText = 0;
  time = 0;
  for (let i = 0; i < boxList.length; i++) {
    boxList[i].innerText = "";
    boxList[i].classList.remove("not-allowed");
  }
  boxValue = ["0", "0", "0", "0", "0", "0", "0", "0", "0"];
}
restartBtn.addEventListener("click", function () {
  for (let i = 0; i < boxList.length; i++) {
    boxList[i].style.display = "flex";
  }
  if (time > 0) {
    reset();
  } else {
    timeTravel = setInterval(() => {
      time += 1;
      setTime(time);
    }, 1000);
  }
});
clearBtn.addEventListener("click", function () {
  for (let i = 0; i < boxList.length; i++) {
    boxList[i].style.display = "none";
  }
  clearInterval(timeTravel);
  reset();
});

for (let i = 0; i < boxList.length; i++) {
  boxList[i].addEventListener("click", function () {
    if (boxList[i].innerText === "") {
      //   body.style.pointerEvents = "none";
      boxList[i].innerText = "X";
      boxList[i].classList.add("not-allowed");
      boxValue[i] = "X";
      opponentPlay(i);
      //   body.style.pointerEvents = "auto";

      if (
        (boxValue[0] === boxValue[1]) == (boxValue[1] === boxValue[2]) ||
        (boxValue[0] === boxValue[3]) == (boxValue[3] === boxValue[6]) ||
        (boxValue[0] === boxValue[4]) == (boxValue[4] === boxValue[8]) ||
        (boxValue[1] === boxValue[4]) == (boxValue[4] === boxValue[7]) ||
        (boxValue[2] === boxValue[4]) == (boxValue[4] === boxValue[6]) ||
        (boxValue[2] === boxValue[5]) == (boxValue[5] === boxValue[8]) ||
        (boxValue[3] === boxValue[4]) == (boxValue[4] === boxValue[5]) ||
        (boxValue[6] === boxValue[7]) == (boxValue[7] === boxValue[8])
      ) {
        console.log("win");
      } else {
        console.log("wait");
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
    if (boxValue[second] == "0") {
      boxValue[second] = "O";
      boxList[second].innerText = "O";
      boxList[second].classList.add("not-allowed");
      return "yes";
    }
  }
};

const randomSelect = (i) => {
  let j = 0;
  while (j < 1000) {
    let result = getRandomItem(array);
    if (result === -1) {
      clearInterval(timeTravel);
      return;
    } else if (boxValue[result] === "0") {
      boxValue[result] = "O";
      boxList[result].innerText = "O";
      boxList[result].classList.add("not-allowed");
      return;
    }
  }
};
