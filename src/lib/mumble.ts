export class Mumble {
  readonly gainNode: GainNode;
  readonly sources = new Set<AudioBufferSourceNode>();

  constructor(
    readonly audioContext: AudioContext,
    readonly buffer: AudioBuffer
  ) {
    this.gainNode = new GainNode(audioContext);
  }

  newLetter(detune = 1000 + Math.random() * 10000, playbackRate = 0.2) {
    const source = this.audioContext.createBufferSource();
    source.buffer = this.buffer;
    source.detune.value = detune;
    source.connect(this.gainNode);
    source.playbackRate.value = playbackRate;
    source.start(0, 0);
    this.sources.add(source);
    source.addEventListener(
      'ended',
      () => {
        this.sources.delete(source);
        source.disconnect();
      },
      {once: true}
    );

    return source;
  }
}
