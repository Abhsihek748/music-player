let dbAccess ;
let track_list=[[],[]]  ;
let load_tracks;
  let home_track_list = [[],[]];
  let liked_Song =[[],[]] ;
  let library = [];
  let mlib = 0;
  let track_data =  track_list = [
    {
      name: "Ed Sheeran - Shape of You",
      artist: "Ed Sheeran",
      image: "Image URL",
      path: "https://mp3.filmisongs.com/go.php?id=Shape%20of%20You%20Mp3%20Ed%20Sheeran.mp3"
    },
    {
        name: "Wiz Khalifa - See You Again",
        artist: "iz Khalifa",
        image: "Image URL",
        path: "https://mp3.filmisongs.com/go.php?id=See%20You%20Again%20Mp3%20By%20Charlie%20Puth%20and%20Wiz%20Khalifa.mp3"
      },
      {
        name: "Mark Ronson - Uptown Funk ",
        artist: "Mark Ronson",
        image: "Image URL",
        path: "https://mp3.filmisongs.com/go.php?id=Uptown%20Funk%20Mp3%20By%20Bruno%20Mars%20and%20Mark%20Ronson.mp3"
      },
      {
        name: "Katy Perry - Roar",
        artist: "Katy Perry",
        image: "Image URL",
        path: "https://dexo.mp3snow.com/ac42d9355c60d8245c037/OneRepublic%20-%20Counting%20Stars%20%28Official%20Music%20Video%29.mp3"
      },
      {
        name: "OneRepublic - Counting Stars",
        artist: "OneRepublic",
        image: "Image URL",
        path: "https://dexo.mp3snow.com/ac42d9355c60d8245c037/OneRepublic%20-%20Counting%20Stars%20%28Official%20Music%20Video%29.mp3"
      },
      {
        name: "Ed Sheeran - Thinking Out Loud",
        artist: "Ed Sheeran",
        image: "Image URL",
        path: "https://dexo.mp3snow.com/a47d98fe5c60d80b9bf79/Alan%20Walker%20-%20Faded.mp3"
      },
      {
        name: "Alan Walker - Faded",
        artist: "Alan Walker",
        image: "Image URL",
        path: "https://dexo.mp3snow.com/a47d98fe5c60d80b9bf79/Alan%20Walker%20-%20Faded.mp3"
      },
      {
        name: "Taylor Swift - Shake It Off",
        artist: "Taylor Swiftc",
        image: "Image URL",
        path: "https://mp3.filmisongs.com/go.php?id=Shake%20It%20Off%20-%20Taylor%20Swift.mp3"
      },
      {
        name: "Major Lazer & DJ Snake - Lean On",
        artist: "Major Lazer Official",
        image: "Image URL",
        path: "https://dexo.mp3snow.com/a885ef085c60d7eea1999/Major%20Lazer%20%26%20DJ%20Snake%20-%20Lean%20On%20%28feat.%20M%C3%98%29%20%28Official%20Music%20Video%29.mp3"
      },
      {
        name: "Maroon 5 - Girls Like You ft. Cardi B",
        artist: "Maroon 5",
        image: "Image URL",
        path: "https://mp3.filmisongs.com/go.php?id=Girls%20Like%20You%20-%20Maroon%205,%20Cardi%20B.mp3"
      },
      {
        name: "Ed Sheeran - Perfect",
        artist: "Ed Sheeran",
        image: "Image URL",
        path: "https://www.youtube.com/watch?v=2Vv-BfVoq4g&list=PLhsz9CILh357zA1yMT-K5T9ZTNEU6Fl6n&index=15"
      },
      
      {
        name: "Adele - Hello",
        artist: "Adele",
        image: "Image URL",
        path: "https://dexo.mp3snow.com/256b05705c60d7be8ff26/Calvin%20Harris%20-%20This%20Is%20What%20You%20Came%20For%20%28Official%20Video%29%20ft.%20Rihanna.mp3"
      },
      {
        name:  "Shakira - Waka Waka",
        artist: "Shakira",
        image: "Image URL",
        path: "https://mp3.filmisongs.com/go.php?id=Waka%20Waka%20-%20Shakira.mp3"
      },
      {
        name: "The Chainsmokers - Closer",
        artist: "The Chainsmokers",
        image: "Image URL",
        path: "https://mp3.filmisongs.com/go.php?id=Closer%20-%20The%20Chainsmokers.mp3"
      },
      {
        name: "Charlie Puth - We Don't Talk Anymore",
        artist: "Charlie Puth",
        image: "Image URL",
        path: "https://mp3.filmisongs.com/go.php?id=We%20Dont%20Talk%20Anymore%20-%20Charlie%20Puth,%20Selena%20Gomez.mp3"
      },
      {
        name: "Clean Bandit - Rockabye",
        artist: "Clean Bandit",
        image: "Image URL",
        path: "https://mp3.filmisongs.com/go.php?id=Rockabye%20-%20Clean%20Bandit%20Ft%20Sean%20Paul,%20Anne-Marie.mp3"
      },
      {
        name: "Calvin Harris - This Is What You Came For",
        artist: "Calvin Harris",
        image: "Image URL",
        path: "https://www.youtube.com/watch?v=kOkQ4T5WO9E&list=PLhsz9CILh357zA1yMT-K5T9ZTNEU6Fl6n&index=24"
      },
      {
        name: "twenty one pilots Stressed Out",
        artist: "Fueled By Ramen",
        image: "Image URL",
        path: "https://dexo.mp3snow.com/de24f1145c60d7a4e2a69/twenty%20one%20pilots%20Stressed%20Out%20%5BOFFICIAL%20VIDEO%5D.mp3"
      },
      {
        name: "Ellie Goulding - Love Me Like You Do",
        artist: "elliegoulding",
        image: "Image URL",
        path: "https://dexo.mp3snow.com/40d3fe985c60d7160ece7/Ellie%20Goulding%20-%20Love%20Me%20Like%20You%20Do.mp3"
      },
      {
        name: "DJ Snake - Taki Taki",
        artist: "DJ Snake",
        image: "Image URL",
        path: "https://mp3.filmisongs.com/go.php?id=Taki%20Taki%20Mp3%20Song%20by%20DJ%20Snake.mp3"
      },
      {
        name: "Shawn Mendes - Treat You Better",
        artist: "Shawn Mendes",
        image: "Image URL",
        path: "https://mp3.filmisongs.com/go.php?id=Treat%20You%20Better%20-%20Shawn%20Mendes.mp3"
      },
      {
        name: "The Chainsmokers & Coldplay - Something Just Like This",
        artist: "The Chainsmokers",
        image: "Image URL",
        path: "https://dexo.mp3snow.com/1e13723a5c60d75aed513/The%20Chainsmokers%20%26%20Coldplay%20-%20Something%20Just%20Like%20This.mp3"
      },
    
  ];

 let request = indexedDB.open("music",1);
request.addEventListener("success",function(){

   dbAccess = request.result;
})
request.addEventListener("upgradeneeded",function(){
  let db = request.result;
  db.createObjectStore("all_song",{keyPath:"mId"});
  db.createObjectStore("liked_song",{keyPath:"mId"});
  db.createObjectStore("library",{keyPath:"mId"});
})

request.addEventListener("error",function(){
  alert("some error occured")
})

function addAllSong(){
    console.log(home_track_list);
    let tx = dbAccess.transaction("all_song","readwrite");
    let all_songObject = tx.objectStore("all_song");
    let data = {
        mId:1,
        "name":'All Song',
        "all_song":track_data,
    }
    all_songObject.add(data);
}
setTimeout(()=>{
    addAllSong();
},200)

function getHomeTracks(){
    let tx = dbAccess.transaction("all_song","readonly");
    let galleryObject = tx.objectStore("all_song");
    let req = galleryObject.openCursor();

    req.addEventListener("success",()=>{
        let cursor = req.result;
        if(cursor){
            home_track_list[0] = cursor.value.all_song;
            home_track_list[1] = cursor.value.name;
        }
    })
}
function getLikedSong(){
    let tx = dbAccess.transaction("liked_song","readonly");
    let liked_SongObject = tx.objectStore("liked_song");
    let req = liked_SongObject.openCursor();
   let like = [];
    req.addEventListener("success",()=>{
        let cursor = req.result;
        if(cursor){
            liked_Song[0] = cursor.value.liked_song;
            liked_Song[1] = cursor.value.name
        }
    })
    like = liked_Song;
    return like;
}
function getIndexLikedSong(index){
    let like = liked_Song;
    let t =0;
    // if($(".selected").hasClass("search")){
    //     t= 200;
    //     getLikedSong();
    //     setTimeout(()=>{
    //         like = liked_Song;
    //         for(let i = 0 ; i < like[0].length;i++){
    //             if(like[0][i].name == load_tracks[0][index].name){
    //                 console.log(like[0][i].name);
    //                 console.log(load_tracks[0][index].name);
    //                 return i;
    //             }
    //         }
    //     },200);
    // } else{
        like = liked_Song;
        for(let i = 0 ; i < like[0].length;i++){
            if(like[0][i].name == load_tracks[0][index].name){
                console.log(like[0][i].name);
                console.log(load_tracks[0][index].name);
                return i;
            }
        }
    
     
    
    return "sfvs";
}
function getIndexLiked(index){
    console.log(track_list[1]);
    for(let i = 0 ; i < liked_Song[0].length;i++){
        if(liked_Song[0][i].name == track_list[0][index].name){
            return i;
        }
    }
}
function unlikeSong(index){
        i = getIndexLikedSong(index);
        if(i >=0)
        liked_Song[0].splice(i,1);
        editLikedSong();
}
function likeSong(index){
    liked_Song[0].push(load_tracks[0][index]);
    editLikedSong();
}

function editLikedSong(){
    let tx = dbAccess.transaction("liked_song","readwrite");
    let liked_SongObject = tx.objectStore("liked_song");

    liked_SongObject.delete(1);
        let data = {
        mId:1,
        "name" : "Liked Song",
        "liked_song":liked_Song[0],
    }
    liked_SongObject.add(data);

}
function NewPlayList(){
    let newPlayList = [[mlib],[]];
    mlib += 1;
    library.push(newPlayList);
    editPlayList();
}
function deleteLibrary(ind){
  library = library.filter((libObj)=>{
      return ind != libObj[0];
  })
  editPlayList();
}
function addLibrarySong(lind,ind){
    console.log(load_tracks[0][ind])
    if(!library[lind][1].includes(load_tracks[0][ind])){
    library[lind][1].push(load_tracks[0][ind]);
    editPlayList();
    }
}
function deleteLibrarySong(lind,ind){
    for(let i = 0 ; i < library.length;i++){
        if(library[i][0] == lind)
        library[i][1].splice(ind,1);
    }
   editPlayList();

}
function readPlayList(){
    let tx = dbAccess.transaction("library","readonly");
    let libraryObject = tx.objectStore("library");
    let req = libraryObject.openCursor();

    req.addEventListener("success",()=>{
        let cursor = req.result;
        if(cursor){
            library = cursor.value.library;
        }
    }) 
}
function editPlayList(){
    let tx = dbAccess.transaction("library","readwrite");
    let libraryObject = tx.objectStore("library");

    libraryObject.delete(1);
        let data = {
        mId:1,
        "library":library,
    }
    libraryObject.add(data);
}




