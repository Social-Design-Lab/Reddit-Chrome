
let time;
var endexp;
let uid;

// Define a variable in the popup

//let myUrl = `https://www.example.com/?param=${uid}`;
document.addEventListener('DOMContentLoaded', function () {
  load();
  document.querySelector('#start').addEventListener('click', startExp);
/*   document.querySelector('#endbutton').addEventListener('click', () => {
    //console.log("endbutton has been clicked");
    //alert("endbutton has been clicked");
    chrome.tabs.create({ url: myUrl }, function(tab) {
      // Save the tab ID in the variable
      alert("New tab created with ID: " + tab.id);
    });

  });  */
  

  

});
function load()
{
  show("settings");
  hide("display");
  hide("endexp");
  chrome.runtime.sendMessage({ message: "get_time" }, function(response) {
    //chrome.runtime.sendMessage({ message: "get_time" }, function(response) {
      time=response.value;

    // Send a message to the background script
      chrome.runtime.sendMessage({ message: "timer_get_user_id" }, function(response) {
        //console.log("User ID received from background script: " + response.user_id);
        uid = response.user_id;
        
     
      
        if(time == null)
        {
          // experiemnt has not started yet 
          //alert("time is undefined");
          show("settings");
          hide("display");
          hide("endexp");
          //alert("uid value from background: " + uid);
          const newUrl = `https://www.example.com/?userid=${uid}`;
          // Get a reference to the link element
          const myLink = document.getElementById("my-link");
          // Change the href attribute of the link
          myLink.setAttribute("href", newUrl);
        
        }
        else 
        {
          chrome.runtime.sendMessage({ message: "end_exp" }, function(response) {
            endexp=response.value;
            if(endexp==false)
            {
              // experiemnt started but not ended yet 
              //alert("time should be defined");
              hide("settings");
              show("display");
              hide("endexp");
              //alert("uid value from background: " + uid);
            const newUrl = `https://www.example.com/?userid=${uid}`;
              // Get a reference to the link element
              const myLink = document.getElementById("my-link");
              // Change the href attribute of the link
              myLink.setAttribute("href", newUrl);

            }
            else
            {
              // experiemnt  ended 
              //alert("time should be defined");
              hide("settings");
              hide("display");
              show("endexp");
              //alert("uid value from background: " + uid);
              const newUrl = `https://www.example.com/?userid=${uid}`;
              // Get a reference to the link element
              const myLink = document.getElementById("my-link");
              // Change the href attribute of the link
              myLink.setAttribute("href", newUrl);
            }
          });

        }
    });
      
    //});
  });


}
function show(section)
{
  document.getElementById(section).style.display = "block";
}

function showInline(section)
{
  document.getElementById(section).style.display = "inline";
}

function hide(section)
{
  document.getElementById(section).style.display = "none";
}

// call setExp function from background.js
function startExp()
{
  chrome.runtime.sendMessage({ message: "call_function" });
  hide("settings");
  hide("endexp");
  show("display");
  uid = (document.getElementById('pid').value);
 // alert("uid: " + uid);
  //alert(myUrl);
  //const tabId = tabs[0].id;
  //chrome.tabs.update(tabId, { url: newUrl });
  // Get the current active tab

chrome.runtime.sendMessage({ message: "send_userid_from_timerjs", userId: uid });
  //chrome.runtime.sendMessage({ message: 'user_id', userId: uid });


}













