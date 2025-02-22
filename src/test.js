function formatTime(seconds) {
    var days = Math.floor(seconds / (24*60*60));
    var hours = Math.floor(seconds % (24*60*60) / (60*60));
    var minutes = Math.floor(seconds % (60*60) / 60);
    var seconds = Math.floor(seconds % 60);

    var result = "";
    if(days > 0) {
        if (days < 10) days = "0" + days;
        result += days + ":";
    }

    if(hours > 0 || days > 0) {
        if (hours < 10) hours = "0" + hours;
        result += hours + ":";
    }

    if (minutes < 10) minutes = "0" + minutes;
    result += minutes + ":";

    if (seconds < 10) seconds = "0" + seconds;
    result += seconds;

    return result;
}

console.log(formatTime(100000));