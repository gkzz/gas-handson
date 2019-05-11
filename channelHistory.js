function main() {
    /*-------Args----------------------------------------------*/
    const SLACK_TEAM = "xxxxxx";  //<YOUR_SLACK_TEAM>
    const SLACK_TOKEN = "xoxp-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
    // cf. channel url = "https://<YOUR_SLACK_TEAM>.slack.com/messages/<YOUR_CHANNEL_ID>"";
    const CHANNEL_ID = "CFTS3H5AQ"; //<YOUR_CHANNEL_ID>
    const BASE_URL = "https://" + SLACK_TEAM + ".slack.com/api/channels.history?";
    const SHEET_NAME = "sheet1"; //<SheetName>
    const COLUMN_NUMBER_TIMESTAMP = 1;
    const COLUMN_NUMBER_USER = 2;
    const COLUMN_NUMBER_TEXT = 3;
    const COLUMN_NUMBER_LINK = 4;

    //スプレッドシートに書き出す投稿日時のフォーマット(年有り)
    var isYear = true;
    
    //スプレッドシートに書き出す投稿日時のフォーマット(年無し)
    //var isYear = false;
    

  　//取得期間
    var period = 8;
    /*---------------------------------------------------------*/
    
    /*--------InitialSetUp--------------------------------------------------------------------------*/
    const SHEET = SpreadsheetApp.getActiveSpreadsheet()
        .getSheetByName(SHEET_NAME);
    var lastrow = SHEET.getLastRow();
    /*---------------------------------------------------------*/
  
    /*
    params = [
      SLACK_TOKEN, CHANNEL_ID, BASE_URL, period
    ];
    for ( var i = 0; i < params.length; i++ ) {
        Logger.log("typeof params[i]: %s", typeof params[i]);
    }
    return;
    */
    
    
    var messages = JSON.parse(
        getSlackLog(SLACK_TOKEN, CHANNEL_ID, BASE_URL, period)
    )
    .messages
    .reverse();
    
    if ( !messages ) {
        return;
    }
    //Logger.log(typeof messages);
    //return;
    
    /*
    params = [
      messages, SHEET, lastrow, COLUMN_NUMBER_TIMESTAMP, COLUMN_NUMBER_USER, COLUMN_NUMBER_TEXT, COLUMN_NUMBER_LINK
    ];
    for ( var i = 0; i < params.length; i++ ) {
        Logger.log("typeof params[i]: %s", typeof params[i]);
    }
    return;
    */
  
    setSlackLog(messages, SHEET, lastrow, 
                COLUMN_NUMBER_TIMESTAMP, COLUMN_NUMBER_USER, COLUMN_NUMBER_TEXT, COLUMN_NUMBER_LINK,
                timestampFormat, isYear);
}


/**
* setSlackLog Function
*
* properties in the objects/rows
* @param {string} token
* @param {string} id  
* @param {string} url
* @param {number} days 
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
    return UrlFetchApp.fetch(requestUrl)
}

/**
* setSlackLog Function
*
* properties in the objects/rows
* @param {object}  array            - JSON.parse(getSlackLog(SLACK_TOKEN, CHANNEL_ID, REQUEST_URL)).messages.reverse();
* @param {object}  sheetObj         - SHEET of Activaed SpreadsheetAppObj
* @param {number}  lastrow          - last row of sheet
* @param {number}  columnNumberTs   - 1
* @param {number}  columnNumberText - 2
* @param {number}  columnNumberLink - 3 
* @param {boolean} booleanValue     - true/false 
*   if "booleanValue" is true, the format of timestamp is "YYYY/MM/DD(ddd) HH:mm:ss"
*   if not, the format is "MM/DD(ddd) HH:mm:ss"
*/
function setSlackLog(array, sheetObj, lastrow, 
                    columnNumberTs, columnNumberUser, columnNumberText, 
                    columnNumberLink, booleanValue) {
    // Log messages on SpreadSheet
    for ( var i = 0; i < array.length; i++ ){
        /*
        Logger.log("array[i].user: %s", array[i].user);
        Logger.log(array[i].ts);
        Logger.log(typeof true);
        */
      
        // DateTime
        sheetObj.getRange(lastrow + i + 1, columnNumberTs)
            .setValue(getMomentDateTime(array[i].ts, booleanValue));
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
* @param  {string}  unixtime                    - e.g. 1557197740.001300
* @param  {boolean} booleanValue                - timestamp with year, or not
* @return {string}  'YYYY/MM/DD(ddd) HH:mm:ss' or 'MM/DD(ddd) HH:mm:ss'
*/
function getMomentDateTime(unixtime, booleanValue) {
    // Register lang:ja
    Moment.moment.lang(
      'ja', {
        weekdays: ["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"],
        weekdaysShort: ["日","月","火","水","木","金","土"],
      }
    );
    if ( booleanValue ) {
        //booleanValue == true, YYYY有り
        return Moment.moment(unixtime * 1000)
            .format('YYYY/MM/DD(ddd) HH:mm:ss');
    } else {
        //YYYY無し
        return Moment.moment(unixtime * 1000)
            .format('MM/DD(ddd) HH:mm:ss');
    }
    
}