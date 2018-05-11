$(function () {
  /**
   * Teacher clicks button to increment student coins
   */

  $('button[data-increment-coins=student]').on('click', e => {
    e.preventDefault()
    var uuid = $(e.target).data('student-uuid')
    $.ajax({ url: `/api/class/student/${uuid}/increment`, method: 'PUT' })
      .then(() => window.location.reload())
      .catch(() => window.location.reload())
  })

  /**
   * Teacher assigns tasks to student(s)
   */

  // Helper function to determine true/false if at least one box is checked
  var anyBoxesChecked = () => $('input:checked').get().length > 0

  function getStudentUUIDs () {
    // Find all selected checkboxes on DOM
    var boxesChecked = $('input:checked').get()
    // Put all student UUID's selected into an array of strings
    var studentUUIDArray = boxesChecked.map(el => $(el).data('student-uuid'))
    return studentUUIDArray
  }

  $('input:checkbox').on('click', e => {
    if (anyBoxesChecked) {
      $('#js-teacher-task-assign').attr('disabled', false)
    } else {
      $('#js-teacher-task-assign').attr('disabled', true)
    }
  })

  $('#js-form-task-assign').on('submit', e => {
    e.preventDefault()

    // Screen out tasks without selected students
    if (anyBoxesChecked) {
      var uuidArray = getStudentUUIDs()
      var name = $('#js-task-name').val().trim()
      var description = $('#js-task-description').val()
      var timer_duration = $('#js-task-timer-duration').val()
      var coin_value = $('#js-task-coin-value').val()

      var queryArray = uuidArray.map(student_uuid => {
        return { student_uuid, name, description, timer_duration, coin_value }
      })
      console.log(`front end about to send POST to backend: `, queryArray)
      $.post('/api/task/new', { queryArray })
        .then(() => window.location.reload())
        .catch(() => window.location.reload())
    }
  })

  // Clear modal when closed
  $('#js-modal-task-assignment').on('hidden.bs.modal', () => {
    $('#js-task-name').val('')
    $('#js-task-description').val('')
    $('#js-task-timer-duration').val('')
    $('#js-task-coin-value').val('')
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
})
