console.log("Start of AUG_Calendar custom script");
console.log("-----------------------------------");
BX.ready(
  (function (window) {
    // @Object AUG_Calendar - Custom Calendar Object containing required functions for custom script
    function AUG_Calendar() {
      this.name = "AUG_Calendar";
      this.calendar = this.getCalendarInstance(window.BXEventCalendar);
    }

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
      let filterContainer = wrap.appendChild(BX.create("div", { attrs: { class: "aug-filter-container" } }))
      filterContainer.style.border = 'thin solid black';
      this.createOptions(this.getEventTypeList(), filterContainer);
      this.assignCheckboxHandler(filterContainer.querySelectorAll('input'));
    };

    // @method getEventTypeList
    // @param no parameters
    // @return Array<String> eventType 
    // @Description This method is for the ease of managing list of event types.
    // In the future, if there is the need to add or remove event type, it can be done here.
    // #State: Tested
    // #Result: Success
    AUG_Calendar.prototype.getEventTypeList = function () {
      const eventType = ['meeting', 'holiday', 'break', 'event'];
      return eventType;
    }

    // @method createOptions
    // @param Array<String> eventType - from getEventTypeList
    // @param filterContainer - aug custom container where we are putting the custom filter
    // @return  no return
    // @Description Create Custom Filter Section
    // #State: Tested
    // #Result: Success
    AUG_Calendar.prototype.createOptions = function (eventType, filterContainer) {
      for (const eventElement of eventType) {
        let optionName = eventElement.substr(0, 1).toUpperCase() + eventElement.substr(1);
        let optionContainer = filterContainer.appendChild(BX.create('div', { attrs: { class: 'option-container' } }));
        optionContainer.appendChild(BX.create('input', { attrs: { type: 'checkbox' } }));
        optionContainer.appendChild(BX.create('span', { attrs: { class: 'aug-option-name' }, text: optionName }));
      }
    }


    // @method assignCheckboxHandler
    // @param checkboxes - checkboxes nodes
    // @return  no return
    // @Description assign Handler function for filter checkbox
    // #State: Testing
    // #Result: Pending
    AUG_Calendar.prototype.assignCheckboxHandler = function (checkboxes) {

      checkboxes[0].addEventListener('change', BX.delegate(function (event) {
        let params = {};
        params.color = '#9dcf00';
        this.calendar.views[2].AUGdisplayEntries(params)
      }, this));

      checkboxes[1].addEventListener('change', BX.delegate(function (event) {
        let params = {};
        params.color = '#DE2B24';
        this.calendar.views[2].AUGdisplayEntries(params)
      }, this));
    }

    // @method assignAUGdisplayEntries
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

    // @method getCalendarRequestParams
    // @param calendarInstance - Calendar.Core Object Instance, usually window.BXEventCalendar.instances[0]
    // @return Object{'params':{startDate, finishDate, viewRange}, 'sections'}
    // @Description Return parameters for Calendar.Core.request( ... ) method
    // #State: Tested
    // ##Result: Success
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
    if (window.AUG_Calendar) window.AUG_Calendar = AUG_Calendar;
    else
      // window.AUG_Calendar = AUG_Calendar;
      BX.addCustomEvent(window, "onBXEventCalendarInit", function () {
        window.AUG_Calendar = AUG_Calendar;
      });
  })(window));


// ------------------------------------
BX.ready(
  (function () {
    /* @function documentCompleteHandler - event handler for readystatechange */
    function documentCompleteHandler() {
      try {
        // Testing if document is ready
        if (document.readyState !== "complete") {
          return; // document object is not ready, quit execution
        }

        // Creating and inserting button
        // (function createButton() {
        //   let insertAfterElement = document.querySelector(".calendar-counter");
        //   if (!insertAfterElement) {
        //     // Testing if element exist
        //     console.log("Error - No '.calendar-counter' or not created yet");
        //     return;
        //   }

        //   // Creating new element
        //   let insertElement = BX.create(
        //     "button", 
        //     {
        //       attrs: {
        //         id: "aug-select-calendar-event-button",
        //       },
        //       text: "Select Event",
        //     }
        //   );
        //   if (!insertElement) {
        //     // Testing if new element created
        //     console.log("Error - insertElement not created");
        //     return;
        //   }
        //   BX.insertAfter(insertElement, insertAfterElement); // Insert new element

        //   let testElement = document.getElementById(
        //     "aug-select-calendar-event-button"
        //   );
        //   if (!testElement) {
        //     // Test if elment inserted
        //     console.log("Error - Element aug-select-calendar-event-button not created");
        //     return; // No element created
        //   }
        // })();

        // (function bindButton() {
        //   const shortcut = window.BXEventCalendar;

        //   function getCalendarInstance(instances) {
        //     return instances[Object.keys(instances)[0]];
        //   }

        //   const calendarInstance = getCalendarInstance(shortcut.instances);
        //   if (!calendarInstance) {
        //     console.log("Error - calendarInstance is empty. Exit bindButton()");
        //     return;
        //   }

        //   const sectionButton = BX("aug-select-calendar-event-button"); // select the 3 button
        //   if (!sectionButton) {
        //     console.log("Error - sectionButton is empty. Exit bindButton()");
        //     return;
        //   }

        //   const sectionParams = {
        //     calendar: calendarInstance,
        //     button: sectionButton,
        //   };

        //   const mySectionSlider = new window.BXEventCalendar.SectionSlider(
        //     sectionParams
        //   );
        // })();

        window.AUG_Calendar_instances = new window.AUG_Calendar();
        window.AUG_Calendar_instances.createCustomFilter();

      } catch (error) {
        console.log(error);
        return;
      }
    }

    /* bind documentCompleteHandler to readystatechange event*/
    document.addEventListener("readystatechange", documentCompleteHandler);
  })()
  // ------------------------------------------
);
