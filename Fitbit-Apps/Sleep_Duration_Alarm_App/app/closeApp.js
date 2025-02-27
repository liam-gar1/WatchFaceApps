import document from 'document'
import { vibration } from "haptics";
import { me as appbit } from "appbit";

import { HeartRateSensor } from "heart-rate";
import sleep from "sleep";
import { today } from "user-activity";
import { geolocation } from "geolocation";

var intClose=0;
var closeSeconds=0;

const bg = document.getElementById("background");
const timeLabel = document.getElementById("timeLabel");
const colon = document.getElementById("colon");

var ImageBg = document.getElementById("importBg");
ImageBg.href = "Images/mainScreen.png";

export function handleKeyPress(e) {
    if (e.key === "back") {
        console.log(`Don't close`);

        intClose++;

        if(intClose<3){
            e.preventDefault();
        }
        if(intClose==3){
            me.exit();
        }

        if(intClose==1){
            vibration.stop("ring");
            flag=0;
        }
      
        if(intClose==2){
        }

        const tempLabel = document.getElementById("tempLabel");
        tempLabel.text=`Press #: ${intClose}`;
    }
}

var button = document.getElementById("button");
let buttonImg = document.getElementById("buttonImg");

//buttonImg.href="Images/transparentImg.png";
buttonImg.href="Images/setTime1.png";
/*
button.onactivate = function(evt) {
  console.log("Clicked");
  buttonImg.href="Images/mainScreen.png";
} */

var flag=[0,0,0,0];

button.addEventListener("mousedown", (evt) => {
    if(flag[0]==0){
        button.style.opacity=1;
        console.log("click");
        buttonImg.href="Images/setTime2.png";
        vibration.start("confirmation");
    }
});

var selectHrUp = document.getElementById("selectHrUp");
let selectHrUpImg = document.getElementById("upHr");

var select10sUp = document.getElementById("select10sUp");
let select10sUpImg = document.getElementById("up10s");

var selectMinUp = document.getElementById("selectMinUp");
let selectMinUpImg = document.getElementById("upMin");

var selectHrDown = document.getElementById("selectHrDown");
let selectHrDownImg = document.getElementById("DownHr");

var select10sDown = document.getElementById("select10sDown");
let select10sDownImg = document.getElementById("Down10s");

var selectMinDown = document.getElementById("selectMinDown");
let selectMinDownImg = document.getElementById("DownMin");

var confirm = document.getElementById("confirm");
let confirmImg = document.getElementById("confirmImg");

var hour=0;
var tens=0;
var min=1;

button.addEventListener("mouseup", (evt) => {
    if(flag[0]==0){
        console.log("release");
        buttonImg.href="Images/setTime1.png";
        //ImageBg.href = "Images/greenScreen.png";
        ImageBg.href = "Images/setTimeBackground.png";
        button.style.opacity=0;

        selectHrUpImg.href="Images/upArrow.png";
        selectHrUp.style.opacity=1;

        select10sUpImg.href="Images/upArrow.png";
        select10sUp.style.opacity=1;

        selectMinUpImg.href="Images/upArrow.png";
        selectMinUp.style.opacity=1;

        selectHrDownImg.href="Images/DownArrow.png";
        selectHrDown.style.opacity=1;

        select10sDownImg.href="Images/DownArrow.png";
        select10sDown.style.opacity=1;

        selectMinDownImg.href="Images/DownArrow.png";
        selectMinDown.style.opacity=1;

        confirmImg.href="Images/confirm.png";
        confirm.style.opacity=1;

        timeLabel.text=`${hour}   ${tens}   ${min}`;
        colon.text=`:`;

        flag[0]=1;
    }
});

selectHrUp.addEventListener("mousedown", (evt) => {
    if(flag[0]==1){
        selectHrUpImg.href="Images/upArrowClicked.png";
        vibration.start("confirmation");
        hour=hour+1;
        timeLabel.text=`${hour}   ${tens}   ${min}`;
    }
});

selectHrUp.addEventListener("mouseup", (evt) => {
    if(flag[0]==1){
        selectHrUpImg.href="Images/upArrow.png";
    }
});

select10sUp.addEventListener("mousedown", (evt) => {
    if(flag[0]==1){
        select10sUpImg.href="Images/upArrowClicked.png";
        vibration.start("confirmation");
        tens=tens+1;
        timeLabel.text=`${hour}   ${tens}   ${min}`;
    }
});

select10sUp.addEventListener("mouseup", (evt) => {
    if(flag[0]==1){
        select10sUpImg.href="Images/upArrow.png";
    }
});

selectMinUp.addEventListener("mousedown", (evt) => {
    if(flag[0]==1){
        selectMinUpImg.href="Images/upArrowClicked.png";
        vibration.start("confirmation");
        min=min+1;
        timeLabel.text=`${hour}   ${tens}   ${min}`;
    }
});

selectMinUp.addEventListener("mouseup", (evt) => {
    if(flag[0]==1){
        selectMinUpImg.href="Images/upArrow.png";

    }
});

selectHrDown.addEventListener("mousedown", (evt) => {
    if(flag[0]==1 && hour<12){
        selectHrDownImg.href="Images/DownArrowClicked.png";
        vibration.start("confirmation");
        hour=hour-1;
        timeLabel.text=`${hour}   ${tens}   ${min}`;
    }
});

selectHrDown.addEventListener("mouseup", (evt) => {
    if(flag[0]==1){
        selectHrDownImg.href="Images/DownArrow.png";
    }
});

select10sDown.addEventListener("mousedown", (evt) => {
    if(flag[0]==1 && tens<10){
        select10sDownImg.href="Images/DownArrowClicked.png";
        vibration.start("confirmation");
        tens=tens-1;
        timeLabel.text=`${hour}   ${tens}   ${min}`;
    }
});

select10sDown.addEventListener("mouseup", (evt) => {
    if(flag[0]==1){
        select10sDownImg.href="Images/DownArrow.png";
    }
});

selectMinDown.addEventListener("mousedown", (evt) => {
    if(flag[0]==1 && min<10){
        selectMinDownImg.href="Images/DownArrowClicked.png";
        vibration.start("confirmation");
        min=min-1;
        timeLabel.text=`${hour}   ${tens}   ${min}`;
    }
});

selectMinDown.addEventListener("mouseup", (evt) => {
    if(flag[0]==1){
        selectMinDownImg.href="Images/DownArrow.png";
    }
});

confirm.addEventListener("mousedown", (evt) => {
    if(flag[0]==1){
        confirmImg.href="Images/confirmClicked.png";
        vibration.start("confirmation");
    }
});

var confirmFlag=0;

confirm.addEventListener("mouseup", (evt) => {
    if(flag[0]==1){
        confirmImg.href="Images/confirm.png";

        selectHrUp.style.opacity=0;
        select10sUp.style.opacity=0;
        selectMinUp.style.opacity=0;
        selectHrDown.style.opacity=0;
        select10sDown.style.opacity=0;
        selectMinDown.style.opacity=0;
        confirm.style.opacity=0;
        timeLabel.text="";
        colon.text="";
        confirmFlag=1;
    }
});

if(confirmFlag==1){
    // Get a handle on the <text> element
const sleepLabel = document.getElementById("sleepLabel");

var sleepFlag=0;
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
        if(sleep.state=='awake'){
            centiseconds++;

            if(sleepFlag==0){
                startTime();
                sleepFlag=1;
            }
        }
        else{
            //flag=0;
        }
        if(seconds==26100){
            vibration.start("ring");
        }
    }
  
    let timerId = setInterval(timerCallback, 100);
}

// Get a handle on the <text> element
const timerLabel = document.getElementById("timerLabel");

const startTimeLabel = document.getElementById("startTimeLabel");

function startTime() {
    const today = new Date();
    const hours = zeroPad(today.getHours() % 12 || 12);
    const mins = zeroPad(today.getMinutes());
    const secs = zeroPad(today.getSeconds());

    console.log(hours+":"+mins+":"+secs);
    startTimeLabel.text=`${hours}:${mins}:${secs}`;
}

}