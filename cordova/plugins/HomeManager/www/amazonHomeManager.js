/*
 * amazonHomeManager.js - Cordova Plugin to bridge HomeManager APIs to JS
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
 * @exports amazonHomeManager
 * @version 1.0
 * @namespace amazonHomeManager
 */
module.exports = (function() {
    "use strict";

    var undefined,
        PLUGIN_NAME = 'HomeManagerPlugin',
        amazonHomeManager;

    if (window.amazonHomeManager) {
        // already implemented by this useragent
        amazonHomeManager = window.amazonHomeManager;
        return window.amazonHomeManager;
    }

    // no prototype
    amazonHomeManager = new HomeManager;

    function HomeManager() {

    };

    //The hero object validator helper functions, validates a valid hero object

    function exists(array_to_validate) {
        if (array_to_validate == undefined || array_to_validate.length < 1) {
            return false
        } else {
            return true;
        }

    }

    function requiredAndString(string_to_validate) {
        if (string_to_validate == undefined || typeof string_to_validate != "string") {
            return false
        } else {
            return true;
        }
    }

    function isString(string_to_validate) {
        if (string_to_validate == undefined) {
            return true;
        } else if (typeof string_to_validate != "string") {
            return false
        } else {
            return true;
        }
    }

    function isBoolean(bool_to_validate) {
        if (bool_to_validate == undefined) {
            return true;
        } else if (typeof bool_to_validate != "boolean") {
            return false
        } else {
            return true;
        }
    }

    function isValidStar(star_to_validate) {
        if (star_to_validate == undefined) {
            return true;
        } else if (typeof star_to_validate != "number" || !(star_to_validate >= 0 && star_to_validate <= 5)) {
            return false
        } else {
            return true;
        }
    }


    function validateList(heroObject) {
        if (!exists(heroObject.groups.length)) {
            throw "Invalid Hero List Object: Hero List Object contains no groups";
        }
        for (var i = 0; i < heroObject.groups.length; i++) {
            if (!requiredAndString(heroObject.groups[i].name)) {
                throw "Invalid Hero List Object: Group at index: " + i + " does not have a valid name";
            }

            if (!exists(heroObject.groups[i].listItems)) {
                throw "Invalid Hero List Object: Hero List Group at index: " + i + " contains no list items";
            }

            for (var j = 0; j < heroObject.groups[i].listItems.length; j++) {
                var listItem = heroObject.groups[i].listItems[j];
                if (!requiredAndString(listItem.primaryText)) {
                    throw "Invalid Hero List Item: Hero List Item in Group: " + heroObject.groups[i].name + " at index: " + j + " has invalid primaryText(should be string)";
                }

                if (listItem.visualStyle != "DEFAULT" && listItem.visualStyle != "PEEKABLE" && listItem.visualStyle != "SHOPPING" && listItem.visualStyle != "SHOPPING_RETAIL" && listItem.visualStyle != "SIMPLE" && listItem.visualStyle != "WRAPPED_TEXT") {
                    throw "Invalid Hero List Item: Hero List Item in Group: " + heroObject.groups[i].name + " at index: " + j + " has invalid visualStyle(must be either: DEFAULT, PEEKABLE, SHOPPING, SHOPPING_RETAIL, SIMPLE, WRAPPED_TEXT)";
                }

                if (!isString(listItem.img)) {
                    throw "Invalid Hero List Item: Hero List Item in Group: " + heroObject.groups[i].name + " at index: " + j + " has invalid img(should be string)"
                }

                if (!isString(listItem.secondaryText)) {
                    throw "Invalid Hero List Item: Hero List Item in Group: " + heroObject.groups[i].name + " at index: " + j + " has invalid secondaryText(should be string)";
                }

                if (!isString(listItem.tertiaryText)) {
                    throw "Invalid Hero List Item: Hero List Item in Group: " + heroObject.groups[i].name + " at index: " + j + " has invalid tertiaryText(should be string)"
                }

                if (!isString(listItem.quaternaryText)) {
                    throw "Invalid Hero List Item: Hero List Item in Group: " + heroObject.groups[i].name + " at index: " + j + " has invalid quaternaryText(should be string)";
                }

                if (!isString(listItem.secondaryImg)) {
                    throw "Invalid Hero List Item: Hero List Item in Group: " + heroObject.groups[i].name + " at index: " + j + " has invalid secondaryImg(should be string)";
                }

                if (!isString(listItem.tertiaryImg)) {
                    throw "Invalid Hero List Item: Hero List Item in Group: " + heroObject.groups[i].name + " at index: " + j + " has invalid tertiaryImg(should be string)";
                }

                if (!isString(listItem.quaternaryImg)) {
                    throw "Invalid Hero List Item: Hero List Item in Group: " + heroObject.groups[i].name + " at index: " + j + " has invalid quaternaryImg(should be string)";
                }
                if (!isString(listItem.callbackData)) {
                    throw "Invalid Hero List Item: Hero List Item in Group: " + heroObject.groups[i].name + " at index: " + j + " has invalid callbackData(should be string)";
                }
                if (!isBoolean(listItem.openAppOnTouch)) {
                    throw "Invalid Hero List Item: Hero List Item in Group: " + heroObject.groups[i].name + " at index: " + j + " has invalid openAppOnTouch(should be boolean)";
                }
                if (!isValidStar(listItem.starRating)) {
                    throw "Invalid Hero List Item: Hero List Item in Group: " + heroObject.groups[i].name + " at index: " + j + " has invalid starRating(should be number between 0 and 5(can be float))";
                }
            }


        }


    }

    function validateGrid(heroObject) {
        if (!exists(heroObject.groups.length)) {
            throw "Invalid Hero Grid Object: Hero Grid Object contains no groups";
        }
        for (var i = 0; i < heroObject.groups.length; i++) {
            if (!requiredAndString(heroObject.groups[i].name)) {
                throw "Invalid Hero Grid Object: Group at index: " + i + " does not have a valid name";
            }

            if (!exists(heroObject.groups[i].gridItems)) {
                throw "Invalid Hero Grid Object: Hero Grid Group at index: " + i + " contains no Grid items";
            }

            for (var j = 0; j < heroObject.groups[i].gridItems.length; j++) {
                var gridItem = heroObject.groups[i].gridItems[j];

                if (!requiredAndString(gridItem.img)) {
                    throw "Invalid Hero Grid Item: Hero Grid Item in Group: " + heroObject.groups[i].name + " at index: " + j + " has invalid img(should be string)"
                }

                if (!isString(gridItem.callbackData)) {
                    throw "Invalid Hero Grid Item: Hero Grid Item in Group: " + heroObject.groups[i].name + " at index: " + j + " has invalid callbackData(should be string)";
                }
                if (!isBoolean(gridItem.openAppOnTouch)) {
                    throw "Invalid Hero Grid Item: Hero Grid Item in Group: " + heroObject.groups[i].name + " at index: " + j + " has invalid openAppOnTouch(should be boolean)";
                }

                if (!isBoolean(gridItem.playButton)) {
                    throw "Invalid Hero Grid Item: Hero Grid Item in Group: " + heroObject.groups[i].name + " at index: " + j + " has invalid playButton(should be boolean)";
                }

                if (!isString(gridItem.playDuration)) {
                    throw "Invalid Hero Grid Item: Hero Grid Item in Group: " + heroObject.groups[i].name + " at index: " + j + " has invalid playDuration(should be string)";
                }

            }


        }

    }

    function validateEmpty(heroObject) {
        if (!isString(heroObject.label)) {
            throw "Invalid Hero Empty Widget: has invalid label(should be string)";
        }

    }

    function validateHeroObject(heroObject) {
        //check to make sure the object has a valid type
        if (heroObject.type == undefined || (heroObject.type != "list" && heroObject.type != "grid" && heroObject.type != "empty")) {
            throw "Invalid Hero Object: HeroObject does not contain an object type. Valid types are: list, grid, and empty";
        }

        //validate list object
        if (heroObject.type == "list") {

            validateList(heroObject);
        }

        //validate grid object
        if (heroObject.type == "grid") {
            validateGrid(heroObject);
        }

        //validate empty object
        if (heroObject.type == "empty") {

            validateEmpty(heroObject);
        }

    }



    /**
     * Update the badge number of the application to the given number.
     * @memberof amazonHomeManager
     * @namespace amazonHomeManager
     * @method updateNumericBadge
     * @public
     * @param {number} badgeNumber - The number you would like to update the badge to.
     */
    HomeManager.prototype.updateNumericBadge = function(badgeNumber) {

        //check that badge number is an actual number
        if (typeof badgeNumber != "number") {
            throw "updateNumericBadge: badgeNumber is not a number";
        }

        //check that badge number is an integer and not a float
        if (badgeNumber % 1 != 0) {
            throw "updateNumericBadge: badgeNumber is not an integer";
        }

        cordova.exec(function() {}, function(error) {
            console.log("Native error: " + error)
        }, PLUGIN_NAME, "updateBadge", [{
            "badge": badgeNumber
        }]);
    };


    /**
     * Sets the homescreen widget to what is specified in the given hero object.
     * @memberof amazonHomeManager
     * @namespace amazonHomeManager
     * @method updateWidget
     * @public
     * @param {heroObject} heroObject - The object containing the widget information you would like to set the widget to.
     */
    HomeManager.prototype.updateWidget = function(heroObject) {

        validateHeroObject(heroObject);


        cordova.exec(function() {}, function(error) {
            console.log("Native error: " + error)
        }, PLUGIN_NAME, "updateWidget", [heroObject]);
    };

    /**
     * Set the javascript handler function for the homescreen widget.
     * @memberof amazonHomeManager
     * @namespace amazonHomeManager
     * @method setHeroHandler
     * @public
     * @param {function} handler - The callback handler which handles touches to the homescreen widget, gets called with the data provided by the hero object.
     */
    HomeManager.prototype.setHeroHandler = function(handler) {

        //Check if the callback is a valid function.
        if (typeof handler != "function") {
            throw "setHeroHandler: handler is not a function";
        }

        this.intentCallbackFunction = handler;
        cordova.exec(handler, function(error) {
            console.log("Native error: " + error)
        }, PLUGIN_NAME, "setHeroCallback", []);
    };

    // delay initialization until plugin is ready
    channel.createSticky('onAmazonHomeManagerPluginReady');
    channel.waitForInitialization('onAmazonHomeManagerPluginReady');

    function firePluginReady() {
        channel.onAmazonHomeManagerPluginReady.fire();
    }

    // check if plugin is supported
    cordova.exec(function() {
        // read last callback data
        cordova.exec(function(data) {
            amazonHomeManager.lastLaunchCallbackData = data;
            // attach amazonHomeManager to window
            channel.onCordovaReady.subscribe(function() {
                window.amazonHomeManager = amazonHomeManager;
            });
            firePluginReady();
        }, firePluginReady, PLUGIN_NAME, "getHeroCallbackData", []);
    }, firePluginReady, PLUGIN_NAME, "isSupported", []);


    return amazonHomeManager;
})();
