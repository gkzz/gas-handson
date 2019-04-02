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
    var response = {
        text: "just published" 
    };
    return ContentService.createTextOutput(
        JSON.stringify(response)
    )
    .setMimeType(
        ContentService.MimeType.JSON
    );
}