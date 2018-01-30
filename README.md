# Carousel slider
Easy to use responsive slider.
Tested in last versions of Chrome, Safari, Firefox and Opera 

## Usage
Copy from src folder to your project and link:
+ styles.css (compiled)
+ carouse.js

Use HTML markdown: 

    <div id="myCarousel" class="carousel">     
        <div class="carousel-body">
            <div class="carousel-slide slide active">
                <div class="slide-content">
                   <!--Content-->
                </div>
            </div>
            
            <div class="carousel-slide slide slide-right next">
                <div class="slide-content">
                    <!--Content-->
                </div>
    
            </div>
            
            <div class="carousel-slide slide slide-right">
                <div class="slide-contentt">
                    <!--Content-->
                </div>
            </div>
        </div>
        
        <div class="carousel-controls">
            <button class="slide-control control-next" id="btnNext" data-controls="myCarousel"
                    data-target="next"><span></span>
            </button>
            <button class="slide-control control-prev" id="btnPrevious" data-controls="myCarousel"
                    data-target="previous" disabled><span></span>
            </button>
        </div>
        
        <div class="carousel-progress">
            <div class="progress-wrapper">
                <button class="slide-control control-prev" disabled data-controls="myCarousel"
                        data-target="previous"><span></span>
                </button>
                <ul>
                    <li class="progress-bullet active"><a href="#" data-slide="0" ></a></li>
                    <li class="progress-bullet"><a href="#" data-slide="1"></a></li>
                    <li class="progress-bullet"><a href="#" data-slide="2"></a></li>
                </ul>
                <button class="slide-control control-next" data-controls="myCarousel"
                        data-target="next"><span></span>
                </button>
            </div>
        </div>
    </div>
    
Activate carousel in your javascript file:

    let myCarousel = new Carousel(document.getElementById('myCarousel'));
        myCarousel.activate()
       
