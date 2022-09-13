const music = document.querySelector("audio");
const cover = document.getElementById("cover");
const play = document.getElementById("play");
const title=document.getElementById("title");
const artist=document.getElementById("artist");
const prev=document.getElementById("prev");
const next=document.getElementById("next");
// const progress = document.getElementById("progress");
// const progressContainer= document.getElementById("progress_container");
// const currentTime=document.getElementById("current_time");
// const duration=document.getElementById("duration");
const durationEl=document.getElementById("duration");
const currentTimeEl=document.getElementById("current_time");
const progressContainer=document.getElementById("progress_container");
const progressBar=document.getElementById("progress")
 const songs=[
{
    name:"romantic",
    title:"Romantic",
    artist:"Spinning Star",
},
{
    name:"instrumental",
    title:"Instrumental",
    artist:"Instru Star",
},
{
    name:"sad",
    title:"Sad",
    artist:"Aurora",
},
{
    name:"intense",
    title:"Intense",
    artist:"Pitch Star",
},
{
    name:"unbeatable",
    title:"Unbeatable",
    artist:"Rising Star",
}
]
let isPlaying = false;
const playMusic=()=>{
    isPlaying=true;
    music.play();
    play.classList.replace("fa-play","fa-pause");
    cover.classList.add("anime");
};
const pauseMusic=()=>{
    isPlaying=false;
    music.pause();
    play.classList.replace("fa-pause","fa-play");
    cover
    .classList.remove("anime");
}
play.addEventListener("click",()=>{

    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
});
const loadSong = (songs) =>{
    title.textContent = songs.title;
    artist.textContent =songs.artist;
    music.src="music/" + songs.name + ".mp3";
    cover.src="images1/" + songs.name + ".jpg";
};
 songIndex = 0;
// loadSong(songs[4]);
const nextSong=() =>{
songIndex=(songIndex +1)%songs.length;
loadSong(songs[songIndex]);
playMusic();
};
const prevSong=() =>{
songIndex=(songIndex -1 + songs.length) % songs.length;
loadSong(songs[songIndex]);
playMusic();
};
function updateProgress(e){
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // update progress bar width

        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
          durationSeconds = `0${durationSeconds}`;
        }
        // to avoid NaN
        if (durationSeconds) {
          durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // Calculate display for currentTime
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
          currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
      }
}


function setProgressBar(e){
    
    const width =this.clientWidth;
      console.log('width',width);
    const clickX=e.offsetX;
    console.log('clickX',clickX);

     const { duration }=music;
    music.currentTime=(clickX/width)*duration;
    
}





next.addEventListener("click",nextSong);
prev.addEventListener("click",prevSong);
music.addEventListener('timeupdate',updateProgress)
progressContainer.addEventListener("click",setProgressBar);
audio.addEventListener('ended', nextSong);