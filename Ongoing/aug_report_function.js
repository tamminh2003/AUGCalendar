/**
 * Function to crawl through main filter container and processes all date filter
 * @function augBuildAllDateField_Report
 * @param {Element} filterContainer - main filter container of report page, #report-filter-chfilter 
 */
function augBuildAllDateField_Report(filterContainer) {
	// ? VARIABLES
	// uniqueFields contains names of filter of a field
	// e.g. There usually are two filter fields for a data field Application Date; "more than or equal to" and "less than or equal to"
	let uniqueFields = {};


	// Get all date filter in filter container
	let filterFields = filterContainer.querySelectorAll(".filter-field.chfilter-field-datetime");
	if (!filterFields) {
		console.warn("No date filter field in this report.");
		return;
	}

	// ? LOCAL FUNCTION

	// ? MAIN BODY
	// Get iterate through filterFields to get uniqueFields
	filterFields.forEach((filterField) => {
		let label = filterField.querySelector("label").innerText;
		let uniqueFieldName = label.substring(0, label.indexOf("\"") - 1); // <== Get the field name
		if (!Object.keys(uniqueFields).includes(uniqueFieldName)) {
			uniqueFields[uniqueFieldName] = {};
			uniqueFields[uniqueFieldName].fieldName = uniqueFieldName;
			uniqueFields[uniqueFieldName].fromTo = "init";
			if (label.includes("more than or equal to") || label.includes("less than or equal to")) {
				uniqueFields[uniqueFieldName].fromTo = "pending";
				uniqueFields[uniqueFieldName][label.includes("more") ? "fromDiv" : "toDiv"] = filterField;
			}
		} else if (uniqueFields[uniqueFieldName].fromTo == "pending" && (label.includes("more than or equal to") || label.includes("less than or equal to"))) {
			uniqueFields[uniqueFieldName].fromTo = "ready";
			uniqueFields[uniqueFieldName][label.includes("more") ? "fromDiv" : "toDiv"] = filterField;
		}
	});

	// console.log(uniqueFields);

	// Iterate through uniqueFields and processing date filter fields.
	for (let [fieldName, fieldObject] of Object.entries(uniqueFields)) {
		if (fieldObject.fromTo !== "ready") {
			console.warn(`Found only one for field ${fieldName}, ignoring the field.`);
			continue;
		} else if (fieldObject.fieldName == "Reporting Intake" || fieldObject.fieldName == "Application Intake") {
			console.warn(`Found ${fieldObject.fieldName}, processed by previous program version, ignoring the field.`);
			continue;
		}

		augBuildDateFromToField_Report(filterContainer, fieldObject);

	}
}

/**
 * Function to combine "more than and equal" and "less than and equal" into one
 * @function augBuildDateFromToField_Report
 * @param {Element} filterContainer - main filter container
 * @param {Object} fieldObject - field Object containing ref to the 2 from / to div 
 */
function augBuildDateFromToField_Report(filterContainer, fieldObject) {
	// ? VARIABLES
	let fieldName = fieldObject.fieldName;
	let toDiv = fieldObject.toDiv;
	let fromDiv = fieldObject.fromDiv;
	let radioName = fieldName.toLowerCase().replace(' ', '_');

	// ? MAIN BODY

	// Sample date filter field used to clone new date filter field
	let sampleDateFilter = document.querySelector(".filter-field.chfilter-field-datetime");

	// Clone inputs from these two filters
	let toInput = toDiv.querySelector("input");
	let toA = toDiv.querySelector("a");
	let fromInput = fromDiv.querySelector("input");
	let fromA = fromDiv.querySelector("a");

	// Hide 2 Date filter containers.
	toDiv.style.display = "none";
	fromDiv.style.display = "none";

	// Adding new Date filter
	let newDateFilter = sampleDateFilter.cloneNode(true);

	// Adding new Date Filter before the first filter
	toDiv.insertAdjacentElement("afterend", newDateFilter)
	newDateFilter.querySelector("label").innerText = fieldName;

	// Clear content of new Date Filter
	newDateFilter.querySelector("input").remove();
	newDateFilter.querySelector("a").remove();

	// Adding options radio buttons
	let optionDiv = newDateFilter.appendChild(BX.create("div", { "attrs": { "class": `aug-radio-container` }, "style": { "display": "flex" } }));
	optionDiv.style.justifyContent = "space-evenly";
	optionDiv.style.marginTop = "12px";
	optionDiv.style.marginBottom = "12px";

	let allRadio = augBuildRadioButton(optionDiv, "All", false, `aug-radio-btn-all-${radioName}`, radioName);
	let rangeRadio = augBuildRadioButton(optionDiv, "Range", true, `aug-radio-btn-range-${radioName}`, radioName);

	// Adding From-To div Container
	let toFromDiv = BX.create("div", { "attrs": { "class": "aug-date-from-to-input" }, "style": { "display": "flex", "justifyContent": "space-between" } });
	newDateFilter.appendChild(toFromDiv);
	augBuildDateField(toFromDiv, fromInput, fromA);
	augBuildDateField(toFromDiv, toInput, toA);

	// Adding Handler For Radio Buttons
	allRadio.addEventListener("change", augAllRadioHandler.bind(toFromDiv));
	rangeRadio.addEventListener("change", augRangeRadioHandler.bind(toFromDiv));

	// ? LOCAL FUNCTIONS

	/**
	 * Module function to reduce code repetition.
	 * Build Div for date input, keep in mind that this function will move the existing date filter 
	 * created by Bitrix template into a single div.
	 * @function augBuildDateField
	 * @param {Element} container - outer container that the div will be added to.
	 * @param {Boolean} inputElement - the field that we are moving from original filter
	 * @param aElement - the calendar button we are moving from original filter
	 */
	function augBuildDateField(container, inputElement, aElement) {
		let newDiv = BX.create("div", { "attrs": { "class": "aug-date-input" }, "style": { "display": "inline-block" } });
		container.appendChild(newDiv);
		newDiv.appendChild(BX.create("label", { "attrs": { "class": "aug-date-input-label" }, "text": "To" }));
		newDiv.appendChild(inputElement);
		newDiv.appendChild(aElement);
		inputElement.style.marginLeft = "5px";
		aElement.addEventListener("click", e => e.preventDefault()); // <== Prevent page refreshes when click on calendar img border
	}

	/**
	 * Module handler for all radio button - hide To-From Date Field
	 * @function augAllRadioHandler
	 * @param {Event} e - event passed in by EventListener
	 */
	function augAllRadioHandler(e) {
		if (e.target.checked) {
			BX.addClass(this, "aug_hide");
			this.querySelectorAll("input").forEach(item => item.value = "");
		}
	}

	/**
	 * Module handler for all radio button - hide To-From Date Field
	 * @function augRangeRadioHandler
	 * @param {Event} e - event passed in by EventListener
	 */
	function augRangeRadioHandler(e) {
		if (e.target.checked) {
			BX.removeClass(this, "aug_hide");
			this.style.visibility = "visible";
		}
	}
}

	/**
 * Local function
 * Build Radio button
 * @function augBuildRadioButton
 * @param {Element} container - Outer container the button will be added to
 * @param {String} text - Label of the radio button
 * @param {Boolean} checked - Check by default?
 * @param {String} id - Id of radio button
 * @param {String} name - name of radio button section
 * @returns radioButton
 */
	function augBuildRadioButton(container, text, checked, id, name) {
		let radioDiv = container.appendChild(BX.create("div"));
		let radioButton = radioDiv.appendChild(BX.create("input", { "attrs": { "type": "radio", "id": id, "name": name, "class": "aug-report-intake-options" } }));
		if (checked) {
			radioButton.checked = true;
		}
		radioDiv.appendChild(BX.create("label", { "attrs": { "for": id }, "text": text }));

		return radioButton;
	}
