$(function () {
/**
 * Handle when teacher is viewing class
 */

  // grab selected students and assign task, time duration, and coin value
  $('body').on('submit', e => {
    e.preventDefault()
    // get the ids of the students
    var studentArr = []
    var students = $('checkbox[data-add=student]')
    var student_uuid = $(e.target).data('student_uuid')

    students.forEach(element => {
      if (student_uuid.checked = true) {
        studentArr.push(student_uuid)
      }
    })

    $('#js-modal-task-assignment').modal('show') // has form input and submit button

    var taskAssignment = {task_name, timer_duration, coin_value}

    $('#js-modal-task-assignment').on('submit', 'form', e => {
      e.preventDefault()

      var task_name = $('#task_name').val().trim()
      var timer_duration = $('#timer_duration').val().trim()
      var coin_value = $('#coin_value').val().trim()

      $.post('/api/task/', taskAssignment)
        .then(
          function () {
            console.log('assigned task to', studentArr[element])
            window.location.reload()
          }
        )
        .catch(err => console.error(err.message))
    })
    // clear checkboxes and modal values
    students.empty()
    var task_name = $('#task_name').val('')
    var timer_duration = $('#timer_duration').val('')
    var coin_value = $('#coin_value').val('')
  })

  // NEED HELP WITH ADDING AND DELETING COINS!

  // add coins
  $('body').on('click', 'span[data-coin-adjust=coin]', e => {
    // get the attribute of each button
    var increment_coin = $(e.target).data('increment_coin')
    var student_uuid = $(e.target).data('student_uuid')
    var coin_amount = increment_coin.val()

    var new_coin_value = {
      coin_count: coin_amount++
    }

    $.put('/api/student/add' + student_uuid, new_coin_value)
      .then(
        e => {
          window.location.reload()
        }
      )
  })

  // **delete coin from each student
  $('body').on('click', 'span[data-coin-adjust=coin]', e => {
    // get the attribute of each button
    var decrement_coin = $(e.target).data('decrement_coin')
    var student_uuid = $(e.target).data('student_uuid')
    var coin_amount = decrement_coin.val()

    var new_coin_value = {
      coin_count: coin_amount--
    }
    $.put('/api/student/add' + student_uuid, new_coin_value)
      .then(
        e => {
          window.location.reload()
        }
      )
  })

  // add student to class
  $('body').on('click', '#js-add-student', e => {
    $('#js-modal-add-student').modal('show')

    $('body').on('submit', '#js-modal-add-student', e => {
      e.preventDefault()

      var newStudentName = $('#new_student').val().trim()
      var coin_count = $('#coin_count').val().trim()

      var addNewStudent = {
        name: newStudentName,
        coin_count: coin_count
      }

      $.post('/api/students/', addNewStudent)
        .then(
          function () {
            console.log('new student add', newStudentName)
            window.location.reload()
          }
        )
        .catch(err => console.error(err.message))
      $('#new_student').val('')
      $('#coint_count').val('')
      $('#js-modal-add-student').modal('hide')
    })
  })

  // delete student from class
  $('body').on('click', 'span[data-delete=student]', e => {
    // get the name of the class to insert into modal
    var student_uuid = $(e.target).data('student_uuid') // student_uuid: adfgdfg-45465u-sfgb
    var student_name = $(e.target).data('student_name') // 'John Smith'

    $('#js-modal-delete-student').modal('show') // has form input and submit button

    var userInput = $('#js-modal-delete-input').val()

    if (userInput === student_name) {
      $('#js-modal-delete-student').prop('disabled', false)
    } else {
      $('#js-modal-delete-student').prop('disabled', true)
    }

    $('#js-modal-delete-student').on('submit', 'form', e => {
      e.preventDefault()
      $.ajax('/api/student/' + student_uuid, {
        type: 'DELETE'
      }).then(
        function () {
          console.log('deleted class', class_uuid)
          window.location.reload()
        }
      )
    })
  })
})
