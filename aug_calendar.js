BX.ready(
    // Add filtering feature
    (function () {
        try {
            console.log("Start Calendar Script");

            // Hide selected events
            function hideCalendarEvent(eventColor) {
                const eventList = BX.findChildrenByClassName(document, 'calendar-event-line-dot');
                // NOTE: New code using BX library selector for selecting element

                // const eventList = document.getElementsByClassName('calendar-event-line-dot'); 
                // NOTE: Old code using vanilla javascript for selecting element

                for (let i = 0; i < eventList.length; i++) {
                    if (eventList[i].style.backgroundColor == eventColor) {
                        BX.addClass(eventList[i].parentElement.parentElement.parentElement, 'aug_hide');
                    }
                }
            }

            // Show selected events
            function showCalendarEvent(eventColor) {
                const eventList = BX.findChildrenByClassName(document, 'calendar-event-line-dot');
                // NOTE: New code using BX library selector for selecting element

                // const eventList = document.getElementsByClassName('calendar-event-line-dot');
                // NOTE: Old code using vanilla javasciprt for selecting element
                for (let i = 0; i < eventList.length; i++) {
                    if (eventList[i].style.backgroundColor == eventColor) {
                        BX.removeClass(eventList[i].parentElement.parentElement.parentElement, 'aug_hide');
                    }
                }
            }

            function dropboxValueChange(e) {
                alert('value changed to ' + e.target.value);
            }

            function createOption(name) {
                let option = BX.create('option',
                    {
                        'attrs': {
                            'value': name
                        },
                        text: name.substr(0, 1).toUpperCase() + name.substr(1)
                    });
                return option;
            }

            // Inserting filtering button: hide event button
            BX.insertAfter(
                BX.create('button',
                    {
                        'attrs': {
                            'id': 'aug-hide-calendar-event-button'
                        },
                        // events: {
                        //     click: function () { hideCalendarEvent("rgb(246, 234, 104)") }
                        // },
                        text: 'Hide Event'
                    }
                ),
                BX.findChildByClassName(document, 'calendar-counter', true)
                // document.getElementsByClassName('calendar-counter')[0];
                // NOTE: Old code using vanilla javascript to select element.
            );

            // Inserting filtering button: show event button
            // BX.insertAfter(
            //     BX.create('button',
            //         {
            //             'attrs': {
            //                 'id': 'aug-show-calendar-event-button'
            //             },
            //             events: {
            //                 click: function () { showCalendarEvent("rgb(246, 234, 104)") }
            //             },
            //             text: 'Show Event'
            //         }
            //     ),
            //     BX.findChildByClassName(document, 'calendar-counter', true)
                // document.getElementsByClassName('calendar-counter')[0]
                // NOTE: Old code using vannila javascript to select element
            // );

            /* Adding drop box to choose event category */
            // BX.insertAfter(
            //     BX.create('select',
            //         {
            //             'attrs': {
            //                 'id': 'aug-select-calendar-event-button'
            //             },
            //             events: {
            //                 change: function (e) { dropboxValueChange(e); }
            //             }
            //         }),
            //     BX.findChildByClassName(document, 'calendar-counter', true)
            //     // NOTE: document.getElementsByClassName('calendar-counter')[0]
            // );

            // const augDropbox = BX('aug-select-calendar-event-button');

            // BX.append(createOption('sport'), augDropbox);
            // BX.append(createOption('meeting'), augDropbox);
            // BX.append(createOption('holiday'), augDropbox);
            // BX.append(createOption('work'), augDropbox);
        } catch (error) {
            console.log(error);
            return;
        }
    }())
);

// BX.ready(
//     (function () {
        
//         /** @function augSetTimerLoop */
//         /**
//          * @param {integer} delayTimer - the timer for the await (Example: 1000ms = 1 second)
//          * @param {integer} loop - the number of loop (Example: 10)
//          * @param {object} augTimerObject - an object with run function
//          */
//         async function augSetTimerLoop(delayTimer, loop, augTimerObject) {
//             try {
//                 var tmp_loop = 1;
//                 var input = null;
//                 console.log("Start do while loop");
//                 do {
//                     try {
//                         input = document.querySelector(augTimerObject.className).getElementsByClassName("ui-entity-editor-content-block")[0].getElementsByTagName("input")[0];
//                         console.log(input);
//                         console.log("Timer in try: " + tmp_loop);
//                     } catch (error) {
//                         input = null;
//                     }
//                     await new Promise(r => setTimeout(r, delayTimer));
//                     console.log("Await");
//                     tmp_loop += 1;
//                 }
//                 while ((input === null || typeof input === "undefined") && tmp_loop <= loop)

//                 if (typeof input !== "undefined") {
//                     augTimerObject.run();
//                 }
//             } catch (error) {
//                 console.log(error);
//                 return;
//             }
//         }

//     }())
// );