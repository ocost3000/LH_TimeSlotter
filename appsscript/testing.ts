
function testTimeSlot()
{
  let beginTime = timeSlot(9,0,1.5)
  let endTime = hoursToString(9+1*1.5+4/3)
  console.log(beginTime)
  console.log(endTime)
  console.log(periodString(9,8,1.5,4/3))
}

function generateTestValues() {
  const form = FormApp.openById('1stnOcklDhngus8_aXodYVye9spkHZOTtZaDHpEmXp5s');
  let questions = form.getItems();
  let wID_res = questions[0].asTextItem();
  let avail_res = questions[1].asCheckboxItem();

  // Arrays for responses and individual answers to be added to responses
  let responses: GoogleAppsScript.Forms.FormResponse[] = [];
  let response_answers: GoogleAppsScript.Forms.ItemResponse[][] = [];

  // Manual data for each response
  response_answers.push([wID_res.createResponse('w123'), avail_res.createResponse(['0900 to 1020', '1200 to 1320', '1500 to 1620', '1800 to 1920', '1930 to 2050'])]);
  response_answers.push([wID_res.createResponse('w456'), avail_res.createResponse(['1030 to 1150', '1500 to 1620', '1630 to 1750'])]);
  response_answers.push([wID_res.createResponse('w789'), avail_res.createResponse(['1200 to 1320', '1630 to 1750', '1800 to 1920', '1930 to 2050'])]);
  response_answers.push([wID_res.createResponse('w000'), avail_res.createResponse(['0900 to 1020', '1200 to 1320', '1800 to 1920'])]);
  response_answers.push([wID_res.createResponse('w999'), avail_res.createResponse(['1200 to 1320', '1330 to 1450', '1930 to 2050'])]);
  response_answers.push([wID_res.createResponse('w180'), avail_res.createResponse(['0900 to 1020', '1030 to 1150', '1200 to 1320', '1330 to 1450', '1630 to 1750', '1930 to 2050'])]);

  for (let i = 0; i < 6; i++) { // Create form responses
    responses.push(form.createResponse());
    for (let j = 0; j < 2; j++) { // add question responses to each form response
      responses[i].withItemResponse(response_answers[i][j]);
    }
  }
  // Submit responses
  for (let i = 0; i < 6; i++) {
    responses[i].submit();
  }
}