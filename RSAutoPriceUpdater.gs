//The name of the sheet this script uses. If you need it to be called something else, change this variable to something else.
var priceSheetName = "Prices";

var dumpUrl = "https://chisel.weirdgloop.org/gazproj/gazbot/rs_dump.json";

//Adds the menu to the spreadsheet
function onOpen() {
	SpreadsheetApp.getUi()
		.createMenu("RuneScape Price Updater")
		.addItem("Manual", "showManualPrompt_")
		.addItem("Generate price sheet", "generatePriceUpdateSheet")
		.addSeparator()
		.addItem("Update prices", "updateAllPrices_")
		.addSeparator()
		.addItem("About", "showAboutPrompt_")
		.addToUi();
}

function updateAllPrices_() {
	var sheet =
		SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
			priceSheetName
		);
	updatePricesForRange_(2, sheet.getLastRow());
}

function showManualPrompt_() {
	var textDescription =
		"This script creates a spreadsheet that automatically keeps RuneScape Grand Exchange item data up to date.";
	textDescription +=
		"\n\nTo get started, click 'Generate price sheet' from the 'RuneScape Price Updater' menu. A new sheet named '" +
		priceSheetName +
		"' will be created.";

	var textTracking =
		"To track an item, simply enter its Item ID in the 'Item ID' column. The script will automatically retrieve and update:";
	textTracking += "\n- Item icon";
	textTracking += "\n- Item name";
	textTracking += "\n- Grand Exchange price";
	textTracking += "\n- Buy limit";
	textTracking += "\n- Trade volume";
	textTracking += "\n- High Alchemy value (when available)";
	textTracking += "\n- Members-only";
	textTracking += "\n- Last Grand Exchange update timestamp";
	textTracking += "\n- Last attempted update timestamp";

	var textUpdating =
		"Prices can be updated manually at any time by selecting 'Update prices' from the menu.";
	textUpdating +=
		"\nThe spreadsheet is also configured to refresh automatically every two hours.";

	var textHowToRefer =
		"To use an item's price in another sheet, reference the corresponding cell in the Price column.";
	textHowToRefer +=
		"\nFor example: =" +
		priceSheetName +
		"!D2";
	textHowToRefer +=
		"\nReplace '2' with the row number of the item you want to reference.";

	var textItemID = "How to find an Item ID:";
	textItemID += "\n- Visit the RuneScape Grand Exchange website";
	textItemID += "\n- Search for the item";
	textItemID += "\n- Open the item's page";
	textItemID += "\n- The Item ID is the number at the end of the URL";
	textItemID +=
		"\n- Example: https://services.runescape.com/m=itemdb_rs/Cabbage/viewitem?obj=1965";
	textItemID += "\n- The Item ID for Cabbage is 1965";

	var textNotes = "Notes:";
	textNotes +=
		"\n- Market data is sourced from the RuneScape Grand Exchange and may not update instantly";
	textNotes +=
		"\n- 'Last GE update' indicates when the market data was last updated";
	textNotes +=
		"\n- 'Last attempted update' indicates when this spreadsheet last refreshed the item data";
	textNotes +=
		"\n- Some items may not have a High Alchemy value available";

	var ui = SpreadsheetApp.getUi();
	ui.alert(
		"RuneScape Price Updater - Manual",
		textDescription +
			"\n\n" +
			textTracking +
			"\n\n" +
			textUpdating +
			"\n\n" +
			textHowToRefer +
			"\n\n" +
			textItemID +
			"\n\n" +
			textNotes,
		ui.ButtonSet.OK
	);
}

//Prompt displayed when updating a specific row
function showAboutPrompt_() {
	var newestVersionNumber = getNewestVersionNumber_();
	var textVersion =
		"Version " +
		version_ +
		(newestVersionNumber == version_
			? ""
			: " (A new version is available on GitHub, version " +
			  newestVersionNumber +
			  ")");
	var textContact =
		"This script was originally written by Zenyl (Reddit: /u/zenyl, RSN: Zenyl) and has since been updated by Tristonho (RSN: Tristonho, LinkedIn: https://www.linkedin.com/in/julioduartedev/). If you have any questions or feedback, feel free to reach out.";
	var textDisclaimer =
		"Disclaimer: We are not affiliated with Jagex in any way. This script is developed for use with their public APIs.";
	var textGithub =
		"Github repository: https://github.com/JulioDuarteDev/RSAutoPriceUpdater";
	var textLicense = "License: GNU General Public License 3.";
	var ui = SpreadsheetApp.getUi();
	ui.alert(
		"RuneScape Price Updater - About",
		textVersion +
			"\n\n" +
			textContact +
			"\n\n" +
			textDisclaimer +
			"\n\n" +
			textGithub +
			"\n\n" +
			textLicense,
		ui.ButtonSet.OK
	);
}

function generatePriceUpdateSheet() {
	//Throw error if not called from a spreadsheet
	if (SpreadsheetApp.getActive() == null)
		throw new Error(
			"This function must be run in relation to a Google Spreadsheet."
		);

	//Throw error if a sheet with {sheetName} already exists
	if (SpreadsheetApp.getActive().getSheetByName(priceSheetName) != null)
		throw new Error(
			"A sheet by the name '" +
				priceSheetName +
				"' already exists. Either delete the existing sheet or change the 'priceSheetName' variable at the top of the script."
		);

	//Column headers
	var titles = [
		"Icon",
		"Item ID",
		"Item name",
		"Price",
    "Limit",
		"Volume",
    "High Alch",
    "Members only",
		"Last GE update",
		"Last attempted update",
	];

	//Create sheet
	var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
	var sheet = spreadsheet.insertSheet(priceSheetName);

	//Format sheet and cells
	sheet.deleteColumns(1, 25);

	for (var row = 1; row <= titles.length; row++) {
		sheet.getRange(1, row).setValue(titles[row - 1]);
		sheet.getRange(1, row).setFontWeight("bold");
		sheet.getRange(1, row).setHorizontalAlignment("center");
	}

	sheet.setFrozenRows(1);
	sheet.setColumnWidth(1, 33);
	sheet.setColumnWidth(3, 150);
	sheet.setColumnWidth(10, 150);

  sheet.getRange("D:D").setNumberFormat("#,##0 gp"); // Price
  sheet.getRange("E:E").setNumberFormat("#,##0");    // Limit
  sheet.getRange("F:F").setNumberFormat("#,##0");    // Volume
  sheet.getRange("G:G").setNumberFormat("#,##0");    // High Alch

	//Set up triggers
	var triggers = ScriptApp.getProjectTriggers();

  for (var i = 0; i < triggers.length; i++) {
    if (
      triggers[i].getHandlerFunction() ==
      "updateAllPrices_"
    ) {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }

  ScriptApp.newTrigger("updateAllPrices_")
    .timeBased()
    .everyHours(2)
    .create();

	var ui = SpreadsheetApp.getUi();
	ui.alert(
		"Setup complete",
		"The script and auto-updaters have succesfully been set up. You can now start adding items, which will automatically be kept up to date.",
		ui.ButtonSet.OK
	);
}

//Updates the item prices from row {from} to row {to}.
function updatePricesForRange_(from, to) {
	var sheet =
		SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
			priceSheetName
		);

	var dump = getItemDump_();

	if (!dump) {
		throw new Error("Unable to retrieve item dump.");
	}

	var now = new Date();

	for (var row = from; row <= to; row++) {
		var itemID = sheet.getRange(row, 2).getValue();
    

		if (itemID == "" || !isNumber_(itemID) || itemID < 0) {
			continue;
		}

    sheet.getRange(row, 1).setFormula(
      '=IMAGE("https://services.runescape.com/m=itemdb_rs/obj_sprite.gif?id=' +
      itemID +
      '")'
    );

		var itemData = dump[itemID];

		if (itemData) {
			sheet.getRange(row, 3).setValue(itemData.name || "");
      sheet.getRange(row, 4).setValue(itemData.price || "");
      sheet.getRange(row, 5).setValue(itemData.limit || "");

      sheet.getRange(row, 6).setValue(
        itemData.volume === undefined ? "" : itemData.volume
      );

      sheet.getRange(row, 7).setValue(
        itemData.highalch === undefined ? "" : itemData.highalch
      );

      sheet.getRange(row, 8).setValue(itemData.members);
    }

    if (dump["%JAGEX_TIMESTAMP%"]) {
			sheet.getRange(row, 9).setValue(
				new Date(dump["%JAGEX_TIMESTAMP%"] * 1000)
			);
		}

		sheet.getRange(row, 10).setValue(now);
	}
}

function getItemDump_() {
	try {
		return JSON.parse(
			UrlFetchApp.fetch(dumpUrl).getContentText()
		);
	} catch (err) {
		return null;
	}
}

function isNumber_(input) {
	return !isNaN(Number(input));
}

function getNewestVersionNumber_() {
	var url =
		"https://raw.githubusercontent.com/JulioDuarteDev/RSAutoPriceUpdater/master/RSAutoPriceUpdater.gs";
	var content = UrlFetchApp.fetch(url);
	var lines = ("" + content).split("\n");
	for (var i = 0; i < lines.length; i++) {
		if (
			lines[i].indexOf("var version_ = ") != -1 &&
			lines[i].indexOf("indexOf") == -1
		) {
			return ("" + lines[i]).split('"')[1];
		}
	}
	return "[Error retrieving version number from GitHub]";
}

var version_ = "3.0";
