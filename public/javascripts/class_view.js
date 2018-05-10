/*
Per Davis, Send POST requests for new students to the backend in objects made with something like this:
[
  {
    "name": "english hw",
    "timer_duration": 1200,
    "coin_value": 25,
    "student_uuid": 1
  },
  {
    "name": "english hw",
    "timer_duration": 1200,
    "coin_value": 25,
    "student_uuid": 2
  }
]

      var studentIds = [1, 2]
      var queryArray = []

      for (var i = 0; i < studentIds.length; i++) {
        var taskObj = {
          name: 'english hw',
          timer_duration: 1200,
          coin_value: 25,
          student_uuid: studentIds[i]
        }
        queryArray.push(taskObj)
      }
 */

$(function () {
  /**
   * Teacher assigns tasks to student(s)
   */

  // Teacher clicks on 'ADD TASK' button
  $('#js-teacher-task-assign').on('click', e => {
    e.preventDefault()
    console.log(`js-teacher-task-assign was just clicked`)
    // Find all selected checkboxes on DOM
    var boxesChecked = $('input:checked').get()
    // Put all student UUID's selected into an array of strings
    var studentUUIDArray = boxesChecked.map(el => $(el).data('student-uuid'))
  })

  // Define global variables
  var student_UUID
  var student_Name

  /**
   * Handle when teacher deletes a student
   */

  // Teacher clicks icon to delete a student
  $('body').on('click', 'button[data-delete=student]', e => {
    // Define data for class to delete
    student_UUID = $(e.target).data('id')
    student_Name = $(e.target).data('name')
  })

  // Trigger focus to input box on modal when shown
  $('#js-modal-student-delete').on('shown.bs.modal', () => {
    $('#js-modal-delete-input').trigger('focus')
  })

  // Clear modal's input box if modal closed
  $('#js-modal-student-delete').on('hidden.bs.modal', () => {
    $('#js-modal-delete-button').prop('disabled', true)
    $('#js-modal-delete-input').val('')
  })

  // Teacher reconfirms deletion of student by typing out student name
  $('#js-modal-student-delete').on('keyup', () => {
    var userInput = $('#js-modal-delete-input').val()
    // If student name input matches name of student to delete ...
    if (userInput === student_Name) {
      // ... remove disabled attribute of submit button
      $('#js-modal-delete-button').prop('disabled', false)
    } else {
      // ... or disable button because name doesn't match
      $('#js-modal-delete-button').prop('disabled', true)
    }
  })

  // Teacher submits confirmed deletion of class
  $('body').on('submit', '#js-delete-student-form', e => {
    e.preventDefault()
    // Ignore form submission if delete button disabled
    if ($('#js-modal-delete-button').prop('disabled') === false) {
      console.log(`Frontend is sending AJAX delete to the backend`)
      $.ajax(`/api/class/student/${student_UUID}`, { type: 'DELETE' })
        .then(() => window.location.reload())
      // .catch(() => window.location.reload())
    } else { /* ... do nothing */ }
  })

  /**
   * Helper functions
   */
  // Retrieve class UUID from hidden div
  var getClassUUID = () => $('#js-class-uuid').data('class-uuid')

  // Retrieve students with checked box, return array of student uuid's
  var getSelectedStudents = () => {

  }

  /**
   * Teacher adds a student to the class
   */
  $('body').on('keyup', '.js-class-add-student', e => {
    // Prevent default reload
    e.preventDefault()
    // Get values from input
    var name = $('#js-add-student-name').val()
    var student_id = $('#js-add-student-id').val()
    var class_uuid = getClassUUID()

    if (e.keyCode === 13 && name && student_id) {
      // Clear inputs
      $('#js-add-student-name').val('')
      $('#js-add-student-id').val('')
      // Send POST to server
      $.post('/api/class/student', { name, student_id, class_uuid })
        .then(() => window.location.reload())
        .catch(() => window.location.reload())
    }
  })
/**
 * Handle when teacher is viewing class
 */

  // grab selected students and assign task, time duration, and coin value
  // $('body').on('submit', e => {
  //   e.preventDefault()
  //   // get the ids of the students
  //   var studentArr = []
  //   var students = $('checkbox[data-add=student]')
  //   var student_uuid = $(e.target).data('student_uuid')

  //   students.forEach(element => {
  //     if (student_uuid.checked = true) {
  //       studentArr.push(student_uuid)
  //     }
  //   })

  //   $('#js-modal-task-assignment').modal('show') // has form input and submit button

  //   var taskAssignment = {task_name, timer_duration, coin_value}

  //   $('#js-modal-task-assignment').on('submit', 'form', e => {
  //     e.preventDefault()

  //     var task_name = $('#task_name').val().trim()
  //     var timer_duration = $('#timer_duration').val().trim()
  //     var coin_value = $('#coin_value').val().trim()

  //     $.post('/api/task/', taskAssignment)
  //       .then(
  //         function () {
  //           console.log('assigned task to', studentArr[element])
  //           window.location.reload()
  //         }
  //       )
  //       .catch(err => console.error(err.message))
  //   })
  //   // clear checkboxes and modal values
  //   students.empty()
  //   var task_name = $('#task_name').val('')
  //   var timer_duration = $('#timer_duration').val('')
  //   var coin_value = $('#coin_value').val('')
  // })
})
