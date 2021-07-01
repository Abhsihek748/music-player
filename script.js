let index ;
let playing ;
let updateTrack;
setTimeout(()=>{
    getHomeTracks();
      getLikedSong();
      readPlayList();
      setTimeout(()=>{
        load_tracks = home_track_list;
        track_list = home_track_list;
        loadDetails($(".home"));
        loadBox($(".home"));
        loadTracks($(".home"));
        if(library.length>0){
            for(let i = 0 ; i < library.length;i++){
               if(!isNaN(library[i][0])){
                   mlib = Math.max(mlib,library[i][0]);
               }
            }
        mlib += 1;
        }
        console.log(library.length);
        loadPlayList();

    },400)
},200)

// setInterval(()=>{
//     getHomeTracks();
//       getLikedSong();
//       readPlayList();
//      setTimeout(()=>{
//         if(track_list[1] == home_track_list[1])
//         track_list = home_track_list;
//         else if(track_list[1] == liked_Song[1])
//         track_list = liked_Song;
//         else{
//             for(let i = 0 ; i < library.length;i++){
//               if(track_list[1] == library[i][0])
//               track_index[0] = library[i][1];
//             }
//         }
//      },200)

// },800)

$(".container").click(function (e) {
    $(".song-option-modal").remove();
    $(".playList-option-modal").remove();
    $(".playList-rename-modal").remove();
});
$(".home").click(function(e){
     loadClick($(this));
    
});

$(".liked-song").click(function(e){
  loadClick($(this));

});
$(".search").click(function(e){
  playing = false;
  if(!$(this).hasClass("selected")){
    $(".option").removeClass("selected");
    $(this).addClass("selected");
   setTimeout(()=>{
    load_tracks = liked_Song;
    loadSearch($(this));
},300)
}
})

$(".Create-playlist").click(function(e){
    let playlist = $(`<div class = "playlist-song  option" id = "PlayList ${Number(mlib)+1}"> PlayList-${Number(mlib)+1}</div>`);
    $(".playlist").append(playlist);
    NewPlayList();
     if($(".library").hasClass("selected")){
         loadLibrary($(this));
     }
    $(".playlist-song").click(function(e){
        loadClick($(this));
    })
})


$(".library").click(function(e){
  loadLibrary($(this));
})
function loadLibrary(ele){
    $(".song-display").html(``);
    playing = false;
    if(!ele.hasClass("selected")){
      $(".option").removeClass("selected");
      ele.addClass("selected");
    }

    let liked = $(`<div class="playList-display">
    <div class=" display-box liked-song-box">
        <div>Liked Song</div>
        <div class="countSong">${liked_Song[0].length} songs</div>
        <div class="play-button play"><i class="fad fa-play-circle"></i></div>
    </div>
    </div>`);
    $(".song-display").append(liked);

    for(let i = 0 ; i < library.length;i++){
        let name = '';
        if(isNaN(library[i][0]))
        name = " "+library[i][0];
        else
        name = "PlayList " +(Number(library[i][0])+1);
        console.log(name);
        let playList = $(`<div class="display-box playList-box " id ="${name}"> <div>${name}</div>
        <div class="countSong">${library[i][1].length} songs</div>
        <div class="play-button play"><i class="fad fa-play-circle"></i></div>
      </div>`);
        playList.click(function(e){
            loadClick($(this));
        })
      $(".playList-display").append(playList);

  }
  
  $(".liked-song-box").click(function(e){
       loadClick($(".liked-song"));
  })
}
function loadPlayList(ele){
    $(".playlist").html(``);
    
    for(let i =0;i<library.length;i++ ){
        let name = '';
        if(isNaN(library[i][0]))
        name =" "+library[i][0];
        else
        name = "PlayList " +(Number(library[i][0])+1);
        let playlist = $(`<div class = "playlist-song  option" id = "${name}">${name}</div>`);
        $(".playlist").append(playlist);
        $(".playlist-song").click(function(e){
            
            load_tracks = home_track_list;
                loadClick($(this));
        })
    }
   
}
function loadClick(ele){
    playing = false;
    if(ele.hasClass("playing"))
    playing = true;
    getHomeTracks();
      getLikedSong();
      readPlayList();
    if(!ele.hasClass("selected")){
        $(".option").removeClass("selected");
        ele.addClass("selected");
       setTimeout(()=>{
           if(ele.hasClass("home")){
           load_tracks = home_track_list;
           } 
           else if(ele.hasClass("liked-song"))
           load_tracks = liked_Song;
           else if(ele.hasClass("playlist-song") || ele.hasClass("playList-box")){
            
              let id = ele.attr("id").split(" ")[1];
              if(!isNaN(id)){
              id = Number(id) -1;
              }
              let name = '';
              for(let i = 0 ; i < library.length;i++){
                  if(library[i][0] == id){
                    if(isNaN(library[i][0]))
                    name = library[i][0];
                    else
                    name = "PlayList " +(Number(library[i][0])+1);
                    load_tracks[1] = name;
                    load_tracks[0] = library[i][1];
                  }
              }
    
           }

        loadPlayList(ele);  
        loadDetails(ele);
        loadBox(ele);
        loadTracks(ele);
    },200)
    }
}
function loadSearch(ele){
    console.log("d");
    $(".song-display").html(``);
    let search = $(`<div class="song-container">
      <div class="search-bar">
     <input type="search" class = "search-box" placeholder ="Search">
    </div>
    <div class="song-list-container">
    </div>
   </div>`)
    $(".song-display").append(search);
    getLikedSong();
    setTimeout(()=>{
    $(".search-box").on("input",function(e){
       load_tracks[1] = "search"; 
       load_tracks[0] = home_track_list[0].filter((trackObj)=>{
           return (trackObj.name.toLowerCase()).includes($(this).val().toLowerCase()) ||(trackObj.artist.toLowerCase()).includes($(this).val().toLowerCase())
       })
       if($(this).val().length >2){
        $(".option").removeClass("playing");   
        playing = false;
       loadTracks($(this));
      }
      else{
         $(".song-list-container").html(''); 
      }
    })
    })
    
    $(".search-box").focus();

}

function loadDetails(ele){
    $(".song-display").html(``);
    $(".display-details").html(``);
    index = NaN;
    let songDisplay = $(`<div class="display-details">
    <div class="image-container"></div>
    <div class="details-container">
        <div class="name-container">${load_tracks[1]}</div>
        <div class="total-songs">${load_tracks[0].length} Songs</div>
    </div>
</div>`)

if(ele.hasClass("playlist-song") || ele.hasClass("playList-box")){
    let editBox = $('<div class = "edit-playList"><i class="fal fa-edit "></i></div>');
    songDisplay.children(".details-container").append(editBox);

    editBox.click(function(e){
        let id = ele.attr("id").split(" ")[1];
              if(!isNaN(id)){
              id = Number(id) -1;
              }
        e.stopPropagation();
        $(".playList-option-modal").remove();
        let modal = $(`<div class="playList-option-modal">
                       <div class = "delete-modal option ">Delete</div>
                       <div class = "rename-modal option">Rename</div>
        </div>`);
        modal.css({ "left": e.pageX+10 , "top" :e.pageY-5});
        $(".container").append(modal);
        $(".delete-modal").click(function(e){
         deleteLibrary(id);
         playerReset();
         loadClick($(".home"));
        })
        $(".rename-modal").click(function(e){
            e.stopPropagation();
            $(".playList-rename-modal").remove();
         let rename = $(`<div class="playList-rename-modal">
         <div class="playList-modal-title">Rename Playlist</div>
         <div class="playList-modal-input-box">
             <span class="playList-modal-input-title">Rename playList to:</span>
             <input class="playList-modal-input" type="text" />
         </div>
         <div class="playList-modal-confirmation">
             <div class="button yes-modal">OK</div>
             <div class="button no-modal">Cancel</div>
         </div>
     </div>`)
     rename.css({ "left": e.pageX+10 , "top" :e.pageY-5});
     rename.click(function(e){
         e.stopPropagation();
     })
     $(".container").append(rename);
     $(".playList-modal-input").focus();
     $(".no-modal").click(function (e) {
         $(".playList-rename-modal").remove();
     });
     $(".yes-modal").click(function (e) {
         console.log("d");
         renamePlayList(ele);
     });
     $(".sheet-modal-input").keypress(function (e) {
         if (e.key == "Enter") {
             renamePlayList(ele);
         }
     })
   })
        
})
}
 $(".song-display").append(songDisplay);
}
function renamePlayList(ele){
    let id = ele.attr("id").split(" ")[1];
    if(!isNaN(id)){
    id = Number(id) -1;
    }
 let newPlayListName = $(".playList-modal-input").val();
 let isValid = true;
 for(let i = 0 ; i < library.length;i++){
     if(library[i][0] == newPlayListName)
     {
         isValid = false;
         break;
     }
 }
 console.log(library);
 if(newPlayListName.length >0 && isValid ){
    let newLibrary = [[[],[]]];
    for(let  i = 0 ; i <library.length;i++ ){
        newLibrary[i] = [[],[]];
        if(library[i][0] == id){
            newLibrary[i][0].push(newPlayListName); 
            newLibrary[i][1] = library[i][1];
        }
        else{
            newLibrary[i] = library[i];
        }
    }
       library = newLibrary;
       console.log(library);
       $(".playList-rename-modal").remove();
       editPlayList();
       $(".name-container").text(newPlayListName);
       loadPlayList();
    
       
 }else{
    $(".rename-error").remove();
        $(".playList-rename-modal").append(`
            <div class="rename-error"> Sheet Name is not valid or Sheet already exists! </div>
        `)
 }
}

function loadBox(ele){
    $(".song-container").remove();
    let playButton = '';
    if(load_tracks[0].length>0){
        if(ele.hasClass("playing")){
            if(isPlaying){
            playButton = `<i class="fad fa-pause-circle"></i>`;
            }
            else{
                playButton = `<i class="fad fa-play-circle"></i>`;    
            }
        }
        else
    playButton = `<i class="fad fa-play-circle"></i>`;
    }

    let box = $(`<div class="song-container">
    <div class="menu-container">
        <div class="play-button">${playButton}</div>
    </div>
    <div class="song-list-container">
    </div>
   </div>`)

    
    $(".song-display").append(box);
}

  

function loadTracks(ele){ 
    clearInterval(updateTrack);
    $(".song-list-container").html('');
    let btn = '<i class="far fa-plus"></i>'
    if(ele.hasClass("playlist-song") || ele.hasClass("playList-box")){
     btn = '<i class="fal fa-minus"></i>';
    }
    if(load_tracks[0].length >0){

        let songHeader = $(`<div class="song-header">
        <div class="index"></div>
         <div class="song-image"></div>
         <div class="title">TITLE</div>
         <div class="artist-name">ARTIST</div>
         <div class="like-song-button"></div>
     </div>`);
     $(".song-list-container").append(songHeader);

     for(let i = 0 ; i < load_tracks[0].length;i++){
         let isLiked = false;
         let like_icon ;
         let temp_likeIndex = getIndexLikedSong(i);

         if(!isNaN(temp_likeIndex) && !ele.hasClass("search-box"))
         {   
             isLiked = true;
             like_icon = $(`<i class="fas fa-heart"></i>`);
         }

         let song  = $(`<div class="song-list" id="list-id-${i}">
         <div class="index-song" id ="id${i}">${i+1}</div>
          <div class="song-image" style = "background-image :url(https://source.unsplash.com/Qrspubmx6kE/640x360)"></div>
          <div class="title" id = "song-title">${load_tracks[0][i].name}</div>
          <div class="artist-name">${load_tracks[0][i].artist}</div>
          <div class="like-song-button" ></div>
          <div class = "more-option-button">${btn}</div>
         </div>`);
         
         $(".song-list-container").append(song);

         if(isLiked){
            song.children(".like-song-button").append(like_icon);
            song.children(".like-song-button").addClass("isLiked-song");  
         }
         if(ele.hasClass("playing") &&! ele.hasClass("search-box")){
             if(i == track_index){
             song.addClass("isPlaying");
             song.children(".index-song").html(`<i class="far fa-waveform"></i>`);
             }
         }
         song.mouseenter(function(e){
             $(this).addClass("song-list-hover");

             if($(this).hasClass("isPlaying")){
                 if(isPlaying)
                 $(this).children(".index-song").html(`<i class="fas fa-pause"></i>`)
                 else{
                 $(this).children(".index-song").html(`<i class="fas fa-play"></i>`);
                 }
                }else{
                $(this).children(".index-song").html(`<i class="fas fa-play"></i>`);
                }

             if(!$(this).children(".like-song-button").hasClass("isLiked-song"))
            $(this).children(".like-song-button").html(`<i class="fal fa-heart"></i>`);
         })
         song.mouseleave(function(e){
            $(this).removeClass("song-list-hover");

            if($(this).hasClass("isPlaying"))
            $(this).children(".index-song").html(`<i class="far fa-waveform"></i>`);
            else
            $(this).children(".index-song").text(`${i+1}`);

            if(!$(this).children(".like-song-button").hasClass("isLiked-song"))
            $(this).children(".like-song-button").html(``);
        })
     }
     
    }

    $(".more-option-button").click(function(e){
        let ind = $(this).parent(".song-list").attr("id").split("-")[2];
        e.preventDefault();
        e.stopPropagation();
        console.log("d");
        if(ele.hasClass("playlist-song") || ele.hasClass("playList-box")){
            let id = ele.attr("id").split(" ")[1];
            if(!isNaN(id)){
            id = Number(id) -1;
            }    
                
                if($(this).parent(".song-list").hasClass("isPlaying") ){ 
                $(this).parent(".song-list").removeClass("isPlaying"); 
                ele.removeClass("playing");     
                playerReset();
                }   
                index = "sdkk";
          deleteLibrarySong(id,ind);
          loadBox(ele);
          loadTracks(ele);  
        }
        else{
        $(".song-option-modal").remove();
        let modal = $(`<div class="song-option-modal">
      </div>`);
        modal.css({ "left": e.pageX-100 , "top" :e.pageY-5});
        

    for(let i =0;i<library.length;i++ ){

        let name = '';
             if(isNaN(library[i][0]))
              name = " " +library[i][0];
              else
              name = "PlayList " +(Number(library[i][0])+1);
        let playlist = $(`<div class = "playlist-song addPlayList option" id = "${name}"> ${name}</div>`);
        modal.append(playlist);
        playlist.click(function(e){
            addLibrarySong(i,ind);
        })
        
    }
    $(".container").append(modal);
        }
    })
   

    $(".index-song").click(function(e){

        if($(this).parent(".song-list").hasClass("isPlaying")){
        if(isPlaying){
        $(this).html(`<i class="fas fa-pause"></i>`); 
        }  
        else{
         $(this).html(`<i class="fas fa-play"></i>`);    
        }
        playPauseTrack();
        }
        else{
            changePlayingSong(this);
            $(`#id${index}`).html(`<i class="fas fa-pause"></i>`);
            addPlaying(ele);
            playCurrTrack(index);
        }
        
     })
     $(".play-button").click(function(e){
         
        if(isNaN(index)){
        index = 0;
        changePlayingSong();
        playCurrTrack(0);
        addPlaying(ele);
        }
       else{
        playPauseTrack();
       }
    
    })
     $(".song-list").dblclick(function(e){
         
        index = $(this).attr("id").split("-")[2];
        changePlayingSong();
        addPlaying(ele);
        playCurrTrack(index);
     })
     $(".like-song-button").click(function(e){

         let ind = $(this).parent(".song-list").attr("id").split("-")[2];
        if($(this).hasClass("isLiked-song")){
          $(this).removeClass("isLiked-song");
          $(this).html(`<i class="fal fa-heart"></i>`)
          let likeIndex = getIndexLiked(ind);
          unlikeSong(ind)
          console.log(likeIndex+ "+"+ track_index);
          if(ele.hasClass("liked-song") || $(".liked-song").hasClass("playing")){
          if($(this).parent(".song-list").hasClass("isPlaying") || likeIndex == track_index){ 
          $(this).parent(".song-list").removeClass("isPlaying");      
          playerReset();
          index = "sdsd";
          } 
          if(ele.hasClass("liked-song")){
          loadBox(ele);
          loadTracks(ele);
        }
       }  
          
        }else{
         $(this).addClass("isLiked-song");
         $(this).html(`<i class="fas fa-heart"></i>`)
         likeSong(ind);
        }
     })
      updateTrack = setInterval(function(e){
         if(ele.hasClass("playing")){
           if(index != track_index)
           { 
             index = track_index;  
             changePlayingSong();   
           }
         }
     },300)
}

function playerReset(){
    $(".option").removeClass("playing");
          playing = false;
    clearInterval(updateTrack);
    pauseTrack();
     resetPlayer();
}
function addPlaying(ele){
    if(!ele.hasClass("playing")){
     $(".option").removeClass("playing");   
     ele.addClass("playing"); 
     playing= true;
    }
}
function playCurrTrack(index){
    track_list = load_tracks;
    loadTrack(index);  
    playTrack();
}
function changePlayingSong(ele){
    if(playing ){
    let id = $(".isPlaying").attr("id").split("-")[2];
    $(".isPlaying").children(".index-song").text(`${Number(id)+1}`); 
    }
    if(ele)
    index = $(ele).attr("id").split("id")[1];

    $(".song-list").removeClass("isPlaying");
    $(`#id${index}`).html(`<i class="far fa-waveform"></i>`);
    $(`#id${index}`).parent(".song-list").addClass("isPlaying");    
    
}


