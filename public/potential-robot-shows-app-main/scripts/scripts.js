//A $( documment ).read() block.
$( document ).ready(function() {
  console.log( "ready!" );
  
  //iss1 button that adds a show to the list
  $('#loadBtn').on('click', function(){
    
    $('#showsList').slideDown(1500).empty();

    console.log('load button clicked');
    console.log('load songs here');
    //$('#showsList').append('<li><i>Dexter</i></li>');

    //best decorator is the backtick ``
    $('#showsList').append(`<li class="list-group-item"> ${shows[2]} </li>`);
       
    //loop through array using .each
    $.each(shows, function(index, value){
      $('#showsList').append(`<li 
        class="list-group-item"><i>
         ${shows[index]} </i></li>`);
    })

  }); //end of load button

  // button that clears the list
  $('#clearBtn').on('click',function(){
    
    $('#showsList').slideToggle(2000).empty();

  });

  //start of shows array(list)
  let shows = [
    "Dexter", 
    "The Rookie", 
    "The Mandalorian", 
    "The Witcher",
    "The Crown",
    "Sweet Tooth", 
    "The Summer I Turned Pretty",
    "Crime Scene: The Vanishing at Cecil Hotel",
    "Behind Her Eyes",
    "Little Women",
    "Gilmore Girls"
  ]; //end of shows array
  

});

