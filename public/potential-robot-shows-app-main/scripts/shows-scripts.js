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

  loadShowsData("showsList");

});

function loadShowsData(appendId) {
  let appendElement = $(`#${appendId}`);
  //appendElement.empty();

  $.ajax({
    url: '/',
    type: 'GET',
    success: function (response) {
      if (response && response.postData) {
        console.log("shows data:", response.postData);

        $.each(response.postData, (index, show) => {
          appendElement.append(`
            <li id="showsNo${index}Title" class="list-group-item mb-1">
              <strong>Title:</strong><%= show.title %><input type="text" class="form-control editTable" value="${show.title}" readonly><br>
              <strong>Genre:</strong><%= show.genre %><input type="text" class="form-control editTable" value="${show.genre}" readonly><br>
              <strong>Rating:</strong><%= show.rating %><input type="text" class="form-control editTable" value="${show.rating}" readonly><br>
              <strong>Platform:</strong><%= show.platform %><input type="text" class="form-control editTable" value="${show.platform}" readonly><br> 
              <strong>Watched:</strong><%= show.watched %><input type="text" class="form-control editTable" value="${show.watched}" readonly><br>


              <button class="btn btn-primary btn-sm editBtn" data-id="${shows._id}">Edit</button>
              <button class="btn btn-success btn-sm saveBtn" data-id="${shows._id}" style="display:none;">Save</button>
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

  $('.editBtn').on('click', (e) => {
    const $parent = $(this).closest('li');

    $parent.find('.editTable').prop('readonly', false);

    $(this).hide();
    $parent.find('.saveBtn').show();
  });

  $('.savebBtn').on('click', (e) => {
    const showId = $(this).data('id');
    const $parent = $(this).closest('li');

    const updatedShow = {
      title: $parent.find('editTitle').val(),
      genre: $parent.find('editGenre]').val(),
      rating: $parent.find('editRating]').val(),
      platform: $parent.find('editPlatform').val(),
      watched: $parent.find('editWatched').val()
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


  $('input.editShow').on('blur', (e) => {
    let $this = $(e.target);
    let showIndex = $this.attr('id').match(/\d+/g)[0];
    let showKey = $this.attr('name');

    let updatedShow = {};
    updatedShow[showKey] = $this.val();

    $.ajax({
      url: `/update${showIndex}`,
      type: 'POST',
      data: updatedShow,
      success: function () {
        $this.prop('readonly', true);
      },
      error: function (err) {
        console.error('Error updating show:', err);
      }
    });
  });

  //output data to console
  $('#btnConsoleData').on('click', () => {
    console.log("Show data: ", data.shows);
  });

}