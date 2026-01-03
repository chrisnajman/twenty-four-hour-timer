---
permalink: /index.html
---

[Website (Git Pages)](https://chrisnajman.github.io/twenty-four-hour-timer)

# 24 Hour Timer

## Description

- Add a time in hours/minutes/seconds and launch a countdown timer.
- - Browser error messages appear if values entered are outside of the range, i.e.
- - - Hours: 0-23
- - - Minutes: 0-59
- - - Seconds: 0-59
- - A custom error message is displayed if the input is zero.
- When the time has elapsed, the message "Time's up!" is displayed, and an audio alarm starts to play.
- Clicking the 'Close' button or the modal background, at any time, closes the timer and reloads the page.

> [!NOTE]
> Update 03/01/26: The `document.title` (`<title>`) now updates dynamically (so you can see the countdown even if you're on another tab).

This is an extension of my _Minute Timer_:

- [GitHub repository](https://github.com/chrisnajman/minute-timer)
- [Git Pages](https://chrisnajman.github.io/minute-timer)

## HTML

- `template` used for timer.

## Javascript

- ES6 (no transpilation to ES5)

## CSS

- `grid` used for page layout.
- `flexbox` used for page elements.
- Responsive.

## Testing

- Tested on:
  - Windows 10
    - Chrome
    - Firefox
    - Microsoft Edge

## Acknowledgements

- `setMultipleAttributes` function by [Migel Hewage Nimesha](https://www.delftstack.com/howto/javascript/set-multiple-attributes-to-an-element-using-javascript/)
