/*AUG Calendar Custom Script*/
/* */
BX.ready(
    function () {
        console.log("Start Calendar Script");
        
        // Hide selected events
        function hideCalendarEvent(eventColor) {
            const eventList = document.getElementsByClassName('calendar-event-line-dot');
            for (let i = 0; i < eventList.length; i++) {
                if (eventList[i].style.backgroundColor == eventColor) {
                    BX.addClass(eventList[i].parentElement.parentElement.parentElement, 'aug_hide');
                }
            }
        }

        // Show selected events
        function showCalendarEvent(eventColor) {
            const eventList = document.getElementsByClassName('calendar-event-line-dot');
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
                text: name.substr(0,1).toUpperCase() + name.substr(1)
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
                    events: {
                        click: function () { hideCalendarEvent("rgb(246, 234, 104)") }
                    },
                    text: 'Hide Event'
                }
            ),
            document.getElementsByClassName('calendar-counter')[0]
        );

        // Inserting filtering button: show event button
        BX.insertAfter(
            BX.create('button',
                {
                    'attrs': {
                        'id': 'aug-show-calendar-event-button'
                    },
                    events: {
                        click: function () { showCalendarEvent("rgb(246, 234, 104)") }
                    },
                    text: 'Show Event'
                }
            ),
            document.getElementsByClassName('calendar-counter')[0]
        );

        /* Adding drop box to choose event category */
        BX.insertAfter(
            BX.create('select',
                {
                    'attrs': {
                        'id': 'aug-select-calendar-event-button'
                    },
                    events: {
                        change: function (e) { dropboxValueChange(e); }
                    }
                }),
            document.getElementsByClassName('calendar-counter')[0]
        );

        const augDropbox = BX('aug-select-calendar-event-button');
        
        BX.append(createOption('sport'), augDropbox);
        BX.append(createOption('meeting'), augDropbox);
        BX.append(createOption('holiday'), augDropbox);
        BX.append(createOption('work'), augDropbox);
    }
);