let time;
let endexp = false;
let uid;
let pop_survey = false;
let options = 0;
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
  document.getElementById("midpop-submit").addEventListener("click", function () {
    const selectedQ1 = document.querySelector('[data-question-group="q1"].active');
    const selectedQ2 = document.querySelector('[data-question-group="q2"].active');
    //alert('Selected value for Q1: ' + selectedQ1.textContent + '\nSelected value for Q2: ' + selectedQ2.textContent);

    chrome.runtime.sendMessage({
      message: "send_question_data_from_timerjs_chrome",
      data: {
        q1selected: selectedQ1.textContent,
        q2selected: selectedQ2.textContent
      }
    });
    chrome.runtime.sendMessage({ action: 'changeSurveyValue', newValue: false });
    hide("settings");
    show("display");
    hide("endexp");
    hide("midpop");
  });
  // popup run after dom is loaded
  var $ = document.querySelector.bind(document)
  var btnOptions = document.getElementById("btnOptions");
  btnOptions.addEventListener("change", function () {
    // Perform an action based on the selected option
    options = btnOptions.selectedIndex;

  });
  $("#btnHighlight").onclick = e => {
    //console.log("btnHighlight is clicked")
    //alert("btnHighlight: "+ options)
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          files: ['content.js'],
        },
        () => {
          chrome.tabs.sendMessage(tabs[0].id, { message: "send_options", optionalValue: options }, function (response) {
            // Handle the response from the content script, if needed
          });
        }
      );
    });





  }
  $("#btnReset").onclick = e => {
    //console.log("btnHighlight is clicked")
    //alert("btnReset: "+ options)
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          files: ['content.js'],
        },
        () => {
          chrome.tabs.sendMessage(tabs[0].id, { message: "send_options", optionalValue: -1 }, function (response) {
            // Handle the response from the content script, if needed
          });
        }
      );
    });

  }


});

function load() {


  // Send a message to the background script
  chrome.runtime.sendMessage({ message: "everything_for_timer" }, function (response) {
    uid = response.user_id;
    endexp = response.end_exp;
    pop_survey = response.survey;

    if (uid == null) {
      // User ID is null

      show("settings");
      hide("display");
      hide("endexp");
      hide("midpop");

    } else if (endexp == false) {
      // User ID is not null and experiment is not ended
      // time for survey 

      if (pop_survey === true) {
        hide("settings");
        hide("display");
        hide("endexp");
        show("midpop");

      }
      /// time display experiment information and filters 
      else {
        hide("settings");
        show("display");
        hide("endexp");
        hide("midpop");
      }
    }
    else {
      // User ID is not null and experiment is ended
      hide("settings");
      hide("display");
      show("endexp");
      hide("midpop");
      const newUrl = `https://lehigh.co1.qualtrics.com/jfe/form/SV_8IIgAqvzRvc1D0i?uid=${uid}`;
      // Get a reference to the link element
      const myLink = document.getElementById("my-link");
      // Change the href attribute of the link
      myLink.setAttribute("href", newUrl);
    }

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
  hide("midpop");
  uid = document.getElementById("pid").value;
  chrome.runtime.sendMessage({ message: "send_userid_from_timerjs", userId: uid });
}




// Add this script block inside the head
// Add this script block inside the head
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".btn-scale");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const questionGroup = this.dataset.questionGroup;
      const sameGroupButtons = document.querySelectorAll(`[data-question-group="${questionGroup}"]`);

      sameGroupButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      this.classList.add("active");
    });
  });
});





