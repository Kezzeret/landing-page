"use strict";

var array = [{
  url: './img/slider-background.png',
  title: 'Unique and Modern Design',
  subtitle: 'Portfolio PSD Template',
  info: 'Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum.'
}, {
  url: './img/slider-background-1.jpg',
  title: '2 Unique and Modern Design',
  subtitle: '2 Portfolio PSD Template',
  info: '2 Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum.'
}, {
  url: './img/slider-background-2.jpg',
  title: '3 Unique and Modern Design',
  subtitle: '3 Portfolio PSD Template',
  info: '3 Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum.'
}];
var background = document.getElementById('slider');
var title = document.getElementById('slider-title');
var subtitle = document.getElementById('slider-subtitle');
var info = document.getElementById('slider-info');
var bubbles = document.querySelector('.section-slider-bubbles');
var buttonLeftQuery = document.querySelector('.section-slider-wrapper-leftButton');
var buttonRightQuery = document.querySelector('.section-slider-wrapper-rightButton');
var currentI = 0;
var lastI = 0;
var timer;

function loadBubbles() {
  array.forEach(function (item, i) {
    var button = document.createElement('button');
    button.className = 'section-slider-bubbles-button-full';
    button.id = "bubble-button-".concat(i);
    bubbles.appendChild(button);
  });
  document.getElementById('bubble-button-0').className = 'section-slider-bubbles-button-empty';
}

function changeSlider() {
  clearInterval(timer);
  background.style.background = "url(".concat(array[currentI].url, ") no-repeat 50% 50%");
  background.style.backgroundSize = 'cover';
  title.innerText = array[currentI].title;
  subtitle.innerText = array[currentI].subtitle;
  info.innerText = array[currentI].info;
  var currentButton = document.getElementById("bubble-button-".concat(currentI));
  var lastButton = document.getElementById("bubble-button-".concat(lastI));
  currentButton.className = 'section-slider-bubbles-button-empty';
  lastButton.className = 'section-slider-bubbles-button-full';
  nextSlide();
}

buttonLeftQuery.addEventListener('click', function (e) {
  currentI--;

  if (currentI < 0) {
    currentI = array.length - 1;
    lastI = 0;
    changeSlider();
  } else {
    lastI = currentI + 1;
    changeSlider();
  }
});
buttonRightQuery.addEventListener('click', function (e) {
  currentI++;

  if (currentI == array.length) {
    currentI = 0;
    lastI = array.length - 1;
    changeSlider();
  } else {
    lastI = currentI - 1;
    changeSlider();
  }
});
bubbles.addEventListener('click', function (e) {
  var dots = Array.from(bubbles.children);
  var targetBubble = e.target.closest('button');
  if (!targetBubble) return;
  lastI = currentI;
  currentI = dots.findIndex(function (dot) {
    return dot === targetBubble;
  });
  if (lastI == currentI) return;
  changeSlider();
});

function nextSlide() {
  timer = setInterval(function () {
    currentI++;

    if (currentI == array.length) {
      currentI = 0;
      lastI = array.length - 1;
      changeSlider();
    } else {
      lastI = currentI - 1;
    }

    changeSlider();
  }, 20000);
}

loadBubbles();
nextSlide();