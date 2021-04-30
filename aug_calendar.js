console.log("Start of AUG_Calendar custom script");
console.log("-----------------------------------");

// ! Description: this file contains a custom AUG_Calendar object that is added to the global object (window) and can be access by window.AUG_Calendar. The AUG_Calendar object contains methods for the custom script aug_calendar.js
// ! The use of IIFE (Immediately Invoked Function Expression) aka self-invoke function is to keep the global scope free of identifiers during the creation of the AUG_Calendar object.
function documentCompleteHandler() {
    try {
        // Testing if document is ready
        if (document.readyState !== "complete") {
            return; // document object is not ready, quit execution
        }

        (function (window) {
            window.AUG = {}; // AUG is the base object containing all the injected modules for Bitrix's Calendar Module.
        })(window);

        // ------------------------------------------
        // SECTION AUG.Calendar 
        (function (window) {

            class Calendar {
                constructor() {
                    this.name = "AUG_Calendar";
                    this.calendar = this.getCalendarInstance(window.BXEventCalendar);
                    this.eventType = [
                        { name: 'augTravel', color: '#86b100', active: true, title: 'AUG Travel' },
                        { name: 'general', color: '#0092cc', active: true, title: 'General' },
                        { name: 'marketing', color: '#00afc7', active: true, title: 'Marketing Promotions' },
                        { name: 'meeting', color: '#da9100', active: true, title: 'Meeting' },
                        { name: 'personal', color: '#00b38c', active: true, title: 'Personal' },
                        { name: 'visitpr', color: '#de2b24', active: true, title: 'Visits/PR' },
                        { name: 'social', color: '#bd7ac9', abctive: true, title: 'Social Media' },
                        { name: 'others', color: '#838fa0', active: true, title: 'Others' }
                    ];

                    this.companyCalendar = this.getAvailableSection().filter(function (section) { return section.type == "company_calendar" });
                    for (const section of this.companyCalendar) {
                        section.active = true;
                    }

                    this.workgroupCalendar = this.getAvailableSection().filter(function (section) { return section.type == "group" });
                    for (const section of this.workgroupCalendar) {
                        section.active = true;
                    }
                }

                // AUG CALENDAR UTILITY
                getCalendarInstance(calendarObject) {
                    return calendarObject.instances[Object.keys(calendarObject.instances)[0]];
                }

                getEventTypeList() {
                    return this.eventType;
                }

                getAvailableSection() {
                    return this.calendar.sectionController.sections;
                }

                refreshCalendarDisplay() {
                    let params = {};
                    params.eventType = window.AUG.Calendar.getEventTypeList();
                    params.workgroupCalendar = window.AUG.Calendar.workgroupCalendar;
                    params.companyCalendar = window.AUG.Calendar.companyCalendar;
                    window.AUG.Calendar.calendar.views[2].displayEntries(params);
                }

                // AUG CALENDAR HANDLER
                popupButtonHandler(e) {
                    let augFilterPopup = document.querySelector('.aug-filter-popup');

                    if (!augFilterPopup.classList.contains('aug-popup-show')) {
                        document.querySelector('.page-header').style.opacity = 1;
                        augFilterPopup.classList.add('aug-popup-show');
                        augFilterPopup.style.visibility = 'visible';
                        // augFilterPopup.style.top = (11 - ((parseInt(window.getComputedStyle(augFilterPopup).height) / 2))).toString() + 'px';
                    } else {
                        document.querySelector('.page-header').style.opacity = 0.96;
                        augFilterPopup.classList.remove('aug-popup-show');
                        augFilterPopup.style.visibility = 'hidden';

                    }
                }

                checkOutsideFilterPopup(e) {
                    // console.log(e);

                    let selectedPopup = document.querySelector('.aug-filter-popup.aug-popup-show');

                    if (!selectedPopup) {
                        return;
                    }

                    if (!selectedPopup.className.includes("aug-popup-show")) {
                        return;
                    } else {
                        for (const eachElem of e.path) {

                            if (!eachElem.className) {
                                if (eachElem.className == "") continue;
                                else break;
                            }

                            if (eachElem.className.includes("aug-filter-popup-button")) {
                                return;
                            }

                            if (eachElem.className.includes("aug-filter-popup aug-popup-show")) {
                                return;
                            }
                        }

                        selectedPopup.classList.remove('aug-popup-show');
                        selectedPopup.style.visibility = "hidden";
                    }
                }

                // MAIN METHODS
                createCustomFilter() {
                    this.assignAUGdisplayEntries();
                    let wrap = document.querySelector('.calendar-view-switcher-list');

                    // Add Popup button
                    let filterContainer = document.querySelector('.aug-filter-container');
                    if (!filterContainer) filterContainer = wrap.appendChild(BX.create("div", { attrs: { class: "aug-filter-container" } }))
                    filterContainer.style.position = 'relative';

                    let popupButton = filterContainer.querySelector('.aug-filter-popup-button');
                    if (!popupButton) popupButton = filterContainer.appendChild(BX.create('button', { attrs: { class: "aug-filter-popup-button ui-btn ui-btn-themes ui-btn-xs ui-btn-primary ui-btn-round" }, text: 'Filter Options' }));
                    popupButton.addEventListener('click', window.AUG.Calendar.popupButtonHandler);

                    // Add Popup div
                    let augFilterPopup = this.buildPopup(filterContainer);

                    // Add option in Popup Div
                    this.displayOptions(augFilterPopup);

                    // Handler to close the popup when not focused
                    document.addEventListener('click', this.checkOutsideFilterPopup);
                }

                displayOptions(container) {
                    let eventType = this.eventType;

                    if (!container) {
                        console.log('Error, no container.');
                        return;
                    }

                    // Clear container
                    if (container.querySelector('.aug-main-option-container')) container.querySelector('.aug-main-option-container').remove();
                    let mainOptionContainer = container.appendChild(BX.create('div', { attrs: { class: 'aug-main-option-container' } }));

                    // Generate User Filter 
                    let optionFilterContainer = mainOptionContainer.appendChild(BX.create('div', { attrs: { class: 'event-type-filter' }, text: 'Event Type' }));

                    for (const eventElement of eventType) {
                        let optionName = eventElement.title;
                        let optionContainer = optionFilterContainer.appendChild(BX.create('div', { attrs: { class: 'option-container', 'data-name': eventElement.name } }));
                        optionContainer.appendChild(BX.create('input', { attrs: { type: 'checkbox' } }));
                        optionContainer.appendChild(BX.create('span', { attrs: { class: 'aug-option-name' }, text: optionName }));
                    }

                    // Select All button
                    optionFilterContainer.appendChild(BX.create('button', { attrs: { class: 'select-all-button' }, text: 'Select All' }));
                    optionFilterContainer.querySelector('button.select-all-button').addEventListener('click', function (e) {
                        for (const checkbox of document.querySelectorAll("div.event-type-filter>div>input")) {
                            checkbox.checked = true;
                        }
                        for (const elementEvent of window.AUG.Calendar.eventType) {
                            elementEvent.active = true;
                        }
                        window.AUG.Calendar.refreshCalendarDisplay();
                    });
                    // <-- End of Select All button

                    // Deselect All button
                    optionFilterContainer.appendChild(BX.create('button', { attrs: { class: 'deselect-all-button' }, text: 'Deselect All' }));
                    optionFilterContainer.querySelector('button.deselect-all-button').addEventListener('click', function (e) {
                        for (const checkbox of document.querySelectorAll("div.event-type-filter>div>input")) {
                            checkbox.checked = false;
                        }
                        for (const elementEvent of window.AUG.Calendar.eventType) {
                            elementEvent.active = false;
                        }
                        window.AUG.Calendar.refreshCalendarDisplay();
                    });
                    // <-- End of Deselect All button

                    // Assign handler to event type checkboxes
                    for (const checkbox of document.querySelectorAll("div.event-type-filter>div>input")) {
                        checkbox.addEventListener('change', function (e) {
                            for (const elementEvent of window.AUG.Calendar.eventType) {
                                if (checkbox.parentElement.dataset.name == elementEvent.name) {
                                    elementEvent.active = checkbox.checked;
                                }
                            }
                            let params = {};
                            params.eventType = window.AUG.Calendar.getEventTypeList();
                            params.workgroupCalendar = window.AUG.Calendar.workgroupCalendar;
                            params.companyCalendar = window.AUG.Calendar.companyCalendar;
                            window.AUG.Calendar.calendar.views[2].displayEntries(params);
                        });
                    }
                    // <-- End of assign handler to event type checkboxes
                    // <-- End of user filter

                    // Generate Company Filter 
                    optionFilterContainer = mainOptionContainer.appendChild(BX.create('div', { attrs: { class: 'company-filter' }, text: 'Company Filter' }));

                    for (const section of this.companyCalendar) {
                        let optionContainer = optionFilterContainer.appendChild(BX.create('div', { attrs: { class: 'option-container' } }));
                        optionContainer.appendChild(BX.create('input', { attrs: { type: 'checkbox', "data-id": section.id } }));
                        optionContainer.appendChild(BX.create('span', { attrs: { class: 'aug-option-name' }, text: section.name }));
                    }

                    // Select All button
                    optionFilterContainer.appendChild(BX.create('button', { attrs: { class: 'select-all-button' }, text: 'Select All' }));
                    optionFilterContainer.querySelector('button.select-all-button').addEventListener('click', function (e) {
                        for (const checkbox of document.querySelectorAll("div.company-filter>div>input")) {
                            checkbox.checked = true;
                        }
                        for (const elementCompanyCalendar of window.AUG.Calendar.companyCalendar) {
                            elementCompanyCalendar.active = true;
                        }
                        window.AUG.Calendar.refreshCalendarDisplay();
                    });
                    //<-- End of Select All button

                    // Deselect All button
                    optionFilterContainer.appendChild(BX.create('button', { attrs: { class: 'deselect-all-button' }, text: 'Deselect All' }));
                    optionFilterContainer.querySelector('button.deselect-all-button').addEventListener('click', function (e) {
                        for (const checkbox of document.querySelectorAll("div.company-filter>div>input")) {
                            checkbox.checked = false;
                        }
                        for (const elementCompanyCalendar of window.AUG.Calendar.companyCalendar) {
                            elementCompanyCalendar.active = false;
                        }
                        window.AUG.Calendar.refreshCalendarDisplay();
                    });
                    // <-- End of Deselect All button

                    // Assign handler to company filter checkboxex
                    for (const checkbox of document.querySelectorAll("div.company-filter>div>input")) {
                        checkbox.addEventListener('change', function (e) {
                            for (const section of window.AUG.Calendar.companyCalendar) {
                                if (checkbox.dataset.id == section.id) {
                                    section.active = checkbox.checked;
                                }
                            }
                            let params = {};
                            params.eventType = window.AUG.Calendar.getEventTypeList();
                            params.workgroupCalendar = window.AUG.Calendar.workgroupCalendar;
                            params.companyCalendar = window.AUG.Calendar.companyCalendar;
                            window.AUG.Calendar.calendar.views[2].displayEntries(params);
                        });
                    }
                    // <-- End of assigning handler to company checkboxes
                    // <-- End of company filter

                    // Generate Workgroup Filter 
                    optionFilterContainer = mainOptionContainer.appendChild(BX.create('div', { attrs: { class: 'workgroup-filter' }, text: 'Workgroup Filter' }));

                    for (const section of this.workgroupCalendar) {
                        let optionContainer = optionFilterContainer.appendChild(BX.create('div', { attrs: { class: 'option-container' } }));
                        optionContainer.appendChild(BX.create('input', { attrs: { type: 'checkbox', 'data-id': section.id } }));
                        optionContainer.appendChild(BX.create('span', { attrs: { class: 'aug-option-name' }, text: section.name }));
                    }

                    // Select All button
                    optionFilterContainer.appendChild(BX.create('button', { attrs: { class: 'select-all-button' }, text: 'Select All' }));
                    optionFilterContainer.querySelector('button.select-all-button').addEventListener('click', function (e) {
                        for (const checkbox of document.querySelectorAll("div.workgroup-filter>div>input")) {
                            checkbox.checked = true;
                        }
                        for (const elementWorkgroupCalendar of window.AUG.Calendar.workgroupCalendar) {
                            elementWorkgroupCalendar.active = true;
                        }
                        window.AUG.Calendar.refreshCalendarDisplay();
                    });
                    //<-- End of Select All button

                    // Deselect All button
                    optionFilterContainer.appendChild(BX.create('button', { attrs: { class: 'deselect-all-button' }, text: 'Deselect All' }));
                    optionFilterContainer.querySelector('button.deselect-all-button').addEventListener('click', function (e) {
                        for (const checkbox of document.querySelectorAll("div.workgroup-filter>div>input")) {
                            checkbox.checked = false;
                        }
                        for (const elementWorkgroupCalendar of window.AUG.Calendar.workgroupCalendar) {
                            elementWorkgroupCalendar.active = false;
                        }
                        window.AUG.Calendar.refreshCalendarDisplay();
                    });
                    // <-- End of Deselect All button

                    // Assign handler to workgroup filter checkboxex
                    for (const checkbox of document.querySelectorAll("div.workgroup-filter>div>input")) {
                        checkbox.addEventListener('change', function (e) {
                            for (const section of window.AUG.Calendar.workgroupCalendar) {
                                if (checkbox.dataset.id == section.id) {
                                    section.active = checkbox.checked;
                                }
                            }
                            let params = {};
                            params.eventType = window.AUG.Calendar.getEventTypeList();
                            params.workgroupCalendar = window.AUG.Calendar.workgroupCalendar;
                            params.companyCalendar = window.AUG.Calendar.companyCalendar;
                            window.AUG.Calendar.calendar.views[2].displayEntries(params);
                        });
                    }
                    // <-- End of assigning handler to workgroup checkboxes
                    // <-- End of workgroup filter

                    // Make all checkboxes active 
                    for (const element of container.querySelectorAll('input')) {
                        element.checked = true;
                    };
                    // <-- End of make all checkboxes active

                    // Adding spaces between filter Section
                    for (const element of document.querySelector('.aug-main-option-container').children) {
                        element.style.paddingBottom = '10px';
                    }
                    // <-- End of adding spaces between filter section
                }

                buildPopup(container) {
                    let augFilterPopup = BX.create('div', { attrs: { class: 'aug-filter-popup' } });
                    container.appendChild(augFilterPopup);

                    augFilterPopup.style.position = 'absolute';
                    augFilterPopup.style.visibility = 'hidden';
                    augFilterPopup.style.left = (parseInt(window.getComputedStyle(container).width) + 10).toString() + 'px';
                    augFilterPopup.style.top = '10px';
                    augFilterPopup.style.width = 'max-content'
                    augFilterPopup.style.zIndex = 1;
                    augFilterPopup.style.backgroundColor = '#FFF';
                    augFilterPopup.style.borderRadius = '5px';
                    augFilterPopup.style.border = 'solid thin #000';
                    augFilterPopup.style.padding = '5px';

                    return augFilterPopup;
                }

                // INJECTED METHOD INTO BX.CALENDAR
                assignAUGdisplayEntries() {
                    if (!window.BXEventCalendar) {
                        console.log('No BXEventCalendar. Terminate.');
                        return;
                    }

                    this.calendar.views[2].displayEntries = function (params) {
                        var prevElement,
                            element,
                            i,
                            j,
                            entry,
                            part,
                            dayPos,
                            entryPart,
                            day,
                            entryStarted,
                            partsStorage = [],
                            entryDisplayed,
                            showHiddenLink,
                            viewRange = this.calendar.getDisplayedViewRange();

                        if (!params) params = {};

                        if (params.reloadEntries !== false) {
                            // Get list of entries
                            this.entries = this.entryController.getList({
                                startDate: new Date(
                                    viewRange.start.getFullYear(),
                                    viewRange.start.getMonth(),
                                    1
                                ),
                                finishDate: new Date(
                                    viewRange.end.getFullYear(),
                                    viewRange.end.getMonth() + 1,
                                    1
                                ),
                                viewRange: viewRange,
                                finishCallback: BX.proxy(this.displayEntries, this),
                            });
                        }

                        // ! -------- Injected code to manipulate the entries before display
                        params.eventType = window.AUG.Calendar.eventType;
                        params.workgroupCalendar = window.AUG.Calendar.workgroupCalendar;
                        params.companyCalendar = window.AUG.Calendar.companyCalendar;


                        let tempArray = this.entries.filter(function (entry) {
                            switch (entry.data.CAL_TYPE) {
                                case "user":
                                    for (const element of params.eventType) {
                                        if (element.color.toLowerCase() == entry.color.toLowerCase()) {
                                            return element.active;
                                        }
                                    }
                                    return false;
                                    break;

                                case "group":
                                    for (const section of params.workgroupCalendar) {
                                        if (section.id == entry.sectionId) {
                                            if (!section.active) return false;
                                            for (const element of params.eventType) {
                                                if (element.color.toLowerCase() == entry.color.toLowerCase()) {
                                                    return element.active;
                                                }
                                            }
                                        };
                                    }
                                    console.log("Error - Entry belongs to different workgroup calendar");
                                    return false;
                                    break;

                                case "company_calendar":
                                    for (const section of params.companyCalendar) {
                                        if (section.id == entry.sectionId) {
                                            if (!section.active) return false;
                                            for (const element of params.eventType) {
                                                if (element.color.toLowerCase() == entry.color.toLowerCase()) {
                                                    return element.active;
                                                }
                                            }
                                        }
                                    }
                                    console.log("Error - Entry belongs to different company calendar");
                                    return false;
                                    break;

                                default:
                                    console.log("Error - Uncaught CAL_TYPE");
                                    return false;
                            }
                        })
                        this.entries = tempArray;

                        // ! -------- End of injected code

                        // Clean holders
                        this.entryHolders.forEach(function (holder) {
                            BX.cleanNode(holder);
                        });

                        // Clean days
                        this.days.forEach(function (day) {
                            day.slots = [];
                            day.entries = {
                                list: [],
                                started: [],
                                hidden: [],
                            };
                        });

                        if (this.entries === false || !this.entries || !this.entries.length) return;

                        // Prepare for arrangement
                        for (i = 0; i < this.entries.length; i++) {
                            entry = this.entries[i];
                            this.entriesIndex[entry.uid] = i;
                            entry.cleanParts();
                            entryStarted = false;

                            for (
                                dayPos = this.dayIndex[entry.startDayCode];
                                dayPos < this.days.length;
                                dayPos++
                            ) {
                                day = this.days[dayPos];
                                if (
                                    day.dayCode === entry.startDayCode ||
                                    (entryStarted && day.dayOffset === 0)
                                ) {
                                    entryStarted = true;

                                    part = entry.startPart({
                                        from: day,
                                        daysCount: 0,
                                    });

                                    day.entries.started.push({
                                        entry: entry,
                                        part: part,
                                    });
                                }

                                if (entryStarted) {
                                    day.entries.list.push({
                                        entry: entry,
                                        part: part,
                                    });

                                    part.daysCount++;
                                    part.to = day;

                                    if (
                                        day.dayCode === entry.endDayCode ||
                                        day.dayOffset === this.dayCount - 1
                                    ) {
                                        // here we know where part of event starts and ends
                                        partsStorage.push({ part: part, entry: entry });

                                        // Event finished
                                        if (day.dayCode === entry.endDayCode) {
                                            break;
                                        }
                                    }
                                }
                            }
                        }

                        // Display parts
                        for (i = 0; i < partsStorage.length; i++) {
                            this.displayEntryPiece(partsStorage[i]);
                        }

                        // Final arrangement on the grid
                        for (dayPos = 0; dayPos < this.days.length; dayPos++) {
                            day = this.days[dayPos];

                            if (day.entries.started.length > 0) {
                                if (day.entries.started.length > 0) {
                                    day.entries.started.sort(this.calendar.entryController.sort);
                                }

                                for (i = 0; i < day.entries.started.length; i++) {
                                    element = day.entries.started[i];
                                    if (element) {
                                        entry = element.entry;
                                        entryPart = element.part;
                                        entryDisplayed = false;
                                        for (j = 0; j < this.slotsCount; j++) {
                                            if (day.slots[j] !== false) {
                                                this.occupySlot({
                                                    slotIndex: j,
                                                    startIndex: dayPos,
                                                    endIndex: dayPos + entryPart.daysCount,
                                                });
                                                entryDisplayed = true;
                                                entry.getWrap(entryPart.partIndex).style.top =
                                                    j * this.slotHeight + "px";
                                                break;
                                            }
                                        }

                                        if (!entryDisplayed) {
                                            prevElement = day.entries.started[i - 1];
                                            if (prevElement) {
                                                day.entries.hidden.push(prevElement);
                                                prevElement.entry.getWrap(
                                                    prevElement.part.partIndex
                                                ).style.display = "none";
                                            }
                                            day.entries.hidden.push(element);
                                            entry.getWrap(entryPart.partIndex).style.display = "none";
                                        }
                                    }
                                }
                            }

                            // Here we check all entries in the day and if any of it
                            // was hidden, we going to show 'show all' link

                            if (day.entries.list.length > 0) {
                                showHiddenLink = false;
                                for (i = 0; i < day.entries.list.length; i++) {
                                    if (day.entries.list[i].part.params.wrapNode.style.display === "none") {
                                        showHiddenLink = true;
                                        break;
                                    }
                                }

                                if (showHiddenLink) {
                                    day.hiddenStorage = this.entryHolders[day.holderIndex].appendChild(
                                        BX.create("DIV", {
                                            props: {
                                                className:
                                                    "calendar-event-line-wrap calendar-event-more-btn-container",
                                            },
                                            attrs: { "data-bx-calendar-show-all-events": day.dayCode },
                                            style: {
                                                top: this.rowHeight - 47 + "px",
                                                left:
                                                    "calc((100% / " +
                                                    this.dayCount +
                                                    ") * (" +
                                                    (day.dayOffset + 1) +
                                                    " - 1) + 2px)",
                                                width: "calc(100% / " + this.dayCount + " - 3px)",
                                            },
                                        })
                                    );
                                    day.hiddenStorageText = day.hiddenStorage.appendChild(
                                        BX.create("span", { props: { className: "calendar-event-more-btn" } })
                                    );
                                    day.hiddenStorage.style.display = "block";
                                    day.hiddenStorageText.innerHTML =
                                        BX.message("EC_SHOW_ALL") + " " + day.entries.list.length;
                                } else if (day.hiddenStorage) {
                                    day.hiddenStorage.style.display = "none";
                                }
                            }
                        }

                        BX.addClass(this.gridMonthContainer, "calendar-events-holder-show");
                    }
                }

            }

            // * Assign AUG_Calendar class / Init AUG_Calendar Class
            window.AUG.Calendar = new Calendar();
        })(window);
        // /SECTION
        // ------------------------------------------



        // ------------------------------------------
        // SECTION AUG.Utility
        (function (window) {
            let Utility = {

                rgbToHex: function (rgbstring) {
                    rgbArray = rgbstring.match(/[0-9]*/g).filter(function (element) { return element !== ''; })
                    hexArray = rgbArray.map(function (element) { return parseInt(element).toString(16); });
                    return `#${hexArray[0]}${hexArray[1]}${hexArray[2]}`;
                },

                defaultColors: ["#86B10", "#092CC", "#0AFC7", "#DA910", "#0B38C", "#DE2B24", "#BD7AC9", "#838FA0"]

            }

            window.AUG.Utility = Utility;

        })(window);
        // /SECTION
        // ------------------------------------------



        // ------------------------------------------
        // SECTION AUG.Observer
        (function (window) {

            let Observer = {
                Utility: window.AUG.Utility,

                colorChangeObserverCallback: function colorChangeObserverCallback(m) {
                    for (const eachM of m) {
                        if (!window.AUG.Utility.defaultColors.includes(window.AUG.Utility.rgbToHex(eachM.target.style.backgroundColor).toUpperCase())) {
                            Observer.choosingCalendar = true;
                            document.querySelector('div.calendar-field').click();
                        }
                    }
                },

                mutationObserverCallback: function mutationObserverCallback(m) {

                    for (const eachM of m) {
                        if (eachM.target.className.includes('calendar-field-colorpicker')) {
                            Observer.fullEventEditor(eachM);
                        }
                    }

                    // Current handler for main simple popup
                    for (const eachM of m) {
                        if (eachM.target.className.includes('popup-window calendar-simple-view-popup')) {
                            Observer.newSimplePopup = true;
                            eachM.target.querySelector('div.calendar-field').click();
                        }
                    }

                    for (const eachM of m) {
                        if (eachM.target.className.includes('popup-window-content-menu-popup-color-select')) {
                            Observer.colorSelector(eachM);
                        }
                    }
                },

                fullEventEditor: function fullEventEditor(eachM) {
                    eachM.target.style.display = 'flex';
                    eachM.target.style.justifyContent = 'space-evenly';

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
                },

                colorSelector: function colorSelector(eachM) {
                    eachM.target.parentElement.style.width = '190px';
                    eachM.target.parentElement.style.visibility = 'hidden'; // Hide "Color Selector" popup

                    if (Observer.newSimplePopup) {

                        Obersver.popupId = eachM.target.id.slice(-6);

                        Observer.selectedColor = Utility.defaultColors.filter(function (c) {
                            return c === Utility.rgbToHex(document.querySelector('.calendar-field-select-icon').style.backgroundColor.toUpperCase());
                        });

                        if (!Observer.selectedColor) {
                            document.querySelector('span.menu-popup-item:nth-child(2)').click();
                        } else {
                            eachM.target.querySelector('div.calendar-field').click();
                        }

                        Observer.newSimplePopup = false;

                    }

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

                    if (!window.AUG.Observer.someNumber) {
                        console.log('Eyy, show popup first');
                        selector = document.querySelectorAll('.popup-window-content');
                        selectorID = selector[selector.length - 1].id.split('-');
                        window.AUG.Observer.someNumber = parseInt(selectorID[selectorID.length - 1]);
                        document.querySelector('span.menu-popup-item:nth-child(2)').click();
                        Observer.colorChangeObserver.observe(document.querySelector('.calendar-field-select-icon'), { attributes: true });
                    } else {
                        console.log('Eyy, subsequence popup')
                        selector = document.querySelectorAll('.popup-window-content');
                        selectorID = selector[selector.length - 1].id.split('-');
                        newNumber = parseInt(selectorID[selectorID.length - 1]);
                        if (window.AUG.Observer.someNumber !== newNumber) {
                            console.log('Eyy, this popup is different from last popup');
                            window.AUG.Observer.someNumber = newNumber;
                            document.querySelector('span.menu-popup-item:nth-child(2)').click();
                            Observer.colorChangeObserver.observe(document.querySelector('.calendar-field-select-icon'), { attributes: true });
                            return;
                        }
                        if (Observer.choosingCalendar) {
                            console.log('choosing calendar');
                            document.querySelector('span.menu-popup-item:nth-child(2)').click();
                            Observer.choosingCalendar = false;
                            return;
                        }
                        {
                            console.log('Eyy, this suppose to show the popup again');
                            eachM.target.parentElement.style.visibility = 'visible';
                        }
                    }

                },

                soneNumber: null

            }

            Observer.mutationObserver = new MutationObserver(Observer.mutationObserverCallback);
            Observer.mutationObserver.observe(document.querySelector('body'), { subtree: true, childList: true });

            Observer.colorChangeObserver = new MutationObserver(Observer.colorChangeObserverCallback);

            window.AUG.Observer = Observer;

        })(window);
        // /SECTION AUG.MutationObserver
        // ------------------------------------------


        // ------------------------------------------
        // Create custom AUG filter
        if (document.querySelector('.aug-filter-container')) {
            document.querySelector('.aug-filter-container').remove();
        }
        window.AUG.Calendar.createCustomFilter();
        // <-- End of create custom AUG filter
        // ------------------------------------------


    } catch (error) {
        console.log(error);
        return;
    }
}

document.addEventListener("readystatechange", documentCompleteHandler);
