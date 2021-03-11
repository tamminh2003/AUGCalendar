// @funciton Shortcut for getCalendarInstance
const shortcut = window.BXEventCalendar;

function getCalendarInstance(instances) {
  return instances[Object.keys(instances)[0]]
};

const calendarInstance = getCalendarInstance(shortcut.instances);
// ---------------------------------------

// Section Slider binding ---------------------------------
const sectionButton = BX('aug-select-calendar-event-button'); // select the 3 button

const sectionParams = {
  calendar: calendarInstance,
  button: sectionButton
}

const mySectionSlider = new window.BXEventCalendar.SectionSlider(sectionParams);
// End Section Slider binding ---------------------------------------

// Hide Event based on colors
let temp = { };
let color = 'rgb(157, 207, 0)';
temp.eventElement = document.querySelectorAll('.calendar-event-line-wrap');
temp.eventElement.forEach((element, index) => {
  console.log(element);
  let lineDot = element.querySelector('.calendar-event-line-dot');
  if(lineDot.style.backgroundColor == color) {
    element.style.display = 'none';
  }
})

// Getting entries from database using loadEntries
const shortcut = window.BXEventCalendar;

function getCalendarInstance(instances) {
  return instances[Object.keys(instances)[0]]
};

const calendarInstance = getCalendarInstance(shortcut.instances);

let sections = calendarInstance.sectionController.getSectionsInfo();

calendarInstance.showLoader();
calendarInstance.request({
  type: 'post',
  data: {
    action: 'load_entries',
    month_from: params.startDate ? (params.startDate.getMonth() + 1) : '',
    year_from: params.startDate ? params.startDate.getFullYear() : '',
    month_to: params.finishDate ? params.finishDate.getMonth() + 1 : '',
    year_to: params.finishDate ? params.finishDate.getFullYear() : '',
    active_sect: sections.active,
    hidden_sect: sections.hidden,
    sup_sect: sections.superposed,
    loadNext: params.loadNext ? 'Y' : 'N',
    loadPrevious: params.loadPrevious ? 'Y' : 'N',
    loadLimit: params.loadLimit || 0,
    cal_dav_data_sync: calendarInstance.reloadGoogle ? 'Y' : 'N'
  },
  handler: BX.delegate(function(response)
  {
    console.log(response);
    temp.response = response;
  }, window)
});

// Date template for loadEntries method
let loadEntriesParams = {
  type = 'post',
  data: {
    action: 'load_entries',
    month_from: params.startDate ? (params.startDate.getMonth() + 1) : '',
    year_from: params.startDate ? params.startDate.getFullYear() : '',
    month_to: params.finishDate ? params.finishDate.getMonth() + 1 : '',
    year_to: params.finishDate ? params.finishDate.getFullYear() : '',
    active_sect: sections.active,
    hidden_sect: sections.hidden,
    sup_sect: sections.superposed,
    loadNext: params.loadNext ? 'Y' : 'N',
    loadPrevious: params.loadPrevious ? 'Y' : 'N',
    loadLimit: params.loadLimit || 0,
    cal_dav_data_sync: calendarInstance.reloadGoogle ? 'Y' : 'N'
  }, 
  handler: BX.delegate(function(response)
  {
    console.log(response);
    temp.response = response;
  }, window)
}

let loadEntriesParamObject = {
  type: 'post',
  data: {
    action: 'load_entries',
    month_from: params.startDate ? (params.startDate.getMonth() + 1) : '',
    year_from: params.startDate ? params.startDate.getFullYear() : '',
    month_to: params.finishDate ? params.finishDate.getMonth() + 1 : '',
    year_to: params.finishDate ? params.finishDate.getFullYear() : '',
    active_sect: sections.active,
    hidden_sect: sections.hidden,
    sup_sect: sections.superposed,
    loadNext: params.loadNext ? 'Y' : 'N',
    loadPrevious: params.loadPrevious ? 'Y' : 'N',
    loadLimit: params.loadLimit || 0,
    cal_dav_data_sync: calendarInstance.reloadGoogle ? 'Y' : 'N'
  },
  handler: BX.delegate(function(response)
  {
    console.log(response);
    temp.response = response;
  }, window)
}




