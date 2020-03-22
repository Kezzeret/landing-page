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

if (!Array.from) {
    Array.from = (function () {
        var toStr = Object.prototype.toString;
        var isCallable = function (fn) {
            return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
        };
        var toInteger = function (value) {
            var number = Number(value);
            if (isNaN(number)) { return 0; }
            if (number === 0 || !isFinite(number)) { return number; }
            return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
        };
        var maxSafeInteger = Math.pow(2, 53) - 1;
        var toLength = function (value) {
            var len = toInteger(value);
            return Math.min(Math.max(len, 0), maxSafeInteger);
        };

        // The length property of the from method is 1.
        return function from(arrayLike/*, mapFn, thisArg */) {
            // 1. Let C be the this value.
            var C = this;

            // 2. Let items be ToObject(arrayLike).
            var items = Object(arrayLike);

            // 3. ReturnIfAbrupt(items).
            if (arrayLike == null) {
                throw new TypeError("Array.from requires an array-like object - not null or undefined");
            }

            // 4. If mapfn is undefined, then let mapping be false.
            var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
            var T;
            if (typeof mapFn !== 'undefined') {
                // 5. else
                // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
                if (!isCallable(mapFn)) {
                    throw new TypeError('Array.from: when provided, the second argument must be a function');
                }

                // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
                if (arguments.length > 2) {
                    T = arguments[2];
                }
            }

            // 10. Let lenValue be Get(items, "length").
            // 11. Let len be ToLength(lenValue).
            var len = toLength(items.length);

            // 13. If IsConstructor(C) is true, then
            // 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
            // 14. a. Else, Let A be ArrayCreate(len).
            var A = isCallable(C) ? Object(new C(len)) : new Array(len);

            // 16. Let k be 0.
            var k = 0;
            // 17. Repeat, while k < len… (also steps a - h)
            var kValue;
            while (k < len) {
                kValue = items[k];
                if (mapFn) {
                    A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
                } else {
                    A[k] = kValue;
                }
                k += 1;
            }
            // 18. Let putStatus be Put(A, "length", len, true).
            A.length = len;
            // 20. Return A.
            return A;
        };
    }());
}