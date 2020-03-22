"use strict";

var burgerMenu = document.getElementById('burger-menu');
var mobileMenu = document.getElementById('mobile-menu');
burgerMenu.addEventListener('click', function (e) {
    console.log('click');
    mobileMenu.classList.toggle('active');
    burgerMenu.classList.toggle('active');
});