let mainFilterContainer = BX("report-filter-chfilter");
let tableDiv = BX("report-result-table");
let dealPipelineIndex = getTableHeaderIndex(tableDiv, "deal pipeline");
let reportIntakeIndex = getTableHeaderIndex(tableDiv, "reporting intake");
let columnData = getTableColumnData(tableDiv, dealPipelineIndex);

let [tableHeader, tableData] = getTableData(tableDiv);
let resultTable = {
  tableDiv: tableDiv,
  tableHeader: tableHeader,
  tableData: tableData
}

let reportingIntake = getIntake("reporting intake");
let applicationIntake = getIntake("application intake");

// Reporting Intake

if (reportingIntake.mode != "all") {

  reportingIntake_current_from = reportingIntake
    .fromValue.replace(/(?!^[0-9]{2}\/[0-9]{2}}\/)[0-9]{4}$/, parseInt(reportingIntake.fromValue.split("\/")[2]) + 1);
  reportingIntake_past_to = reportingIntake
    .toValue.replace(/(?!^[0-9]{2}\/[0-9]{2}}\/)[0-9]{4}$/, parseInt(reportingIntake.toValue.split("\/")[2]) - 1);

  let current = sumIf(resultTable, "id (unique)", [`[deal pipeline]==application`, `[reporting intake]>=${reportingIntake_current_from}`, `[reporting intake]<=${reportingIntake.toValue}`]);
  let past = sumIf(resultTable, "id (unique)", [`[deal pipeline]==application`, `[reporting intake]>=${reportingIntake.fromValue}`, `[reporting intake]<=${reportingIntake_past_to}`]);

  console.log(`this year `, current);
  console.log(`last year `, past);
}

function getIntake(filterName) {
  let intake = {};

  for (let filterContainer of mainFilterContainer.querySelectorAll(".filter-field.chfilter-field-datetime:not(.aug-date-field)")) {
    let filterLabel = filterContainer.querySelector("label").innerHTML.toLowerCase();
    if (filterLabel.includes(`${filterName.toLowerCase()} \"is more than or equal to\"`)) {
      intake.fromDiv = filterContainer;
      intake.fromValue = intake.fromDiv.querySelector("input").value;
    } else if (filterLabel.includes(`${filterName.toLowerCase()} \"is less than or equal to\"`)) {
      intake.toDiv = filterContainer;
      intake.toValue = intake.toDiv.querySelector("input").value;
    }
  };
  if (intake.toValue == intake.fromValue && intake.toValue != "") {
    intake.mode = "one";
  } else if (intake.toValue == "" && intake.fromValue == "") {
    intake.mode = "all";
  } else if (intake.toValue == "" || intake.fromValue == "") {
    console.log("Something wrong. Both field should have values or none have values.");
    if (intake.fromDiv.querySelector("input").value) {
      intake.toDiv.querySelector("input").value = intake.fromDiv.querySelector("input").value;
      intake.toValue = intake.fromValue;
    }
    if (intake.toDiv.querySelector("input").value) {
      intake.fromDiv.querySelector("input").value = intake.toDiv.querySelector("input").value;
      intake.fromValue = intake.toValue;
    }
    intake.mode = "one";
  } else {
    intake.mode = "range";
  }


  return intake;
}





/**
 * Calculate the sum of a column in report table with condition.
 * @function sumIf
 * @param table - table object - Header and Data
 * @param valueField - column under sum calculation
 * @param conditions - {Array of String / String} condition(s) deciding whether to include the value to the calculation. Syntax: [conditionFields] (comparator operators) (conditions). Exp: [reporting intake]=="03/01/2021". The logic of evaluating multiple conditions are similar with AND logical operator. Exp: [reporting intake]<="03/01/2021"` AND `[reporting intake]>="03/01/2016"`]
 */
function sumIf(table, valueField, conditions) {
  let tableHeader = table.tableHeader;
  let tableData = table.tableData;
  let valueFieldIndex = tableHeader.indexOf(valueField);

  let syntaxRegex = /(?:\[)(.+)(?:\])(==|>=|<=|>|<|<>)(.*$)/ // <== matching [conditionFields] (comparator operators) (conditions)
  let dateRegex = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/;
  let numberRegex = /^[0-9][0-9]*[0-9]$/;

  // Verify parameter conditions type
  if (BX.type.isArray(conditions) && conditions.length > 0) {
    for (let [index, eachCondition] of conditions.entries()) {
      if (BX.type.isString(eachCondition) && !syntaxRegex.test(eachCondition)) {
        throw (`ERROR: Condition ${index + 1} ${eachCondition} not of syntax`);
      }
    }
  }
  else if (BX.type.isString(conditions) && !syntaxRegex.test(conditions)) {
    throw (`ERROR: Condition ${eachCondition} not of syntax`);
  }
  else if (!BX.type.isArray(conditions) || !BX.type.isString(conditions)) {
    /* sumConditions remains empty */
    throw (`ERROR: Conditions parameter should be Array of Strings or a single String`);
  }

  let sumConditions = [];
  // Verify parameter conditions.conditionField existence and type
  for (let eachCondition of conditions) {
    let [, conditionField, conditionOperator, conditionTerm] = eachCondition.match(syntaxRegex);
    if (tableHeader.indexOf(conditionField.toLowerCase()) <= (-1)) {
      throw `ERROR: ${conditionField} condition field not found`;
    }
    if (dateRegex.test(conditionTerm)) { // <== conditionTerm is Date
      let [day, month, year] = conditionTerm.split("\/");
      conditionTerm = new Date(`${year}/${month}/${day}`).valueOf(); // <== convert date to number
    }
    else if (!numberRegex.test(conditionTerm)) { // <== not Number -> comparing String -> must be "=="
      if (conditionOperator != "==") {
        throw `ERROR: Can only comparing equal String, please use == operator`;
      } else {
        conditionTerm = `"${conditionTerm.toLowerCase()}"`; // ,== convert to string with double quotes ""
      }
    }

    conditionObj = {
      "field": conditionField.toLowerCase(),
      "operator": conditionOperator,
      "term": conditionTerm
    }
    sumConditions.push(conditionObj);
  }

  let accumulator = 0
  // Iterate sumConditions with conditionFieldValue
  if (sumConditions && sumConditions.length > 0) {
    loopData: for (let eachDataValue of tableData) {
      for (let eachCondition of sumConditions) {
        let conditionFieldIndex = tableHeader.indexOf(eachCondition.field);
        let comparingData = eachDataValue[conditionFieldIndex];;
        if (dateRegex.test(comparingData)) { // <== if data is date -> convert to number
          let [day, month, year] = comparingData.split("\/");
          comparingData = new Date(`${year}/${month}/${day}`).valueOf();
        }
        else if (!numberRegex.test(comparingData)) { // <== if data is note number -> convert to string with double qutoes ""
          comparingData = `"${comparingData.toLowerCase()}"`;
        }
        let condition = `${comparingData}${eachCondition.operator}${eachCondition.term}`; // <== build condition evaluation String
        if (!eval(condition)) {
          continue loopData; // <== if not meet one condition -> next row in table
        }
      }
      accumulator += Number(eachDataValue[valueFieldIndex]);
    }

  }

  return accumulator;
}

function getColumnData(tableData, fieldIndex) {
  return tableData.map(currentValue => currentValue[fieldIndex]);
}

function getAmount(table, field, condition) {
  let tableHeader = table.tableHeader;
  let tableData = table.tableData;
  let fieldIndex = tableHeader.indexOf(field);
  let result = tableData.reduce((accumulator, currentValue) => {

    if (currentValue[fieldIndex] == condition) {
      return accumulator + 1;
    }

    return accumulator;
  }, 0);
  return result;
}

function getAmountUnique(table, uniqueField, field, condition) {
  let tableHeader = table.tableHeader;
  let tableData = table.tableData;

  let uniqueFieldMem = [];
  let fieldIndex = tableHeader.indexOf(field);
  let uniqueFieldIndex = tableHeader.indexOf(uniqueField);
  let result = tableData.reduce((accumulator, currentValue) => {
    if (!uniqueFieldMem.includes(currentValue[uniqueFieldIndex])) {
      if (currentValue[fieldIndex] == condition) {
        uniqueFieldMem.push(currentValue[uniqueFieldIndex]);
        return accumulator + 1;
      }
    }
    return accumulator;
  }, 0);
  return result;
}

function getTableHeaderIndex(table, field) {
  let header = Array.from(table.querySelector("thead").querySelectorAll("th")).map(header => header.innerText.toLowerCase());
  return header.indexOf(field);
}

function getTableData(table) {
  let tableHeader = Array.from(table.querySelectorAll("thead > tr > th")).map(th => th.innerText.toLowerCase());
  let tableData = Array.from(table.querySelectorAll("tbody > tr.reports-list-item")).map(tr => {
    return Array.from(tr.querySelectorAll("td")).map(td => td.innerText.toLowerCase());
  });
  return [tableHeader, tableData];
}

function getApplicationDataOnly(tableData) {
  return tableData;
}

function getTableColumnData(table, fieldIndex) {
  return Array.from(table.querySelectorAll(`tbody tr td:nth-child(${fieldIndex + 1})`)).map(row => row.innerText.toLowerCase());
}