function sample() {
    //*Args------------------------------------------------------------*
    const SHEET_NAME = "sheet1"; //<SheetName>
    
    //*---------------writer, players, goodWork-----------------------*
    const SS = SpreadsheetApp.getActiveSpreadsheet();
    //const SHEET = SS.getSheetByName('<SheetName e.g. sheet1>');
    const SHEET = SS.getSheetByName(SHEET_NAME);
    //Logger.log('SHEET: %s', SHEET);
    //return;

    // Get data
    const VALUE_RANGE = getValueRange(SHEET);
    //Get data by 5 times
    var writeConts = 0;
    Logger.log('writeConts: %s', writeConts);
    for ( var i = 0; i < VALUE_RANGE.length; i++ ) {
        
        ///*
        if ( writeConts >= 2 ) {
            break;
        }
        //*/
       
        var value = VALUE_RANGE[i];
        if ( !value ) {
            Logger.log('Faliled!');
            Logger.log('i: %s', i);
            Logger.log('value: %s', value);
        }
        Logger.log('Successful!');
        Logger.log('i: %s', i);
        Logger.log('value: %s', value);
        //return;

        writeConts ++;
        Logger.log('writeConts: %s', writeConts);
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
    Logger.log('valueRange.length: %s', valueRange.length); //92
    return valueRange;
}
