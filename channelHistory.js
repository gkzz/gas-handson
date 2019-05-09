function main() {
    /*-------Args----------------------------------------------*/
    // cf. channel url = "https://<YOUR_SLACK_TEAM>.slack.com/messages/<CHANNEL_ID>"";
    const SLACK_TEAM = "xxxxxxxxxxxx"; //<YOUR_SLACK_TEAM>
    const SLACK_TOKEN = "xoxp-xxxxxxxxxxxxxxxxxxxxxxxxxxx";
    const CHANNEL_ID = "xxxxxxxxxxxx"; //<CHANNEL_ID>
    const BASE_URL = "https://" + SLACK_TEAM + ".slack.com/api/channels.history?";
    const SHEET_NAME = "sheet1"; //<SheetName>
    const COLUMN_NUMBER_TIMESTAMP = 1;
    const COLUMN_NUMBER_USER = 2;
    const COLUMN_NUMBER_TEXT = 3;
    const COLUMN_NUMBER_LINK = 4;
    //取得期間
    var period = 8;
    /*---------------------------------------------------------*/
    
    /*--------InitialSetUp--------------------------------------------------------------------------*/
    const SS = SpreadsheetApp.getActiveSpreadsheet();
    const SHEET = SS.getSheetByName(SHEET_NAME);
    var lastrow = SHEET.getLastRow();
    /*---------------------------------------------------------*/
    
    var messages = JSON.parse(
        getSlackLog(SLACK_TOKEN, CHANNEL_ID, BASE_URL, period)
    ).messages.reverse();
    
    if ( !messages ) {
        return;
    }
    //Logger.log(messages);
    //return;
    
    setSlackLog(messages, SHEET, lastrow, 
                COLUMN_NUMBER_TIMESTAMP, COLUMN_NUMBER_USER, COLUMN_NUMBER_TEXT, COLUMN_NUMBER_LINK);
}


/**
* setSlackLog Function
*
* properties in the objects/rows
* @param {string} token
* @param {string} id  
* @param {string} url
* @param {int} days
* @return {string} requestUrl - url with payload 
*/
function getSlackLog(token, id, url, days) {
    var payload = {
      // Slack Token
      'token': token,
      // Channel ID
      'channel': id,
      // 24 Hours/day * 8 days
      'oldest': parseInt( new Date() / 1000 ) - (60 * 60 * 24 * days)
    }
    
    // URL Of Param 
    var params = [];
    for (var key in payload) {
        params.push(key + '=' + payload[key]);
    }
    var requestUrl = url + params.join('&');
    return UrlFetchApp.fetch(requestUrl);
}

/**
* setSlackLog Function
*
* properties in the objects/rows
* @param {string} array - JSON.parse(getSlackLog(SLACK_TOKEN, CHANNEL_ID, REQUEST_URL)).messages.reverse();
* @param {string} sheetObj - SHEET of Activaed SpreadsheetAppObj
* @param {string} lastrow - last row of sheet
* @param {string} columnNumberTs - 1
* @param {string} columnNumberText - 2
* @param {string} columnNumberLink - 3
*/
function setSlackLog(array, sheetObj, lastrow, 
                    columnNumberTs, columnNumberUser, columnNumberText, columnNumberLink) {
    // Log messages on SpreadSheet
    for ( var i = 0; i < array.length; i++ ){
        Logger.log("array[i].user: %s", array[i].user);
      
        // DateTime
        sheetObj.getRange(lastrow + i + 1, columnNumberTs)
            .setValue(getMomentDateTime(array[i].ts, true));
        // UserId
        sheetObj.getRange(lastrow + i + 1, columnNumberUser)
            .setValue(array[i].user);
        // Text
        sheetObj.getRange(lastrow + i + 1, columnNumberText)
            .setValue(array[i].text);
        // (Link)
        /*
        if (array[i].attachments) {
            for (var j = 0; j < arrat[i].attachments.length; j++ ) {
                sheetObj.getRange(lastrow + i + 1, columnNumberLink)
                    .setValue(
                        array[i].attachments[j].title 
                        + String.fromCharCode(10) 
                        + array[i].attachments[j].title_link
                    );
            }
        }
        */
    }
}


/**
* getMomentDateTime Function
*
* properties in the objects/rows
* @param {string} dateObj 
* @param {string} isYear timestamp with year, or not
* @return {string} 'YYYY/MM/DD(ddd) HH:mm:ss'
*/
function getMomentDateTime(dateObj, isYear) {
    //Logger.log(obj);
    // Register lang:ja
    Moment.moment.lang(
      'ja', {
        weekdays: ["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"],
        weekdaysShort: ["日","月","火","水","木","金","土"],
      }
    );
    if ( isYear ) {
        return Moment.moment(dateObj * 1000)
            .format('YYYY/MM/DD(ddd) HH:mm:ss');
    } else {
        return Moment.moment(dateObj * 1000)
            .format('MM/DD(ddd) HH:mm:ss');
    }
    
}