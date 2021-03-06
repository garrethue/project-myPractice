import axios from "axios";

const getAudioContext = () => {
  AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioContent = new AudioContext();
  return audioContent;
};

const getAudio = async (next_pose) => {
  // load audio file from server
  const response = await axios.get(`/api/prompts/${next_pose}`, {
    responseType: "arraybuffer",
  });

  // create audio context
  const audioContext = getAudioContext();
  // create audioBuffer (decode audio file)
  const audioBuffer = await audioContext.decodeAudioData(response.data);

  // create audio source
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioContext.destination);

  // play audio
  source.start();
};
export default getAudio;
