/*
let num_slots = 8;
let START_ROW = 2;
let START_COLN = 5;
let max_slots = 4;
let min_slots = 2;
*/

// web link: https://script.google.com/a/apps.losrios.edu/macros/s/AKfycbxtsODTqdSRFxSQHppASGJBHeIv2xCP3nZC47iG0mYq/dev

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index'); 
}

function getNumConfigs(spreadsheetID) {
  // get config
  let configSheet = SpreadsheetApp.openById(spreadsheetID).getSheetByName('Config');
  let configData: any[][] = configSheet.getRange(1, 1, 3, 1).getValues();
  let numSlots = configData[0][0];
  let maxSlots = configData[1][0];
  let minSlots = configData[2][0];
  let config: Config = new Config(numSlots, maxSlots, minSlots, spreadsheetID);
  const possibleTimeSlots: number[] = parseAvailability(config);
  return possibleTimeSlots.length;
}