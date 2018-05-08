$(function () {
  $('body').on('submit', '#js-form-signup-or-login', e => {
    e.preventDefault()

    var email = $('#js-email').val().trim()
    var password = $('#js-password').val()
    // var _csrf = $('#_csrf').val().trim()
    var user = { email, password }

    $('#js-email').val('')
    $('#js-password').val('')

    var path

    if (window.location.pathname === '/teacher/signup') path = '/api/teacher/signup'
    else if (window.location.pathname === '/teacher/login') path = '/api/teacher/login'

    $.post(path, user)
      .then(res => {
        if (res.isAuthenticated) window.location.replace(res.redirectPath)
        else window.alert('incorrect username/password combination')
      })
      .catch(err => {
        console.error(err)
        window.alert(err.statusText)
      })
  })

  $('body').on('click', '#js-teacher-logout', e => {
    $.post('/api/teacher/logout')
      .then(() => window.location.replace('/'))
      .catch(err => console.error(`logout error`, err))
  })
})
