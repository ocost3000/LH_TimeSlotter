
function hoursToString(hours: number)
{
  let hour = Math.floor(hours)
  let minute = Math.round((hours-Math.floor(hours))*60)
  return `${String.fromCharCode(48+Math.floor(hour/10))}${String.fromCharCode(48+(hour % 10))}${String.fromCharCode(48+Math.floor(minute/10))}${String.fromCharCode(48+minute % 10)}`
}

function timeSlot(startH: number, periodNumber: number, periodDurationH: number) {
  let hours = startH + periodNumber * periodDurationH
  return hoursToString(hours)
}

function periodString(startH: number, periodNum: number, intervalH: number, durationH: number)
{
  return `${hoursToString(startH+periodNum*intervalH)} to ${hoursToString(startH+periodNum*intervalH+durationH)}`
}


function forEachRow(spreadsheetId: string, sheetname: string, context, callback)
{
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId)
  var sheet = spreadsheet.getSheetByName(sheetname)
  var range = sheet.getDataRange()
  var values = range.getValues()
  for (var i = 0; i < values.length; ++i)
  {
    callback(values[i],context)
  }
}