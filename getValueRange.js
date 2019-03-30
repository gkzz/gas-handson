function main() {
    const SHEET_NAME = "sheet1"; //<SheetName>
  
    //*---------------Initial SetUp-----------------------*
    const SS = SpreadsheetApp.getActiveSpreadsheet();
    //const SHEET = SS.getSheetByName('<SheetName e.g. sheet1>');
    const SHEET = SS.getSheetByName(SHEET_NAME);
    // If Data doesn't exist, this program is terminated.
    // Get data
    const VALUE_RANGE = getValueRange(SHEET);
    Logger.log('VALUE_RANGE: %s', VALUE_RANGE);
    return;
  
}


function getValueRange(SHEET) {
    //If you would like to get 1st column...
    //const OFFSET_ROW = 0;
    const OFFSET_ROW = 1;
    const OFFSET_COLUMN = 0;
    var valueRange = SHEET.getDataRange()
        .offset(OFFSET_ROW, OFFSET_COLUMN)
        .getValues();  
    //Logger.log('ValueRange.length: %s', ValueRange.length); //Length Of Columns
    return valueRange;
}
