"use strict";

var recentArray = [{
    image: ["./img/recent/photo-1.png", "./img/recent/photo-2.png", "./img/recent/photo-3.png"],
    title: 'Lorem ipsum dolor sit amet',
    text: 'Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium.',
    dd: '30',
    mm: 'Sep.',
    active: 0
}, {
    image: ["./img/recent/photo-2.png"],
    title: 'Lorem ipsum dolor sit amet',
    text: 'Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium.',
    dd: '30',
    mm: 'Sep.',
    active: 0
}, {
    image: ["./img/recent/photo-3.png"],
    title: 'Lorem ipsum dolor sit amet',
    text: 'Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium.',
    dd: '30',
    mm: 'Sep.',
    active: 0
}, {
    image: ["./img/recent/photo-4.jpg", "./img/recent/photo-3.png"],
    title: 'Lorem ipsum dolor sit amet',
    text: 'Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium.',
    dd: '30',
    mm: 'Sep.',
    active: 0
}];
var items = [document.getElementById('first-recent-item'), document.getElementById('second-recent-item'), document.getElementById('third-recent-item')];
var nextRecent = document.querySelector('.section-recent-inner-buttons-right');
var previousRecent = document.querySelector('.section-recent-inner-buttons-left');
var recentBubbles = document.querySelectorAll('.section-recent-inner-slider-item-image-bubbles');

function loadRecent() {
    let i = 0;
    while (i < recentBubbles.length) {
        if (recentBubbles[i].children.length > 0) {
            var n = 0;

            while (recentBubbles[i].children.length > 0) {
                recentBubbles[i].children[n].remove();
            }
        }
        i++;
    }
    /*
    recentBubbles.forEach(function (item, i) {
        if (recentBubbles[i].children.length > 0) {
            var n = 0;

            while (recentBubbles[i].children.length > 0) {
                recentBubbles[i].children[n].remove();
            }
        }
    });
     */
    items.forEach(function (item, i) {
        items[i].children[0].style.background = "url(\"".concat(recentArray[i].image[recentArray[i].active], "\") no-repeat 50% 50%");
        items[i].children[0].children[0].children[0].innerText = recentArray[i].dd;
        items[i].children[0].children[0].children[1].innerText = recentArray[i].mm;
        items[i].children[1].innerText = recentArray[i].title;
        items[i].children[2].innerText = recentArray[i].text;
    });
    loadRecentBubbles();
}

previousRecent.addEventListener('click', function (e) {
    var item = recentArray[0];
    recentArray = recentArray.slice(1, recentArray.length);
    recentArray.push(item);
    loadRecent();
});
nextRecent.addEventListener('click', function (e) {
    var item = recentArray[recentArray.length - 1];
    recentArray = recentArray.slice(0, recentArray.length - 1);
    recentArray.unshift(item);
    loadRecent();
});

function loadRecentBubbles() {
    var n = 0;

    while (n < 3) {
        if (recentArray[n].image.length > 1) {
            recentArray[n].image.forEach(function (item, i) {
                var button = document.createElement('button');
                button.className = 'section-recent-inner-slider-item-image-bubbles-button-full';
                button.id = "recent-bubble-button-".concat(n, "-").concat(i);
                recentBubbles[n].appendChild(button);
            });
            document.getElementById("recent-bubble-button-".concat(n, "-").concat(recentArray[n].active)).className = 'section-slider-bubbles-button-empty';
        }

        n++;
    }
}

items[0].addEventListener('click', changeImage(items[0], 0));
items[1].addEventListener('click', changeImage(items[1], 1));
items[2].addEventListener('click', changeImage(items[2], 2));

function changeImage(currentItem, currentIndex) {
    var number;
    return function (e) {
        var dots = Array.from(currentItem.children[0].children[1].children);
        var targetBubble = e.target.closest('button');
        if (!targetBubble) return;
        dots.some(function(e, i) {
            if (e == targetBubble) {
                number = i;
                return true;
            }
        });
        recentArray[currentIndex].active = number;
        dots.forEach(function (item, i) {
            dots[i].className = 'section-slider-bubbles-button-full';
        });
        dots[number].className = 'section-slider-bubbles-button-empty';
        currentItem.children[0].style.background = "url(\"".concat(recentArray[currentIndex].image[number], "\") no-repeat 50% 50%");
    };
}

loadRecent();