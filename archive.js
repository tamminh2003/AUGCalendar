// ! Test running scrit using timeout
// ! Result: Button added
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