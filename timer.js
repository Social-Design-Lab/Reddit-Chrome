let time;
let endexp = false;
let uid;

// Define a variable in the popup
function show(section) {
    document.getElementById(section).style.display = "block";
  }
  
  function hide(section) {
    document.getElementById(section).style.display = "none";
  }

//let myUrl = `https://www.example.com/?param=${uid}`;
document.addEventListener('DOMContentLoaded', function () {
  //load();
  //document.querySelector('#start').addEventListener('click', startExp);
  hide("settings");
  hide("display");
  hide("endexp");
  hide("midpop");
  document.getElementById("start").addEventListener("click", function () {
    var participantId = document.getElementById("pid").value;
    if (participantId === "") {
      alert("Participant ID is required");
    } else {
        setTimeout(() => {
            show("midpop");
          }, 2000);
      // Your code to submit the form
      //create a timer for 2 seconds
      
      startExp();
    }
  });

  document.getElementById("welcome-next").addEventListener("click", load);

  document.getElementById("midpop-submit").addEventListener("click", midpopupSubmit);

  initMidpopup();
});

var q1selected = 0;
var q2selected = 0;

function initMidpopup(){
var arr = document.querySelectorAll(".btn-scale");

for (var i = 0; i < arr.length; i++) {
  arr[i].addEventListener("click", midpopupButtonSelect);
}

}

function midpopupButtonSelect(event){
var array = event.target.classList;

for (var i = 0; i < array.length; i++) {
    if(array[i] == "q1"){
        q1selected = event.target.innerHTML;
    }else if(array[i] == "q2"){
        q2selected = event.target.innerHTML;
    }
}
}
function midpopupSubmit(){
    console.log(q1selected, q2selected);
    hide("midpop");
}

function load() {
    setTimeout(() => {
        show("midpop");
      }, 2000);

    hide("welcome");
  chrome.runtime.sendMessage({ message: "end_exp" }, function (response) {
    endexp = response.endexp;

    // Send a message to the background script
    chrome.runtime.sendMessage({ message: "timer_get_user_id" }, function (response) {
      uid = response.user_id;

      if (uid == null) {
        // User ID is null
        show("settings");
        hide("display");
        hide("endexp");
      } else if (endexp === true){
        // User ID is not null and experiment is ended
        hide("settings");
        hide("display");
        show("endexp");
        const newUrl = `https://www.example.com/?userid=${uid}`;
        // Get a reference to the link element
        const myLink = document.getElementById("my-link");
        // Change the href attribute of the link
        myLink.setAttribute("href", newUrl);
      } else {
        // User ID is not null and experiment is not ended
        hide("settings");
        show("display");
        hide("endexp");
      }});
  });
}

// call setExp function from background.js
function startExp() {
  chrome.runtime.sendMessage({ message: "call_function" });
  hide("settings");
  hide("endexp");
  show("display");
  uid = document.getElementById("pid").value;
  chrome.runtime.sendMessage({ message: "send_userid_from_timerjs", userId: uid });
}