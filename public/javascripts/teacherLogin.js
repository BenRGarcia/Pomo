// Wait until page loads
$(function () {
  /**
   * When user submits login/signup form
   */
  $('body').on('submit', '#login', e => {
  // Prevent default reloading of page
    e.preventDefault()

    // Get values from user input
    var radioButtonValue = $('input[name=isLogin]:checked').val()
    var email = $('#email').val().trim()
    var password = $('#password').val().trim()
    var _csrf = $('#_csrf').val().trim()
    var user = { email, password, _csrf }
    var path

    // Clear elements on the screen
    $('#signUpEmail').val('')
    $('#password').val('')
    $('#_csrf').val('')

    // Send post request
    $.post('/api/teacher/login', user)
      .then(res => {
        if (res.isAuthenticated) {
          window.location.replace(res.redirect)
        } else {
          // somehow alert user "Incorrect email/password combination"
          // $('#alert-div').addClass('text-red')
          // $('#alert-div').text('Incorrect email/password combination')
        }
      })
      .catch(err => console.error(err.message))
  })
})
