const secondsHand = document.querySelector(".second-hand");
const minutesHand = document.querySelector(".min-hand");
const hoursHand = document.querySelector(".hour-hand");

function setTime() {
  const DEGREES_IN_CIRCLE = 360;
  const SECONDS_IN_CLOCK = 60;
  const MINUTES_IN_CLOCK = 60;
  const HOURS_IN_CLOCK = 12;
  const degreesPerSecond = DEGREES_IN_CIRCLE / SECONDS_IN_CLOCK; // 6
  const degreesPerMinute = DEGREES_IN_CIRCLE / MINUTES_IN_CLOCK; // 6
  const degreesPerHour = DEGREES_IN_CIRCLE / HOURS_IN_CLOCK; // 30

  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();
  const offset = 90; // Rotates 90º clockwise.

  // Converting the seconds into degrees
  const secondsDegrees = seconds * degreesPerSecond;
  const minutesDegrees = minutes * degreesPerMinute;
  const hoursDegrees = hours * degreesPerHour;

  // Configures the rotation of each hand
  secondsHand.style.transform = `rotate(${secondsDegrees + offset}deg)`;

  // Increments the minutesHand on each full loop of the secondsHand
  minutesHand.style.transform = `rotate(${
    minutesDegrees + (seconds * degreesPerMinute) / SECONDS_IN_CLOCK + offset
  }deg)`;
  // Increments the hoursHand on each full loop of the minutesHand
  hoursHand.style.transform = `rotate(${
    hoursDegrees + (minutes * degreesPerHour) / MINUTES_IN_CLOCK + offset
  }deg)`;
}

setInterval(setTime, 1000);
