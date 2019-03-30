/*
sources;
PostResponse.gs
https://gist.github.com/venetucci/8ebc5b0f6f73354743c3307d2f38b25a#file-postresponse-gs
tutorial
https://medium.com/@venetucci/a-bot-to-help-you-read-your-way-through-next-4-years-7ba9d80066fc
*/


/**
* 
* Run postResponse Function
*
*/
function main(){
   const CHANNEL = "bot-test";
   //BOTNAME = "sample"
   const USERID = "<Your Bot ID>";
   const TOPIC = "topic";
   const TITLE  = "title";
   const AUTHOR = "author";
   const DESCRIPTION = "desc";
   const INCOMING_WEBHOOK_URL = 'https://hooks.slack.com/services/aaaaaaaaaaaaaaa/bbbbbbbbbbbb/ccccccccccccccccc';
  
   postOnly(CHANNEL, USERID, TOPIC, TITLE, AUTHOR, DESCRIPTION, INCOMING_WEBHOOK_URL);
 
 }
 
 
 /**
 * 
 * Post only on slack
 *
 * properties in the objects/rows
 * @param {string} CHANNEL
 * @param {string} USERID
 * @param {string} TOPIC
 * @param {string} TITLE
 * @param {string} AUTHOR
 * @param {string} DESCRIPTION
 */
function postOnly(CHANNEL, USERID, TOPIC, TITLE, AUTHOR, DESCRIPTION, INCOMING_WEBHOOK_URL) {
   var payload = {
      "channel": "#" + CHANNEL,
      "username": "New item added to reading list",
      "icon_emoji": ":grin:",
      "link_names": 1,
      "attachments":[
         {
            "fallback": "This is an update from a Slackbot integrated into your organization. Your client chose not to show the attachment.",
            "pretext": "<@" + USERID + "> added a new item to the reading list",
            "mrkdwn_in": ["pretext"],
            "color": "#76E9CD",
            "fields":[
               {
                  "title":"Topic",
                  "value": TOPIC,
                  "short":false
              },
              {
                 "title":"Title",
                 "value": TITLE,
                 "short":false
              },
              {
                 "title":"Author",
                 "value": AUTHOR,
                 "short":false
              },
              {
                 "title":"Description",
                 "value": DESCRIPTION,
                 "short": false
              },
           ]
        }
     ]
   };
   Logger.log("payload: %s", payload)
 
   var options = {
      'method': 'post',
      'payload': JSON.stringify(payload)
   };
 
   return UrlFetchApp.fetch(INCOMING_WEBHOOK_URL,options);
 }