window.onload = function () {
    window.innerWidth;
    let myCarousel = new Carousel(document.getElementById('myCarousel'));
    myCarousel.activate()
};
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
        this.element = e
        this.slides = this.element.getElementsByClassName('carousel-slide');
        this.modifiedSlides = [];
        for (let s of this.slides) {
            this.modifiedSlides.push(new Slide(s))
        }
        this.controls = this.element.getElementsByClassName('slide-control');

        this.bullets = this.element.getElementsByClassName('progress-bullet');
        this.links = this.allLinks();
        this.currentActiveNumber = 0;

    }

    allLinks() {
        let arr = [];
        for (let each of this.bullets) {
            arr.push(each.firstChild);
        }
        return arr
    }

    activate() {

        let bulletHolder = this.bullets[0].parentElement.parentElement
        console.log(bulletHolder)

        let allNext = this.element.getElementsByClassName('control-next');
        let allPrev = this.element.getElementsByClassName('control-prev');
        for (let next of allNext) {
            next.addEventListener('click', this.nextSlide.bind(this));
        }
        for (let prev of allPrev) {
            prev.addEventListener('click', this.prevSlide.bind(this));
        }
        for (let link of this.links) {
            let target = link.dataset.slide;
            link.addEventListener('click', this.showSlide.bind(this, target))
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
            if (b.classList.contains('active')) {
                b.classList.remove('active');
            }
        }
        this.bullets[targetNumber].classList.add('active');
    }

    switchDisabled(target, value) {
        for (let c of this.controls) {
            if (c.dataset.target === target) {
                c.disabled = value
            }
        }
    }

}
