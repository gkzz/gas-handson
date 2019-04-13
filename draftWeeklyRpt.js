/*

library key;
moment.js
MHMchiX6c1bwSqGM1PZiW_PxhMjh3Sh48

*/

function writeDraft() {
    /*-----------設定項目------------------*/
    //みなさんのお名前、部署名など適宜変えてください。
    const YOURNAME = "YOURNAME";
    const DESCRIPTION = "DESCRIPTION";
    const YOURTEAM = "YOURTEAM";
    const MYADDRESS= " \n"+
                   " \n"+
                   "━━━━━━━━━━━━━━━━━━━━━━━━\n"+
                   "OURCOMPANYNAME\n"+
                   "xxxxxxxxxxxxxxxxxxxxxxxxxx\n"+
                   "xxxxxxxxxxxxxxxxxxxxxxxxxx\n"+
                   "xxxxxxxxxxxxxxxxxxxxxxxxxx\n"+
                   "━━━━━━━━━━━━━━━━━━━━━━━━\n"+
                   "\n"+
                   " \n"
                   
    /*特定の日にちを週報の開始日としたい場合の変更箇所--------------
    107行目と119行目のMoment.moment()の()に特定の日にちを
    YYYY/MM/DDの書式で追記してください。
    以下は2019年4月13日を特定の日にちとした場合のサンプルです。

    107行目
    var momentDateObj = Moment.moment("2019/04/13").add(number, 'days').format('M月D日(ddd)');

    119行目
    var currentDate = Moment.moment("2019/04/13").format('M月D日(ddd)');
    */


    /*-----------ここから下のスクリプトはコピペでOK------------------*/
    //誤送信することの無いように架空のアドレスを記載。
    //宛先を無しとした下書きは作成できない模様。
    var mailTo = "to@example.com";
    // var mailCc = "cc@example.com"; 

    /*------------メール本文のヘッダーを生成-------------------
    各位

    お疲れ様です。
    <DESCRIPTION>です。
    <momentMonday> - <momentFriday>の実績を週報として送信いたします。

    */
    var momentMonday = momentToday();  
    var momentFriday = momentDateObj(4);
    var mailHeader = "各位 \n\nお疲れ様です。\n" + DESCRIPTION + "です。\n"+ momentMonday +" - "+ momentFriday + "の実績を週報として送信いたします。\n\n";

    /*------------タイトルを生成-------------------*/
    var ptn = /(\d+)月(\d+)日/;　// ex. 2019年4月17日(水)
    momentFriday = momentFriday.match(ptn)[0];
    var mailTitle = "【"+ YOURTEAM +"】週報_" + momentFriday + "_" + YOURNAME + "】";


    /*------------メール本文を生成-------------------
    1.今週の業務内容
    ■aaaaaaaaaaaa
    ・
     －

    ■その他
    ・

    2.来週の予定
    ■aaaaaaaaaaaa
    ・
     －

    ■その他
    ・

    3.その他所感等
    ■aaaaaaaaaaaa
    ・
     －

    ■その他
    ・
    */
    var thisWeek = "1.今週の業務内容\n■aaaaaaaaaaaa\n・\n　－\n\n■その他\n・\n\n";
    var nextWeek = ".来週の予定\n■aaaaaaaaaaaa\n・\n　－\n\n■その他\n・\n\n";
    var thisWeekOpinion = "3.その他所感等\n■aaaaaaaaaaaa\n・\n　－\n\n■その他\n・\n\n";
    var mailContent = thisWeek + nextWeek + thisWeekOpinion
    var mailFooter = "以上、よろしくお願いします。\n";
    var mailBody =  mailHeader + mailContent + mailFooter + MYADDRESS
    var mailArgs = {
        // cc: mailCc,
        mailBody: mailBody
    }

    GmailApp.createDraft(mailTo, mailTitle, mailBody, mailArgs)
} 





function momentToday() {
  const SS = SpreadsheetApp.getActiveSpreadsheet();
  //const sheet = SS.getSheetByName('<SheetName e.g. sheet1>');

  // Register lang:ja
  Moment.moment.lang(
    'ja', {
      weekdays: ["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"],
      weekdaysShort: ["日","月","火","水","木","金","土"],
    }
  );
  var currentDate = Moment.moment().format('M月D日(ddd)');
  return currentDate;
}

function momentDateObj(number) {
  // Register lang:ja
  Moment.moment.lang(
     'ja', {
         weekdays: ["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"],
         weekdaysShort: ["日","月","火","水","木","金","土"],
      }
  );
  var momentDateObj = Moment.moment().add(number, 'days').format('M月D日(ddd)');
  return momentDateObj;
}
