/*
source: GoogleAppsScriptでGmailの下書きを、より簡単に作成する方法
https://qiita.com/mkiyota/items/32d0fb2818bddf0d2e05 
*/

function main() {
  
    var mailTo = "to@example.com";
    // var mailTo = " " 
    // var mailCc = "cc@example.com"; 
    
    var mailTitle = "【週報　yyyy年MM月dd日】";
     
    var date = new Date();
    
    //金曜日にスクリプトを起動させる場合
    var before4days = beforeNdays(date, 4);
    var mailHeader = '各位 \n\nお疲れ様です。\nxxxxxxxxxxxxxxxxx\nMM月' + before4days + '日-dd日の週報です。\n\n';
    
    
    // mailContent
    // 
    var thisWeek = '1.xxxxxxxxxxxx\n\n'
    // 明日
    var nextWeek = '2.xxxxxxxxxxxx\n\n'
    var thisWeekOpinion = '3.xxxxxxxxxxxx\n\n'
    var mailContent = thisWeek + nextWeek + thisWeekOpinion
    var mailFooter = '来週もよろしくお願いします。\n'
    var myAddress= " \n"+
                   " \n"+
                   "━━━━━━━━━━━━━━━━━━━━━━━━\n"+
                   "xxxxxxxxxxxxxxxxxxxxxxxxxxx\n"+
                   "xxxxxxxxxxxxxxxxxxxxxxxxxxx\n"+
                   "xxxxxxxxxxxxxxxxxxxxxxxxxxx\n"+
                   "xxxxxxxxxxxxxxxxxxxxxxxxxxx\\n"+
                   "━━━━━━━━━━━━━━━━━━━━━━━━\n"+
                   "\n"+
                   " \n"
   var mailBody =  mailHeader + mailContent + mailFooter + myAddress
  
    mailTitle = myDateFormat(date, mailTitle)
    mailBody = myDateFormat(date, mailBody)
    var mailArgs = {
      // cc: mailCc,
      mailBody: mailBody
    }
    
    GmailApp.createDraft(mailTo, mailTitle, mailBody, mailArgs)
    // GmailApp.createDraft(mailTitle, mailBody, mailArgs)
      
  }
  
  /*
  テキストデータ「text」内の'yyyy', 'MM', 'dd', 'hh', 'mm', 'ss', 'aaa'の日付形式文字を、
  日時データdateに該当する年月日時分秒曜日に変換する
  */
  function myDateFormat (date, text) {
    var result = text
    var timeZone = 'Asia/Tokyo'
    // ’aaa’を曜日に変換
    var yobi = ['日', '月', '火', '水', '木', '金', '土']
    var rep = yobi[date.getDay()]
    result = result.replace(/aaa/g, rep)
  
    // 'yyyy', 'MM', 'dd', 'hh', 'mm', 'ss'を年月日時分秒に変換
    var f = ['yyyy', 'MM', 'dd', 'hh', 'mm', 'ss']
    var i = 0
    for (i in f) {
      var reg = new RegExp(f[i] + '(.*?)', 'g')
      rep = Utilities.formatDate(date, timeZone, f[i])
      result = result.replace(reg, rep)
    }
    return result
    
  }
  
  function beforeNdays(date, n){
    var dateBeforeNdays = round(date.getDate()) - n;
    //dateBeforeNdays = round(dateBeforeNdays);
    
    var _ptn = '/[0-9][0-9]';
    var regExp = new RegExp(dateBeforeNdays);
    if (_ptn.match(regExp)) {
        return dateBeforeNdays;
    } else {
        return '0' + dateBeforeNdays;
    }
  }
  
  
  //round "number of No."（e.g. 3.0　→ 3）
  function round(n) {
      n = Math.floor(n * 10) / 10;
      Logger.log(n);
      return n;
  }