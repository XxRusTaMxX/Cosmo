Vue.config.devtools = true;

Vue.component('card', {
  template: `
    <div class="card-wrap"
      @mousemove="handleMouseMove"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      ref="card">
      <div class="card"
        :style="cardStyle" :data-sound="cardSound">
        <div class="card-bg" :style="[cardBgTransform, cardBgImage]"></div>
        <div class="card-info">
          <slot name="header"></slot>
          <slot name="content"></slot>
        </div>
      </div>
    </div>`,
  mounted() {
    this.width = this.$refs.card.offsetWidth;
    this.height = this.$refs.card.offsetHeight;
  },
  props: ['dataImage', 'dataSound'],
  data: () => ({
    width: 0,
    height: 0,
    mouseX: 0,
    mouseY: 0,
    mouseLeaveDelay: null }),

  computed: {
    mousePX() {
      return this.mouseX / this.width;
    },
    mousePY() {
      return this.mouseY / this.height;
    },
    cardStyle() {
      const rX = this.mousePX * 30;
      const rY = this.mousePY * -30;
      return {
        transform: `rotateY(${rX}deg) rotateX(${rY}deg)` };

    },
    cardSound() {
      return this.dataSound;
    },
    cardBgTransform() {
      const tX = this.mousePX * -40;
      const tY = this.mousePY * -40;
      return {
        transform: `translateX(${tX}px) translateY(${tY}px)` };

    },
    cardBgImage() {
      return {
        backgroundImage: `url(${this.dataImage})` };

    } },

  methods: {
    handleMouseMove(e) {
      this.mouseX = e.pageX - this.$refs.card.offsetLeft - this.width / 2;
      this.mouseY = e.pageY - this.$refs.card.offsetTop - this.height / 2;
    },
    handleMouseEnter() {
      clearTimeout(this.mouseLeaveDelay);
    },
    handleMouseLeave() {
      this.mouseLeaveDelay = setTimeout(() => {
        this.mouseX = 0;
        this.mouseY = 0;
      }, 1000);
    } } });



const app = new Vue({
  el: '#app' });

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