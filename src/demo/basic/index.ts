import {Mumble} from '../../lib/mumble';
import {loadAudio, wait} from '../../lib/utilities';
import {timings} from './timings';
import {MumbleCharacter} from './types';

const input = document.getElementById('input') as HTMLInputElement;
const outputContainer = document.getElementById(
  'output-container'
) as HTMLParagraphElement;
const output = document.getElementById('output') as HTMLOutputElement;
const button = document.getElementById('button') as HTMLButtonElement;
const buttonSkip = document.getElementById('button-skip') as HTMLButtonElement;
const buttonStart = document.getElementById(
  'button-start'
) as HTMLButtonElement;

let audioContext: AudioContext;
let gainNode: GainNode;
let audioSprite: AudioBuffer;
let mumble: Mumble;
let skip = false;
let dialogue = '';

async function initialise() {
  audioContext = new AudioContext();
  gainNode = new GainNode(audioContext);
  audioSprite = await loadAudio(audioContext, './hats.mp3');
  button.disabled = false;

  gainNode.connect(audioContext.destination);

  mumble = new Mumble(audioContext, audioSprite);
  mumble.gainNode.gain.value = 0.1;
  mumble.gainNode.connect(audioContext.destination);

  (document.querySelector('.intro') as HTMLElement).hidden = true;
  (document.querySelector('.wrapper') as HTMLElement).hidden = false;
}

async function playSound(character: string, characterInfo: MumbleCharacter) {
  await wait(16);
  output.textContent += character;

  if (character !== ' ') {
    mumble.newLetter(characterInfo.detune, 1);
  }
  await wait(characterInfo.delay / 2);
}

async function readOut() {
  button.disabled = true;
  buttonSkip.disabled = false;

  dialogue = input.value || input.placeholder;
  const textArr = dialogue.split('');
  output.textContent = '';
  outputContainer.ariaLabel = dialogue;

  for (const character of textArr) {
    if (skip) continue;
    const c = character.toLowerCase();
    const characterInfo = timings.get(c);
    if (characterInfo) await playSound(character, characterInfo);
  }
  button.disabled = false;
  buttonSkip.disabled = true;
  skip = false;
}

function skipDialogue() {
  skip = true;
  output.textContent = dialogue;
}

button.addEventListener('click', readOut);
buttonSkip.addEventListener('click', skipDialogue);
buttonStart.addEventListener('click', initialise, {once: true});
