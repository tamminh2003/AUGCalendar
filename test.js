// @block Shortcut for getCalendarInstance
const calendarShortcut = window.BXEventCalendar;

function getCalendarInstance(calendarObject) {
  return calendarObject.instances[Object.keys(calendarObject.instances)[0]];
}

const calendarInstance = getCalendarInstance(calendarShortcut);
// ---------------------------------------

// @block Slider binding
const sectionButton = BX("aug-select-calendar-event-button"); // select the 3 button

const sectionParams = {
  calendar: calendarInstance,
  button: sectionButton,
};

const mySectionSlider = new window.BXEventCalendar.SectionSlider(sectionParams);
// End Section Slider binding ---------------------------------------

// @block Hide Event based on colors
let temp = {};
let color = "rgb(157, 207, 0)";
temp.eventElement = document.querySelectorAll(".calendar-event-line-wrap");
temp.eventElement.forEach((element, index) => {
  console.log(element);
  let lineDot = element.querySelector(".calendar-event-line-dot");
  if (lineDot.style.backgroundColor == color) {
    element.style.display = "none";
  }
});
// ------------------------------------

// @block Request event entries
// #function Calendar.Core.request( ... )
// #state Tested
// #result Success Array of entry raw data

// Setting parameter for request
function getCalendarRequestParams(calendarObject) {
  const viewRange = calendarObject.getDisplayedViewRange();
  const sections = calendarObject.sectionController.getSectionsInfo();
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
}

let test = getCalendarRequestParams(calendarInstance);
params = test.params;
sections = test.sections;

calendarInstance.showLoader();
calendarInstance.request({
  type: "post",
  data: {
    action: "load_entries",
    month_from: params.startDate ? params.startDate.getMonth() + 1 : "",
    year_from: params.startDate ? params.startDate.getFullYear() : "",
    month_to: params.finishDate ? params.finishDate.getMonth() + 1 : "",
    year_to: params.finishDate ? params.finishDate.getFullYear() : "",
    active_sect: sections.active,
    hidden_sect: sections.hidden,
    sup_sect: sections.superposed,
    loadNext: params.loadNext ? "Y" : "N",
    loadPrevious: params.loadPrevious ? "Y" : "N",
    loadLimit: params.loadLimit || 0,
    cal_dav_data_sync: calendarInstance.reloadGoogle ? "Y" : "N",
  },
  handler: BX.delegate(function (response) {
    calendarInstance.hideLoader();
    console.log(response);
    test.response = response;
  }, window),
});
// -------------------------------------

// @block Entry creation
// #function Entry constructor Entry(CalendarInstance, entriesRaw)
// #State Tested
// #Result Success - Array of Entry

entriesRaw = test.response.entries;
entries = [];
for (let i = 0; i < entriesRaw.length; i++) {
  let entry = new calendarShortcut.Entry(calendarInstance, entriesRaw[i]);
  if (test.params.viewRange) {
    if (entry.applyViewRange(test.params.viewRange)) {
      entries.push(entry);
    }
  } else {
    entries.push(entry);
  }
}
// -------------------------------------

// @block Entry filtering based on color
// #function Array.prototype.filter( ... )
// #State Tested
// #Result Success - Array of Entry with the same color.

entryReduced = entries.filter(function (entry) {
  return entry.color == entries[0].color;
});

//--------------------------------------------

// @block Custom displayEntries method;
// #function MonthView.displayEntries() method
// #State Tested
// #Result Success - Successfully display filtered entries with same color
AUGdisplayEntries = function (params) {
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
  } else {
    console.log('No color assign. Assign to default color');
    color = this.entries[0].color;
  }

  tempArray = this.entries.filter(function(entry) {
    return entry.color == color;
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
};

//--------------------------------------------

// Disposable area
calendarInstance.sectionController.getSection(
  target.getAttribute("data-bx-calendar-section")
);
