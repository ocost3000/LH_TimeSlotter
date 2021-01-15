// As defined per the Form Generator
const START_ROW = 2;
const START_COLN = 3;
const CONFIG_SHEET_NAME = "Config";
const AVAIL_SHEET_NAME = "Availability Data";
const SETUPS_SHEET_NAME = "Setups";

// Define types aliases so that types are more readable
type Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
type Sheet = GoogleAppsScript.Spreadsheet.Sheet;
type SheetRange = GoogleAppsScript.Spreadsheet.Range;
type Form = GoogleAppsScript.Forms.Form;
type Choice = GoogleAppsScript.Forms.Choice;

type DriveFolder = GoogleAppsScript.Drive.Folder;
type DriveFile = GoogleAppsScript.Drive.File;
