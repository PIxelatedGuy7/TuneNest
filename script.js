console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let songid = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "She Looks So Perfect - 5SOS", filePath: "songs/1.mp3", coverPath: "covers/1.jpeg" ,duration:"3:38" },
    {songName: "Complicated - Avril Lavigne", filePath: "songs/2.mp3", coverPath: "covers/2.jpeg" ,duration:"4:13"},
    {songName: "Nothin On You feat Bruno", filePath: "songs/3.mp3", coverPath: "covers/3.jpeg" ,duration:"3:50"},
    {songName: "Toothbrush - DNCE", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" ,duration:"3:45"},
    {songName: "Golden - Harry Styles", filePath: "songs/5.mp3", coverPath: "covers/5.jpeg" ,duration:"3:28"},
    {songName: "Rude - MAGIC", filePath: "songs/6.mp3", coverPath: "covers/6.jpeg" ,duration:"3:45"},
    {songName: "Fireflies - Owl City", filePath: "songs/7.mp3", coverPath: "covers/7.jpeg" ,duration:"3:52"},
    {songName: "High Hopes - Panic At The Disco", filePath: "songs/8.mp3", coverPath: "covers/8.jpeg" ,duration:"3:16"},
    {songName: "Stuck on the puzzle", filePath: "songs/9.mp3", coverPath: "covers/9.jpeg" ,duration:"3:28"},
    {songName: "Hey Soul Sister - Train", filePath: "songs/10.mp3", coverPath: "covers/10.jpeg" ,duration:"3:38"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.getElementsByClassName("timestamp")[0].innerHTML = `${songs[i].duration} <i id=${i} class="far songItemPlay fa-play-circle"></i>`;



})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        let kk = document.getElementById("masterSongName").innerText;
        songItems.forEach((element, i) => { 
            
            const songNameElement = element.getElementsByClassName("songName")[0]; // Directly get the first element
        
            if (songNameElement && songNameElement.innerText.trim() === kk.trim()) {
                songid = i; 
                document.getElementById(`${i}`).classList.remove('fa-play-circle');
                document.getElementById(`${i}`).classList.add('fa-pause-circle');
            }

        });
        
        

    }
    else{
        audioElement.pause();
        document.getElementById(`${songid}`).classList.remove('fa-pause-circle');
        document.getElementById(`${songid}`).classList.add('fa-play-circle');
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

function next(){
        if(songIndex>=9){
            songIndex = 0;
            document.getElementById(`${songid}`).classList.remove('fa-pause-circle');
            document.getElementById(`${songid}`).classList.add('fa-play-circle');
            // for next song updating play pause
            document.getElementById(`${songIndex}`).classList.remove('fa-play-circle');
            document.getElementById(`${songIndex}`).classList.add('fa-pause-circle');
            
        }
        else{
            songIndex += 1;
            document.getElementById(`${songid}`).classList.remove('fa-pause-circle');
            document.getElementById(`${songid}`).classList.add('fa-play-circle');
            // for next song updating play pause
            document.getElementById(`${songIndex}`).classList.remove('fa-play-circle');
            document.getElementById(`${songIndex}`).classList.add('fa-pause-circle');
        }
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
}
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
    if (audioElement.currentTime == audioElement.duration){
        next();
    }
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})



Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => { 
        
        if (e.target.classList.contains('fa-play-circle')) {
    
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = `songs/${songIndex+1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        } else {
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            audioElement.pause();
            gif.style.opacity = 0;
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
        }
    });
});


document.getElementById('next').addEventListener('click', next);

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})