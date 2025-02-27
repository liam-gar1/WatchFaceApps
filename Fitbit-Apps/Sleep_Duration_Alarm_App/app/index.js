import clock from "clock";
import document from 'document'

import { me as appbit } from "appbit";
import { vibration } from "haptics";
import { HeartRateSensor } from "heart-rate";
import sleep from "sleep";
import { today } from "user-activity";
import { geolocation } from "geolocation";
import { display } from "display";

import * as sleepJS from "./sleep.js";
import * as close from "./closeApp.js";
import * as menu from "./menu.js";
import * as setTime from "./setTime.js";

// prevents the app to timeout due to lack of activity
appbit.appTimeoutEnabled = false;

//Prevent the app from closing on pressing the home button
document.onkeypress=function(e){
    close.handleKeyPress(e);
}

//setInterval(sleepJS.checkSleepState(), 1000); // 10000 milliseconds = 10 seconds

function zeroPad(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
}
  
// Update the clock every minute
clock.granularity = "minutes";
  
// Get a handle on the <text> element
const timeLabel = document.getElementById("timeLabel");
  
// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
    let today = evt.date;
    let hours = today.getHours();
    if (preferences.clockDisplay === "12h") {
        // 12h format
        hours = hours % 12 || 12;
    } else {
        // 24h format
        hours = zeroPad(hours);
    }
    let mins = zeroPad(today.getMinutes());
    timeLabel.text = `${hours}:${mins}`;
}
  
// prevents the app to timeout due to lack of activity
appbit.appTimeoutEnabled = false;

const startTimeLabel = document.getElementById("startTimeLabel");
const stopTimeLabel = document.getElementById("stopTimeLabel");

var sleepTimeArray=[];
function startTime() {
    const today = new Date();
    const hours = zeroPad(today.getHours() % 12 || 12);
    const mins = zeroPad(today.getMinutes());
    const secs = zeroPad(today.getSeconds());

    console.log(hours+":"+mins+":"+secs);
    sleepTimeArray.push(hours+":"+mins+":"+secs);
    //sleepTimeArray.push(hours*60*60+mins*60+secs);
    //startTimeLabel.text=`${hours}:${mins}:${secs}`;
    startTimeLabel.text=`${sleepTimeArray}`;
}

var awakeTimeArray=[];
function stopTime() {
    const today = new Date();
    const hours = zeroPad(today.getHours() % 12 || 12);
    const mins = zeroPad(today.getMinutes());
    const secs = zeroPad(today.getSeconds());

    console.log(hours+":"+mins+":"+secs);
    awakeTimeArray.push(hours+":"+mins+":"+secs);
    //awakeTimeArray.push(hours*60*60+mins*60+secs);
    //startTimeLabel.text=`${hours}:${mins}:${secs}`;
    stopTimeLabel.text=`${awakeTimeArray}`;
}

const sleepLabel = document.getElementById("sleepLabel");
const sleepDurationLabel = document.getElementById("sleepDuration");

var sleepDuration=0;
var sleepFlag=0;
var awakeFlag=0;
if (HeartRateSensor) {
    console.log("And here is your current heart rate data!");
    const hrm = new HeartRateSensor();
    hrm.addEventListener("reading", () => {
        console.log(`Current heart rate: ${hrm.heartRate} and sleep state is: ${sleep.state}`);

        //sleepLabel.text=`HR: ${hrm.heartRate} || Sleep State: ${sleep.state}`;
        sleepLabel.text=`HR: ${hrm.heartRate} || Sleep State: ${sleep.state}`;
    });
    hrm.start();

    var centiseconds=0;
    var seconds=0;
    // Define a function to be called repeatedly
    function timerCallback() {
        timerLabel.text=`${seconds}.${centiseconds}`;
        if(centiseconds==9){
            centiseconds=0;
            seconds++;
        }
        if(sleep.state=='asleep'){
        //if(65<=hrm.heartRate && hrm.heartRate<=67){
            centiseconds++;

            if(sleepFlag==0){
                startTime();
                awakeFlag=1;
                sleepFlag=1;
            }
        }
        else{
            //flag=0;
            sleepFlag=0;
            if(awakeFlag==1){
                stopTime();
                //sleepDuration+=awakeTimeArray[sleepTimeArray.length()]-sleepTimeArray[sleepTimeArray.length()];
                //sleepDurationLabel.text=`${sleepDuration}`;
                awakeFlag=0;
            }
        }
        if(seconds==26100){
            vibration.start("ring");
        }
    }
  
    let timerId = setInterval(timerCallback, 100);
}

// Get a handle on the <text> element
const timerLabel = document.getElementById("timerLabel");

function updateDisplay() {
    if (display.on) {
      //display.poke();
    }
}
  
// Update the clock face display every refreshInterval
setInterval(updateDisplay, 3000);