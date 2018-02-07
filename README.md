# Carousel-carousel slider
Easy to use responsive slider.
Tested in last versions of Chrome, Safari, Firefox and Opera 

Check [live demo](http://yuliapi.github.io/projects/carousel/index.html?utm_source=github&utm_campaign=carousel)

## How to use
Component can be used either with direct links to CDN resources or by installing as NPM package.
### 1. Use as CDN links
Include following into head section of html page:
  ````
  <link href="https://cdn.jsdelivr.net/npm/carousel-carousel@0.1.22/css/carousel-carousel.css" rel="stylesheet"/>
  ````
  ````
  <script src="https://cdn.jsdelivr.net/npm/carousel-carousel@0.1.22/js/dist/carousel-carousel.min.js"></script>
  ````
Create HTML markup
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

Activate carousel on your javascript file or in script section of page html
````
window.onload = function () {
    let myCarousel = new Carousel(document.getElementById('myCarousel'));
    myCarousel.activate()
};
````
### 2.  Use as NPM package with your build tool (Grunt, Gulp, Webpack)
#### Install component
````
npm install --save carousel-carousel
````
#### Load the required files
This component is distributed with:
+ js/src/carousel-carousel.js - non-minified original source file compatible with browsers of latest version (support ECMAScript 6 is required)
+ js/dist/carousel-carousel.js - processed with Babel main JS file
+ js/dist/carousel-carousel.min.js - minified JS
+ scss/carousel-carousel.scss - SASS file for styling the carousel
+ css/carousel-carousel.css - compiled styles
+ demo - webpack bundled demo of carousel usage

You can styles and Javascript files that satisfy your project needs.
