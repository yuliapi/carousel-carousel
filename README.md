# Carousel slider
Easy to use responsive slider.
Tested in last versions of Chrome, Safari, Firefox and Opera 

Check [live demo](http://yuliapi.github.io/projects/carousel/index.html?utm_source=github&utm_campaign=carousel)

## Getting started

### 1. Install component
````
npm install --save carousel-carousel
````

### 2. Load the required files
This component is distributed with:
+ js/src/carousel.js - non-minified original source file compatible with browsers of latest version (support ECMAScript 6 is required)
+ js/dist/carousel.js - processed with Babel main JS file
+ js/dist/carousel.min.js - minified JS
+ scss/carousel.scss - SASS file for styling the carousel
+ css/carousel.css - compiled styles
+ demo - webpack bundled demo of carousel usage

You can styles and Javascript files that satisfy your project needs.

### 3. Create the HTML markup
````
<div id="myCarousel" class="carousel">
        <div class="carousel-body">
            <div class="carousel-slide">
                <div class="slide-content">
                    Slide 1 content goes here
                </div>
            </div>
            <div class="carousel-slide">
              <div class="slide-content">
                    Slide 2 content goes here                 
               </div>
            </div>
        </div>
          
        <div class="carousel-controls">
            <button class="slide-control control-next" data-controls="myCarousel"
                    data-target="next"><span></span>
            </button>
            <button class="slide-control control-prev" data-controls="myCarousel"
                    data-target="previous"><span></span>
            </button>
        </div>
</div>
````

### 4. Activate carousel on your javascript file
````
window.onload = function () {
    let myCarousel = new Carousel(document.getElementById('myCarousel'));
    myCarousel.activate()
};
````