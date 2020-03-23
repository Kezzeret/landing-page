let recentArray = [
    {
        image: ["./img/recent/photo-1.png", "./img/recent/photo-5.png", "./img/recent/photo-6.png"],
        title: 'Lorem ipsum dolor sit amet',
        text: 'Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium.',
        dd: '30',
        mm: 'Sep.',
        active: 0
    },
    {
        image: ["./img/recent/photo-2.png"],
        title: 'Lorem ipsum dolor sit amet',
        text: 'Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium.',
        dd: '30',
        mm: 'Sep.',
        active: 0
    },
    {
        image: ["./img/recent/photo-3.png"],
        title: 'Lorem ipsum dolor sit amet',
        text: 'Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium.',
        dd: '30',
        mm: 'Sep.',
        active: 0
    },
    {
        image: ["./img/recent/photo-4.png", "./img/recent/photo-7.png"],
        title: 'Lorem ipsum dolor sit amet',
        text: 'Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium.',
        dd: '30',
        mm: 'Sep.',
        active: 0
    },
];

const items = [
    document.getElementById('first-recent-item'),
    document.getElementById('second-recent-item'),
    document.getElementById('third-recent-item')
]

const nextRecent = document.querySelector('.section-recent-inner-buttons-right');
const previousRecent = document.querySelector('.section-recent-inner-buttons-left');
const recentBubbles = document.querySelectorAll('.section-recent-inner-slider-item-image-bubbles');

function loadRecent() {
    let i = 0;
    while (i < recentBubbles.length) {
        if (recentBubbles[i].children.length > 0)
        {
            let n = 0;
            while (recentBubbles[i].children.length > 0) {
                recentBubbles[i].removeChild(recentBubbles[i].children[n]);
            }
        }
        i++
    }
    items.forEach((item, i) => {
        items[i].children[0].style.background = `url("${recentArray[i].image[recentArray[i].active]}") no-repeat 50% 50%`;
        items[i].children[0].children[0].children[0].innerText = recentArray[i].dd;
        items[i].children[0].children[0].children[1].innerText = recentArray[i].mm;
        items[i].children[1].innerText = recentArray[i].title;
        items[i].children[2].innerText = recentArray[i].text;
    })

    loadRecentBubbles();
}

previousRecent.addEventListener('click', e => {
    let item = recentArray[0];
    recentArray = recentArray.slice(1, recentArray.length);
    recentArray.push(item);
    loadRecent();
});

nextRecent.addEventListener('click', e => {
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
                recentBubbles[n].appendChild(button);
            })
            document.getElementById(`recent-bubble-button-${n}-${recentArray[n].active}`).className = 'section-slider-bubbles-button-empty';
        }
        n++;
    }
}

items[0].addEventListener('click', changeImage(items[0], 0));
items[1].addEventListener('click', changeImage(items[1], 1));
items[2].addEventListener('click', changeImage(items[2], 2));

function changeImage(currentItem, currentIndex) {
    let number;
    return (e) => {
        let dots = Array.from(currentItem.children[0].children[1].children);
        const targetBubble = e.target.closest('button');
        if (!targetBubble)
            return;
        dots.some(function(e, i) {
            if (e == targetBubble) {
                number = i;
                return true;
            }
        });
        //number = dots.findIndex(dot => dot === targetBubble);
        recentArray[currentIndex].active = number;
        dots.forEach((item, i) => {
            dots[i].className = 'section-slider-bubbles-button-full';
        })
        dots[number].className = 'section-slider-bubbles-button-empty';
        currentItem.children[0].style.background = `url("${recentArray[currentIndex].image[number]}") no-repeat 50% 50%`;
    }
}

loadRecent();