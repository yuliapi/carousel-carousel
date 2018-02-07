function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Div = function () {
    function Div(c) {
        _classCallCheck(this, Div);

        this.class = c;
    }

    Div.prototype.render = function render() {
        var div = document.createElement('div');
        div.classList.add(this.class);
        return div;
    };

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

    BulletItem.prototype.render = function render() {

        return this.item;
    };

    BulletItem.prototype.activate = function activate() {
        this.item.classList.add('active');
    };

    BulletItem.prototype.deactivate = function deactivate() {
        this.item.classList.remove('active');
    };

    return BulletItem;
}();

var Slide = function () {
    function Slide(slide) {
        _classCallCheck(this, Slide);

        this.slide = slide;
    }

    Slide.prototype.checkAndRemoveClass = function checkAndRemoveClass(name) {
        if (this.slide.classList.contains(name)) {
            this.slide.classList.remove(name);
        }
    };

    Slide.prototype.addNewClass = function addNewClass(name) {
        if (this.slide && this.slide.classList.contains(name) === false) {
            this.slide.classList.add(name);
        }
    };

    return Slide;
}();

var Carousel = function () {
    function Carousel(e) {
        _classCallCheck(this, Carousel);

        this.element = e;
        this.slides = this.element.getElementsByClassName('carousel-slide');
        this.modifiedSlides = [];
        for (var _iterator = this.slides, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var s = _ref;

            this.modifiedSlides.push(new Slide(s));
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

    Carousel.prototype.addEventListener = function addEventListener(component, action) {
        component.addEventListener('click', action.bind(this));
    };

    Carousel.prototype.getDirectionControls = function getDirectionControls() {
        var nextButton = void 0,
            previousButton = void 0;
        for (var _iterator2 = this.controls, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
                if (_i2 >= _iterator2.length) break;
                _ref2 = _iterator2[_i2++];
            } else {
                _i2 = _iterator2.next();
                if (_i2.done) break;
                _ref2 = _i2.value;
            }

            var button = _ref2;


            if (button.dataset.target === 'next') {
                nextButton = button;
            }
            if (button.dataset.target === 'previous') {
                button.setAttribute('disabled', true);
                previousButton = button;
            }
        }
        return { nextButton: nextButton, previousButton: previousButton };
    };

    Carousel.prototype.activate = function activate() {
        this.initStyles();
        this.addCarouselProgress();
        this.element.style.visibility = 'visible';
    };

    Carousel.prototype.addCarouselProgress = function addCarouselProgress() {
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
    };

    Carousel.prototype.initStyles = function initStyles() {
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
    };

    Carousel.prototype.nextSlide = function nextSlide() {
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
    };

    Carousel.prototype.prevSlide = function prevSlide() {
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
    };

    Carousel.prototype.showSlide = function showSlide(n) {
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
    };

    Carousel.prototype.switchActive = function switchActive(targetNumber) {
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

        for (var _iterator3 = this.bullets, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
            var _ref3;

            if (_isArray3) {
                if (_i3 >= _iterator3.length) break;
                _ref3 = _iterator3[_i3++];
            } else {
                _i3 = _iterator3.next();
                if (_i3.done) break;
                _ref3 = _i3.value;
            }

            var b = _ref3;

            b.deactivate();
        }
        this.bullets[targetNumber].activate();
    };

    Carousel.prototype.switchDisabled = function switchDisabled(target, value) {
        for (var _iterator4 = this.controls, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
            var _ref4;

            if (_isArray4) {
                if (_i4 >= _iterator4.length) break;
                _ref4 = _iterator4[_i4++];
            } else {
                _i4 = _iterator4.next();
                if (_i4.done) break;
                _ref4 = _i4.value;
            }

            var c = _ref4;

            if (c.dataset.target === target) {
                c.disabled = value;
            }
        }
    };

    return Carousel;
}();