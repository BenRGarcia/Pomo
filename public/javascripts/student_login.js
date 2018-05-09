// Student will type in username and password for the class
$(function () {
  // When student submits login form
  $('body').on('submit', '#js-form-student-login', e => {
    e.preventDefault()
    // Get value of inputs
    var studentName = $('#js-student-username').val().trim()
    var password = $('#js-student-password').val()
    // Clear input fields
    $('#js-student-username').val('')
    $('#js-student-password').val('')
    // Sent
  })
})
