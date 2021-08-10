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

let resultTable_lastYear = {
  tableDiv: tableDiv,
  tableHeader: tableHeader,
  tableData: tableData.filter(currentValue => {
    return currentValue[tableHeader.indexOf('reporting intake')] == '01/03/2020'; // TODO: make this dynamic of current value of reporting intake filter 
  })
};

let resultTable_thisYear = {
  tbaleDiv: tableDiv,
  tableHeader: tableHeader,
  tableData: tableData.filter(currentValue => {
    return currentValue[tableHeader.indexOf('reporting intake')] == '01/03/2021'; // TODO: make this dynamic of current value of reporting intake filter 
  })
};

let uniqueApplicantNumber_lastYear = getAmountUnique(resultTable_lastYear, 'lead: id', 'deal pipeline', 'application');
let uniqueApplicantNumber_thisYear = getAmountUnique(resultTable_thisYear, 'lead: id', 'deal pipeline', 'application');
let uniqueApplicantNumber_diff = uniqueApplicantNumber_thisYear - uniqueApplicantNumber_lastYear;
let uniqueApplicantNumber_diff_percent = Math.round(uniqueApplicantNumber_diff / uniqueApplicantNumber_lastYear * 100);

let uniqueAcceptanceNumber_lastYear = getAmountUnique(resultTable_lastYear, 'lead: id', 'deal pipeline', 'acceptance - vic');
let uniqueAcceptanceNumber_thisYear = getAmountUnique(resultTable_thisYear, 'lead: id', 'deal pipeline', 'acceptance - vic');
let uniqueAcceptanceNumber_diff = uniqueAcceptanceNumber_thisYear - uniqueAcceptanceNumber_lastYear;
let uniqueAcceptanceNumber_diff_percent = Math.round(uniqueAcceptanceNumber_diff / uniqueAcceptanceNumber_lastYear * 100);

let closedNumber_thisYear = getAmount(resultTable_thisYear, 'closed', 'yes');

let currentStatusNumber = [];
for (let [index, value] of currentStatusArray.entries()) {
  currentStatusNumber[index] = getAmount(resultTable_thisYear, 'current status', value.toLowerCase());
}

let totalApplication = currentStatusNumber.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

let currentStatusList = {}
for (let index = 0; index < currentStatusArray.length; index++) {
  currentStatusList[currentStatusArray[index]] = currentStatusNumber[index];
}

let augReportData = [
  "Australia", // TODO change this to match the current branch and country
  "Melbourne", // TODO change this to match the branch
  `${uniqueApplicantNumber_thisYear} (${uniqueApplicantNumber_lastYear} ${uniqueApplicantNumber_diff_percent}%)`,
  `${uniqueAcceptanceNumber_thisYear} (${uniqueAcceptanceNumber_lastYear} ${uniqueAcceptanceNumber_diff_percent}%)`,
  `${uniqueApplicantNumber_thisYear}`, // TODO change this for accepted value
  `${closedNumber_thisYear}`,
  `0`,
  `0`,
  `0`,
  `0`,
  `${closedNumber_thisYear}`,
  `${totalApplication}`,
  `${Math.round(uniqueAcceptanceNumber_thisYear / uniqueApplicantNumber_thisYear * 100)}%`,
  `${Math.round(uniqueAcceptanceNumber_thisYear / totalApplication * 100)}%`,
  `x`,
  `x`,
  `x`,
];

let parser = new DOMParser();
let tableString = `
<table class="aug-report-result-table">
  <tr>
    <th rowspan="2">Country</th>
    <th rowspan="2">Branch</th>
    <th rowspan="2">Applicant</th>
    <th rowspan="2">Accepted</th>
    <th rowspan="2">Accepted Value</th>
    <th rowspan="2">Closed</th>
    <th colspan="6">Applications</th>
    <th colspan="2">Conversion Rate</th>
    <th colspan="3">Branch Target</th>
  </tr> 
  <tr>
    <th>Pending / In Process</th>
    <th>Uncond</th><th>Cond</th>
    <th>Reject</th><th>Closed</th>
    <th>Total</th> 
    <th>per Applicant</th> 
    <th>per Application</th> 
    <th>MAT</th> <th>RAT</th>
    <th>HAT</th>
  </tr>
  <tr class="aug-report-result-row">
    <td class="aug-report-result-data">${augReportData[0]}</td>
    <td class="aug-report-result-data">${augReportData[1]}</td>
    <td class="aug-report-result-data">${augReportData[2]}</td>
    <td class="aug-report-result-data">${augReportData[3]}</td>
    <td class="aug-report-result-data">${augReportData[4]}</td>
    <td class="aug-report-result-data">${augReportData[5]}</td>
    <td class="aug-report-result-data">${augReportData[6]}</td>
    <td class="aug-report-result-data">${augReportData[7]}</td>
    <td class="aug-report-result-data">${augReportData[8]}</td>
    <td class="aug-report-result-data">${augReportData[9]}</td>
    <td class="aug-report-result-data">${augReportData[10]}</td>
    <td class="aug-report-result-data">${augReportData[11]}</td>
    <td class="aug-report-result-data">${augReportData[12]}</td>
    <td class="aug-report-result-data">${augReportData[13]}</td>
    <td class="aug-report-result-data">${augReportData[14]}</td>
    <td class="aug-report-result-data">${augReportData[15]}</td>
    <td class="aug-report-result-data">${augReportData[16]}</td>
  </tr>
</table>`;

let tableDom = parser.parseFromString(tableString, "text/html");

document.querySelector("#workarea-content > div > div.reports-result-list-wrap").appendChild(tableDom.querySelector("table"));
document.querySelector("#workarea-content > div > div.reports-result-list-wrap > .report-table-wrap").style.display = "none";


// ==============================================================
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

