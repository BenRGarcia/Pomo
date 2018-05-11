$(function () {
  // Timer can have 3 states:
  // 1) Timer has not yet started (state change when student hits 'start button', begin countDown)
  // 2) Timer is currently counting down (state change when a) student hits 'done', b) timer gets to 0

  /**
   * Helper functions for timer
   */

  // Return true or false if the timer has been started
  var timerIsStarted = () => {
    console.log(`The current value of '!!$('#js-timer-raw-data').data('start-time')' is: ${!!$('#js-timer-raw-data').data('start-time')}`)
    return !!$('#js-timer-raw-data').data('start-time')
  }

  var updateDOMTimer = ({ minutes, seconds }) => {
    console.log(`updateDOMTimer() is trying to update the DOM with ${minutes}:${seconds}`)
    $('#js-timer-minutes').text(minutes)
    $('#js-timer-seconds').text(seconds)
  }

  var convertToMinutesAndSeconds = (secondsDuration) => {
    console.log(`convertToMinutesAndDuration() just received seconds ${secondsDuration}... `)
    var minutes = Math.floor(secondsDuration / 60)
    var seconds = Math.floor(secondsDuration % 60)
    console.log(`and converted them to ${minutes} minutes and ${seconds} seconds`)
    return { minutes, seconds }
  }

  var formatSeconds = (seconds) => seconds.toString().padStart(2, '0')

  /**
   * Timer handling
   */

  var handleUnstartedTimer = () => {
    console.log(`handleUnstartedTimer() was just called`)
    // 1) Get duration attribute from hidden div
    var duration = $('#js-timer-raw-data').data('duration')
    // 2) Convert seconds of duration to minutes
    var timeObj = convertToMinutesAndSeconds(duration)
    console.log(`handleUnstartedTimer() has received timeObj: { minutes: ${timeObj.minutes}, seconds: ${timeObj.seconds} }`)
    // 3) Format seconds data for edge cases (pad with '0' if < 10 seconds)
    if (timeObj.seconds < 10) timeObj.seconds = formatSeconds(timeObj.seconds)
    // 4) Update DOM with timer data
    updateDOMTimer(timeObj)
  }

  var handleStartedTimer = () => {
    console.log(`timer should be counting down now -- handleStartedTimer() was just called`)
  }

  // After page loads, render to DOM the time duration to spans if timer state is unstarted
  var timerHandler = () => {
    console.log(`Timer duration: ${$('#js-timer-raw-data').data('duration')}`)
    // Test if timer is started
    if (timerIsStarted()) {
      // Handle if timer is currently counting down
      console.log(`Timer state is: 'Currently counting down'`)
      handleStartedTimer()
    } else {
      // Handle if timer is not yet started
      console.log(`Timer state is: 'Not yet counting down'`)
      handleUnstartedTimer()
    }
  }

  /**
   * Timer handling initialization
   */

  // Call function that handles timer on page load
  timerHandler()

  /**
   * Event listeners
   */

  // Event listener for timer start
  $('body').on('click', '#js-timer-start', e => {
    console.log(`Student just clicked the start button`)
    // Screen out if timer is already started
    if (!timerIsStarted()) {
      // Send put request to add start time to task
    } else { /* do nothing */ }
  })

// // Event listener for timer start
//   $('body').on('click', '#js-timer-start', e => startTask())

//   // Event listener for timer done
//   $('body').on('click', '#js-timer-done', e => completeTask())

//   // Retrieve data value to determine if timer has started
//   var timerIsStarted = !!$('#js-timer-raw-data').data('start-time')

//   // Conditional execution if timer is started
//   if (timerIsStarted) {
//   // Get timer data from DOM html elements
//     var startTime = $('#js-timer-raw-data').data('start-time')
//     var duration = $('#js-timer-raw-data').data('duration')
//     // Create set interval
//     var intervalId = setInterval(() => {
//     // Calculate time remaining
//       var secondsRemaining = calculateSecondsRemaining(startTime, duration)
//       // Format time remaining
//       var timerObj = formatTimer(secondsRemaining)
//       // Update DOM with time remaining
//       updateDOM(timerObj)
//       // If time is up...
//       if (secondsRemaining <= 0) {
//       // ...clear timer, send `isDone` post to server
//         clearInterval(intervalId)
//         completeTask()
//       }
//     }, 1000)
//   }

//   // Returns number of seconds remaining
//   function calculateSecondsRemaining (unixStartTime, duration) {
//     var secondsPassed = (Date.now() - unixStartTime) / 1000
//     return duration - secondsPassed
//   }

//   // Returns object with minutes and seconds props
//   function formatTimer (secondsRemaining) {
//     var minutes = Math.floor(secondsRemaining / 60)
//     var seconds = Math.floor(secondsRemaining % 60)
//     console.log(`minutes: ${minutes} seconds: ${seconds}`)
//     seconds = seconds <= 9 ? '0' + seconds.toString() : seconds
//     return { minutes, seconds }
//   }

//   // Updates DOM with current timer data
//   function updateDOM ({ minutes, seconds }) {
//     $('#js-timer-minutes').text(minutes)
//     $('#js-timer-seconds').text(seconds)
//   }

//   // Returns the task's UUID
//   function getTaskUUID () {
//     return $('#js-timer-raw-data').data('uuid')
//   }

//   // Sends POST request that timer is started
//   function startTask () {
//     var taskUUID = getTaskUUID()
//     $.post('/api/task/timer/start', { taskUUID })
//       .then(() => window.location.reload())
//       .catch(() => window.location.reload())
//   }

//   // Send post request that task is complete
//   function completeTask () {
//     var taskUUID = getTaskUUID()
//     $.ajax({
//       url: '/api/task/timer/done',
//       method: 'PUT',
//       data: { taskUUID }
//     })
//       .then(() => window.location.reload())
//       .catch(() => window.location.reload())
//   }
})
