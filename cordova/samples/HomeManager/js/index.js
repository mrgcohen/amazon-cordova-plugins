/*
 * index.js
 *
 * Copyright (c) 2005-2014 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Use is subject to license terms.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    myIntentClickHandler: function() {

    },

    //sets a defualt list widget with some basic settings
    setWidgetDefault: function() {
        var listHeroObject = {
            type: "list",
            groups: [ //group array
                {
                    name: "groupA", // group name *required
                    listItems: [{
                        visualStyle: "DEFAULT", //DEFAULT, PEEKABLE , SHOPPING, SHOPPING_RETAIL, SIMPLE, SHOPPING_RETAIL
                        img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png", //icon URL
                        openAppOnTouch: true, //defaults to true, false activates callback function without opening app
                        primaryText: "Group A List Item 1", //primary text, *probably required at this point
                        secondaryText: "Group A List Item 1 Secondary Text",
                        tertiaryText: "Group A List Item 1 Tertiary Text",
                        callbackData: "Group A Item 1 CB Data",
                    }, {
                        visualStyle: "DEFAULT", //DEFAULT, PEEKABLE , SHOPPING, SHOPPING_RETAIL, SIMPLE, SHOPPING_RETAIL
                        img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png", //icon URL
                        openAppOnTouch: true, //defaults to true, false activates callback function without opening app
                        primaryText: "Group A List Item 2", //primary text, *probably required at this point
                        secondaryText: "Group A List Item 2 Secondary Text",
                        tertiaryText: "Group A List Item 2 Tertiary Text",
                        callbackData: "Group A Item 2 CB Data",
                        starRating: 3.5,
                    }],
                }, {
                    name: "groupB", // group name *required
                    listItems: [{
                        visualStyle: "DEFAULT", //DEFAULT, PEEKABLE , SHOPPING, SHOPPING_RETAIL, SIMPLE, SHOPPING_RETAIL
                        img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png", //icon URL
                        openAppOnTouch: true, //defaults to true, false activates callback function without opening app
                        primaryText: "Group B List Item 1", //primary text, *probably required at this point
                        secondaryText: "Group B List Item 1 Secondary Text",
                        tertiaryText: "Group B List Item 1 Tertiary Text",
                        callbackData: "Group B Item 1 CB Data",
                    }, {
                        visualStyle: "DEFAULT", //DEFAULT, PEEKABLE , SHOPPING, SHOPPING_RETAIL, SIMPLE, SHOPPING_RETAIL
                        img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png", //icon URL
                        openAppOnTouch: true, //defaults to true, false activates callback function without opening app
                        primaryText: "Group B List Item 2", //primary text, *probably required at this point
                        secondaryText: "Group B List Item 2 Secondary Text",
                        tertiaryText: "Group B List Item 2 Tertiary Text",
                        callbackData: "Group B Item 2 CB Data",
                    }],
                },
            ],
        }


        window.amazonHomeManager.updateWidget(listHeroObject);
    },

    //just a test function to make sure javascript isn't in an error state
    testJS: function() {
        alert("testing javascript..");
    },

    //sets a grid widgets with some default settings
    setWidgetGrid: function() {
        var gridHeroObject = {
            type: "grid",
            groups: [ //group array
                {
                    name: "groupA", // group name *required
                    gridItems: [{
                            img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                            openAppOnTouch: true, //defaults to true, false activates callback function without opening app
                            callbackData: "group A grid item 1",
                        }, {
                            img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                            openAppOnTouch: true, //defaults to true, false activates callback function without opening app
                            callbackData: "group A grid item 2",
                        }, {
                            img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                            openAppOnTouch: true, //defaults to true, false activates callback function without opening app
                            callbackData: "group A grid item 3",
                        }, {
                            img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                            openAppOnTouch: true, //defaults to true, false activates callback function without opening app
                            callbackData: "group A grid item 4",
                        }, {
                            img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                            openAppOnTouch: true, //defaults to true, false activates callback function without opening app
                            callbackData: "group A grid item 5",
                        }, {
                            img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                            openAppOnTouch: true, //defaults to true, false activates callback function without opening app
                            callbackData: "group A grid item 6",
                        }

                    ],
                }, {
                    name: "groupB", // group name *required
                    gridItems: [{
                            img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                            openAppOnTouch: true, //defaults to true, false activates callback function without opening app
                            callbackData: "group B grid item 1",
                        }, {
                            img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                            openAppOnTouch: true, //defaults to true, false activates callback function without opening app
                            callbackData: "group B grid item 2",
                        }, {
                            img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                            openAppOnTouch: true, //defaults to true, false activates callback function without opening app
                            callbackData: "group B grid item 3",
                        }, {
                            img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                            openAppOnTouch: true, //defaults to true, false activates callback function without opening app
                            callbackData: "group A grid item 4",
                        }, {
                            img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                            openAppOnTouch: true, //defaults to true, false activates callback function without opening app
                            callbackData: "group B grid item 5",
                        }, {
                            img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                            openAppOnTouch: true, //defaults to true, false activates callback function without opening app
                            callbackData: "group B grid item 6",
                        }

                    ],
                },
            ],
        }


        window.amazonHomeManager.updateWidget(gridHeroObject);
    },

    //set a grid widget with some playbuttons and durations
    setGridWithPlay: function() {
        var gridHeroObject = {
            type: "grid",
            groups: [ //group array
                {
                    name: "groupA", // group name *required
                    gridItems: [{
                            img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                            openAppOnTouch: true, //defaults to true, false activates callback function without opening app
                            callbackData: "group A grid item 1",
                            playButton: true, //defaults to false
                            playDuration: "23:45",
                        }, {
                            img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                            openAppOnTouch: true, //defaults to true, false activates callback function without opening app
                            callbackData: "group A grid item 2",
                        }, {
                            img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                            openAppOnTouch: true, //defaults to true, false activates callback function without opening app
                            callbackData: "group A grid item 3",
                            playButton: true, //defaults to false
                            playDuration: "23:45 test test test",
                        }, {
                            img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                            openAppOnTouch: true, //defaults to true, false activates callback function without opening app
                            callbackData: "group A grid item 4",
                            playButton: true, //defaults to false
                        }, {
                            img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                            openAppOnTouch: true, //defaults to true, false activates callback function without opening app
                            callbackData: "group A grid item 5",
                        }, {
                            img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                            openAppOnTouch: true, //defaults to true, false activates callback function without opening app
                            callbackData: "group A grid item 6",
                        }

                    ],
                }, {
                    name: "groupB", // group name *required
                    gridItems: [{
                            img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                            openAppOnTouch: true, //defaults to true, false activates callback function without opening app
                            callbackData: "group B grid item 1",
                        }, {
                            img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                            openAppOnTouch: true, //defaults to true, false activates callback function without opening app
                            callbackData: "group B grid item 2",
                        }, {
                            img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                            openAppOnTouch: true, //defaults to true, false activates callback function without opening app
                            callbackData: "group B grid item 3",
                        }, {
                            img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                            openAppOnTouch: true, //defaults to true, false activates callback function without opening app
                            callbackData: "group A grid item 4",
                        }, {
                            img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                            openAppOnTouch: true, //defaults to true, false activates callback function without opening app
                            callbackData: "group B grid item 5",
                        }, {
                            img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                            openAppOnTouch: true, //defaults to true, false activates callback function without opening app
                            callbackData: "group B grid item 6",
                        }

                    ],
                },
            ],
        }

        window.amazonHomeManager.updateWidget(gridHeroObject);
    },

    //sets the badge to 10
    setBadgeTen: function() {
        window.amazonHomeManager.updateNumericBadge(10);
    },
    //sets the badge to a high number will show 99+
    setBadgeHigh: function() {
        window.amazonHomeManager.updateNumericBadge(1240);
    },

    //removes the badge by setting to 0
    removeBadge: function() {
        window.amazonHomeManager.updateNumericBadge(0);
    },

    //sets an empty widget with a label
    setWidgetEmpty: function() {
        var emptyHeroObject = {
            type: "empty",
            label: "This is the empty text...",
        };
        window.amazonHomeManager.updateWidget(emptyHeroObject);

    },

    //set an empty widget with no label
    setEmptyNoText: function() {
        var emptyHeroObject = {
            type: "empty",
        };
        window.amazonHomeManager.updateWidget(emptyHeroObject);
    },

    //sets a list view widget with all the different visual styles
    setWidgetAllStyles: function() {
        var listHeroObject = {
            type: "list",
            groups: [ //group array
                {
                    name: "groupA", // group name *required
                    listItems: [{
                        visualStyle: "DEFAULT", //DEFAULT, PEEKABLE , SHOPPING, SHOPPING_RETAIL, SIMPLE, SHOPPING_RETAIL
                        img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png", //icon URL
                        secondaryImg: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                        tertiaryImg: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                        quaternaryImg: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                        openAppOnTouch: true, //defaults to true, false activates callback function without opening app
                        primaryText: "Visual Style: DEFAULT", //primary text, *probably required at this point
                        secondaryText: "Secondary Text",
                        tertiaryText: "Tertiary Text",
                        quaternaryText: "Quaternary Text",
                        callbackData: "DEFAULT Visual Callback",
                        starRating: 3.5,
                    }, {
                        visualStyle: "PEEKABLE", //DEFAULT, PEEKABLE , SHOPPING, SHOPPING_RETAIL, SIMPLE, SHOPPING_RETAIL
                        img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png", //icon URL
                        secondaryImg: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                        tertiaryImg: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                        quaternaryImg: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                        openAppOnTouch: true, //defaults to true, false activates callback function without opening app
                        primaryText: "Visual Style: PEEKABLE", //primary text, *probably required at this point
                        secondaryText: "Secondary Text",
                        tertiaryText: "Tertiary Text",
                        quaternaryText: "Quaternary Text",
                        callbackData: "PEEKABLE Visual Callback",
                        starRating: 3.5,
                    }, {
                        visualStyle: "SHOPPING", //DEFAULT, PEEKABLE , SHOPPING, SHOPPING_RETAIL, SIMPLE, SHOPPING_RETAIL
                        img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png", //icon URL
                        secondaryImg: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                        tertiaryImg: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                        quaternaryImg: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                        openAppOnTouch: true, //defaults to true, false activates callback function without opening app
                        primaryText: "Visual Style: SHOPPING", //primary text, *probably required at this point
                        secondaryText: "Secondary Text",
                        tertiaryText: "Tertiary Text",
                        quaternaryText: "Quaternary Text",
                        callbackData: "SHOPPING Visual Callback",
                        starRating: 3.5,
                    }, {
                        visualStyle: "SHOPPING_RETAIL", //DEFAULT, PEEKABLE , SHOPPING, SHOPPING_RETAIL, SIMPLE, SHOPPING_RETAIL
                        img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png", //icon URL
                        secondaryImg: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                        tertiaryImg: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                        quaternaryImg: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                        openAppOnTouch: true, //defaults to true, false activates callback function without opening app
                        primaryText: "Visual Style: SHOPPING_RETAIL", //primary text, *probably required at this point
                        secondaryText: "Secondary Text",
                        tertiaryText: "Tertiary Text",
                        quaternaryText: "Quaternary Text",
                        callbackData: "SHOPPING_RETAIL Visual Callback",
                        starRating: 3.5,
                    }, {
                        visualStyle: "SIMPLE", //DEFAULT, PEEKABLE , SHOPPING, SHOPPING_RETAIL, SIMPLE, SHOPPING_RETAIL
                        img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png", //icon URL
                        secondaryImg: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                        tertiaryImg: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                        quaternaryImg: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                        openAppOnTouch: true, //defaults to true, false activates callback function without opening app
                        primaryText: "Visual Style: SIMPLE", //primary text, *probably required at this point
                        secondaryText: "Secondary Text",
                        tertiaryText: "Tertiary Text",
                        quaternaryText: "Quaternary Text",
                        callbackData: "SIMPLE Visual Callback",
                        starRating: 3.5,
                    }, {
                        visualStyle: "WRAPPED_TEXT", //DEFAULT, PEEKABLE , SHOPPING, SHOPPING_RETAIL, SIMPLE, SHOPPING_RETAIL
                        img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png", //icon URL
                        secondaryImg: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                        tertiaryImg: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                        quaternaryImg: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonMobileApps/amazon-apps-store-us-white.png",
                        openAppOnTouch: true, //defaults to true, false activates callback function without opening app
                        primaryText: "Visual Style: WRAPPED_TEXT", //primary text, *probably required at this point
                        secondaryText: "Secondary Text",
                        tertiaryText: "Tertiary Text",
                        quaternaryText: "Quaternary Text",
                        callbackData: "WRAPPED_TEXT Visual Callback",
                        starRating: 3.5,
                    }],
                },
            ],
        }

        window.amazonHomeManager.updateWidget(listHeroObject);
    },

    //on device ready
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        //check our variable to see how the app was started and if the API exists.
        if (window.amazonHomeManager.lastLaunchCallbackData === null) {
            //started from normal home click
            document.getElementById("initial-text").innerHTML = "Started from normal home, no hero";
        } else if (window.amazonHomeManager.lastLaunchCallbackData === undefined) {
            //API doesn't exist
            document.getElementById("initial-text").innerHTML = "Home Manager API  not supported on this device";
        } else {
            //started from hero widget
            document.getElementById("initial-text").innerHTML = "started from widget: " + window.amazonHomeManager.lastLaunchCallbackData;
        }

        //set the hero callback function with an anonymous function
        window.amazonHomeManager.setHeroHandler(function(data) {
            console.log("recieved hero function in JS with data: " + data);
            document.getElementById("callback-text").innerHTML = "anonymous function: " + data;

        });

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};
