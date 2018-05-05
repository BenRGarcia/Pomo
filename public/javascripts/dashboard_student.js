$(function () {
  // start the timer
  $('#start').on('click', function (event) {
    $.ajax('/api/start', {
      type: 'POST'
    }).then(
      function () {
        console.log('login successful')
        location.reload()
      }
    )
  })
  // stop the timer
  $('#stop').on('click', function (event) {
    $.ajax('/api/task' + id, {
      type: 'POST'
    }).then(
      function () {
        console.log('login successful')
        location.reload()
      }
    )
  })
  // view storefront
  $('#storefront').on('click', function (event) {
    $.ajax('/api/storefront', {
      type: 'GET'
    }).then(
      function () {
        console.log('login successful')
        location.reload()
      }
    )
  })
})
