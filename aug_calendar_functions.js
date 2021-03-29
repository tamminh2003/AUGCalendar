// ! Description: this file contains a custom AUG_Calendar object that is added to the global object (window) and can be access by window.AUG_Calendar. The AUG_Calendar object contains methods for the custom script aug_calendar.js

// ! The use of IIFE (Immediately Invoked Function Expression) aka self-invoke function is to keep the global scope free of identifiers during the creation of the AUG_Calendar object.

(function (window) {

  // @METHOD CONSTRUCTOR
  // @Object AUG_Calendar - Custom Calendar Object containing required functions for custom script
  function AUG_Calendar() {
    this.name = "AUG_Calendar";
    this.calendar = this.getCalendarInstance(window.BXEventCalendar);
    this.eventType = [
      { name: 'meeting', color: '#86b100', active: true },
      { name: 'holiday', color: '#0092cc', active: true },
      { name: 'eating', color: '#e97090', active: true },
    ];
  }

  // SECTION MAIN METHODS

  // @METHOD createCustomFilter
  // @Description Create Custom Filter Section
  AUG_Calendar.prototype.createCustomFilter = function () {
    this.assignAUGdisplayEntries();
    let wrap = document.querySelector('.calendar-view-switcher-list');

    // Add popup button
    let filterContainer = document.querySelector('.aug-filter-container');
    if (!filterContainer) filterContainer = wrap.appendChild(BX.create("div", { attrs: { class: "aug-filter-container" } }))
    filterContainer.style.position = 'relative';

    let popupButton = filterContainer.querySelector('.aug-filter-popup-button');
    if (!popupButton) popupButton = filterContainer.appendChild(BX.create('button', { text: 'Filter Options' }));
    popupButton.addEventListener('click', this.popupButtonHandler);

    // Build Popup div
    augFilterPopup = this.buildPopup(filterContainer);
    this.displayOptions(augFilterPopup);

  };

  // @METHOD displayOptions
  // @param container - container where the 
  // @return  no return
  // @Description Generate option menu
  AUG_Calendar.prototype.displayOptions = function (container) {
    let eventType = this.getEventTypeList();
    if (!container) {
      console.log('Error, no container.')
      return;
    }

    // Clear container
    if (container.querySelector('.aug-main-option-container')) container.querySelector('.aug-main-option-container').remove();

    // for (const optionContainer of container.querySelectorAll('.option-container')) {
    //   if (!optionContainer) continue;
    //   optionContainer.remove();
    // }

    mainOptionContainer = container.appendChild(BX.create('div', { attrs: { class: 'aug-main-option-container' } }));
    mainOptionContainer.style.columnCount = 3;
    // Add new elements

    // User Filter Options
    optionFilterContainer = mainOptionContainer.appendChild(BX.create('div', { attrs: { class: 'option-title' }, text: 'User Filter' }));

    for (const eventElement of eventType) {
      let optionName = eventElement.name.substr(0, 1).toUpperCase() + eventElement.name.substr(1);
      let optionContainer = optionFilterContainer.appendChild(BX.create('div', { attrs: { class: 'option-container' } }));
      optionContainer.appendChild(BX.create('input', { attrs: { type: 'checkbox' } }));
      optionContainer.appendChild(BX.create('span', { attrs: { class: 'aug-option-name' }, text: optionName }));
    }

    // Company Filter Options
    optionFilterContainer = mainOptionContainer.appendChild(BX.create('div', { attrs: { class: 'option-title' }, text: 'Company Filter' }));

    optionContainer = optionFilterContainer.appendChild(BX.create('div', { attrs: { class: 'option-container' } }));
    optionContainer.appendChild(BX.create('input', { attrs: { type: 'checkbox' } }));
    optionContainer.appendChild(BX.create('span', { attrs: { class: 'aug-option-name' }, text: 'Adelaide' }));

    optionContainer = optionFilterContainer.appendChild(BX.create('div', { attrs: { class: 'option-container' } }));
    optionContainer.appendChild(BX.create('input', { attrs: { type: 'checkbox' } }));
    optionContainer.appendChild(BX.create('span', { attrs: { class: 'aug-option-name' }, text: 'Brisbane' }));

    optionContainer = optionFilterContainer.appendChild(BX.create('div', { attrs: { class: 'option-container' } }));
    optionContainer.appendChild(BX.create('input', { attrs: { type: 'checkbox' } }));
    optionContainer.appendChild(BX.create('span', { attrs: { class: 'aug-option-name' }, text: 'Melbourne' }));

    // Workgroup Filter Options
    optionFilterContainer = mainOptionContainer.appendChild(BX.create('div', { attrs: { class: 'option-title' }, text: 'Workgroup Filter' }));
    optionContainer = optionFilterContainer.appendChild(BX.create('div', { attrs: { class: 'option-container' } }));
    optionContainer.appendChild(BX.create('input', { attrs: { type: 'checkbox' } }));
    optionContainer.appendChild(BX.create('span', { attrs: { class: 'aug-option-name' }, text: 'Soccer' }));



    // Make all checkboxes active 
    for (const element of container.querySelectorAll('input')) {
      element.checked = true;
    };

    // Assign handler to checkboxes
    for (const checkbox of document.querySelectorAll("input[type='checkbox']")) {
      checkbox.addEventListener('change', function (e) {
        for (const elementEvent of window.AUG_Calendar.instance.eventType) {
          if (checkbox.parentElement.querySelector('.aug-option-name').innerHTML.toLowerCase() == elementEvent.name) {
            elementEvent.active = checkbox.checked;
          }
        }
        params = {};
        params.eventType = window.AUG_Calendar.instance.getEventTypeList();
        window.AUG_Calendar.instance.calendar.views[2].AUGdisplayEntries(params);
      });
    }
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
    augFilterPopup.style.width = 'max-content'
    augFilterPopup.style.zIndex = 1;
    augFilterPopup.style.backgroundColor = '#FFF';
    augFilterPopup.style.borderRadius = '5px';
    augFilterPopup.style.border = 'solid thin #000';
    augFilterPopup.style.padding = '5px';

    augFilterPopup.addEventListener('click', this.filterClickHandler);

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
      augFilterPopup.style.top = (11 - ((parseInt(window.getComputedStyle(augFilterPopup).height) / 2))).toString() + 'px';
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
  };

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
        for (const eventElement of params.eventType) {
          if (entry.data.CAL_TYPE == "user") {
            if (eventElement.color.toLowerCase() == entry.color.toLowerCase()) {
              if (eventElement.active != true) {
                console.log(entry);
                return false;
              } else return true;
            }
          }
          else return true;
        }
        return false;
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
  // @param no parameters
  // @return Array<String> eventType 
  // @Description Return eventType array
  AUG_Calendar.prototype.getEventTypeList = function () {
    return this.eventType;
  }

  // @METHOD addEventType
  // @param eventName - name of the eventType
  // @param eventColor - color of the eventType
  // @return no return
  // @Description Add an event type into the filter list
  // #State: Tested
  // #Result: Success
  AUG_Calendar.prototype.addEventType = function (eventName, eventColor) {
    let name = eventName.toLowerCase();
    // Event Color in form of hex color code #XXXXXX
    if (eventColor.substr(0, 1) != "#" || eventColor.length != 7) {
      console.log("Event's color in form of hex color code #XXXXXX.");
      console.log("Event type was not added.");
      return;
    }
    // Check if events with the same name and same color already in the eventType List
    let eventTypeList = this.getEventTypeList();

    for (const element of eventTypeList) {
      if (name == element.name || eventColor == element.color) {
        console.log("Event is already in the eventTypeList.");
        console.log("Event type was not added.");
        return;
      }
    }

    this.eventType.push({ name: name, color: eventColor, active: true });
    this.displayOptions(document.querySelector('.aug-filter-popup').querySelector('.aug-main-option-container'));
  }

  // @METHOD removeEventType
  // @param eventName - name of the eventType
  // @return no return
  // @Description Remove an event type into the filter list
  // #State: Tested
  // #Result: Success
  AUG_Calendar.prototype.removeEventType = function (eventName) {
    let name = eventName.toLowerCase();
    // Find event in the eventTypeList
    let eventTypeList = this.getEventTypeList();

    for (let i = 0; i < eventTypeList.length; i++) {
      if (name == eventTypeList[i].name) {
        this.eventType.splice(i, 1);
        this.displayOptions(document.querySelector('.aug-filter-popup').querySelector('.aug-main-option-container'));
        return;
      }
    }
    console.log("No event type found.");
  }

  // /SECTION

  // @METHOD ASSIGN AUG_CALENDAR
  // * Assign AUG_Calendar class / Init AUG_Calendar Class
  window.AUG_Calendar = AUG_Calendar;

})(window);
