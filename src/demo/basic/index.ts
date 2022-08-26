import {Mumble} from '../../lib/mumble';
import {loadAudio, wait} from '../../lib/utilities';

const audioContext = new AudioContext();
const gainNode = new GainNode(audioContext);

async function initialise() {
  const audioSprite = await loadAudio(audioContext, './complete.mp3');

  gainNode.connect(audioContext.destination);

  const mumble = new Mumble(audioContext, audioSprite);
  mumble.gainNode.gain.value = 0.1;
  mumble.gainNode.connect(audioContext.destination);

  async function playSound() {
    mumble.newLetter();
    await wait(Math.round(Math.random() * 1000));
    await playSound();
  }

  window.addEventListener('click', playSound, {once: false});
}


initialise();
