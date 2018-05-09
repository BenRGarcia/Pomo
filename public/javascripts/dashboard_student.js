$(function () {
  // Event listener for timer start
  $('body').on('click', '#js-timer-start', e => startTask())

  // Event listener for timer done
  $('body').on('click', '#js-timer-done', e => completeTask())

  // Retrieve data value to determine if timer has started
  var timerIsStarted = !!$('#js-timer-raw-data').data('start-time')

  // Conditional execution if timer is started
  if (timerIsStarted) {
    // Get timer data from DOM html elements
    var startTime = $('#js-timer-raw-data').data('start-time')
    var duration = $('#js-timer-raw-data').data('duration')
    // Create set interval
    var intervalId = setInterval(() => {
      // Calculate time remaining
      var secondsRemaining = calculateSecondsRemaining(startTime, duration)
      // Format time remaining
      var timerObj = formatTimer(secondsRemaining)
      // Update DOM with time remaining
      updateDOM(timerObj)
      // If time is up...
      if (secondsRemaining <= 0) {
        // ...clear timer, send `isDone` post to server
        clearInterval(intervalId)
        completeTask()
      }
    }, 1000)
  }

  // Returns number of seconds remaining
  function calculateSecondsRemaining (unixStartTime, duration) {
    var secondsPassed = (Date.now() - unixStartTime) / 1000
    return duration - secondsPassed
  }

  // Returns object with minutes and seconds props
  function formatTimer (secondsRemaining) {
    var minutes = Math.floor(secondsRemaining / 60)
    var seconds = secondsRemaining % 60
    return { minutes, seconds }
  }

  // Updates DOM with current timer data
  function updateDOM ({ minutes, seconds }) {
    $('#js-timer-minutes').val(minutes)
    $('#js-timer-seconds').val(seconds)
  }

  // Returns the task's UUID
  function getTaskUUID () {
    return $('#js-task-raw-data').data('uuid')
  }

  // Sends POST request that timer is started
  function startTask () {
    var taskUUID = getTaskUUID
    $.post('/api/task/timer/start', { taskUUID })
      .then(() => window.location.reload())
      .catch(() => window.location.reload())
  }

  // Send post request that task is complete
  function completeTask () {
    var taskUUID = getTaskUUID
    $.post('/api/task/timer/done', { taskUUID })
      .then(() => window.location.reload())
      .catch(() => window.location.reload())
  }
})
