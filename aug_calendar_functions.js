// @function getCalendarInstance
// @param calendarObject - Calendar.Core Object, usually window.BXEventCalendar
// @return Calendar.Core
// @Description Return current Calendar.Core instance
function getCalendarInstance(calendarObject) {
    return calendarObject.instances[Object.keys(instances)[0]]
};

// @function getCalendarRequesteParams
// @param calendarInstance - Calendar.Core Object Instance, usually window.BXEventCalendar.instances[0]
// @return Object{'params':{startDate, finishDate, viewRange}, 'sections'}
// @Description Return parameters for Calendar.Core.request( ... ) method
function getCalendarRequestParams(calendarInstance) {
  const viewRange = calendarInstance.getDisplayedViewRange();
  const sections = calendarInstance.sectionController.getSectionsInfo();
  startDate = new Date(viewRange.start.getFullYear(), viewRange.start.getMonth(), 1);
  finishDate = new Date(viewRange.end.getFullYear(), viewRange.end.getMonth() + 1, 1);
  return {'params': {startDate, finishDate, viewRange}, 'sections': sections};
}