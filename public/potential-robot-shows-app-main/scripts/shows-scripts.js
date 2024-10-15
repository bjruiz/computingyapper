// A $( document ).ready() block.
$(document).ready(function () {

  $('#btnHideAll').on('click', function () {
    console.log('hide all button clicked');
    $('#showsList li').hide();
  });

  $('#btnShowAll').on('click', function () {
    console.log('show all button clicked');
    $('#showsList li').show();
  });

  $('#btnClearAll').on('click', function () {
    console.log('clear all button clicked');
    $('#showsList').empty();
  });

  loadShowsData("showsList");

 
});

function loadShowsData(appendId) {
  let appendElement = $(`#${appendId}`);
  

  $.ajax({
    url: '/read',
    type: 'GET',
    success: function (response) {
      if (response && response.postData) {
        console.log("shows data:", response.postData);

        $.each(response.postData, (index, show) => {
          appendElement.append(`
            <li id="showsNo${index}Title" class="list-group-item mb-1">
              <strong>Title:</strong>
              <input type="text" class="form-control editTitle" value="${show.title}" readonly><br>
              <strong>Genre:</strong>
              <input type="text" class="form-control editGenre" value="${show.genre}" readonly><br>
              <strong>Rating:</strong>
              <input type="text" class="form-control editRating" value="${show.rating}" readonly><br>
              <strong>Platform:</strong>
              <input type="text" class="form-control editPlatform" value="${show.platform}" readonly><br> 
              <strong>Watched:</strong>
              <input type="text" class="form-control editWatched" value="${show.watched}" readonly><br>


              <button class="btn btn-primary btn-sm editBtn" data-id="${show._id}">Edit</button>
              <button class="btn btn-success btn-sm saveBtn" data-id="${show._id}" style="display:none;">Save</button>
            </li>` 
          );
        });
        addEvents();

      }
    },
    error: function (err) {
      console.error('Error fetching data:', err);
    }
  });
}


function addEvents() {

  $('.editBtn').on('click', function(){
    const $parent = $(this).closest('li');

    $parent.find('input').prop('readonly', false);

    $(this).hide();
    $parent.find('.saveBtn').show();
  });

  $('.saveBtn').on('click', function(){
    const showId = $(this).data('id');
    const $parent = $(this).closest('li');

    const updatedShow = {
      title: $parent.find('.editTitle').val(),
      genre: $parent.find('.editGenre').val(),
      rating: $parent.find('.editRating').val(),
      platform: $parent.find('.editPlatform').val(),
      watched: $parent.find('.editWatched').val()
    };

    $.ajax({
      url: `/update/${showId}`,
      type: 'POST',
      data: updatedShow,
      success: function () {
        console.log('Show updated');

        $parent.find('input').prop('readonly', true);

        $parent.find('.editBtn').show();
        $parent.find('.saveBtn').hide();
      },
      error: function (err) {
        console.error('Error updating show:', err);
      }
    });
  });

  $('#btnSaveShow').on('click', () => {

    let newShow = {
      title: $('#showAddTitle').val(),
      genre: $('#showAddGenre').val(),
      rating: $('#showAddRating').val(),
      platform: $('#showAddPlatform').val(),
      watched: $('#showAddWatched').val() === 'true'
    };

    $.ajax({
      url: '/insert',
      type: 'POST',
      data: newShow,
      success: function () {
        loadShowsData("showsList");
        $('#addShowModal .btn-close').click();
        $('#addShowModal input').val('');
      },
      error: function (err) {
        console.error('Error adding show:', err);
      }
    });
  });

}