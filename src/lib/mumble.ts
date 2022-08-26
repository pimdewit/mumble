export class Mumble {
  readonly gainNode: GainNode;
  readonly sources = new Set<AudioBufferSourceNode>();

  constructor(readonly audioContext: AudioContext, readonly buffer: AudioBuffer) {
    this.gainNode = new GainNode(audioContext);
  }

  newLetter() {
    const source = this.audioContext.createBufferSource();
    source.buffer = this.buffer;
    source.detune.value = 10000 + (Math.random() * 1000);
    source.connect(this.gainNode);
    source.start(0, 0);
    this.sources.add(source);
    source.addEventListener('ended', () => {
      this.sources.delete(source);
      source.disconnect();
    }, {once: true});

    return source;
  }
}
