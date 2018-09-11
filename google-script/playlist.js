function addVideoToYouTubePlaylist() {
    // Read the source videos from Google Sheet
    var sheet = SpreadsheetApp.getActiveSheet();
    var data = sheet.getDataRange().getValues();

    // Add your own playlist Id here
    var playlistId = "PLAYLIST_ID_HERE";

    // iterate through all rows in the sheet
    for (var d = 1, l = data.length; d < l; d++) {

        // Add the video the existing playlist
        YouTube.PlaylistItems.insert({
            snippet: {
                playlistId: playlistId,
                resourceId: {
                    kind: "youtube#video",
                    videoId: data[d][0]
                }
            }
        }, "snippet");

        // wait for a second to avoid hitting the rate limit
        Utilities.sleep(1000);
    }
}