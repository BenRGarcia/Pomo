$(function () {
  // when user hits login submit
  $('#login').on('click', function (event) {
    $.ajax('/api/user' + id, {
      type: 'GET'
    }).then(
      function () {
        console.log('login successful')
        location.reload()
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
        location.reload()
      }
    )
  })

  $('#signup_submit').on('click', function (event) {
    $.ajax('/api/users' + id, {
      type: 'POST'
    }).then(
      function () {
        console.log('login successful')
        location.reload()
      }
    )
  })
})
