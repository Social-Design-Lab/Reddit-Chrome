let time;
let endexp = false;
let uid;

// Define a variable in the popup

//let myUrl = `https://www.example.com/?param=${uid}`;
document.addEventListener('DOMContentLoaded', function () {
  load();
  //document.querySelector('#start').addEventListener('click', startExp);

  document.getElementById("start").addEventListener("click", function () {
    var participantId = document.getElementById("pid").value;
    if (participantId === "") {
      alert("Participant ID is required");
    } else {
      // Your code to submit the form
      
      startExp();
    }
  });
});

function load() {
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
      } else if (endexp === false) {
        // User ID is not null and experiment is not ended
        hide("settings");
        show("display");
        hide("endexp");
      } else {
        // User ID is not null and experiment is ended
        hide("settings");
        hide("display");
        show("endexp");
        const newUrl = `https://www.example.com/?userid=${uid}`;
        // Get a reference to the link element
        const myLink = document.getElementById("my-link");
        // Change the href attribute of the link
        myLink.setAttribute("href", newUrl);
      }
    });
  });
}

function show(section) {
  document.getElementById(section).style.display = "block";
}

function hide(section) {
  document.getElementById(section).style.display = "none";
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
