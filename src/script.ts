function calculate() {

  console.log(`HTML Script executed`);
  if (((<HTMLInputElement>document.getElementById("num-slots")).value).length == 0) {
    console.log(`Need input please`);
  } else {
    // constraints
    let numSlots: number = parseInt((<HTMLInputElement>document.getElementById("num-slots")).value);
    let maxSlots: number = parseInt((<HTMLInputElement>document.getElementById("max-slots")).value);
    let minSlots: number = parseInt((<HTMLInputElement>document.getElementById("min-slots")).value);

    // spreadsheet info
    let startRow: number = parseInt((<HTMLInputElement>document.getElementById("row-start")).value);
    let startColn: number = parseInt((<HTMLInputElement>document.getElementById("coln-start")).value);
    let spreadsheetID: string = (<HTMLInputElement>document.getElementById("spreadsheet-id")).value;
    let sheetName: string = (<HTMLInputElement>document.getElementById("sheet-name")).value;

    // create config class
    google.script.run.setConfig(numSlots, maxSlots, minSlots, startRow, startColn, spreadsheetID, sheetName);
  }
  
}

function test() {
  google.script.run.userClicked();
}