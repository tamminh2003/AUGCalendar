// Adding Label to Color Picker in the Main New Event Menu
if (!someNumber) {
    var someNumber;
}

if (!choosingCalendar) {
    var choosingCalendar;
}

function rgbtohex(rgbstring) {
    rgbArray = rgbstring.match(/[0-9]*/g).filter(function (element) { return element !== ''; })
    hexArray = rgbArray.map(function (element) { return parseInt(element).toString(16); });
    return `#${hexArray[0]}${hexArray[1]}${hexArray[2]}`;
}

defaultColors = [
    "#86B10",
    "#092CC",
    "#0AFC7",
    "#DA910",
    "#0B38C",
    "#DE2B24",
    "#BD7AC9",
    "#838FA0",
];

if (window.colorPopupObserver) colorPopupObserver.disconnect();

colorChangeObserverCallback = function (m) {
    for (const eachM of m) {
        if (!defaultColors.includes(rgbtohex(eachM.target.style.backgroundColor).toUpperCase())) {
            console.log('Eyy, this is when choosing calendar');
            console.log(eachM);
            choosingCalendar = true;
            document.querySelector('div.calendar-field').click();
        }
    }
}

if (!window.colorChangeObserver) {
    colorChangeObserver = new MutationObserver(colorChangeObserverCallback)
}
else {
    colorChangeObserver.disconnect();
    colorChangeObserver = new MutationObserver(colorChangeObserverCallback)
}

AUG_mutationObserverCallback = function (m) {
    myRegex = /.*calendar-field-colorpicker.*/i;
    for (const eachM of m) {
        if (myRegex.test(eachM.target.className)) {
            eachM.target.style.display = 'flex';
            eachM.target.style.justifyContent = 'space-evenly';
            eachM.target.style.flexWrap = 'wrap';

            if (eachM.addedNodes.length > 0 && eachM.addedNodes[0].nodeName == 'LI') {
                eachM.addedNodes[0].style.display = 'block';
                label = eachM.addedNodes[0].appendChild(document.createElement('DIV'));
                label.style.position = 'absolute';
                label.style.left = '30px';
                label.style.top = '6px';
                label.style.width = 'max-content';
                switch (eachM.addedNodes[0].dataset.bxCalendarColor) {
                    case "#86B100":
                        eventName = 'AUG Travel';
                        break;
                    case "#0092CC":
                        eventName = 'General';
                        break;
                    case "#00AFC7":
                        eventName = 'Marketing Promotion';
                        label.style.top = '0px';
                        label.style.width = 'min-content';
                        break;
                    case "#DA9100":
                        eventName = 'Meeting';
                        break;
                    case "#00B38C":
                        eventName = 'Personal';
                        break;
                    case "#DE2B24":
                        eventName = 'Visits/PR';
                        break;
                    case "#BD7AC9":
                        eventName = 'Social Media';
                        break;
                    case "#838FA0":
                        eventName = 'Others';
                        break;
                    default:
                        eachM.addedNodes[0].remove();
                        break;
                }
                label.innerHTML = `${eventName}`;
            }
        }
    }

    regexPattern = /.*popup-window calendar-simple-view-popup.*/gi;
    for (const eachM of m) {
        if (regexPattern.test(eachM.target.className)) {
            eachM.target.querySelector('div.calendar-field').click();
        }
    }

    regexPattern = /.*popup-window-content-menu-popup-color-select.*/g;
    for (const eachM of m) {
        if (regexPattern.test(eachM.target.id)) {
            console.log(eachM);
            eachM.target.parentElement.style.width = '190px';
            eachM.target.parentElement.style.visibility = 'hidden';

            for (const eachElem of eachM.target.querySelectorAll('.menu-popup-item-text')) {
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

            if (!someNumber) {
                console.log('Eyy, show popup first');
                selector = document.querySelectorAll('.popup-window-content');
                selectorID = selector[selector.length - 1].id.split('-');
                someNumber = parseInt(selectorID[selectorID.length - 1]);
                document.querySelector('span.menu-popup-item:nth-child(2)').click();
                colorChangeObserver.observe(document.querySelector('.calendar-field-select-icon'), { attributes: true });
            } else {
                console.log('Eyy, subsequence popup')
                selector = document.querySelectorAll('.popup-window-content');
                selectorID = selector[selector.length - 1].id.split('-');
                newNumber = parseInt(selectorID[selectorID.length - 1]);
                if (someNumber !== newNumber) {
                    console.log('Eyy, this popup is different from last popup');
                    someNumber = newNumber;
                    document.querySelector('span.menu-popup-item:nth-child(2)').click();
                    return;
                }
                if (choosingCalendar) {
                    console.log('choosing calendar');
                    document.querySelector('span.menu-popup-item:nth-child(2)').click();
                    choosingCalendar = false;
                    return;
                } 
                {
                    console.log('Eyy, this suppose to show the popup again');
                    eachM.target.parentElement.style.visibility = 'visible';
                }
            }
        }
    }
}


if (window.AUG_mutationObserver) colorPopupObserver.disconnect();

AUG_mutationObserver = new MutationObserver(AUG_mutationObserverCallback);

AUG_mutationObserver.observe(document.querySelector('body'), { subtree: true, childList: true });

// -------------------------------------


