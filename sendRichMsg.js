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
    /*
    *------------Here is Format. ---------------------*
    <Headers>
    | <Assignee #1>      <- with Title's Attachement
    | <Quote #1>     <- with Text's Att
    | <Assignor #1>      <- with Text's Att
    
    | <Assignee #2>     
    | <Quote #2>     
    | <Assignor #2>   
    
    | <Assignee #3>     
    | <Quote #3>     
    | <Assignor #3>   
    <Fotters>
    */
   
   //*---------------Fixed value--------------------------*
   /*
   const SHEETNAME = "<SheetName>"; //<SheetName>
   const CHANNEL = "<ChannelName>"; //<ChannelName> 
   const USERNAME = "<BotName>"; //<BotName> 
   const INCOMING_WEBHOOK_URL = "<Incoming Webhook URL>"; //<Incoming Webhook URL>
   const STATUS = "something";
   const PTN = /<regex e.g. .*@example.com>/ //<regex>
   */
   
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
    // If Data doesn't exist, this program is terminated.
    // Get data
    const VALUE_RANGE = getValueRange(SHEET);

    

    //Get data by 5 times
    var writeConts = 1;
    for ( var i = 0; i < VALUE_RANGE.length; i++ ) {
        
        /*
        if ( writeConts >= 6 ) {
            break;
        }
        */

        var value = VALUE_RANGE[i];
        //Logger.log(value);
        //return;
        
        //if ( !isSkipFlag(value, STATUS, PTN) {}
        if ( !isSkipFlag(value, STATUS) ) {
            //1: mailAddress	//2: Assignor	//3: Assignor's Department
            var assignor = "【To】<mailto:" + value[1] + "|" + value[1] + ">" + "\n";
           //4: Assignee1  //5: Assignee1's Department
           var assignees = getAssignees(value);
           
           //6: Quote
           var quote = "【Quotes)】" + value[6];
           // If you can get data of the each row, you put "Done" at the cell(i+2, 27).
           SHEET.getRange(i+2, 17).setValue("Done");
           if ( writeConts == 1 ) {
               //*---------------Headers--------------------------*
                var headers = getHeaders();
                headers = writeMessage(CHANNEL, headers);
                sendMessage(headers, INCOMING_WEBHOOK_URL);
            }

                  
            //*---------------Attachments--------------------------*
            //var richMessage = writeRichMessage(channel, writers, players, goodJob);
            
            var att = getAttText(quote, assignor);
            var richMessage = writeRichMessage(CHANNEL, assignees, att);
            sendMessage(richMessage, INCOMING_WEBHOOK_URL);
            writeConts ++;
        }
    }
    if ( writeConts > 1 ) {
         //*---------------Fotters--------------------------*
        var fotters = getFotters(SS, FORM_URL);
        fotters = writeMessage(CHANNEL, fotters);
        sendMessage(fotters, INCOMING_WEBHOOK_URL);
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
    //Logger.log( ValueRange.length); //92
    return valueRange;
}



//function isSkipFlag(value, STATUS, PTN)
function isSkipFlag(value, STATUS) {
  //If status is already writen in the cell, skip.
  if ( value[17] == STATUS ) {
      return true;
  }
  var timeStamp = Moment.moment(value[0]).format('YYYY年MM月DD日');
  //Logger.log(timeStamp);
  //var timeStamp = round(new Date(value[0]).getDate());
  var yesterday = Moment.moment().add(-1, 'days').format('YYYY年MM月DD日');
  //If timeStamp is NOT equal to yesterday, skip.
  if ( timeStamp != yesterday  ) {
      return true;
  }
  //return;
  
  //I value of the cell does NOT include ptn, skip.
  /*
  if ( !value[1].match(PTN) ) {
      return true;
  }
  */
  return false;
}



//4: Assignee1	//5: Assignee1's Department
function getAssignees(value) {
    var assignees = new Array();
    assignees.push(value[4] + '（' + value[5] + '）' );
              
    //7: Assignee2	//8: Assignee2's Department
    //9: Assignee3	//10: Assignee3's Department
    //and more
    for ( var n = 8; n <= 14; n += 2 ) {
        //Logger.log(n);
        //return;
      
        //Loop ends, if there are Nth Assignee, and Nth Assignee's Department
        if ( !value[n] || !value[n + 1] ) {
            break;
        }
        assignees.push(value[n] + '（' + value[n + 1] + '）');
        //Logger.log(assignees.join("、"));
        //return;
    }         
    //assignees = assignees.join("、")
    assignees = "【Assignees】" + assignees.join("、");
    return assignees;
}


function getHeaders() {
    // lang:jaを登録。これ以降はlangを指定しなくても自動的にjaが使用される。
    Moment.moment.lang(
        'ja', {
            weekdays: ["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"],
            weekdaysShort: ["日","月","火","水","木","金","土"],
        }
    );
    var nowDate = Moment.moment().format('YYYY年MM月DD日 (ddd)');
    //var nowDate = Moment.moment().format('YYYY/MM/DD');
    var headers = "*【" + nowDate +"】This Week's Message*\n";
    return headers;
}
  
function getFotters(SS, FORM_URL) {
    //URL
    const SHEET_URL = SS.getUrl();
    fotters = "【FORM_URL】\n" +  "<"+ FORM_URL + ">\n";
    fotters += "【SHEET_URL】\n" + "<" + SHEET_URL + ">\n";
    return fotters;
}


function writeMessage(CHANNEL, text) {
    var payload = {
      "channel": "#" + CHANNEL,
        "attachments":[
            {
              "fallback": "This is an update from a Slackbot integrated into your organization. Your client chose not to show the attachment.",
              "pretext": text,
              "mrkdwn_in": ["pretext"],
           }
        ]
    };
    return payload;
}

function getAttText(quote, assignor) {
    var att = quote + "\n";
    att += assignor;
    return att;
}

function writeRichMessage(CHANNEL, assignees, att) {
    var payload = {
        "channel": "#" + CHANNEL,
        "attachments":[
            {
                "fallback": "This is an update from a Slackbot integrated into your organization. Your client chose not to show the attachment.",
                "color": "#76E9CD",
                "fields":[
                    {
                        "title": assignees,
                        "value": att,
                        "short":false
                    },
                ]
            }
        ]
    };
    return payload;
}


/*
function writeRichMessage(CHANNEL, assignor, assignees, quote) {
  var payload = {
    "channel": "#" + CHANNEL,
    "attachments":[
       {
          "fallback": "This is an update from a Slackbot integrated into your organization. Your client chose not to show the attachment.",
          "pretext": assignor,
          "mrkdwn_in": ["pretext"],
          "color": "#76E9CD",
          "fields":[
             {
                "title": assignees,
                "value": quote,
                "short":false
             },
          ]
       }
    ]
  };
  return payload;
}
*/

function sendMessage(payload, INCOMING_WEBHOOK_URL){
    var options = {
        'method': 'post',
        'payload': JSON.stringify(payload)
    };
    return UrlFetchApp.fetch(INCOMING_WEBHOOK_URL,options);
}