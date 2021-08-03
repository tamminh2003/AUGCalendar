let currentStatusArray = Array.from(document.querySelector(`#CRM_DEAL_${augcElementIDs["Deal"]["Current Status"]}\\[0\\]`)
  .querySelectorAll("option")).map(option => option.innerHTML.toLowerCase());


let tableDiv = BX("report-result-table");
let dealPipelineIndex = getTableHeaderIndex(tableDiv, "deal pipeline");
let leadIdIndex = getTableHeaderIndex(tableDiv, "lead: id");
let columnData = getTableColumnData(tableDiv, dealPipelineIndex);

let [tableHeader, tableData] = getTableData(tableDiv);
let resultTable = {
  tableDiv: tableDiv,
  tableHeader: tableHeader,
  tableData: tableData
}

let applicantNumber = getAmountUnique(resultTable, 'lead: id', 'deal pipeline', 'application');
let acceptanceNumber = getAmountUnique(resultTable, 'lead: id', 'deal pipeline', 'acceptance - vic');
let closedNumber = getAmount(resultTable, 'closed', 'yes');
let currentStatusNumber = [];
for (let [index, value] of currentStatusArray) {
  currentStatusNumber[index] = getAmount(table, 'current status', value.toLowerCase());
}
console.log(table);
console.log({ applicantNumber });
console.log({ acceptanceNumber });
console.log({ closedNumber });
console.log({ currentStatusNumber });

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
  let tableData = Array.from(table.querySelectorAll("tbody > tr")).map(tr => {
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