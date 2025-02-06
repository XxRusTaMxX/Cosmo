
// script.js
document.addEventListener('click', function(event) {
  createCoin(event.clientX, event.clientY);
});

function createCoin(x, y) {
  const coin = document.createElement('div');
  coin.classList.add('coin');
  coin.style.left = `${x - 25}px`; // Center the coin on the click position
  coin.style.top = `${y - 25}px`;
  coin.style.animationDuration = `${Math.random() * 2 + 1}s`; // Randomize fall speed
  coin.style.animationName = 'fall, spin'; // Apply both animations

  const coinContainer = document.getElementById('coin-container');
  coinContainer.appendChild(coin);
  
  // Remove the coin after the animation ends to prevent DOM clutter
  coin.addEventListener('animationend', function() {
      coinContainer.removeChild(coin);
  });
}

let card = document.querySelector(".card");
let boxBoundingRect = card.getBoundingClientRect();
let boxCenter=  boxBoundingRect.left + boxBoundingRect.width/2

let card_blick = document.querySelectorAll(".card-blick");

function changeBorderColor(border, value) {
  let b = document.querySelectorAll(`.card-thick-${border}`);
  b.forEach(e => {
    e.style.setProperty('background-position', `0 ${value}%`);
  })
}

document.addEventListener("mousemove", e => {
    let angle = Math.max(Math.min(21, Math.atan2((e.pageX - boxCenter) * 0.002, (Math.PI) )*(180 / Math.PI)), -21);     
    card.style.transform = `rotateY(${angle}deg) rotateZ(9deg)`;
    
    card_blick.forEach(e => {
      e.style.left = `-${200 + ((angle - 1) * 10)}%`
    })
    let pos = 50 + (angle / 21 * 50);
    changeBorderColor('left', pos);
    changeBorderColor('right', pos)
})

audioctr = 0;
document.addEventListener("click", function (event) {
  const bulletURLs = [
    "../pictures/what-are-aventurines-coins-tokens-v0-mo7ozklcdnvc1.webp"
  ];

  // Get the coordinates of the pointer over the DOM
  const x = event.clientX + window.scrollX;
  const y = event.clientY + window.scrollY;
  
  // // Create a div element for the white hole
  const hole = document.createElement("img");
  hole.className = "hole";
  hole.src =
    "../pictures/what-are-aventurines-coins-tokens-v0-mo7ozklcdnvc1.webp";
  hole.alt = "";

  // Set the position of the div based on pointer coordinates
  hole.style.left = x - 50 + "px"; // Adjusted for 10px radius
  hole.style.top = y - 50 + "px"; // Adjusted for 10px radius
  // hole.style.backgroundImage = `url(${bulletURLs[0]})`;

  // Add the created div to the DOM
  // document.body.appendChild(hole);
  const audio_element = document.createElement("audio");
  audio_element.src = "../pictures/coin-flip-88793.mp3";
  audio_element.id = `audio-${audioctr}`;
  document.body.appendChild(audio_element);
  const sound = document.getElementById(`audio-${audioctr}`);
  audioctr++;
  sound.play();
});