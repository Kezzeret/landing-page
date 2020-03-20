let recentArray = [
    {
        image: ["../img/recent/photo-1.png", "../img/recent/photo-2.png", "../img/recent/photo-3.png"],
        title: 'Lorem ipsum dolor sit amet',
        text: 'Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium.',
        dd: '30',
        mm: 'Sep.'
    },
    {
        image: ["../img/recent/photo-2.png"],
        title: 'Lorem ipsum dolor sit amet',
        text: 'Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium.',
        dd: '30',
        mm: 'Sep.'
    },
    {
        image: ["../img/recent/photo-3.png", "../img/recent/photo-4.jpg"],
        title: 'Lorem ipsum dolor sit amet',
        text: 'Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium.',
        dd: '30',
        mm: 'Sep.'
    },
    {
        image: ["../img/recent/photo-4.jpg"],
        title: 'Lorem ipsum dolor sit amet',
        text: 'Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium.',
        dd: '30',
        mm: 'Sep.'
    },
];

const firstItem = document.getElementById('first-recent-item');
const secondItem = document.getElementById('second-recent-item');
const thirdItem = document.getElementById('third-recent-item');
const nextRecent = document.querySelector('.section-recent-inner-buttons-right');
const previousRecent = document.querySelector('.section-recent-inner-buttons-left');
const recentBubblesFirst = document.querySelector('.section-recent-inner-slider-item-image-bubbles.first');
const recentBubbles = document.querySelectorAll('.section-recent-inner-slider-item-image-bubbles');

function loadRecent() {
    console.log(recentBubbles);
    console.log(recentBubbles[0]);
    console.log(recentBubbles[0].children);
    firstItem.children[0].style.background = `url("${recentArray[0].image[0]}") no-repeat 50% 50%`;
    firstItem.children[0].children[0].children[0].innerText = recentArray[0].dd;
    firstItem.children[0].children[0].children[1].innerText = recentArray[0].mm;
    firstItem.children[1].innerText = recentArray[0].title;
    firstItem.children[2].innerText = recentArray[0].text;

    secondItem.children[0].style.background = `url("${recentArray[1].image[0]}") no-repeat 50% 50%`;
    secondItem.children[0].children[0].children[0].innerText = recentArray[1].dd;
    secondItem.children[0].children[0].children[1].innerText = recentArray[1].mm;
    secondItem.children[1].innerText = recentArray[1].title;
    secondItem.children[2].innerText = recentArray[1].text;

    thirdItem.children[0].style.background = `url("${recentArray[2].image[0]}") no-repeat 50% 50%`;
    thirdItem.children[0].children[0].children[0].innerText = recentArray[2].dd;
    thirdItem.children[0].children[0].children[1].innerText = recentArray[2].mm;
    thirdItem.children[1].innerText = recentArray[2].title;
    thirdItem.children[2].innerText = recentArray[2].text;

    loadRecentBubbles();
}

nextRecent.addEventListener('click', e => {
    let item = recentArray[0];
    recentArray = recentArray.slice(1, recentArray.length);
    recentArray.push(item);
    loadRecent();
});

previousRecent.addEventListener('click', e => {
    let item = recentArray[recentArray.length - 1];
    recentArray = recentArray.slice(0, recentArray.length - 1);
    recentArray.unshift(item);
    loadRecent();
});

function loadRecentBubbles() {
    let n = 0;
    while (n < 3) {
        if (recentArray[n].image.length > 1) {
            recentArray[n].image.forEach((item, i) => {
                let button = document.createElement('button');
                button.className = 'section-recent-inner-slider-item-image-bubbles-button-full';
                button.id = `recent-bubble-button-${n}-${i}`;
                recentBubbles[n].append(button);
            })
            document.getElementById(`recent-bubble-button-${n}-0`).className = 'section-slider-bubbles-button-empty';
        }
        n++;
    }
}

loadRecent();