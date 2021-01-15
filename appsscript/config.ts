class Config {
  numTimeSlots: number;
  maxSlots: number;
  minSlots: number;
  spreadsheetID: string;

  constructor(numTimeSlots, maxSlots, minSlots, spreadsheetID) {
    this.numTimeSlots = numTimeSlots;
    this.maxSlots = maxSlots;
    this.minSlots = minSlots;
    this.spreadsheetID = spreadsheetID;
  }
}