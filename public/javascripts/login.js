$(function () {
  // when user hits login submit
  $('#login').on('click', function (event) {
    var id = $(this).data('id')

    $.ajax('/api/user' + id, {
      type: 'GET'
    }).then(
      function () {
        console.log('login successful')
        window.location.reload()
      }
    )
  })
  // when user hits the sign up tab --- not sure we need this one
  $('#signup_tab').on('click', function (event) {
    $.ajax('/api/teachers', {
      type: 'GET'
    }).then(
      function () {
        console.log('login successful')
        window.location.reload()
      }
    )
  })

  $('#signup_submit').on('click', function (event) {
    var id = $(this).data('id')
    var email = $('#signUpEmail').val().trim()
    var password = $('#signUpPassword').val().trim()
    var hidden = $('#hidden').val().trim()

    var newTeacher = {
      email: email,
      password_hash_digest: password,
      _csrf: hidden
    }
    $.ajax('/api/users' + id, {
      type: 'POST',
      data: newTeacher
    }).then(
      function () {
        console.log('signup successful', id)
        window.location.reload()
      }
    )
  })
})
