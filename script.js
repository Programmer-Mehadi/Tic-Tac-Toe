const restartBtn = document.getElementById("restart_btn");
const clearBtn = document.getElementById("clear_btn");
const hoursField = document.getElementById("hours");
const minutesField = document.getElementById("minutes");
const secondsField = document.getElementById("seconds");

let time = 0;

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
}
restartBtn.addEventListener("click", function () {
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
  clearInterval(timeTravel);
  reset();
});
