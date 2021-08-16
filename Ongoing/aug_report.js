/**
 * aug_report.js version 0.1.0810
 * Updated 10/08/2021
 */

/**
 * requires:
 * 		aug_config.js
 * 		aug_functions.js
 */

/**
 * style:
 * 		aug_css.css
 */

BX.ready(
	function () {
		try {

			// Id value for new Application and Reporting intake user fields
			var applicationId = "aug-report-select-input-field-application-intake";
			var reportingId = "aug-report-select-input-field-reporting-intake";

			var applicationMonths = { "January": "01", "February": "02", "March": "03", "April": "04", "May": "05", "June": "06", "July": "07", "August": "08", "September": "09", "October": "10", "November": "11", "December": "12" }
			var intakeYears = { "2015": "2015", "2016": "2016", "2017": "2017", "2018": "2018", "2019": "2019", "2020": "2020", "2021": "2021", "2022": "2022", "2023": "2023", "2024": "2024", "2025": "2025", "2026": "2026", "2027": "2027", "2028": "2028", "2029": "2029" };
			var reportingMonths = { "January": "01", "March": "03", "July": "07", "September": "09", "October": "10" };

			main().catch(error => {
				console.log("There were errors during execution of report page main function");
				console.log(error);
			});

			async function main() {

				// ====== await Main Filter Container to be rendered ======

				let timerObject = {
					testFunc: () => {
						return Boolean(document.querySelector("#report-filter-chfilter"));
					},
					callbackFunc: () => { console.log("main() - 39 - mainFilterContainer available"); }
				}

				await augAwait(100, 10, timerObject, "main() - 42");

				// Add AUG class to change the style of button.
				try {
					(function augAddButtonClass_Report() {
						BX.addClass(BX("workarea"), "aug_report");
						BX.addClass(BX("report-rewrite-filter-button"), "aug-button-blue");
						BX.addClass(BX("report-reset-filter-button"), "aug-button-white");
					})();
				} catch (error) {
					throw new Error("There were errors during execution of BX.addClass.");
				}

				// ==================================================================
				// ==================================================================

				// ============ Current version ===========

				/**
				 * This part of code responsible for modifying the rest of the report page.
				 * This contains:
				 * + Modifying all date filters: augBuildAllDateField_Report
				 * + Modifying Application Intake and Reporting Intake: augBuildIntakeDateField_Report
				 * + Modifying all boolean filters: augBuildAllBooleanField_Report
				 * + Modifying all select filters: augBuildAllSelectField_Report
				 * + Modifying Branch Country and Branch select filters: augBuildBranchSelectField_Report
				 * + Modifying Result Table: augModifyResultTable
				 * + Marking optional filters and hide optional filters: augReportMarkOptionalFilter
				 * + Some auxiliary features, please read more about them in augAuxilaryFunctions 
				 */

				/**  @var mainFilterContainer - The element contain all the filters of the report page. */
				var mainFilterContainer = document.querySelector("#report-filter-chfilter");

				try {
					(
						/**
						 * Function to iterate through main filter container and processes all date filters.
						 * However, this will skip "Reporting Intake" and "Application Intake" filters.
						 * Valid date filters are ones having both "more than or equal to" and "less than or equal to".
						 * There should only be two filters "more than or equal to" and "less than or equal to" for each custom fields.
						 * Other non-valid date filters are ignored.
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

							if (Object.entries(uniqueFields).length == 0) { // <== Return if there is no date field
								return;
							}

							// Iterate through uniqueFields and processing date filter fields.
							for (let [fieldName, fieldObject] of Object.entries(uniqueFields)) {
								if (fieldObject.fromTo !== "ready") {
									console.log(`Found only one element for field |${fieldName}|, ignoring the field.`);
									continue;
								} else if (fieldObject.fieldName == "Reporting Intake") {
									console.log(`Found |${fieldObject.fieldName}|.`);
									augBuildIntakeDateField_Report(filterContainer, fieldObject);
									continue;
								} else if (fieldObject.fieldName == "Application Intake") {
									console.log(`Found |${fieldObject.fieldName}|.`);
									augBuildIntakeDateField_Report(filterContainer, fieldObject);
									continue;
								}

								augBuildDateFromToField_Report(filterContainer, fieldObject);
							}
						})(mainFilterContainer);
				} catch (error) {
					throw new Error("There were errors during execution of augBuildAllDateField_Report.");
				}


				try {
					(
						/**
						 * Function to iterate through main filter container and processes all Ignore/Yes/No field (Boolean field).
						 * For each custom field there should only be one filter.
						 * @function augBuildAllBooleanField_Report
						 * @param {Element} filterContainer - main filter container of report page, #report-filter-chfilter
						 */
						function augBuildAllBooleanField_Report(filterContainer) {
							// ? VARIABLES
							// uniqueFields contains names of filter of a field
							// e.g. There usually are two filter fields for a data field Application Date; "more than or equal to" and "less than or equal to"
							let uniqueFields = {};

							// Get all date filter in filter container
							let filterFields = filterContainer.querySelectorAll(".filter-field.chfilter-field-boolean");
							if (!filterFields) {
								console.warn("No boolean filter field in this report.");
								return;
							}

							// ? MAIN BODY
							// Get iterate through filterFields to get uniqueFields
							filterFields.forEach((filterField) => {
								let label = filterField.querySelector("label").innerText;
								let uniqueFieldName = label.substring(0, label.indexOf("\"") - 1); // <== Get the field name
								if (!Object.keys(uniqueFields).includes(uniqueFieldName)) {
									uniqueFields[uniqueFieldName] = {};
									uniqueFields[uniqueFieldName].fieldName = uniqueFieldName;
									uniqueFields[uniqueFieldName].div = filterField;
								}
							});

							if (Object.entries(uniqueFields).length == 0) { // <== Return if there is no date field
								return;
							}

							// Iterate through uniqueFields and processing date filter fields.
							for (let [fieldName, fieldObject] of Object.entries(uniqueFields)) {
								augBuildYesNoField_Report(filterContainer, fieldObject);
							}

						}(mainFilterContainer));
				} catch (error) {
					throw new Error("There were errors during execution of augBuildAllBooleanField_Report.");
				}


				try {
					(
						/**
						 * Function to iterate through main filter container and processes all Select filter field.
						 * This ignores Branch and Branch Country select filter fields.
						 * For each customer field there should only be one filter.
						 * @function augBuildAllSelectField_Report
						 * @param {Element} filterContainer - main filter container of report page, #report-filter-chfilter
						 */
						function augBuildAllSelectField_Report(filterContainer) {
							// ? VARIABLES
							// uniqueFields contains names of filter of a field
							// e.g. There usually are two filter fields for a data field Application Date; "more than or equal to" and "less than or equal to"
							let uniqueFields = {};

							// Get all date filter in filter container
							let filterFields = filterContainer.querySelectorAll(".filter-field.chfilter-field-enum");
							if (!filterFields) {
								console.warn("No select filter field in this report.");
								return;
							}

							// ? MAIN BODY
							// Get iterate through filterFields to get uniqueFields
							filterFields.forEach((filterField) => {
								let label = filterField.querySelector("label").innerText;
								// if (label.includes("Branch")) { // <== Ignore Branch and Branch office select filters
								// 	return;
								// }
								let uniqueFieldName = label.substring(0, label.indexOf("\"") - 1); // <== Get the field name

								if (!Object.keys(uniqueFields).includes(uniqueFieldName)) {
									uniqueFields[uniqueFieldName] = {};
									uniqueFields[uniqueFieldName].fieldName = uniqueFieldName;
									uniqueFields[uniqueFieldName].div = filterField;
								}
							});

							if (Object.entries(uniqueFields).length == 0) { // <== Return if there is no date field
								return;
							}

							// Iterate through uniqueFields and processing date filter fields.
							for (let [fieldName, fieldObject] of Object.entries(uniqueFields)) {
								augBuildSelectField_Report(filterContainer, fieldObject);
							}
						})(mainFilterContainer);
				} catch (error) {
					throw new Error("There were errors during execution of augBuildAllSelectField_Report.");
				};

				try {
					(
						/**
						 * This part of code responsible for modifying the Branch and Branch Country filters.
						 * The general idea is that when the Branch Country is selected, only Branch of that Country is shown.
						 * This also gives the Branch and Branch Country options based on user authentication.
						 * For example, staff in Melbourne, Australia can only choose Australia and Melbourne.
						 * Keep in mind that there should only be one filter of the field.
						 * @function augBuildBranchSelectField_Report
						 */
						async function augBuildBranchSelectField_Report(filterContainer) {
							// Get Available Options
							try {
								// Short-hand for if (userDepartments and userCrmRolName) exist assign augBuildBranchSelectObject => augBranchSelect
								var augBranchSelect = !!userDepartments && !!userCrmRoleName && augBuildBranchSelectObject(userCrmRoleName, userDepartments);
							} catch (err) {
								if (!augBranchSelect || Object.keys(augBranchSelect).length == 0) {
									let error = new Error("Could not retrieve available option for Branch and Branch Country.");
									error.name = "RetrievalError";
									throw error;
								}
							}

							// Local variable
							let augBranchCountry = Object.keys(augBranchSelect).map(each => each.toLowerCase());
							let branchCountryFilter, branchFilter;

							// Select branchCountryFilter
							try {
								console.log("augBuildBranchSelectField_Report() - augAwaitSelector");
								branchCountryFilter = await augAwaitSelector(100, 10, "#aug_report_filter_select_branch_country", mainFilterContainer); // <== Wait until augBuildAllSelectField_Report finish
							} catch (err) {
								if (!branchCountryFilter) {
									let error = new Error("No Branch Country filter found.");
									error.name = "SelectError";
									throw error;
								}
							}

							// Select branchFilter
							try {
								branchFilter = await augAwaitSelector(100, 10, "#aug_report_filter_select_branch", mainFilterContainer);
							} catch (err) {
								if (!branchCountryFilter) {
									let error = new Error("No Branch Country filter found.");
									error.name = "SelectError";
									throw error;
								}
							}

							// Remove Branch Country options not available for the user.
							branchCountryFilter.querySelectorAll("a").forEach((option) => {
								if (option.innerHTML != "Ignore" && !augBranchCountry.includes(option.innerHTML.toLowerCase())) {
									option.remove();
								}
							});

							// Remove Branch options not available for the user.
							branchFilter.querySelectorAll("a").forEach((option) => {
								for (let country in augBranchSelect) {
									if (augBranchSelect[country].map((each) => each.toLowerCase()).includes(option.innerHTML.toLowerCase()) || option.innerHTML == "Ignore") {
										return;
									}
								}
								option.remove();
							});

							// Handling "Click" event to change the available options when Branch Country change.
							// For example, when click Indonesia in Branch Country filter, Branch filter will change the available options to Indonesia's Branches.
							branchCountryFilter.querySelector("div.aug-dropdown-container").addEventListener("click", (e) => {
								// Update branch filter to respective country.
								let chosenCountry = e.target.innerHTML;
								if (chosenCountry != "Ignore") {
									branchFilter.querySelectorAll("a").forEach((option) => {
										if (option.innerHTML == "Ignore" || augBranchSelect[chosenCountry].includes(option.innerHTML)) {
											option.style.display = "block";
										} else {
											option.style.display = "none";
										}
									});
								}
								// Set first option as default.
								branchFilter.querySelector("a").click();
							});

							// Set the default for both filters.
							branchCountryFilter.querySelector("a").click();
							branchFilter.querySelector("a").click();

						})(mainFilterContainer);

				} catch (error) {
					throw new Error("There were errors during execution of augBuildBranchSelectField_Report.");
				}

				// TODO: Change the funcion so fit with different report.
				try {
					(
						/**
						 * Modify Result Table
						 * @function augModifyResultTable
						 */
						function augModifyResultTable() {

							// ? FUNCTIONS
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
							 * @param {Element} trElement - table row
							 * @param {String} color - can be in hex or rgb format
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

							/**
							 * Return index number of header
							 * @param {Element} table - result table #report-result-table
							 * @param {String} field - name of field
							 * @returns {Number}
							 */
							function getTableHeaderIndex(table, field) {
								let header = Array.from(table.querySelector("thead").querySelectorAll("th")).map(header => header.innerText.toLowerCase());
								return header.indexOf(field);
							}

							/**
							 * Return an array of students block
							 * @function getStudentBlock
							 * @param {Element} table - element table, #report-result-table
							 * @returns {Array} studentBlocks
							 */
							function getStudentBlocks(table, idIndex) {
								let pointer1 = 0, pointer2 = 1;
								let studentBlocks = [];
								let tableRows = table.querySelectorAll(".reports-list-item");

								do {
									let leadId1 = getTableData(tableRows[pointer1])[idIndex];
									let leadId2
									if (pointer2 < tableRows.length) {
										leadId2 = getTableData(tableRows[pointer2])[idIndex];
									} else leadId2 = null;

									let processingTableRow = [];

									// Loop to get rows of same student
									while (leadId1 == leadId2) {
										pointer2++;
										if (pointer2 > tableRows.length - 1) break;
										leadId2 = getTableData(tableRows[pointer2])[0];
									}

									// Get Rows of same student
									for (let i = pointer1; i <= pointer2 - 1; i++) {
										processingTableRow.push(tableRows[i]);
									};

									studentBlocks.push(processingTableRow);

									pointer1 = pointer2;
									pointer2 = pointer1 + 1;

								} while (pointer2 <= tableRows.length);

								return studentBlocks;
							}

							// ? VARIABLES
							let resultTable = document.querySelector("#report-result-table");

							let tableRows = resultTable.querySelectorAll(".reports-list-item");
							if (tableRows.length == 0) return;

							let color = "white" // Toggle this between red and blue
							let applicationIntakeIndex = getTableHeaderIndex(resultTable, "application intake");
							let reportingIntakeIndex = getTableHeaderIndex(resultTable, "reporting intake");
							let idIndex = getTableHeaderIndex(resultTable, "id");
							if (idIndex == -1) idIndex = 0;
							let acceptIndex = getTableHeaderIndex(resultTable, "accept");
							let studentBlocks = getStudentBlocks(resultTable, idIndex);

							// ? MAIN BODY

							studentBlocks.forEach((block) => {
								block.forEach((tableRow, index, _tableRows) => {
									if (acceptIndex > -1) {
										if (tableRow.querySelectorAll("td")[acceptIndex].innerText.toUpperCase() == "ACCEPT") {
											tableRow.dataset.accept = true;
										};
									}

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
										if (applicationIntakeIndex > -1) {
											if (cellIndex == applicationIntakeIndex && cell.innerHTML != '') {
												let date = cell.innerText.substring(3);
												let month = Object.keys(applicationMonths)[Number(date.substring(0, 2)) - 1];
												let year = date.substring(3);
												cell.innerText = `${month} ${year}`
											}
										}

										// Format Reporting intake to MMMM / YYYY
										if (reportingIntakeIndex > -1) {
											if (cellIndex == reportingIntakeIndex && cell.innerHTML != '') {
												let date = cell.innerText.substring(3);
												let month = Object.keys(applicationMonths)[Number(date.substring(0, 2)) - 1];
												let year = date.substring(3);
												if (month && year) cell.innerText = `${month} ${year}`;
											}
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
							})

						})();
				} catch (error) {
					throw new Error("There were errors during execution of augModifyResultTable.");
				}

				try {
					(
						/**
						 * Module function to modify Institution report
						 * @function augModifyInstitution_Report
						 */
						async function augModifyInstitution_Report() {
							timerObject = {
								testFunc: () => {
									return _selectFieldCounter == _selectFieldFinish;
								},
								callbackFunc: () => {
									console.log("select field rendered");
								}
							}

							await augAwait(100, 10, timerObject, "augModifyInstitution_Report() - 601");

							let institutionCountry;
							for (let each of document.querySelectorAll(".aug-select-field")) {
								if (each.querySelector("label").innerHTML.toLowerCase() == "applied institution country") {
									institutionCountry = each;
									break;
								}
							}

							let appliedInstitution;
							for (let each of document.querySelectorAll(".aug-select-field")) {
								if (each.querySelector("label").innerHTML.toLowerCase() == "applied institution") {
									appliedInstitution = each;
									break;
								}
							}

							let campus;
							for (let each of document.querySelectorAll(".aug-select-field")) {
								if (each.querySelector("label").innerHTML.toLowerCase() == "campus") {
									campus = each;
									break;
								}
							}

							if (!institutionCountry || !appliedInstitution || !campus) {
								throw new Error("Errors in augModifyInstitution_Report, elements not available");
							}

							let chosenCountry;
							institutionCountry.querySelector(".aug-dropdown-container").addEventListener("click", (e) => {
								chosenCountry = e.target.innerHTML;
								console.log({ chosenCountry });
								augSetAppliedInstitutionCountry(chosenCountry);
							});


							function augSetAppliedInstitutionCountry(chosenCountry) {
								console.log("augSetAppliedInstitutionCountry");
								let dropdownContainer = appliedInstitution.querySelector(".aug-dropdown-container");
								let textField = appliedInstitution.querySelector("input");
								let shortName = augcGetCountryShortName[chosenCountry];
								let temp = [];
								let appliedInstitutionOriginal;

								for (let each of document.querySelectorAll(".filter-field.filter-field-crm.chfilter-field-enum")) {
									if (each.querySelector("label").innerHTML == "Applied Institution \"is equal to\"") {
										appliedInstitutionOriginal = each;
										break;
									}
								}

								for (let each of appliedInstitutionOriginal.querySelectorAll("option").values()) {
									temp.push(each);
								}
								let dataList = temp.map((each) => ({ "value": each.value, "text": each.text }))
									.filter(each => each.text.includes(`${shortName}--`));

								appliedInstitution.querySelectorAll("a").forEach((option) => {
									option.remove(); // <== clear options.
								});

								dataList.forEach(item => {
									console.log("Build options");
									let itemSelect = dropdownContainer.appendChild(BX.create("a", { "attrs": { "class": "aug-item-select", "href": "#" }, "style": { "display": "block" }, "text": item.text }));

									let itemSelectHandler = function (e) {
										this.value = item.text;
										appliedInstitutionOriginal.querySelector("select").value = item.value;
										dropdownContainer.style.visibility = "hidden";
										e.preventDefault();
									}
									itemSelect.addEventListener("click", itemSelectHandler.bind(textField));
								});

							}

						})();


				} catch (error) {
					throw new Error(error.message);
				}


				try {
					(
						/**
						 * Auxilary features functions, including changing name of some fields
						 * @function augAuxilaryFunctions
						 */
						function augAuxilaryFunctions() {

							document.querySelectorAll(".filter-field").forEach((element) => {

								if (element.querySelector("label").innerText.toUpperCase().includes("RESPONSIBLE PERSON")) {
									element.querySelector("label").innerText = "Counsellor";
									return;
								}

								if (element.querySelector("label").innerText.toUpperCase().includes("APPLICATION INTAKE")) {
									element.querySelector("label").innerText = "Application Intake";
									return;
								}

								if (element.querySelector("label").innerText.toUpperCase().includes("REPORTING INTAKE")) {
									element.querySelector("label").innerText = "Reporting Intake";
									return;
								}
							});


							(
								/**
								 * Mark which filter is optional
								 * @function augReportMarkOptionalFilter
								 */
								async function augReportMarkOptionalFilter() {
									function getOptionFilterList() {
										let reportName = document.querySelector("#pagetitle").innerText;
										if (!Object.keys(augcOptionalFilter_Report).includes(reportName)) {
											console.error("report name not found");
											return;
										}
										let optionList = [];
										augcOptionalFilter_Report.default.forEach(option => optionList.push(option));
										augcOptionalFilter_Report[reportName].forEach(option => optionList.push(option));
										return optionList;
									}

									let timerObject = {
										testFunc: () => {
											return _selectFieldCounter == _selectFieldFinish;
										},
										callbackFunc: () => {
											console.log("Select fields rendered");
										}
									}

									await augAwait(100, 10, timerObject, "augReportMarkOptionalFilter() - 741");

									let optionList = getOptionFilterList();
									mainFilterContainer.querySelectorAll(".filter-field").forEach((filter) => {
										if (filter.style.display == "none") { // <== If filter is not display, it is not to be processed
											return;
										}
										if (!optionList.includes(filter.querySelector("label").innerText.toLowerCase())) {
											filter.style.display = "none";
											filter.classList.add("aug-optional-filter");
										}
									})
								})();


							(
								/** Add Show/Hide Advanced Filter button
								 * @function augReportAdvancedFilterShowHideButton
								 */
								function augReportAdvancedFilterShowHideButton() {
									let button = BX.create("button", { "attrs": { "class": "ui-btn ui-btn-primary" }, "text": "MORE" });
									document.querySelector("#pagetitle-menu").querySelector("button").insertAdjacentElement("afterend", button);
									button.addEventListener("click", (e) => {
										if (document.querySelector("#sidebar").style.display == "none") {
											document.querySelector("#sidebar").style.display = "block";
											// document.querySelector("#workarea").style.opacity = 0.1;
											// document.querySelector("#sidebar").style.opacity = 1;
										}
										button.innerText = button.innerText == "MORE" ? "LESS" : "MORE";
										mainFilterContainer.querySelectorAll(".aug-optional-filter").forEach((optionalFilter) => {
											optionalFilter.style.display = optionalFilter.style.display != "none" ? "none" : "block";
										});
									});
								})();

							(
								/**  
								 * Add Show/Hide filter button
								 * @function augReportFilterShowHideButton
								 */
								function augReportFilterShowHideButton() {
									let button = BX.create("button", { "attrs": { "class": "ui-btn ui-btn-primary" }, "text": "Filter" });
									document.querySelector("#pagetitle-menu").querySelector("button").insertAdjacentElement("afterend", button);
									button.addEventListener("click", (e) => {

										BX("sidebar").style.display = BX("sidebar").style.display == "none" ? "block" : "none";

										// if (document.querySelector("#sidebar").style.display == "none") {
										// 	document.querySelector("#sidebar").style.display = "block";
										// 	document.querySelector("#workarea").style.opacity = 0.1;
										// 	document.querySelector("#sidebar").style.opacity = 1;
										// } else {
										// 	document.querySelector("#sidebar").style.opacity = 0;
										// 	document.querySelector("#workarea").style.opacity = 1;
										// 	setTimeout(() => {
										// 		document.querySelector("#sidebar").style.display = "none";
										// 	}, 200);
										// }
									});
								})();

							// Change all the calendar icon
							var calendarElement = document.getElementsByClassName("filter-date-interval-calendar");
							for (var i = 0; i < calendarElement.length; i++) {
								calendarElement[i].getElementsByTagName("img")[0].setAttribute("src", "/bitrix/js/ui/forms/images/calendar.svg");
							}

							(
								/**
								 * Iterate report config
								 * @function augReportConfig
								 */
								function augReportConfig() {
									let reportConfig = augcReportConfig[document.querySelector("#pagetitle").innerText];
									if (reportConfig) {
										if (reportConfig.extend_id) {
											augLink_Report(reportConfig.extend_id, "EXTEND");
										}
										if (reportConfig.reduce_id) {
											augLink_Report(reportConfig.reduce_id, "REDUCE");
										}
									}
								})();

							// (
							// 	function augSideBarFlyout() {
							// 		let sideBar = document.querySelector("#sidebar");
							// 		let destination = sideBar.parentElement.parentElement;
							// 		sideBar.remove();
							// 		destination.appendChild(sideBar);
							// 		let style = {
							// 			position: "absolute",
							// 			top: "213px",
							// 			left: `calc(50vw - ${parseInt(window.getComputedStyle(sideBar).width) / 2}px)`,
							// 			boxShadow: "0px 0px 20px 10px #363232b8",
							// 			transition: "opacity 0.2s ease 0s",
							// 			opacity: "1",
							// 			display: "block",
							// 		}
							// 		Object.assign(sideBar.style, style);

							// 		style = {
							// 			transition: "opacity 0.2s ease 0s",
							// 			opacity: "0.1"
							// 		}
							// 		Object.assign(document.querySelector("#workarea").style, style);

							// 		style = {
							// 			backgroundColor: "white",
							// 		}
							// 		Object.assign(document.querySelector("#workarea").parentElement.style, style);

							// 	}

							// )();

						})();
				}
				catch (error) {
					throw new Error("There were errors during execution of augAuxilaryFunctions.");
				}

				// ============= END OF MAIN ===============

			};

			// ? UTILITY FUNCTIONS
			/**
			 * ===========================================================
			 * This section contains functions called in the main section.
			 * ===========================================================
			 */

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

			/**
			 * Utility function to reduce code repetition.
			 * Build Div for date input, keep in mind that this function will move the existing date filter 
			 * created by Bitrix template into a single div.
			 * @function augBuildDateField
			 * @param {Element} container - outer container that the div will be added to.
			 * @param {Boolean} inputElement - the field that we are moving from original filter
			 * @param aElement - the calendar button we are moving from original filter
			 */
			function augBuildDateField(container, inputElement, aElement, label) {
				let newDiv = BX.create("div", { "attrs": { "class": "aug-date-input" }, "style": { "display": "inline-block" } });
				container.appendChild(newDiv);
				newDiv.appendChild(BX.create("label", { "attrs": { "class": "aug-date-input-label" }, "text": label }));
				newDiv.appendChild(inputElement);
				newDiv.appendChild(aElement);
				inputElement.style.marginLeft = "5px";
				aElement.addEventListener("click", e => e.preventDefault()); // <== Prevent page refreshes when click on calendar img border
			}

			/**
			 * Build Reporting Intake Date Field
			 * @function augBuildIntakeDateField_Report
			 * @param {Element} filterContainer 
			 * @param {fieldObject} fieldObject 
			 */
			function augBuildIntakeDateField_Report(filterContainer, fieldObject) {

				// ? VARIABLES
				let fieldName = fieldObject.fieldName;
				let toDiv = fieldObject.toDiv;
				let fromDiv = fieldObject.fromDiv;
				let fieldId = 'aug_report_filter_intake_date_' + fieldName.toLowerCase().replace(' ', '_');
				let radioName = fieldName.toLowerCase().replace(' ', '_');
				let toDivInput = toDiv.querySelector("input");
				let fromDivInput = fromDiv.querySelector("input");
				let monthOptions = fieldName == "Application Intake" ? applicationMonths : reportingMonths;
				let radioMode = (!toDivInput.value && !fromDivInput.value) ? 0 : (toDivInput.value == fromDivInput.value) ? 1 : 2; // 0 = all, 1 = one, 2 = range
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
				newDateFilter.id = fieldId;
				BX.addClass(newDateFilter, 'aug-date-field');

				// Adding new Date Filter before the first filter
				toDiv.insertAdjacentElement("afterend", newDateFilter);
				newDateFilter.querySelector("label").innerText = fieldName;

				// Clear content of new Date Filter
				newDateFilter.querySelector("input").remove();
				newDateFilter.querySelector("a").remove();

				// Adding options radio buttons
				let optionDiv = newDateFilter.appendChild(BX.create("div", { "attrs": { "class": `aug-radio-container` } }));

				let allRadio = augBuildRadioButton(optionDiv, "All Intake", (radioMode == 0), `aug-radio-btn-all-${radioName}`, radioName);
				let oneRadio = augBuildRadioButton(optionDiv, "One Intake", (radioMode == 1), `aug-radio-btn-one-${radioName}`, radioName);
				let rangeRadio = augBuildRadioButton(optionDiv, "Range", (radioMode == 2), `aug-radio-btn-range-${radioName}`, radioName);

				// Build Month FROM TO Select
				let fromToDivInitialClass = radioMode == 0 ? "aug-intake-all-mode" : radioMode == 1 ? "aug-intake-one-mode" : "aug-intake-range-mode";
				let fromToDiv = newDateFilter.appendChild(BX.create("div", { "attrs": { "class": `aug-intake ${fromToDivInitialClass}` } }));
				let fromMonthDiv = fromToDiv.appendChild(BX.create("div", { "attrs": { "class": "aug-intake-from" } }));
				let toMonthDiv = fromToDiv.appendChild(BX.create("div", { "attrs": { "class": "aug-intake-to" } }));

				let [fromMonthInput, fromYearInput] = buildMonthSelect(fromMonthDiv, "From", fieldName, fromDivInput.value, fromDivInput);
				let [toMonthInput, toYearInput] = buildMonthSelect(toMonthDiv, "To", fieldName, toDivInput.value, toDivInput);

				// Adding Handler For Radio Buttons
				allRadio.addEventListener("change", augAllRadioHandler.bind(fromToDiv));
				oneRadio.addEventListener("change", augOneRadioHandler.bind(fromToDiv));
				rangeRadio.addEventListener("change", augRangeRadioHandler.bind(fromToDiv));

				// ? LOCAL FUNCTIONS

				function buildMonthSelect(topContainer, label, fieldName, selectedDate, inputDiv) {
					let [selectedMonth, selectedYear] = selectedDate.split('/').splice(1, 2);
					let id = fieldName.toLowerCase().replace(' ', '_');

					topContainer.appendChild(BX.create("label", { "attrs": { "class": "" }, "text": label }));

					// Build month input
					let monthInput = topContainer.appendChild(BX.create("select", { "attrs": { "class": "aug-intake-month-select aug-two-layers-fields", "id": `aug_${id}_${label}_MonthSelect` } }));
					for (let [monthName, monthValue] of Object.entries(monthOptions)) {
						let option = monthInput.appendChild(BX.create("option", { "attrs": { "class": "", "value": monthValue }, "text": monthName }));
						option.selected = (monthValue == selectedMonth);
					}


					// Build year input
					let yearInput = topContainer.appendChild(BX.create("select", { "attrs": { "class": "aug-intake-year-select aug-two-layers-fields", "id": `aug_${id}_${label}_MonthSelect` + "YearSelect" } }));
					for (let [yearName, yearValue] of Object.entries(intakeYears)) {
						let option = yearInput.appendChild(BX.create("option", { "attrs": { "class": "", "value": yearValue }, "text": yearName }));
						option.selected = (selectedYear == yearValue);
					}

					monthInput.addEventListener("change", monthSelectHandler.bind(inputDiv));
					yearInput.addEventListener("change", yearSelectHandler.bind(inputDiv));

					return [monthInput, yearInput];
				}

				function monthSelectHandler(e) {
					let chosenMonth = e.target.value;
					let chosenYear = e.target.parentElement.querySelector("select.aug-intake-year-select").value;
					let chosenDate = `01/${chosenMonth}/${chosenYear}`;
					if (radioMode == 1) {
						fromDivInput.value = chosenDate;
						toDivInput.value = chosenDate;
					} else if (radioMode == 2) {
						this.value = chosenDate;
					}
				}

				function yearSelectHandler(e) {
					let chosenMonth = e.target.parentElement.querySelector("select.aug-intake-month-select").value;
					let chosenYear = e.target.value;
					let chosenDate = `01/${chosenMonth}/${chosenYear}`;
					if (radioMode == 1) {
						fromDivInput.value = chosenDate;
						toDivInput.value = chosenDate;
					} else if (radioMode == 2) {
						this.value = chosenDate;
					}
				}

				/**
				 * Module handler for all radio button - hide To-From Date Field
				 * @function augAllRadioHandler
				 * @param {Event} e - event passed in by EventListener
				 */
				function augAllRadioHandler(e) {
					if (e.target.checked) {
						radioMode = 0;
						BX.removeClass(fromToDiv, "aug-intake-one-mode");
						BX.removeClass(fromToDiv, "aug-intake-range-mode");
						BX.addClass(fromToDiv, "aug-intake-all-mode");
						fromDivInput.value = "";
						toDivInput.value = "";
					}
				}

				/**
				 * Local handler for one radio button - Set both same date for both to and from date field
				 * @function augOneRadioHandler
				 * @param {Event} e - event passed in by EventListener
				 */
				function augOneRadioHandler(e) {
					if (e.target.checked) {
						radioMode = 1;
						BX.removeClass(fromToDiv, "aug-intake-all-mode");
						BX.removeClass(fromToDiv, "aug-intake-range-mode");
						BX.addClass(fromToDiv, "aug-intake-one-mode");
					}
				}

				/**
				 * Module handler for all radio button - hide To-From Date Field
				 * @function augRangeRadioHandler
				 * @param {Event} e - event passed in by EventListener
				 */
				function augRangeRadioHandler(e) {
					if (e.target.checked) {
						radioMode = 2;
						BX.removeClass(fromToDiv, "aug-intake-one-mode");
						BX.removeClass(fromToDiv, "aug-intake-all-mode");
						BX.addClass(fromToDiv, "aug-intake-range-mode");
					}
				}

			}



			/**
			 * Utility function to combine "more than and equal" and "less than and equal" into one
			 * @function augBuildDateFromToField_Report
			 * @param {Element} filterContainer - main filter container
									* @param {Object} fieldObject - field Object containing ref to the 2 from / to div
									*/
			function augBuildDateFromToField_Report(filterContainer, fieldObject) {
				// ? VARIABLES
				let fieldName = fieldObject.fieldName;
				let toDiv = fieldObject.toDiv;
				let fromDiv = fieldObject.fromDiv;
				let fieldId = 'aug_report_filter_date_' + fieldName.toLowerCase().replace(' ', '_');
				let radioName = fieldName.toLowerCase().replace(' ', '_');
				let radioMode = !toDiv.querySelector("input").value && !fromDiv.querySelector("input").value ? 0 : 1;

				// Clone inputs from these two filters
				let toInput = toDiv.querySelector("input");
				let toA = toDiv.querySelector("a");
				let fromInput = fromDiv.querySelector("input");
				let fromA = fromDiv.querySelector("a");

				// ? MAIN BODY
				// Sample date filter field used to clone new date filter field
				let sampleDateFilter = document.querySelector(".filter-field.chfilter-field-datetime");

				// Hide 2 Date filter containers.
				toDiv.style.display = "none";
				fromDiv.style.display = "none";

				// Adding new Date filter
				let newDateFilter = sampleDateFilter.cloneNode(true);
				newDateFilter.id = fieldId;
				BX.addClass(newDateFilter, 'aug-date-field');

				// Adding new Date Filter before the first filter
				toDiv.insertAdjacentElement("afterend", newDateFilter)
				newDateFilter.querySelector("label").innerText = fieldName;

				// Clear content of new Date Filter
				newDateFilter.querySelector("input").remove();
				newDateFilter.querySelector("a").remove();

				// Adding options radio buttons
				let optionDiv = newDateFilter.appendChild(BX.create("div", { "attrs": { "class": `aug-radio-container` } }));

				let allRadio = augBuildRadioButton(optionDiv, "All", (radioMode == 0), `aug-radio-btn-all-${radioName}`, radioName);
				let rangeRadio = augBuildRadioButton(optionDiv, "Range", (radioMode == 1), `aug-radio-btn-range-${radioName}`, radioName);

				// Adding From-To div Container
				let toFromDiv = BX.create("div", { "attrs": { "class": "aug-date-from-to-input" }, "style": { "display": "flex", "justifyContent": "space-between" } });
				if (radioMode == 0) {
					BX.addClass(toFromDiv, "aug_hide");
				}
				newDateFilter.appendChild(toFromDiv);
				augBuildDateField(toFromDiv, fromInput, fromA, "From");
				augBuildDateField(toFromDiv, toInput, toA, "To");

				// Adding Handler For Radio Buttons
				allRadio.addEventListener("change", augAllRadioHandler.bind(toFromDiv));
				rangeRadio.addEventListener("change", augRangeRadioHandler.bind(toFromDiv));

				// ? LOCAL FUNCTIONS
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
			 * Utility function to create yes no field
			 * @function augBuildYesNoField_Report
			 * @param {Element} filterContainer - main filter container
			 * @param {fieldObject} fieldObject - format: fieldName, div
			 */
			function augBuildYesNoField_Report(filterContainer, fieldObject) {
				let fieldName = fieldObject.fieldName;
				let fieldDiv = fieldObject.div;
				let fieldValue = fieldDiv.querySelector("select").value;
				let fieldId = 'aug_report_filter_boolean_' + fieldName.toLowerCase().replace(' ', '_');
				let className = fieldName.toLowerCase();
				let radioId = `aug-radio-btn-${className}-`;
				let radioName = className;
				let radioMode = fieldValue == "" ? 0 : fieldValue == "true" ? 1 : 2

				// Set id
				fieldDiv.id = fieldId;
				BX.addClass(fieldDiv, 'aug-boolean-field');

				// Clear container
				let selectElement = fieldDiv.querySelector("select");
				selectElement.style.display = "none";
				let label = fieldDiv.querySelector("label");
				label.innerText = `Show ${fieldName}`;

				// Set container as flex
				let optionDiv = fieldDiv.appendChild(BX.create("div", { "attrs": { "class": "aug-radio-container" } }));

				// Adding radio buttons
				let allRadio = augBuildRadioButton(optionDiv, 'All', (radioMode == 0), radioId + "all", radioName);
				let yesRadio = augBuildRadioButton(optionDiv, 'Yes', (radioMode == 1), radioId + "yes", radioName);
				let noRadio = augBuildRadioButton(optionDiv, 'No', (radioMode == 2), radioId + "no", radioName);

				allRadio.addEventListener("change", allRadioHandler.bind(selectElement));
				yesRadio.addEventListener("change", yesRadioHandler.bind(selectElement));
				noRadio.addEventListener("change", noRadioHandler.bind(selectElement));

				function allRadioHandler(e) {
					if (e.target.checked == true) {
						this.value = "";
					}
				}

				function yesRadioHandler(e) {
					if (e.target.checked == true) {
						this.value = "true";
					}
				}

				function noRadioHandler(e) {
					if (e.target.checked == true) {
						this.value = "false";
					}
				}
			}

			/**
			 * Utility function
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
				let radioButton = radioDiv.appendChild(BX.create("input", { "attrs": { "type": "radio", "id": id, "name": name } }));
				if (checked) {
					radioButton.checked = true;
				}
				radioDiv.appendChild(BX.create("label", { "attrs": { "for": id }, "text": text }));

				return radioButton;
			}


			/**
			* Utility function build Select Field
			* @function augBuildSelectField_Report
			* @param {Element} filterContainer - main filter container
			* @param {fieldObject} fieldObject - fieldName and div
			*/

			/** @var _selectFieldCounter - to count new Select Field */
			var _selectFieldCounter = 0;
			var _selectFieldFinish = 0;
			async function augBuildSelectField_Report(filterContainer, fieldObject) {
				_selectFieldCounter++; // <== Global counter

				let fieldName = fieldObject.fieldName;
				let fieldDiv = fieldObject.div;
				let fieldId = 'aug_report_filter_select_' + fieldName.toLowerCase().replace(' ', '_');
				let selectedOption = fieldDiv.querySelector("select").value;

				// Hide the original bitrix field
				fieldDiv.style.display = "none";

				// Build DataList
				timerObject = {
					testFunc: () => {
						return fieldDiv.querySelectorAll("option").length > 1;
					},
					callbackFunc: () => {
						console.log("Data arrived.");
						_selectFieldFinish++;
					}
				};

				await augAwait(100, 10, timerObject, `augBuildSelectField_Report(${fieldName})`);

				let temp = [];
				for (let each of fieldDiv.querySelectorAll("option").values()) {
					temp.push(each);
				}
				let dataList = temp.map((each) => {
					return { "value": each.value, "text": each.text };
				});

				let templateSelectField = document.querySelector("#report-chfilter-examples > div.filter-field.filter-field-crm.chfilter-field-enum");

				// Add new select field
				let newSelectFieldContainer = filterContainer.insertBefore(templateSelectField.cloneNode(true), fieldDiv.nextElementSibling);
				newSelectFieldContainer.id = fieldId;

				BX.addClass(newSelectFieldContainer, "aug-select-field");
				newSelectFieldContainer.querySelector("label").innerHTML = fieldName;

				let newSelectDiv = newSelectFieldContainer.appendChild(BX.create("span", { "attrs": { "class": "aug-select-span webform-field-textbox-inner aug-dropdown-arrow" }, "style": { "position": "relative" } }));
				let textField = newSelectDiv.appendChild(BX.create("input", { "attrs": { "class": "webform-field-textbox", "type": "text", "value": dataList[0].text } }));

				// Build dropdown
				let dropdownContainer = BX.create("div", { "attrs": { "class": `aug-dropdown-container` }, "style": { "visibility": "hidden", "position": "absolute" } });

				dataList.forEach(item => {
					let itemSelect = dropdownContainer.appendChild(BX.create("a", { "attrs": { "class": "aug-item-select", "href": "#" }, "style": { "display": "block" }, "text": item.text }));

					let itemSelectHandler = function (e) {
						this.value = item.text;
						fieldDiv.querySelector("select").value = item.value;
						dropdownContainer.style.visibility = "hidden";
						e.preventDefault();
					}
					itemSelect.addEventListener("click", itemSelectHandler.bind(textField));

					if (item.value == selectedOption) {
						itemSelect.click();
					}
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
						this.querySelectorAll("a").forEach(option => {
							option.style.display = "block";
						}); // <== Set all the option visible if text field empty.
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

				return;
			}

			/**
			 * Utility function to build select options based on authentication and department this will affect augBranchSelect variable declared above
			 * @function augBuildBranchSelectObject
			 * @param {String} userCrmRoleName - crm Role
									* @param {Object} crmDepartment - crm Department this is array of String
									* @return {Object} augBranchSelect
									*/
			function augBuildBranchSelectObject(userCrmRoleName, crmDepartment) {
				let augBranchSelect = {};

				if (userCrmRoleName == "Administrator") { // <== return full access if CrmRole is Administrator.
					augBranchSelect = augcBranchOfficeList_Report;
					return augBranchSelect;
				}

				for (let [key, value] of Object.entries(crmDepartment)) {
					if (value.toLowerCase() == "communication team" || value.toLowerCase() == "aug global") {
						augBranchSelect = augcBranchOfficeList_Report;
						return augBranchSelect;
					}
				}

				for (let [country, offices] of Object.entries(augcBranchOfficeList_Report)) {
					for (let [id, department] of Object.entries(crmDepartment)) {
						for (let office of offices) {
							if (department.includes(office)) {
								if (!augBranchSelect[country]) augBranchSelect[country] = [];
								augBranchSelect[country].push(office);
							}
						}

					}
				} // <== get access authorization based on department.

				return augBranchSelect;
			}

			/**
			 * Link a report with another report with the same fitlers.
			 * @function augLink_Report
			 * @param page_id - report id linked to current report
			 * @param buttonLabel - Label on the button
			 */
			function augLink_Report(page_id, buttonLabel) {
				let searchParams = new URL(document.URL).searchParams;
				let newURL = new URL(`https://augcrm.com/crm/reports/report/view/${page_id}/?` + searchParams);
				let button = BX.create("button", { "attrs": { "class": "ui-btn ui-btn-primary" }, "text": buttonLabel });
				document.querySelector("#pagetitle-menu").querySelector("button").insertAdjacentElement("afterend", button);
				button.addEventListener("click", (e) => {
					document.location.href = newURL;
				});
			}

		} catch (err) {
			console.error("THERE WERE SOME ERRROS OCCUR, PLEASE CHECK!!!")
			alert("THERE WERE SOME ERROR PLEASE CHECK");
			console.log(err);
		}
	});
