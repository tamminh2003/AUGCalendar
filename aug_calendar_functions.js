// ! Description: this file contains a custom AUG_Calendar object that is added to the global object (window) and can be access by window.AUG_Calendar. The AUG_Calendar object contains methods for the custom script aug_calendar.js

// ! The use of IIFE (Immediately Invoked Function Expression) aka self-invoke function is to keep the global scope free of identifiers during the creation of the AUG_Calendar object.

(function (window) {
  // @Object AUG_Calendar - Custom Calendar Object containing required functions for custom script
  function AUG_Calendar() {
    this.name = "AUG_Calendar";
  }

  // @method getCalendarInstance
  // @param calendarObject - Calendar.Core Object, usually window.BXEventCalendar
  // @return Calendar.Core
  // @Description Return current Calendar.Core instance
  // #State: Tested
  // #Result: Success
  AUG_Calendar.prototype.getCalendarInstance = function (calendarObject) {
    return calendarObject.instances[Object.keys(instances)[0]];
  };

  // ! @method createCustomFilter
  // @param 
  // @return
  // @Description Create Custom Filter Section
  // #State: Coding
  // #Result: Pending
  AUG_Calendar.prototype.createCustomFilter = function () {
    let wrap = document.querySelector('.calendar-view-switcher-list');
    let filterContainer = wrap.appendChild(BX.create("div", { attrs: { class: "aug-filter-container" } }))

    this.createOptions(this.getEventTypeList(), filterContainer);

  };

  // @method getEventTypeList
  // @param no parameters
  // @return Array<String> eventType 
  // @Description This method is for the ease of managing list of event types.
  // In the future, if there is the need to add or remove event type, it can be done here.
  // #State: Tested
  // #Result: Success
  AUG_Calendar.prototype.getEventTypeList = function() {
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
  AUG_Calendar.prototype.createOptions = function(eventType, filterContainer) {
    for (const eventElement of eventType) {
      let optionName = eventElement.substr(0,1).toUpperCase() + eventElement.substr(1);
      let optionContainer = filterContainer.appendChild(BX.create('div', { attrs: { class: 'option-container' } }));
      optionContainer.appendChild(BX.create('input', { attrs: { type: 'checkbox' } }));
      optionContainer.appendChild(BX.create('span', { attrs: { class: 'aug-option-name' }, text: optionName }));
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
    BX.addCustomEvent(window, "onBXEventCalendarInit", function () {
      window.AUG_Calendar = AUG_Calendar;
    });
})(window);
