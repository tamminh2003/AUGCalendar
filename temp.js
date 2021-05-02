(function (window) {

    let Observer = {


        Utility: window.AUG.Utility,

        startColorChangeObserver: function startColorChangeObserver() {
            // placeholder for colorChangeObserver.observe( ... ) ;
        },

        startMutationObserver: function startMutationObserver() {
            this.mutationObserver.observe(document.querySelector('body'), { childList: true });
        },

        getColorChangeObserver: function getColorChangeObserver() {

            let colorChangeObserver = new MutationObserver(
                
                (function (m) {

                console.log("-----------------------------");
                console.log("colorChangeObserver activated");

                for (const eachM of m) {

                    console.log(eachM);
                    if (eachM.target.className.includes("calendar-field-select-icon")) {

                        console.log("color / event type of Event");
                        console.log(eachM.target.style.backgroundColor)

                        console.log("check if color in defaultColors");
                        if (!window.defaultColors.includes(window.rgbToHex(eachM.target.style.backgroundColor).toUpperCase())) { // <-- Check if current color matches with defaultColors
                            console.log("color not in defaultColors - set returnPreviousFlag");
                            window.returnPreviousFlag = true;

                            console.log('"click" to open color selector');
                            document.querySelector('.calendar-field.calendar-field-select.calendar-field-tiny').click();
                        }

                        else {
                            console.log("color in defaultColors - set previousColor to new current color");

                            console.log("get previousColor from current color on color selector icon");
                            window.previousColor = window.defaultColors.filter(function (currentValue) { // <-- filter defaultColors for previousColor
                                return currentValue == window.rgbToHex(document.querySelector('div.calendar-field-select-icon').style.backgroundColor).toUpperCase()
                            })[0]

                            console.log(`window.previousColor = ${window.previousColor}`); // <-- check value of previousColor

                            if (!window.previousColor) {
                                console.log("current color selector icon not in defaultColors");

                                console.log("set previousColor to default General");
                                window.previousColor = "#092CC"; // <-- set previousColor to General
                            }

                            console.log('set clickTarget based on previousColor');
                            window.clickTarget = window.defaultColors.indexOf(window.previousColor) + 1;
                            console.log(`window.clickTarget = ${window.clickTarget}`);
                        }
                    }
                }
                }).bind(this)
                
            )

            this.colorChangeObserver = colorChangeObserver;

        }, // <-- End of getColorChangeObserver method

        getMutationObserver: function getMutationObserver() {

            let mutationObserver = new MutationObserver(
            
                (function (m) {

                console.log("--------------------------");
                console.log("mutationObserver activated");
                console.log(m);

                for (const eachM of m) {

                    // Adding Nodes Handlers
                    if (eachM.addedNodes.length > 0) {

                        // Main popup added handler
                        if (eachM.addedNodes[0].className.includes('popup-window calendar-simple-view-popup')) {

                            console.log("simple event editor popup added");
                            console.log(eachM);

                            console.log("set initPopupFlag");
                            this.initPopupFlag = true;
                            console.log('"click" to open color selector');
                            eachM.addedNodes[0].querySelector('.calendar-field.calendar-field-select.calendar-field-tiny').click();
                        }

                        // Color Selector popup added handler
                        if (eachM.addedNodes[0].id.includes('menu-popup-color-select')) {

                            console.log("color selector popup added");
                            console.log(eachM);

                            // Add label to color
                            console.log("add color label");
                            for (const eachElem of eachM.addedNodes[0].querySelectorAll('.menu-popup-item-text')) {
                                eachElem.style.display = 'inline';
                                switch (eachElem.innerHTML) {
                                    case "#86B100":
                                        eachElem.innerHTML = "AUG Travel";
                                        break;
                                    case "#0092CC":
                                        eachElem.innerHTML = "General";
                                        break;
                                    case "#00AFC7":
                                        eachElem.innerHTML = "Marketing Promotions";
                                        break;
                                    case "#DA9100":
                                        eachElem.innerHTML = "Meeting";
                                        break;
                                    case "#00B38C":
                                        eachElem.innerHTML = "Personal";
                                        break;
                                    case "#DE2B24":
                                        eachElem.innerHTML = "Visits/PR";
                                        break;
                                    case "#BD7AC9":
                                        eachElem.innerHTML = "Social Media";
                                        break;
                                    case "#838FA0":
                                        eachElem.innerHTML = "Others";
                                        break;
                                    default:
                                        eachElem.parentElement.remove();
                                        break;
                                };
                            }
                            // <-- End of add label to color

                            console.log("hide color selector");
                            eachM.addedNodes[0].style.visibility = "hidden";

                            console.log("extend color selector");
                            eachM.addedNodes[0].style.width = '190px';

                            // Initiate new simple event editor popup
                            if (this.initPopupFlag) {
                                console.log("<<--init new simple event editor popup-->");

                                console.log("clear initPopupFlag flag");
                                this.initPopupFlag = false;

                                console.log("get previousColor from current color on color selector icon");
                                this.previousColor = this.Utility.defaultColors.filter(function (currentValue) { // <-- filter defaultColors for previousColor
                                    return currentValue == this.Utility.rgbToHex(document.querySelector('div.calendar-field-select-icon').style.backgroundColor).toUpperCase()
                                })[0]

                                console.log(`Observer.previousColor = ${this.previousColor}`); // <-- check value of previousColor

                                if (!this.previousColor) {
                                    console.log("current color selector icon not in defaultColors");

                                    console.log("set previousColor to default General");
                                    this.previousColor = "#092CC"; // <-- set previousColor to General
                                }

                                console.log('set clickTarget based on previousColor');
                                this.clickTarget = this.Utility.defaultColors.indexOf(this.previousColor) + 1;
                                console.log(`Observer.clickTarget = ${this.clickTarget}`);

                                console.log('"click" color selector');
                                eachM.addedNodes[0].querySelector(`span.menu-popup-item:nth-child(${window.clickTarget})`).click(); // <-- Closing of color selector Popup

                                // Setup colorChangeObserver
                                console.log("Setup colorChangeObserver");
                                this.colorChangeObserver.observe(document.querySelector('.calendar-field-select-icon'), { attributeFilter: ["style"] });
                                // <-- End of setting up colorChangeObserver

                                // <-- Check if color selector popup close at every branch
                            }

                            else if (this.returnPreviousFlag) {
                                console.log("clear returnPreviousFlag");
                                this.returnPreviousFlag = false;

                                console.log('"click" color selector');
                                eachM.addedNodes[0].querySelector(`span.menu-popup-item:nth-child(${this.clickTarget})`).click(); // <-- Closing of color selector Popup 
                            }

                            else {
                                // Show popup <-- Last possible case
                                console.log("show color selector popup - last possible case");
                                eachM.addedNodes[0].style.visibility = "visible";
                            }

                        }

                        // Section Selector Popup Handler
                        if (eachM.addedNodes[0].id.includes('menu-popup-section-select')) {
                            this.sectionSelectorFlag = true; // <-- currently unused
                        }

                    }
                    // <------------------------------

                    // Removing Nodes Handlers
                    if (eachM.removedNodes.length > 0) {

                        // Main popup removed handler
                        if (eachM.removedNodes[0].className.includes('popup-window calendar-simple-view-popup')) {
                            console.log("popup removed");
                            console.log(eachM);

                            this.colorChangeObserver.disconnect();
                            // disconnect window.colorChangeObserver;
                        }

                    }
                    // <------------------------------

                }
         
            
                }).bind(this)

            )

            this.mutationObserver = mutationObserver;

        }, // <-- End of getMutationObserver method


    } // <-- End of Obsever Object Definition --------

    window.AUG.Observer = Observer;

})(window);



// Utility
window.defaultColors = ["#86B10", "#092CC", "#0AFC7", "#DA910", "#0B38C", "#DE2B24", "#BD7AC9", "#838FA0"];

window.rgbToHex = function (rgbstring) {
    rgbArray = rgbstring.match(/[0-9]*/g).filter(function (element) {
        return element !== '';
    })
    hexArray = rgbArray.map(function (element) {
        return parseInt(element).toString(16);
    });
    return `#${hexArray[0]}${hexArray[1]}${hexArray[2]}`;
}

window.colorChangeObserver = new MutationObserver(function (m) { // <-- done

    console.log("-----------------------------");
    console.log("colorChangeObserver activated");

    for (const eachM of m) {
        console.log(eachM);
        if (eachM.target.className.includes("calendar-field-select-icon")) {

            console.log("color / event type of Event");
            console.log(eachM.target.style.backgroundColor)

            console.log("check if color in defaultColors");
            if (!window.defaultColors.includes(window.rgbToHex(eachM.target.style.backgroundColor).toUpperCase())) { // <-- Check if current color matches with defaultColors
                console.log("color not in defaultColors - set returnPreviousFlag");
                window.returnPreviousFlag = true;

                console.log('"click" to open color selector');
                document.querySelector('.calendar-field.calendar-field-select.calendar-field-tiny').click();
            }

            else {
                console.log("color in defaultColors - set previousColor to new current color");

                console.log("get previousColor from current color on color selector icon");
                window.previousColor = window.defaultColors.filter(function (currentValue) { // <-- filter defaultColors for previousColor
                    return currentValue == window.rgbToHex(document.querySelector('div.calendar-field-select-icon').style.backgroundColor).toUpperCase()
                })[0]

                console.log(`window.previousColor = ${window.previousColor}`); // <-- check value of previousColor

                if (!window.previousColor) {
                    console.log("current color selector icon not in defaultColors");

                    console.log("set previousColor to default General");
                    window.previousColor = "#092CC"; // <-- set previousColor to General
                }

                console.log('set clickTarget based on previousColor');
                window.clickTarget = window.defaultColors.indexOf(window.previousColor) + 1;
                console.log(`window.clickTarget = ${window.clickTarget}`);
            }
        }
    }
});
// --------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------

if (window.mutationObserver) {
    console.log('mutationObserver exist, deleting mutationObserver');
    window.mutationObserver.disconnect();
    delete window.mutationObserver;
}

if (!window.mutationObserver) {
    console.log("no mutationObserver, creating new mutationObserver");
    window.mutationObserver = new MutationObserver(function (m) {
        console.log("--------------------------");
        console.log("mutationObserver activated");
        console.log(m);

        for (const eachM of m) {

            // Adding Nodes Handlers
            if (eachM.addedNodes.length > 0) {

                // Main popup added handler
                if (eachM.addedNodes[0].className.includes('popup-window calendar-simple-view-popup')) {

                    console.log("simple event editor popup added");
                    console.log(eachM);

                    console.log("set initPopupFlag");
                    window.initPopupFlag = true;
                    console.log('"click" to open color selector');
                    eachM.addedNodes[0].querySelector('.calendar-field.calendar-field-select.calendar-field-tiny').click();
                }

                // Color Selector popup added handler
                if (eachM.addedNodes[0].id.includes('menu-popup-color-select')) {

                    console.log("color selector popup added");
                    console.log(eachM);

                    // Add label to color
                    console.log("add color label");
                    for (const eachElem of eachM.addedNodes[0].querySelectorAll('.menu-popup-item-text')) {
                        eachElem.style.display = 'inline';
                        switch (eachElem.innerHTML) {
                            case "#86B100":
                                eachElem.innerHTML = "AUG Travel";
                                break;
                            case "#0092CC":
                                eachElem.innerHTML = "General";
                                break;
                            case "#00AFC7":
                                eachElem.innerHTML = "Marketing Promotions";
                                break;
                            case "#DA9100":
                                eachElem.innerHTML = "Meeting";
                                break;
                            case "#00B38C":
                                eachElem.innerHTML = "Personal";
                                break;
                            case "#DE2B24":
                                eachElem.innerHTML = "Visits/PR";
                                break;
                            case "#BD7AC9":
                                eachElem.innerHTML = "Social Media";
                                break;
                            case "#838FA0":
                                eachElem.innerHTML = "Others";
                                break;
                            default:
                                eachElem.parentElement.remove();
                                break;
                        };
                    }
                    // <-- End of add label to color

                    console.log("hide color selector");
                    eachM.addedNodes[0].style.visibility = "hidden";

                    console.log("extend color selector");
                    eachM.addedNodes[0].style.width = '190px';

                    // Initiate new simple event editor popup
                    if (window.initPopupFlag) {
                        console.log("<<--init new simple event editor popup-->");

                        console.log("clear initPopupFlag flag");
                        window.initPopupFlag = false;

                        console.log("get previousColor from current color on color selector icon");
                        window.previousColor = window.defaultColors.filter(function (currentValue) { // <-- filter defaultColors for previousColor
                            return currentValue == window.rgbToHex(document.querySelector('div.calendar-field-select-icon').style.backgroundColor).toUpperCase()
                        })[0]

                        console.log(`window.previousColor = ${window.previousColor}`); // <-- check value of previousColor

                        if (!window.previousColor) {
                            console.log("current color selector icon not in defaultColors");

                            console.log("set previousColor to default General");
                            window.previousColor = "#092CC"; // <-- set previousColor to General
                        }

                        console.log('set clickTarget based on previousColor');
                        window.clickTarget = window.defaultColors.indexOf(window.previousColor) + 1;
                        console.log(`window.clickTarget = ${window.clickTarget}`);

                        console.log('"click" color selector');
                        eachM.addedNodes[0].querySelector(`span.menu-popup-item:nth-child(${window.clickTarget})`).click(); // <-- Closing of color selector Popup

                        // Setup colorChangeObserver
                        console.log("Setup colorChangeObserver");
                        window.colorChangeObserver.observe(document.querySelector('.calendar-field-select-icon'), { attributeFilter: ["style"] });
                        // <-- End of setting up colorChangeObserver

                        // <-- Check if color selector popup close at every branch
                    }

                    else if (window.returnPreviousFlag) {
                        console.log("clear returnPreviousFlag");
                        window.returnPreviousFlag = false;

                        console.log('"click" color selector');
                        eachM.addedNodes[0].querySelector(`span.menu-popup-item:nth-child(${window.clickTarget})`).click(); // <-- Closing of color selector Popup 
                    }

                    else {
                        // Show popup <-- Last possible case
                        console.log("show color selector popup - last possible case");
                        eachM.addedNodes[0].style.visibility = "visible";
                    }

                }

                // Section Selector Popup Handler
                if (eachM.addedNodes[0].id.includes('menu-popup-section-select')) {
                    window.sectionSelectorFlag = true;
                }

            }
            //

            // Removing Nodes Handlers
            if (eachM.removedNodes.length > 0) {

                // Main popup removed handler
                if (eachM.removedNodes[0].className.includes('popup-window calendar-simple-view-popup')) {
                    console.log("popup removed");
                    console.log(eachM);

                    window.colorChangeObserver.disconnect();
                    // delete window.colorChangeObserver;
                }

            }
            //

        }
    })
}

console.log("start mutationObserver");
window.mutationObserver.observe(document.querySelector('body'), { childList: true });