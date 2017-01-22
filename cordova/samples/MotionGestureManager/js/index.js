/*
 * Sample Web Application - Sketchpad
 *
 * Copyright (c) 2014 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Use is subject to license terms.
 */

//Global Variables
var canvas = document.getElementById('drawingCanvas');

//window width and height
var width = window.innerWidth;
var height = window.innerHeight;

//canvas context
var ctx = canvas.getContext("2d");
var lineColor = "#585858";
var lineWidth = 6;

var isDown = false;
var isMoving = false;
var points = [];
var doDraw = true;
var panelBounce = true;

var swipeTimer;
var startX;
var startTime;
var curPanel = undefined;

//maximum left margin
const TOUCH_LEFT_MAX_X = 10,

    //minimum right margin
    TOUCH_RIGHT_MIN_X = width - 10,

    //minimum swipe pixels
    TOUCH_SWIPE_THRESHOLD = 100,

    //max time for swipe in milliseconds
    TOUCH_SWIPE_MAXTIME = 500,

    //space at the top for the header
    HEADER_OFFSET = 80;


/**
 * Initialize the application
 */
function initialize() {
    //UI elements
    var leftPanel = document.getElementById('panel_left');
    var rightPanel = document.getElementById('panel_right');
    var overlay = document.getElementById('overlay');
    var appHeader = document.getElementById('appHeader');

    // events
    window.addEventListener('orientationchange', handleOrientationChange);

    canvas.addEventListener("touchstart", handleEventStart, false);
    canvas.addEventListener("touchmove", handleEventMove, false);
    canvas.addEventListener("touchend", handleEventEnd, false);

    overlay.addEventListener("touchstart", handleStopEvent, false);
    appHeader.addEventListener("touchstart", handleStopEvent, false);
    leftPanel.addEventListener("touchstart", handlePanelTouchstart, false);
    rightPanel.addEventListener("touchstart", handlePanelTouchstart, false);

    document.body.addEventListener("touchcancel", handleEventEnd, false);

    //mouse events
    document.body.addEventListener("mouseup", handleEventEnd, false);
    canvas.addEventListener("mousedown", handleEventStart, false);
    canvas.addEventListener("mousemove", handleEventMove, false);

    //add deviceready listener
    document.addEventListener('deviceready', onDeviceReadyHandler, false);

} //end initialize

/**
 * The device is ready
 * 1. Attach all the event handlers
 * 2. Make sure we are in our default state
 * 3. Begin our animation loop
 */
function onDeviceReadyHandler() {

    //motion gesture events
    if (typeof amazonMotionGestureManager !== 'undefined') {
        amazonMotionGestureManager.addEventListener('amazonmotiongesturetilt', handleTilt);
        amazonMotionGestureManager.addEventListener('amazonmotiongesturepeek', handlePeek);
        amazonMotionGestureManager.addEventListener('amazonmotiongesturecontinuous_peek', handleContinuousPeek);
    }

    //default state
    reset();

    //animation loop
    requestAnimationFrame(animate);

} //end onDeviceReadyHandler

/***************
 *
 * UI Methods
 *
 **************/
/**
 * Reset the application to the default state
 */
function reset() {
    canvas.width = width;
    canvas.height = height - HEADER_OFFSET;

    ctx.fillStyle = "#f4efe2";
    ctx.fillRect(0, 0, width, height);
    points = [];

    //set the timestamp for the sketch
    sketchCreateDate();

} //end reset

/**
 * Put the current date on the right "info" Panel
 */
function sketchCreateDate() {
    var cDateItem = document.getElementById('itemCreated');
    var d = new Date();

    cDateItem.innerHTML = "Create Date : " + d;
}

/**
 * Draw the sketch line
 */
function drawLine() {
    if (points.length > 1) {
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round';
        ctx.shadowBlur = lineWidth / 2;
        ctx.shadowColor = lineColor

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (var i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
    }

} //end drawLine

/**
 * Animation loop
 */
function animate() {
    if (doDraw) {
        drawLine();
    }

    requestAnimationFrame(animate);
} //end animate

/**
 * Decide if we need to show or hide a panel
 * @param {String} dir the direction of the tilt or swipe
 */
function slidePanel(dir) {

    if (!curPanel) { //show panel

        //swap the direction because the opposite
        //direction displays the panel
        dir === "left" ? dir = "right" : dir = "left";

        //apply the CSS style to slide
        togglePanel(dir);

    } else if (curPanel === dir) { //hide panel

        //apply the CSS style to slide
        togglePanel(dir);
    }

} //end slidePanel

/**
 * Apply/Remove class that shows and hides the panels
 * @param {String} whichPanel the right or left panel
 */
function togglePanel(whichPanel) {
    whichPanel = whichPanel || curPanel;

    var panelEle = document.getElementById("panel_" + whichPanel);

    //In the native device UI - panels have a slight bounce when they are displayed
    //To create a similar experience in our web application we can apply different 
    //styles to take advantage of the cubic-bezier ease in the transition style
    if (panelBounce) {
        panelEle.classList.toggle("act_show" + whichPanel);
        panelEle.classList.toggle("act_hide" + whichPanel);
    } else {
        panelEle.classList.toggle("act_slide" + whichPanel);
    }

    //reset our curPanel variable
    if (curPanel) {
        curPanel = undefined;
    } else {
        curPanel = whichPanel;
    }
} //end togglePanel

/**
 * Erase the canvas
 */
function eraseSketch() {
    reset();

    //dismiss panel
    togglePanel();

} //end eraseSketch


/*********************
 *
 * Utility Events
 *
 ********************/

/**
 * Test direction of swipe
 * @param {Number} curX current x coordinate
 * @return {String}
 */
function getSwipeDirection(curX) {
    var direction = startX < curX ? "right" : "left";

    return direction;
}

/**
 * Test length of swipe
 * @param {Number} curX current x coordinate
 * @return {Number}
 */
function getSwipeDistance(curX) {
    var swipeLength = Math.round(Math.sqrt(Math.pow(curX - startX, 2)));

    return swipeLength;
}

/**
 * Calculate timespan
 * @param {Number} now timestamp
 * @return {Number}
 */
function getTimespan(now) {
    var now = now || Date.now();

    return now - startTime;
}

/**
 * Add the x and y coordinates of the event
 * to our points array
 * NOTE : we subtract the header height from the
 * Y-coordinate to correct the offset
 * @param {Object} obj event data
 */
function addPointToArray(obj) {
    var point = {};

    point.x = obj.pageX;
    point.y = obj.pageY - HEADER_OFFSET;

    points.push(point);
}

/*********************
 *
 * Custom Events
 *
 ********************/

/**
 * SWIPE
 *
 * Check to see if we have a swipe event
 * and if so which direction are we going?
 * @param {Number} curX X-coordinate
 * @return {String}
 */
function swipeGesture(curX) {
    var swipeDirection = getSwipeDirection(curX);
    var swipeDistance = getSwipeDistance(curX);

    if (swipeDistance >= TOUCH_SWIPE_THRESHOLD) {
        return swipeDirection;
    } else {
        return undefined;
    }
} //end swipeGesture

/**
 * TAP
 *
 * Check to see if we have a tap event
 * @param {Number} curX X-coordinate
 * @return {Boolean}
 */
function tapGesture(curX) {
    var timespan = getTimespan();

    if (curX === startX && timespan < 100) {
        return true;
    } else {
        return false;
    }
} //end tapGesture

/**
 * Tap Handler Method
 * Since tap is a synthetic event we have
 * tap handler methods here, for whichever
 * elements want them
 * @param {String} eId ID of the tap target
 */
function handleTap(eId) {
    switch (eId) {
        case "menuItemErase":
            eraseSketch();
            break;
        default:
            break;
    }
} //end handleTap

/**
 * See if we are within one of our side margins (right or left only)
 * if we are then we put our drawing on hold and open up test for swipe
 * @param {Event} e
 */
function detectSwipeMargin(e) {
    //make sure it's a single touch
    if (e.touches.length >= 2) {
        return;
    };
    startX = e.touches[0].screenX;

    if (startX <= TOUCH_LEFT_MAX_X || startX >= TOUCH_RIGHT_MIN_X) {
        //hold off on drawing for now and start our swipe timer
        doDraw = false;

        swipeTimer = setTimeout(function() {
            //still moving so not a swipe it's a draw
            doDraw = true;
        }, TOUCH_SWIPE_MAXTIME);
    }
} //end detectSwipeMargin

/*************************
 *
 * Event Handler Methods
 *
 *************************/

/**
 * Touchstart event on a panel element
 * @param {Event} e
 */
function handlePanelTouchstart(e) {
    e.preventDefault();
    e.stopPropagation();

    //make sure we aren't drawing
    doDraw = false;

    //get start position and time
    startX = e.touches[0].screenX;
    startTime = Date.now();

    //add touchend event handler
    e.target.addEventListener("touchend", handlePanelTouchend, false);

    //begin swipe timer
    swipeTimer = setTimeout(function() {
        //remove the event if the move is taking to long
        e.target.removeEventListener("touchend", handlePanelTouchend, false);
    }, TOUCH_SWIPE_MAXTIME);

} //end handlePanelTouchstart

/**
 * See if the touch gesture is a swipe
 * @param {Number} curX X-position of touchend
 * @param {String} timeStamp time of the touchend
 * @return {String}
 */
function handlePanelTouchend(e) {
    //clear swipeTimer
    clearTimeout(swipeTimer);

    //first check for a tap
    var tap = tapGesture(e.changedTouches[0].clientX);

    if (!tap) { //check for swipe

        var swipe = swipeGesture(e.changedTouches[0].clientX);

        if (swipe) {
            slidePanel(swipe);
        }
    } else {
        handleTap(e.target.id);
    }

    //remove the event
    e.target.removeEventListener("touchend", handlePanelTouchend, false);

} //end handlePanelTouchend

/**
 * Touch & Mouse start event handler
 * @param {Event} e
 */
function handleEventStart(e) {
    //reset our flag
    doDraw = true;

    if (e.targetTouches) {
        e.preventDefault();
        e.stopPropagation();

        //first see if we are starting a swipe
        detectSwipeMargin(e);

        addPointToArray(e.targetTouches[0]);
    } else {
        addPointToArray(e);
    }

    //track drawing
    isDown = true;

} //end handleEventStart

/**
 * Touch & Mouse move event handler
 * @param {Event} e
 */
function handleEventMove(e) {
    var point = {};

    if (e.targetTouches) {
        e.preventDefault();
        e.stopPropagation();

        addPointToArray(e.targetTouches[0]);
    } else {
        addPointToArray(e);
    }

} //end handleEventMove

/**
 * Touch & Mouse end event handler
 * @param {Event} e
 */
function handleEventEnd(e) {
    //see if we need to cancel swipe test
    if (!doDraw) {
        clearTimeout(swipeTimer);

        //see where we ended up and check for swipe
        if (e.changedTouches) {
            var swipe = swipeGesture(e.changedTouches[0].screenX);

            if (swipe) {
                slidePanel(swipe);
            } else {
                doDraw = true;
            }
        }
    }

    isDown = false;
    points = [];

} //end handleEventEnd

/**
 * Motion gesture tilt event handler
 * @param {Event} e
 */
function handleTilt(e) {
    var dir = e.detail.direction;

    switch (dir) {
        case "forward":
            break;
        case "back":
            break;
        case "left":
            slidePanel(dir);
            break;
        case "right":
            slidePanel(dir);
            break;
        default:
            break;
    }

} //end handleTilt

/**
 * Motion gesture peek event handler
 * @param {Event} e
 */
function handlePeek(e) {
    console.log('peek');
}

function handleContinuousPeek(e) {
    console.log('continuous peek');
    var peek_text = document.getElementById("cont_peek");
    peek_text.innerHTML = "Peek Value: " + e.detail.magnitude.toFixed(3);

}
/**
 * Display overlay with message when orientation
 * changes to landscape
 * @param {Event} evt orientation event
 */
function handleOrientationChange(evt) {
    var over = document.getElementById('overlay');
    if (event.currentTarget.orientation !== 0) {
        over.style.display = "block";
    } else {
        over.style.display = "none";
    }
}

/**
 * Explicitly cancel the event
 */
function handleStopEvent(e) {
    e.preventDefault();
    e.stopPropagation();
}

//Initialize the app
initialize();
