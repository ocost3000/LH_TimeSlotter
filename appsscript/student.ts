// Declaring the Student Class
class Student {
  wID: string;
  availableSlots: number[];
  binAvailability: number;

  constructor(wID: string, availableSlots: number[]) {
    this.wID = wID;
    this.availableSlots = availableSlots;
  }
}