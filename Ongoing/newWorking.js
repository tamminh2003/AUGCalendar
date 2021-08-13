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

// let current = sumIf(resultTable, "id (unique)", "reporting intake", ["<=03/01/2021", ">=03/01/2016"])
let current = sumIf(resultTable, "id (unique)", ["[reporting intake]<=03/01/2021", "[reporting intake]>=03/01/2016"]);
console.log(current);

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
    else if (!numberRegex.test(conditionTerm) && !conditionOperator != "==") { // <== not Number -> comparing String -> must be "=="
      throw `ERROR: Can only comparing equal String, please use == operator`;
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
    for (let eachDataValue of tableData) {
      let sumValue = 0;
      loopData: for (let eachCondition of sumConditions) {
        let conditionFieldIndex = tableHeader.indexOf(eachCondition.field);
        let comparingData = eachDataValue[conditionFieldIndex];;
        if (dateRegex.test(comparingData)) { // <== if data is date -> convert to number
          let [day, month, year] = comparingData.split("\/");
          comparingData = new Date(`${year}/${month}/${day}`).valueOf();
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