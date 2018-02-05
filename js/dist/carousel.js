'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Div = function () {
    function Div(c) {
        _classCallCheck(this, Div);

        this.class = c;
    }

    _createClass(Div, [{
        key: 'render',
        value: function render() {
            var div = document.createElement('div');
            div.classList.add(this.class);
            return div;
        }
    }]);

    return Div;
}();

var BulletItem = function () {
    function BulletItem(carousel, number) {
        _classCallCheck(this, BulletItem);

        this.carousel = carousel;
        this.number = number;

        var item = document.createElement('li');
        item.classList.add('progress-bullet');
        if (this.number === 0) {
            item.classList.add("active");
        }
        var link = document.createElement('a');
        link.setAttribute('href', '#');
        link.setAttribute('data-slide', this.number);

        link.addEventListener('click', this.carousel.showSlide.bind(this.carousel, this.number));
        item.appendChild(link);

        this.item = item;
    }

    _createClass(BulletItem, [{
        key: 'render',
        value: function render() {

            return this.item;
        }
    }, {
        key: 'activate',
        value: function activate() {
            this.item.classList.add('active');
        }
    }, {
        key: 'deactivate',
        value: function deactivate() {
            this.item.classList.remove('active');
        }
    }]);

    return BulletItem;
}();

var Slide = function () {
    function Slide(slide) {
        _classCallCheck(this, Slide);

        this.slide = slide;
    }

    _createClass(Slide, [{
        key: 'checkAndRemoveClass',
        value: function checkAndRemoveClass(name) {
            if (this.slide.classList.contains(name)) {
                this.slide.classList.remove(name);
            }
        }
    }, {
        key: 'addNewClass',
        value: function addNewClass(name) {
            if (this.slide && this.slide.classList.contains(name) === false) {
                this.slide.classList.add(name);
            }
        }
    }]);

    return Slide;
}();

var Carousel = function () {
    function Carousel(e) {
        _classCallCheck(this, Carousel);

        this.element = e;
        this.slides = this.element.getElementsByClassName('carousel-slide');
        this.modifiedSlides = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this.slides[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var s = _step.value;

                this.modifiedSlides.push(new Slide(s));
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        this.controls = this.element.getElementsByClassName('slide-control');

        var _getDirectionControls = this.getDirectionControls(),
            nextButton = _getDirectionControls.nextButton,
            previousButton = _getDirectionControls.previousButton;

        this.nextButton = nextButton;
        this.previousButton = previousButton;
        this.addEventListener(this.nextButton, this.nextSlide);
        this.addEventListener(this.previousButton, this.prevSlide);
        this.bullets = [];
        this.currentActiveNumber = 0;
    }

    _createClass(Carousel, [{
        key: 'addEventListener',
        value: function addEventListener(component, action) {
            component.addEventListener('click', action.bind(this));
        }
    }, {
        key: 'getDirectionControls',
        value: function getDirectionControls() {
            var nextButton = void 0,
                previousButton = void 0;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.controls[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var button = _step2.value;


                    if (button.dataset.target === 'next') {
                        nextButton = button;
                    }
                    if (button.dataset.target === 'previous') {
                        button.setAttribute('disabled', true);
                        previousButton = button;
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return { nextButton: nextButton, previousButton: previousButton };
        }
    }, {
        key: 'activate',
        value: function activate() {
            this.initStyles();
            this.addCarouselProgress();
            this.element.style.visibility = 'visible';
        }
    }, {
        key: 'addCarouselProgress',
        value: function addCarouselProgress() {
            var wrapper = new Div('progress-wrapper');
            var progressWrapper = wrapper.render();
            var list = document.createElement('ul');
            for (var j = 0; j < this.modifiedSlides.length; j++) {
                var bullet = new BulletItem(this, j);
                list.appendChild(bullet.render());
                this.bullets.push(bullet);
            }
            console.log(this.bullets);
            var prevControl = this.previousButton.cloneNode(true);
            var nextControl = this.nextButton.cloneNode(true);
            this.addEventListener(prevControl, this.prevSlide);
            this.addEventListener(nextControl, this.nextSlide);

            progressWrapper.appendChild(prevControl);
            progressWrapper.appendChild(list);
            progressWrapper.appendChild(nextControl);

            var progress = new Div('carousel-progress');
            var carouselProgress = progress.render();
            carouselProgress.appendChild(progressWrapper);
            this.element.appendChild(carouselProgress);
        }
    }, {
        key: 'initStyles',
        value: function initStyles() {
            for (var i = 0; i < this.modifiedSlides.length; i++) {
                this.modifiedSlides[i].addNewClass('slide');
                if (i === 1) {
                    this.modifiedSlides[i].addNewClass('next');
                }
                if (i > 0) {
                    this.modifiedSlides[i].addNewClass('slide-right');
                }
                if (i === 0) {
                    this.modifiedSlides[i].addNewClass('active');
                }
            }
        }
    }, {
        key: 'nextSlide',
        value: function nextSlide() {
            if (this.currentActiveNumber === 0) {
                this.switchDisabled('previous', false);
            }
            if (this.currentActiveNumber !== this.modifiedSlides.length - 1) {
                this.switchActive(this.currentActiveNumber + 1);

                this.currentActiveNumber++;

                if (this.currentActiveNumber === this.modifiedSlides.length - 1) {
                    this.switchDisabled('next', true);
                }
            }
        }
    }, {
        key: 'prevSlide',
        value: function prevSlide() {
            if (this.currentActiveNumber + 1 === this.modifiedSlides.length) {
                this.switchDisabled('next', false);
            }
            if (this.currentActiveNumber !== 0) {
                this.switchActive(this.currentActiveNumber - 1);
                this.currentActiveNumber--;
            }
            if (this.currentActiveNumber === 0) {
                this.switchDisabled('previous', true);
            }
        }
    }, {
        key: 'showSlide',
        value: function showSlide(n) {
            n = parseInt(n);
            this.switchActive(n);
            if (n === this.modifiedSlides.length - 1) {
                this.switchDisabled('next', true);
            }
            if (this.currentActiveNumber === this.modifiedSlides.length - 1 && n < this.modifiedSlides.length - 1) {
                this.switchDisabled('next', false);
            }
            if (n === 0) {
                this.switchDisabled('previous', true);
            }
            if (this.currentActiveNumber === 0 && n > 0) {
                this.switchDisabled('previous', false);
            }
            this.currentActiveNumber = n;
        }
    }, {
        key: 'switchActive',
        value: function switchActive(targetNumber) {
            this.modifiedSlides[targetNumber].checkAndRemoveClass('slide-right');
            this.modifiedSlides[targetNumber].checkAndRemoveClass('slide-left');
            this.modifiedSlides[targetNumber].checkAndRemoveClass('next');
            this.modifiedSlides[targetNumber].checkAndRemoveClass('previous');

            this.modifiedSlides[targetNumber].addNewClass('active');

            for (var s = 0; s < targetNumber; s++) {
                this.modifiedSlides[s].addNewClass('slide-left');
                this.modifiedSlides[s].checkAndRemoveClass('slide-right');
                this.modifiedSlides[s].checkAndRemoveClass('active');
                this.modifiedSlides[s].checkAndRemoveClass('previous');
                this.modifiedSlides[s].checkAndRemoveClass('next');
            }
            for (var k = targetNumber + 1; k < this.modifiedSlides.length; k++) {
                this.modifiedSlides[k].addNewClass('slide-right');
                this.modifiedSlides[k].checkAndRemoveClass('slide-left');
                this.modifiedSlides[k].checkAndRemoveClass('active');
                this.modifiedSlides[k].checkAndRemoveClass('previous');
                this.modifiedSlides[k].checkAndRemoveClass('next');
            }
            if (this.modifiedSlides[targetNumber - 1]) {
                this.modifiedSlides[targetNumber - 1].addNewClass('previous');
            }

            if (this.modifiedSlides[targetNumber + 1]) {
                this.modifiedSlides[targetNumber + 1].addNewClass('next');
            }

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.bullets[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var b = _step3.value;

                    b.deactivate();
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            this.bullets[targetNumber].activate();
        }
    }, {
        key: 'switchDisabled',
        value: function switchDisabled(target, value) {
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this.controls[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var c = _step4.value;

                    if (c.dataset.target === target) {
                        c.disabled = value;
                    }
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }
        }
    }]);

    return Carousel;
}();

exports.default = Carousel;