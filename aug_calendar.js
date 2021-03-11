console.log("Test 1");
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
                        text: 'Hide Event 1'
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
            //     NOTE: document.getElementsByClassName('calendar-counter')[0]
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

// Test running using document.readyState
console.log("Test using document.readyState");
BX.ready(
    (function () {
        /* @function documentCompleteHandler - event handler for readystatechange */
        function documentCompleteHandler() {
            try {
                // Testing if document is ready
                if (document.readyState !== "complete") {
                    console.log("Document is not ready");
                    console.log('Stop execution');
                    return;
                }

                // Creating and inserting button
                (function createButton() {
                    let insertAfterElement = document.querySelector('.calendar-counter');
                    if (!insertAfterElement) { // Testing if element exist
                        console.log("No '.calendar-counter'");
                        console.log('Stop execution');
                        return;
                    }
                    console.log("Element .calendar-counter seleceted");

                    let insertElement = BX.create('button', // Creating new element
                        {
                            'attrs': {
                                'id': 'aug-select-calendar-event-button'
                            },
                            text: 'Hide Event 2'
                        });
                    if (!insertElement) { // Testing if new element created
                        console.log('insertElement not created');
                        console.log('Stop execution');
                        return;
                    }
                    console.log("New element created");

                    BX.insertAfter(insertElement, insertAfterElement); // Insert new element
                    let testElement = document.getElementById('aug-select-calendar-event-button');
                    if (!testElement) {
                        console.log('testElement is null, no new element inserted');
                        console.log('Stop execution');
                        return;
                    }
                    console.log("New element inserted");
                })();

            } catch (error) {
                console.log(error);
                return;
            }
        }

        /* bind documentCompleteHandler to readystatechange event*/
        document.addEventListener('readystatechange', documentCompleteHandler);
    })()
)

// Test running scrit using timeout
// Result: Button added
console.log("Test using timer");
BX.ready(
    (function () {
        async function augSetTimerLoop(delayTimer, loop, augTimerObject) {
            try {
                var tmp_loop = 1;
                var input = null;
                console.log("Start do while loop");
                do {
                    try {
                        input = document.querySelector(augTimerObject.className);
                        console.log(input);
                        console.log("Timer in try: " + tmp_loop);
                    } catch (error) {
                        input = null;
                    }
                    await new Promise(r => setTimeout(r, delayTimer));
                    console.log("Await");
                    tmp_loop += 1;
                }
                while ((input === null || typeof input === "undefined") && tmp_loop <= loop)

                if (typeof input !== "undefined") {
                    console.log(input);
                    augTimerObject.run();
                }
            } catch (error) {
                console.log(error);
                return;
            }
        }

        let augTimerObject = {
            'className': '.calendar-counter',
            'run': function () {
                console.log("Element selected");
                (function createButton() {
                    let insertAfterElement = document.querySelector('.calendar-counter');
                    if (!insertAfterElement) { // Testing if element exist
                        console.log("No '.calendar-counter'");
                        console.log('Stop execution');
                        return;
                    }

                    let insertElement = BX.create('button', // Creating new element
                        {
                            'attrs': {
                                'id': 'aug-select-calendar-event-button'
                            },
                            text: 'Hide Event 3'
                        });
                    if (!insertElement) { // Testing if new element created
                        console.log('insertElement not created');
                        console.log('Stop execution');
                        return;
                    }

                    BX.insertAfter(insertElement, insertAfterElement); // Insert new element
                    let testElement = document.getElementById('aug-select-calendar-event-button');
                    if (!testElement) {
                        console.log('testElement is null, no new element inserted');
                        console.log('Stop execution');
                        return;
                    }
                })();
            }
        }

        try {
            augSetTimerLoop(1000, 5, augTimerObject);
        } catch (error) {
            console.log(error);
            return;
        }
    })()
)