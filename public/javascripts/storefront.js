$(function () {
//  add incentive to storefront
  $('#add_incentive').on('click', function (event) {
    $.ajax('/api/storefront' + id, {
      type: 'GET'
    }).then(
      function () {
        console.log('login successful')
        location.reload()
      }
    )
  })
  // go back to teacher dashboard
  $('.dashboard').on('click', function (event) {
    $.ajax('/api/teachers/dashboard', {
      type: 'GET'
    }).then(
      function () {
        console.log('login successful')
        location.reload()
      }
    )
  })
})
