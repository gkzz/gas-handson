function main() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('<sheet name, e.g. template>');
    //insert date
    const a1_Date = getDate('<date, e.g. 2019/01/01>');
    sheet.getRange('<cell, e.g. A1>').setValue(a1_Date);
  
    var array = getArray();
    //for loop by kuwaharaArray
    for ( var i = 0; i < array.length; i++ ) {
      //copy template & name sheet by member
      copySheet(('<sheet name, e.g. template>', array[i]));
    }
    const ss2 = SpreadsheetApp.getActiveSpreadsheet();
    ss2.setActiveSheet(('<sheet name, e.g. template>'));
}


function copySheet(targetSheetName, memberName) {
    const _ss = SpreadsheetApp.getActiveSpreadsheet();
    const _sheet = _ss.getSheetByName(targetSheetName);
    var newSheet = _sheet.copyTo(_ss);
    newSheet = newSheet.setName(memberName);
    _ss.setActiveSheet(newSheet);
    newSheet.getRange('<sheet name, e.g. C1>').setValue(memberName);
}


function getDate(_date) {
    var _date = Moment.moment(_date).format('YYYY/MM/DD');
    return _date;
}

function getArray(){
    var array = [
      'shinji', 'rei', 'asuka', 
      'kaoru', 'maki',
    ];
    return array;
}
