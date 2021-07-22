// This file is only existing inside the iframe
; (function () {
    BX.ready(function () {
        // ------------------ Section to be modified ----------------------- //

        // The array of tabs to hide
        var tabsArray = [
            "Quotes",
            "Invoices",
            "Applications"
        ];

        var appliedInstitutionArray = {
            "Applied Institution Country": augcElementIDs["Deal"]["Applied Institution Country"],
            "Applied Institution": augcElementIDs["Deal"]["Applied Institution"],
            "Campus": augcElementIDs["Deal"]["Campus"],
            "Applied Institution State": augcElementIDs["Deal"]["Applied Institution State"]
        }

        // The delay timer counter with miliseconds (1000ms = 1 second)
        var delayTimer = 200;

        // The number of loop to go through the timer loop
        var loop = 10;

        // ----------------------- End section --------------------------- //

        // Add and remove main-buttons-item-active class based on application or acceptance page
        if (category_id === 1) {
            BX.addClass(BX("crm_control_panel_menu_menu_crm_quote"), "main-buttons-item-active");
            BX.removeClass(BX("crm_control_panel_menu_menu_crm_deal"), "main-buttons-item-active");
        }

        // Hide not required tabs of the form ("Quotes") etc
        augHideTabs(tabsArray);

        // Get the user access
        augGetUserAccessBranchCountry(userDepartments, "Manager");

        // Reload the page when the "save" button is clicked
        augReloadPage(1000);

        setTimeout(function () {
            // Hide field is empty
            augHideEmptyFields();

            // Build the hide all buttons
            augBuildHideAllButton();

            // Customised the fields
            augDependentBranchCountryFields(augcElementIDs["Deal"], augcCustomisedLeadFieldsArray);

            // In edit mode
            if (document.getElementsByClassName("ui-entity-editor-section-edit").length > 0) {
                console.log("Deal edit mode");
                try {
                    // Application Intake - Applications and Acceptances
                    augBuildDualFields(augcElementIDs["Deal"]["Application Intake"], augcFullListOfMonths, augcYearValue, delayTimer, loop);
                    // Reporting Intake - Applications and Acceptances
                    augBuildDualFields(augcElementIDs["Deal"]["Reporting Intake"], augcReportingMonths, augcYearValue, delayTimer, loop);

                    // Course Name - Applications and Acceptances
                    augSearchSuggestion(augcElementIDs["Deal"]["Course Name"], augcCourseName, delayTimer, loop);

                    // Expected Date - Acceptances
                    augBuildDualFields(augcElementIDs["Deal"]["Expected Date"], augcFullListOfMonths, augcYearValue, delayTimer, loop);

                    // Property Name - Accommodation Booking
                    augSearchSuggestion(augcElementIDs["Deal"]["Property Name"], augcPropertyName, delayTimer, loop);

                    // Contract Duration - Accommodation Booking
                    augBuildRadioButtonWithTextBox(augcElementIDs["Deal"]["Contract Duration"], augcAccommodationContractDuration, delayTimer, loop);

                    // Applied Institution, Applied Institution Country, Campus, Applied Institution State - Applications and Acceptances
                    augFilterAppliedInstitution(appliedInstitutionArray, delayTimer, loop);
                } catch (error) {
                    console.log("Error");
                    return;
                }
            }
            // In view mode
            else {
                console.log("Deal view mode");
                try {
                    // Change view mode to edit mode when one of the field is clicked
                    var textFields = document.getElementsByClassName("ui-entity-editor-block-title-text");
                    for (var i = 0; i < textFields.length; i++) {
                        var text = textFields[i].innerText;
                        // Check whether it exists in the array
                        if (augcElementIDs["Deal"][text]) {
                            augTriggerEditMode(augBuildDataCid(augcElementIDs["Deal"][text]));
                        }
                    }

                    // --------------------- Start binding for Applied Institution, Applied Institution Country, Campus, Applied Institution State -------------------------------- //
                    var appliedInstitution = augBuildDataCid(augcElementIDs["Deal"]["Applied Institution"]);
                    var appliedInstitutionSection = document.querySelector(appliedInstitution).parentElement.parentElement;
                    var appliedInstitutionEditButton = appliedInstitutionSection.getElementsByClassName("ui-entity-editor-section-header")[0].getElementsByClassName("ui-entity-editor-header-actions")[0].childNodes[0];

                    // Bind click listener for applied institution, applied institution country, campus and applied institution state
                    BX.bind(appliedInstitutionEditButton, 'click', function () { augFilterAppliedInstitution(appliedInstitutionArray, delayTimer, loop) });
                    // --------------------- End binding for Applied Institution, Applied Institution Country, Campus, Applied Institution State -------------------------------- //


                    // --------------------- Start binding for Course Name -------------------------------- //
                    var courseName = augBuildDataCid(augcElementIDs["Deal"]["Course Name"]);
                    var courseNameSection = document.querySelector(courseName).parentElement.parentElement;
                    var courseNameEditButton = courseNameSection.getElementsByClassName("ui-entity-editor-section-header")[0].getElementsByClassName("ui-entity-editor-header-actions")[0].childNodes[0];

                    // Bind click listener for sub agent / referral
                    BX.bind(courseNameEditButton, 'click', function () { augSearchSuggestion(augcElementIDs["Deal"]["Course Name"], augcCourseName, delayTimer, loop) });
                    // --------------------- End binding for Course Name -------------------------------- //

                    // --------------------- Start binding for Contract Duration (Accommodation Booking) -------------------------------- //
                    var contractDuration = document.querySelector(augBuildDataCid(augcElementIDs["Deal"]["Contract Duration"]));
                    if (contractDuration !== null) {
                        var contractDurationSection = contractDuration.parentElement.parentElement;
                        var contractDurationEditButton = contractDurationSection.getElementsByClassName("ui-entity-editor-section-header")[0].getElementsByClassName("ui-entity-editor-header-actions")[0].childNodes[0];

                        // Bind click listener for contract duration
                        BX.bind(contractDurationEditButton, 'click', function () { augBuildRadioButtonWithTextBox(augcElementIDs["Deal"]["Contract Duration"], augcAccommodationContractDuration, delayTimer, loop) });
                    }
                    // --------------------- End binding for Contract Duration (Accommodation Booking) -------------------------------- //


                    // --------------------- Start binding for Property Name (Accommodation Booking) -------------------------------- //
                    var propertyName = document.querySelector(augBuildDataCid(augcElementIDs["Deal"]["Property Name"]));
                    if (propertyName !== null) {
                        var propertyNameSection = propertyName.parentElement.parentElement;
                        var propertyNameEditButton = propertyNameSection.getElementsByClassName("ui-entity-editor-section-header")[0].getElementsByClassName("ui-entity-editor-header-actions")[0].childNodes[0];

                        // Bind click listener for property name
                        BX.bind(propertyNameEditButton, 'click', function () { augSearchSuggestion(augcElementIDs["Deal"]["Property Name"], augcPropertyName, delayTimer, loop) });
                    }
                    // --------------------- End binding for Property Name (Accommodation Booking) -------------------------------- //


                    // --------------------- Start binding for Application Intake and Reporting Intake (Applications and Acceptances) -------------------------------- //
                    var element = document.querySelector(augBuildDataCid(augcElementIDs["Deal"]["Application Intake"]));
                    if (element !== null) {
                        // Change the view to the months and years for intakes
                        augBuildDualFields_View(augcElementIDs["Deal"]["Application Intake"], augcFullListOfMonths);
                        augBuildDualFields_View(augcElementIDs["Deal"]["Reporting Intake"], augcReportingMonths);

                        var elementSection = element.parentElement.parentElement;
                        var editButton = elementSection.getElementsByClassName("ui-entity-editor-section-header")[0].getElementsByClassName("ui-entity-editor-header-actions")[0].childNodes[0];;

                        // Bind click listener for application intake
                        BX.bind(editButton, 'click', function () { augBuildDualFields(augcElementIDs["Deal"]["Application Intake"], augcFullListOfMonths, augcYearValue, delayTimer, loop) });
                        // Bind click listener for reporting intake
                        BX.bind(editButton, 'click', function () { augBuildDualFields(augcElementIDs["Deal"]["Reporting Intake"], augcReportingMonths, augcYearValue, delayTimer, loop) });
                    }
                    // --------------------- End binding for Application Intake and Reporting Intake (Applications and Acceptances) -------------------------------- //


                    // --------------------- Start binding for Expected Date (Accommodation Booking) -------------------------------- //
                    var expectedDate = document.querySelector(augBuildDataCid(augcElementIDs["Deal"]["Expected Date"]));
                    if (expectedDate !== null) {
                        // Change the view to the expected date field
                        augBuildDualFields_View(augcElementIDs["Deal"]["Expected Date"], augcFullListOfMonths);

                        var expectedDateSection = expectedDate.parentElement.parentElement;
                        var expectedDateEditButton = expectedDateSection.getElementsByClassName("ui-entity-editor-section-header")[0].getElementsByClassName("ui-entity-editor-header-actions")[0].childNodes[0];;

                        // Bind click listener for expected date
                        BX.bind(expectedDateEditButton, 'click', function () { augBuildDualFields(augcElementIDs["Deal"]["Expected Date"], augcFullListOfMonths, augcYearValue, delayTimer, loop) });
                    }
                    // --------------------- End binding for Expected Date (Accommodation Booking) -------------------------------- //
                } catch (error) {
                    console.log("Error");
                    return;
                }
                console.log("Done");
            }
        }, 2000);
    });
})();