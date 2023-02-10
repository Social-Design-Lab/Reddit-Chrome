
var startDate ;
var likesDate; 
var bgDate; 
var likeschange = false;
// setup alarm
function setExp()
{
    //startDate = new Date(new Date().getTime()+(5*24*60*60*1000));
    startDate = new Date();
    //add 5 seconds
    likesDate = new Date(startDate.getTime() + 5000);
    bgDate = new Date(startDate.getTime() + 10000);
    // change likes number
    chrome.alarms.create("myAlarm", {
        when: likesDate.getTime()
      });
      
      chrome.alarms.onAlarm.addListener(function(alarm) {
        if (alarm.name === "myAlarm") {
          // background.js
            console.log("alarm goes on");
          chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            if (tabs.length === 0) {
              console.error("No active tabs found");
              return;
            }
          
            // Send a message to the content script
            chrome.tabs.sendMessage(tabs[0].id, { message: "change_likes" });
          });
         
          
        }
      });
      // change background color 
      chrome.alarms.create("bgAlarm", {
        when: bgDate.getTime()
      });
      
      chrome.alarms.onAlarm.addListener(function(alarm) {
        if (alarm.name === "bgAlarm") {
          // background.js
            
          chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            if (tabs.length === 0) {
              console.error("No active tabs found");
              return;
            }
          
            // Send a message to the content script
            chrome.tabs.sendMessage(tabs[0].id, { message: "change_bgcolor" });
          });
         
          
        }
      });
}

// send start time to timer.js this is send response  
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.message === "get_time") {
        sendResponse({value: startDate});
      }
    }
  );

// call background setExp function from timer.js this is send response 
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.message === "call_function") {
        setExp();
      }
    }
  );






