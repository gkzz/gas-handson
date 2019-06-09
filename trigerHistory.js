/*

library key;
moment.js
MHMchiX6c1bwSqGM1PZiW_PxhMjh3Sh48

*/

function main() {
   var keyTable = [
     "<USER_ID1>", //aaaaaaaaa
     "USER_ID2",   //bbbbb
     "<USER_ID3>", //ccccc
   ];
  
  
    /*-------Args----------------------------------------------*/
    const SLACK_LEGACY_TOKEN = "xoxp-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
    // cf. channel url = "https://<YOUR_SLACK_TEAM>.slack.com/messages/<YOUR_CHANNEL_ID>"";
    const BASE_URL = "https://slack.com/api/channels.history?";
    const INCOMING_WEBHOOK_URL = 'https://hooks.slack.com/services/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
    const FROM_CHANNEL = "<FROM_CHANNEL>";
    const FROM_CHANNEL_ID = "<FROM_CHANNEL_ID>";
    const DEST_CHANNEL = "<DEST_CHANNEL_ID>";

    //投稿日時のフォーマット(年有り)
    var isYear = true;
    
    //投稿日時のフォーマット(年無し)
    //var isYear = false;
    

  　//取得期間
    var period = 1;
    var filter = /.*(はじめます。).*/;
    /*---------------------------------------------------------*/ 
    
    var messages = JSON.parse(
        getSlackLog(SLACK_LEGACY_TOKEN, FROM_CHANNEL_ID, BASE_URL, period)
    )
    .messages
    .reverse();
    
    if ( !messages ) {
        return;
    }
  
    var logs = parseSlackLog(messages, isYear, keyTable, filter);
    //Logger.log("logs: %s", logs.length);
    for ( var i = 0; i<logs.length; i++  ) {
        sendMsg(FROM_CHANNEL, DEST_CHANNEL, 
               logs[i]["userId"], logs[i]["posted_date"], logs[i]["task"], INCOMING_WEBHOOK_URL);    
    }
}


/**
* getSlackLog Function
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
      // 24 Hours/day * 1 days
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
* parseSlackLog Function
*
* properties in the objects/rows
* @param {object}  array            - JSON.parse(getSlackLog(SLACK_TOKEN, CHANNEL_ID, REQUEST_URL)).messages.reverse();
* @param {boolean} booleanValue     - true/false 
*   if "booleanValue" is true, the format of timestamp is "YYYY/MM/DD(ddd) HH:mm:ss"
*   if not, the format is "MM/DD(ddd) HH:mm:ss"
* @params {array}  keyTable         - Slack User IDs
* @params {string}  filter         - e.g. はじめます。
* @return {array}  logs            
*   [
*     {"userId": "aaa", "posted_date": "YYYY/MM/DD(ddd) HH:mm:ss", "task": "xxxxxxxxx",},
*     {"userId": "bbb", "posted_date": "YYYY/MM/DD(ddd) HH:mm:ss", "task": "yyyyyyyyy",},
*     {"userId": "bbb", "posted_date": "YYYY/MM/DD(ddd) HH:mm:ss", "task": "zzzzzzzzz",},
*   ];
* 
*/
function parseSlackLog(array, booleanValue, keyTable, filter) {
    var logs = [];
    for each(var key in keyTable ) {
        var log = {"userId": "", "posted_date": "", "task": "",};
        for each( var val in array ) {
            if ( val.text.match(filter) ){
                if ( key == val.user ) {
                    // UserId
                    log["userId"] = val.user
                    // DateTime
            　      log["posted_date"] = getMomentDateTime(val.ts, booleanValue);
                    // task
                    log["task"] = val.text 
                    logs.push(log);
                }
            
            }
            
        }
    }
    //Logger.log(logs);
    return logs;
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


 /**
 * 
 * Post A Message with Attachments on slack
 *
 * properties in the objects/rows
 * @param {string} fromChannel
 * @param {string} destChannel
 * @param {string} userId
 * @param {string} posted_date
 * @param {string} task
  * @param {string} incomingWebhookUrl
 */
function sendMsg(fromChannel, destChannel, userId, posted_date, task, incomingWebhookUrl) {
   var title = "以下の業務の終了連絡を#" + fromChannel+ "に送りましたか？";
   var payload = {
      "channel": "#" + destChannel,
      "username": "New item added to reading list",
      "icon_emoji": ":grin:",
      "link_names": 1,
      "attachments":[
         {
            "fallback": "This is an update from a Slackbot integrated into your organization. Your client chose not to show the attachment.",
            "pretext": "<@" + userId + ">",
            "mrkdwn_in": ["pretext"],
            "color": "#76E9CD",
            "fields":[
                 {
                     "title": title,
                     "value": task,
                     "short": false
                 },
                 {
                     "title":"投稿日時",
                     "value": posted_date,
                     "short": false
                 },
             ],
             "actions": [
               {
                   "type": "button",
                   "text": "報告はこちらまで！",
                   "url": "https://xxxxxxxxxxxxxxxxxx"
               }
           ]
        }
     ]
   };
   Logger.log("payload: %s", payload)
 
   var options = {
      'method': 'post',
      'payload': JSON.stringify(payload)
   };
   //Logger.log("options: %s", options);
   //return;
   return UrlFetchApp.fetch(incomingWebhookUrl,options);
 }