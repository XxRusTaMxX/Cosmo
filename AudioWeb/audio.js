let audioctr = 0;
let currentAudio = null; // Track the currently playing audio

document.addEventListener("click", function (event) {
  const clickedElement = event.target;
  console.log("Clicked element:", clickedElement);

  // Check if there's a currently playing audio and stop it
  if (currentAudio) {
    currentAudio.pause(); // Stop the current audio
    currentAudio.currentTime = 0; // Reset the audio to the beginning
  }

  // Create a new audio element
  const audio_element = document.createElement("audio");
  audio_element.src = clickedElement.getAttribute("data-sound");
  audio_element.id = `audio-${audioctr}`;
  document.body.appendChild(audio_element);

  // Play the new audio
  const sound = document.getElementById(`audio-${audioctr}`);
  audioctr++;
  sound.play();

  // Update the currently playing audio
  currentAudio = sound;
});