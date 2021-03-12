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

entryReduced = entries.filter(function(entry) {
  return entry.color == entries[0].color;
});

//--------------------------------------------


// Disposable area
calendarInstance.sectionController.getSection(target.getAttribute('data-bx-calendar-section'))