const axios = require('axios').default;
const delay = ms => new Promise(res => setTimeout(res, ms));

export const TimeStart = async (date) =>{
    const startGameDate = date;
    const url = "https://sh71h1oegb.execute-api.eu-west-2.amazonaws.com/default/GetTime";

    console.log("startGameDate: "+startGameDate);

    axios
		.get(url)
		.then(function (response) {
			const jsonResponse = response.data;
            console.log("date: "+jsonResponse);
            let month = jsonResponse.substring(0,2)
            let day = jsonResponse.substring(3,5)
            const dateAnswer = new Date(day+"/"+month+jsonResponse.substring(5));
            console.log("date format: "+dateAnswer.toString());

            let diff = startGameDate - dateAnswer
            console.log("diff: "+diff)

            if(diff<= 1000){
                //WalletConnectedTokenAssociated();
            }
            else{
                startGameTimer(diff);
            }

            
		})
		.catch(function (err) {
			console.error(err);
            alert(err.toString());
		}); 
  
    //WalletConnectedTokenAssociated();
  
  }

const startGameTimer = async(diff) => {

    const response = document.getElementById('timer');
    while(diff > 1000){
        
        response.innerHTML = `${formatTime(diff/1000)}`;
        await delay(1000);
        diff = diff -1000
    }

    //WalletConnectedTokenAssociated();

}

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