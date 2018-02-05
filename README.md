# Carousel slider
Easy to use responsive slider.
Tested in last versions of Chrome, Safari, Firefox and Opera 



## Getting started

### 1. Install component
````
npm install --save carousel-carousel
````

### 2. Load the required files
Project under development. Planning to Babelify .js files and provide compiled .css as part of distribution.

In a meanwhile to use the component import carousel.js to your project and compile carousel.scss file.

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
                    data-target="previous" disabled><span></span>
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