function findYouTubeVideoByKeywords() {
    // get the search query from Google Sheets
    var sheet = SpreadsheetApp.getActiveSheet();
    var data = sheet.getDataRange().getValues();

    // iterate through all rows in the sheet
    for (var d = 1, l = data.length; d < l; d++) {

        // find the top result only
        var results = YouTube.Search.list('id,snippet', {
            q: data[d][0],
            maxResults: 1
        });

        // was a matching video found on YouTube?
        if (results.pageInfo.totalResults !== 0) {
            var item = results.items[0];
            var snippet = item.snippet;
            var response = [
                item.id.videoId,
                snippet.title,
                snippet.description,
                new Date(snippet.publishedAt),
                snippet.channelId,
                snippet.channelTitle,
                snippet.thumbnails["default"]["url"],
            ];
            // write the response to Google Sheet
            sheet.getRange(d + 1, 4, 1, response.length).setValues([response])
        }

        // add a sleep between calls to avoid hitting the rate limit
        Utilities.sleep(1000);
    }

    // refresh the Google Spreadsheet
    SpreadsheetApp.flush();
}