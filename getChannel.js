function getChannels() {
    　 //データを出力するスプレッドシートのシート名称
      const SHEET_NAME = "<YOUR_SHEET_NAME>"; 
    
      //スプレッドシートにシート単位でアクセス
      const SHEET = SpreadsheetApp.getActiveSpreadsheet()
        .getSheetByName(SHEET_NAME);
    
      //https://<YOUR_SLACK_TEAM>.slack.com/messages/<YOUR_CHANNEL_ID>/
      const SLACK_TEAM = "<YOUR_SLACK_TEAM>";
    
      const SLACK_TOKEN = "xoxb-xxxxxxxxxxxxxxxxxxxxxxxxxxx";
    
      //channels.listはSlackで推奨されていない
      //var listurl = 'https://'+ SLACK_TEAM +'.slack.com/api/channels.list?token=' + SLACK_TOKEN;
      var listurl = 'https://'+ SLACK_TEAM +'.slack.com/api/conversations.list?token=' + SLACK_TOKEN;
      var listres = UrlFetchApp.fetch(listurl);
      //Logger.log(listres);
      var listjson = JSON.parse(listres.getContentText());
      //Logger.log(listjson);
      for (var i = 0; i < listjson.channels.length; i++ ) {
          setValues(listjson.channels, i, SHEET);
      }
      //左からN列目を昇順(true)/降順(false)とするために、
     //sort(<対象のスプレッドシートのシートオブジェクト>, N, true/false)
      sort(SHEET, 4, false);
    }
    
    
    function setValues(array, rowNumber, SHEET){
      var value;
      if ( !array[rowNumber] ) {
          value = "not found";
          SHEET.getRange(rowNumber+2, 1).setValue(value);
          SHEET.getRange(rowNumber+2, 2).setValue(value);
          SHEET.getRange(rowNumber+2, 3).setValue(value);
      }
      else {
          value = array[rowNumber];
          Logger.log(value);
          //name
          SHEET.getRange(rowNumber+2, 2).setValue(value["name"]);
          //id
          SHEET.getRange(rowNumber+2, 3).setValue(value["id"]);
          //numMembers
          SHEET.getRange(rowNumber+2, 4).setValue(value["num_members"]);
      }
      //no.
      SHEET.getRange(rowNumber+2, 1).setValue(rowNumber+1);
    }
    
    
    function sort(SHEET, columnPosition, ascending){
        const OFFSET_ROW = 1;
        const OFFSET_COLUMN = 0;
        SHEET.getDataRange()
            .offset(OFFSET_ROW, OFFSET_COLUMN)
            .sort([{column:columnPosition,ascending:ascending}]);
    }