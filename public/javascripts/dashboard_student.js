$(function () {
  /**
   * Global variables
   */

  var timerIntervalToClear

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
    console.log(`...and converted them to ${minutes} minutes and ${seconds} seconds`)
    return { minutes, seconds }
  }

  var calculateSecondsRemaining = (unixStartTime, duration) => {
    console.log(`calculateSecondsRemaining() was just called`)
    var secondsPassed = (Date.now() - unixStartTime) / 1000
    console.log(`${Math.floor(secondsPassed)} seconds have passed since the timer has started`)
    return Math.floor(duration - secondsPassed)
  }

  var formatSeconds = (seconds) => seconds.toString().padStart(2, '0')

  var getTaskUUID = () => $('#js-timer-raw-data').data('uuid')

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
    // Get start time and timer duration
    var startTime = $('#js-timer-raw-data').data('start-time')
    var duration = $('#js-timer-raw-data').data('duration')
    console.log(`the attributes 'data-start-time' is ${startTime} and 'data-duration' ${duration}`)
    // Calculate seconds remaining
    var secondsRemaining = calculateSecondsRemaining(startTime, duration)
    console.log(`There are ${secondsRemaining} seconds remaining until the timer hits 0`)
    timerIntervalToClear = setInterval(() => {
      var recalculatedSecondsRemaining = calculateSecondsRemaining(startTime, duration)
      // Test if time has run out
      if (recalculatedSecondsRemaining <= 0) {
        timeUpOrTaskDone()
      }
      // Convert to minutes and seconds
      var timeObj = convertToMinutesAndSeconds(recalculatedSecondsRemaining)
      // Format seconds data for edge cases(pad with '0' if < 10 seconds)
      if (timeObj.seconds < 10) timeObj.seconds = formatSeconds(timeObj.seconds)
      // Update DOM with time remaining
      updateDOMTimer(timeObj)
    }, 1000)
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
   * Event listeners & Ajax calls
   */

  function startTimer () {
    // Get task UUID
    var uuid = getTaskUUID()
    console.log(`taskUUID was found to be: ${uuid}`)
    // Send PUT request to add start time to task, reload page
    console.log(`Student 'start click' was accepted, now sending PUT request`)
    $.ajax({ url: '/api/task/timer/start', method: 'PUT', data: { uuid } })
      .then(() => window.location.reload())
      .catch(() => window.location.reload())
  }

  function timeUpOrTaskDone () {
    console.log(`Time is up or 'Done' button was clicked...`)
    console.log(`... time to clear the time interval and send PUT to backend`)
    // Clear the timer interval
    clearInterval(timerIntervalToClear)
    // Get task UUID
    var uuid = getTaskUUID()
    // Send PUT request
    $.ajax({ url: '/api/task/timer/done', method: 'PUT', data: { uuid } })
      .then(() => window.location.reload())
      .catch(() => window.location.reload())
  }

  // Event listener for timer start
  $('body').on('click', '#js-timer-start', e => {
    console.log(`Student just clicked the start button`)
    // Screen out if timer is already started or no task assigned
    var isTaskAssigned = getTaskUUID() !== ''
    console.log(`isTaskAssigned? ${isTaskAssigned}`)
    if (!timerIsStarted() || !isTaskAssigned) {
      startTimer()
    } else { /* do nothing */ console.log(`Student 'start click' was IGNORED`) }
  })

  // Event listener for task 'DONE'
  $('body').on('click', '#js-timer-done', e => {
    // Screen out if timer is not started or no task assigned
    var isTaskAssigned = getTaskUUID() !== ''
    if (timerIsStarted() && isTaskAssigned) {
      console.log(`Are both 'timerIsStarted() && isTaskAssigned'? true`)
      timeUpOrTaskDone()
    } else { /* do nothing */ console.log(`Student 'DONE click' was IGNORED`) }
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
