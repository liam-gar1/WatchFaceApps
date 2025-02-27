import document from 'document'
import { me as appbit } from "appbit";
import sleep from "sleep";

// Get a handle on the <text> element
const sleepLabel = document.getElementById("sleepLabel");

export function checkSleepState() {
    if (sleep) {
      console.log(`User sleep state is: ${sleep.state}`);
      sleepLabel.text=`Sleep State: ${sleep.state}`;
    }
    if(sleep.state==="awake"){
        console.log(`The user is AWAKE`);
    }
}