export async function loadAudio(context: AudioContext, path: string) {
  const response = await fetch(path);
  const buffer = await response.arrayBuffer();
  return await context.decodeAudioData(buffer);
}

export function wait(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}
