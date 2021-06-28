// Using bitrix ready function
// From js -> crm -> report -> filterselectors -> init.js
;(function()
{
    BX.ready(function() {
        // Id value for new Application and Reporting intake user fields
        var applicationId = "aug-report-select-input-field-application-intake";
        var reportingId = "aug-report-select-input-field-reporting-intake";

        var applicationMonths = {
            "January": "01",
            "February": "02",
            "March": "03",
            "April": "04",
            "May": "05",
            "June": "06",
            "July": "07",
            "August": "08",
            "September": "09",
            "October": "10",
            "November": "11",
            "December": "12"
        };

        var yearValue = {
            "2015": "2015",
            "2016": "2016",
            "2017": "2017",
            "2018": "2018",
            "2019": "2019",
            "2020": "2020",
            "2021": "2021",
            "2022": "2022",
            "2023": "2023",
            "2024": "2024",
            "2025": "2025",
            "2026": "2026",
            "2027": "2027",
            "2028": "2028",
            "2029": "2029"
        };

        var reportingMonths = {
            "January": "01",
            "March": "03",
            "July": "07",
            "September": "09",
            "October": "10"
        };

        function augFromToText(className, counter){
            var text = "";
            if(counter === 1){
                text = "From";
            }
            else if(counter === 2){
                text = "To";
                counter = 0;
            }

            // Add the number so that the function know the correct fields
            className = className + "-" + text;
            var array = [
                className, 
                counter
            ];
            return array;
        }

        BX.addClass(BX("workarea"), "aug_report");
        BX.addClass(BX("report-rewrite-filter-button"), "aug-button-blue");
        BX.addClass(BX("report-reset-filter-button"), "aug-button-white");


        setTimeout(function(){
            var className = "chfilter-field-datetime";
            var dateTime = document.getElementsByClassName(className);
            var counter = 0;
            var position = "";
            for(var i = 0; i < dateTime.length; i++){
                var labelText = dateTime[i].getElementsByTagName("label")[0].innerText;
                if((labelText.includes("Application Intake") || labelText.includes("Reporting Intake")) 
                    && (labelText.includes("is less than or equal to") || labelText.includes("is more than or equal to"))){
                    counter +=  1;
                    var array = augFromToText(className, counter);
                    className = array[0] + "-" + i;
                    counter = array[1];
                    if(labelText.includes("Application Intake")){
                        augBuildDualFields_Report(className, applicationMonths, yearValue, applicationId);
                        
                        // Apply to second fields after both fields are rendered
                        if(counter % 2 === 0){
                            augIntakeRadioButton(dateTime[i-1], null);
                        }
                    }
                    else if(labelText.includes("Reporting Intake")){
                        augBuildDualFields_Report(className, reportingMonths, yearValue, reportingId);
                        
                        // Apply to second fields after both fields are rendered
                        if(counter % 2 === 0){
                            augIntakeRadioButton(dateTime[i-1], null);
                        }
                    }
                }
                else if((labelText.includes("Application Intake") || labelText.includes("Reporting Intake"))
                    &&(labelText.includes("is equal to"))){
                        className = className + "-In-" + i;
                        if(labelText.includes("Application Intake")){
                            augBuildOneIntakeField_Report(className, applicationMonths, yearValue, applicationId);
                        }
                        else if(labelText.includes("Reporting Intake")){
                            augBuildOneIntakeField_Report(className, reportingMonths, yearValue, reportingId);
                        }
                }
                else if(labelText.includes("Date")){
                    className = className + "-" + i;
                    if(labelText.includes("is less than or equal to")){
                        position = "right";
                        augBuildCalendarInputFields(className, position);
                    }
                }
                className = "chfilter-field-datetime";
            }

            try {
                // Change all the calendar icon
                var calendarElement = document.getElementsByClassName("filter-date-interval-calendar");
                for(var i = 0; i < calendarElement.length; i++){
                    calendarElement[i].getElementsByTagName("img")[0].setAttribute("src", "/bitrix/js/ui/forms/images/calendar.svg");
                }
            } catch (error) {
                return;
            }
        }, 2000);






        // // Check whether there is a div with id "workarea"
        // var form = BX("workarea");
        // if(!form)
        // {
        //     console.log("Not found!");
        //     return;
        // }
        // form.appendChild(
        //     BX.create('DIV',
        //         {
        //             props: {
        //                 className: 'test-mok1'
        //             },
        //             style: {
        //                 backgroundColor: "black",
        //                 width: "auto",
        //                 height: "100px"
        //             },
        //             text: "Test by Mok1",
        //         }
        //     )
        // );

        // // insertAfter works the next container after the id defined
        // // BX only support id (#test) not class (.test) = BX("id") not BX("className")
        // // Alternative solution: 
        // //      1. use document.getElementsByClassName for class name
        // //      2. use BX("id") for id
        // // https://dev.1c-bitrix.ru/support/forum/forum6/topic74790/
        // BX.insertAfter(BX.create("div", {
        //     props: {className: "test-mok2"},
        //     text: "Test by Mok2",
        //     style: {
        //         backgroundColor: "black",
        //         width: "auto",
        //         height: "100px"
        //     }
        // }), document.getElementsByClassName("pagetitle-wrap")[0]);
    });
})();
