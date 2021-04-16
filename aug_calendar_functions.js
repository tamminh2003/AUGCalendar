// ! Description: this file contains a custom AUG_Calendar object that is added to the global object (window) and can be access by window.AUG_Calendar. The AUG_Calendar object contains methods for the custom script aug_calendar.js

// ! The use of IIFE (Immediately Invoked Function Expression) aka self-invoke function is to keep the global scope free of identifiers during the creation of the AUG_Calendar object.

(function (window) {

  // @METHOD CONSTRUCTOR
  // @Object AUG_Calendar - Custom Calendar Object containing required functions for custom script
  function AUG_Calendar() {
    this.name = "AUG_Calendar";
    this.calendar = this.getCalendarInstance(window.BXEventCalendar);
    this.eventType = [
      { name: 'augTravel', color: '#86b100', active: true, title: 'AUG Travel' },
      { name: 'general', color: '#0092cc', active: true, title: 'General' },
      { name: 'marketing', color: '#00afc7', active: true, title: 'Marketing Promotions' },
      { name: 'meeting', color: '#da9100', active: true, title: 'Meeting' },
      { name: 'personal', color: '#00b38c', active: true, title: 'Personal' },
      { name: 'visitpr', color: '#de2b24', active: true, title: 'Visits/PR' },
      { name: 'social', color: '#bd7ac9', active: true, title: 'Social Media' },
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

  // SECTION MAIN METHODS

  // @METHOD createCustomFilter
  // @Description Create Custom Filter Section
  AUG_Calendar.prototype.createCustomFilter = function () {

    this.assignAUGdisplayEntries();
    let wrap = document.querySelector('.calendar-view-switcher-list');

    // Add Popup button
    let filterContainer = document.querySelector('.aug-filter-container');
    if (!filterContainer) filterContainer = wrap.appendChild(BX.create("div", { attrs: { class: "aug-filter-container" } }))
    filterContainer.style.position = 'relative';

    let popupButton = filterContainer.querySelector('.aug-filter-popup-button');
    if (!popupButton) popupButton = filterContainer.appendChild(BX.create('button', { attrs: { class: "aug-filter-popup-button" }, text: 'Filter Options' }));
    popupButton.addEventListener('click', this.popupButtonHandler);

    // Add Popup div
    augFilterPopup = this.buildPopup(filterContainer);

    // Add option in Popup Div
    this.displayOptions(augFilterPopup);

  };

  // @METHOD displayOptions
  // @param container - container where the 
  // @return  no return
  // @Description Generate option menu
  AUG_Calendar.prototype.displayOptions = function (container) {
    let eventType = this.eventType;

    if (!container) {
      console.log('Error, no container.');
      return;
    }

    // Clear container
    if (container.querySelector('.aug-main-option-container')) container.querySelector('.aug-main-option-container').remove();
    mainOptionContainer = container.appendChild(BX.create('div', { attrs: { class: 'aug-main-option-container' } }));

    // Generate filter sections
    // User Filter 
    optionFilterContainer = mainOptionContainer.appendChild(BX.create('div', { attrs: { class: 'event-type-filter' }, text: 'Event Type' }));

    for (const eventElement of eventType) {
      let optionName = eventElement.title;
      let optionContainer = optionFilterContainer.appendChild(BX.create('div', { attrs: { class: 'option-container', 'data-name': eventElement.name } }));
      optionContainer.appendChild(BX.create('input', { attrs: { type: 'checkbox' } }));
      optionContainer.appendChild(BX.create('span', { attrs: { class: 'aug-option-name' }, text: optionName }));
    }

    // Assign handler to event type checkboxes
    for (const checkbox of document.querySelectorAll("div.event-type-filter>div>input")) {
      checkbox.addEventListener('change', function (e) {
        for (const elementEvent of window.AUG_Calendar.instance.eventType) {
          if (checkbox.parentElement.dataset.name == elementEvent.name) {
            elementEvent.active = checkbox.checked;
          }
        }
        params = {};
        params.eventType = window.AUG_Calendar.instance.getEventTypeList();
        params.workgroupCalendar = window.AUG_Calendar.instance.workgroupCalendar;
        params.companyCalendar = window.AUG_Calendar.instance.companyCalendar;
        window.AUG_Calendar.instance.calendar.views[2].AUGdisplayEntries(params);
      });
    }
    // <-- End of assign handler to event type checkboxes
    // <-- End of user filter

    // Company Filter 
    optionFilterContainer = mainOptionContainer.appendChild(BX.create('div', { attrs: { class: 'company-filter' }, text: 'Company Filter' }));

    for (const section of this.companyCalendar) {
      optionContainer = optionFilterContainer.appendChild(BX.create('div', { attrs: { class: 'option-container' } }));
      optionContainer.appendChild(BX.create('input', { attrs: { type: 'checkbox', "data-id": section.id } }));
      optionContainer.appendChild(BX.create('span', { attrs: { class: 'aug-option-name' }, text: section.name }));
    }

    // Assign handler to company filter checkboxex
    for (const checkbox of document.querySelectorAll("div.company-filter>div>input")) {
      checkbox.addEventListener('change', function (e) {
        for (const section of window.AUG_Calendar.instance.companyCalendar) {
          if (checkbox.dataset.id == section.id) {
            section.active = checkbox.checked;
          }
        }
        params = {};
        params.eventType = window.AUG_Calendar.instance.getEventTypeList();
        params.workgroupCalendar = window.AUG_Calendar.instance.workgroupCalendar;
        params.companyCalendar = window.AUG_Calendar.instance.companyCalendar;
        window.AUG_Calendar.instance.calendar.views[2].AUGdisplayEntries(params);
      });
    }
    // <-- End of assigning handler to company checkboxes
    // <-- End of company filter

    // Workgroup Filter 
    optionFilterContainer = mainOptionContainer.appendChild(BX.create('div', { attrs: { class: 'workgroup-filter' }, text: 'Workgroup Filter' }));

    for (const section of this.workgroupCalendar) {
      optionContainer = optionFilterContainer.appendChild(BX.create('div', { attrs: { class: 'option-container' } }));
      optionContainer.appendChild(BX.create('input', { attrs: { type: 'checkbox', 'data-id': section.id } }));
      optionContainer.appendChild(BX.create('span', { attrs: { class: 'aug-option-name' }, text: section.name }));
    }

    // Assign handler to company filter checkboxex
    for (const checkbox of document.querySelectorAll("div.workgroup-filter>div>input")) {
      checkbox.addEventListener('change', function (e) {
        for (const section of window.AUG_Calendar.instance.workgroupCalendar) {
          if (checkbox.dataset.id == section.id) {
            section.active = checkbox.checked;
          }
        }
        params = {};
        params.eventType = window.AUG_Calendar.instance.getEventTypeList();
        params.workgroupCalendar = window.AUG_Calendar.instance.workgroupCalendar;
        params.companyCalendar = window.AUG_Calendar.instance.companyCalendar;
        window.AUG_Calendar.instance.calendar.views[2].AUGdisplayEntries(params);
      });
    }
    // <-- End of assigning handler to company checkboxes
    // <-- End of company filter
    // <-- End of generating filter sections

    // Make all checkboxes active 
    for (const element of container.querySelectorAll('input')) {
      element.checked = true;
    };
    // <-- End of make all checkboxes active

    // Adding spaces between filter Section
    for (const element of document.querySelector('.aug-main-option-container').children) {
      element.style.paddingBottom = '10px';
    }
    // <-- End of adding spcaes between filter section

  }

  // @METHOD buildPopup
  // @param container
  // @return augFilterPopup
  // @Description Return parameters for Calendar.Core.request( ... ) method
  AUG_Calendar.prototype.buildPopup = function (container) {
    augFilterPopup = BX.create('div', { attrs: { class: 'aug-filter-popup' } });
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

  // /SECTION

  // SECTION HANDLER

  // @METHOD popupButtonHandler
  // @param 
  // @return  
  // @Description Handler for Filter Popup button
  AUG_Calendar.prototype.popupButtonHandler = function (e) {
    augFilterPopup = document.querySelector('.aug-filter-popup');

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

  // /SECTION

  // SECTION UTILITY

  // @METHOD getCalendarInstance
  // @param calendarObject - Calendar.Core Object, window.BXEventCalendar
  // @return Calendar.Core
  // @Description Return current Calendar.Core instance
  AUG_Calendar.prototype.getCalendarInstance = function (calendarObject) {
    return calendarObject.instances[Object.keys(calendarObject.instances)[0]];
  }

  // @METHOD assignAUGdisplayEntries
  // @param params object - used to pass parameters around within the object
  // @return  no return
  // @Description assign custom displayEntries method to month view
  // #State: Tested
  // #Result: Success
  AUG_Calendar.prototype.assignAUGdisplayEntries = function () {
    if (!window.BXEventCalendar) {
      console.log('No BXEventCalendar. Terminate.');
      return;
    }

    this.calendar.views[2].AUGdisplayEntries = function (params) {
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

      tempArray = this.entries.filter(function (entry) {
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

  // @METHOD getEventTypeList
  AUG_Calendar.prototype.getEventTypeList = function () {
    return this.eventType;
  }

  // @METHOD getAvailableSection
  AUG_Calendar.prototype.getAvailableSection = function () {
    return this.calendar.sectionController.sections;
  }

  // /SECTION

  // @METHOD ASSIGN AUG_CALENDAR
  // * Assign AUG_Calendar class / Init AUG_Calendar Class
  window.AUG_Calendar = AUG_Calendar;

})(window);