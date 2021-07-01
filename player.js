

function playerLoad(){
 $(".player").remove();    
let player = $(`<div class="player">
<div class="details">
    <div class="track-art"></div>
    <div class="track-details">
        <div class="track-name">Track Name</div>
        <div class="track-artist">Track Artist</div>
    </div>
</div>
<div class="song">
    <div class="buttons">
        <div class="prev-track"><i class="fa fa-step-backward fa-1.5x"></i></div>
        <div class="toggle-play"><i class="fa fa-play-circle fa-2x"></i></div>
        <div class="next-track"><i class="fa fa-step-forward fa-1.5x"></i></div>
    </div>
    <div class="seek">
     <div class="song-seek">
         <div class="current-time">00:00</div>
         <input type="range" min = "0" max = "10000"
         value = "0" class="song-seek-slider">
         <div class="total-duration">00:00</div>
     </div>    
    </div>
</div>
<div class="volume">
    <div class="seek">
        <div class="volume-seek">
            <div class="icon-volume"><i class="fa fa-volume-down"></i></div>
            <input type="range" min="0" max="100"
            value="80" class="volume-seek-slider">
        </div>
    </div>
</div>
</div>`);
$(".container").append(player);
}

playerLoad();
let currTrack = document.createElement('audio');
let track_index = 0;
let isPlaying = false;
let ismute = false;
let updateTimer;
let updateTime = true;

function loadTrack(index){
    track_index = index; 
    resetPlayer();

    let path = `${track_list[0][track_index].path}`;
    currTrack.src = path;
    currTrack.load();
    $(".song-seek-slider").val(0);
    $(".track-art").css("background-image", "url(" + track_list[0][track_index].image+ ")");
    $(".track-name").text(track_list[0][track_index].name);
    $(".track-artist").text(track_list[0][track_index].artist);
    setTotalDuration();
    seekVolume();
    updateTimer = setInterval(seekUpdate,100);
    currTrack.addEventListener("ended",nextTrack);
    
}
function resetPlayer(){
    clearInterval(updateTimer); 
    $("audio").remove();
    $(".song-seek-slider").val(0);
    $(".current-time").text("00:00");
    $("total-duration").text("00:00");
    $(".track-name").text("Track Name");
    $(".track-artist").text("Track Index");
}
function playPauseTrack(){
    if(isPlaying){
        pauseTrack();
      }
      else{
          if(currTrack.readyState)
          playTrack();
      }
}
function pauseTrack(){
    currTrack.pause();
    isPlaying = false;
    $(".toggle-play").html('<i class="fa fa-play-circle fa-2x"></i>');
    $(".play-button").html(`<i class="fad fa-play-circle"></i>`);
}
function playTrack(){
    currTrack.play();
        isPlaying = true;
        $(".toggle-play").html(`<i class="fa fa-pause-circle fa-2x"></i>`);
        $(".play-button").html(`<i class="fad fa-pause-circle"></i>`);
}
function nextTrack(){
    if(track_index <track_list[0].length-1){
        track_index++;
        loadTrack(track_index);
        playTrack();
    }
}
function prevTrack(){
    if(track_index >0){
        track_index--;
        loadTrack(track_index);
        playTrack();
    }
}
function seekSong(){
    let seekTime = currTrack.duration*($(".song-seek-slider").val())/10000;
    currTrack.currentTime = seekTime;
    updateStartTime();
}
function seekVolume(){
let volume = $(".volume-seek-slider").val();
if(!ismute){
currTrack.volume = volume/100;
if(volume <30)
$(".icon-volume").html(`<i class="fa fa-volume-down"></i>`);
else if(volume <70)
$(".icon-volume").html(`<i class="fas fa-volume"></i>`);
else
$(".icon-volume").html(`<i class="fa fa-volume-up"></i>`);
}
}
function seekUpdate(){
    if(isPlaying){
        let sliderValue = (currTrack.currentTime*10000)/currTrack.duration

        if(updateTime){
        $(".song-seek-slider").val(sliderValue);
        updateStartTime();
        }
    }
}
function updateStartTime(currentTime){
    let currentMinutes;
    let currentSeconds
    if(currentTime){
         currentMinutes = Math.floor(currentTime / 60);
         currentSeconds = Math.floor(currentTime - currentMinutes * 60); 
    }else{
         currentMinutes = Math.floor(currTrack.currentTime / 60);
         currentSeconds = Math.floor(currTrack.currentTime - currentMinutes * 60);
    }

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    $(".current-time").text(currentMinutes + ":" + currentSeconds);
}
function getTotalTime(){
    let durationMinutes = Math.floor(currTrack.duration / 60);
    let durationSeconds = Math.floor(currTrack.duration - durationMinutes * 60);

    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; } 
    return durationMinutes + ":" + durationSeconds;   
}
function setTotalDuration(){
    let totalTime = setInterval(function(){
        let total = getTotalTime();
        if(!isNaN(total.split(":")[0])){
        $(".total-duration").text(total);
         clearTimeout(totalTime);
        }
      },50);
}
$(".toggle-play").click(function(e){
    playPauseTrack();
})
$(".next-track").click(function(e){
    nextTrack();
})
$(".prev-track").click(function(e){
   prevTrack();
})
$(".song-seek-slider").on("input",function(e){
    updateTime=false;
    let seekTime = currTrack.duration*($(".song-seek-slider").val())/10000;
    updateStartTime(seekTime);
})
$(".song-seek-slider").on("change",function(e){
    updateTime=true;
    seekSong();
})
$(".volume-seek-slider").click(function(e){
    seekVolume();
})
$(".icon-volume").click(function(e){
    if(ismute){
      ismute = false;
      seekVolume();
    }else{
        currTrack.volume = 0;
        ismute = true;
        $(this).html(`<i class="fas fa-volume-mute"></i>`);
    }
})
seekVolume();
