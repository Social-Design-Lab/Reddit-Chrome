
var startDate ;
var likesDate; 
var bgDate; 
let likeschange = false;
var a = 1;
var b = 2;
let endexp =false;
let userpid ;
let likeschange1= false;
let change_bgcolor = false; 
let change_bgcolor_condition2 = false;
let allbutton_and_activetime = false;

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.url) {
    console.log("The tab URL has changed");
    if (changeInfo.url.includes("reddit.com")) {
      if (changeInfo.url.includes("/r/") || changeInfo.url.includes("/comments/")) {
        console.log("The URL is a post and we want to call content js ");
        chrome.tabs.sendMessage(tabId, {message: "run_my_code"});
      } 
      else {
      console.log("The URL is the Reddit home page");
      }
    }
  }
  });

// Listen for messages from the popup script// store uid from index js 
// Listen for messages from the popup script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.message === "send_userid_from_timerjs" && message.userId) {
    // Do something with the user ID
    userpid = message.userId;
    insertdata(userpid);
    console.log(`Background Received user ID from timer js: ${message.userId}`);
  }
});

//give all setup to content js when the experiment already started and user opened a new tab
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "get_all_setup") {
  sendResponse({

  likeschange1:likeschange1,
  likeschange:likeschange,
  change_bgcolor:change_bgcolor,
  change_bgcolor_condition2:change_bgcolor_condition2,
  allbutton_and_activetime:allbutton_and_activetime

  });
  }
  });


// generate random number between a and b (include a and b) 
// this will be used to assign participant into different condtion 
function getRandomNumber(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

let exp_cond = getRandomNumber(a, b);

// setup alarm
function setExp()
{
    //startDate = new Date(new Date().getTime()+(5*24*60*60*1000));
    startDate = new Date();
    //add 5 seconds
    likesDate = new Date(startDate.getTime() + 5000);
    bgDate = new Date(startDate.getTime() + 10000);
    endDate = new Date(startDate.getTime() + 20000);
    allbutton_and_activetime=true;
    // start the experiment(listening the upvote and downvote buttons)
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (tabs.length === 0) {
        console.error("No active tabs found");
        return;
      }
    
      // Send a message to the content script
      chrome.tabs.sendMessage(tabs[0].id, { message: "listen_buttons" });
      chrome.tabs.sendMessage(tabs[0].id, { message: "newcomments_buttons" });
    });
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
              if(exp_cond==1) {
                //chrome.tabs.sendMessage(tabs[0].id, { message: "change_likes" });
                likeschange1 = true;
              }
              else{
                //chrome.tabs.sendMessage(tabs[0].id, { message: "change_likes_condtion2" });
                likeschange = true;
              }
              return;
            }
           
            // Send a message to the content script
            if(exp_cond==1) {
              chrome.tabs.sendMessage(tabs[0].id, { message: "change_likes" });
              likeschange1 = true;
            }
            else{
              chrome.tabs.sendMessage(tabs[0].id, { message: "change_likes_condtion2" });
              likeschange = true;
            }
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
              if(exp_cond==1) {
                //chrome.tabs.sendMessage(tabs[0].id, { message: "change_bgcolor" });
                change_bgcolor =true;
                }
                else
                {
                 // chrome.tabs.sendMessage(tabs[0].id, { message: "change_bgcolor_condition2" });
                  change_bgcolor_condition2 = true;
                }
              return;
            }
          
            // Send a message to the content script
            if(exp_cond==1) {
            chrome.tabs.sendMessage(tabs[0].id, { message: "change_bgcolor" });
            change_bgcolor =true;
            }
            else
            {
              chrome.tabs.sendMessage(tabs[0].id, { message: "change_bgcolor_condition2" });
              change_bgcolor_condition2 = true;
            }
          });
         
          
        }
      });

   // end of the experiment redirct to the post survey 
      chrome.alarms.create("endAlarm", {
        when: endDate.getTime()
      });
      
      chrome.alarms.onAlarm.addListener(function(alarm) {
        if (alarm.name === "endAlarm") {
            endexp = true;
            console.log("exp ended from background");
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
              if (tabs.length === 0) {
                console.error("No active tabs found");
                return;
              }
            
              // Send a message to the content script
              chrome.tabs.sendMessage(tabs[0].id, { message: "exp_ended" });
              
            });
            const newUrl = `https://www.example.com/?userid=${userpid}`;
            chrome.tabs.create({ url: newUrl });
            // Set the badge text
            chrome.action.setBadgeText({ text: 'Click' });

            // Set the badge background color
            chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });


            //moldapblhmdekbocbchgadlodkclkgke
            // Delay for 30 seconds (in milliseconds)
            const delayInMilliseconds = 86400000;

            /////*********** uncomment in the experiment  */
            // Call chrome.management.uninstallSelf() after the delay
            /* setTimeout(() => {
              chrome.management.uninstallSelf();
            }, delayInMilliseconds);
 */         
        }
      });     


      
}

// reponse start time to timer.js this is send response  
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.message === "get_time") {
        sendResponse({value: startDate});
      }
    }
  );

  // end of the experiment 
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.message === "end_exp") {
        sendResponse({value: endexp});
      }
    }
  );

// return the uid to timer.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "need_uid_from_backgroun") {
      sendResponse({value: userpid});
      console.log("recived request from timer js for uid: "+userpid);
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

// open db as the function name
function openDB() {
    openRequest.onsuccess = function() {
      let db = openRequest.result;
      console.log('Successfully opened database');
  
      // Your database operations here
    };
  
    openRequest.onerror = function(error) {
      console.error('Failed to open database:', error);
    };
}



// Listen for messages from the content script for insert data into database 
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "data") {
      console.log("Received data from content script: ", request.data);
      //console.log("userid:" ,request.data.userid );
      //insertdata(request.data.userid,request.data.action, request.data.target_content);
      insertUserAction(userpid,request.data.action, request.data.target_content );
      console.log("this is after insertdata function");
      //insertdata(2131,"fdf", "fdeefde");
      //data_export();
      // Send a response back to the content script
      sendResponse({
          message: "success"
      });
  }
});


///// let's try connect with mongodb database

function insertdata(uid)
{
  //var insert_date=  new Date();
  fetch("https://redditchrome.herokuapp.com/api/insert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      
      userid: uid,
      user_action_onReddit:[],
      browser_history:[]
    })
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to insert data");
    }
  })
  .then(data => {
    console.log("Data inserted successfully:", data);
  })
  .catch(error => {
    console.error(error);
  });
  
}

// insert user action into db
function insertUserAction(uid, action, target) {
  const insert_date = new Date();
  fetch("https://redditchrome.herokuapp.com/api/updateUserAction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userid: uid,
      user_action_onReddit: [{
        action_date: insert_date,
        user_action: action,
        action_target: target
      }]
    })
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to insert user action");
    }
  })
  .then(data => {
    console.log("User action inserted successfully:", data);
  })
  .catch(error => {
    console.error(error);
  });
}

// insert browswer history 
function insertBrowserHistory(uid, browserUrl) {
  const browserDate = new Date();
  const requestBody = {
    userid: uid,
    browser_history: [
      {
        browser_date: browserDate,
        browser_url: browserUrl,
      },
    ],
  };

  fetch("https://redditchrome.herokuapp.com/api/updateBrowserHistory", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to insert data");
      }
    })
    .then((data) => {
      console.log("Data inserted successfully:", data);
    })
    .catch((error) => {
      console.error(error);
    });
}
// insert user active time on Reddit  
function insertUserActive(uid, total_time) {
  const viewDate = new Date().toLocaleDateString();
  const requestBody = {
    userid: uid,
    active_onReddit: [
      {
        timeOnSite: total_time,
        timeOnSite_date: viewDate,
      },
    ],
  };

  fetch("https://redditchrome.herokuapp.com/api/updateActiveOnReddit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to insert data");
      }
    })
    .then((data) => {
      console.log("Data inserted successfully:", data);
    })
    .catch((error) => {
      console.error(error);
    });
}

// Listen for messages from the content script and send back userid 
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.message === "get_user_id_frombackground") {

      // Send the user ID back to the content script
      sendResponse({ userId: userpid });
  }
});

// listen fro message from timder.js and send back userid 
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "timer_get_user_id") {
    // Get the user ID from storage or other sources
    sendResponse({ user_id: userpid });
  }
});

// detect if user open new tab 
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.url) {
    console.log("URL changed to: " + changeInfo.url);
    insertBrowserHistory(userpid,changeInfo.url);
  }
});


/* chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (tab.active && changeInfo.url) {
    console.log("URL changed to with current tab: " + changeInfo.url);
  }
}); */

// listen to active time from content js 
let activetime_start_date =new Date().toLocaleDateString(); 
//let activetime_start_date =new Date(); 
//add 5 secondslet record_Date =  new Date(activetime_start_date.getTime() + 20000);
let activetime =0;
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "active_time") {
  console.log("Active time: " + request.activeTime );
  if(activetime_start_date === new Date().toLocaleDateString() )
  {
    activetime=activetime+request.activeTime;
    //insertUserActive(userpid,activetime ); 
  }
  else
  {
    insertUserActive(userpid,activetime ); 
    activetime=0; 
    activetime_start_date =new Date().toLocaleDateString(); 
    //activetime_start_date =new Date(); 
  }
  }
  });





