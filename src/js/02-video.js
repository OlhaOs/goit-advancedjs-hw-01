import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const TIME_UPDATE = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

getCurrentTime();

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(data) {
  localStorage.setItem(TIME_UPDATE, JSON.stringify(data));
}

function getCurrentTime() {
  try {
    const data = JSON.parse(localStorage.getItem(TIME_UPDATE)) || {};

    player
      .setCurrentTime(data.seconds)
      .then(function () {})
      .catch(function (error) {
        switch (error.name) {
          case 'RangeError':
            break;
          default:
            break;
        }
      });
  } catch (err) {
    console.log(err);
  }
}
