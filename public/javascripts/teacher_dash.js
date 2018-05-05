$(function () {
  // choose a class to view
  $('#view_class').on('click', function (event) {
    $.ajax('/api/class', {
      type: 'GET'
    }).then(
      function () {
        console.log('login successful')
        location.reload()
      }
    )
  })
  // delete a class
  $('#delete_class').on('click', function (event) {
    $.ajax('/api/class' + id, {
      type: 'DELETE'
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
