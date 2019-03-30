/*
sources;
A bot to help you read your way through the next 4 years
https://medium.com/@venetucci/a-bot-to-help-you-read-your-way-through-next-4-years-7ba9d80066fc

Google Apps Scriptコーディングガイドライン【随時更新】
https://tonari-it.com/gas-coding-guide-line/

Work with JSON
https://developers.google.com/apps-script/guides/services/external

library key;
moment.js
MHMchiX6c1bwSqGM1PZiW_PxhMjh3Sh48

moment.js
https://tonari-it.com/gas-moment-js-moment/

*------------------ The columns is bellow; ------------------------------

0: timestamp	
1: mailAddress	
2: Assignor
3: Assignor's Department
4: Assignee1	
5: Assignee1's Department
6: Quote
7: Assignee2	
8: Assignee2's Department
9: Assignee3	
10: Assignee3's Department
11: Assignee4	
12: Assignee4's Department	
13: Assignee5	
14: Assignee5's Department
15: slack


incoming webhook URL
https://hooks.slack.com/services/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

Q. Where is "incoming webhook URL"??
A. The URL is here!!
https://api.slack.com/apps/AF6H92Q4S/incoming-webhooks?


*/


function main() {
    //*Args------------------------------------------------------------*
    const SHEET_NAME = "sheet1"; //<SheetName>
    const CHANNEL = "bot-test";
    //BOTNAME = "sample"
    const INCOMING_WEBHOOK_URL = 'https://hooks.slack.com/services/aaaaaaaaaaaaaaa/bbbbbbbbbbbb/ccccccccccccccccc';
    const FORM_URL = "https://docs.google.com/forms/d/xxxxxxxxxxx/aaaaaa"; //<Google Form URL>
    const STATUS = "Done";
    //const PTN = /.*@example.com/ //<regex>
    
    
    //*---------------writer, players, goodWork-----------------------*
    const SS = SpreadsheetApp.getActiveSpreadsheet();
    //const SHEET = SS.getSheetByName('<SheetName e.g. sheet1>');
    const SHEET = SS.getSheetByName(SHEET_NAME);
    //Logger.log('SHEET: %s', SHEET);
    //return;

    // Get data
    const VALUE_RANGE = getValueRange(SHEET);

    for ( var i = 0; i < VALUE_RANGE.length; i++ ) {
        
        Logger.log('writeConts: %s', writeConts);
       
        var value = VALUE_RANGE[i];
        if ( !value ) {
            Logger.log('Faliled!');
            Logger.log('i: %s', i);
            Logger.log('value: %s', value);
        }
        Logger.log('Successful!');
        Logger.log('i: %s', i);
        Logger.log('value: %s', value);
        return;
    }
}

function getValueRange(SHEET) {
    //If you would like to get 1st column...
    //const OFFSET_ROW = 0;
    const OFFSET_ROW = 1;
    const OFFSET_COLUMN = 0;
    //var LastRowOfA = getLastRowInColumn(SHEET, 1);
    //var LastColumn = ss.getLastColumn();
    //var ValueRange = SHEET.getDataRange(top, left, LastRowOfA - top, LastColumn -left).getValues();
    //var dataRange = SHEET.getDataRange();
    var valueRange = SHEET.getDataRange()
        .offset(OFFSET_ROW, OFFSET_COLUMN)
        .getValues();  
    Logger.log('ValueRange.length: %s', ValueRange.length); //92
    return valueRange;
}
