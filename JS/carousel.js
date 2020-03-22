const array = [
    {
        url: './img/slider-background.png',
        title: 'Unique and Modern Design',
        subtitle: 'Portfolio PSD Template',
        info: 'Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum.'
    },
    {
        url: './img/slider-background-1.jpg',
        title: '2 Unique and Modern Design',
        subtitle: '2 Portfolio PSD Template',
        info: '2 Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum.'
    },
    {
        url: './img/slider-background-2.jpg',
        title: '3 Unique and Modern Design',
        subtitle: '3 Portfolio PSD Template',
        info: '3 Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum.'
    }
];


const background = document.getElementById('slider');
const title = document.getElementById('slider-title');
const subtitle = document.getElementById('slider-subtitle');
const info = document.getElementById('slider-info');
const bubbles = document.querySelector('.section-slider-bubbles');
const buttonLeftQuery = document.querySelector('.section-slider-wrapper-leftButton');
const buttonRightQuery = document.querySelector('.section-slider-wrapper-rightButton');
let currentI = 0;
let lastI = 0;
let timer;

function loadBubbles() {
    array.forEach((item, i) => {
        let button = document.createElement('button');
        button.className = 'section-slider-bubbles-button-full';
        button.id = `bubble-button-${i}`;
        bubbles.appendChild(button);
    })
    document.getElementById('bubble-button-0').className = 'section-slider-bubbles-button-empty';
}

function changeSlider()
{
    clearInterval(timer);
    background.style.background = `url(${array[currentI].url}) no-repeat 50% 50%`;
    background.style.backgroundSize = 'cover';
    title.innerText = array[currentI].title;
    subtitle.innerText = array[currentI].subtitle;
    info.innerText = array[currentI].info;
    let currentButton = document.getElementById(`bubble-button-${currentI}`);
    let lastButton = document.getElementById(`bubble-button-${lastI}`);
    currentButton.className = 'section-slider-bubbles-button-empty';
    lastButton.className = 'section-slider-bubbles-button-full';
    nextSlide();
}

buttonLeftQuery.addEventListener('click', e => {
    currentI--;
    if (currentI < 0)
    {
        currentI = array.length - 1;
        lastI = 0;
        changeSlider()
    }
    else
    {
        lastI = currentI + 1;
        changeSlider();
    }
})

buttonRightQuery.addEventListener('click', e => {
    currentI++;
    if (currentI == array.length)
    {
        currentI = 0;
        lastI = array.length - 1;
        changeSlider();
    }
    else
    {
        lastI = currentI - 1;
        changeSlider();
    }
})

bubbles.addEventListener('click', e => {
    let dots = Array.from(bubbles.children);
    const targetBubble = e.target.closest('button');
    if (!targetBubble)
        return;
    lastI = currentI;
    currentI = dots.findIndex(dot => dot === targetBubble);
    if (lastI == currentI)
        return;
    changeSlider();
})

function nextSlide () {
    timer = setInterval(() => {
        currentI++;
        if (currentI == array.length) {
            currentI = 0;
            lastI = array.length - 1;
            changeSlider();
        } else {
            lastI = currentI - 1;
        }
        changeSlider()
    }, 20000);
}

loadBubbles();
nextSlide();
