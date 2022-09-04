const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const durationElem = document.getElementById('duration');
const currentTimeElem = document.getElementById('current-time')
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//  Music
const songs = [
  {
    name: 'jacinto-1',
    displayName: 'Electric Chill Machine',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-2',
    displayName: 'Seven Nation Army (Remix)',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-3',
    displayName: 'Goodnight, Disco Queen',
    artist: 'Jacinto Design',
  },
  {
    name: 'metric-1',
    displayName: 'Front Row (Remix)',
    artist: 'Metric/Jacinto Design',
  },
  {
    name: 'jawhara',
    displayName: 'Jawharatul Kamal(The Golden Pearl)',
    artist: 'Abdul RAsheed',
  },
];

let songIndex = 0;
const prevSong = () => {
    songIndex--;
    if(songIndex <= -1) {
      songIndex = 0
      prevBtn.classList.add('prev-btn-disabled')
    } else {
      nextBtn.classList.remove('next-btn-disabled')
      loadSongs(songs[songIndex])
      playSong()
    }
    
}
const nextSong = () => {
    songIndex++;
    if(songIndex >= songs.length) {
      songIndex = songs.length-1;
      nextBtn.classList.add('next-btn-disabled')
    } else {
      prevBtn.classList.remove('prev-btn-disabled')
      loadSongs(songs[songIndex])
      playSong()
    }
}

// Update DOM
const loadSongs = song => {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`
    image.src = `img/${song.name}.jpg`
}

loadSongs(songs[songIndex])

let isPlaying = false;

const playSong = () => {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}
const pauseSong = () => {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

const controlPlay = () => {
    isPlaying ? pauseSong() : playSong()
}

// update progress bar & time
const updateProgressBar = event => {
  const { currentTime, duration } = event.srcElement
// Update the progress bar width
const progressPercent = (currentTime/duration) * 100
progress.style.width = `${progressPercent}%`;
// Computing song duration
const durationInMin = Math.floor(duration / 60)
let durationInSec = Math.floor(duration % 60);
if(durationInSec < 10) {
  durationInSec = `0${durationInSec}`
}
// Delay switching duration element to avoid NaN
if(durationInSec) {
  durationElem.textContent = `${durationInMin}:${durationInSec}`
}

// start timing
const currentTimeInMin = Math.floor(currentTime / 60)
let currentTimeInSec = Math.floor(currentTime % 60);
if(currentTimeInSec < 10) {
  currentTimeInSec = `0${currentTimeInSec}`
}
// Delay switching currentTime element to avoid NaN
if(currentTimeInSec) {
  currentTimeElem.textContent = `${currentTimeInMin}:${currentTimeInSec}`
}
}

  function setProgressBar (event) {
  const width = this.clientWidth
  const clickedPart  = event.offsetX  
  const { duration } = music;
  music.currentTime = ((clickedPart/width) * duration);
}

// Event Listeners

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
playBtn.addEventListener('click',controlPlay)
music.addEventListener('timeupdate', updateProgressBar)
music.addEventListener('ended', nextSong)
progressContainer.addEventListener('click', setProgressBar)
