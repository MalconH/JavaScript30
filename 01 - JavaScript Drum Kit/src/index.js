let throttle = false;

function playAudio(audioElement) {
  audioElement.currentTime = 0;
  audioElement.play();
}

function showAnimation(targetElement) {
  targetElement.classList.add("playing");
}

function removeAnimation(e) {
  // Fix against multiple transitionend fired
  if (e.propertyName !== "transform") return;

  e.target.classList.remove("playing");
}

function handlePressedKey(event) {
  // If the throttle is true stop the execution
  if (throttle) return;

  const keyCode = event.keyCode;
  const $key = document.querySelector(`.key[data-key="${keyCode}"]`);
  const $audio = document.querySelector(`audio[data-key="${keyCode}"]`);

  // End execution if pressed key is not valid
  if (!$audio) return;

  playAudio($audio);
  showAnimation($key);

  // Prevents the user from keeping the key pressed down breaking the animation
  throttle = setTimeout(() => {
    throttle = false;
  }, 300);
}

window.addEventListener("keydown", handlePressedKey);
window.addEventListener("keyup", () => {
  clearTimeout(throttle);
  throttle = false;
});
document.querySelector(".keys").addEventListener("transitionend", removeAnimation);
