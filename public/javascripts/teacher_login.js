$(function () {
  $('body').on('submit', '#js-form-signup-or-login', e => {
    e.preventDefault()

    var email = $('#js-email').val().trim()
    var password = $('#js-password').val()
    var _csrf = $('input[name=_csrf]').val()
    var user = { email, password }

    $('#js-email').val('')
    $('#js-password').val('')

    var path

    if (window.location.pathname === '/teacher/signup') path = '/api/teacher/signup'
    else if (window.location.pathname === '/teacher/login') path = '/api/teacher/login'

    $.ajax({
      headers: { 'CSRF-Token': _csrf },
      method: 'POST',
      url: path,
      data: user
    })
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
      .then(res => window.location.replace(res.redirectPath))
      .catch(err => console.error(`logout error`, err))
  })
})
