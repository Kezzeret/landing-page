const burgerMenu = document.getElementById('burger-menu');
const mobileMenu = document.getElementById('mobile-menu');

burgerMenu.addEventListener('click', e => {
    mobileMenu.classList.toggle('active');
    burgerMenu.classList.toggle('active');
})