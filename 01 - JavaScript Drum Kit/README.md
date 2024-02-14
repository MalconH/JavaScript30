# JavaScript Drum kit
The goal of this challenge is to create a functional drumkit that you can play by typing on the keyboard.

## 💭 Thoughts 
- Alright! The functionality itself was very simple to work with, just an eventListener that each time a key is pressed, an `<audio>` is played.

- There was a bug that needed to be fixed if the user kept pressing a key the animation will break. This was fixed by creating a `timeOut` on each keydown that will stop the function to execute if it's active.

- There were two ways to **play the audio**. By querying the `<audio>` element in the DOM and then playing it, or by creating an `HTMLAudioElement`, setting its source to the respective audio file, and then play it.

  I decided to go with the first choice because it 1. was simplier (the other way needed to create a function that received a `keyCode` and returned the sound filename, using a dictionary) and 2. it was Wes Bos' solution.

- The animation is removed the second it ended, through a `animationend` event listener. This will reduce flakiness since if we modify the animation duration nothing will break!

## 🤓☝🏻 What I learned
- Interacting with `Audio` elements.
- Discovered the `<kbd>` element! It is used to markup text that should be input by the user (via keyboard, voice input, or any kind of input).
- When calling `this` on a function scope, `this` will refer to element that the function was called on. E.g.
  ``` javascript
  function this() {
    return this;
  }

  console.log(obj.this()) // -> obj
  ```

## Installation
- Clone the repository.
- Open `index.html` in your browser.
- Have fun!

Thanks for reading 👋🏻
