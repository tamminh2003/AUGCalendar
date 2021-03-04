/** @function selectEvent */
/**
 * @param {String} eventColor - color/type of the event in format 'rgb(255, 255, 255)'
 */

function selectEvent(eventColor) {
    if(typeof(eventColor) !== 'string') return; // Check argument eventColor is string

    const eventList = BX.findChildrenByClassName(document, 'calendar-event-line-wrap', true);
    if(Array.isArray(eventList) && !eventList.length) {
        // Check empty array
        console.log("No element with class: 'calendar-event-line-wrap'");
        console.log("Stop function execution");
        return;
    }

    // console.log(eventList);
    let selectedEventList = [];
    for (let index = 0; index < eventList.length; index++) {
        let eventDot = BX.findChild(eventList[index], {'class':'calendar-event-line-dot'}, true);
        // console.log(eventDot);

        if(Array.isArray(eventDot) && !eventDot.length) {
            // Check empty array
            console.log("No element with class: 'calendar-event-line-dot'");
            console.log("Stop function execution");
            return;
        }

        if(eventDot.style.backgroundColor == eventColor) {
            selectedEventList.push(eventList[index]);
        }
    }
    return selectedEventList;
}

/** @function toggleEvent - toggle aug_hide class to hide certain event*/
/**
 * @param {Array} eventList - List of Event Element to toggle class
 */

function toggleEvent(eventList) {
    if(!Array.isArray(eventList)) return;
    for (let index = 0; index < eventList.length; index++) {
        BX.toggleClass(eventList[index], 'aug_hide');
    }
}
