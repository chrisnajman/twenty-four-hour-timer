export default function twentyFourHourTimer() {
  // Form
  const timeForm = document.getElementById("time-form")
  const timeFormElements = document.getElementById("time-form-elements")
  const hours = document.getElementById("hours")
  const minutes = document.getElementById("minutes")
  const seconds = document.getElementById("seconds")
  const warning = document.createElement("p")
  warning.classList.add("warning")

  // Template
  const template = document.getElementById("timer-template")
  const templateClone = template.content.cloneNode(true)
  //- Modal
  const modal = templateClone.querySelector("#modal")
  const overlay = templateClone.querySelector("#overlay")
  const btnModalClose = templateClone.querySelector("#close-modal-btn")
  //--- Timer
  const timerMessage = templateClone.querySelector("#timer-message")
  const timerHours = templateClone.querySelector("[data-timer-hours]")
  const timerMinutes = templateClone.querySelector("[data-timer-minutes]")
  const timerSeconds = templateClone.querySelector("[data-timer-seconds]")

  //--- Audio
  const audio = templateClone.querySelector("#audio")
  const sourceOgg = document.createElement("source")
  const sourceMp3 = document.createElement("source")
  const audioFormat = ["ogg", "mp3", "wav"]
  const audioMediaType = ["audio/ogg", "audio/mpeg", "audio/wav"]
  const audioFileName = "countdown"

  // Make totalSeconds available to both functions
  let totalSeconds = null

  // Event listeners =
  // Form
  timeForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const hoursVal = Number(hours.value)
    const minutesVal = Number(minutes.value)
    const secondsVal = Number(seconds.value)

    if (hoursVal === 0 && minutesVal === 0 && secondsVal === 0) {
      warning.textContent = "Enter at least one value"
      timeFormElements.after(warning)
      return
    } else {
      warning.remove()
    }

    // Convert the hours, minutes, and seconds to milliseconds
    const timeInMilliseconds =
      (hoursVal * 60 * 60 + minutesVal * 60 + secondsVal) * 1000

    // Start the timer
    timer(timeInMilliseconds)

    if (hoursVal > 0 || minutesVal > 0 || secondsVal > 0) {
      timeForm.after(templateClone)
      openModal()
      displayAudio()
    }
  })

  // Modal
  btnModalClose.addEventListener("click", closeModal)
  overlay.addEventListener("click", closeModal)

  // Functions =
  // Handle the timer logic
  function timer(timeInMilliseconds) {
    // Set the timer HTML text to the initial time with leading zeros
    timerInnerText(timeInMilliseconds)

    // Get the current time in milliseconds
    const startTime = Date.now()

    // Set the timer interval
    const interval = setInterval(() => {
      // Calculate the elapsed time
      const elapsedTime = Date.now() - startTime

      // Calculate the remaining time
      const remainingTime = timeInMilliseconds - elapsedTime

      // If the remaining time is less than or equal to 0, clear the interval and play the audio
      if (remainingTime <= 0) {
        clearInterval(interval)
        audioPlayLoop()
        timerMessage.textContent = "Time's up!"
        timerHours.textContent = "00:"
        timerMinutes.textContent = "00:"
        timerSeconds.textContent = "00"
        setDocTitle("Time's up!")
      } else {
        // Update the timer HTML text with leading zeros
        timerInnerText(remainingTime)
      }
    }, 1000) // 1000 milliseconds = 1 second
  }

  // Print hours/minutes/seconds to HTML
  function timerInnerText(timeVar) {
    totalSeconds = Math.floor(timeVar / 1000)
    timerHours.textContent = `${("0" + Math.floor(totalSeconds / 3600)).slice(
      -2
    )}:`

    timerMinutes.textContent = `${(
      "0" + Math.floor((totalSeconds % 3600) / 60)
    ).slice(-2)}:`

    timerSeconds.textContent = `${("0" + (totalSeconds % 60)).slice(-2)}`

    const countdown = `${timerHours.textContent}${timerMinutes.textContent}${timerSeconds.textContent}`

    setDocTitle(countdown)
  }

  // Audio
  function displayAudio() {
    setMultipleAttributes(sourceOgg, {
      src: `./audio/${audioFileName}.${audioFormat[0]}`,
      type: audioMediaType[0],
    })
    setMultipleAttributes(sourceMp3, {
      src: `./audio/${audioFileName}.${audioFormat[1]}`,
      type: audioMediaType[1],
    })

    audio.appendChild(sourceOgg)
    audio.appendChild(sourceMp3)
  }

  function audioPlayLoop() {
    audio.loop = true
    audio.play()
  }

  // Modal
  function openModal() {
    modal.classList.add("open")
    overlay.classList.add("open")
  }

  function closeModal() {
    modal.classList.remove("open")
    overlay.classList.remove("open")
    window.location.reload()
    setDocTitle("24-Hour Timer")
  }

  // Helper = set multiple attributes
  function setMultipleAttributes(element, attributesToSet) {
    for (let i in attributesToSet) {
      element.setAttribute(i, attributesToSet[i])
      // i is the attribute(s)
      // [i] is the attribute value(s)
    }
  }

  // Global event listener
  function addGlobalEventListener(type, selector, callback, option = false) {
    document.addEventListener(
      type,
      (e) => {
        if (e.target.matches(selector)) callback(e)
      },
      option
    )
  }

  // Clear number areas on focusin
  addGlobalEventListener(
    "focusin",
    "[data-number-input]",
    (e) => {
      e.target.value = ""
    },
    true
  )

  // Dynamically set <title>
  function setDocTitle(value) {
    document.title = value
  }
}
