;document.addEventListener('readystatechange',
    function() {
        if (document.readyState == "complete") {
            (function() {
                BX.ready(
                    function() {
                        alert('AUG Calendar Script');

                        // Hide selected events
                        function hideCalendarEvent(eventColor) {
                            const eventList = document.getElementsByClassName('calendar-event-line-dot');
                            for (let i = 0; i < eventList.length; i++) {
                                if (eventList[i].style.backgroundColor == eventColor) {
                                    BX.addClass(eventList[i].parentElement.parentElement.parentElement, 'aug_hide');
                                }
                            }
                        }

                        function showCalendarEvent(eventColor) {
                            const eventList = document.getElementsByClassName('calendar-event-line-dot');
                            for (let i = 0; i < eventList.length; i++) {
                                if (eventList[i].style.backgroundColor == eventColor) {
                                    BX.removeClass(eventList[i].parentElement.parentElement.parentElement, 'aug_hide');
                                }
                            }
                        }

                        // Inserting filtering button
                        BX.insertAfter(
                            BX.create('button',
                                {
                                    'attrs': {
                                        'id': 'aug-hide-calendar-event-button'
                                    },
                                    events: {
                                        click: function () { hideCalendarEvent("rgb(157, 207, 0)") }
                                    },
                                    text: 'Hide Event'
                                }
                            ),
                            document.getElementsByClassName('calendar-counter-title')[0]
                        );

                        BX.insertAfter(
                            BX.create('button',
                                {
                                    'attrs': {
                                        'id': 'aug-show-calendar-event-button'
                                    },
                                    events: {
                                        click: function () { showCalendarEvent("rgb(157, 207, 0)") }
                                    },
                                    text: 'Show Event'
                                }
                            ),
                            document.getElementsByClassName('calendar-counter-title')[0]
                        );

                        /* new section */
                        BX.insertAfter(
                            BX.create('select',
                                {
                                    'attrs': {
                                        'id': 'aug-select-calendar-event-button'
                                    }
                                }),
                            document.getElementsByClassName('calendar-counter-title')[0]
                        );

                        document.getElementById('aug-select-calendar-event-button').appendChild(
                            BX.create('option',
                                {
                                    'attrs': {
                                        'value': 'sport'
                                    },
                                    text: 'Sport'
                                })
                        );

                        document.getElementById('aug-select-calendar-event-button').appendChild(
                            BX.create('option',
                                {
                                    'attrs': {
                                        'value': 'meeting'
                                    },
                                    text: 'Meeting'
                                })
                        );

                        document.getElementById('aug-select-calendar-event-button').addEventListener('change', function() {
                            alert('value changed to ' + document.getElementById('aug-select-calendar-event-button').value);
                        });
                    }
                );
            }());
        }
    }
);