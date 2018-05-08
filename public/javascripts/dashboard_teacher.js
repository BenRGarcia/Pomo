$(function () {
  // Define global variables
  var classUUID
  var className

  /**
   * Teacher deletes a new class
   */

  // Teacher clicks icon to delete a class
  $('body').on('click', 'button[data-delete=class]', e => {
    // Define data for class to delete
    classUUID = $(e.target).data('id')
    className = $(e.target).data('name')
    // Show modal that can delete a class
    $('#js-modal-delete-class').modal('show')
  })

  // Trigger focus to input box on modal when shown
  $('#js-modal-delete-class').on('shown.bs.modal', () => {
    $('#js-modal-delete-input').trigger('focus')
  })

  // Clear modal's input box if modal closed
  $('#js-modal-delete-class').on('hidden.bs.modal', () => {
    $('#js-modal-delete-input').val('')
  })

  // Teacher reconfirms deletion of class by typing out class name
  $('#js-modal-delete-class').on('keyup', () => {
    var userInput = $('#js-modal-delete-input').val()
    // If class name input matches name of class to delete ...
    if (userInput === className) {
      // ... remove disabled attribute of submit button
      $('#js-modal-delete-button').prop('disabled', false)
    } else {
      // ... or disable button because name doesn't match
      $('#js-modal-delete-button').prop('disabled', true)
    }
  })

  // Teacher submits confirmed deletion of class
  $('body').on('submit', '#js-modal-delete-form', e => {
    e.preventDefault()
    // Ignore form submission if delete button disabled
    if ($('#js-modal-delete-button').prop('disabled') === false) {
      $.ajax(`/api/teacher/class/${classUUID}`, { type: 'DELETE' })
        .then(() => window.location.reload())
        .catch(() => window.location.reload())
    } else { /* ... do nothing */ }
  })

  /**
   * Teacher creates a new class
   */

  // Teacher clicks button to add a class
  $('body').on('click', '#js-teacher-class-add', e => {
    $('#js-modal-add-class').modal('show')
  })

  // Teacher submits modal form with new class name
  $('body').on('submit', '#js-form-class-add', e => {
    e.preventDefault()
    var name = $('#js-modal-class-add-name').val()
    $.post('/api/teacher/class/add', { name })
      .then(() => window.location.reload())
      .catch(() => window.location.reload())
  })

  // Clear modal's input box if modal closed
  $('#js-modal-add-class').on('hidden.bs.modal', () => {
    $('#js-modal-class-add-name').val('')
  })
})
