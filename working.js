

console.log("-----------------------------------");
console.log("     AUG_Calendar custom script    ");
console.log("-----------------------------------");

function documentCompleteHandler() {
  try {

    (function (window) {
      window.AUG = {};
      // AUG is the base object containing all the injected modules for Bitrix's Calendar Module.
    }
    )(window);

    // ------------------------------------------
    (function (window) {

      class Calendar {
        constructor() {
          this.name = "AUG_Calendar";
          this.calendar = this.getCalendarInstance(window.BXEventCalendar);
          this.eventType = [{
            name: 'augTravel',
            color: '#86B100',
            active: true,
            title: 'AUG Travel'
          }, {
            name: 'general',
            color: '#0092CC',
            active: true,
            title: 'General'
          }, {
            name: 'marketing',
            color: '#00AFC7',
            active: true,
            title: 'Marketing Promotions'
          }, {
            name: 'meeting',
            color: '#DA9100',
            active: true,
            title: 'Meeting'
          }, {
            name: 'personal',
            color: '#00B38C',
            active: true,
            title: 'Personal'
          }, {
            name: 'visitpr',
            color: '#DE2B24',
            active: true,
            title: 'Visits/PR'
          }, {
            name: 'social',
            color: '#BD7AC9',
            active: true,
            title: 'Social Media'
          }, {
            name: 'others',
            color: '#838FA0',
            active: true,
            title: 'Others'
          }];

          this.companyCalendar = this.getAvailableSection().filter(function (section) {
            return section.type == "company_calendar"
          });

          this.workgroupCalendar = this.getAvailableSection().filter(function (section) {
            return section.type == "group"
          });

          this.showUserTask = !this.calendar.sectionController.getHiddenSections().includes("tasks"); // <== showUserTask flag ? true => show user task : false => hide user task
        }


        // * AUG CALENDAR UTILITY

        // @ Description: get current BXEventCalendar.instances.
        //                BXEventCalendar.instances is created anew everytime the module is loaded.
        getCalendarInstance(calendarObject) {
          return calendarObject.instances[Object.keys(calendarObject.instances)[0]];
        }

        // @ Description: return array of EventType
        getEventTypeList() {
          return this.eventType;
        }

        // @ Description: return array of available calendars.
        //                BXEventCalendar defines different calendars as section.
        getAvailableSection() {
          return this.calendar.sectionController.sections;
        }

        // @ Description: Call displayEntries() of current View
        refreshCalendarDisplay() {
          this.calendar.getView().displayEntries();
        }

        // @ Description: Generate eventType checkboxes using following structure:
        //             optionContainer => checkboxContainer => checkbox
        //                                                  => label
        createEventTypeCheckbox(optionContainer) {
          this.eventType.forEach((c) => {

            let checkboxContainer = optionContainer.appendChild(BX.create('div',
              { attrs: { class: 'checkbox-container', 'data-name': c.name } }
            )); // <== Outer div of checkbox

            let checkbox = checkboxContainer.appendChild(BX.create('input',
              { attrs: { type: 'checkbox' } }
            )); // <== Checkbox

            checkboxContainer.appendChild(BX.create('span',
              { attrs: { class: 'aug-option-name' }, text: c.title }
            )); // <== Checkbox's label

            let checkboxHandler = (e) => {
              let _name = checkbox.parentElement.dataset.name;
              let _index = this.eventType.map((c) => { return c.name; })
                .indexOf(_name);
              if (_index > -1) this.eventType[_index].active = checkbox.checked;
              this.refreshCalendarDisplay();
            } //<== checkboxHandler

            checkbox.addEventListener('change', checkboxHandler); // <== assign checkboxHandler 

          })
        }


        // @ Description: Generate Select All and Deselect All button
        createEventTypeSelectAllButton(buttonContainer, optionSectionContainer) {

          let buttonSelectAll = buttonContainer.appendChild(BX.create('button', {
            attrs: { class: 'select-all-button' }, text: 'Select All'
          })); // <== select all button

          buttonSelectAll.addEventListener('click', (e) => {
            optionSectionContainer.querySelectorAll('input').forEach(c => c.checked = true)
            this.eventType.forEach(c => c.active = true);
            this.refreshCalendarDisplay();
          }); //<== Select All Button Handler

          // Deselect Button
          let buttonDeselectAll = buttonContainer.appendChild(BX.create('button', {
            attrs: { class: 'deselect-all-button' }, text: 'Deselect All'
          }));

          buttonDeselectAll.addEventListener('click', e => {
            optionSectionContainer.querySelectorAll('input').forEach(c => c.checked = false);
            this.eventType.forEach(c => c.active = false);
            this.refreshCalendarDisplay();
          });
          // <==========================
        }


        // @ Description: Generate checkboxes for company section and workgroup section
        createCheckbox(optionContainer, calendarSection) {
          calendarSection.forEach((c) => {
            let checkboxContainer = optionContainer.appendChild(BX.create('div', {
              attrs: { class: 'checkbox-container', 'data-section': c.id }
            })); // <== Outer div of checkbox

            let checkbox = checkboxContainer.appendChild(BX.create('input', {
              attrs: { type: 'checkbox' }
            })); // <== Checkbox

            checkboxContainer.appendChild(BX.create('span', {
              attrs: { class: 'aug-option-name' }, text: c.name
            })); // <== Checkbox's label

            checkbox.checked = !this.calendar.sectionController.getHiddenSections().includes(c.id);

            checkbox.addEventListener('change', e => {
              let _section = this.calendar.sectionController.getSection(checkbox.parentElement.dataset.section);
              if (checkbox.checked && !_section.isShown()) _section.show();
              if (!checkbox.checked && _section.isShown()) _section.hide();
              this.refreshCalendarDisplay();
            })
          })
        }


        // @ Description: Generate Select All and Deselect All button for company and workgroup section
        createSelectAllButton(buttonContainer, optionSectionContainer) {

          // Select Button
          let buttonSelectAll = buttonContainer.appendChild(BX.create('button', {
            attrs: { class: 'select-all-button' }, text: 'Select All'
          }));

          buttonSelectAll.addEventListener('click', e => {
            let arrayCheckbox = optionSectionContainer.querySelectorAll('input')

            arrayCheckbox.forEach(c => {
              let hiddenSections = this.calendar.sectionController.getHiddenSections();
              let _sectionId = c.parentElement.dataset.section;
              let _index = hiddenSections.indexOf(_sectionId);

              c.checked = true;
              if (_index >= 0) hiddenSections.splice(_index);
              this.calendar.sectionController.setHiddenSections(hiddenSections);
              this.refreshCalendarDisplay();
            });
          });

          // Deselect Button
          let buttonDeselectAll = buttonContainer.appendChild(BX.create('button', {
            attrs: { class: 'deselect-all-button' }, text: 'Deselect All'
          }));

          buttonDeselectAll.addEventListener('click', e => {
            let arrayCheckbox = optionSectionContainer.querySelectorAll('input')

            arrayCheckbox.forEach(c => {
              let hiddenSections = this.calendar.sectionController.getHiddenSections();
              let _sectionId = c.parentElement.dataset.section;
              let _index = hiddenSections.indexOf(_sectionId);

              c.checked = false;
              if (_index < 0) hiddenSections.push(_sectionId);
              this.calendar.sectionController.setHiddenSections(hiddenSections);
              this.refreshCalendarDisplay();
            });
          });
        }

        // * ================================


        // * AUG CALENDAR HANDLER

        // @ Description: Show/Hide AUG Calendar Filter
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
            augFilterPopup.style.visibility = 'collapse';

          }
        }

        // @ Description: Hide AUG Calendar Filter if "click" outside filter container.
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
                if (eachElem.className == "")
                  continue;
                else
                  break;
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

        // @ Description: Handler for SHOW USER TASK button, toggle showUserTask flag
        //              : _this object is quick access to AUG.Calendar, main object of the script
        //              : this object refer to the button itself.
        showUserTaskButtonHandler(e) {
          let _this = AUG.Calendar;
          _this.showUserTask = !_this.showUserTask;
          let hiddenSections = _this.calendar.sectionController.getHiddenSections();
          if (_this.showUserTask && hiddenSections.includes("tasks")) {
            hiddenSections.splice(hiddenSections.indexOf("tasks"));
            this.innerHTML = "Hide Task";
          } else if (!_this.showUserTask && !hiddenSections.includes("tasks")) {
            hiddenSections.push("tasks");
            this.innerHTML = "Show Task";
          }
          _this.calendar.sectionController.setHiddenSections(hiddenSections);
          _this.refreshCalendarDisplay();
        }

        // * ===================================

        // ! MAIN METHODS

        // @ Description: Create div.aug-filter-container
        //                This is the starting point for creating custom filter
        createCustomFilter() {

          this.assignAUGdisplayEntries(); // * <== Call assignAUGdisplayEntries to inject entries filtering into Bitrix displayEntries methods.


          // * Create div.aug-filter-container -----------
          let wrap = document.querySelector('.calendar-view-switcher-list');
          let filterContainer = document.querySelector('.aug-filter-container');

          if (!filterContainer)
            filterContainer = wrap.appendChild(BX.create("div", {
              attrs: {
                class: "aug-filter-container"
              }
            }))

          filterContainer.style.position = 'relative';
          // * -----------------------------------------


          //  * Add POPUP button -----------------------
          let popupButton = filterContainer.querySelector('.aug-filter-popup-button');

          if (!popupButton)
            popupButton = filterContainer.appendChild(BX.create('button', {
              attrs: {
                class: "aug-filter-popup-button ui-btn ui-btn-themes ui-btn-xs ui-btn-primary ui-btn-round",
                style: "margin: 10px"
              },
              text: 'Filter Options'
            }));

          popupButton.addEventListener('click', this.popupButtonHandler);
          // * -----------------------------------------

          let augFilterPopup = this.buildPopup(filterContainer);  // * <== Add Popup div.aug-filter-popup
          this.displayOptions(augFilterPopup); // * <== Add option in Popup div.aug-filter-popup
          document.addEventListener('click', this.checkOutsideFilterPopup); // * <== Add handler to close popup when not focused

          //  * Add SHOW USER TASK button -----------------------
          let showUserTaskButton = filterContainer.querySelector('.aug-show-user-task-button');

          if (!showUserTaskButton)
            showUserTaskButton = filterContainer.appendChild(BX.create('button', {
              attrs: {
                class: "aug-show-user-task-button ui-btn ui-btn-themes ui-btn-xs ui-btn-primary ui-btn-round"
              },
              text: 'Show Task'
            }));

          showUserTaskButton.addEventListener('click', this.showUserTaskButtonHandler);
          // * -----------------------------------------
        }

        // @ Description: Create option checkboxes in div.aug-filter-popup
        displayOptions(container) {

          if (!container) {
            console.log('Error, no container.');
            return;
          }

          // Clear container
          if (container.querySelector('.aug-main-option-container'))
            container.querySelector('.aug-main-option-container').remove();

          let mainOptionContainer = container.appendChild(BX.create('div', {
            attrs: { class: 'aug-main-option-container' }
          }));
          // -------------

          // * Generate Event Type Filter -------------------------
          let eventTypeOptionContainer = mainOptionContainer.appendChild(BX.create('div', {
            attrs: { id: 'event-type-option-container', 'data-option-section': '0' } // <== 0 for eventType
          }));

          if (eventTypeOptionContainer) {
            // Title
            let optionTitleContainer = eventTypeOptionContainer.appendChild(BX.create('div', {
              attrs: { class: 'option-title' }
            }));
            optionTitleContainer.innerHTML = 'Event Type' // todo FORMAT TITLE

            // Checkbox container
            let optionContainer = eventTypeOptionContainer.appendChild(BX.create('div', {
              attrs: { id: 'event-type-checkbox-container' }
            }));
            this.createEventTypeCheckbox(optionContainer);

            // Select All Deselect All button container
            let buttonContainer = eventTypeOptionContainer.appendChild(BX.create('div', {
              attrs: { class: 'select-button-container' }
            }));
            this.createEventTypeSelectAllButton(buttonContainer, eventTypeOptionContainer); // todo FORMAT BUTTON

            // Make all checkboxes active 
            eventTypeOptionContainer.querySelectorAll('input').forEach(c => c.checked = true);

          };  // * <== End of Event Type Filter -------------------------

          // * Generate Company Filter -------------------------
          if (this.companyCalendar.length > 0) {

            let companyCalendarOptionContainer = mainOptionContainer.appendChild(BX.create('div', {
              attrs: { id: 'company-calendar-option-container', 'data-option-section': '1' }// <== 1 for company calendar
            }));

            if (companyCalendarOptionContainer) {
              // Title
              let optionTitleContainer = companyCalendarOptionContainer.appendChild(BX.create('div', {
                attrs: { class: 'option-title' }
              }));
              optionTitleContainer.innerHTML = 'Company Calendar' // todo FORMAT TITLE

              // Checkbox container
              let optionContainer = companyCalendarOptionContainer.appendChild(BX.create('div', {
                attrs: { id: 'company-calendar-checkbox-container' }
              }));
              this.createCheckbox(optionContainer, this.companyCalendar);

              // Select All Deselect All button container
              let buttonContainer = companyCalendarOptionContainer.appendChild(BX.create('div', {
                attrs: { class: 'select-button-container' }
              }));
              this.createSelectAllButton(buttonContainer, companyCalendarOptionContainer); // todo FORMAT BUTTON

            }
          }
          // * <== End of Company Filter -------------------------

          // * Generate Workgroup Filter -------------------------
          if (this.workgroupCalendar.length > 0) {

            let companyCalendarOptionContainer = mainOptionContainer.appendChild(BX.create('div', {
              attrs: { id: 'workgroup-calendar-option-container', 'data-option-section': '2' }// <== 1 for company calendar
            }));

            if (companyCalendarOptionContainer) {
              // Title
              let optionTitleContainer = companyCalendarOptionContainer.appendChild(BX.create('div', {
                attrs: { class: 'option-title' }
              }));
              optionTitleContainer.innerHTML = 'Workgroup Calendar' // todo FORMAT TITLE

              // Checkbox container
              let optionContainer = companyCalendarOptionContainer.appendChild(BX.create('div', {
                attrs: { id: 'workgroup-calendar-checkbox-container' }
              }));
              this.createCheckbox(optionContainer, this.workgroupCalendar);

              // Select All Deselect All button container
              let buttonContainer = companyCalendarOptionContainer.appendChild(BX.create('div', {
                attrs: { class: 'select-button-container' }
              }));
              this.createSelectAllButton(buttonContainer, companyCalendarOptionContainer); // todo FORMAT BUTTON
            }
          }
          // * <== End of Workgroup Filter -------------------------

          // Adding spaces between filter Section
          for (const element of document.querySelector('.aug-main-option-container').children) {
            element.style.paddingBottom = '10px';
          }

        }

        // @ Description: Create the popup div.aug-filter-popup
        // @ Return: div.aug-filter-popup element
        buildPopup(container) {

          let augFilterPopup = BX.create('div', {
            attrs: {
              class: 'aug-filter-popup'
            }
          });
          container.appendChild(augFilterPopup);

          let style = {
            position: 'absolute',
            visibility: 'collapse',
            left: (parseInt(window.getComputedStyle(container).width) + 10).toString() + 'px',
            top: '10px',
            width: 'max-content',
            zIndex: 1,
            backgroundColor: '#FFF',
            borderRadius: '5px',
            border: 'solid thin #000',
            padding: '5px'
          }

          for (const e in style) {
            augFilterPopup.style[e] = style[e];
          }

          return augFilterPopup;
        }

        // ! INJECTED METHODS

        // @ Desription: INJECT METHODS INTO BX.CALENDAR
        assignAUGdisplayEntries() {
          if (!window.BXEventCalendar) {
            console.log('No BXEventCalendar. Terminate.');
            return;
          }

          // ! assign DayView displayEntries
          this.calendar.views[0].displayEntries = function (params) {
            var
              i, entry, part, dayPos, day, entryStarted,
              maxTopEntryCount = 0,
              viewRange = this.getViewRange();

            if (!params)
              params = {};

            if (params.reloadEntries !== false) {
              this.entries = this.entryController.getList({
                startDate: new Date(viewRange.start.getFullYear(), viewRange.start.getMonth(), 1),
                finishDate: new Date(viewRange.end.getFullYear(), viewRange.end.getMonth() + 1, 1),
                viewRange: viewRange,
                finishCallback: BX.proxy(this.displayEntries, this)
              });
            }

            // ! -------- Injected code to manipulate the entries before display

            window.AUG.Calendar.entryFilter(params, this);

            // ! -------- End of injected code

            this.partsStorage = [];
            this.timelinePartsStorage = [];

            // Clean holders
            BX.cleanNode(this.topEntryHolder);
            BX.cleanNode(this.timelineEntryHolder);
            this.fullDayEventsCont.style.height = '';

            // Clean days
            this.days.forEach(function (day) {
              day.slots = [];
              day.timelineMap = {};
              if (day.collapsedWrap && day.collapsedWrap.top) {
                day.collapsedWrap.top.destroy();
              }
              if (day.collapsedWrap && day.collapsedWrap.bottom) {
                day.collapsedWrap.bottom.destroy();
              }
              day.collapsedWrap = { top: null, bottom: null };

              day.entries = {
                topList: [],
                started: [],
                timeline: [],
                hidden: []
              };
            });

            if (this.entries && this.entries.length) {
              // Prepare for arrangement
              for (i = 0; i < this.entries.length; i++) {
                entry = this.entries[i];
                this.entriesIndex[entry.uid] = i;
                entry.cleanParts();
                entryStarted = false;

                for (dayPos = this.dayIndex[entry.startDayCode]; dayPos < this.days.length; dayPos++) {
                  day = this.days[dayPos];
                  if (!entry.isLongWithTime()
                    && day.dayCode === entry.startDayCode
                    && day.dayCode === entry.endDayCode && !entry.fullDay) {
                    part = entry.startPart({
                      from: day,
                      to: day,
                      daysCount: 0,
                      fromTimeValue: this.util.getTimeValue(entry.from),
                      toTimeValue: this.util.getTimeValue(entry.to)
                    });

                    day.entries.timeline.push({ entry: entry, part: part });
                    this.timelinePartsStorage.push({ part: part, entry: entry });
                    break;
                  }
                  else {
                    if (day.dayCode === entry.startDayCode) {
                      entryStarted = true;
                      part = entry.startPart({ from: day, daysCount: 0 });
                      day.entries.started.push({ entry: entry, part: part });
                    }

                    if (entryStarted) {
                      day.entries.topList.push({ entry: entry, part: part });
                      part.daysCount++;
                      part.to = day;

                      if (day.entries.topList.length > maxTopEntryCount)
                        maxTopEntryCount = day.entries.topList.length;

                      if (day.dayCode === entry.endDayCode ||
                        day.dayOffset === this.dayCount - 1 /* for week view */ ||
                        this.dayCount === 1 /*for day view */) {
                        // here we know where part of event starts and ends
                        this.partsStorage.push({ part: part, entry: entry });

                        // Event finished
                        if (day.dayCode === entry.endDayCode) {
                          break;
                        }
                      }
                    }
                  }
                }
              }
            }

            if (this.entries && this.entries.length) {
              this.displayTopEntries();
              this.displayTimelineEntries();

              this.SLOTS_COUNT = 10;

              this.arrangeTopEntries();
              this.arrangeTimelineEntries();
            }

            this.setFullDayHolderSize(Math.min(Math.max(maxTopEntryCount, 1), this.SLOTS_COUNT));

            // Final arrangement on the grid
            var showHiddenLink;
            for (dayPos = 0; dayPos < this.days.length; dayPos++) {
              day = this.days[dayPos];

              // Here we check all entries in the day and if any of it
              // was hidden, we going to show 'show all' link
              if (day.entries.topList.length > 0) {
                showHiddenLink = false;
                for (i = 0; i < day.entries.topList.length; i++) {
                  if (day.entries.topList[i].part.params.wrapNode.style.display === 'none') {
                    showHiddenLink = true;
                    break;
                  }
                }

                if (showHiddenLink) {
                  day.hiddenStorage = this.topEntryHolder.appendChild(BX.create('DIV', {
                    props: {
                      className: 'calendar-event-line-wrap calendar-event-more-btn-container'
                    },
                    attrs: { 'data-bx-calendar-show-all-events': day.dayCode },
                    style: {
                      top: (parseInt(this.fullDayEventsCont.style.height) - 20) + 'px',
                      left: this.dayCount === 1
                        ? '0' /*for day view */
                        : 'calc((100% / ' + this.dayCount + ') * (' + (day.dayOffset + 1) + ' - 1) + 2px)',
                      width: 'calc(100% / ' + this.dayCount + ' - 3px)'
                    }
                  }));

                  day.hiddenStorageText = day.hiddenStorage.appendChild(BX.create('span', { props: { className: 'calendar-event-more-btn' } }));
                  day.hiddenStorage.style.display = 'block';
                  day.hiddenStorageText.innerHTML = BX.message('EC_SHOW_ALL') + ' ' + day.entries.topList.length;
                }
                else if (day.hiddenStorage) {
                  day.hiddenStorage.style.display = 'none';
                }
              }
            }

            BX.addClass(this.grid, 'calendar-events-holder-show');
            BX.addClass(this.fullDayEventsCont, 'calendar-events-holder-show');

            var workTime = this.util.getWorkTime();
            this.checkTimelineScroll(!this.collapseOffHours || (workTime.end - workTime.start) * this.gridLineHeight + 20 > this.util.getViewHeight());
          }

          // ! assign WeekView displayEntries
          this.calendar.views[1].displayEntries = function (params) {
            var
              i, entry, part, dayPos, day, entryStarted,
              maxTopEntryCount = 0,
              viewRange = this.getViewRange();

            if (!params)
              params = {};

            if (params.reloadEntries !== false) {
              this.entries = this.entryController.getList({
                startDate: new Date(viewRange.start.getFullYear(), viewRange.start.getMonth(), 1),
                finishDate: new Date(viewRange.end.getFullYear(), viewRange.end.getMonth() + 1, 1),
                viewRange: viewRange,
                finishCallback: BX.proxy(this.displayEntries, this)
              });
            }

            // ! -------- Injected code to manipulate the entries before display

            window.AUG.Calendar.entryFilter(params, this);

            // ! -------- End of injected code

            this.partsStorage = [];
            this.timelinePartsStorage = [];

            // Clean holders
            BX.cleanNode(this.topEntryHolder);
            BX.cleanNode(this.timelineEntryHolder);
            this.fullDayEventsCont.style.height = '';

            // Clean days
            this.days.forEach(function (day) {
              day.slots = [];
              day.timelineMap = {};
              if (day.collapsedWrap && day.collapsedWrap.top) {
                day.collapsedWrap.top.destroy();
              }
              if (day.collapsedWrap && day.collapsedWrap.bottom) {
                day.collapsedWrap.bottom.destroy();
              }
              day.collapsedWrap = { top: null, bottom: null };

              day.entries = {
                topList: [],
                started: [],
                timeline: [],
                hidden: []
              };
            });

            if (this.entries && this.entries.length) {
              // Prepare for arrangement
              for (i = 0; i < this.entries.length; i++) {
                entry = this.entries[i];
                this.entriesIndex[entry.uid] = i;
                entry.cleanParts();
                entryStarted = false;

                for (dayPos = this.dayIndex[entry.startDayCode]; dayPos < this.days.length; dayPos++) {
                  day = this.days[dayPos];
                  if (!entry.isLongWithTime()
                    && day.dayCode === entry.startDayCode
                    && day.dayCode === entry.endDayCode && !entry.fullDay) {
                    part = entry.startPart({
                      from: day,
                      to: day,
                      daysCount: 0,
                      fromTimeValue: this.util.getTimeValue(entry.from),
                      toTimeValue: this.util.getTimeValue(entry.to)
                    });

                    day.entries.timeline.push({ entry: entry, part: part });
                    this.timelinePartsStorage.push({ part: part, entry: entry });
                    break;
                  }
                  else {
                    if (day.dayCode === entry.startDayCode) {
                      entryStarted = true;
                      part = entry.startPart({ from: day, daysCount: 0 });
                      day.entries.started.push({ entry: entry, part: part });
                    }

                    if (entryStarted) {
                      day.entries.topList.push({ entry: entry, part: part });
                      part.daysCount++;
                      part.to = day;

                      if (day.entries.topList.length > maxTopEntryCount)
                        maxTopEntryCount = day.entries.topList.length;

                      if (day.dayCode === entry.endDayCode ||
                        day.dayOffset === this.dayCount - 1 /* for week view */ ||
                        this.dayCount === 1 /*for day view */) {
                        // here we know where part of event starts and ends
                        this.partsStorage.push({ part: part, entry: entry });

                        // Event finished
                        if (day.dayCode === entry.endDayCode) {
                          break;
                        }
                      }
                    }
                  }
                }
              }
            }

            if (this.entries && this.entries.length) {
              this.displayTopEntries();
              this.displayTimelineEntries();

              this.SLOTS_COUNT = 10;

              this.arrangeTopEntries();
              this.arrangeTimelineEntries();
            }

            this.setFullDayHolderSize(Math.min(Math.max(maxTopEntryCount, 1), this.SLOTS_COUNT));

            // Final arrangement on the grid
            var showHiddenLink;
            for (dayPos = 0; dayPos < this.days.length; dayPos++) {
              day = this.days[dayPos];

              // Here we check all entries in the day and if any of it
              // was hidden, we going to show 'show all' link
              if (day.entries.topList.length > 0) {
                showHiddenLink = false;
                for (i = 0; i < day.entries.topList.length; i++) {
                  if (day.entries.topList[i].part.params.wrapNode.style.display === 'none') {
                    showHiddenLink = true;
                    break;
                  }
                }

                if (showHiddenLink) {
                  day.hiddenStorage = this.topEntryHolder.appendChild(BX.create('DIV', {
                    props: {
                      className: 'calendar-event-line-wrap calendar-event-more-btn-container'
                    },
                    attrs: { 'data-bx-calendar-show-all-events': day.dayCode },
                    style: {
                      top: (parseInt(this.fullDayEventsCont.style.height) - 20) + 'px',
                      left: this.dayCount === 1
                        ? '0' /*for day view */
                        : 'calc((100% / ' + this.dayCount + ') * (' + (day.dayOffset + 1) + ' - 1) + 2px)',
                      width: 'calc(100% / ' + this.dayCount + ' - 3px)'
                    }
                  }));

                  day.hiddenStorageText = day.hiddenStorage.appendChild(BX.create('span', { props: { className: 'calendar-event-more-btn' } }));
                  day.hiddenStorage.style.display = 'block';
                  day.hiddenStorageText.innerHTML = BX.message('EC_SHOW_ALL') + ' ' + day.entries.topList.length;
                }
                else if (day.hiddenStorage) {
                  day.hiddenStorage.style.display = 'none';
                }
              }
            }

            BX.addClass(this.grid, 'calendar-events-holder-show');
            BX.addClass(this.fullDayEventsCont, 'calendar-events-holder-show');

            var workTime = this.util.getWorkTime();
            this.checkTimelineScroll(!this.collapseOffHours || (workTime.end - workTime.start) * this.gridLineHeight + 20 > this.util.getViewHeight());
          }

          // ! assign MonthView displayEntries
          this.calendar.views[2].displayEntries = function (params) {
            var prevElement, element, i, j, entry, part, dayPos, entryPart, day, entryStarted, partsStorage = [], entryDisplayed, showHiddenLink, viewRange = this.calendar.getDisplayedViewRange();

            if (!params)
              params = {};

            if (params.reloadEntries !== false) {
              // Get list of entries
              this.entries = this.entryController.getList({
                startDate: new Date(viewRange.start.getFullYear(), viewRange.start.getMonth(), 1),
                finishDate: new Date(viewRange.end.getFullYear(), viewRange.end.getMonth() + 1, 1),
                viewRange: viewRange,
                finishCallback: BX.proxy(this.displayEntries, this),
              });
            }

            // ! -------- Injected code to manipulate the entries before display

            window.AUG.Calendar.entryFilter(params, this);

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

            if (this.entries === false || !this.entries || !this.entries.length)
              return;

            // Prepare for arrangement
            for (i = 0; i < this.entries.length; i++) {
              entry = this.entries[i];
              this.entriesIndex[entry.uid] = i;
              entry.cleanParts();
              entryStarted = false;

              for (dayPos = this.dayIndex[entry.startDayCode]; dayPos < this.days.length; dayPos++) {
                day = this.days[dayPos];
                if (day.dayCode === entry.startDayCode || (entryStarted && day.dayOffset === 0)) {
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

                  if (day.dayCode === entry.endDayCode || day.dayOffset === this.dayCount - 1) {
                    // here we know where part of event starts and ends
                    partsStorage.push({
                      part: part,
                      entry: entry
                    });

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
                        entry.getWrap(entryPart.partIndex).style.top = j * this.slotHeight + "px";
                        break;
                      }
                    }

                    if (!entryDisplayed) {
                      prevElement = day.entries.started[i - 1];
                      if (prevElement) {
                        day.entries.hidden.push(prevElement);
                        prevElement.entry.getWrap(prevElement.part.partIndex).style.display = "none";
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
                  day.hiddenStorage = this.entryHolders[day.holderIndex].appendChild(BX.create("DIV", {
                    props: {
                      className: "calendar-event-line-wrap calendar-event-more-btn-container",
                    },
                    attrs: {
                      "data-bx-calendar-show-all-events": day.dayCode
                    },
                    style: {
                      top: this.rowHeight - 47 + "px",
                      left: "calc((100% / " + this.dayCount + ") * (" + (day.dayOffset + 1) + " - 1) + 2px)",
                      width: "calc(100% / " + this.dayCount + " - 3px)",
                    },
                  }));
                  day.hiddenStorageText = day.hiddenStorage.appendChild(BX.create("span", {
                    props: {
                      className: "calendar-event-more-btn"
                    }
                  }));
                  day.hiddenStorage.style.display = "block";
                  day.hiddenStorageText.innerHTML = BX.message("EC_SHOW_ALL") + " " + day.entries.list.length;
                } else if (day.hiddenStorage) {
                  day.hiddenStorage.style.display = "none";
                }
              }
            }

            BX.addClass(this.gridMonthContainer, "calendar-events-holder-show");
          }
        }

        // @ Description: injected method into displayEntries of each view
        //              : _this parameter is to pass the current context 
        //              : (which is the context of displayEntries) into this method.
        entryFilter(params, _this) {
          params.eventType = window.AUG.Calendar.getEventTypeList();
          params.workgroupCalendar = window.AUG.Calendar.workgroupCalendar;
          params.companyCalendar = window.AUG.Calendar.companyCalendar;

          if (!_this.entries) return;

          let tempArray = _this.entries.filter(function (entry) {
            try {

              if (entry.data["~TYPE"] == "tasks") return true;

              let _index = params.eventType.map(function (c) { return c.color })
                .indexOf(entry.color.toUpperCase());

              return _index <= -1 ? false : params.eventType[_index].active;
            } catch (e) {
              console.log(e);
              return false;
            }

          })

          _this.entries = tempArray;
        }

      }

      // * Assign AUG_Calendar class / Init AUG_Calendar Class
      window.AUG.Calendar = new Calendar();
    }
    )(window);
    // ------------------------------------------










    // ------------------------------------------
    (function (window) {
      let Utility = {

        rgbToHex: function (rgbstring) {
          rgbArray = rgbstring.match(/[0-9]*/g).filter(function (element) {
            return element !== '';
          })
          hexArray = rgbArray.map(function (element) {
            let x = parseInt(element).toString(16);
            if (x.length < 2) x = '0' + x;
            return x;
          });
          return `#${hexArray[0]}${hexArray[1]}${hexArray[2]}`;
        },

        defaultColors: ["#86B100", "#0092CC", "#00AFC7", "#DA9100", "#00B38C", "#DE2B24", "#BD7AC9", "#838FA0"],

        getCalendar: function getCalendar() {
          let key = Object.keys(window.BXEventCalendar.instances);

          return window.BXEventCalendar.instances[key];
        }

      }

      window.AUG.Utility = Utility;

    }
    )(window);
    // ------------------------------------------









    // ------------------------------------------
    (function (window) {

      let Observer = {

        Utility: window.AUG.Utility,

        startColorChangeObserver: function startColorChangeObserver() {
          // placeholder for colorChangeObserver.observe( ... ) ;
        },

        startMutationObserver: function startMutationObserver() {
          this.mutationObserver.observe(document.querySelector('body'), { childList: true });
        },


        // * ==============================
        getColorChangeObserver: function getColorChangeObserver() {

          if (!this.colorChangeObserver) {

            let colorChangeObserver = new MutationObserver(

              (function (m) {

                for (const eachM of m) {

                  if (eachM.target.className.includes("calendar-field-select-icon")) {

                    if (!this.Utility.defaultColors.includes(this.Utility.rgbToHex(eachM.target.style.backgroundColor).toUpperCase())) { // <-- Check if current color matches with defaultColors
                      this.returnPreviousFlag = true;

                      document.querySelector('.calendar-field.calendar-field-select.calendar-field-tiny').click();
                    }

                    else {

                      this.previousColor = this.Utility.defaultColors.filter(

                        (function (currentValue) { // <-- filter defaultColors for previousColor
                          return currentValue == this.Utility.rgbToHex(document.querySelector('div.calendar-field-select-icon').style.backgroundColor).toUpperCase()
                        }).bind(this)

                      )[0]

                      if (!this.previousColor) {
                        // console.log("current color selector icon not in defaultColors");

                        // console.log("set previousColor to default General");
                        this.previousColor = "#0092CC"; // <-- set previousColor to General
                      }

                      // console.log('set clickTarget based on previousColor');
                      this.clickTarget = this.Utility.defaultColors.indexOf(this.previousColor) + 1;
                      // console.log(`Observer.clickTarget = ${this.clickTarget}`);
                    }
                  }
                }
              }).bind(this)

            )

            this.colorChangeObserver = colorChangeObserver;
          }

          return this.colorChangeObserver;

        }, // * <-- End of getColorChangeObserver method

        // * ==============================
        getMutationObserver: function getMutationObserver() {

          if (!this.mutationObserver) {

            let mutationObserver = new MutationObserver(

              (function (m) {

                // console.log("--------------------------");
                // console.log("mutationObserver activated");
                // console.log(m);

                for (const eachM of m) {

                  // Adding Nodes Handlers
                  if (eachM.addedNodes.length > 0) {

                    // Main popup added handler
                    if (eachM.addedNodes[0].className && eachM.addedNodes[0].className.includes('popup-window calendar-simple-view-popup')) {

                      // console.log("simple event editor popup added");
                      // console.log(eachM);

                      // console.log("set initPopupFlag");
                      this.initPopupFlag = true;
                      // console.log('"click" to open color selector');
                      eachM.addedNodes[0].querySelector('.calendar-field.calendar-field-select.calendar-field-tiny').click();
                    }

                    // Color Selector popup added handler
                    if (eachM.addedNodes[0].id && eachM.addedNodes[0].id.includes('menu-popup-color-select')) {

                      // console.log("color selector popup added");
                      // console.log(eachM);

                      // Add label to color
                      // console.log("add color label");
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

                      // console.log("hide color selector");
                      eachM.addedNodes[0].style.visibility = "hidden";

                      // console.log("extend color selector");
                      eachM.addedNodes[0].style.width = '190px';

                      // Initiate new simple event editor popup
                      if (this.initPopupFlag) {
                        // console.log("<<--init new simple event editor popup-->");

                        // console.log("clear initPopupFlag flag");
                        this.initPopupFlag = false;

                        // console.log("get previousColor from current color on color selector icon");
                        this.previousColor = this.Utility.defaultColors.filter(

                          (function (currentValue) { // <-- filter defaultColors for previousColor
                            return currentValue == this.Utility.rgbToHex(document.querySelector('div.calendar-field-select-icon').style.backgroundColor).toUpperCase();
                          }).bind(this)

                        )[0]

                        // console.log(`Observer.previousColor = ${this.previousColor}`); // <-- check value of previousColor

                        if (!this.previousColor) {
                          // console.log("current color selector icon not in defaultColors");

                          // console.log("set previousColor to default General");
                          this.previousColor = "#0092CC"; // <-- set previousColor to General
                        }

                        // console.log('set clickTarget based on previousColor');
                        this.clickTarget = this.Utility.defaultColors.indexOf(this.previousColor) + 1;
                        // console.log(`Observer.clickTarget = ${this.clickTarget}`);

                        // console.log('"click" color selector');
                        eachM.addedNodes[0].querySelector(`span.menu-popup-item:nth-child(${this.clickTarget})`).click(); // <-- Closing of color selector Popup

                        // Setup colorChangeObserver
                        // console.log("Setup colorChangeObserver");
                        this.colorChangeObserver.observe(document.querySelector('.calendar-field-select-icon'), { attributeFilter: ["style"] });
                        // <-- End of setting up colorChangeObserver

                        // <-- Check if color selector popup close at every branch
                      }

                      else if (this.returnPreviousFlag) {
                        // console.log("clear returnPreviousFlag");
                        this.returnPreviousFlag = false;

                        // console.log('"click" color selector');
                        eachM.addedNodes[0].querySelector(`span.menu-popup-item:nth-child(${this.clickTarget})`).click(); // <-- Closing of color selector Popup 
                      }

                      else {
                        // Show popup <-- Last possible case
                        // console.log("show color selector popup - last possible case");
                        eachM.addedNodes[0].style.visibility = "visible";
                      }

                    }

                    // Section Selector Popup Handler
                    if (eachM.addedNodes[0].id && eachM.addedNodes[0].id.includes('menu-popup-section-select')) {
                      this.sectionSelectorFlag = true; // <-- currently unused
                    }

                    // Full editor Popup Handler
                    if (eachM.addedNodes[0].className && eachM.addedNodes[0].className.includes('side-panel side-panel-overlay side-panel-overlay-open')) {

                      // console.log('setup tempObs');
                      this.tempObs = new MutationObserver(

                        (function (m) {

                          // console.log('===================');
                          // console.log('tempObs');
                          // console.log(m);

                          for (const eachM of m) {

                            // Add label to color selector
                            if (eachM.target.className.includes('calendar-field-colorpicker')) {

                              // console.log("found ul mutation");

                              // Change <ul> display to flex
                              // console.log("modify ul");
                              eachM.target.style.display = 'flex';
                              eachM.target.style.justifyContent = 'space-evenly';

                              // console.log("modify li and add labels");
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

                                // check active color
                                if (eachM.addedNodes[0].className.includes('active')) {

                                  // console.log("found active color");
                                  this.fullEventEditorColor = eachM.addedNodes[0].dataset.bxCalendarColor;
                                  // console.log(`this.fullEventEditorColor = ${this.fullEventEditorColor}`);

                                  if (!this.fullEventEditorColor) {
                                    // console.log('color undefined - set default general');
                                    this.fullEventEditorColor = "#0092CC";
                                    eachM.target.querySelector(`li:nth-child(2)`).click();
                                  }

                                }

                                // console.log("addEventListener for ul");
                                eachM.target.addEventListener('click', // <-- target is <ul>

                                  (function (e) {

                                    for (const element of e.currentTarget.querySelectorAll('li.calendar-field-colorpicker-color-item')) {

                                      if (element.className.includes('active')) {
                                        this.fullEventEditorColor = element.dataset.bxCalendarColor;
                                        break;
                                      }

                                    }

                                  }).bind(this)

                                );

                              }

                            }

                          }
                        }).bind(this)

                      );

                      this.tempObs2 = new MutationObserver(
                        (function (m) {

                          // console.log("==========");
                          // console.log("tempObs2");
                          for (const eachM of m) {
                            if (eachM.removedNodes.length > 0 && eachM.removedNodes[0].id.includes('menu-popup-section-select')) {
                              let clickTarget = this.Utility.defaultColors.indexOf(this.fullEventEditorColor) + 1;
                              eachM.target.querySelector(`li:nth-child(${clickTarget})`).click();
                            }
                          }

                        }).bind(this)
                      )

                      // console.log('run tempObs');
                      this.tempObs.observe(eachM.addedNodes[0], { childList: true, subtree: true });
                      this.tempObs2.observe(eachM.addedNodes[0].firstChild.firstChild, { childList: true });

                    }

                  }
                  // <------------------------------

                  // Removing Nodes Handlers
                  if (eachM.removedNodes.length > 0) {

                    // Main popup removed handler
                    if (eachM.removedNodes[0].className && eachM.removedNodes[0].className.includes('popup-window calendar-simple-view-popup')) {
                      // console.log("popup removed");
                      // console.log(eachM);

                      this.colorChangeObserver.disconnect();
                      // disconnect Observer.colorChangeObserver;
                    }

                    // Side Panel / Full Event Editor removed handler
                    if (eachM.removedNodes[0].className && eachM.removedNodes[0].className.includes('side-panel side-panel-overlay side-panel-overlay-open')) {

                      // console.log('side-panel / full event editor removed');

                      // console.log('disconnect tempObs');
                      this.tempObs.disconnect();
                      // console.log('delete Observer.tempObs');
                      if (delete this.tempObs) {
                        console.log('Observer.tempObs removed');
                      }

                      // console.log('disconnect tempObs2');
                      this.tempObs2.disconnect();
                      // console.log('delete Observer.tempObs2');
                      if (delete this.tempObs2) {
                        // console.log('Observer.tempObs2 removed');
                      }

                    }

                  }
                  // <------------------------------

                }


              }).bind(this)

            )

            this.mutationObserver = mutationObserver;
          }

          return this.mutationObserver;

        }, // * <-- End of getMutationObserver method


      } // <-- End of Obsever Object Definition --------

      window.AUG.Observer = Observer;

    })(window);
    // ------------------------------------------










    // ------------------------------------------
    // Create custom AUG filter
    if (document.querySelector('.aug-filter-container')) {
      document.querySelector('.aug-filter-container').remove();
    }
    window.AUG.Calendar.createCustomFilter();

    AUG.Observer.getMutationObserver();
    AUG.Observer.getColorChangeObserver();
    AUG.Observer.startMutationObserver();
    // <-- End of create custom AUG filter
    // ------------------------------------------

  } catch (error) {
    console.log(error);
    return;
  }
};

documentCompleteHandler();

