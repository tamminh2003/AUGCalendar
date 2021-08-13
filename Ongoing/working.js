// let currentStatusArray = Array.from(document.querySelector(`#CRM_DEAL_${augcElementIDs["Deal"]["Current Status"]}\\[0\\]`)
//   .querySelectorAll("option")).map(option => option.innerHTML.toLowerCase());

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


chartData = [
  { 'Application': 'Applicant', 'Amount 2020' : uniqueApplicantNumber_lastYear, 'Amount 2021' : uniqueApplicantNumber_thisYear}, 
  { 'Application': 'Acceptance', 'Amount 2020' : uniqueAcceptanceNumber_lastYear, 'Amount 2021' : uniqueAcceptanceNumber_thisYear}
]
drawChart(chartData);

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

function drawChart(data) {
  var amChartData = { 'err': '0', 'type': 'column', 'width': '670', 'height': '420', 'data': data, 'categoryField': 'Application', 'categoryType': 'string', 'valueFields': ['Amount 2020', 'Amount 2021'], 'valueTypes': ['integer', 'integer'], 'valueColors': ['#6699CC', '#ff80ed'] };
  var chartType = amChartData["type"];
  var valueFields = amChartData["valueFields"];
  var valueColors = amChartData["valueColors"];

  var i, value;
  if (BX.type.isNotEmptyString(amChartData['categoryField'])
    && amChartData['categoryType'] === 'money'
    && BX.type.isArray(amChartData['data'])) {
    var ta = BX.create('TEXTAREA');
    for (i = 0; i < amChartData['data'].length; i++) {
      value = amChartData['data'][i][amChartData['categoryField']];
      if (BX.type.isNotEmptyString(value)) {
        ta.innerHTML = value;
        amChartData['data'][i][amChartData['categoryField']] = ta.textContent;
      }
    }
    ta = null;
  }
  i = value = null;

  // CHART
  var chart = null;
  if (chartType === "pie") {
    chart = new AmCharts.AmPieChart();
  }
  else {
    chart = new AmCharts.AmSerialChart();
  }
  chart.dataProvider = amChartData["data"];
  chart.numberFormatter = {
    precision: -1,
    decimalSeparator: '.',
    thousandsSeparator: ' '
  };
  chart.percentFormatter = {
    precision: 2,
    decimalSeparator: '.',
    thousandsSeparator: ' '
  };
  chart.zoomOutText = "Show all";

  if (chart.dataProvider !== null && BX.type.isArray(chart.dataProvider) && chart.dataProvider.length > 0) {
    for (var i = 0; i < chart.dataProvider.length; i++) {
      if (chart.dataProvider[i][amChartData["categoryField"]] !== "") {
        chart.dataProvider[i]["__BN__TITLE__"] =
          BX.util.htmlspecialchars(chart.dataProvider[i][amChartData["categoryField"]]);
      }
    }
  }

  if (chartType === "pie") {
    chart.addTitle(amChartData["categoryField"] + ": " + valueFields[0]);
    chart.titleField = amChartData["categoryField"];
    chart.valueField = valueFields[0];
    chart.outlineAlpha = 0.8;
    chart.outlineThickness = 0;
    chart.balloonText = "<div>[[__BN__TITLE__]]: [[percents]]%</div>" + BX.util.htmlspecialchars(valueFields[0]) +
      ": <b>[[value]]</b>";
    chart.colors = valueColors;
    chart.groupedTitle = "Other";
  }
  else {
    chart.categoryField = amChartData["categoryField"];
  }
  chart.startDuration = 1;
  if (chartType === "column" || chartType === "pie") {
    chart.depth3D = 15;
    chart.angle = 30;
  }
  if (chartType === "line" || chartType === "column") {
    // AXES X
    var categoryAxis = chart.categoryAxis;
    var categoryType = "string";
    categoryAxis.labelRotation = 45;
    if (chartType === 'column') {
      categoryAxis.gridPosition = "start";
    }
    categoryAxis.title = amChartData["categoryField"];
    if (chartType === "line"
      && (amChartData["categoryType"] === "date" || amChartData["categoryType"] === "datetime")) {
      categoryType = "date";
      categoryAxis.dateFormats = [
        { period: "fff", format: "JJ:NN:SS" },
        { period: "ss", format: "JJ:NN:SS" },
        { period: "mm", format: "JJ:NN" },
        { period: "hh", format: "JJ:NN" },
        { period: "DD", format: "DD.MM" },
        { period: "WW", format: "DD.MM" },
        { period: "MM", format: "MM.YYYY" },
        { period: "YYYY", format: "MM.YYYY" }
      ];
      categoryAxis.parseDates = true;
      categoryAxis.minPeriod = "DD";
    }

    // VALUE
    for (var i = 0; i < valueFields.length; i++) {
      // GRAPH
      var graph = new AmCharts.AmGraph();
      graph.title = valueFields[i];
      graph.valueField = valueFields[i];
      graph.balloonText = BX.util.htmlspecialchars(valueFields[i]) + ": <b>[[value]]</b>";
      graph.type = chartType;
      graph.lineAlpha = 0.8;
      graph.lineColor = valueColors[i];
      if (chartType === "column") {
        graph.fillAlphas = 0.8;
      }
      if (chartType === "line") {
        graph.bullet = "round";
        graph.hideBulletsCount = 30;
        graph.bulletBorderThickness = 1;
      }
      chart.addGraph(graph);
    }

    // CURSOR
    var chartCursor = new AmCharts.ChartCursor();
    //chartCursor.zoomable = false;
    if (chartType === "line") {
      chartCursor.cursorAlpha = 0.8;
      chartCursor.cursorPosition = "mouse";
      if (categoryType === "string") {
        chartCursor.categoryBalloonFunction = function (value) {
          if (BX.type.isNotEmptyString(value)) {
            return BX.util.htmlspecialchars(value);
          }
          else {
            return value;
          }
        };
      }
      else if (categoryType === "date") {
        chartCursor.categoryBalloonDateFormat = "DD.MM.YYYY";
      }
    }
    else if (chartType === 'column') {
      chartCursor.cursorAlpha = 0;
      chartCursor.categoryBalloonEnabled = false;
    }
    chart.addChartCursor(chartCursor);
  }

  // LEGEND
  var legend = new AmCharts.AmLegend();
  legend.align = "left";
  legend.markerType = "square";
  legend.valueWidth = 120;
  //legend.useMarkerColorForValues = true;

  chart.addLegend(legend);
  // WRITE
  chart.write("report-chart-container");
}

