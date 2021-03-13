console.log("Start of AUG_Calendar custom script");
console.log("-----------------------------------");
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
        (function createButton() {
          let insertAfterElement = document.querySelector(".calendar-counter");
          if (!insertAfterElement) {
            // Testing if element exist
            console.log("Error - No '.calendar-counter' or not created yet");
            return;
          }
          
          // Creating new element
          let insertElement = BX.create(
            "button", 
            {
              attrs: {
                id: "aug-select-calendar-event-button",
              },
              text: "Select Event",
            }
          );
          if (!insertElement) {
            // Testing if new element created
            console.log("Error - insertElement not created");
            return;
          }
          BX.insertAfter(insertElement, insertAfterElement); // Insert new element

          let testElement = document.getElementById(
            "aug-select-calendar-event-button"
          );
          if (!testElement) {
            // Test if elment inserted
            console.log("Error - Element aug-select-calendar-event-button not created");
            return; // No element created
          }
        })();

        (function bindButton() {
          const shortcut = window.BXEventCalendar;

          function getCalendarInstance(instances) {
            return instances[Object.keys(instances)[0]];
          }

          const calendarInstance = getCalendarInstance(shortcut.instances);
          if (!calendarInstance) {
            console.log("Error - calendarInstance is empty. Exit bindButton()");
            return;
          }

          const sectionButton = BX("aug-select-calendar-event-button"); // select the 3 button
          if (!sectionButton) {
            console.log("Error - sectionButton is empty. Exit bindButton()");
            return;
          }

          const sectionParams = {
            calendar: calendarInstance,
            button: sectionButton,
          };

          const mySectionSlider = new window.BXEventCalendar.SectionSlider(
            sectionParams
          );
        })();
      } catch (error) {
        console.log(error);
        return;
      }
    }

    /* bind documentCompleteHandler to readystatechange event*/
    document.addEventListener("readystatechange", documentCompleteHandler);
  })()
);
