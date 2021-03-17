// ! Description: this file contains a custom AUG_Calendar object that is added to the global object (window) and can be access by window.AUG_Calendar. The AUG_Calendar object contains methods for the custom script aug_calendar.js

// ! The use of IIFE (Immediately Invoked Function Expression) aka self-invoke function is to keep the global scope free of identifiers during the creation of the AUG_Calendar object.

(function (window) {
  // @Object AUG_Calendar - Custom Calendar Object containing required functions for custom script
  function AUG_Calendar() {
    this.name = "AUG_Calendar";
    this.calendar = this.getCalendarInstance(window.BXEventCalendar);
    this.eventType = [
      { name: 'meeting', color: '#9DCF00' },
      { name: 'holiday', color: '#DE2B24' },
      { name: 'eating', color: '#123456' },
    ]
  }

  // ! Main methods

  // @method getCalendarInstance
  // @param calendarObject - Calendar.Core Object, usually window.BXEventCalendar
  // @return Calendar.Core
  // @Description Return current Calendar.Core instance
  // #State: Tested
  // #Result: Success
  AUG_Calendar.prototype.getCalendarInstance = function (calendarObject) {
    return calendarObject.instances[Object.keys(calendarObject.instances)[0]];
  };

  // ! Ongoing
  // @method createCustomFilter
  // @param 
  // @return
  // @Description Create Custom Filter Section
  // #State: Testing
  // #Result: Pending
  // TODO: Making custom filter as popup
  // TODO: Making custom filter choices as predefined text input
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

    this.displayOptions(augFilterPopup.querySelector('.aug-main-option-container'));

  };

  // @method displayOptions
  // @return  no return
  // @Description Display option menu
  // #State: Tested
  // #Result: Success
  AUG_Calendar.prototype.displayOptions = function (container) {
    let eventType = this.getEventTypeList();
    if (!container) {
      console.log('Error, no container.')
      return;
    }

    // Clear container
    for (const optionContainer of container.querySelectorAll('.option-container')) {
      if (!optionContainer) continue;
      optionContainer.remove();
    }

    // Add new elements
    for (const eventElement of eventType) {
      let optionName = eventElement.name.substr(0, 1).toUpperCase() + eventElement.name.substr(1);
      let optionContainer = container.appendChild(BX.create('div', { attrs: { class: 'option-container' } }));
      optionContainer.appendChild(BX.create('input', { attrs: { type: 'checkbox' } }));
      optionContainer.appendChild(BX.create('span', { attrs: { class: 'aug-option-name' }, text: optionName }));
    }

    for (const element of container.querySelectorAll('input')) {
      element.checked = true;
    };
  }

  // @method buildPopup
  // @param container
  // @return augFilterPopup
  // @Description Return parameters for Calendar.Core.request( ... ) method
  // #State: Coding
  // #Result: Pending
  AUG_Calendar.prototype.buildPopup = function (container) {
    augFilterPopup = BX.create('div', { attrs: { class: 'aug-filter-popup' } });
    augFilterPopup.appendChild(BX.create('div', { attrs: { class: 'aug-main-option-container' } }));
    container.appendChild(augFilterPopup);

    console.log(parseInt(window.getComputedStyle(container).height) / 2);

    augFilterPopup.style.position = 'absolute';
    augFilterPopup.style.visibility = 'hidden';
    augFilterPopup.style.left = (parseInt(window.getComputedStyle(container).width) + 10).toString() + 'px';
    augFilterPopup.style.top = (4 - ((parseInt(window.getComputedStyle(container).height) / 2))).toString() + 'px';
    augFilterPopup.style.width = 'max-content'
    augFilterPopup.style.zIndex = 1;

    console.log(augFilterPopup);

    return augFilterPopup;
  }

  // ! Handlers Area

  // @method assignCheckboxHandler
  // @param checkboxes - checkboxes nodes
  // @return  no return
  // @Description assign Handler function for filter checkbox
  // #State: Tested
  // #Result: Success
  AUG_Calendar.prototype.assignCheckboxHandler = function (checkboxes) {
    let color;
    for (const checkbox of checkboxes) {
      switch (checkbox.parentElement.querySelector('.aug-option-name').innerHTML) {
        case 'Meeting':
          color = '#9DCF00';
          break;
        case 'Holiday':
          color = '#DE2B24';
          break;
        default:
          break;
      }
    }
    checkboxes[0].addEventListener('change', BX.delegate(function (event) {
      let params = {};
      params.color = color;
      this.calendar.views[2].AUGdisplayEntries(params)
    }, this));

    checkboxes[1].addEventListener('change', BX.delegate(function (event) {
      let params = {};
      params.color = '#DE2B24';
      this.calendar.views[2].AUGdisplayEntries(params)
    }, this));
  }

  // @method popupButtonHandler
  // @param 
  // @return 
  // @Description Handler for Filter Popup button
  // #State: To be Code
  // #Result: Pending
  AUG_Calendar.prototype.popupButtonHandler = function (e) {

  }

  // ! Utility Area

  // ! @method assignAUGdisplayEntries
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
      // ! Injected code to manipulate the entries before display
      console.log("Start of modified displayEntries");

      console.log("List of event entries retrieved from server");
      console.log(this.entries);

      console.log("Filtering event entries");
      if (params.color) {
        color = params.color;
        console.log('color = ' + color);
      } else {
        console.log('No color assign. Assign to default color');
        return;
      }

      tempArray = this.entries.filter(function (entry) {
        return entry.color.toUpperCase() == color.toUpperCase();
      })

      console.log("List of event entries after filtering");
      console.log(tempArray);

      console.log("Assigning filtered event entries to displaying array");
      this.entries = tempArray;

      console.log("End of modified displayEntries");
      // ! End of injected code

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

  // * @method getEventTypeList
  // @param no parameters
  // @return Array<String> eventType 
  // @Description This method is for the ease of managing list of event types.
  // In the future, if there is the need to add or remove event type, it can be done here.
  // #State: Tested
  // #Result: Success
  AUG_Calendar.prototype.getEventTypeList = function () {
    return this.eventType;
  }

  // * @method addEventType
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

    this.eventType.push({ name: name, color: eventColor });
    this.displayOptions();
  }

  // * @method removeEventType
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
        this.displayOptions();
        return;
      }
    }
    console.log("No event type found.");
  }

  // @method getCalendarRequestParams
  // @param calendarInstance - Calendar.Core Object Instance, usually window.BXEventCalendar.instances[0]
  // @return Object{'params':{startDate, finishDate, viewRange}, 'sections'}
  // @Description Return parameters for Calendar.Core.request( ... ) method
  // #State: Tested
  // #Result: Success
  AUG_Calendar.prototype.getCalendarRequestParams = function (calendarInstance) {
    const viewRange = calendarInstance.getDisplayedViewRange();
    const sections = calendarInstance.sectionController.getSectionsInfo();
    startDate = new Date(
      viewRange.start.getFullYear(),
      viewRange.start.getMonth(),
      1
    );
    finishDate = new Date(
      viewRange.end.getFullYear(),
      viewRange.end.getMonth() + 1,
      1
    );
    return { params: { startDate, finishDate, viewRange }, sections: sections };
  };

  // * Assign AUG_Calendar class / Init AUG_Calendar Class
  window.AUG_Calendar = AUG_Calendar;

})(window);
