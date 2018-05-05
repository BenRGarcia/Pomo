$(function () {
/**
 * Handle when teacher is viewing class
 */

 // checkbox[data-add=student]
 //grab selected students and assign task, time duration, and coin value
  $('body').on('click', 'submit', e => {
    // get the ids of the students 
    var studentArr = []
    // var students = checkbox[data-add=student]
    var student_uuid = $(e.target).data('student_uuid') 

    if(student_uuid.checked = true){
      studentArr.push(student_uuid)    
    } 

    $('#js-modal-task-assignment').modal('show') // has form input and submit button

    var task_name = $('#task_name').val().trim()
    var timer_duration = $('#timer_duration').val().trim()
    var coin_value = $('#coin_value').val().trim()

    var taskAssignment = {task_name, timer_duration, coin_value}
    
      
    $('#js-modal-task-assignment').on('submit', 'form', e => {
      e.preventDefault()
      studentArr.forEach(element => {
        $.post('/api/task/', taskAssignment)
        .then(
          function () {
            console.log('assigned task to', studentArr[element])
            window.location.reload()
          }
        )
        .catch(err => console.error(err.message))
      });
    })
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

