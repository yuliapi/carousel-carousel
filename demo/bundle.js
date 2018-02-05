/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(6);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_carousel_carousel_js_src_carousel_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_carousel_carousel_css_carousel_css__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_carousel_carousel_css_carousel_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_carousel_carousel_css_carousel_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_css__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__style_css__);






window.onload = function () {
    window.innerWidth;
    let myCarousel = new __WEBPACK_IMPORTED_MODULE_0_carousel_carousel_js_src_carousel_js__["a" /* default */](document.getElementById('myCarousel'));
    myCarousel.activate()
};


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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


/* harmony default export */ __webpack_exports__["a"] = (Carousel);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(5);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../css-loader/index.js!./carousel.css", function() {
		var newContent = require("!!../../css-loader/index.js!./carousel.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "/******************Screen size breaks************************/\n/*****************Helper variables**************************/\n.carousel {\n  visibility: hidden;\n  height: 100%;\n  width: 100%;\n  position: relative;\n  display: grid;\n  grid-template-areas: \"top\" \"bottom\";\n  grid-template-rows: 1fr 100px;\n}\n\n@media only screen and (max-width: 480px) {\n  .carousel {\n    display: inline-flex;\n  }\n}\n\n.carousel-body {\n  display: flex;\n  height: 515px;\n}\n\n.carousel-progress {\n  grid-area: bottom;\n}\n\n@media only screen and (max-width: 480px) {\n  .carousel-progress {\n    width: 100%;\n    height: 70px;\n    position: fixed;\n    bottom: 0;\n    padding: 0;\n  }\n}\n\n.carousel-controls {\n  position: fixed;\n  top: 0;\n  height: calc(100% - 100px);\n  width: 100%;\n  display: grid;\n  align-items: center;\n  grid-template-areas: 'left center right';\n}\n\n@media only screen and (max-width: 480px) {\n  .carousel-controls {\n    display: none;\n  }\n}\n\n@media only screen and (min-width: 480px) and (max-width: 810px) {\n  .carousel-controls {\n    grid-template-columns: 50px 1fr 50px;\n    z-index: 1000;\n  }\n}\n\n@media only screen and (min-width: 810px) and (max-width: 1200px) {\n  .carousel-controls {\n    grid-template-columns: 50px 1fr 50px;\n  }\n}\n\n@media only screen and (min-width: 1200px) {\n  .carousel-controls {\n    grid-template-columns: 100px 1fr 100px;\n  }\n}\n\n.carousel-controls .slide-control {\n  height: 100%;\n  border-radius: 0;\n  margin: 0;\n  width: 100%;\n}\n\n.carousel-controls .slide-control span {\n  color: #6e6e6e;\n}\n\n.carousel-controls .slide-control.control-next {\n  grid-area: right;\n}\n\n.carousel-controls .slide-control.control-prev {\n  grid-area: left;\n}\n\n.carousel .slide-control {\n  position: relative;\n  height: 40px;\n  width: 40px;\n  margin-top: -20px;\n  border-radius: 50%;\n  border-color: transparent;\n  background: transparent;\n  color: #e4e4e4;\n  font-size: 20px;\n  outline: none;\n}\n\n.carousel .slide-control:disabled {\n  display: none;\n}\n\n.carousel .slide-control span {\n  color: #e4e4e4;\n  cursor: pointer;\n  display: inline-block;\n  transform: scale(1.5, 1.5);\n  transition: all 0.3s ease-in-out;\n}\n\n.carousel .slide-control.control-prev span:before {\n  margin-left: 10px;\n  content: '\\AB';\n}\n\n.carousel .slide-control.control-next span:before {\n  margin-right: 10px;\n  content: '\\BB';\n}\n\n.carousel .slide-control.control-prev:hover span {\n  transform: scale(2.3, 2.3) translateX(-5px);\n  transition: all 0.3s ease-in-out;\n}\n\n.carousel .slide-control.control-next:hover span {\n  transform: scale(2.3, 2.3) translateX(5px);\n  transition: all 0.3s ease-in-out;\n}\n\n/**************************Slide positioning*************************/\n.carousel .slide {\n  align-self: center;\n  position: fixed;\n  right: 0;\n  transition: all 1s ease-in-out;\n  box-sizing: border-box;\n  opacity: 0.3;\n}\n\n@media only screen and (max-width: 480px) {\n  .carousel .slide {\n    width: 100vw;\n    border: none;\n    box-shadow: unset;\n  }\n  .carousel .slide.slide-right.next {\n    right: calc(-100vw + 0px);\n  }\n  .carousel .slide.slide-left.previous {\n    right: calc(100vw - 0px);\n  }\n  .carousel .slide.active {\n    opacity: 1;\n    right: calc((50vw - 100vw / 2));\n  }\n}\n\n@media only screen and (min-width: 480px) and (max-width: 810px) {\n  .carousel .slide {\n    width: 100vw;\n    padding-left: 50px;\n    padding-right: 50px;\n    background-color: white;\n  }\n  .carousel .slide.slide-right.next {\n    right: calc(-100vw + 0px);\n  }\n  .carousel .slide.slide-left.previous {\n    right: calc(100vw - 0px);\n  }\n  .carousel .slide.active {\n    opacity: 1;\n    right: calc((50vw - 100vw / 2));\n  }\n}\n\n@media only screen and (min-width: 810px) and (max-width: 1200px) {\n  .carousel .slide {\n    width: 710px;\n  }\n  .carousel .slide.slide-right.next {\n    right: calc(-710px + 50px);\n  }\n  .carousel .slide.slide-left.previous {\n    right: calc(100vw - 50px);\n  }\n  .carousel .slide.active {\n    opacity: 1;\n    right: calc((50vw - 710px / 2));\n  }\n}\n\n@media only screen and (min-width: 1200px) {\n  .carousel .slide {\n    width: 710px;\n  }\n  .carousel .slide.slide-right.next {\n    right: calc(-710px + 100px);\n  }\n  .carousel .slide.slide-left.previous {\n    right: calc(100vw - 100px);\n  }\n  .carousel .slide.active {\n    opacity: 1;\n    right: calc((50vw - 710px / 2));\n  }\n}\n\n.carousel .slide.slide-right {\n  background-color: #aaaaaa;\n  right: -150vw;\n}\n\n.carousel .slide.slide-left {\n  background-color: #aaaaaa;\n  right: 150vw;\n}\n\n.carousel-progress {\n  grid-area: bottom;\n  overflow: hidden;\n  display: flex;\n  justify-content: center;\n}\n\n.carousel-progress .progress-wrapper {\n  position: relative;\n  display: flex;\n  align-items: center;\n  z-index: 0;\n}\n\n@media only screen and (max-width: 480px) {\n  .carousel-progress .progress-wrapper {\n    z-index: 1000;\n    padding-bottom: 20px;\n    background-color: transparent;\n    height: 100px;\n    display: inline-flex;\n    width: 100%;\n    justify-content: space-around;\n  }\n  .carousel-progress .progress-wrapper button {\n    height: inherit;\n  }\n  .carousel-progress .progress-wrapper span {\n    transform: scale(2, 2);\n  }\n  .carousel-progress .progress-wrapper .slide-control.control-prev:hover span {\n    transform: scale(3, 3) translateX(-5px);\n    margin-bottom: 20px;\n  }\n  .carousel-progress .progress-wrapper .slide-control.control-next:hover span {\n    transform: scale(4, 4) translateX(5px);\n    margin-bottom: 20px;\n  }\n}\n\nul {\n  margin-top: 0;\n  padding: 0;\n  overflow: hidden;\n  display: inline-block;\n  float: left;\n}\n\n@media only screen and (max-width: 480px) {\n  ul {\n    display: none;\n  }\n}\n\nul .slide-control {\n  margin-top: 0;\n}\n\n@media only screen and (max-width: 480px) {\n  ul .slide-control {\n    display: none;\n  }\n}\n\nul .slide-control:first-child {\n  float: left;\n}\n\nul .slide-control:last-child {\n  float: left;\n}\n\n.carousel .progress-bullet {\n  list-style-type: none;\n  float: left;\n}\n\n.carousel .progress-bullet a {\n  display: inline-block;\n  margin: 0 20px;\n  height: 10px;\n  width: 10px;\n  border-radius: 50%;\n  background: #e4e4e4;\n  transition: all 0.5s ease-in-out;\n}\n\n.carousel .progress-bullet.active a {\n  background: #6e6e6e;\n  transform: scale(1.5, 1.5);\n}\n", ""]);

// exports


/***/ }),
/* 6 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(8);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../node_modules/css-loader/index.js!./style.css", function() {
		var newContent = require("!!../node_modules/css-loader/index.js!./style.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "body {\r\n    margin: 0;\r\n    padding: 0;\r\n    height: 100vh;\r\n}\r\n\r\n.content {\r\n    height: 600px;\r\n}\r\n\r\n.slide-content {\r\n    display: flex;\r\n}\r\n\r\n.slide-content img {\r\n    box-shadow: 0 10px 20px 5px #aaaaaa, 0 0 2px #e4e4e4;\r\n}\r\n\r\n@media only screen and (min-width: 810px) and (max-width: 1200px) {\r\n    .slide-content {\r\n        height: max-content;\r\n    }\r\n    .slide-content img {\r\n        height: 515px;\r\n    }\r\n}\r\n\r\n@media only screen and (min-width: 1200px) {\r\n    .slide-content {\r\n        height: max-content;\r\n    }\r\n    .slide-content img {\r\n        height: 515px;\r\n    }\r\n}\r\n\r\n.slide-content img {\r\n    width: 100%;\r\n    position: relative;\r\n}\r\n", ""]);

// exports


/***/ })
/******/ ]);