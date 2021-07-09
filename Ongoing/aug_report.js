/**
 * aug_report.js version 0.1.0709
 */

// Using bitrix ready function
// From js -> crm -> report -> filterselectors -> init.js
; (function () {
	function documentReadyHandler() {
		if (document.readyState !== "complete") return;

		BX.ready(function () {
			/** @var _selectFieldCounter - internal private counter of the module*/
			var _selectFieldCounter = 0;

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

			function augFromToText(className, counter) {
				var text = "";
				if (counter === 1) {
					text = "From";
				}
				else if (counter === 2) {
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


			setTimeout(function () {
				var className = "chfilter-field-datetime";
				var dateTime = document.getElementsByClassName(className);
				var counter = 0;
				var position = "";
				for (var i = 0; i < dateTime.length; i++) {
					var labelText = dateTime[i].getElementsByTagName("label")[0].innerText;
					if ((labelText.includes("Application Intake") || labelText.includes("Reporting Intake"))
						&& (labelText.includes("is less than or equal to") || labelText.includes("is more than or equal to"))) {
						counter += 1;
						var array = augFromToText(className, counter);
						className = array[0] + "-" + i;
						counter = array[1];
						if (labelText.includes("Application Intake")) {
							augBuildDualFields_Report(className, applicationMonths, yearValue, applicationId);

							// Apply to second fields after both fields are rendered
							if (counter % 2 === 0) {
								augIntakeRadioButton(dateTime[i - 1], null);
							}
						}
						else if (labelText.includes("Reporting Intake")) {
							augBuildDualFields_Report(className, reportingMonths, yearValue, reportingId);

							// Apply to second fields after both fields are rendered
							if (counter % 2 === 0) {
								augIntakeRadioButton(dateTime[i - 1], null);
							}
						}
					}
					else if ((labelText.includes("Application Intake") || labelText.includes("Reporting Intake"))
						&& (labelText.includes("is equal to"))) {
						className = className + "-In-" + i;
						if (labelText.includes("Application Intake")) {
							augBuildOneIntakeField_Report(className, applicationMonths, yearValue, applicationId);
						}
						else if (labelText.includes("Reporting Intake")) {
							augBuildOneIntakeField_Report(className, reportingMonths, yearValue, reportingId);
						}
					}
					// else if(labelText.includes("Date")){
					//     className = className + "-" + i;
					//     if(labelText.includes("is less than or equal to")){
					//         position = "left";
					//         augBuildCalendarInputFields(className, position);
					//     }

					// }
					className = "chfilter-field-datetime";
				}

				// ================================
				try {

					// Main Functions to Modify Report Form
					// Modifying Student Application Status List


					/**
					 * Function to crawl through main filter container and processes all date filter
					 * @function augBuildAllDateField_Report
					 * @param {Element} filterContainer - main filter container of report page, #report-filter-chfilter 
					 */
					(function augBuildAllDateField_Report(filterContainer) {
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
					})();

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


					// /**
					//  * Function to modify 2 Application Date filters: combine "more than and equal" and "less than and equal" into one.
					//  * @function augBuildApplicationDateDualField_Report
					//  */
					// (function augBuildApplicationDateDualField_Report() {
					// 	let fromDateField, toDateField;

					// 	let filterContainer = document.querySelector("#report-filter-chfilter");
					// 	let sampleDateFilter = document.querySelector(".filter-field.chfilter-field-datetime");

					// 	// Select 2 Applicaiton Date filters containers.
					// 	document.querySelectorAll('.chfilter-field-datetime').forEach((element) => {
					// 		let labelText = element.querySelector('label').innerText;
					// 		if (!labelText || !labelText.includes("Application Date")) return;
					// 		if (labelText.includes("more than or equal")) {
					// 			fromDateField = element;
					// 		} else if (labelText.includes("less than or equal")) {
					// 			toDateField = element;
					// 		}
					// 	});

					// 	// Clone inputs from these two filters
					// 	let toInput = toDateField.querySelector("input");
					// 	let toA = toDateField.querySelector("a");
					// 	let fromInput = fromDateField.querySelector("input");
					// 	let fromA = fromDateField.querySelector("a");

					// 	// Hide 2 Application Date filter containers.
					// 	toDateField.style.display = "none";
					// 	fromDateField.style.display = "none";

					// 	// Adding new Date filter
					// 	let newDateFilter = sampleDateFilter.cloneNode(true);

					// 	// Adding new Date Filter before the first filter
					// 	filterContainer.insertBefore(newDateFilter, filterContainer.querySelectorAll(".filter-field")[0]);
					// 	newDateFilter.querySelector("label").innerText = "Application Date"

					// 	// Clear content of new Date Filter
					// 	newDateFilter.querySelector("input").remove();
					// 	newDateFilter.querySelector("a").remove();

					// 	// Adding options radio buttons
					// 	let optionDiv = newDateFilter.appendChild(BX.create("div", { "attrs": { "class": "aug-application-date-radio-container" }, "style": { "display": "flex" } }));
					// 	optionDiv.style.justifyContent = "space-evenly";
					// 	optionDiv.style.marginTop = "12px";
					// 	optionDiv.style.marginBottom = "12px";

					// 	let allRadio = augBuildRadioButton(optionDiv, "All", false, 'aug-radio-btn-all-applcation_date', 'application_date');
					// 	let rangeRadio = augBuildRadioButton(optionDiv, "Range", true, 'aug-radio-btn-range-applcation_date', 'application_date');

					// 	// Adding From-To div Container
					// 	let toFromDiv = BX.create("div", { "attrs": { "class": "aug-date-from-to-input" }, "style": { "display": "flex", "justifyContent": "space-between" } });
					// 	newDateFilter.appendChild(toFromDiv);
					// 	augBuildDateField(toFromDiv, fromInput, fromA);
					// 	augBuildDateField(toFromDiv, toInput, toA);

					// 	// Adding Handler For Radio Buttons
					// 	allRadio.addEventListener("change", augAllRadioHandler.bind(toFromDiv));
					// 	rangeRadio.addEventListener("change", augRangeRadioHandler.bind(toFromDiv));

					// 	/**
					// 	 * Module function to reduce code repetition.
					// 	 * Build Div for date input, keep in mind that this function will move the existing date filter 
					// 	 * created by Bitrix template into a single div.
					// 	 * @function augBuildDateField
					// 	 * @param {Element} container - outer container that the div will be added to.
					// 	 * @param {Boolean} inputElement - the field that we are moving from original filter
					// 	 * @param aElement - the calendar button we are moving from original filter
					// 	 */
					// 	function augBuildDateField(container, inputElement, aElement) {
					// 		let newDiv = BX.create("div", { "attrs": { "class": "aug-date-input" }, "style": { "display": "inline-block" } });
					// 		container.appendChild(newDiv);
					// 		newDiv.appendChild(BX.create("label", { "attrs": { "class": "aug-date-input-label" }, "text": "To" }));
					// 		newDiv.appendChild(inputElement);
					// 		newDiv.appendChild(aElement);
					// 		inputElement.style.marginLeft = "5px";
					// 		aElement.addEventListener("click", e => e.preventDefault()); // <== Prevent page refreshes when click on calendar img border
					// 	}

					// 	/**
					// 	 * Module handler for all radio button - hide To-From Date Field
					// 	 * @function augAllRadioHandler
					// 	 * @param {Event} e - event passed in by EventListener
					// 	 */
					// 	function augAllRadioHandler(e) {
					// 		if (e.target.checked) {
					// 			BX.addClass(this, "aug_hide");
					// 			this.querySelectorAll("input").forEach(item => item.value = "");
					// 		}
					// 	}

					// 	/**
					// 	 * Module handler for all radio button - hide To-From Date Field
					// 	 * @function augRangeRadioHandler
					// 	 * @param {Event} e - event passed in by EventListener
					// 	 */
					// 	function augRangeRadioHandler(e) {
					// 		if (e.target.checked) {
					// 			BX.removeClass(this, "aug_hide");
					// 			this.style.visibility = "visible";
					// 		}
					// 	}
					// })();

					/**
					 * Function to modify Closed filter "is equal to".
					 * @function augBuildClosedField_Report
					 */
					(function augBuildClosedField_Report() {
						augBuildYesNoField_Report('Closed "is equal to"', "Show Closed Application", "closed_field");
					})();

					/** 
					 * Modify and rebuild the Articulation Field
					 * @function augBuildArticulationField_Report()
					 */
					(function augBuildArticulationField_Report() {
						augBuildYesNoField_Report('Lead: Articulation "is equal to"', "Show Articulation", "articulation_field")
					})();

					/**
					 * Modify and rebuild the Branch Country and Branch Select Fields
					 * @function augBuildBranchSelectField_Report
					 */
					(function augBuildBranchSelectField_Report() {
						let augBranchSelect;

						if (userDepartments && userCrmRoleName) {
							augBranchSelect = augBuildBranchSelectObject(userCrmRoleName, userDepartments);
						}

						let selectBranchCountry, selectBranchOffice;

						let templateSelectField = document.querySelector("#report-chfilter-examples > div.filter-field.filter-field-crm.chfilter-field-enum");
						let filterContainer = document.querySelector("#report-filter-chfilter");

						// Select the Branch Country and Branch Office Select Fields
						document.querySelectorAll(".filter-field.filter-field-crm.chfilter-field-enum").forEach((item) => {
							item.querySelector("label").innerHTML == 'Lead: Branch Country "is equal to"' && (selectBranchCountry = item);
							item.querySelector("label").innerHTML == 'Lead: Branch "is equal to"' && (selectBranchOffice = item);
						});

						// Hide these two fields
						selectBranchCountry.style.display = "none";
						selectBranchOffice.style.display = "none";

						// Add new select field
						let newSelectFieldContainer = filterContainer.appendChild(templateSelectField.cloneNode(true));
						newSelectFieldContainer.querySelector("label").innerHTML = "Branch Office";
						BX.addClass(newSelectFieldContainer, "aug-select-field");

						let newSelectDiv = newSelectFieldContainer.appendChild(BX.create("span", { "attrs": { "class": "" }, "style": { "position": "relative" } }));

						let textField = newSelectDiv.appendChild(BX.create("input", { "attrs": { "type": "text" } }));

						// Build dropdown
						let dropdownContainer = BX.create("div", { "attrs": { "class": "aug-dropdown-container" }, "style": { "visibility": "hidden", "position": "absolute", "height": "20em", "overflow": "hidden scroll", "backgroundColor": "white" } });

						// Build country select's options, each has its own handler
						Object.keys(augBranchSelect).forEach(country => {
							let countryContainer = dropdownContainer.appendChild(BX.create("div", { "attrs": { "class": "country-container" } }));
							let countrySelect = countryContainer.appendChild(BX.create("a", { "attrs": { "class": "countrySelect", "href": "#" }, "style": { "display": "block" }, "text": country }));

							/**
							 * Local function handling when the select field is activated
							 * @function countrySelectHandler
							 * @param e - Event object passed by EventListener
							 */
							let countrySelectHandler = function (e) {
								this.value = country;
								augSetBranchCountry(country);
								dropdownContainer.style.visibility = "hidden";
								e.preventDefault();
							}

							countrySelect.addEventListener("click", countrySelectHandler.bind(textField));

							// Build office branch select's options, each has its own handler
							let officeContainer = countryContainer.appendChild(BX.create("div", { "attrs": { "class": "office-container" } }));

							augBranchSelect[country].forEach(office => {
								let officeSelect = officeContainer.appendChild(BX.create("a", { "attrs": { "class": "officeSelect", "href": "#" }, "style": { "display": "block" }, "text": office }));

								/**
								 * Local function handling when office option is activated
								 * @function officeSelectHandler
								 * @param e - Event object passed by EventListener
								 */
								let officeSelectHandler = function (e) {
									this.value = office;
									augSetOfficeBranch(office);
									dropdownContainer.style.visibility = "hidden";
									e.preventDefault();
								}

								officeSelect.addEventListener("click", officeSelectHandler.bind(textField));
							});
						});
						newSelectDiv.appendChild(dropdownContainer); //<== Add dropdown menu to new select span

						// Auxilary Features

						// Show/Hide Drop down
						let dropdownContainerMouse;

						textField.addEventListener("focus", (e) => {
							dropdownContainer.style.visibility = "visible";
						});

						textField.addEventListener("blur", (e) => {
							if (!dropdownContainerMouse) {
								dropdownContainer.style.visibility = "hidden";
							}
							if (textField.value == "") {
								augSetBranchCountry("Ignore");
								augSetOfficeBranch("Ignore");
							}
						});

						dropdownContainer.addEventListener("mouseenter", (e) => {
							dropdownContainerMouse = true;
						});

						dropdownContainer.addEventListener("mouseleave", (e) => {
							dropdownContainerMouse = false;
						});

						/**
						 * Local function for handling textField event, the function provide search features for select field.
						 * @function textFieldHandler
						 * @param {Event} e - Event object passed by EventListener
						 */
						function textFieldHandler(e) {
							let searchText = e.target.value.toUpperCase();
							let countryContainerArray = this.querySelectorAll(".country-container");
							let officeContainerArray = this.querySelectorAll(".office-container");

							if (!searchText) {
								this.querySelectorAll("a").forEach(option => option.style.display = "block"); // <== Set all the option visible if text field empty.
								countryContainerArray.forEach(countryContainer => countryContainer.style.display = "block");
								return;
							}

							this.querySelectorAll("a").forEach(option => option.style.display = "none");
							countryContainerArray.forEach(countryContainer => countryContainer.style.display = "none");

							let matchingCountry = Object.keys(augBranchSelect)
								.map(country => country.toUpperCase())
								.reduce((accu, curr) => accu || (curr.includes(searchText)), false);

							if (matchingCountry) { // <== Matching country
								countryContainerArray.forEach(countryContainer => {
									if (countryContainer.querySelector("a").innerText.toUpperCase().includes(searchText)) {
										countryContainer.style.display = "block";
										countryContainer.querySelectorAll("a").forEach(option => option.style.display = "block");
										return;
									}
								});
								return;
							}

							officeContainerArray.forEach(officeContainer => {
								let optionArray = officeContainer.querySelectorAll("a");
								optionArray.forEach(option => {
									if (option.innerText.toUpperCase().includes(searchText)) {
										option.style.display = "block";
										officeContainer.style.display = "block";
										officeContainer.parentElement.style.display = "block";
										officeContainer.parentElement.querySelector("a").style.display = "block";
									}
								});
							})
						}
						textField.addEventListener("keyup", textFieldHandler.bind(dropdownContainer));


						/**
						 * Local function that handling setting value of the original Country filter field
						 * @function augSetBranchCountry
						 * @param {Srting} country - Name of selected country
						 */
						function augSetBranchCountry(country) {
							const selectTable = {
								"Ignore": "",
								"Australia": 110,
								"China": 111,
								"Hong Kong": 112,
								"Indonesia": 113,
								"Malaysia": 114,
								"Philippines": 115,
								"Singapore": 116
							}
							selectBranchCountry.querySelector("select").value = selectTable[country];
							selectBranchOffice.querySelector("select").value = "";
						}

						/**
						 * Local function that handling setting value of the original Office filter field
						 * @function augSetOfficeBranch
						 * @param {String} office - Name of selected office
						 */
						function augSetOfficeBranch(office) {
							const selectTable = {
								"Ignore": "",
								"AUG Adelaide": 63807,
								"AUG Brisbane": 63808,
								"AUG Melbourne": 63809,
								"AUG Perth": 63810,
								"AUG Sydney": 63811,
								"AUG Beijing": 63812,
								"AUG Hong Kong": 63813,
								"AUG Bandung": 63814,
								"AUG Jakarta": 63815,
								"AUG Surabaya": 63816,
								"AUG Ipoh": 63817,
								"AUG Johor Bahru": 63818,
								"AUG Kota Bharu": 63819,
								"AUG Kota Kinabalu": 63820,
								"AUG Kuala Lumpur": 63821,
								"AUG Kuantan": 63822,
								"AUG Kuching": 63823,
								"AUG Melaka": 63824,
								"AUG Nilai": 63825,
								"AUG Penang": 63826,
								"AUG Segamat": 63827,
								"AUG Subang Jaya": 63828,
								"AUG Manila": 63829,
								"AUG Singapore": 63830
							}
							selectBranchCountry.querySelector("select").value = "";
							selectBranchOffice.querySelector("select").value = selectTable[office];
						}

					})();

					/**
					 * Modify Current Status Field
					 * @function augBuildCurrentStatusField_Report
					 */
					(function augBuildCurrentStatusField_Report() {
						let field;
						document.querySelectorAll(".filter-field.filter-field-crm.chfilter-field-enum").forEach((element) => {
							if (element.querySelector("label").innerText.toUpperCase().includes("CURRENT STATUS")) {
								field = element;
								return;
							}
						});
						augBuildSelectField_Report(field, "Current Status");
					})();

					/**
					 * Modify Applied Institution Field
					 * @function augBuildAppliedInstitutionField_Report
					 */
					(function augBuildAppliedInstitutionField_Report() {
						let field;
						document.querySelectorAll(".filter-field.filter-field-crm.chfilter-field-enum").forEach((element) => {
							if (element.querySelector("label").innerText.toUpperCase().includes("APPLIED INSTITUTION")) {
								field = element;
								return;
							}
						});
						augBuildSelectField_Report(field, "Applied Institution");
					})();


					/**
					* Modify and rebuild the Branch Country and Branch Select Fields
					* @function augBuildSelectField_Report
					* @param {String} selectFieldContainer - bitrix report select field to be changed
					* @param {String} newLabel - new label for the select field
					*/
					function augBuildSelectField_Report(selectFieldContainer, newLabel) {
						_selectFieldCounter++;

						// Build DataList
						let temp = [];
						for (let each of selectFieldContainer.querySelectorAll("option").values()) {
							temp.push(each);
						}
						let dataList = temp.map((each) => {
							return { "value": each.value, "text": each.text };
						});

						let templateSelectField = document.querySelector("#report-chfilter-examples > div.filter-field.filter-field-crm.chfilter-field-enum");
						let filterContainer = document.querySelector("#report-filter-chfilter");

						// Hide the original bitrix field
						selectFieldContainer.style.display = "none";

						// Add new select field
						let newSelectFieldContainer = filterContainer.insertBefore(templateSelectField.cloneNode(true), selectFieldContainer.nextElementSibling);
						BX.addClass(newSelectFieldContainer, "aug-select-field");
						newSelectFieldContainer.querySelector("label").innerHTML = newLabel;

						let newSelectDiv = newSelectFieldContainer.appendChild(BX.create("span", { "attrs": { "class": "aug-select-span" }, "style": { "position": "relative" } }));
						let textField = newSelectDiv.appendChild(BX.create("input", { "attrs": { "type": "text", "value": dataList[0].text } }));

						// Build dropdown
						let dropdownContainer = BX.create("div", { "attrs": { "class": `aug-dropdown-container` }, "style": { "visibility": "hidden", "position": "absolute", "height": "15em", "overflow": "hidden scroll", "backgroundColor": "white", "zIndex": "1200" } });

						dataList.forEach(item => {
							let itemSelect = dropdownContainer.appendChild(BX.create("a", { "attrs": { "class": "aug-item-select", "href": "#" }, "style": { "display": "block" }, "text": item.text }));

							let itemSelectHandler = function (e) {
								this.value = item.text;
								selectFieldContainer.querySelector("select").value = item.value;
								dropdownContainer.style.visibility = "hidden";
								e.preventDefault();
							}
							itemSelect.addEventListener("click", itemSelectHandler.bind(textField));
						});

						newSelectDiv.appendChild(dropdownContainer); //<== Add dropdown menu to new select span

						// Auxilary Functions
						let dropdownContainerMouse;

						textField.addEventListener("focus", (e) => {
							dropdownContainer.style.visibility = "visible";
						});

						textField.addEventListener("blur", (e) => {
							if (!dropdownContainerMouse) {
								dropdownContainer.style.visibility = "hidden";
							}
						});

						dropdownContainer.addEventListener("mouseenter", (e) => {
							dropdownContainerMouse = true;
						});

						dropdownContainer.addEventListener("mouseleave", (e) => {
							dropdownContainerMouse = false;
						});

						/**
						 * Local function for handling textField event
						 * @function textFieldHandler
						 * @param {Event} e - Event passed in by EventListener
						 * @returns nothing
						 */
						function textFieldHandler(e) {
							let searchText = e.target.value.toUpperCase();
							let itemArray = this.querySelectorAll("a");

							if (!searchText) {
								this.querySelectorAll("a").forEach(option => option.style.display = "block"); // <== Set all the option visible if text field empty.
								return;
							}

							itemArray.forEach(option => option.style.display = "none");

							itemArray.forEach(item => {
								if (item.innerText.toUpperCase().includes(searchText)) {
									item.style.display = "block";
								}
							})
						}
						textField.addEventListener("keyup", textFieldHandler.bind(dropdownContainer));
					};

					/**
					 * Modify Result Table
					 * @function augModifyResultTable
					 */
					(function augModifyResultTable() {
						let resultTable = document.querySelector("#report-result-table");
						let tableRows = resultTable.querySelectorAll(".reports-list-item");
						if (tableRows.length == 0) return;
						let color = "white" // Toggle this between red and blue
						let colorAccept = ""
						let pointer1 = 0, pointer2 = 1;
						let counter = 0;

						/**
						 * Local function to get data from each row
						 */
						function getTableData(tableRow) {
							let resultArray = [];
							tableRow.querySelectorAll("td").forEach((content) => resultArray.push(content.innerText));
							return resultArray;
						};

						/**
						 * Local function to set color to each row
						 */
						function setColorTd(trElement, color) {
							let tdElements = trElement.querySelectorAll("td");
							if (!color) {
								for (let tdElement of tdElements) {
									tdElement.style.backgroundColor = tdElement.dataset.bgcolor;
								};
							} else {
								for (let tdElement of tdElements) {
									tdElement.style.backgroundColor = color;
								};
							}
						};

						do {
							let leadId1 = getTableData(tableRows[pointer1])[0];
							let leadId2 = getTableData(tableRows[pointer2])[0];
							let processingTableRow = [];

							while (leadId1 == leadId2) {
								pointer2++;
								if (pointer2 >= tableRows.length) break;
								leadId2 = getTableData(tableRows[pointer2])[0];
							}

							// console.log("pointer1 = " + pointer1);
							// console.log("pointer2 = " + (pointer2 - 1));

							for (let i = pointer1; i <= pointer2 - 1; i++) {
								processingTableRow.push(tableRows[i]);
							};

							processingTableRow.forEach((tableRow, index, _tableRows) => {
								tableRow.id = "data" + counter;

								if (tableRow.querySelectorAll("td")[12].innerText.toUpperCase() == "ACCEPT") {
									tableRow.dataset.accept = true;
								};

								tableRow.querySelectorAll("td").forEach((cell, cellIndex) => {
									cell.dataset.bgcolor = color;

									// Hide similar lead ID
									if (cellIndex >= 0 && cellIndex <= 2 && index != 0) {
										cell.innerText = "";
									}

									// Set color for acceptted row
									if (cellIndex >= 3) {
										cell.parentElement.dataset.accept && (cell.dataset.bgcolor = "#DEEACF");
									}

									// Format Application intake to MMMM / YYYY
									if (cellIndex == 10) {
										let date = cell.innerText.substring(3);
										let month = Object.keys(applicationMonths)[Number(date.substring(0, 2)) - 1];
										let year = date.substring(3);
										cell.innerText = `${month} ${year}`
									}

									// Format Reporting intake to MMMM / YYYY
									if (cellIndex == 11) {
										let date = cell.innerText.substring(3);
										let month = Object.keys(applicationMonths)[Number(date.substring(0, 2)) - 1];
										let year = date.substring(3);
										cell.innerText = `${month} ${year}`
									}
								});

								// Set color for row
								setColorTd(tableRow);

								// Set eventListener for mouseout
								tableRow.addEventListener("mouseout", (e) => {
									_tableRows.forEach((_tableRow) => {
										setColorTd(_tableRow);
									});
								});

								// Set eventListener for mouseover
								tableRow.addEventListener("mouseover", (e) => {
									color = _tableRows[0].querySelector("td").style.backgroundColor;
									_tableRows.forEach((_tableRow) => {
										setColorTd(_tableRow, "#fbfec2");
									});
								});
							});

							// Setting variables for next loop
							color = (color != "white") ? "white" : "#ededed";
							pointer1 = pointer2;
							pointer2 = pointer1 + 1;
							counter++;

						} while (pointer2 < tableRows.length)
					})();

					/**  
					 * Add Show/Hide filter button
					 * @function augReportFilterShowHideButton
					 */
					(function augReportFilterShowHideButton() {
						let button = BX.create("button", { "attrs": { "class": "ui-btn ui-btn-primary" }, "text": "Filter" });
						document.querySelector("#pagetitle-menu").querySelector("button").insertAdjacentElement("afterend", button);
						button.addEventListener("click", (e) => {
							console.log("click");
							document.querySelector("#sidebar").style.display = (document.querySelector("#sidebar").style.display == "none") ? "" : "none";
						});
					})();

					/**
					 * Auxilary features functions, including changing name of some fields
					 * @function augAuxilaryFunctions
					 */
					(function augAuxilaryFunctions() {
						document.querySelectorAll(".filter-field").forEach((element) => {

							if (element.querySelector("label").innerText.toUpperCase().includes("RESPONSIBLE PERSON")) {
								element.querySelector("label").innerText = "Responsible Person";
								return;
							}

							if (element.querySelector("label").innerText.toUpperCase().includes("APPLICATION INTAKE")) {
								element.querySelector("label").innerText = "Applicaion Intake";
								return;
							}

							if (element.querySelector("label").innerText.toUpperCase().includes("REPORTING INTAKE")) {
								element.querySelector("label").innerText = "Reporting Intake";
								return;
							}

						});;
					})();

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

					/**
					 * Local function to create yes no field
					 * @function augBuildYesNoField_Report
					 * @param {String} label - label string to look for
					 */
					function augBuildYesNoField_Report(label, newLabel, className) {
						let filterContainer;

						// Select container
						document.querySelectorAll(".filter-field.chfilter-field-boolean").forEach(item => {
							if (item.querySelector("label").innerHTML !== label) return;
							filterContainer = item;
						});

						// Clear container
						let selectElement;
						filterContainer.querySelectorAll("*").forEach(item => {
							item.tagName == "LABEL" && (item.innerHTML = newLabel);
							item.tagName == "SELECT" && (item.style.display = "none") && (selectElement = item);
						});

						// Set container as flex
						let optionDiv = filterContainer.appendChild(BX.create("div"));
						optionDiv.style.display = "flex";
						optionDiv.style.justifyContent = "space-evenly";
						optionDiv.style.marginTop = "5px";
						`aug-radio-btn-${className}-`
						let radioId = `aug-radio-btn-${className}-`;
						let radioName = className;

						// Adding radio buttons
						let allRadio = augBuildRadioButton(optionDiv, 'All', true, radioId + "all", radioName);
						let yesRadio = augBuildRadioButton(optionDiv, 'Yes', false, radioId + "yes", radioName);
						let noRadio = augBuildRadioButton(optionDiv, 'No', false, radioId + "no", radioName);

						allRadio.addEventListener("change", allRadioHandler.bind(selectElement));
						yesRadio.addEventListener("change", yesRadioHandler.bind(selectElement));
						noRadio.addEventListener("change", noRadioHandler.bind(selectElement));

						/**
						 * @function allRadioHandler
						 * @param {Event} e - event passed by EventListener
						 */
						function allRadioHandler(e) {
							if (e.target.checked == true) {
								this.value = "";
							}
						}

						/**
						 * @function yesRadioHandler
						 * @param {Event} e - event passed by EventListener
						 */
						function yesRadioHandler(e) {
							if (e.target.checked == true) {
								this.value = "true";
							}
						}

						/**
						 * @function noRadioHandler
						 * @param {Event} e - event passed by EventListener
						 */
						function noRadioHandler(e) {
							if (e.target.checked == true) {
								this.value = "false";
							}
						}
					}

					/**
					 * Local function to build select options based on authentication and department this will affect augBranchSelect variable declared above
					 * @function augBuildBranchSelectObject
					 * @param {String} crmRole - crm Role
					 * @param {Array} crmDepartment - crm Department this is array of String
					 * @return {Object} augBranchSelect
					 */
					function augBuildBranchSelectObject(crmRole, crmDepartment) {
						let augBranchSelect = {};

						const augBranchSelectTemplate = {
							"Australia": ["AUG Adelaide", "AUG Brisbane", "AUG Melbourne", "AUG Perth", "AUG Sydney"],
							"Malaysia": ["AUG Ipoh", "AUG Johor Bahru", "AUG Kota Bharu", "AUG Kuala Lumpur", "AUG Kuantan", "AUG Kuching", "AUG Melaka", "AUG Nilai", "AUG Penang", "AUG Segamat", "AUG Subang Jaya"],
							"Indonesia": ["AUG Bandung", "AUG Jakarta", "AUG Surabaya"],
							"Singapore": ["AUG Singapore"],
							"China": ["AUG Beijing"],
							"Hong Kong SAR": ["AUG Hong Kong"],
							"Philippines": ["AUG Manila"]
						};

						if (crmRole == "Administrator") {
							augBranchSelect = augBranchSelectTemplate;
							return augBranchSelect;
						}

						for (let [country, offices] of Object.entries(augBranchSelectTemplate)) {
							for (let [id, department] of Object.entries(crmDepartment)) {
								if (offices.includes(department)) {
									if (!augBranchSelect[country]) augBranchSelect[country] = [];
									augBranchSelect[country].push(department);
								}
							}
						}

						return augBranchSelect;
					}

					// ============================

				} catch (e) {
					console.log(e);
					return;
				}

				try {
					// Change all the calendar icon
					var calendarElement = document.getElementsByClassName("filter-date-interval-calendar");
					for (var i = 0; i < calendarElement.length; i++) {
						calendarElement[i].getElementsByTagName("img")[0].setAttribute("src", "/bitrix/js/ui/forms/images/calendar.svg");
					}
				} catch (error) {
					return;
				}

			}, 0);

			// Check whether there is a div with id "workarea"
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

			// insertAfter works the next container after the id defined
			// BX only support id (#test) not class (.test) = BX("id") not BX("className")
			// Alternative solution: 
			//      1. use document.getElementsByClassName for class name
			//      2. use BX("id") for id
			// https://dev.1c-bitrix.ru/support/forum/forum6/topic74790/
			// 
			// BX.insertAfter(BX.create("div", {
			//     props: {className: "test-mok2"},
			//     text: "Test by Mok2",
			//     style: {
			//         backgroundColor: "black",
			//         width: "auto",
			//         height: "100px"
			//     }
			// }), document.getElementsByClassName("pagetitle-wrap")[0]);
		})
	};

	document.addEventListener("readystatechange", documentReadyHandler);

	// Remove this in production
	window.documentReadyHandler = documentReadyHandler();
})();
