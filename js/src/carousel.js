class Div {
    constructor(c) {
        this.class = c;
    }

    render() {
        let div = document.createElement('div');
        div.classList.add(this.class);
        return div
    }
}

class BulletItem {
    constructor(carousel, number) {
        this.carousel = carousel;
        this.number = number;

        let item = document.createElement('li');
        item.classList.add('progress-bullet');
        if (this.number === 0) {
            item.classList.add("active")
        }
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.setAttribute('data-slide', this.number);

        link.addEventListener('click', this.carousel.showSlide.bind(this.carousel, this.number));
        item.appendChild(link);

        this.item = item
    }

    render() {

        return this.item
    }
    activate() {
        this.item.classList.add('active');
    }
    deactivate() {
        this.item.classList.remove('active')
    }
}

class Slide {
    constructor(slide) {
        this.slide = slide;
    }

    checkAndRemoveClass(name) {
        if (this.slide.classList.contains(name)) {
            this.slide.classList.remove(name)
        }
    }

    addNewClass(name) {
        if (this.slide && this.slide.classList.contains(name) === false) {
            this.slide.classList.add(name)
        }
    }
}

class Carousel {
    constructor(e) {
        this.element = e;
        this.slides = this.element.getElementsByClassName('carousel-slide');
        this.modifiedSlides = [];
        for (let s of this.slides) {
            this.modifiedSlides.push(new Slide(s))
        }

        this.controls = this.element.getElementsByClassName('slide-control');
        let {nextButton, previousButton} = this.getDirectionControls();
        this.nextButton = nextButton;
        this.previousButton = previousButton;
        this.addEventListener(this.nextButton, this.nextSlide);
        this.addEventListener(this.previousButton, this.prevSlide);
        this.bullets = [];
        this.currentActiveNumber = 0;

    }

    addEventListener(component, action) {
        component.addEventListener('click', action.bind(this));
    }

    getDirectionControls() {
        let nextButton, previousButton;
        for (let button of this.controls) {

            if (button.dataset.target === 'next') {
                nextButton = button
            }
            if (button.dataset.target === 'previous') {
                button.setAttribute('disabled', true);
                previousButton = button

            }
        }
        return {nextButton: nextButton, previousButton: previousButton};
    }

    activate() {
        this.initStyles();
        this.addCarouselProgress();
        this.element.style.visibility = 'visible';
    }

    addCarouselProgress() {
        let wrapper = new Div('progress-wrapper');
        let progressWrapper = wrapper.render();
        let list = document.createElement('ul');
        for (let j = 0; j < this.modifiedSlides.length; j++) {
            let bullet = new BulletItem(this, j);
            list.appendChild(bullet.render())
            this.bullets.push(bullet)
        }
        console.log(this.bullets)
        let prevControl = this.previousButton.cloneNode(true);
        let nextControl = this.nextButton.cloneNode(true);
        this.addEventListener(prevControl, this.prevSlide);
        this.addEventListener(nextControl, this.nextSlide);

        progressWrapper.appendChild(prevControl);
        progressWrapper.appendChild(list);
        progressWrapper.appendChild(nextControl);

        let progress = new Div('carousel-progress');
        let carouselProgress = progress.render();
        carouselProgress.appendChild(progressWrapper);
        this.element.appendChild(carouselProgress);
    }

    initStyles() {
        for (let i = 0; i < this.modifiedSlides.length; i++) {
            this.modifiedSlides[i].addNewClass('slide');
            if (i === 1) {
                this.modifiedSlides[i].addNewClass('next')
            }
            if (i > 0) {
                this.modifiedSlides[i].addNewClass('slide-right')
            }
            if (i === 0) {
                this.modifiedSlides[i].addNewClass('active');
            }
        }
    }

    nextSlide() {
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

    prevSlide() {
        if ((this.currentActiveNumber + 1) === this.modifiedSlides.length) {
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

    showSlide(n) {
        n = parseInt(n);
        this.switchActive(n);
        if (n === this.modifiedSlides.length - 1) {
            this.switchDisabled('next', true)
        }
        if (this.currentActiveNumber === this.modifiedSlides.length - 1 && n < this.modifiedSlides.length - 1) {
            this.switchDisabled('next', false)
        }
        if (n === 0) {
            this.switchDisabled('previous', true)
        }
        if (this.currentActiveNumber === 0 && n > 0) {
            this.switchDisabled('previous', false)
        }
        this.currentActiveNumber = n;
    }


    switchActive(targetNumber) {
        this.modifiedSlides[targetNumber].checkAndRemoveClass('slide-right');
        this.modifiedSlides[targetNumber].checkAndRemoveClass('slide-left');
        this.modifiedSlides[targetNumber].checkAndRemoveClass('next');
        this.modifiedSlides[targetNumber].checkAndRemoveClass('previous');

        this.modifiedSlides[targetNumber].addNewClass('active');

        for (let s = 0; s < targetNumber; s++) {
            this.modifiedSlides[s].addNewClass('slide-left');
            this.modifiedSlides[s].checkAndRemoveClass('slide-right');
            this.modifiedSlides[s].checkAndRemoveClass('active');
            this.modifiedSlides[s].checkAndRemoveClass('previous');
            this.modifiedSlides[s].checkAndRemoveClass('next');
        }
        for (let k = targetNumber + 1; k < this.modifiedSlides.length; k++) {
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

        for (let b of this.bullets) {
            b.deactivate()
        }
        this.bullets[targetNumber].activate();
    }

    switchDisabled(target, value) {
        for (let c of this.controls) {
            if (c.dataset.target === target) {
                c.disabled = value
            }
        }
    }

}
