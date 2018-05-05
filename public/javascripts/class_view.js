$(function () {
  // **select students to assign tasks
  $('#pick_students').on('click', function (event) {
    var id = $(this).data('id')
    var studentsPicked = $(this).data('studentsPicked')

    $.ajax('/api/students/' + id, {
      type: 'PUT'
    }).then(
      function () {
        console.log('login successful')
        window.location.reload()
      }
    )
  })
  // assign tasks, coin values, and timers to students selected
  $('#assign_submit').on('click', function (event) {
    var id = $(this).data('id')
    var tasks = $('#tasksAssigned').val().trim()
    var coinValue = $('#coinValue').val().trim()
    var timerDuration = $('#timerDuration').val().trim()

    var newValues = {
      name: tasks,
      coin_value: coinValue,
      timer_duration: timerDuration
    }

    $.ajax('/api/task/' + id, {
      type: 'PUT',
      data: newValues
    }).then(
      function () {
        console.log('added newValues to' + id)
        window.location.reload()
      }
    )
  })
  //* *add coins to each student
  $('.add_coins').on('click', function (event) {
    var id = $(this).data('id')

    $.ajax('/api/students/' + id, {
      type: 'PUT'
    }).then(
      function () {
        console.log('login successful')
        window.location.reload()
      }
    )
  })
  // **delete coin from each student
  $('.delete_coins').on('click', function (event) {
    var id = $(this).data('id')

    $.ajax('/api/students/' + id, {
      type: 'DELETE'
    }).then(
      function () {
        console.log('deleted coins from' + id)
        window.location.reload()
      }
    )
  })
  // view the store
  $('#storefront').on('click', function (event) {
    $.ajax('/api/store', {
      type: 'GET'
    }).then(
      function () {
        console.log('view store successful')
        window.location.reload()
      }
    )
  })
  // add student to class
  $('#add_student').on('click', function (event) {
    var id = $(this).data('id')
    var newStudentName = $('.new_student').val().trim()

    var addNewStudent = {
      name: newStudentName,
      coin_count: 0
    }

    $.ajax('/api/students/' + id, {
      type: 'POST',
      data: addNewStudent
    }).then(
      function () {
        console.log('new student add', newStudentName)
        window.location.reload()
      }
    )
  })
  // delete student from class
  $('#delete_student').on('click', function (event) {
    var id = $(this).data('id')

    $.ajax('/api/students/' + id, {
      type: 'DELETE'
    }).then(
      function () {
        console.log('student deleted', id)
        window.location.reload()
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
        window.location.reload()
      }
    )
  })
})
