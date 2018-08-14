function loadSlides() {
    var slider = document.querySelector('.slider');
    var wrapper = document.querySelector('.slider__wrapper');
    var slides = document.querySelectorAll('.slider__slide');

    function addPoints() {
        var points = document.createElement('div');
        points.className = 'js-slider__points';
        slider.appendChild(points);
        for (var i = 0; i < slides.length; i++) {
            var point = document.createElement('span');
            point.className = 'js-slider__point';
            points.appendChild(point);
        }
        points.children[0].classList.add('js-slider__point_active');
    }

    function animateSlides() {
        var active = document.querySelector('.slider__slide_active');
        var activePoint = document.querySelector('.js-slider__point_active');
        var myPoints = document.querySelector('.js-slider__points');
        active.classList.remove('slider__slide_active');
        activePoint.classList.remove('js-slider__point_active');
        if (active.nextElementSibling != null) {
            active.nextElementSibling.classList.add('slider__slide_active');
            activePoint.nextElementSibling.classList.add('js-slider__point_active');
        } else {
            wrapper.children[0].classList.add('slider__slide_active');
            myPoints.children[0].classList.add('js-slider__point_active');
        }

    }

    function mobileSlides() {
        var prev = document.querySelector('.arrow_prev');
        var next = document.querySelector('.arrow_next');

        next.onclick = function () {
            var active = document.querySelector('.slider__slide_active');
            var activePoint = document.querySelector('.js-slider__point_active');
            var myPoints = document.querySelector('.js-slider__points');
            active.classList.remove('slider__slide_active');
            activePoint.classList.remove('js-slider__point_active');
            if (active.nextElementSibling != null) {
                active.nextElementSibling.classList.add('slider__slide_active');
                activePoint.nextElementSibling.classList.add('js-slider__point_active');
            } else {
                wrapper.children[0].classList.add('slider__slide_active');
                myPoints.children[0].classList.add('js-slider__point_active');
            }
        }
        prev.onclick = function () {
            var active = document.querySelector('.slider__slide_active');
            var activePoint = document.querySelector('.js-slider__point_active');
            var myPoints = document.querySelector('.js-slider__points');
            active.classList.remove('slider__slide_active');
            activePoint.classList.remove('js-slider__point_active');
            if (active.previousElementSibling != null) {
                active.previousElementSibling.classList.add('slider__slide_active');
                activePoint.previousElementSibling.classList.add('js-slider__point_active');
            } else {
                wrapper.lastElementChild.classList.add('slider__slide_active');
                myPoints.lastElementChild.classList.add('js-slider__point_active');
            }
        }

    }

    function clickPoint() {
        var myPoints = document.querySelector('.js-slider__points');

        for (var i = 0; i < myPoints.children.length; i++) {
            (function (index) {
                myPoints.children[i].onclick = function () {
                    var active = document.querySelector('.slider__slide_active');
                    var activePoint = document.querySelector('.js-slider__point_active');
                    active.classList.remove('slider__slide_active');
                    activePoint.classList.remove('js-slider__point_active');
                    wrapper.children[index].classList.add('slider__slide_active');
                    myPoints.children[index].classList.add('js-slider__point_active');
                }
            })(i);
        }
    }

    setInterval(animateSlides, 5000);
    addPoints();
    clickPoint();
    mobileSlides();

}

document.addEventListener('DOMContentLoaded', loadSlides);
