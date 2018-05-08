
$(function () {
  $('body').on('submit', '#js-form-signup-or-login', e => {
    console.log(`teacher login/signup was just submitted`)
    // Prevent default reloading of page
    e.preventDefault()

    // Get values from user input
    var email = $('#js-email').val().trim()
    var password = $('#js-password').val()
    // var _csrf = $('#_csrf').val().trim()
    var user = { email, password }
    var path

    // Clear elements on the screen
    $('#js-email').val('')
    $('#js-password').val('')

    // Determine whether user is on login or signup page
    if (window.location.pathname === '/teacher/signup') {
      console.log(`if condition executed`)
      path = '/api/teacher/signup'
    } else if (window.location.pathname === '/teacher/login') {
      console.log(`else condition executed`)
      path = '/api/teacher/login'
    }
    // Send post request
    $.post(path, user)
      .then(res => {
        if (res.isAuthenticated) {
          window.location.replace(res.redirectPath)
        } else {
          window.alert('incorrect username/password combination')
        }
      })
      .catch(err => console.error(err.message))
  })
})
