$(function () {
  // start the timer
  $('body').on('click', '#start', e => {
    var student_name = $(e.target).data('student_name')
    var current_time = date.now()

    var start_update = {student_name, current_time}

    $.post('/api/task/start', start_update) 
      .then(
      function () {
        console.log('start time added')
      }
    )
  })

  // when student hits done
  $('body').on('click', '#done', e => {
    var student_name = $(e.target).data('student_name')
    var isDone = $(e.target).data("isDone")

    var isDone_update= {student_name, isDone}

    $.put('/api/task/start', isDone_update) 
      .then(
      function () {
        console.log('isDone has been updated to true')
      }
    )
  })
})
