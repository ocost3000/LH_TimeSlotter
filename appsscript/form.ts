
// make trigger
function setUpTrigger() {
  ScriptApp.newTrigger('convertFormSubmit')
  .forSpreadsheet('10T2cxCzsibZNmt8Hdq7aNFgXpkKQFLPXTeLxJlJbV_U')
  .onFormSubmit()
  .create();
}

function convertFormSubmit() {
  // Get the last row, and use it to convert submission into values
  
  // hard encode the num of timeslots for now...

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow: number = sheet.getLastRow(); 
  
  // Get submission responses in one string
  const submission = sheet.getRange(lastRow, 2).getValue();
  // Get all possible time slots in an array
  // * this could be constant since its for the whole sheet
  const possibleSlots: string[] = sheet.getRange(1, START_COLN, 1, NUM_TIME_SLOTS).getValues()[0];
  // set student availability in array of boolean values
  let studentAvailability: number[] = [];
  // fill out student availability based on string search
    // 0 is unavailable, 1 is available
  possibleSlots.forEach( timeSlot => {
    if (submission.search(timeSlot) != -1) {
      // time slot is unavailable
      studentAvailability.push(0);
    } else {
      // time slot is available
      studentAvailability.push(1);
    }
  });
  // Get availability for new submission row
  let newAvailability = sheet.getRange(lastRow, START_COLN, 1, NUM_TIME_SLOTS);
  newAvailability.setValues([studentAvailability]);
}