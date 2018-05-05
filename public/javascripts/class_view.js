$(function () {
  // select students to assign tasks
  $('#pick_students').on('click', function (event) {
    $.ajax('/api/students' + id, {
      type: 'PUT'
    }).then(
      function () {
        console.log('login successful')
        location.reload()
      }
    )
  })
  // assign tasks, coin values, and timers
  $('#assign_submit').on('click', function (event) {
    $.ajax('/api/students' + id, {
      type: 'PUT'
    }).then(
      function () {
        console.log('login successful')
        location.reload()
      }
    )
  })
  // add coins to each student
  $('.add_coins').on('click', function (event) {
    $.ajax('/api/students' + id, {
      type: 'PUT'
    }).then(
      function () {
        console.log('login successful')
        location.reload()
      }
    )
  })
  // delete coin from each student
  $('.delete_coins').on('click', function (event) {
    $.ajax('/api/students' + id, {
      type: 'DELETE'
    }).then(
      function () {
        console.log('login successful')
        location.reload()
      }
    )
  })
  // view the store
  $('#storefront').on('click', function (event) {
    $.ajax('/api/store', {
      type: 'GET'
    }).then(
      function () {
        console.log('login successful')
        location.reload()
      }
    )
  })
  // add student to class
  $('#add_student').on('click', function (event) {
    $.ajax('/api/students' + id, {
      type: 'POST'
    }).then(
      function () {
        console.log('login successful')
        location.reload()
      }
    )
  })
  // delete student from class
  $('#delete_student').on('click', function (event) {
    $.ajax('/api/students' + id, {
      type: 'DELETE'
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
