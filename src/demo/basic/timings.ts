import {MumbleCharacter} from './types';

export const timings = new Map<string, MumbleCharacter>();
export const vowels = ['a', 'e', 'i', 'o', 'u'];
export const consonants = [
  'b',
  'c',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  'm',
  'n',
  'p',
  'q',
  'r',
  's',
  't',
  'v',
  'w',
  'x',
  'y',
  'z',
  ' ',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  '"',
  "'",
  '`',
];
export const punctuation = ['.', ',', ':', '?', '!', '-'];

for (const glyph of vowels) {
  const delay = 10 + Math.random() * 100;
  const detune = -2000;
  timings.set(glyph, {delay, detune});
}

for (const glyph of consonants) {
  const delay = 30 + Math.random() * 150;
  const detune = Math.random() * 300;
  timings.set(glyph, {delay, detune});
}

for (const glyph of punctuation) {
  const delay = 200 + Math.random() * 600;
  const detune = Math.random() * -1000;
  timings.set(glyph, {delay, detune});
}
