const NUM_TIME_SLOTS = 8;
const START_ROW = 2;
const START_COLN = 5;
const MAX_SLOTS = 4;
const MIN_SLOTS = 2;

function parseAvailability() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Obtaining the IDs of students
  const rawIdValues: string[][] = sheet.getRange(START_ROW, 3, sheet.getLastRow()-1, 1).getValues();
  Logger.log(`Last Row: ${sheet.getLastRow()}`);
    // Convert to 1D Array
  let idArr: string[] = [];
  for (let row in rawIdValues) {
    idArr.push(rawIdValues[row][0]);
  }
  Logger.log(`ID array: ${idArr}`);
  // Get availability in 2D array
  const availabilityRange = sheet.getRange(START_ROW, START_COLN, sheet.getLastRow()-1, NUM_TIME_SLOTS);
  const availabilities = availabilityRange.getValues();

  // Instantiate all students
  let students: Student[] = [];
  idArr.forEach((id, pos) => {
    // make student with id and corresponding availability row
    // the rows are stored in availabilities, in order
    // use pos to increment thru availabilities
    students.push(new Student(id, availabilities[pos]));
  });

  // Get possible timeslots, given max and min
  let possibleTimeSlots: number[] = getPossibleTimeSlots(students);
  Logger.log(`Acceptable: ${possibleTimeSlots.length} out of ${Math.pow(2, NUM_TIME_SLOTS)}`);


}

function getPossibleTimeSlots(students: Student[]) {
  let possibleSetups: number[] = [];
  let setupWorks: Boolean = false;
  let studentWorks: Boolean = false;
  let setBits = 0;
  /* 
    i will be a NUM_TIME_SLOTS-bit number
    Each bit represents yes or no on a specific slot
    So for numSlots = 4 and i = 10 = 0b1010:
    slot 1 is no, slot 2 is yes, slot 3 is no, and slot 4 is yes

  */
  for (let i=1; i < Math.pow(2, NUM_TIME_SLOTS); ++i) {

    //skip setup if too much or too little time slots
    let setBits = getSetBits(i)
    if ((setBits > MAX_SLOTS) || (setBits < MIN_SLOTS)) {
      continue;
    }

    // Test if setup works with all students
    setupWorks = students.every(currStudent => {
      // test if setup has at least one slot for specific student
      studentWorks = currStudent.availableSlots.some((avail, j) => {
        if (!avail) { 
          // student is not available at this slot
          return false;
        } else { 
          // student is available
          if ((i & (1 << j)) == 0) {
            // combination i does not offer this slot, false
            return false;
          } else {
            // combination works for this slot
            return true;
          }
        }
      });
      return studentWorks;
    });
    if (setupWorks) {
      Logger.log(`The setup ${i}: ${i.toString(2)} works with all students`);
      possibleSetups.push(i);
    }   
  }
  return possibleSetups;
}

function getSetBits(num: number) {
  let x: number;
  for (x = 0; num != 0; x++) {
    num = num & (num-1);
  }
  return x;
}
  