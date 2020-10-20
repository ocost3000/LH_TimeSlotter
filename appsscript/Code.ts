// Main function
function myFunction() {
  const sheet = SpreadsheetApp.getActiveSheet()

  // Obtaining the IDs of students
  const idRange = sheet.getRange("A3:A10");
  const idValues = idRange.getValues();
    // Convert to 1D Array
  let idArr: string[] = [];
  for (let row in idValues) {
    idArr.push(idValues[row][0]);
  }

  // Hard encode the number of time slots
  const timeSlots = 4
  // Get availability in 2D array
  const availabilityRange = sheet.getRange(3, 3, idArr.length, timeSlots);
  const availabilities = availabilityRange.getValues();

  // Instantiate all students
  let students: Student[] = [];
  let pos = 0;
  idArr.forEach(id => {
    // make student with id and corresponding availability row
    // the rows are stored in availabilities, in order
    // use pos to increment thru availabilities
    students.push(new Student(id, availabilities[pos]));
    pos++;
  });

  /*
  students.forEach(stdnt => {
    Logger.log(`ID: ${stdnt.wID} Available: ${stdnt.availableSlots}`);
  });
  */

  let possibleTimeSlots = getPossibleTimeSlots(students, timeSlots);
  possibleTimeSlots.forEach((x) => {
    Logger.log(`${x.toString(2)}`);
  })
}

// Declaring the Student Class
class Student {
  wID: string;
  availableSlots: number[];
  binAvailability: number;

  constructor(wID: string, availableSlots: number[]) {
    this.wID = wID;
    this.availableSlots = availableSlots;
    this.binAvailability = 0;
    for (let i = 0; i < availableSlots.length; i++) {
      this.binAvailability += availableSlots[i] * Math.pow(2, i);
    }
  }
}

// New
function getPossibleTimeSlots(students: Student[], numSlots: number) {
  let possibleSetups: number[] = [];
  let setupWorks: Boolean = false;
  /* 
    i will be a numSlots-bit number
    Each bit represents yes or no on a specific slot
    So for numSlots = 4 and i = 10 = 0b1010:
    slot 1 is no, slot 2 is yes, slot 3 is no, and slot 4 is yes

    binAvailability follows this convention
  */
  for (let i=1; i < Math.pow(2, numSlots); ++i) {
    // Test if setup works with all students
    setupWorks = students.every(currStudent => {
      let x: Boolean = (i & currStudent.binAvailability) != 0;
      // Logger.log(`Result of comparison of ${i.toString(2)} and ${currStudent.wID} availability of ${currStudent.binAvailability.toString()}: ${x}`);
      return x;
    });
    if (setupWorks) {
      possibleSetups.push(i);
    }   
  }
  return possibleSetups;
}

/* original
function getPossibleTimeSlots(students: Student[], numSlots: number) {
  let possibleSetups: number[] = [];
  // get bit representation of value
  for (let i=0; i < Math.pow(2, numSlots)-1; ++i) {
    // i will be a numSlots-bit number

    students.forEach(student => {
      student.availableSlots.forEach(timeSlot => {
        // What is going on?? Lets find out
        Logger.log(`int val of i: ${i}\nbinary val of i: ${i.toString(2)}\nVal of timeSlot: ${timeSlot}\nVal of (1 << timeSlot): ${1 << timeSlot}\nVal of (i & (1 << timeSlot)): ${i & (1 << timeSlot)}\n`);
        if (i & (1 << timeSlot)) {
          // combination represented by i works
        }
        else {
          // combination represented by i does not work
        }
      })
    })
  }
  return possibleSetups;
}
*/ 