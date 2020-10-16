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

  students.forEach(stdnt => {
    Logger.log(`ID: ${stdnt.wID} Available: ${stdnt.availableSlots}`);
  });

}

// Declaring the Student Class
class Student {
  wID: string;
  availableSlots: number[];

  constructor(wID: string, availableSlots: number[]) {
    this.wID = wID;
    this.availableSlots = availableSlots;
  }
}

function getPossibleTimeSlots(students: Student[], numSlots: number) {
  let possibleSetups: number[] = []
  // get bit representation of value
  for (let i=0; i < Math.pow(2, numSlots)-1; ++i) {
    // i will be a numSlots-bit number

    students.forEach(student => {
      student.availableSlots.forEach(timeSlot => {
        if (i & (1 << timeSlot)) {
          // combination represented by i works
        }
        else {
          // combination represented by i does not work
        }
      })
    })
  }
}