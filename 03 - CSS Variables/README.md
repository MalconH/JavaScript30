# Playing with CSS Variables and JavaScript

## 💭 Thoughts

Hey hey! This was easier than the clock one. Or simpler.
Basically, the app needs to listen on each change on any input. In the Wes' video, he listens for `change` and `mousemove`.
This could be imitated with `input` event which is basically what we need, so I used that instead.

After that, I just need to collect the input's current value and its name (to have a reference for the variable that's changing) and apply that to the body.

## 💡 Additions of my own

Since this project was pretty simple, I decided to spicy it up a little bit, nothing too complicated. The input's value and its associated variable is stored in the localStorage on each update, so the state of the inputs and their effects remains intact if we close or reload the tab.

## 🤓☝🏻 What I learned

- To interact with the DOM using CSS variables.

## Demo

(Sorry my friend, still haven't added the link)
