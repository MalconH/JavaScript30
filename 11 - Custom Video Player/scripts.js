let isPlaying = false;
let isHoldingClick = false;

const $video = document.querySelector("video.viewer");
const $volume = document.querySelector("#volume");
const $playbackRate = document.querySelector("#playbackRate");
const $playButton = document.querySelector(".toggle");
const $watchedBar = document.querySelector(".progress__filled");
const $progressBar = document.querySelector(".progress");

$video.addEventListener("timeupdate", handleTimeUpdate);
$volume.addEventListener("input", changeVolume);
$playbackRate.addEventListener("input", changePlaybackRate);
$playButton.addEventListener("click", togglePlay);
$progressBar.addEventListener("mousedown", (e) => {
  isHoldingClick = true;
  changeProgress(e);
});
$progressBar.addEventListener("mousemove", changeProgress);
window.addEventListener("mouseup", () => {
  isHoldingClick = false;
});
$progressBar.addEventListener("mouseleave", () => {
  isHoldingClick = false;
});

function changeProgress(e) {
  if (!isHoldingClick) return;

  // fullWidth - video.duration
  // px - x
  // x = px * duracionTotal / fullwidth
  // const videoDuration = $video.duration;
  // const progressBarLength = $progressBar.offsetWidth;
  const progress = (e.offsetX * $video.duration) / $progressBar.offsetWidth;
  $watchedBar.style.flexBasis = `${e.offsetX}px`;
  $video.currentTime = progress;
}

function togglePlay(e) {
  // Play -> pause and viceversa
  isPlaying = !isPlaying;

  if (isPlaying) {
    $video.play();
    e.target.textContent = "❚❚";
  }

  if (!isPlaying) {
    $video.pause();
    e.target.textContent = "▶";
  }
}

function changeVolume(e) {
  const volume = Number(e.target.value);
  $video.volume = volume;
}

function changePlaybackRate(e) {
  const playbackRate = Number(e.target.value);
  $video.playbackRate = playbackRate;
}

function handleTimeUpdate() {
  // Obtain the % of video reproduced
  // const progressPercentage = ($video.currentTime / $video.duration) * 100 || 0;
  const secondsToPx = $progressBar.offsetWidth / $video.duration;
  const progress = $video.currentTime * secondsToPx;
  // Applying it to progressBar
  // $watchedBar.style.flexBasis = `${progressPercentage}%`;
  $watchedBar.style.flexBasis = `${progress}px`;
}
