# RSAutoPriceUpdater
🇺🇸 English | [🇧🇷 Português](README.pt-BR.md)

Automatically track RuneScape Grand Exchange item data directly in Google Sheets.

RSAutoPriceUpdater creates a spreadsheet that keeps RuneScape item information up to date, including prices, trade volumes, buy limits, high alchemy values, and members-only item information.

Designed for merchants, flippers, skillers, and spreadsheet enthusiasts who want market data without manually updating values.

## Features

- Automatic item price updates
- Grand Exchange trade volume tracking
- Buy limit tracking
- High alchemy value tracking
- Members-only item indicator
- Automatic item icons
- Automatic updates every 2 hours
- Manual refresh option
- Easy integration with existing spreadsheets

## Data provided

For each tracked item, the spreadsheet automatically populates:

| Field | Description |
|---------|---------|
| Icon | Item icon |
| Item ID | RuneScape item ID |
| Item name | Item name |
| Price | Latest Grand Exchange price |
| Limit | Buy limit |
| Volume | Recent trade volume |
| High alch | High alchemy value |
| Members only | Whether the item requires membership |
| Last GE update | Market data timestamp |
| Last attempted update | Spreadsheet refresh timestamp |

## How it works

Version 3 uses market data provided through the Weird Gloop RuneScape data project.

Instead of requesting data item-by-item, the script retrieves a complete market dataset in a single request and updates all tracked items locally.

This approach provides:

- Faster updates
- Reduced API usage
- Improved reliability
- Additional item metadata
- Simpler maintenance

## Installation

1. Open a Google Spreadsheet.
2. Open **Extensions → Apps Script**.
3. Copy the contents of `RSAutoPriceUpdater.gs` into the editor.
4. Save the project.
5. Reload the spreadsheet.
6. Open the **RuneScape Price Updater** menu.
7. Click **Generate price sheet**.

## Usage

1. Generate the price sheet.
2. Enter RuneScape Item IDs in the **Item ID** column.
3. Run **Update prices** or wait for the automatic refresh.
4. Reference prices from other sheets using:

```excel
=Prices!D2
```

Replace `2` with the row number corresponding to the item you want to reference.

## Example

Track items such as:

| Item ID | Item |
|----------|----------|
| 2 | Cannonball |
| 4151 | Abyssal whip |
| 554 | Fire rune |
| 23685 | Eldritch crossbow |

The script automatically populates all remaining fields.

## Version 3 highlights

Version 3 is a major modernization of the original project and includes:

- Migration from individual item API requests to bulk market data retrieval
- Significantly faster updates
- Support for trade volume tracking
- Support for buy limits
- Support for high alchemy values
- Support for members-only item information
- Simplified update workflow
- Improved reliability and maintainability

## Credits

### Original project

- Zenyl (Reddit: u/zenyl, RSN: Zenyl)

### Version 3 modernization

- Tristonho (RSN: Tristonho)

### Market data

Special thanks to Gaz (Gaz GEBot) and the contributors behind the Weird Gloop RuneScape data project for maintaining this valuable community resource.

## Disclaimer

This project is not affiliated with or endorsed by Jagex Ltd.

RuneScape is a trademark of Jagex Ltd.

## License

GNU General Public License v3.0
