// ----------------------------------------- Main function -------------------------------------------- //

/** @function augHideFields */
/**
 * Main function for hiding fields (address field in lead page) and setup the aug timer object
 * @param {array} fieldsArray - the array with fields value (Example: '1605756691')
 * @param {integer} delayTimer - the timer for the await (Example: 1000ms = 1 second)
 * @param {integer} loop - the number of loop (Example: 10)
 */
 function augHideFields(fieldsArray, delayTimer, loop){
    try {
        // Check whether the fields are concatenated
        // PS: Only concatenate the string one time (Example: '[data-cid="UF_CRM_1605592069446"]')
        // Else it will be '[data-cid="UF_CRM_data-cid="UF_CRM_1605592069446"]' etc
        if(Object.values(fieldsArray)[0].substring(1, 9) !== "data-cid"){
            // Get the string for the array
            fieldsArray = augBuildDataCid(fieldsArray);
        }

        // Get the element of the "edit" text
        var element = document.querySelector(Object.values(fieldsArray)[0]);
        var sectionElement = element.parentElement.parentElement;
        var editField = sectionElement.getElementsByClassName("ui-entity-editor-section-header")[0].getElementsByClassName("ui-entity-editor-header-actions")[0].childNodes[0];
        
        // Bind the click event for the main function on the "edit" text as callback
        BX.bind(editField, 'click', function(){ augHideFields(fieldsArray, delayTimer, loop) });

        // Container undefined when clicked on "Edit" text so have to wait for rendering
        if(element.getElementsByClassName("ui-entity-editor-content-block")[0].children.length === 0){
            var augTimerObject = {
                className: Object.values(fieldsArray)[0],
    
                // Run the main function to add classes to hide the address field
                runInput: function(){
                    augAddClass(fieldsArray, delayTimer, loop);
                },
            };

            augSetTimerLoop(delayTimer, loop, augTimerObject);
        }
        else{
            augAddClass(fieldsArray, delayTimer, loop);
        }
    }
    catch (error) {
        console.log("Error");
        return;
    }
}


/** @function augBuildDualFields */
/**
 * Main function to build dual fields and setup the aug timer object
 * @param {string} customFieldDataCid - the data-cid attribute of the main field (Example: "UF_CRM_5FDAADB43EEF0")
 * @param {array} firstOptionValues - the first array values for first select input field (Example: 'January', 'February, 'March)
 * @param {array} secondOptionValues - the second array values for second select input field (Example: '2015', '2016', '2017')
 * @param {integer} delayTimer - the timer for the await (Example: 1000ms = 1 second)
 * @param {integer} loop - the number of loop (Example: 10)
 */
 function augBuildDualFields(customFieldDataCid, firstOptionValues, secondOptionValues, delayTimer, loop){
    try {
        var applicationId = "aug-dual-input-fields-" + customFieldDataCid + "-application-intake";
        var reportingId = "aug-dual-input-fields-" + customFieldDataCid + "-reporting-intake";

        customFieldDataCid = augBuildDataCid(customFieldDataCid);
        var customFieldElement = document.querySelector(customFieldDataCid);
        var customFieldSection = customFieldElement.parentElement.parentElement;
        var idValue = "";

        if(customFieldElement.getElementsByClassName("ui-entity-editor-block-title")[0].getElementsByTagName("label")[0].innerText.includes("Application")){
            idValue = applicationId;
        }
        else{
            idValue = reportingId;
        }

        var editButton = customFieldSection.getElementsByClassName("ui-entity-editor-section-header")[0].getElementsByClassName("ui-entity-editor-header-actions")[0].getElementsByTagName("span")[0];
    
        // Bind the click event to the main function on the "edit" text as callback
        BX.bind(editButton, 'click', function(){ augBuildDualFields(customFieldDataCid, firstOptionValues, secondOptionValues, delayTimer, loop) });

        // Bind the dual fields to change in view mode
        if(editButton.innerText === "cancel"){
            BX.bind(editButton, 'click', function(){ augBuildDualFields_View(customFieldDataCid, firstOptionValues) });
        }
        
        var augTimerObject = {
            className: customFieldDataCid,

            // Run the main function to build dual fields
            runInput: function(){
                augBuildDualFields_Deal(customFieldDataCid, firstOptionValues, secondOptionValues, idValue);
            }
        };
        // Container undefined when clicked on "Edit" text so have to wait for rendering
        augSetTimerLoop(delayTimer, loop, augTimerObject);           
    }
    catch (error) {
        return;
    }
}


/** @function augBuildDualFields_Deal */
/**
 * Main function to build dual fields for the deal page and call the sub function (augBuildDualFields_)
 * @param {string} customFieldDataCid - the data-cid attribute of the main field (Example: '[data-cid="UF_CRM_5FDAADB43EEF0"]')
 * @param {array} firstOptionValues - the first array values for first select input field (Example: 'January', 'February, 'March)
 * @param {array} secondOptionValues - the second array values for second select input field (Example: '2015', '2016', '2017')
 * @param {string} idValue - the id of the element
 */
 function augBuildDualFields_Deal(customFieldDataCid, firstOptionValues, secondOptionValues, idValue){
    try {
        var spanElement = document.querySelector(augBuildDataCid(customFieldDataCid)).getElementsByClassName("ui-entity-editor-content-block")[0].childNodes[1].childNodes[1];
        BX.addClass(spanElement, "aug_flex_input");
        augBuildDualFields_(customFieldDataCid, firstOptionValues, secondOptionValues, idValue, spanElement);
    } catch (error) {
        return;
    }
}


/** @function augDualFieldsOnChange */
/**
 * Main onchange function to check whether the input in the dual fields have changed for both deal and report page
 * @param {string} mainField - the data-cid attribute of the main field (Example: '[data-cid="UF_CRM_5FDAADB43EEF0"]')
 * @param {string} idValue - the id of the element
 */
 function augDualFieldsOnChange(mainField, idValue){
    try {
        var firstId = idValue + "-first";
        var secondId = idValue + "-second";

        // Different set of id value for report page
        if(mainField.includes("data-cid") === false){
            firstId = firstId + "-" + mainField;
            secondId = secondId + "-" + mainField;
        }
        var firstField = document.getElementById(firstId).value;
        var secondField = document.getElementById(secondId).value;
        var date = "01/" + firstField + "/" + secondField;

        var input = null;
        // Application and Acceptance page
        if(mainField.includes("data-cid")){
            input = document.querySelector(mainField).getElementsByClassName("ui-entity-editor-content-block")[0].childNodes[1].childNodes[1].getElementsByTagName("input")[0];
        }
        // Report page
        else{
            // Split the class name in order to know the location of the div container
            var array = mainField.split("-");
            var className = "";
            for(var i = 0; i < array.length - 2; i++){
                if(className.length === 0){
                    className = array[i];
                }
                else{
                    className = className + "-" + array[i];
                }
            }
            var counter = mainField.split("-").pop();
            input = document.getElementsByClassName(className)[counter].getElementsByTagName("input")[0];
        }
        input.setAttribute("value", date);
    } catch (error) {
        return;
    }
}


/** @function augSplitDualFields */
/**
 * Get the value of the dual fields and split the value by the separator ("/") and set the selected attribute onto the option value
 * @param {string} mainField - the data-cid attribute of the main field (Example: '[data-cid="UF_CRM_5FDAADB43EEF0"]')
 * @param {string} selectId - the id of the element for the select fields
 */
 function augSplitDualFields(mainField, selectId){
    try {
        var inputValue = null;
        if(mainField.includes("data-cid")){
            inputValue = document.querySelector(mainField).getElementsByClassName("ui-entity-editor-content-block")[0].childNodes[1].childNodes[1].getElementsByTagName("input")[0].value;
        }
        else{
            var array = mainField.split("-");
            var className = "";
            for(var i = 0; i < array.length - 2; i++){
                if(className.length === 0){
                    className = array[i];
                }
                else{
                    className = className + "-" + array[i];
                }
            }
            var counter = mainField.split("-").pop();
            inputValue = document.getElementsByClassName(className)[counter].getElementsByTagName("input")[0].value;
        }
        var option = document.getElementById(selectId).getElementsByTagName("option");

        // Split by "/"
        var dateArray = inputValue.split("/");

        if(selectId.includes("first")){
            dateArray = dateArray[1];
        }
        else{
            dateArray = dateArray[2];
        }

        for(var i = 0; i < option.length; i++){
            if(dateArray === option[i].value){
                option[i].setAttribute("selected", "selected");
                break;
            }
        }
    } catch (error) {
        return;
    }
}


/** @function augBuildIntakesBulletPoints */
/**
 * Build the bullet points for the report page (intakes), radio buttons and labels then set the default radio buttons
 * @param {object} element - the selected container object
 * @param {integer} counter - the exact number of the container due to the same name of the numerous containers
 */
 function augBuildIntakesBulletPoints(element, counter){
    var text = [
        "All Intakes", 
        "One Intake", 
        "From .. To"
    ];

    var className = "aug-report-intake-options-list";

    try {
        // List for bullet points
        element.appendChild(
            BX.create('ul',{
                attrs:{
                    className: className
                }
            })
        );

        var checked = "";
        var idValue = "";
        var name = "";
        var labelText = element.getElementsByTagName("label")[0].innerText;
        for(var i = 0; i < 3; i++){
            idValue = text[i] + counter;
            name = "intake_" + counter;
            checked = "";

            // To set the default radio button selection
            if((labelText.includes("Application Intake") && idValue.includes("All Intakes"))
            || (labelText.includes("Reporting Intake") && idValue.includes("One Intake"))){
                checked = "checked";
            }

            element.getElementsByClassName(className)[0].appendChild(
                BX.create('input',
                {
                    attrs:{
                        className: "aug-report-intake-options",
                        type: "radio",
                        id: idValue,
                        name: name,
                        checked: checked
                    },
                    events: {
                        click: function(){ augIntakeRadioButton(element, this) }
                    }
                })
            );

            element.getElementsByClassName(className)[0].appendChild(
                BX.create('label',
                {
                    attrs:{
                        for: idValue
                    },
                    text: text[i]
                })
            );
        }    
    } catch (error) {
        return;
    }
}


/** @function augFilterSelectOptions */
/**
 * Main function to remove the options from the select (configure the array and construct the timer object)
 * @param {object} element - the selected container object
 * @param {array} inputOptionsArray - the array that with options to be kept
 * @param {string} options - decides which sub function to go for ("show" or "remove")
 */
function augFilterSelectOptions(element, inputOptionsArray, options){
    try {
        // Check whether is in edit mode
        if(element.parentElement.parentElement.getAttribute("class").includes("ui-entity-editor-section-edit")){
            // Sort the incoming array
            inputOptionsArray.sort();
            
            // Replace "-" to "not selected" (to remove)
            if(inputOptionsArray[0] === "-"){
                inputOptionsArray[0] = "not selected";
            }

            var select = element.getElementsByClassName("ui-entity-editor-content-block")[0].getElementsByTagName("div")[0];
            
            // Haven't render
            if(typeof select === "undefined"){
                console.log("Select not yet render");
                var className = augBuildDataCid(element.getAttribute("data-cid"));
                var augTimerObject = {
                    className: className,
                    runSelect: function(){
                        augFilterSelectOptions_(element, inputOptionsArray, options);
                    }
                }
                augSetTimerLoop(200, 10, augTimerObject);
            }
            else{
                console.log("Select successfully rendered");
                augFilterSelectOptions_(element, inputOptionsArray, options);
            }
        }
    } catch (error) {
        console.log("Error");
        return;
    }
}


/** @function augFilterSelectOptions_ */
/**
 * Get the data from the options and set the result from the sub function of show or remove the options value
 * @param {object} element - the selected container object
 * @param {array} inputOptionsArray - the array that with options to be kept
 * @param {string} options - decides which sub function to go for ("show" or "remove")
 */
function augFilterSelectOptions_(element, inputOptionsArray, options){
    try {
        var select = element.getElementsByClassName("ui-entity-editor-content-block")[0].getElementsByTagName("div")[0];
        var optionsString = select.getAttribute("aug-data-params");
        var optionsArray = JSON.parse(optionsString);
        
        // Sort the text fields array
        optionsArray.sort();
        console.log(optionsArray);

        if(options === "show"){
            optionsArray = augFilterSelectOptions_Show(optionsArray, inputOptionsArray);
        }
        else if(options === "remove"){
            optionsArray = augFilterSelectOptions_Remove(optionsArray, inputOptionsArray);
        }

        // Set the value back into the select
        select.setAttribute("data-items", JSON.stringify(optionsArray));
    } catch (error) {
        console.log("Error");
        return;
    }
}


/** @function augFilterSelectOptions_Show */
/**
 * Splice the unwanted options array based on the input options array by showing
 * @param {array} optionsArray - the full array of the field
 * @param {array} inputOptionsArray - the array that with options to be kept
 */
function augFilterSelectOptions_Show(optionsArray, inputOptionsArray){
    try {
        // Compare the loop of the array and the dropdown
        var j = 0;

        optionsArray.sort();
        inputOptionsArray.sort();

        // Cannot use static length due to it is registered and ignored
        for(var i = 0; i < optionsArray.length; i++){
            console.log(optionsArray[i].NAME + " " + i);
            console.log(inputOptionsArray[j] + " " + j);
            if(optionsArray[i].NAME !== inputOptionsArray[j]){
                // Remove the element from the array
                console.log("Splice data: " + optionsArray[i].NAME);
                optionsArray.splice(i, 1);
                i = i - 1;
            }
            else{
                // Set limit for j otherwise over the array
                if(j < inputOptionsArray.length - 1){
                    j++;
                }
            }
        }
        return optionsArray;
    } catch (error) {
        console.log("Error");
        return;
    }
}


/** @function augFilterSelectOptions_Remove */
/**
 * Splice the unwanted options array based on the input options array by removing
 * @param {array} optionsArray - the full array of the field
 * @param {array} inputOptionsArray - the array that with options to be kept
 */
function augFilterSelectOptions_Remove(optionsArray, inputOptionsArray){
    try {
        // Compare the loop of the array and the dropdown
        var j = 0;

        optionsArray.sort();
        inputOptionsArray.sort();

        // Cannot use static length due to it is registered and ignored
        for(var i = 0; i < optionsArray.length; i++){
            console.log(optionsArray[i].NAME + " " + i);
            console.log(inputOptionsArray[j] + " " + j);
            if(optionsArray[i].NAME === inputOptionsArray[j]){
                // Remove the element from the array
                console.log("Splice data: " + optionsArray[i].NAME);
                optionsArray.splice(i, 1);
                i = i - 1;

                // Set limit for j otherwise over the array
                if(j < inputOptionsArray.length - 1){
                    j++;
                }
                else if(j === inputOptionsArray.length - 1){
                    break;
                }
            }
        }
        return optionsArray;
    } catch (error) {
        console.log("Error");
        return;
    }
}

// ----------------------------------------- End Main function -------------------------------------------- //


// ----------------------------------------- Timer function -------------------------------------------- //

/** @function augSetTimerLoop */
/**
 * Main function of timer loop to loop through while executing function in the timer object
 * @param {integer} delayTimer - the timer for the await (Example: 1000ms = 1 second)
 * @param {integer} numberOfLoop - the number of loop (Example: 10)
 * @param {object} augTimerObject - an object with run function
 */
async function augSetTimerLoop(delayTimer, numberOfLoop, augTimerObject){
    try {
        // Check whether the function exists
        // For input fields that has not render
        if(typeof augTimerObject.runInput === "function"){
            console.log("Enter timer run input");
            var containerClassname = document.querySelector(augTimerObject.className).parentElement.parentElement.getAttribute("class");
            // In edit mode then loop to render
            if(containerClassname.includes("ui-entity-editor-section-edit")){
                var tmp_loop = 1;
                var input = null;
                do{
                    try {
                        input = document.querySelector(augTimerObject.className).getElementsByClassName("ui-entity-editor-content-block")[0].getElementsByTagName("input")[0];
                    } catch (error) {
                        input = null;
                    }
                    await new Promise(r => setTimeout(r, delayTimer));
                    tmp_loop += 1;
                }
                while((input === null || typeof input === "undefined") && tmp_loop <= numberOfLoop)

                if(typeof input !== "undefined"){
                    augTimerObject.runInput();
                }
            }
            console.log("End of the render");
        }

        // For select fields that has not render
        if(typeof augTimerObject.runSelect === "function"){
            console.log("Enter timer run select");

            var containerClassname = document.querySelector(augTimerObject.className).parentElement.parentElement.getAttribute("class");
            // In edit mode then loop to render
            if(containerClassname.includes("ui-entity-editor-section-edit")){
                var tmp_loop = 1;
                var select = null;
                do{
                    try {
                        select = document.querySelector(augTimerObject.className).getElementsByClassName("ui-entity-editor-content-block")[0].getElementsByTagName("div")[0];
                    } catch (error) {
                        select = null;
                    }
                    await new Promise(r => setTimeout(r, delayTimer));
                    tmp_loop += 1;
                }
                while((select === null || typeof select === "undefined") && tmp_loop <= numberOfLoop)

                if(typeof select !== "undefined"){
                    console.log("Timer run execute");
                    augTimerObject.runSelect();
                }
            }
        }
    } catch (error) {
        console.log("Error");
        return;
    }
}

// ----------------------------------------- End Timer function -------------------------------------------- //



// ----------------------------------------- Support function -------------------------------------------- //

/** @function augBuildDataCid */
/**
 * Build the data cid fields by concatenate
 * @param {array / string} fieldId - the number value of data-cid for the fields to change
 * @returns {array / string} fieldId
 */
function augBuildDataCid(fieldId){
    try {
        if(fieldId.constructor === Array || fieldId.constructor === Object){
            for(var key in fieldId){
                // If the value is not concatenate yet
                if(fieldId[key].substring(0, 10) != '[data-cid='){
                    // If is numeric value then add UF_CRM in front
                    if(isNaN(fieldId[key]) === false){
                        fieldId[key] = '[data-cid="UF_CRM_' + fieldId[key] + '"]';       
                    }
                    // If not numeric then don't have to add UF_CRM in front
                    else{
                        fieldId[key] = '[data-cid="' + fieldId[key] + '"]';
                    }   
                }
            }
        }
        else if(fieldId.constructor === String){
            // If the value is not concatenate yet
            if(fieldId.substring(0, 10) != '[data-cid='){
                // If is numeric value then add UF_CRM in front
                if(isNaN(fieldId) === false){
                    fieldId = '[data-cid="UF_CRM_' + fieldId + '"]';       
                }
                // If not numeric then don't have to add UF_CRM in front
                else{
                    fieldId = '[data-cid="' + fieldId + '"]';
                }
            } 
        }
        return fieldId;
    } catch (error) {
        return;
    }         
}


/** @function augHideSections */
/**
 * Hide section of the lead or deal page
 * @param {array} section - the array with fields value (Example: 'user_l2dxnbax')
 */
function augHideSections(section){
    // Check whether the fields are concatenated
    // PS: Only concatenate the string one time (Example: '[data-cid="user_l2dxnbax"]')
    // Else it will be '[data-cid="_data-cid="user_l2dxnbax"]' etc
    if(Object.values(section).length > 0){
        if(Object.values(section)[0].substring(1, 9) !== "data-cid"){
            // Get the string for the array
            section = augBuildDataCid(section);
        }
    }

    // Add hide class to all the sections in the array
    for(var key in section){
        try {
            if(document.querySelector(section[key]) != null){
                BX.addClass(document.querySelector(section[key]), "aug_hide");
            }   
        } catch (error) {
            return;
        }
    }
    // Bind all the sections to hide the sections
    var sectionsElement = document.getElementsByClassName("ui-entity-editor-column-content")[0].childNodes;
    for(var i = 0; i < sectionsElement.length; i++){
        BX.bind(sectionsElement[i].getElementsByClassName("ui-entity-editor-section-header")[0].getElementsByClassName("ui-entity-editor-header-actions")[0].childNodes[0], 'click', function(){ augHideSections(section) });
    }
}


/** @function augFieldsHaveValues */
/**
 * Check whether the fields have any values
 * @param {array} fieldsArray - the array with fields value (Example: '[data-cid="UF_CRM_1605592069446"]')
 * @returns {boolean} true or false
 */
 function augFieldsHaveValues(fieldsArray){
    // Setup fields
    for(var i = 1; i < Object.keys(fieldsArray).length; i++){
        var key = Object.keys(fieldsArray)[i];
        var node = document.querySelector(fieldsArray[key]);
        var name = node.getAttribute('data-cid');
        node = 'input[name="' + name + '"]';

        // Only for input
        if(document.querySelector(node) !== null){
            if(document.querySelector(node).value.length > 0){
                return false;
            }
        } 
        // Only for select
        else{
            node = 'select[name="' + name + '"]';
            if(document.querySelector(node).value !== ""){
                return false;
            }
        }
    }
    return true;
}


/** @function augHideTabs */
/**
 * Hide tabs of the page (Application, Marketplace and so on)
 * @param {array} tabsArray - the array with tabs name (Example: 'Applications', 'Orders')
 */
function augHideTabs(tabsArray){
    var tabsList = document.getElementsByClassName("crm-entity-section-tabs-container")[0].childNodes;

    for(var i = 0; i < tabsList.length; i++){
        var text = tabsList[i].getElementsByTagName("a")[0].innerText;
        for(var j = 0; j < tabsArray.length; j++){
            if(text === tabsArray[j]){
                BX.addClass(tabsList[i], "aug_hide");
            }
        }
    }
}


/** @function augHideEmptyFields */
/**
 * Hide all the empty fields in the page for view mode and call sub function
 */
 function augHideEmptyFields(){
    try {
        // Bind all the sections to hide empty fields
        var sections = document.getElementsByClassName("ui-entity-editor-column-content")[0].childNodes;
        for(var i = 0; i < sections.length; i++){
            BX.bind(sections[i].getElementsByClassName("ui-entity-editor-section-header")[0].getElementsByClassName("ui-entity-editor-header-actions")[0].childNodes[0], 'click', function(){ augHideEmptyFields_() });
        }
    } catch (error) {
        return;
    }
}


/** @function augHideEmptyFields_ */
/**
 * Call the sub function to customise the CSS style in order to hide empty fields
 */
function augHideEmptyFields_(){
    try {
        var className = "ui-entity-editor-content-block";
        augHideEmptyFields_Style(className);

        className = "crm-entity-widget-content-block-inner";
        augHideEmptyFields_Style(className);
    } catch (error) {
        return;
    }
}


/** @function augHideEmptyFields_Style */
/**
 * CSS styling to hide the empty fields
 */
function augHideEmptyFields_Style(className){
    try {
        var container = document.getElementsByClassName(className);
        for(var i = 0; i < container.length; i++){
            if(container[i].hasAttribute("data-cid") !== true){
                if(container[i].innerText === "field is empty"){
                    container[i].innerText = "";
                    container[i].style.right = "35%";
                }
            }
        }    
    } catch (error) {
        return;
    }
}


/** @function augAddClass */
/**
 * Main function to differentiate the parent element is input field or boolean field then call sub function to add aug_hide class
 * @param {array} fieldsArray - the array with fields value (Example: '[data-cid="UF_CRM_1605592069446"]')
 * @param {integer} delayTimer - the timer for the await (Example: 1000ms = 1 second)
 * @param {integer} loop - the number of loop (Example: 10)
 */
function augAddClass(fieldsArray, delayTimer, loop){
    try {
        var element = document.querySelector(Object.values(fieldsArray)[0]);
        if(element.getElementsByClassName("ui-entity-editor-content-block")[0].children[0].className.includes("boolean")){
            var augTimerObject = {
                className: Object.values(fieldsArray)[0],
    
                // Run the main function to add classes based on the boolean field
                runInput: function(){
                    augAddClass_Boolean(fieldsArray);
                }
            };

            augSetTimerLoop(delayTimer, loop, augTimerObject);
        }
        else{
            var augTimerObject = {
                className: Object.values(fieldsArray)[0],
    
                // Run the main function to add classes based on the input field
                runInput: function(){
                    augAddClass_InputField(fieldsArray);
                }
            };

            augSetTimerLoop(delayTimer, loop, augTimerObject);
        }
    } catch (error) {
        return;
    }
}


/** @function augAddClass_Boolean */
/**
 * Add aug_hide class to hide the fields based on the boolean field and check onclick event of the field
 * @param {array} fieldsArray - the array with fields value (Example: '[data-cid="UF_CRM_1605592069446"]')
 */
function augAddClass_Boolean(fieldsArray){
    try {
        var element = document.querySelector(Object.values(fieldsArray)[0]);
        var elementInputField = element.getElementsByClassName("ui-entity-editor-content-block")[0].getElementsByTagName("input");
        var hideBoolean = false;
        for(var i = 0; i < elementInputField.length; i++){
            if(elementInputField[i].getAttribute("checked") === "checked" && elementInputField[i].getAttribute("value") === "0"){
                hideBoolean = true;
                break;
            }
        }

        if(hideBoolean){
            for(var i = 1; i < Object.keys(fieldsArray).length; i++){
                var key = Object.keys(fieldsArray)[i];
                var node = document.querySelector(fieldsArray[key]);
                BX.addClass(node, "aug_hide");
            }
        }

        // Bind for the click event
        for(var i = 0; i < elementInputField.length; i++){
            BX.bind(elementInputField[i].parentElement, 'click', function(event){
                // If the option is "no" then hide the fields by adding the class name
                if(event.target.getAttribute("value") === "0"){
                    for(var i = 1; i < Object.keys(fieldsArray).length; i++){
                        var key = Object.keys(fieldsArray)[i];
                        var node = document.querySelector(fieldsArray[key]);
                        BX.addClass(node, "aug_hide");
                    }
                }
                // If the option is "yes" then show the fields by removing the class name
                else{
                    for(var i = 1; i < Object.keys(fieldsArray).length; i++){
                        var key = Object.keys(fieldsArray)[i];
                        var node = document.querySelector(fieldsArray[key]);
                        BX.removeClass(node, "aug_hide");
                    }
                }
            });
        }
    } catch (error) {
        console.log("Error");
        return;
    }
}


/** @function augAddClass_InputField */
/**
 * Add aug_hide class to hide the fields based on the input field and check oninput event of the field
 * @param {array} fieldsArray - the array with fields value (Example: '[data-cid="UF_CRM_1605592069446"]')
 */
 function augAddClass_InputField(fieldsArray){
    try {
        var element = document.querySelector(Object.values(fieldsArray)[0]);
        if(element.getElementsByClassName("ui-entity-editor-content-block")[0].getElementsByTagName("input")[0].value.length == 0 ){
            for(var i = 1; i < Object.keys(fieldsArray).length; i++){
                var key = Object.keys(fieldsArray)[i];
                var node = document.querySelector(fieldsArray[key]);
                try {
                    // call check fields function
                    var counter = augFieldsHaveValues(fieldsArray);
                    if(counter === true){
                        BX.addClass(node, "aug_hide");
                    }
                } catch (error) {
                    return;
                }
            }
        }

        // Bind for the click event
        BX.bind(element, 'click', function(){
            // Bind for the oninput event to change the class
            element.oninput = handleInput;

            function handleInput(e){
                // for loop to add new or remove classes
                for(var i = 1; i < Object.keys(fieldsArray).length; i++){
                    var key = Object.keys(fieldsArray)[i];
                    var node = document.querySelector(fieldsArray[key]);
                    try {
                        if(e.target.value.length > 0){
                            BX.removeClass(node, "aug_hide");
                        }
                        else{
                            // call check fields function
                            var counter = augFieldsHaveValues(fieldsArray);
                            if(counter === true){
                                BX.addClass(node, "aug_hide");
                            }
                        }
                    } catch (error) {
                        return;
                    }
                }
            }
        });
    } catch (error) {
        console.log("Error");
        return;
    }
}


/** @function augBuildDualFields_ */
/**
 * Sub function to build the dual fields with append child
 * @param {string} customFieldDataCid - the data-cid attribute of the main field (Example: '[data-cid="UF_CRM_5FDAADB43EEF0"]')
 * @param {array} firstOptionValues - the first array values for first select input field (Example: 'January', 'February, 'March)
 * @param {array} secondOptionValues - the second array values for second select input field (Example: '2015', '2016', '2017')
 * @param {string} idValue - the id of the element
 * @param {object} element - element of the container
 */
function augBuildDualFields_(customFieldDataCid, firstOptionValues, secondOptionValues, idValue, element){
    try {
        var selectFields = firstOptionValues;
        var selectId = idValue + "-first";
        
        if(document.getElementById(selectId) === null){
            // Create two new input fields
            for(var j = 0; j < 2; j++){
                // To differentiate Application page or Report page
                if(customFieldDataCid.includes("data-cid") === false){
                    selectId = selectId + "-" + customFieldDataCid;
                }

                // New select fields
                element.appendChild(
                    BX.create('select',
                    {
                        attrs:{
                            id: selectId,
                            className: "aug-two-layers-fields"
                        },
                        events: {
                            change: function(){ augDualFieldsOnChange(customFieldDataCid, idValue) }
                        }
                    })
                );

                // New option fields
                for(var i = 0; i < Object.keys(selectFields).length; i++){
                    var key = Object.keys(selectFields)[i];
                    document.getElementById(selectId).appendChild(
                        BX.create('option',
                        {
                            'attrs':  {
                                'value': selectFields[key]
                            },
                            text: key
                        })
                    );
                }

                // Change value based on the existing input fields
                if(element.getElementsByTagName("input")[0].value !== ""){
                    // Change edit mode value
                    augSplitDualFields(customFieldDataCid, selectId);
                }

                selectFields = secondOptionValues;
                selectId = idValue + "-second";
            }
        }
    }
    catch (error) {
        return;
    }
}


/** @function augBuildDualFields_View */
/**
 * View the dual fields in the view mode with timeout
 * @param {string} customFieldDataCid - the data-cid attribute of the main field (Example: '[data-cid="UF_CRM_5FDAADB43EEF0"]')
 * @param {string} firstOptionValues - the first array of the option values
 */
 function augBuildDualFields_View(customFieldDataCid, firstOptionValues){
    customFieldDataCid = augBuildDataCid(customFieldDataCid);
    var divContainer = document.querySelector(customFieldDataCid).getElementsByClassName("ui-entity-editor-content-block")[0];
    try {
        if(typeof divContainer.childNodes[1] === "undefined"){
            setTimeout(function(){
                augShowIntakes(customFieldDataCid, firstOptionValues);
            }, 1000);
        }
        else{
            augShowIntakes(customFieldDataCid, firstOptionValues);
        }
    } catch (error) {
        return;
    }
}


/** @function augShowIntakes */
/**
 * Change the date time value from the input to the intakes and show it in view mode
 * @param {string} customFieldDataCid - the data-cid attribute of the main field (Example: '[data-cid="UF_CRM_5FDAADB43EEF0"]')
 * @param {string} firstOptionValues - the first array of the option values
 */
 function augShowIntakes(customFieldDataCid, firstOptionValues){
    try {
        var divContainer = document.querySelector(customFieldDataCid).getElementsByClassName("ui-entity-editor-content-block")[0];
        var spanElement = divContainer.childNodes[1].childNodes[1];
        var text = spanElement.innerText;

        if(text !== ""){
            var string = "";
            var dateArray = text.split("/");
            for(var i = 0; i < Object.keys(firstOptionValues).length; i++){
                var key = Object.keys(firstOptionValues)[i];
                if(dateArray[1] === firstOptionValues[key]){
                    string += key;
                    break;
                }
            }
            string = string + " " + dateArray[2];
            spanElement.innerText = string;
            divContainer.style.pointerEvents = "none";
        }
    } catch (error) {
        console.log("Error");
        return;
    }
}


/** @function augBuildCalendarInputFields */
/**
 * Build the calendar input fields (from two line to one line with left and right)
 * @param {string} mainField - the classname of the field
 * @param {string} position - the position of the calendar fields for report
 */
 function augBuildCalendarInputFields(mainField, position){
    try {
        var array = mainField.split("-");
        var className = "";
        for(var i = 0; i < array.length - 1; i++){
            if(className.length === 0){
                className = array[i];
            }
            else{
                className = className + "-" + array[i];
            }
        }
        var counter = mainField.split("-").pop();

        // For right input fields
        if(position === "right"){
            var container = document.getElementsByClassName(className);
            BX.addClass(container[counter].getElementsByTagName("label")[0], "aug_hide");
            BX.addClass(container[counter], "aug-calendar-right-input-fields");

            // Create div for text (To)
            container[counter - 1].appendChild(
                BX.create('div',
                {
                    attrs:{
                        className: "aug-report-calendar-text"
                    },
                    text: "To"
                })
            );
            container[counter - 1].style.display = "inline";
            BX.addClass(container[counter - 1].getElementsByTagName("label")[0], "aug-report-calendar-inline-label");
        }
    } catch (error) {
        return;
    }
}


/** @function augIntakeRadioButton */
/**
 * Customise the intake fields based on different radio button is selected (All intakes, One intake and From To) and default loading and reload
 * @param {object} element - the object of the selected field
 * @param {object} event - the click event
 */
function augIntakeRadioButton(element, event){
    try {
        var select = element.getElementsByTagName("select");
        var text = element.getElementsByClassName("aug-report-text");
        var input = element.getElementsByTagName("input");

        var nextElement = element.nextSibling;
        var nextSelect = nextElement.getElementsByTagName("select");
        var nextText = nextElement.getElementsByClassName("aug-report-text");
        var nextInput = nextElement.getElementsByTagName("input");

        var optionList = element.getElementsByClassName("aug-report-intake-options-list")[0].getElementsByTagName("input");

        var idValue = "";
        if(event !== null){
            idValue = event.getAttribute("id");
        }
        else{
            var urlParams = new URLSearchParams(window.location.search);
            var reload = urlParams.get("set_filter");
            var inputOptions = element.getElementsByClassName("aug-report-intake-options-list")[0].getElementsByClassName("aug-report-intake-options");

            // Default
            if(reload !== "Y"){
                for(var i = 0; i < inputOptions.length; i++){
                    if(inputOptions[i].getAttribute("checked") === "checked"){
                        idValue = inputOptions[i].getAttribute("id");
                        break;
                    }
                }
            }
            // Reload
            else{
                var inputValue = input[0].value;
                var nextInputValue = nextInput[0].value;
                if(inputValue === "" && nextInputValue === ""){
                    idValue = inputOptions[0].getAttribute("id");
                }
                else if(inputValue === nextInputValue){
                    idValue = inputOptions[1].getAttribute("id");
                }
                else{
                    idValue = inputOptions[2].getAttribute("id");
                }
            }
        }

        // Re-setup checked attribute
        for(var i = 0; i < optionList.length; i++){
            optionList[i].removeAttribute("checked");
        }

        if(idValue.includes("All Intakes")){
            // Current element ("From")
            for(var i = 0; i < select.length; i++){
                BX.addClass(select[i], "aug_hide");
            }
            BX.addClass(text[0], "aug_hide");
            input[0].setAttribute("value", "");

            // Next element ("To")
            for(var i = 0; i < nextSelect.length; i++){
                BX.addClass(nextSelect[i], "aug_hide");
            }
            BX.addClass(nextText[0], "aug_hide");
            nextInput[0].setAttribute("value", "");

            // Setup the checked attribute back
            optionList[0].setAttribute("checked", "checked");
        }
        else if(idValue.includes("One Intake")){
            // Current element ("From")
            for(var i = 0; i < select.length; i++){
                BX.removeClass(select[i], "aug_hide");
            }
            BX.removeClass(text[0], "aug_hide");
            text[0].innerText = "In";

            // Next element ("To")
            for(var i = 0; i < nextSelect.length; i++){
                BX.addClass(nextSelect[i], "aug_hide");
            }
            BX.addClass(nextText[0], "aug_hide");

            // Setup the checked attribute back
            optionList[1].setAttribute("checked", "checked");
        }
        else if(idValue.includes("From")){
            // Current element ("From")
            for(var i = 0; i < select.length; i++){
                BX.removeClass(select[i], "aug_hide");
            }
            BX.removeClass(text[0], "aug_hide");
            text[0].innerText = "From";

            // Next element ("To")
            for(var i = 0; i < nextSelect.length; i++){
                BX.removeClass(nextSelect[i], "aug_hide");
            }
            BX.removeClass(nextText[0], "aug_hide");

            // Setup the checked attribute back
            optionList[2].setAttribute("checked", "checked");
        }

        // General bind change function for all radio buttons
        for(var i = 0; i < select.length; i++){
            BX.bind(select[i], "change", augIntakesOnChange);
        }
    } catch (error) {
        return;
    }
}


/** @function augIntakesOnChange */
/**
 * On change event for the one intake and unbind on change event (All Intakes and From To)
 */
function augIntakesOnChange(){
    try {
        var className = "aug-report-filter-field-datetime";
        var container = document.getElementsByClassName(className);
        var intakes = "";
        for(var i = 0; i < container.length; i++){
            // First container of each intake which has the option list
            if(i % 2 === 0){
                var optionList = container[i].getElementsByClassName("aug-report-intake-options-list")[0].getElementsByTagName("input");
                for(var j = 0; j < optionList.length; j++){
                    if(optionList[j].getAttribute("checked") === "checked"){
                        intakes = optionList[j].getAttribute("id");
                        break;
                    }
                }

                var select = container[i].getElementsByTagName("select");
                // Unbind All Intakes and From To
                if(intakes.includes("All Intakes") || intakes.includes("From")){
                    for(var j = 0; j < select.length; j++){
                        BX.unbind(select[j], "change", augIntakesOnChange);
                    }
                }
                // Actions for One Intake
                else{
                    var months = select[0].value;
                    var year = select[1].value;
                    var date = "01/" + months + "/" + year;
                    container[i].getElementsByTagName("input")[0].setAttribute("value", date);
                    container[i+1].getElementsByTagName("input")[0].setAttribute("value", date);
                }
            }
        }
    } catch (error) {
        return;
    }
}


/** @function augBuildDualFields_Report */
/**
 * Main function to build dual fields for report page and call the sub function
 * @param {string} mainField - the data-cid attribute of the main field (Example: '[data-cid="UF_CRM_5FDAADB43EEF0"]')
 * @param {array} firstOptionValues - the first array values for first select input field (Example: 'January', 'February, 'March)
 * @param {array} secondOptionValues - the second array values for second select input field (Example: '2015', '2016', '2017')
 * @param {string} idValue - the id of the element
 */
function augBuildDualFields_Report(mainField, firstOptionValues, secondOptionValues, idValue){
    try {
        var element = null;
        var array = mainField.split("-");
        var className = "";
        // Get the class name by splitting the string
        for(var i = 0; i < array.length - 2; i++){
            if(className.length === 0){
                className = array[i];
            }
            else{
                className = className + "-" + array[i];
            }
        }
        var counter = mainField.split("-").pop();
        // Get the correct element with the split classname and the counter to indicate which calendar field
        element = document.getElementsByClassName(className)[counter];

        // Add id for CSS
        BX.addClass(element, "aug-report-filter-field-datetime");

        var text = array[array.length - 2];

        // Only first row
        if(text === "From"){
            augBuildIntakesBulletPoints(element, counter);
        }

        // Create div for text (From and To)
        element.appendChild(
            BX.create('div',
            {
                attrs:{
                    className: "aug-report-text"
                },
                text: text
            })
        );


        // Hide the whole label when is "To"
        if(text === "To"){
            BX.addClass(element.getElementsByTagName("label")[0], "aug_hide");
            BX.addClass(element, "aug-report-filter-field-to-datetime");
        }

        // Hide the original calendar input field and icon
        BX.addClass(element.getElementsByTagName("input")[0], "aug-report-calendar-input");
        BX.addClass(element.getElementsByTagName("a")[0], "aug-report-calendar-icon");

        augBuildDualFields_(mainField, firstOptionValues, secondOptionValues, idValue, element);
    } catch (error) {
        return;
    }
}


/** @function augBuildOneIntakeField_Report */
/**
 * Main function to build one intake fields for report page and call the sub function (In equal to)
 * @param {string} mainField - the data-cid attribute of the main field (Example: '[data-cid="UF_CRM_5FDAADB43EEF0"]')
 * @param {array} firstOptionValues - the first array values for first select input field (Example: 'January', 'February, 'March)
 * @param {array} secondOptionValues - the second array values for second select input field (Example: '2015', '2016', '2017')
 * @param {string} idValue - the id of the element
 */
function augBuildOneIntakeField_Report(mainField, firstOptionValues, secondOptionValues, idValue){
    try {
        var element = null;
        var array = mainField.split("-");
        var className = "";
        // Get the class name by splitting the string
        for(var i = 0; i < array.length - 2; i++){
            if(className.length === 0){
                className = array[i];
            }
            else{
                className = className + "-" + array[i];
            }
        }
        var counter = mainField.split("-").pop();
        // Get the correct element with the split classname and the counter to indicate which calendar field
        element = document.getElementsByClassName(className)[counter];

        // Add id for CSS
        BX.addClass(element, "aug-report-filter-field-one-datetime");

        // Create div for text (In)
        element.appendChild(
            BX.create('div',
            {
                attrs:{
                    className: "aug-report-text"
                },
                text: "In"
            })
        );

        // Hide the original calendar input field and icon
        BX.addClass(element.getElementsByTagName("input")[0], "aug-report-calendar-input");
        BX.addClass(element.getElementsByTagName("a")[0], "aug-report-calendar-icon");

        augBuildDualFields_(mainField, firstOptionValues, secondOptionValues, idValue, element);
    } catch (error) {
        return;
    }
}

/** @function augBuildHideAllButton */
/**
 * Build hide all and cancel all button for lead
 */
function augBuildHideAllButton(){
    try {
        var container = document.getElementsByClassName("ui-entity-editor-column-content")[0];
        var firstColumn = container.firstChild;
        var firstEditButton = firstColumn.getElementsByClassName("ui-entity-editor-section-header")[0].getElementsByClassName("ui-entity-editor-header-actions")[0].getElementsByClassName("ui-entity-editor-header-edit-lnk")[0];

        BX.bind(firstEditButton, "click", function(){ augEditAllSections() });

        if(firstColumn.getAttribute("class").includes("ui-entity-editor-section-edit")){
            firstEditButton.innerText = "Cancel All";
        }
        else{
            firstEditButton.innerText = "Edit All";
        }
    } catch (error) {
        return;
    }
}


/** @function augEditAllSections */
/**
 * Create edit all button functions that trigger the form
 */
function augEditAllSections(){
    try {
        var container = document.getElementsByClassName("ui-entity-editor-column-content")[0];
        var firstColumn = container.firstChild;
        var section = container.childNodes;
        var firstEditButton = firstColumn.getElementsByClassName("ui-entity-editor-section-header")[0].getElementsByClassName("ui-entity-editor-header-actions")[0].getElementsByClassName("ui-entity-editor-header-edit-lnk")[0];
        var editButton = null;

        for(var i = 1; i < section.length; i++){
            editButton = section[i].getElementsByClassName("ui-entity-editor-section-header")[0].getElementsByClassName("ui-entity-editor-header-actions")[0].getElementsByClassName("ui-entity-editor-header-edit-lnk")[0];
            // Cause the first edit button is already triggered and the text is changed
            if((editButton.innerText === "edit" && firstEditButton.innerText.includes("cancel"))
            || (editButton.innerText === "cancel" && firstEditButton.innerText.includes("edit"))){
                editButton.click();
            }
        }

        augBuildHideAllButton();

        // Closure for assigning multiple click event onto an element
        // https://stackoverflow.com/questions/39342606/use-loop-to-bind-events
        // BX.bind(firstEditButton, "click", (function(i){ 
        //     return function(){
        //         section[i].getElementsByClassName("ui-entity-editor-section-header")[0].getElementsByClassName("ui-entity-editor-header-actions")[0].getElementsByClassName("ui-entity-editor-header-edit-lnk")[0].click()
        //     };
        // })(i));
    } catch (error) {
        return;
    }
}


// var userDepartments = {
//         "1": "AUG Global",
//         //"46": "Communication Team",
//         "27": "AUG Melbourne",
//         "40": "AUG Ipoh"
//     };
// var userCrmRoleName = "Administrator"; 


/** @function augGetDefaultCountry */
/**
 * Get the first value from the global variable as default value(branchCountry)
 */
function augGetDefaultCountry(){
    console.log(fullBranchCountryList);
    return fullBranchCountryList[0];
}


/** @function augGetUserAccessBranchCountry */
/**
 * Update the list of the branch office in the customised lead fields array based on the departments and the role
 * @param {array} departments - the list of the user departments
 * @param {string} role - the role of the user
 */
function augGetUserAccessBranchCountry(departments, role){
    var branch = {};
    var branchCountryArray = new Set();
    var checked = false;

    // Check whether there are any "AUG Global" and "Communication Team" in the departments then provide full access
    for(var i = 0; i < Object.keys(departments).length; i++){
        var key = Object.keys(departments)[i];
        if(departments[key] === "AUG Global" || departments[key] === "Communication Team"){
            checked = true;
            window.fullBranchCountryList = ["Australia", "China", "Hong Kong", "Indonesia", "Malaysia", "Philippines", "Singapore"];
            break;
        }
    }

    // All role except Administrator needs to update the config array
    if(role !== "Administrator"){
        // Validation of "AUG Global" and "Communication Team" exist
        if(checked === false){
            // Get the branch country and branch office from user departments
            for(var i = 0; i < Object.keys(departments).length; i++){
                var key = Object.keys(departments)[i];
                if(augcBranchOfficeForCountry[departments[key]]){
                    var branchCountryString = augcBranchOfficeForCountry[departments[key]];
                    branchCountryArray.add(branchCountryString);

                    // General Manager has access to all the branch office
                    if(role !== "General Manager"){
                        // Remove AUG wording of the branch office before pushing (Requires extra for loop if do it later)
                        if(departments[key].substring(0, 3) === "AUG"){
                            departments[key] = departments[key].substring(4);
                        }

                        // Update the array
                        if(branch[branchCountryString]){
                            branch[branchCountryString].push(departments[key]);
                        } else{
                            branch[branchCountryString] = [departments[key]];
                        }
                    }
                }
            }
            // Update the customised lead fields array
            // General Manager only update the branch country not the branch office
            if(role === "General Manager"){
                // Update only the branch country field
                for(var country of branchCountryArray){
                    if(augcCustomisedLeadFieldsArray[country]){
                        // Convert set to array and assign it into the customised lead field array
                        augcCustomisedLeadFieldsArray[country]["Branch Country"] = Array.from(branchCountryArray);
                    }
                }
            } else{
                // Update the branch country field
                for(var country of branchCountryArray){
                    if(augcCustomisedLeadFieldsArray[country]){
                        // Convert set to array and assign it into the customised lead field array
                        augcCustomisedLeadFieldsArray[country]["Branch Country"] = Array.from(branchCountryArray);
                    }
                }

                // Update the branch office field
                for(var i = 0; i < Object.keys(branch).length; i++){
                    var key = Object.keys(branch)[i];
                    augcCustomisedLeadFieldsArray[key]["Branch"] = branch[key];
                }
            }
            // Declare global variable based on the access level except Administrator
            window.fullBranchCountryList = Array.from(branchCountryArray);
        }
    } else{
        // Declare global variable based on Administrator access level
        window.fullBranchCountryList = ["Australia", "China", "Hong Kong", "Indonesia", "Malaysia", "Philippines", "Singapore"];
    }
}


/** @function augDependentBranchCountryFields */
/**
 * Main function to customise the fields by configuring the timer object and call sub function
 * @param {array} listOfElementIDs - the list of the element id 
 * @param {array} fieldsArray - the list array for fields to be customised
 */
function augDependentBranchCountryFields(listOfElementIDs, fieldsArray){
    // Get the default country for default field's item
    var branchCountry = augGetDefaultCountry();

    try {
        // Bind the function to all the sections
        var container = document.getElementsByClassName("ui-entity-editor-column-content")[0];
        var section = container.childNodes;
        var editButton = null;

        // Call the sub bind function (augDependentBranchCountryField) instead of unbind and bind back in the for loop to only bind to that "clicked" edit button
        for(var i = 1; i < section.length; i++){
            editButton = section[i].getElementsByClassName("ui-entity-editor-section-header")[0].getElementsByClassName("ui-entity-editor-header-actions")[0].getElementsByClassName("ui-entity-editor-header-edit-lnk")[0];
            /* Closure for assigning multiple click event onto an element
            *  Reason to use closure: The "i" value has to be kept in order to know which edit button is triggered
            * 
            *  Not working: 
            *  1. Put the whole edit button as parameter - It does not get the element by itself instead just the name of the button (no inspect symbol next to the element)
            *  2. Use event (event.target) - It does not get the element by itself instead just the name of the button (no inspect symbol next to the element)
            *  3. this - It prints out the whole iframe window instead of the button
            *  4. Just the "i" value without closure - It only prints out the last "i" value due to the i array is out of stack by the time it triggers the bind
            */
            BX.bind(editButton, 'click', (function(i){ 
                return function(event){
                    augDependentBranchCountryField(listOfElementIDs, branchCountry, fieldsArray, i, event) 
                };
            })(i));
        }

        // Get all the text fields that are in edit mode and then call the sub function (to show / hide dropdown options and bind it to the master element)
        var textFields = document.getElementsByClassName("ui-entity-editor-block-title-text");
        for(var i = 0; i < textFields.length; i++){
            var text = textFields[i].innerText;
            // Check whether it exists in the array
            if(fieldsArray[branchCountry][text]){
                var fieldElement = textFields[i].parentElement.parentElement;
                // Check whether is in edit mode
                if(fieldElement.parentElement.parentElement.className.includes("ui-entity-editor-section-edit")){
                    augDependentBranchCountryFields_Dropdown(listOfElementIDs, branchCountry, fieldsArray, fieldElement);
                }
            }
        }
    } catch (error) {
        console.log("Error"); 
        return;
    }
}


/** @function augDependentBranchCountryField */
/**
 * Sub function to bind to that single particular section that is "clicked" on the edit text button
 * @param {array} listOfElementIDs - the list of the element id 
 * @param {string} branchCountry - the branch country
 * @param {array} fieldsArray - the list array for fields to be customised
 * @param {integer} counter - the number of the section where the edit button is clicked
 * @param {object} event - the click event that the user clicked (on the edit button of particular section)
 */
function augDependentBranchCountryField(listOfElementIDs, branchCountry, fieldsArray, counter, event){
    try {
        // Get the edit button element and bind it with the function
        var editButton = document.getElementsByClassName("ui-entity-editor-column-content")[0].childNodes[counter].getElementsByClassName("ui-entity-editor-section-header")[0].getElementsByClassName("ui-entity-editor-header-actions")[0].getElementsByClassName("ui-entity-editor-header-edit-lnk")[0];
        BX.bind(editButton, 'click', function(){ augDependentBranchCountryField(listOfElementIDs, branchCountry, fieldsArray, counter, event) });

        // Get the event target / clicked section element then call the sub function (to show / hide dropdown options and bind it to the master element)
        var sectionDataCid = augBuildDataCid(event.target.parentElement.parentElement.parentElement.getAttribute("data-cid"));
        var sectionElement = document.querySelector(sectionDataCid);
        if(sectionElement.className.includes("ui-entity-editor-section-edit")){
            var childElement = sectionElement.getElementsByClassName("ui-entity-editor-section-content")[0].getElementsByClassName("ui-entity-editor-content-block");
            for(var i = 0; i < childElement.length; i++){
                if(childElement[i].getAttribute("data-cid")){
                    var fieldText = childElement[i].getElementsByClassName("ui-entity-editor-block-title")[0].getElementsByTagName("label")[0].innerText;
                    // If the text field is appear in the array (means make it as a dependent element)
                    if(fieldsArray[branchCountry][fieldText]){
                        augDependentBranchCountryFields_Dropdown(listOfElementIDs, branchCountry, fieldsArray, childElement[i]);
                    }
                }
            }
        }
    } catch (error) {
        console.log("Error");
        return;
    }
}


/** @function augDependentBranchCountryFields_Dropdown */
/**
 * Sub function to wait for the fields to render and call another sub function to filter the field elements
 * @param {array} listOfElementIDs - the list of the element id 
 * @param {string} branchCountry - the name of the branch country
 * @param {array} optionsArray - the options array that stores all the customised fields based on the location
 * @param {object} fieldElement - the element of the selected field
 */
function augDependentBranchCountryFields_Dropdown(listOfElementIDs, branchCountry, optionsArray, fieldElement){
    try {
        // Haven't render for existing enquiries (div container) then assign it to the timer loop function
        if(typeof fieldElement.getElementsByClassName("ui-entity-editor-content-block")[0].getElementsByTagName("div")[0] === "undefined"){
            var augTimerObject = {
                className: augBuildDataCid(fieldElement.getAttribute("data-cid")),

                runSelect: function(){
                    // Run sub function to customise the fields
                    augDependentBranchCountryFields_Dropdown_(listOfElementIDs, branchCountry, optionsArray, fieldElement);
                }
            }
            
            augSetTimerLoop(200, 10, augTimerObject);
        }
        // Proceed when it is rendered without going through the timer loop function
        else{
            augDependentBranchCountryFields_Dropdown_(listOfElementIDs, branchCountry, optionsArray, fieldElement);
        }
    } catch (error) {
        console.log("Error");
        return;
    }
}


/** @function augDependentBranchCountryFields_Dropdown_ */
/**
 * Call the filter select options function for the fields and call the binding function
 * @param {array} listOfElementIDs - the list of the element id 
 * @param {string} branchCountry - the name of the branch country
 * @param {array} optionsArray - the options array that stores all the customised fields based on the location
 * @param {object} fieldElement - the element of the selected field
 */
function augDependentBranchCountryFields_Dropdown_(listOfElementIDs, branchCountry, optionsArray, fieldElement){
    try {
        // Get the inner text of the field and the input field element itself
        var key = fieldElement.getElementsByClassName("ui-entity-editor-block-title")[0].getElementsByTagName("label")[0].innerText;
        var inputElement = fieldElement.getElementsByClassName("ui-entity-editor-content-block")[0].getElementsByTagName("div")[0];
        
        // Set up the aug-data-params for full access data items if the parameter is not found
        if(inputElement.getAttribute("aug-data-params") === null){
            var userFieldsBasedOnCountry = "";

            // Get all the values for the fields based on all the branch country that have access
            for(var j = 0; j < fullBranchCountryList.length; j++){
                if(userFieldsBasedOnCountry === ""){
                    userFieldsBasedOnCountry = optionsArray[fullBranchCountryList[j]][key];
                } else{
                    userFieldsBasedOnCountry = userFieldsBasedOnCountry + "," + optionsArray[fullBranchCountryList[j]][key];
                }
            }

            // Convert the array to Set and check for duplicates then convert it back to array
            userFieldsBasedOnCountry = Array.from(new Set(userFieldsBasedOnCountry.split(",")));

            // Get the initial full data items value
            var fullDataItemsString = inputElement.getAttribute("data-items");
            var fullDataItemsArray = JSON.parse(fullDataItemsString);
            fullDataItemsArray = augObjectSortKey(fullDataItemsArray);

            // Compare the initial full data items value with the selected items then set the aug-data-params
            var augDataParams = augFilterSelectOptions_Show(fullDataItemsArray, userFieldsBasedOnCountry);
            inputElement.setAttribute("aug-data-params", JSON.stringify(augDataParams));
        }
        // Call the filter function to filter the fields
        augFilterSelectOptions(fieldElement, optionsArray[branchCountry][key], "show");

        // Call the binding function to bind the element
        augDependentBranchCountryFields_Bind(listOfElementIDs, optionsArray, fieldElement);
    } catch (error) {
        console.log("Error");
        return;
    }
}


/** @function augDependentBranchCountryFields_Bind */
/**
 * Bind the dependent fields to the master element and call for filter select function (to show / hide the dropdown options based on the input of master element)
 * @param {array} listOfElementIDs - the list of the element id 
 * @param {array} optionsArray - the options array that stores all the customised fields based on the location
 * @param {object} dependentElement - the element of the selected field
 */
function augDependentBranchCountryFields_Bind(listOfElementIDs, optionsArray, dependentElement){
    try {
        // Get the master element
        var masterElement = document.querySelector(augBuildDataCid(listOfElementIDs["Branch Country"]));

        // Get the text of the fields
        var key = dependentElement.getElementsByClassName("ui-entity-editor-block-title")[0].getElementsByTagName("label")[0].innerText;
        // Exclude the first object as the first object is the master element (Branch Country)
        if(augBuildDataCid(listOfElementIDs["Branch Country"]) !== dependentElement.getAttribute("data-name")){
            // Check whether the field exists inside the list of elements
            if(listOfElementIDs[key]){
                // If in edit mode then proceed to the binding
                if(dependentElement.parentElement.parentElement.getAttribute("class").includes("ui-entity-editor-section-edit") && dependentElement !== null){

                    // Closure for assigning multiple click event onto an element to keep track which field is clicked
                    BX.bind(dependentElement, "click", (function(key){
                        return function(){
                            try {
                                // Get the data value from the master element
                                var masterDataValue = masterElement.getElementsByClassName("ui-entity-editor-content-block")[0].getElementsByTagName("div")[0].getAttribute("data-value");
                                var masterDataValueArray = JSON.parse(masterDataValue);
            
                                var selectedBranchCountry = masterDataValueArray.NAME;

                                // If the country exists in the array then only search for the user field to avoid "not selected" error
                                if(optionsArray[selectedBranchCountry]){
                                    if(optionsArray[selectedBranchCountry][key]){
                                        // Redeclare the element due to the previous element has out of the stack / memory
                                        dependentElement = document.querySelector(augBuildDataCid(listOfElementIDs[key]));
                                        // Call the filter select function to filter the fields
                                        augFilterSelectOptions(dependentElement, optionsArray[selectedBranchCountry][key], "show");
                                    }
                                }
                            } catch (error) {
                                console.log("Error");
                                return;
                            }
                        };
                    })(key));
                }
            }
        }
    } catch (error) {
        console.log("Error");
        return;
    }
}


/** @function augObjectSortKey */
/**
 * Support function to sort the array based on the ascending of the key
 * @param {array} sortArray - the array to be sorted
 * @return {array} sortArray - the array that is sorted
 */
function augObjectSortKey(sortArray){
    // Sort the object using custom sort due to sorting the key of the objects ({NAME: Melbourne, VALUE: 111}) not the normal array ([Melbourne, Ipoh])
    sortArray.sort(function(firstElement, secondElement){
        var firstElementKey = new String(firstElement.NAME);
        var secondElementKey = new String(secondElement.NAME);
        // If smaller then move behind
        if(firstElementKey < secondElementKey){
            return -1;
        }
        // If bigger than move forward
        if(firstElementKey > secondElementKey){
            return 1;
        }
        // If no change then keep the order
        return 0;
    });
    return sortArray;
}


/** @function augTriggerEditMode */
/**
 * Support function to trigger the edit mode when the field is clicked during the view mode
 * @param {string} elementDataCid - the data cid of the element
 */
function augTriggerEditMode(elementDataCid){
    try {
        var sectionElement = document.querySelector(elementDataCid).parentElement.parentElement;
        var editCancelButton = sectionElement.getElementsByClassName("ui-entity-editor-section-header")[0].getElementsByClassName("ui-entity-editor-header-actions")[0].childNodes[0];
        // Only bind to the edit button when it is in view mode
        if(editCancelButton.innerText === "edit"){
            // Bind the field to the edit button
            BX.bind(document.querySelector(elementDataCid).getElementsByClassName("ui-entity-editor-content-block")[0], 'click', function(){ 
                editCancelButton.click();
                // Redeclare the edit button as it is out of stack
                var editButton = document.querySelector(elementDataCid).parentElement.parentElement.getElementsByClassName("ui-entity-editor-section-header")[0].getElementsByClassName("ui-entity-editor-header-actions")[0].childNodes[0];
                BX.bind(editButton, 'click', function(event){ 
                    augTriggerEditMode_(event);
                });
            });
        }
        // Only bind to the edit button when it is in edit mode
        else{
            BX.bind(editCancelButton, 'click', function(){ augTriggerEditMode(elementDataCid) });
        }
    } catch (error) {
        console.log("Error");
        return;
    }
}


/** @function augTriggerEditMode_ */
/**
 * Support function to bind the fields in the particular section that is clicked by the user (generated by the click event listener) then call back the main function
 * @param {object} event - the click event
 */
function augTriggerEditMode_(event){
    try {
        var sectionDataCid = augBuildDataCid(event.target.parentElement.parentElement.parentElement.getAttribute("data-cid"));
        var sectionElement = document.querySelector(sectionDataCid);
        var textElement = sectionElement.getElementsByClassName("ui-entity-editor-block-title");
        // Bind the fields of the section to trigger edit mode function
        for(var i = 0; i < textElement.length; i++){
            var elementDataCid = augBuildDataCid(textElement[i].parentElement.getAttribute("data-cid"));
            BX.bind(document.querySelector(elementDataCid).getElementsByClassName("ui-entity-editor-content-block")[0], 'click', (function(elementDataCid){ 
                augTriggerEditMode(elementDataCid);
            })(elementDataCid));
        }   
    } catch (error) {
        return;
    }
}


/** @function augGenerateSecondThirdOptions */
/**
 * Main function to generate the second and third options array (Use timer loop to wait for the field to render then call sub function)
 * @param {string} customFieldDataCid - the data cid of the custom field (custom field in the bitrix)
 * @returns {array} secondThirdOptions
 */
async function augGenerateSecondThirdOptions(customFieldDataCid){
    try {
        var customFieldElement = document.querySelector(augBuildDataCid(customFieldDataCid));
        var secondThirdOptions = {};

        if(customFieldElement.parentElement.parentElement.className.includes("ui-entity-editor-section-edit")){
            // The field is not yet render so need to set timer loop to wait for it to render
            if(typeof customFieldElement.getElementsByClassName("ui-entity-editor-content-block")[0].getElementsByTagName("div")[0] === "undefined"){
                console.log("Undefined");

                var augTimerObject = {
                    className: augBuildDataCid(customFieldDataCid),

                    runSelect: function(){
                        // Run sub function to generate the array
                        secondThirdOptions = augGenerateSecondThirdOptions_(customFieldDataCid);
                    }
                }
                // Need to wait for the function to finish before proceeding as the variable is needed for future function
                await augSetTimerLoop(200, 10, augTimerObject);
            }
            // Call the function if the field is rendered
            else{
                secondThirdOptions = augGenerateSecondThirdOptions_(customFieldDataCid);
            }
            return secondThirdOptions;
        }
    } catch (error) {
        console.log("Error");
        return;
    }
}


/** @function augGenerateSecondThirdOptions_ */
/**
 * Sub function to generate the second and third options array
 * @param {string} customFieldDataCid - the data cid of the custom field (custom field in the bitrix)
 * @returns {array} secondThirdOptions
 */
function augGenerateSecondThirdOptions_(customFieldDataCid){
    /* Sample of eventAttendedLastArray
        var eventAttendedLastArray = {
            "AU--EXPO": [ 
                {NAME: "AU--EXPO--2011", VALUE: "24411"},
                {NAME: "AU--EXPO--2019", VALUE: "24412"},
                {NAME: "AU--EXPO--2020", VALUE: "24413"},
                {NAME: "AU--EXPO--2021", VALUE: "24414"}
            ],
            "MY--EXPO": [ 
                {NAME: "MY--EXPO--2011", VALUE: "24419"}
            ],
        }
    */

    try {
        var customFieldElement = document.querySelector(augBuildDataCid(customFieldDataCid));
        var customFieldDataItemsString = customFieldElement.getElementsByClassName("ui-entity-editor-content-block")[0].getElementsByTagName("div")[0].getAttribute("data-items");
        var customFieldDataItems = JSON.parse(customFieldDataItemsString);
        var secondThirdOptions = {};

        // Check each data items in the array then push it into the new array with new format for new data structure array
        for(var i = 0; i < customFieldDataItems.length; i++){
            var text = customFieldDataItems[i].NAME.split("--");
            var key;
            // 3 layers field
            if(text.length === 3){
                key = text[0] + "--" + text[1];
            }
            // 2 layers field
            else{
                key = text[0];
            }
            // If there are exists key then append the value into the same key
            if(secondThirdOptions[key]){
                secondThirdOptions[key].push(customFieldDataItems[i]);
            }
            // If there are no such key exist then initialise the first array with the value
            else{
                secondThirdOptions[key] = [customFieldDataItems[i]];
            }
        }
        return secondThirdOptions;    
    } catch (error) {
        console.log("Error");
        return;
    }
}


function augFilterThreeLayersArray(customFieldDataCid, idValueFrom, idValueTo){
    try {
        var customFieldElement = document.querySelector(augBuildDataCid(customFieldDataCid));
        var fullDataItemsString = customFieldElement.getElementsByClassName("ui-entity-editor-content-block")[0].getElementsByTagName("div")[0].getAttribute("data-items");
        var fullDataItemsArray = JSON.parse(fullDataItemsString);
        var filterArray = {};
        var checked;

        for(var i = 0; i < fullDataItemsArray.length; i++){
            checked = "";
            // Replace the "*" to "" and validate it
            if(fullDataItemsArray[i].NAME.substring(0, 1) === "*"){
                console.log("Asterick found");
                fullDataItemsArray[i].NAME = fullDataItemsArray[i].NAME.replace("*", "");
                checked = "true";
            }
            console.log("End asterick");
            console.log(fullDataItemsArray[i].VALUE);
            console.log(typeof fullDataItemsArray[i].VALUE);
            console.log(typeof idValueFrom);
            console.log(typeof idValueTo);
            console.log(idValueFrom);
            console.log(idValueTo);
            // Check the id value to be in the range and validate it
            if(fullDataItemsArray[i].VALUE >= idValueFrom && fullDataItemsArray[i].VALUE <= idValueTo){
                console.log("Validate id");
                checked = "true";
            }
            console.log("End validation");

            // Insert the validated element into a new filtered array and return it
            if(checked === "true"){
                console.log("Insert");
                var text = fullDataItemsArray[i].NAME.split("--");
                var key = "";
                if(text.length === 3){
                    key = text[0] + "--" + text[1];
                }

                if(key !== ""){
                    if(filterArray[key]){
                        filterArray[key].push(fullDataItemsArray[i]);
                    }
                    else{
                        filterArray[key] = [fullDataItemsArray[i]];
                    }
                }
            }
            console.log("Done");
        }
        console.log(filterArray);
        return filterArray;
    } catch (error) {
        console.log("Error");
        return;
    }
}

// Static constant to be used for the three layers function
const threeLayersConstant = "aug-three-layers";

/** @function augBuildThreeLayerAndMockUpFields */
/**
 * Main function to build the three layer fields
 * @param {string} customFieldDataCid - the data cid of the custom field (custom field in the bitrix)
 * @param {string} threeLayersTextFieldName - the text name of the field for the three layer fields
 * @param {string} mockupTextFieldName - the text name of the field for the mockup fields
 * @param {array} firstSecondOptions - the array for the first and second options / layers
 * @param {array} secondThirdOptions - the array for the second and third options / layers
 */
async function augBuildThreeLayerAndMockUpFields(customFieldDataCid, threeLayersTextFieldName, mockupTextFieldName, firstSecondOptions, secondThirdOptions){
    try {
        // Only continue the function after the second third options array is generated (Await function is needed)
        if(secondThirdOptions === null){
            secondThirdOptions = await augGenerateSecondThirdOptions(customFieldDataCid);
        }

        var test = augFilterThreeLayersArray(customFieldDataCid, 59462, 60072);
        console.log(test);

        var divContainerId = threeLayersConstant + "-div-" + customFieldDataCid;
        var selectFieldId = threeLayersConstant + "-select-" + customFieldDataCid;

        var customFieldElement = document.querySelector(augBuildDataCid(customFieldDataCid));
        var customFieldSection = customFieldElement.parentElement.parentElement;
        var editButton = customFieldSection.getElementsByClassName("ui-entity-editor-header-actions")[0].getElementsByTagName("span")[0];

        if(customFieldSection.className.includes("ui-entity-editor-section-edit")){
            // Create the div container
            BX.insertBefore(
                BX.create("div",
                {
                    attrs:{
                        className: "ui-entity-editor-content-block",
                        id: divContainerId
                    }
                }), customFieldElement
            );

            // Create the title container
            document.getElementById(divContainerId).appendChild(
                BX.create("div",
                {
                    attrs:{
                        className: "ui-entity-editor-block-title ui-entity-widget-content-block-title-edit"
                    }
                })
            );

            // Create the title label
            document.getElementById(divContainerId).getElementsByClassName("ui-entity-editor-block-title")[0].appendChild(
                BX.create("label",
                {
                    attrs:{
                        className: "ui-entity-editor-block-title-text"
                    },
                    text: threeLayersTextFieldName
                })
            );

            // Create the select container
            document.getElementById(divContainerId).appendChild(
                BX.create("div",
                {
                    attrs:{
                        className: "ui-entity-editor-content-block"
                    }
                })
            );

            // Create the select options
            for(var i = 0; i < 3; i++){
                // Add width className for first and second field
                if(i !== 2){
                    document.getElementById(divContainerId).getElementsByClassName("ui-entity-editor-content-block")[0].appendChild(
                        BX.create("select",
                        {
                            attrs:{
                                id: selectFieldId + "-" + i,
                                className: "aug-three-layers-fields aug-three-layers-fields-w70"
                            }
                        })
                    );
                }
                else{
                    document.getElementById(divContainerId).getElementsByClassName("ui-entity-editor-content-block")[0].appendChild(
                        BX.create("select",
                        {
                            attrs:{
                                id: selectFieldId + "-" + i,
                                className: "aug-three-layers-fields aug-three-layers-fields-w170"
                            }
                        })
                    );
                }
            }

            // Create the add button
            document.getElementById(divContainerId).getElementsByClassName("ui-entity-editor-content-block")[0].appendChild(
                BX.create("button",
                {
                    attrs:{
                        className: "aug-select-three-layers-add-button"
                    },
                    text: "Add"
                })
            );

            var addButton = document.getElementById(divContainerId).getElementsByClassName("ui-entity-editor-content-block")[0].getElementsByClassName("aug-select-three-layers-add-button")[0];

            // Bind the add button to the add element function
            BX.bind(addButton, "click", function(){ augThreeLayersAddButton(customFieldDataCid) });
            
            // IMPORTANT: It triggers the built in save function to save the data to the bitrix itself (a mockup of validation html)
            BX.bind(addButton, "click", function(){ customFieldElement.getElementsByClassName("ui-entity-editor-content-block")[0].getElementsByTagName("div")[0].click() });

            // The field is not yet render so need to set timer loop to wait for it to render
            if(typeof customFieldElement.getElementsByClassName("ui-entity-editor-content-block")[0].getElementsByTagName("div")[0] === "undefined"){
                console.log("Undefined");

                var augTimerObject = {
                    className: augBuildDataCid(customFieldDataCid),

                    runSelect: function(){
                        // Run sub function to load the values into the fields
                        augLoadThreeLayersFieldsValue(customFieldDataCid, mockupTextFieldName, firstSecondOptions, secondThirdOptions);
                    }
                }

                augSetTimerLoop(200, 10, augTimerObject);
            }
            // Call the function if the field is rendered
            else{
                augLoadThreeLayersFieldsValue(customFieldDataCid, mockupTextFieldName, firstSecondOptions, secondThirdOptions);
            }
        }

        // Bind the function back to the cancel button (The function will works in edit, view, edit, view mode and so on)
        BX.bind(editButton, "click", function(){ augBuildThreeLayerAndMockUpFields(customFieldDataCid, threeLayersTextFieldName, mockupTextFieldName, firstSecondOptions, secondThirdOptions) });

    } catch (error) {
        console.log("Error");
        return;
    }
}


/** @function augLoadThreeLayersFieldsValue */
/**
 * Main function to load the field values into the three layers
 * @param {string} customFieldDataCid - the data cid of the custom field (custom field in the bitrix)
 * @param {string} mockupTextFieldName - the text name of the field for the mockup fields
 * @param {array} firstSecondOptions - the array for the first and second options / layers
 * @param {array} secondThirdOptions - the array for the second and third options / layers
 */
function augLoadThreeLayersFieldsValue(customFieldDataCid, mockupTextFieldName, firstSecondOptions, secondThirdOptions){
    try {
        var branchCountry = augGetDefaultCountry();

        var selectFieldId = threeLayersConstant + "-select-" + customFieldDataCid;
        var firstFieldId = selectFieldId + "-0";
        var secondFieldId = selectFieldId + "-1";
        var thirdFieldId = selectFieldId + "-2";

        var firstFieldValue = "";
        var secondFieldValue = "";
        var thirdFieldValue = "";
        
        // Load the values into the first field from the firstSecondOptions array
        for(var i = 0; i < Object.keys(firstSecondOptions).length; i++){
            var key = Object.keys(firstSecondOptions)[i];

            // Load the options and select the default country (has selected attribute)
            if(augcGetCountryShortName[branchCountry] === key){
                document.getElementById(firstFieldId).appendChild(
                    BX.create("option",
                    {
                        attrs:{
                            value: key,
                            selected: "selected"
                        },
                        text: key
                    })
                );
                firstFieldValue = key;
            }
            // Load the options that is not default country (no selected attribute)
            else{
                document.getElementById(firstFieldId).appendChild(
                    BX.create("option",
                    {
                        attrs:{
                            value: key
                        },
                        text: key
                    })
                );
            }
        }

        // Load the values into the second field from the firstSecondOptions array
        var defaultCountry = augcGetCountryShortName[branchCountry];
        for(var i = 0; i < firstSecondOptions[defaultCountry].length; i++){
            var text = firstSecondOptions[defaultCountry][i].split("--");
            // Load default value with selected
            if(text[text.length - 1] === "Others"){
                document.getElementById(secondFieldId).appendChild(
                    BX.create("option",
                    {
                        attrs:{
                            value: text[text.length - 1],
                            selected: "selected"
                        },
                        text: text[text.length - 1]
                    })
                );
                secondFieldValue = text[text.length - 1];
            }
            // Load the rest of the values
            else{
                document.getElementById(secondFieldId).appendChild(
                    BX.create("option",
                    {
                        attrs:{
                            value: text[text.length - 1]
                        },
                        text: text[text.length - 1]
                    })
                );
            }
        }


        // Load the values into the third field from the secondThirdOptions array
        thirdFieldValue = firstFieldValue + "--" + secondFieldValue;
        
        // Create third field
        if(secondThirdOptions[thirdFieldValue]){
            for(var i = 0; i < secondThirdOptions[thirdFieldValue].length; i++){
                // Check if the value is in between 59461 and 60073 OR it has * value
                if((secondThirdOptions[thirdFieldValue][i].VALUE > 59461 && secondThirdOptions[thirdFieldValue][i].VALUE < 60073) || (firstFieldValue.substring(0, 1) === "*")){
                    var text = secondThirdOptions[thirdFieldValue][i].NAME.split("--");
                    document.getElementById(thirdFieldId).appendChild(
                        BX.create("option",
                        {
                            attrs:{
                                value: secondThirdOptions[thirdFieldValue][i].VALUE
                            },
                            text: text[text.length - 1]
                        })
                    );
                }
            }
        }

        // Call layers dependency function
        augThreeLayersDependency_FirstSecondLayer(customFieldDataCid, firstSecondOptions, secondThirdOptions);
        augThreeLayersDependency_SecondThirdLayer(customFieldDataCid, secondThirdOptions);

        // Build mockup fields
        augBuildThreeLayersMockUpField(customFieldDataCid, mockupTextFieldName);

    } catch (error) {
        console.log("Error");
        return;
    }
}


/** @function augThreeLayersAddButton */
/**
 * Main function to add the user select value into the custom field
 * @param {string} customFieldDataCid - the data cid of the custom field (custom field in the bitrix)
 */
function augThreeLayersAddButton(customFieldDataCid){
    try {
        var selectFieldId = threeLayersConstant + "-select-" + customFieldDataCid;
        var thirdFieldId = selectFieldId + "-2";
        var thirdFieldValue = document.getElementById(thirdFieldId).value;
        var duplicates = false;

        var customFieldElement = document.querySelector(augBuildDataCid(customFieldDataCid));
        var customFieldSelectElement = customFieldElement.getElementsByClassName("ui-entity-editor-content-block")[0].getElementsByTagName("div")[0];
        
        // Get the data value
        var customFieldDataValuesString = customFieldSelectElement.getAttribute("data-value");
        var customFieldDataValues = JSON.parse(customFieldDataValuesString);

        // Check for duplicates
        for(var i = 0; i < customFieldDataValues.length; i++){
            // Duplicates found
            if(customFieldDataValues[i].VALUE === thirdFieldValue){
                duplicates = true;
                break;
            }
        }

        // Proceed without duplicates in the existed user selections
        if(duplicates === false){
            // Get the data items
            var customFieldDataItemsString = customFieldSelectElement.getAttribute("data-items");
            var customFieldDataItems = JSON.parse(customFieldDataItemsString);

            // Compare the items and get the NAME and Value
            for(var i = 0; i < customFieldDataItems.length; i++){
                // If the comparison is the same then push the value into the array and generate the option squares
                if(customFieldDataItems[i].VALUE === thirdFieldValue){
                    customFieldDataValues.push(customFieldDataItems[i]);
                    augGenerateThreeLayersOptionSquares(customFieldDataCid, customFieldDataItems[i]);
                    break;
                }
            }

            // Set the new data value attribute back into the custom field
            customFieldSelectElement.setAttribute("data-value", JSON.stringify(customFieldDataValues));
        }
    } catch (error) {
        console.log("Error");
        return;
    }
}


/** @function augBuildThreeLayersMockUpField */
/**
 * Main function to build the mockup field for the three layers field
 * @param {string} customFieldDataCid - the data cid of the custom field (custom field in the bitrix)
 * @param {string} mockupTextFieldName - the text name of the field for the mockup fields
 */
function augBuildThreeLayersMockUpField(customFieldDataCid, mockupTextFieldName){
    try {
        var divContainerId = threeLayersConstant + "-mockup-" + customFieldDataCid;
        var threeLayersContainerId = threeLayersConstant + "-div-" + customFieldDataCid;
        var threeLayersElement = document.getElementById(threeLayersContainerId);
        var threeLayersElementSection = threeLayersElement.parentElement.parentElement;

        if(threeLayersElementSection.className.includes("ui-entity-editor-section-edit")){
            // Create the div container
            BX.insertAfter(
                BX.create("div",
                {
                    attrs:{
                        className: "ui-entity-editor-content-block",
                        id: divContainerId
                    }
                }), threeLayersElement
            );

            // Create the title container
            document.getElementById(divContainerId).appendChild(
                BX.create("div",
                {
                    attrs:{
                        className: "ui-entity-editor-block-title ui-entity-widget-content-block-title-edit"
                    }
                })
            );

            // Create the title label
            document.getElementById(divContainerId).getElementsByClassName("ui-entity-editor-block-title")[0].appendChild(
                BX.create("label",
                {
                    attrs:{
                        className: "ui-entity-editor-block-title-text"
                    },
                    text: mockupTextFieldName
                })
            );

            // Create the child div container
            document.getElementById(divContainerId).appendChild(
                BX.create("div",
                {
                    attrs:{
                        className: "ui-entity-editor-content-block"
                    }
                })
            );

            // Create the mock up input div container
            document.getElementById(divContainerId).getElementsByClassName("ui-entity-editor-content-block")[0].appendChild(
                BX.create("div",
                {
                    attrs:{
                        className: "main-ui-control aug-mockup-input-div"
                    }
                })
            );

            // Create the square container
            document.getElementById(divContainerId).getElementsByClassName("ui-entity-editor-content-block")[0].getElementsByTagName("div")[0].appendChild(
                BX.create("span",
                {
                    attrs:{
                        className: "main-ui-square-container"
                    }
                })
            );
        }

        var customFieldElement = document.querySelector(augBuildDataCid(customFieldDataCid));
        var customFieldDataValuesString = customFieldElement.getElementsByClassName("ui-entity-editor-content-block")[0].getElementsByTagName("div")[0].getAttribute("data-value");
        var customFieldDataValues = JSON.parse(customFieldDataValuesString);

        // Call the generate option squares function
        for(var i = 0; i < customFieldDataValues.length; i++){
            augGenerateThreeLayersOptionSquares(customFieldDataCid, customFieldDataValues[i]);
        }

        // Hide the bitrix custom field
        BX.addClass(customFieldElement, "aug_hide");
    } catch (error) {
        console.log("Error");
        return;
    }
}


/** @function augGenerateThreeLayersOptionSquares */
/**
 * Main function to generate option squares for the mockup field
 * @param {string} customFieldDataCid - the data cid of the custom field (custom field in the bitrix)
 * @param {object} customFieldDataValue - the data value of the custom field (For example: {"NAME": "Singapore", "VALUE": "111" })
 */
function augGenerateThreeLayersOptionSquares(customFieldDataCid, customFieldDataValue){
    try {
        var divContainerId = threeLayersConstant + "-mockup-" + customFieldDataCid;
        var divContainerElement = document.getElementById(divContainerId);
        var squareContainer = divContainerElement.getElementsByClassName("ui-entity-editor-content-block")[0].getElementsByTagName("div")[0].getElementsByClassName("main-ui-square-container")[0];

        // If there is valid item to add then create the square item container
        squareContainer.appendChild(
            BX.create("span",
            {
                attrs:{
                    className: "main-ui-square",
                    "data-item": JSON.stringify(customFieldDataValue)
                }
            })
        );

        // Create the square item with the delete icon
        var squareItems = squareContainer.getElementsByClassName("main-ui-square");
        for(var i = 0; i < squareItems.length; i++){
            if(squareItems[i].getAttribute("data-item") === JSON.stringify(customFieldDataValue)){
                squareItems[i].appendChild(
                    BX.create("span",
                    {
                        attrs:{
                            className: "main-ui-square-item"
                        },
                        text: customFieldDataValue.NAME
                    })
                );
        
                squareItems[i].appendChild(
                    BX.create("span",
                    {
                        attrs:{
                            className: "main-ui-item-icon main-ui-square-delete"
                        }
                    })
                );

                // Bind the delete icon to call the delete option square function
                BX.bind(squareItems[i].getElementsByClassName("main-ui-square-delete")[0], 'click', function(event){ augRemoveThreeLayersOptionSquares(customFieldDataCid, event) });
                
                var customFieldElement = document.querySelector(augBuildDataCid(customFieldDataCid));
                // IMPORTANT: It triggers the built in save function to save the data to the bitrix itself (a mockup of validation html)
                BX.bind(squareItems[i].getElementsByClassName("main-ui-square-delete")[0], 'click', function(){ customFieldElement.getElementsByClassName("ui-entity-editor-content-block")[0].getElementsByTagName("div")[0].click() });
                
                break;
            }
        }
    } catch (error) {
        console.log("Error");
        return;
    }
}


/** @function augRemoveThreeLayersOptionSquares */
/**
 * Main function to remove option squares for the mockup field
 * @param {string} customFieldDataCid - the data cid of the custom field (custom field in the bitrix)
 * @param {object} event - the click event generated by the user to detect which option square is clicked and to be removed
 */
function augRemoveThreeLayersOptionSquares(customFieldDataCid, event){
    try {
        // Get the target value to delete
        var valueToDelete = JSON.parse(event.target.parentElement.getAttribute("data-item"));

        // Get the data value from the custom field
        var customFieldElement = document.querySelector(augBuildDataCid(customFieldDataCid));
        var customFieldSelectElement = customFieldElement.getElementsByClassName("ui-entity-editor-content-block")[0].getElementsByTagName("div")[0];
        var customFieldDataValuesString = customFieldSelectElement.getAttribute("data-value");
        var customFieldDataValues = JSON.parse(customFieldDataValuesString);

        // Remove the deleted element from the array
        for(var i = 0; i < customFieldDataValues.length; i++){
            if(customFieldDataValues[i].VALUE === valueToDelete.VALUE){
                customFieldDataValues.splice(i, 1);
            }
        }

        // Set the latest array back to the custom field
        customFieldSelectElement.setAttribute("data-value", JSON.stringify(customFieldDataValues));

        // Delete the node / option square (UI)
        BX.cleanNode(event.target.parentElement, true);    
    } catch (error) {
        console.log("Error");
        return;
    }
}


/** @function augThreeLayersDependency_FirstSecondLayer */
/**
 * Main function to create dependency function for the first and second layer of the three layers field
 * @param {string} customFieldDataCid - the data cid of the custom field (custom field in the bitrix)
 * @param {array} firstSecondOptions - the array for the first and second options / layers
 * @param {array} secondThirdOptions - the array for the second and third options / layers
 */
function augThreeLayersDependency_FirstSecondLayer(customFieldDataCid, firstSecondOptions, secondThirdOptions){
    try {
        var selectFieldId = threeLayersConstant + "-select-" + customFieldDataCid;
        var firstElementId = selectFieldId + "-0";
        var secondElementId = selectFieldId + "-1";
        var thirdElementId = selectFieldId + "-2";
        
        var firstElement = document.getElementById(firstElementId);
        var secondElement = document.getElementById(secondElementId);
        var thirdElement = document.getElementById(thirdElementId);

        BX.bind(firstElement, "change", function(){
            if(firstSecondOptions[firstElement.value]){
                // Remove all the options value for the dependent field (second element)
                BX.cleanNode(secondElement);

                // Create new options value for the dependent field (second element) based on the master field (first element)
                for(var i = 0; i < firstSecondOptions[firstElement.value].length; i++){
                    /* Array for strings (Example data structure)
                    var firstSecondOptions = {
                        "HK": ["HK--EXPO", "HK--Others"],
                        "AU": ["AU--EXPO", "AU--StudyFest", "AU--Others"],
                        "MY": ["MY--EXPO", "MY--StudyFest", "MY--Others"]
                    }
                    */
                    var text = firstSecondOptions[firstElement.value][i].split("--");
                    secondElement.appendChild(
                        BX.create("option",
                        {
                            attrs:{
                                value: text[text.length - 1]
                            },
                            text: text[text.length - 1]
                        })
                    )
                }
            }

            // Get the concatenate value
            var firstSecondElementName = firstElement.value + "--" + secondElement.value;
            if(secondThirdOptions[firstSecondElementName]){
                // Remove all the options value for the dependent field (third element)
                BX.cleanNode(thirdElement);

                for(var i = 0; i < secondThirdOptions[firstSecondElementName].length; i++){
                    /* Array for dictionary (Example data structure)
                    var optionsArray = {
                        "AU--EXPO": [
                            {NAME: "AU--EXPO--2011", VALUE: "24411"},
                            {NAME: "AU--EXPO--2019", VALUE: "24412"},
                            {NAME: "AU--EXPO--2020", VALUE: "24413"},
                            {NAME: "AU--EXPO--2021", VALUE: "24414"}
                        ],
                        "MY--EXPO": [
                            {NAME: "MY--EXPO--2011", VALUE: "24419"}
                        ],
                    }
                    */
                    // Check if the value is in between 59461 and 60073 OR it has * value
                    if((secondThirdOptions[firstSecondElementName][i].VALUE > 59461 && secondThirdOptions[firstSecondElementName][i].VALUE < 60073) || (firstElement.value.substring(0, 1) === "*")){
                        var text = secondThirdOptions[firstSecondElementName][i].NAME.split("--");
                        thirdElement.appendChild(
                            BX.create("option",
                            {
                                attrs:{
                                    value: secondThirdOptions[firstSecondElementName][i].VALUE
                                },
                                text: text[text.length - 1]
                            })
                        )
                    }
                }
            }
        });
    } catch (error) {
        console.log("Error");
        return;
    }
}


/** @function augThreeLayersDependency_SecondThirdLayer */
/**
 * Main function to create dependency function for the second and third layer of the three layers field
 * @param {string} customFieldDataCid - the data cid of the custom field (custom field in the bitrix)
 * @param {array} secondThirdOptions - the array for the second and third options / layers
 */
function augThreeLayersDependency_SecondThirdLayer(customFieldDataCid, secondThirdOptions){
    try {
        var selectFieldId = threeLayersConstant + "-select-" + customFieldDataCid;
        var firstElementId = selectFieldId + "-0";
        var secondElementId = selectFieldId + "-1";
        var thirdElementId = selectFieldId + "-2";

        var firstElement = document.getElementById(firstElementId);
        var secondElement = document.getElementById(secondElementId);
        var thirdElement = document.getElementById(thirdElementId);

        BX.bind(secondElement, "change", function(){
            var firstSecondElementName = firstElement.value + "--" + secondElement.value;
            if(secondThirdOptions[firstSecondElementName]){
                // Remove all the options value for the dependent field
                BX.cleanNode(thirdElement);

                // Create new options value for the dependent field based on the master field
                for(var i = 0; i < secondThirdOptions[firstSecondElementName].length; i++){
                    /* Array for dictionary (Example data structure)
                    var secondThirdOptions = {
                        "AU--EXPO": [ 
                            {NAME: "AU--EXPO--2011", VALUE: "24411"},
                            {NAME: "AU--EXPO--2019", VALUE: "24412"},
                            {NAME: "AU--EXPO--2020", VALUE: "24413"},
                            {NAME: "AU--EXPO--2021", VALUE: "24414"}
                        ],
                        "MY--EXPO": [ 
                            {NAME: "MY--EXPO--2011", VALUE: "24419"}
                        ],
                    }
                    */

                    // Check if the value is in between 59461 and 60073 OR it has * value
                    if((secondThirdOptions[firstSecondElementName][i].VALUE > 59461 && secondThirdOptions[firstSecondElementName][i].VALUE < 60073) || (firstElement.value.substring(0, 1) === "*")){
                        var text = secondThirdOptions[firstSecondElementName][i].NAME.split("--");
                        thirdElement.appendChild(
                            BX.create("option",
                            {
                                attrs:{
                                    value: secondThirdOptions[firstSecondElementName][i].VALUE
                                },
                                text: text[text.length - 1]
                            })
                        )
                    }
                }
            }
        });    
    } catch (error) {
        console.log("Error");
        return;
    }
}


/** @function augHighlightTextFields */
/**
 * Main function to highlight the text fields and bind to all the edit button for all the sections
 * @param {string} listOfElementIDs - the list of the element id 
 * @param {array} textArray - the array for the second and third options / layers
 */
function augHighlightTextFields(listOfElementIDs, textArray){
    try {
        // Bind the function to all the sections
        var container = document.getElementsByClassName("ui-entity-editor-column-content")[0];
        var section = container.childNodes;
        var editButton = null;

        // Call the sub bind function (augHighlightTextFields_) instead of unbind and bind back (similar to augDependentBranchCountryFields function)
        for(var i = 1; i < section.length; i++){
            editButton = section[i].getElementsByClassName("ui-entity-editor-section-header")[0].getElementsByClassName("ui-entity-editor-header-actions")[0].getElementsByClassName("ui-entity-editor-header-edit-lnk")[0];
            BX.bind(editButton, 'click', (function(i){
                return function(event){
                    augHighlightTextFields_(listOfElementIDs, textArray, i , event)
                };
            })(i));
        }

        // Add the class to the element
        for(var i = 0; i < textArray.length; i++){
            var elementDataCid = listOfElementIDs[textArray[i]];
            var element = document.querySelector(augBuildDataCid(elementDataCid));
            if(typeof element.getElementsByClassName("ui-entity-editor-block-title")[0] !== "undefined"){
                var textLabel = element.getElementsByClassName("ui-entity-editor-block-title")[0].getElementsByTagName("label")[0];
                BX.addClass(textLabel, "aug-text-black");
            }
        }
    } catch (error) {
        console.log("Error");
        return;
    }
}


/** @function augHighlightTextFields_ */
/**
 * Sub function to bind to that single particular section that is "clicked" on the edit text button and add class to highlight the text
 * @param {array} listOfElementIDs - the list of the element id 
 * @param {array} textArray - the list array of text to be highlighted
 * @param {integer} counter - the number of the section where the edit button is clicked
 * @param {object} event - the click event that the user clicked (on the edit button of particular section)
 */
function augHighlightTextFields_(listOfElementIDs, textArray, counter, event){
    try {
        // Bind to the edit button that has changed mode (view mode to edit mode and vice versa)
        var editButton = document.getElementsByClassName("ui-entity-editor-column-content")[0].childNodes[counter].getElementsByClassName("ui-entity-editor-section-header")[0].getElementsByClassName("ui-entity-editor-header-actions")[0].getElementsByClassName("ui-entity-editor-header-edit-lnk")[0];
        BX.bind(editButton, 'click', function(){ augHighlightTextFields_(listOfElementIDs, textArray, counter, event) });

        var textFields = document.getElementsByClassName("ui-entity-editor-column-content")[0].childNodes[counter].getElementsByClassName("ui-entity-editor-section-content")[0].childNodes;

        // Add the class to the element that only exists in the section
        for(var i = 0; i < textArray.length; i++){
            var elementDataCid = listOfElementIDs[textArray[i]];
            var element = document.querySelector(augBuildDataCid(elementDataCid));
            for(var j = 0; j < textFields.length; j++){
                if(textFields[j].getAttribute("data-cid") === elementDataCid){
                    var textLabel = element.getElementsByClassName("ui-entity-editor-block-title")[0].getElementsByTagName("label")[0];
                    BX.addClass(textLabel, "aug-text-black");
                }
            }
        }    
    } catch (error) {
        console.log("Error");
        return;
    }
}


/** @function augSetValuePreviousQualification */
/**
 * Main function to set the value of Current Qualification to Previous Qualification (timer loop to wait for the element)
 * @param {array} listOfElementIDs - the list of the element id 
 * @param {array} fieldsArray - the array with fields value (Example: ["Previous Qualification", "Current / Highest Qualification", "focusout"])
 * @param {integer} delayTimer - the timer for the await (Example: 1000ms = 1 second)
 * @param {integer} loop - the number of loop (Example: 10)
 */
function augSetValuePreviousQualification(listOfElementIDs, fieldsArray, delayTimer, loop){
    try {
        // Bind the edit button (only the first element)
        // Assumption: The whole fields array is in the same section
        var element = document.querySelector(augBuildDataCid(listOfElementIDs[fieldsArray[0][0]]));
        var section = element.parentElement.parentElement;
        var editButton = section.getElementsByClassName("ui-entity-editor-section-header")[0].getElementsByClassName("ui-entity-editor-header-actions")[0].getElementsByClassName("ui-entity-editor-header-edit-lnk")[0];

        BX.bind(editButton, "click", function(){ augSetValuePreviousQualification(listOfElementIDs, fieldsArray, delayTimer, loop) });

        // Container undefined when clicked on "Edit" text so have to wait for rendering
        if(element.getElementsByClassName("ui-entity-editor-content-block")[0].children.length === 0){
            var augTimerObject = {
                className: augBuildDataCid(listOfElementIDs[fieldsArray[0][0]]),
    
                // Run the main function to set the value
                runSelect: function(){
                    augSetValuePreviousQualification_(listOfElementIDs, fieldsArray)
                },
            };

            augSetTimerLoop(delayTimer, loop, augTimerObject);
        }
        else{
            augSetValuePreviousQualification_(listOfElementIDs, fieldsArray);
        }
    } catch (error) {
        console.log("Error");
        return;
    }
}


/** @function augSetValuePreviousQualification_ */
/**
 * Sub function to set the value of Current Qualification to Previous Qualification (Set the value, bind onchange event listener and hide the fields)
 * @param {array} listOfElementIDs - the list of the element id 
 * @param {array} fieldsArray - the array with fields value (Example: ["Previous Qualification", "Current / Highest Qualification", "focusout"])
 */
function augSetValuePreviousQualification_(listOfElementIDs, fieldsArray){
    try {
        var emptyValueCounter = 0;
        // Check all the elements' values
        for(var i = 0; i < fieldsArray.length; i++){
            var element = document.querySelector(augBuildDataCid(listOfElementIDs[fieldsArray[i][0]]));
            var section = element.parentElement.parentElement;
            if(section.className.includes("ui-entity-editor-section-edit")){
                // Text field
                if(fieldsArray[i][2] === "change"){
                    var elementValue = element.getElementsByClassName("ui-entity-editor-content-block")[0].getElementsByTagName("input")[0].value;
                    // Increase the counter if the value is empty
                    if(elementValue === ""){
                        emptyValueCounter++;
                    }
                }
                // List field
                else if(fieldsArray[i][2] === "focusout"){
                    var elementDataValueString = element.getElementsByClassName("ui-entity-editor-content-block")[0].getElementsByTagName("div")[0].getAttribute("data-value");
                    var elementDataValue = JSON.parse(elementDataValueString);
                    // Increase the counter if the value is empty
                    if(elementDataValue.NAME === "not selected"){
                        emptyValueCounter++;
                    }
                }
            }
        }

        // If all the fields are empty then hide all the fields
        if(emptyValueCounter === fieldsArray.length){
            for(var i = 0; i < fieldsArray.length; i++){
                var element = document.querySelector(augBuildDataCid(listOfElementIDs[fieldsArray[i][0]]));
                var section = element.parentElement.parentElement;
                if(section.className.includes("ui-entity-editor-section-edit")){
                    BX.addClass(element, "aug_hide");
                }
            }

            // Bind the fields
            for(var i = 0; i < fieldsArray.length; i++){
                var element = document.querySelector(augBuildDataCid(listOfElementIDs[fieldsArray[i][1]]));
                var section = element.parentElement.parentElement;
                if(section.className.includes("ui-entity-editor-section-edit")){
                    // Text field
                    if(fieldsArray[i][2] === "change"){
                        var elementField = element.getElementsByClassName("ui-entity-editor-content-block")[0].getElementsByTagName("input")[0];
                        BX.bind(elementField, fieldsArray[i][2], (function(i){
                            return function(){
                                // Redeclare the variables due to lost in the stack by the time the event listener is triggered
                                var element = document.querySelector(augBuildDataCid(listOfElementIDs[fieldsArray[i][1]]));
                                var elementField = element.getElementsByClassName("ui-entity-editor-content-block")[0].getElementsByTagName("input")[0];

                                var relatedElement = document.querySelector(augBuildDataCid(listOfElementIDs[fieldsArray[i][0]]));
                                var relatedElementValue = relatedElement.getElementsByClassName("ui-entity-editor-content-block")[0].getElementsByTagName("input")[0];
                                relatedElementValue.setAttribute("value", elementField.value);
                            };
                        })(i));
                    }
                    // List field
                    else if(fieldsArray[i][2] === "focusout"){
                        var elementField = element.getElementsByClassName("ui-entity-editor-content-block")[0].getElementsByTagName("div")[0];
                        BX.bind(elementField, fieldsArray[i][2], (function(i){
                            return function(){
                                // Redeclare the variables due to lost in the stack by the time the event listener is triggered
                                var element = document.querySelector(augBuildDataCid(listOfElementIDs[fieldsArray[i][1]]));
                                var elementField = element.getElementsByClassName("ui-entity-editor-content-block")[0].getElementsByTagName("div")[0];

                                var elementFieldDataValueString = elementField.getAttribute("data-value");
                                var elementFieldDataValue = JSON.parse(elementFieldDataValueString);
                                var newValue = elementFieldDataValue.NAME;

                                var relatedElement = document.querySelector(augBuildDataCid(listOfElementIDs[fieldsArray[i][0]]));
                                var relatedElementDiv= relatedElement.getElementsByClassName("ui-entity-editor-content-block")[0].getElementsByTagName("div")[0];
                                var relatedElementDataItemsString = relatedElementDiv.getAttribute("data-items");
                                var relatedElementDataItems = JSON.parse(relatedElementDataItemsString);

                                for(var j = 0; j < relatedElementDataItems.length; j++){
                                    if(relatedElementDataItems[j].NAME === newValue){
                                        relatedElementDiv.setAttribute("data-value", JSON.stringify(relatedElementDataItems[j]));
                                        break;
                                    }
                                }

                                // IMPORTANT: It triggers the built in save function to save the data to the bitrix itself (a mockup of validation html)
                                relatedElementDiv.click();
                            };
                        })(i));
                    }
                }
            }
        }
    } catch (error) {
        console.log("Error");
        return;
    }
}


// Static constant to be used for the two layers function
const twoLayersConstant = "aug-two-layers";

/** @function augBuildTwoLayersField */
/**
 * Main function to build two layers field and setup the aug timer object
 * @param {string} customFieldDataCid - the data-cid attribute of the main field (Example: "UF_CRM_5FDAADB43EEF0")
 * @param {array} optionsArray - the array values for both the first and second layer fields
 * @param {integer} delayTimer - the timer for the await (Example: 1000ms = 1 second)
 * @param {integer} loop - the number of loop (Example: 10)
 */
async function augBuildTwoLayersField(customFieldDataCid, optionsArray, delayTimer, loop){
    try {
        var customFieldElement = document.querySelector(augBuildDataCid(customFieldDataCid));
        var customFieldSection = customFieldElement.parentElement.parentElement;
        var editButton = customFieldSection.getElementsByClassName("ui-entity-editor-section-header")[0].getElementsByClassName("ui-entity-editor-header-actions")[0].getElementsByTagName("span")[0];

        if(optionsArray === null){
            optionsArray = await augGenerateSecondThirdOptions(customFieldDataCid);
        }

        // Bind the click event to the main function on the "edit" text as callback
        BX.bind(editButton, 'click', function(){ augBuildTwoLayersField(customFieldDataCid, optionsArray, delayTimer, loop) });

        var augTimerObject = {
            className: augBuildDataCid(customFieldDataCid),

            runInput: function(){
                augBuildTwoLayers_Deal(customFieldDataCid, optionsArray);
            }
        };

        augSetTimerLoop(delayTimer, loop, augTimerObject);
    } catch (error) {
        console.log("Error");
        return;
    }
}


/** @function augBuildTwoLayers_Deal */
/**
 * Sub function to add the class to the element and call another sub function
 * @param {string} customFieldDataCid - the data-cid attribute of the main field (Example: "UF_CRM_5FDAADB43EEF0")
 * @param {array} optionsArray - the array values for both the first and second layer fields
 */
function augBuildTwoLayers_Deal(customFieldDataCid, optionsArray){
    try {
        var spanElement = document.querySelector(augBuildDataCid(customFieldDataCid)).getElementsByClassName("ui-entity-editor-content-block")[0].getElementsByTagName("div")[0].parentElement;
        BX.addClass(spanElement, "aug_flex_input_w100");
        BX.addClass(spanElement, "field-item");
        augBuildTwoLayers_(customFieldDataCid, optionsArray, spanElement);
    } catch (error) {
        console.log("Error");
        return;
    }
}


/** @function augTwoLayersOnChange_Bind */
/**
 * Sub function of bind the layers for on change event and set the attribute back to the bitrix
 * @param {string} customFieldDataCid - the data-cid attribute of the main field (Example: "UF_CRM_5FDAADB43EEF0")
 * @param {array} optionsArray - the array values for both the first and second layer fields
 */
function augTwoLayersOnChange_Bind(customFieldDataCid, optionsArray){
    var firstLayerId = twoLayersConstant + "-select-" + customFieldDataCid + "-0";
    var secondLayerId = twoLayersConstant + "-select-" + customFieldDataCid + "-1";

    var firstElement = document.getElementById(firstLayerId);
    var secondElement = document.getElementById(secondLayerId);

    var firstValue = firstElement.value;
    var secondValue = secondElement.value;
    var finalValue;

    // No value for the not selected option (VALUE:"")
    if(firstValue !== "not selected"){
        for(var i = 0; i < optionsArray[firstValue].length; i++){
            if(optionsArray[firstValue][i].VALUE === secondValue){
                finalValue = optionsArray[firstValue][i];
                break;
            }
        }
    }
    // The value: "" is ignored by the browser so we need to hard code for "not selected" with value equals ""
    else{
        finalValue = {"NAME":"not selected", "VALUE":""};
    }

    var customFieldElement = document.querySelector(augBuildDataCid(customFieldDataCid)).getElementsByClassName("ui-entity-editor-content-block")[0].getElementsByTagName("div")[0];
    customFieldElement.setAttribute("data-value", JSON.stringify(finalValue));
    
    // IMPORTANT: It triggers the built in save function to save the data to the bitrix itself (a mockup of validation html)
    customFieldElement.click();
}


/** @function augBuildTwoLayers_ */
/**
 * Sub function to create the layers (select and options) then call sub function (hide the original field, call dependency function, bind onchange event)
 * @param {string} customFieldDataCid - the data-cid attribute of the main field (Example: "UF_CRM_5FDAADB43EEF0")
 * @param {array} optionsArray - the array values for both the first and second layer fields
 * @param {object} element - the element object of the field
 */
function augBuildTwoLayers_(customFieldDataCid, optionsArray, element){
    try {
        var firstElementId = twoLayersConstant + "-select-" + customFieldDataCid + "-0";
        var secondElementId = twoLayersConstant + "-select-" + customFieldDataCid + "-1";

        var customFieldElement = element.getElementsByTagName("div")[0];
        var customFieldDataValuesString = customFieldElement.getAttribute("data-value");
        var customFieldDataValues = JSON.parse(customFieldDataValuesString);

        // The field contains old deleted values then change it to "not selected" and set it back to the field input value
        if(typeof customFieldDataValues.NAME === "undefined"){
            customFieldDataValues = {"NAME": "not selected", "VALUE": "" };
            customFieldElement.setAttribute("data-value", JSON.stringify(customFieldDataValues));
        }

        var text = customFieldDataValues.NAME.split("--");

        // Create first layer
        if(document.getElementById(firstElementId) === null){
            // New select field
            element.appendChild(
                BX.create('select',
                {
                    attrs: {
                        id: firstElementId,
                        className: "aug-two-layers-fields aug-two-layers-fields-w70"
                    }
                })
            );

            // New option fields
            for(var i = 0; i < Object.keys(optionsArray).length; i++){
                var key = Object.keys(optionsArray)[i];
                
                // Set default value
                document.getElementById(firstElementId).appendChild(
                    BX.create('option',
                    {
                        attrs: {
                            value: key
                        },
                        text: key
                    })
                );
            }

            // Change value based on the existing data value
            if(customFieldDataValues.NAME !== "not selected"){
                var optionsElements = document.getElementById(firstElementId).children;
                for(var i = 0; i < optionsElements.length; i++){
                    if(optionsElements[i].getAttribute("value") === text[0]){
                        optionsElements[i].setAttribute("selected", "selected");
                        break;
                    }
                }
            }
        }

        // Create second layer
        if(document.getElementById(secondElementId) === null){
            // New select field
            element.appendChild(
                BX.create('select',
                {
                    attrs: {
                        id: secondElementId,
                        className: "aug-two-layers-fields"
                    }
                })
            );

            // Change value based on the existing data value
            if(customFieldDataValues.NAME !== "not selected"){
                var firstElementValue = document.getElementById(firstElementId).value;
                if(optionsArray[firstElementValue]){
                    for(var i = 0; i < optionsArray[firstElementValue].length; i++){
                        // Selected value
                        if(optionsArray[firstElementValue][i].NAME === customFieldDataValues.NAME){
                            document.getElementById(secondElementId).appendChild(
                                BX.create('option',
                                {
                                    attrs: {
                                        value: optionsArray[firstElementValue][i].VALUE,
                                        selected: "selected"
                                    },
                                    text: text[text.length - 1]
                                })
                            );
                        }
                        // Other values
                        else{
                            var nameText = optionsArray[firstElementValue][i].NAME.split("--");
                            document.getElementById(secondElementId).appendChild(
                                BX.create('option',
                                {
                                    attrs: {
                                        value: optionsArray[firstElementValue][i].VALUE
                                    },
                                    text: nameText[nameText.length - 1]
                                })
                            );
                        }
                    }
                }
            }
            // New option fields (Only create "not selected" default value)
            else{
                document.getElementById(secondElementId).appendChild(
                    BX.create('option',
                    {
                        attrs: {
                            value: ""
                        },
                        text: "not selected"
                    })
                );
            }
        }

        // Hide the field
        BX.addClass(element.getElementsByTagName("div")[0], "aug_hide");

        // Call dependency level function
        augTwoLayersDependency(customFieldDataCid, optionsArray);

        // Set the value based on the first element
        BX.bind(document.getElementById(firstElementId), "change", function(){ augTwoLayersOnChange_Bind(customFieldDataCid, optionsArray) });
        // Set the value based on the second element
        BX.bind(document.getElementById(secondElementId), "change", function(){ augTwoLayersOnChange_Bind(customFieldDataCid, optionsArray) });

    } catch (error) {
        console.log("Error");
        return;
    }
}


/** @function augTwoLayersDependency */
/**
 * Main function for the two layers dependency
 * @param {string} customFieldDataCid - the data-cid attribute of the main field (Example: "UF_CRM_5FDAADB43EEF0")
 * @param {array} optionsArray - the array values for both the first and second layer fields
 */
function augTwoLayersDependency(customFieldDataCid, optionsArray){
    try {
        var selectFieldId = twoLayersConstant + "-select-" + customFieldDataCid;
        var firstElementId = selectFieldId + "-0";
        var secondElementId = selectFieldId + "-1";
        
        var firstElement = document.getElementById(firstElementId);
        var secondElement = document.getElementById(secondElementId);

        // Bind the first element with onchange event listener to detect any changes to the first element will link to the second element
        BX.bind(firstElement, "change", function(){
            if(optionsArray[firstElement.value]){
                BX.cleanNode(secondElement);
                
                for(var i = 0; i < optionsArray[firstElement.value].length; i++){
                    /* Array for strings (Example data structure)
                    var optionsArray = {
                        "AU": [
                            {NAME: "AU--ACRUX", VALUE: "24450"},
                            {NAME: "AU--Amaxgrace Pty Ltd.", VALUE: "24451"},
                            {NAME: "AU--Ashley WANG", VALUE: "24452"},
                            {NAME: "AU--Atime Consulting", VALUE: "24453"}
                        ],
                        "MY--EXPO": [
                            {NAME: "MY--A3", VALUE: "24455"}
                        ],
                    }
                    */

                    var text = optionsArray[firstElement.value][i].NAME.split("--");
                    secondElement.appendChild(
                        BX.create("option",
                        {
                            attrs:{
                                value: optionsArray[firstElement.value][i].VALUE
                            },
                            text: text[text.length - 1]
                        })
                    )
                }
            }
        });
    } catch (error) {
        console.log("Error");
        return;
    }
}

const suggestionConstant = "aug-suggestion";

/** @function augSearchSuggestion */
/**
 * Main function to build the search suggestion feature (use the timer loop to wait for the field to be rendered)
 * @param {string} customFieldDataCid - the data-cid attribute of the main field (Example: "UF_CRM_5FDAADB43EEF0")
 * @param {array} optionsArray - the array values for both the first and second layer fields
 * @param {integer} delayTimer - the timer for the await (Example: 1000ms = 1 second)
 * @param {integer} loop - the number of loop (Example: 10)
 */
function augSearchSuggestion(customFieldDataCid, optionsArray, delayTimer, loop){
    try {
        console.log("Start");
        // Bind the edit button (only the first element)
        // Assumption: The whole fields array is in the same section
        var customFieldElement = document.querySelector(augBuildDataCid(customFieldDataCid));
        if(customFieldElement !== null){
            var section = customFieldElement.parentElement.parentElement;
            var editButton = section.getElementsByClassName("ui-entity-editor-section-header")[0].getElementsByClassName("ui-entity-editor-header-actions")[0].getElementsByClassName("ui-entity-editor-header-edit-lnk")[0];

            BX.bind(editButton, "click", function(){ augSearchSuggestion(customFieldDataCid, optionsArray, delayTimer, loop) });

            // Container undefined when clicked on "Edit" text so have to wait for rendering
            if(typeof customFieldElement.getElementsByClassName("ui-entity-editor-content-block")[0].getElementsByTagName("input")[0] === "undefined"){
                var augTimerObject = {
                    className: augBuildDataCid(customFieldDataCid),
        
                    // Run the main function to set the value
                    runInput: function(){
                        augSearchSuggestion_(customFieldDataCid, optionsArray)
                    },
                };

                augSetTimerLoop(delayTimer, loop, augTimerObject);
            }
            else{
                augSearchSuggestion_(customFieldDataCid, optionsArray)
            }
        }
    } catch (error) {
        console.log("Error");
        return;
    }
}


/** @function augSearchSuggestion_ */
/**
 * Sub function to build the search suggestion feature (creating the fields and bind the event listener)
 * @param {string} customFieldDataCid - the data-cid attribute of the main field (Example: "UF_CRM_5FDAADB43EEF0")
 * @param {array} optionsArray - the array values for both the first and second layer fields
 */
function augSearchSuggestion_(customFieldDataCid, optionsArray){
    try {
        console.log("Enter");
        var customFieldElement = document.querySelector(augBuildDataCid(customFieldDataCid)).getElementsByClassName("ui-entity-editor-content-block")[0];
        var customFieldInput = customFieldElement.getElementsByTagName("input")[0];

        var divContainerId = suggestionConstant + "-div-" + customFieldDataCid;
        var ulContainerId = suggestionConstant + "-ul-" + customFieldDataCid;

        // Create the div container
        customFieldInput.parentElement.appendChild(
            BX.create("div",
            {
                attrs:{
                    id: divContainerId,
                    className: "aug-selection-div popup-window main-ui-select-inner main-ui-mac-scroll main-ui-popup-fast-close-animation aug_hide"
                }
            })
        );

        // Create the ul container
        document.getElementById(divContainerId).appendChild(
            BX.create("ul",
            {
                attrs:{
                    id: ulContainerId,
                    className: "popup-window-content aug-selection-list"
                }
            })
        );

        // Create each item based on the options array
        for(var i = 0; i < optionsArray.length; i++){
            document.getElementById(ulContainerId).appendChild(
                BX.create("li",
                {
                    attrs:{
                        className: "main-ui-select-inner-item"
                    }
                })
            );

            document.getElementById(ulContainerId).getElementsByTagName("li")[i].appendChild(
                BX.create("p",
                {
                    attrs:{
                        className: "name main-ui-select-inner-item"
                    },
                    text: optionsArray[i]
                })
            );
        }

        // Change display style
        customFieldInput.parentElement.style.display = "block"; 

        // Edit the input field
        BX.addClass(customFieldInput, "fuzzy-search");
        customFieldInput.setAttribute("type", "search");

        console.log("Hi");

        // Initialise the search script
        var monkeyList = new List(customFieldInput.parentElement, { 
            valueNames: ['name']
        });

        console.log("Done initialise script");

        var ulElement = document.getElementById(ulContainerId);
        var liElement = ulElement.getElementsByTagName("li");

        // Click on the selection and set value
        // Bind to all the li element to listen for click listener
        for(var i = 0; i < liElement.length; i++){
            // Change the visibility of the dropdown and the value for the input field
            BX.bind(liElement[i], "click", function(event){
                BX.removeClass(document.getElementById(divContainerId), "main-ui-popup-fast-show-animation");
                BX.addClass(document.getElementById(divContainerId), "main-ui-popup-fast-close-animation aug_hide");
            
                customFieldInput.setAttribute("value", event.target.innerText);
                customFieldInput.value = event.target.innerText;
            });
        }

        // Listen to the input field
        BX.bind(customFieldInput, "input", function(event){
            // Show the dropdown if there are values in the input
            if(event.target.value.length > 0){
                BX.addClass(document.getElementById(divContainerId), "main-ui-popup-fast-show-animation");
                BX.removeClass(document.getElementById(divContainerId), "main-ui-popup-fast-close-animation aug_hide");
                ulElement.scrollTop = 0;
                ulElement.scrollIntoView(true);
            }
            // Hide the dropdown if there are no values
            else{
                BX.removeClass(document.getElementById(divContainerId), "main-ui-popup-fast-show-animation");
                BX.addClass(document.getElementById(divContainerId), "main-ui-popup-fast-close-animation aug_hide");
            }
        });

        // Keypress enter event for input and focusout
        BX.bind(customFieldInput, "keypress", function(event){
            if(event.key === "Enter"){
                // If the dropdown option is selected then use the dropdown value
                if(ulElement.getElementsByClassName("selected").length > 0){
                    var selectedElement = ulElement.getElementsByClassName("selected")[0];
                    BX.removeClass(document.getElementById(divContainerId), "main-ui-popup-fast-show-animation");
                    BX.addClass(document.getElementById(divContainerId), "main-ui-popup-fast-close-animation aug_hide");
                    customFieldInput.setAttribute("value", selectedElement.getElementsByTagName("p")[0].innerText);
                    customFieldInput.value = selectedElement.getElementsByTagName("p")[0].innerText;
                }
                // If the dropdown option is not selected then just use the user's input
                else{
                    BX.removeClass(document.getElementById(divContainerId), "main-ui-popup-fast-show-animation");
                    BX.addClass(document.getElementById(divContainerId), "main-ui-popup-fast-close-animation aug_hide");
                    customFieldInput.setAttribute("value", customFieldInput.value);
                }
            }
        });

        // // Note: The keydown event listener (up and down arrow key will move the whole browser)
        // // Up and down key to select (ul)
        // // https://stackoverflow.com/questions/8902787/navigate-through-list-using-arrow-keys-javascript-jq
        // var liSelected;
        // var index = -1;
        // BX.bind(customFieldInput, "keydown", function(event){
        //     var len = ulElement.getElementsByTagName("li").length - 1;
        //     // Down arrow key
        //     if(event.which === 40){
        //         event.stopImmediatePropogation;
        //         event.preventDefault;
        //         // event.preventDefault();
        //         index++;

        //         // When the li is selected
        //         if(liSelected){
        //             BX.removeClass(liSelected, "selected");

        //             nextElement = ulElement.getElementsByTagName("li")[index];

        //             if(typeof nextElement !== undefined && index <= len){
        //                 liSelected = nextElement;
        //             }
        //             else{
        //                 index = 0;
        //                 liSelected = ulElement.getElementsByTagName("li")[0];
        //             }
        //             BX.addClass(liSelected, "selected");
        //         }
        //         else{
        //             index = 0;
        //             liSelected = ulElement.getElementsByTagName("li")[0];
        //             BX.addClass(liSelected, "selected");
        //         }
        //         liSelected.scrollIntoView(false);
        //     }

        //     // Up arrow key
        //     else if(event.which === 38){
        //         event.stopImmediatePropagation;
        //         event.preventDefault;
        //         // event.preventDefault();
        //         if(liSelected){
        //             BX.removeClass(liSelected, "selected");
        //             index--;

        //             nextElement = ulElement.getElementsByTagName("li")[index];

        //             if(typeof nextElement !== undefined && index >= 0){
        //                 liSelected = nextElement;
        //             }
        //             else{
        //                 index = len;
        //                 liSelected = ulElement.getElementsByTagName("li")[len];
        //             }
        //             BX.addClass(liSelected, "selected");
        //         }
        //         else{
        //             index = 0;
        //             liSelected = ulElement.getElementsByTagName("li")[len];
        //             BX.addClass(liSelected, "selected");
        //         }
        //         liSelected.scrollIntoView(false);
        //     }
        // });

        // Focus out event listener
        BX.bind(customFieldElement, "focusout", function(){
            setTimeout(function(){
                BX.removeClass(document.getElementById(divContainerId), "main-ui-popup-fast-show-animation");
                BX.addClass(document.getElementById(divContainerId), "main-ui-popup-fast-close-animation aug_hide");

                // Get value
                customFieldInput.setAttribute("value", customFieldInput.value);
            }, 100);
        })
    } catch (error) {
        console.log("Error");
        return;
    }
}


/** @function augBuildRadioButtonWithTextBox */
/**
 * Main function to build the radio button with textbox mockup feature (use the timer loop to wait for the field to be rendered)
 * @param {string} customFieldDataCid - the data-cid attribute of the main field (Example: "UF_CRM_5FDAADB43EEF0")
 * @param {array} optionsArray - the array values for both the first and second layer fields
 * @param {integer} delayTimer - the timer for the await (Example: 1000ms = 1 second)
 * @param {integer} loop - the number of loop (Example: 10)
 */
function augBuildRadioButtonWithTextBox(customFieldDataCid, optionsArray, delayTimer, loop){
    try {
        // Bind the edit button (only the first element)
        // Assumption: The whole fields array is in the same section
        var customFieldElement = document.querySelector(augBuildDataCid(customFieldDataCid));
        if(customFieldElement !== null){
            var section = customFieldElement.parentElement.parentElement;
            var editButton = section.getElementsByClassName("ui-entity-editor-section-header")[0].getElementsByClassName("ui-entity-editor-header-actions")[0].getElementsByClassName("ui-entity-editor-header-edit-lnk")[0];

            BX.bind(editButton, "click", function(){ augBuildRadioButtonWithTextBox(customFieldDataCid, optionsArray, delayTimer, loop) });

            // Container undefined when clicked on "Edit" text so have to wait for rendering
            if(typeof customFieldElement.getElementsByClassName("ui-entity-editor-content-block")[0].getElementsByTagName("input")[0] === "undefined"){
                var augTimerObject = {
                    className: augBuildDataCid(customFieldDataCid),
        
                    // Run the main function to set the value
                    runInput: function(){
                        augBuildRadioButtonWithTextBox_(customFieldDataCid, optionsArray)
                    },
                };

                augSetTimerLoop(delayTimer, loop, augTimerObject);
            }
            else{
                augBuildRadioButtonWithTextBox_(customFieldDataCid, optionsArray)
            }
        }
    } catch (error) {
        console.log("Error");
        return;
    }
}


/** @function augBuildRadioButtonWithTextBox_ */
/**
 * Sub function to build the radio button with textbox mockup feature (create the element and set the value)
 * @param {string} customFieldDataCid - the data-cid attribute of the main field (Example: "UF_CRM_5FDAADB43EEF0")
 * @param {array} optionsArray - the array values for both the first and second layer fields
 */
function augBuildRadioButtonWithTextBox_(customFieldDataCid, optionsArray){
    try {
        var customFieldElement = document.querySelector(augBuildDataCid(customFieldDataCid));
        var customFieldInput = customFieldElement.getElementsByClassName("ui-entity-editor-content-block")[0].getElementsByTagName("input")[0];
        var customFieldInputValue = customFieldInput.value;

        var customFieldLabel = customFieldElement.getElementsByClassName("ui-entity-editor-block-title")[0].getElementsByTagName("label")[0].innerText;
        var checked = "";
        var othersFieldSelected = true;

        // Check whether radio button exists
        if(customFieldInput.parentElement.querySelector('input[id="' + optionsArray[0] + '"]') === null){
            // Create radio button
            for(var i = 0; i < optionsArray.length; i++){
                checked = "";
                // To check whether the radio button is selected (Default value or existing stored value)
                if((i === 0 && customFieldInputValue === "") || (optionsArray[i] === customFieldInputValue)){
                    othersFieldSelected = false;
                    checked = "checked";
                }

                // Create input
                customFieldInput.parentElement.appendChild(
                    BX.create("input",
                    {
                        attrs:{
                            type: "radio",
                            id: optionsArray[i],
                            name: customFieldLabel,
                            value: optionsArray[i],
                            checked: checked,
                            className: "aug-input-field-radio-button"
                        },
                        events:{
                            click: function(){ augBuildRadioButtonWithTextBox_Bind(customFieldDataCid, customFieldInput.parentElement, this) }
                        }
                    })
                );
                

                // Create label
                customFieldInput.parentElement.appendChild(
                    BX.create("label",
                    {
                        attrs:{
                            for: optionsArray[i]
                        },
                        text: optionsArray[i]
                    })
                );

                // Create others text field (Only once when the value is "Others")
                if(optionsArray[i] === "Others"){
                    customFieldInput.parentElement.appendChild(
                        BX.create("input",
                        {
                            attrs:{
                                type: "text",
                                className: "fields aug-input-field-extra-text",
                                size: 10,
                                tabindex: 0,
                                value: "",
                                disabled: "disabled"
                            },
                            events:{
                                input: function(){
                                    this.setAttribute("value", this.value);
                                    customFieldInput.setAttribute("value", this.value);
                                }
                            }
                        })
                    );
                }
            }

            // Other option values (validate the last array value is "Others")
            if(othersFieldSelected === true && optionsArray[optionsArray.length - 1] === "Others"){
                var othersInputField = customFieldInput.parentElement.querySelector('input[id="Others"]');
                othersInputField.setAttribute("checked", "checked");
                othersInputField.removeAttribute("disabled");
                var inputTextField = customFieldInput.parentElement.getElementsByClassName("aug-input-field-extra-text")[0];
                inputTextField.setAttribute("value", customFieldInput.value);
            }

            // Add aug_hide to hide the original input field
            BX.addClass(customFieldInput, "aug_hide");
        }
    } catch (error) {
        console.log("Error");
        return;
    }
}


/** @function augBuildRadioButtonWithTextBox_Bind */
/**
 * Sub function to bind the radio button to save the value back into the bitrix field
 * @param {string} customFieldDataCid - the data-cid attribute of the main field (Example: "UF_CRM_5FDAADB43EEF0")
 * @param {object} parentElement - the parent element of the field
 * @param {object} element - the element object of the field
 */
function augBuildRadioButtonWithTextBox_Bind(customFieldDataCid, parentElement, element){
    try {
        var selectedValue = element.getAttribute("id");
        var textField = parentElement.getElementsByClassName("aug-input-field-extra-text")[0];
        if(selectedValue === "Others"){
            textField.removeAttribute("disabled");
        }
        else{
            textField.value = "";
            textField.setAttribute("value", "");
            textField.setAttribute("disabled", "disabled");
            var inputField = parentElement.querySelector('input[name="' + customFieldDataCid + '"]');
            inputField.setAttribute("value", selectedValue);
        }
    } catch (error) {
        console.log("Error");
        return;
    }
}


/** @function augReloadPage */
/**
 * Main function to reload the whole page after saving to reload the script back in
 * @param {integer} numberOfSeconds - the number of seconds for timeout
 */
function augReloadPage(numberOfSeconds){
    try {
        console.log("Enter");
        var section = document.getElementsByClassName("ui-entity-section ui-entity-section-control")[0];
        if(typeof section === "undefined"){
            setTimeout(function(){
                augReloadPage_(numberOfSeconds);
            }, 1000);
        }
        else{
            augReloadPage_(numberOfSeconds);
        }
        console.log("End");
    } catch (error) {
        console.log("Error");
        return;
    }
}


function augReloadPage_(numberOfSeconds){
    try {
        console.log(document.getElementsByClassName("ui-entity-section ui-entity-section-control")[0]);
        var saveButton = document.getElementsByClassName("ui-entity-section ui-entity-section-control")[0].getElementsByClassName("ui-btn ui-btn-success")[0];
        console.log(saveButton);
        BX.bind(saveButton, "click", function(){
            console.log("Start binding");
            setTimeout(function(){
                console.log("Start timeout");
                window.onbeforeunload = function(){ alert("Saving... Please wait") };
                window.location.href = window.location.href;
                window.onload = function(){ alert("Done saving") };
            }, numberOfSeconds);
        });
    } catch (error) {
        console.log("Error");
        return;
    }
}
// ----------------------------------------- End Support function -------------------------------------------- //
