/*
 * MotionGestureManager.js - Cordova Plugin to bridge GestureManager events to JS
 *
 * Copyright (c) 2014 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Use is subject to license terms.
 */

var argscheck = require('cordova/argscheck'),
    channel = require('cordova/channel'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec'),
    cordova = require('cordova');

/**
 * @exports amazonMotionGestureManager
 * @version 1.0
 * @namespace amazonMotionGestureManager
 */
module.exports = (function() {
    "use strict";

    var undefined,
        PLUGIN_NAME = 'MotionGestureManager',
        PLUGIN_COMMAND_ISSUPPORTED = 'isSupported',
        PLUGIN_COMMAND_ENUMERATE = 'enumerateGestures',
        PLUGIN_COMMAND_REQUEST = 'requestGesture',
        PLUGIN_COMMAND_UNREQUEST = 'unrequestGesture',
        MOTION_GESTURE_EVENT_PREFIX = 'amazonmotiongesture',
        SUPPORTED_EVENT_TYPES = 'supportedEventTypes',
        SUPPORTED_GESTURES = 'supportedGestures',
        amazonMotionGestureManager;


    if (window.amazonMotionGestureManager) {
        // already implemented by this useragent, use w3c version.
        amazonMotionGestureManager = window.amazonMotionGestureManager;
        return window.amazonMotionGestureManager;
    }

    // no prototype
    amazonMotionGestureManager = new GestureEventTarget;

    // callback for native code to handle events that arrive in our activity
    function dispatchGestureEvent(evtArgs) {
        amazonMotionGestureManager.dispatchEvent(new CustomEvent(MOTION_GESTURE_EVENT_PREFIX + evtArgs.kind, {
            detail: {
                kind: evtArgs.kind,
                action: evtArgs.action,
                direction: evtArgs.direction,
                magnitude: evtArgs.magnitude,
                rotation: evtArgs.rotation,
                timestamp: evtArgs.timestamp,
                timestamp_nsecs: evtArgs.timestamp_nsecs
            }
        }));
    }

    function handleGestureEnumeration(gestures) {
        amazonMotionGestureManager[SUPPORTED_EVENT_TYPES] = new Array(gestures.length);
        amazonMotionGestureManager[SUPPORTED_GESTURES] = new Array(gestures.length);
        for (var i = 0; i < gestures.length; i++) {
            var eventName = MOTION_GESTURE_EVENT_PREFIX + gestures[i];
            amazonMotionGestureManager[SUPPORTED_EVENT_TYPES][i] = eventName;
            amazonMotionGestureManager[SUPPORTED_GESTURES][i] = gestures[i];
            amazonMotionGestureManager.supportEvent(eventName, gestures[i]);
        }
    }

    function handleGestureError(error) {
        console.log('handleGestureError', error);
    }

    function requestGestureEvent(kind) {
        console.log('requestGestureEvent', kind);
        cordova.exec(dispatchGestureEvent, handleGestureError, PLUGIN_NAME, PLUGIN_COMMAND_REQUEST, [kind]);
    }

    function unrequestGestureEvent(kind) {
        console.log('unrequestGestureEvent', kind);
        cordova.exec(null, handleGestureError, PLUGIN_NAME, PLUGIN_COMMAND_UNREQUEST, [kind]);
    }

    function GestureEventTarget() {
        this.listeners = {}; // hash of array of listeners for each event type
    }

    /**
     * Create a motion gesture listener.
     * @memberof amazonMotionGestureManager
     * @namespace amazonMotionGestureManager
     * @method addEventListener
     * @public
     * @param {string} type - The type of motion gesture to listen for.
     * @param {function} listener - The listener function to be called when the motion gesture event occures.
     */
    GestureEventTarget.prototype.addEventListener = function(type, listener) {
        var evtListeners = this.listeners[type];
        if (evtListeners) {
            if (evtListeners.listeners.length == 0) {
                requestGestureEvent(evtListeners.kind);
            }
            evtListeners.listeners.push(listener);
        } else {
            console.log('unsupported gesture event: ' + type)
        }
    };

    /**
     * Remove a motion gesture listener from executing and memory.
     * @memberof amazonMotionGestureManager
     * @namespace amazonMotionGestureManager
     * @method removeEventListener
     * @public
     * @alias module:amazonMotionGestureManager
     * @param {string} type - The type of motion gesture that has a listener assigned to it.
     * @param {function} listener - The function pointer to the listener that was added, so that it can be independently removed.
     */
    GestureEventTarget.prototype.removeEventListener = function(type, listener) {
        var evtListeners = this.listeners[type];
        if (evtListeners) {
            var i = evtListeners.listeners.indexOf(listener);
            if (i >= 0) {
                evtListeners.listeners.splice(i, 1);
            }
            if (evtListeners.listeners.length == 0) {
                unrequestGestureEvent(evtListeners.kind);
            }
        } else {
            console.log('unsupported gesture event: ' + type)
        }
    };

    /**
     * The event dispatcher.
     * @memberof amazonMotionGestureManager
     * @namespace amazonMotionGestureManager
     * @private
     * @callback
     * @param {string} evt - The event object to be dispatched.
     */
    GestureEventTarget.prototype.dispatchEvent = function(evt) {
        if (!evt || !evt.type) {
            return;
        }
        var evtListeners = this.listeners[evt.type];
        if (evtListeners) {
            var i, listeners = evtListeners.listeners.slice(0); // clone to allow reg/unreg from handler
            for (i = 0; i < listeners.length; i++) {
                listeners[i].call(this, evt);
            }
        } else {
            console.log('unsupported gesture event: ' + evt.type)
        }
    };

    /**
     * Create a supported event and save it.
     * @memberof amazonMotionGestureManager
     * @namespace amazonMotionGestureManager
     * @private
     * @param {string} type - The type of of motion gesture event external js name.
     * @param {string} kind - The kind of motion gesture event internal native name.
     */
    GestureEventTarget.prototype.supportEvent = function(type, kind) {
        this.listeners[type] = this.listeners[type] || { kind: kind, listeners: [] };
    };

    // delay initialization until plugin is ready
    channel.createSticky('onAmazonMotionGestureManagerPluginReady');
    channel.waitForInitialization('onAmazonMotionGestureManagerPluginReady');

    function firePluginReady() {
        channel.onAmazonMotionGestureManagerPluginReady.fire();
    }

    cordova.exec(function() {
        cordova.exec(function(gestures) {
            handleGestureEnumeration(gestures);
            channel.onCordovaReady.subscribe(function() {
                // install plugin API to window
                window.amazonMotionGestureManager = amazonMotionGestureManager;
            });
            firePluginReady();
        }, firePluginReady, PLUGIN_NAME, PLUGIN_COMMAND_ENUMERATE, []);
    }, firePluginReady, PLUGIN_NAME, PLUGIN_COMMAND_ISSUPPORTED, []);

    return amazonMotionGestureManager;
}());
