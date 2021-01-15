function parseAvailability(config: Config): number[] {
  const sheet = SpreadsheetApp.openById(config.spreadsheetID).getSheetByName("Availability Data");

  // Obtaining the IDs of students
  const rawIdValues: string[][] = sheet.getRange(START_ROW, 2, sheet.getLastRow()-START_ROW+1, 1).getValues();
  Logger.log(`Last Row: ${sheet.getLastRow()}`);
  // Convert to 1D Array
  let idArr: string[] = rawIdValues.map(idRow => idRow[0]);
  Logger.log(`ID array: ${idArr}`);
  // Get availability in 2D array
  const availabilityRange: SheetRange = sheet.getRange(START_ROW, START_COLN, sheet.getLastRow()-START_ROW+1, config.numTimeSlots);
  const availabilities: number[][] = availabilityRange.getValues();

  // Instantiate all students
    // construct student with id and corresponding availability row
    // the rows are stored in availabilities, in order
  let students: Student[] = idArr.map((id, pos) => new Student(id, availabilities[pos]));

  // Get possible timeslots, given max and min
  let possibleTimeSlots: number[] = getPossibleTimeSlots(config, students);
  Logger.log(`Possible Time Slots: ${possibleTimeSlots.length}`);
  storePossibleSetups(config, possibleTimeSlots);
  return possibleTimeSlots;
}

function getPossibleTimeSlots(config: Config, students: Student[]): number[] {
  let possibleSetups: number[] = [];
  /* 
    i will be a NUM_TIME_SLOTS-bit number
    Each bit represents yes or no on a specific slot
    So for numSlots = 4 and i = 10 = 0b1010:
    Slot 1 is rightmost digit, and slot 4 is leftmost digit
    slot 1 is no, slot 2 is yes, slot 3 is no, and slot 4 is yes
  */

  const doTheMath = (x) => {
    let setupWorks = false;
    //skip setup if too much or too little time slots
    let setBits = getSetBits(x);
    if ((setBits <= config.maxSlots) && (setBits >= config.minSlots)) {
      // Test if setup works with all students
      setupWorks = students.every(currStudent => {
        // test if setup has at least one slot for specific student
        let studentWorks = currStudent.availableSlots.some((avail, j) => {
          return ((avail) && ((x & (1 << j)) != 0))
        });
        return studentWorks;
      });
    }
    return setupWorks;
  }

  for (let i=1; i < Math.pow(2, config.numTimeSlots); ++i) {
    if (doTheMath(i)) {
      Logger.log("The setup " + i + ": " + i.toString(2) + " works with all students");
      possibleSetups.push(i);
    }
  }
  return possibleSetups;
}

function getSetBits(num: number): number {
  let x: number;
  for (x = 0; num != 0; x++) {
    num = num & (num-1);
  }
  return x;
}
  

function storePossibleSetups(config: Config, possibleSetups: number[]) {
  /*
  place the values in spreadsheet
  */
  let ss = SpreadsheetApp.openById(config.spreadsheetID);
  let setupSheet = ss.getSheetByName(SETUPS_SHEET_NAME);
  if (setupSheet == null) { // check existence
    setupSheet = ss.insertSheet(SETUPS_SHEET_NAME);
  }
  
  // copy time slot labels from avail sheet to new setup sheet
  let timeSlots: string[] = ss.getSheetByName(AVAIL_SHEET_NAME).getRange(1, 3, 1, config.numTimeSlots).getValues()[0];
  setupSheet.getRange(1, 2, 1, config.numTimeSlots).setValues([timeSlots]);

  // iterate through possible setups, filling in data
  let setupArray: string[][] = [];
  possibleSetups.forEach((setup, index) => {
    setupArray.push([`Setup ${index+1}`]);
    for (let i = 0; i < config.numTimeSlots; i++) {
      setupArray[index].push(((setup & (1 << i)) != 0) ? "x" : "");
    }
  });
  // insert to range
  let setupRange: SheetRange = setupSheet.getRange(2, 1, possibleSetups.length, 5);
  setupRange.setValues(setupArray);
  setupRange.setHorizontalAlignment("center");

  // color code
  //search range
  let setupAsRanges: SheetRange[] = setupRange.createTextFinder("x").findAll();
  setupAsRanges.forEach(setupRange => {
    setupRange.setBackground('#90EE90');
  })
}