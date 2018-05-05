$(function () {
  /**
   * Handle when teacher deletes a class
   */

/*

  Psuedocode:

  1) Teacher clicks on the trash can button
  2) Modal should pop up, confirm if the teacher realllllly wants to delete the class
  3) Modal should have a form and a button in it
    * Form should require that the teacher type in the name of the class she wants to delete
    * and Modal's 'delete' button should be inactive unless the form input matches the class' name
  4) Then and only then will the frontend send a delete request to the backend

  <modal id="js-delete-class">
  </modal>

  <div>
    3rd Period Math Class
    <span class="fa" data-delete="class" data-class="4">trashcan</span>
  </div>
  <div>
    4rd Period Math Class
    <span class="fa" data-delete="class" data-class-name="" data-class-uuid="4">trashcan</span>
  </div>

  .hbs

  {{#each }}
    <div>
      {{ class_name }}
      <span class="fa" data-delete="class" data-class-name="{{ class_name }}" data-class-uuid="{{ class_uuid }}">
        trashcan
      </span>
    </div>
  {{/each }}

 */

  $('body').on('click', 'span[data-delete=class]', e => {
    // get the name of the class to insert into modal
    var class_uuid = $(e.target).data('class_uuid') // class_uuid: adfgdfg-45465u-sfgb
    var class_name = $(e.target).data('class_name') // '4rd Period Math Class'

    $('#js-modal-delete-class').modal('show') // has form input and submit button

    var userInput = $('#js-modal-delete-input').val()
    
    if (userInput === class_name) {
      $('#js-modal-delete-class').prop('disabled', false)
    } else {
      $('#js-modal-delete-class').prop('disabled', true)      
    }
      
    $('#js-modal-delete-class').on('submit', 'form', e => {
      e.preventDefault()
        $.ajax('/api/class/' + class_uuid, {
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
