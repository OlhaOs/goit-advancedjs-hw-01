import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const TIME_UPDATE = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

getCurrentTime();

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay({ seconds }) {
  localStorage.setItem(TIME_UPDATE, seconds);
}

function getCurrentTime() {
  try {
    const data = localStorage.getItem(TIME_UPDATE) || 0;
    player.setCurrentTime(data);
  } catch (err) {
    console.log(err);
  }
}
