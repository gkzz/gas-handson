/*
Slash CommandsとGASでSlackのオリジナルコマンドをつくる
//https://qiita.com/chikuwa111/items/7a1a349b82318a5861cc

Reverse sort array of numbers then delete columns in array Google App Script
https://webapps.stackexchange.com/questions/96169/reverse-sort-array-of-numbers-then-delete-columns-in-array-google-app-script

SlackのOutgoing WebHooksとGoogleAppsScriptで簡単な会話botを作ってみた
https://qiita.com/pistaman/items/a542119ea28871960477
*/


function doGet(e){
    doPost(e);
}
  
  
function doPost(e) {
    const VERIFICATION_TOKEN = "xxxxxxxxxxxxxxx";
    var paramToken = e.parameter.token;
    if (paramToken != VERIFICATION_TOKEN) {
      throw new Error('Invalid token');
    }
    var response = generateResponse(e);
    return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
}
  
  
function generateResponse(e){
    //const ID = "aaaaaaaaaaaaaaaaaaaaaaaa";
    //const SHEET_NAME = "channels";
    //const SHEET = setUp(ID, SHEET_NAME);
    const SHEET_NAME = "<Your Sheet Name>";
    const SHEET = setUp(SHEET_NAME);
    var valueRange = getValueRange(SHEET);
    //Logger.log(valueRange);
    var msgs = "<@" + e.parameter.user_id + ">\n\n";
    for ( var i = 0; i < valueRange.length; i++ ) {
        if ( valueRange[i][2] ) {
          msgs += "<#" + valueRange[i][2] + ">  ";
          msgs += "参加者数：" + valueRange[i][3] + "\n\n";
        }
    }
    var response = { text: msgs };
    return response;
}

function setUp(SHEET_NAME){
//function setUp(ID, SHEET_NAME){
    //const SS = SpreadsheetApp.openById(ID);
    const SS = SpreadsheetApp.getActiveSpreadsheet();
    const SHEET = SS.getSheetByName(SHEET_NAME);
    return SHEET;
}

function getValueRange(SHEET) {
    const OFFSET_ROW = 1;
    const OFFSET_COLUMN = 0;
    //var LastRowOfA = getLastRowInColumn(SHEET, 1);
    //var LastColumn = ss.getLastColumn();
    //var ValueRange = SHEET.getDataRange(top, left, LastRowOfA - top, LastColumn -left).getValues();
    //var dataRange = SHEET.getDataRange();
    var valueRange = SHEET.getDataRange()
        .offset(OFFSET_ROW, OFFSET_COLUMN)
        .getValues();
    return valueRange;
}