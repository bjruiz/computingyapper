// A $( document ).ready() block.
$( document ).ready(function() {
   
    loadShowsData("showsList");
    
    addEvents(); 
   
  });
  
  function loadShowsData(appendId) {
  
    let appendElement = $(`#${appendId}`);
  
    appendElement.empty(); 
   
    $.each(data.shows, (index, show)=>{
  
     appendElement.append(` 
      <li id="showNo${index}Title" class="list-group-item mb-1 showTitle">
        ${show.title} 
      
        <ul class="list-group showDetails">
          <li class="input-group w-100">
            <span class="w-20 input-group-text">genre</span>
             <input id="showNo${index}GenreEdit" name="genre" type="text" class="form-control editShow" value="${show.genre}">
          </li>
          <li class="input-group w-100">
            <span class="w-20 input-group-text">rating</span>
          
            <input id="showNo${index}RatingEdit" type="text" name="rating" class="form-control editShow" value="${show.rating}">
          </li>
         
          <li class="input-group w-100">
            <span class="w-20 input-group-text">platform</span>
          
            <input id="showNo${index}PlatformEdit" type="text" name="platform" class="form-control editShow" value="${show.platform}">
          </li>
  
          <li class="input-group w-100">
            <span class="w-20 input-group-text">watched</span>
          
            <input id="showNo${index}WatchedEdit" type="text" name="watched" class="form-control editShow" value="${show.watched}">
          </li>
        </ul>
      </li>`); 
  
      $('.showDetails').hide();
      $('input.editShow').prop('readonly', true); 
     
    });
   
  
  }
  
  function addEvents(){
  
     $('.showTitle').on('click', (e)=>{
      
      let $this = $(e.target); 
      let $thisId = $this.attr('id');
      
      $('#'+ $thisId + ' > ul.showDetails').toggle(); 
      
      $('#'+ $thisId + '> i.editShow').toggle(); 
  
  
    }); 
  
    $('#btnHideAll').on('click', (e)=> {
  
      $('ul.showDetails').hide();
    });
    
    $('#btnShowAll').on('click', (e)=> {
  
    $('ul.showDetails').show();
    });
  
    $('input.editShow').on('click', (e)=> {
  
      console.log(e.target); 
      let $this = $(e.target); 
      $this.prop('readonly', false); 
  
    })
  
    $('#btnSaveShow').on('click', ()=>{
  
      data.shows.push({ 
        title : $('#showAddTitle').val(),
      }); 
    
      loadShowsData("showsList");
      addEvents(); 
  
      $('#addShowModal .btn-close').click() 
      $('#addShowModal input').val(''); 
      
  
    });
  
  
    $('input.editShow').on('blur', (e)=> {
  
      let $this = $(e.target); 
      let $thisId = $this.attr('id'); 
      let $thisKey = $this.attr('title');
       console.log($thisKey); 
   
      let regexDigit = /\d+/g;
      let showIndex = $thisId.match(regexDigit)[0]; 
  
  
      data.shows[showIndex][$thisKey] = $this.val(); 
  
      $(e.target).prop('readonly', true); 
       
    }); 
  
  
    $('#btnConsoleData').on('click', ()=>{
  
      console.log(data.shows); 
  
    })
  
  }