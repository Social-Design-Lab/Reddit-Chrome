
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
let activetime =0;
let activetime_start_date =new Date().toLocaleDateString(); 
// get the userpid from local storage 
let survey;

chrome.storage.local.get(
  [
    'userpid',
    'likeschange',
    'likeschange1',
    'change_bgcolor',
    'change_bgcolor_condition2',
    'allbutton_and_activetime',
    'endexp',
    'activetime',
    'activetime_start_date',
    'survey'
  ],
  function (result) {
    if (result.userpid === null || result.userpid === undefined) {
      console.log('userpid has not been stored yet');
    } else {
      userpid = result.userpid;
    }
    if (result.activetime === null || result.activetime === undefined) {
      console.log('activetime has not been stored yet');
    } else {
      activetime = result.activetime;
    }
    if (result.survey === null || result.survey === undefined) {
      console.log('survey has not been stored yet');
    } else {
      survey = result.survey;
    }

    if (result.activetime_start_date === null || result.activetime_start_date === undefined) {
      console.log('activetime_start_date has not been stored yet');
    } else {
      activetime_start_date = result.activetime_start_date;
    }

    if (result.likeschange === null || result.likeschange === undefined) {
      console.log('likeschange has not been stored yet');
    } else {
      likeschange = result.likeschange;
    }

    if (result.endexp === null || result.endexp === undefined) {
      console.log('endexp has not been stored yet');
    } else {
      endexp = result.endexp;
    }

    if (result.likeschange1 === null || result.likeschange1 === undefined) {
      console.log('likeschange1 has not been stored yet');
    } else {
      likeschange1 = result.likeschange1;
    }

    if (
      result.change_bgcolor === null ||
      result.change_bgcolor === undefined
    ) {
      console.log('change_bgcolor has not been stored yet');
    } else {
      change_bgcolor = result.change_bgcolor;
    }

    if (
      result.change_bgcolor_condition2 === null ||
      result.change_bgcolor_condition2 === undefined
    ) {
      console.log('change_bgcolor_condition2 has not been stored yet');
    } else {
      change_bgcolor_condition2 = result.change_bgcolor_condition2;
    }

    if (
      result.allbutton_and_activetime === null ||
      result.allbutton_and_activetime === undefined
    ) {
      console.log('allbutton_and_activetime has not been stored yet');
    } else {
      allbutton_and_activetime = result.allbutton_and_activetime;
    }
  }
);



//// end of retrie data 



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

    // store the userpid on local so it does not disappear later
    chrome.storage.local.set({ userpid: userpid }, function() {
      console.log('userpid stored successfully.');
    });
    

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
    endDate = new Date(startDate.getTime() + 60000);
    allbutton_and_activetime=true;

    activetime_start_date =new Date().toLocaleDateString(); 

    chrome.storage.local.set({ activetime_start_date: activetime_start_date }, function() {
      console.log('activetime_start_date stored successfully.');
    });
    chrome.storage.local.set({ allbutton_and_activetime: allbutton_and_activetime }, function() {
      console.log('allbutton_and_activetime stored successfully.');
    });
    
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
          survey = true; 
              chrome.storage.local.set({ survey: survey }, function() {
                console.log('survey stored successfully.');
              });
          // background.js
            console.log("alarm goes on");
          chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            if (tabs.length === 0) {
              console.error("No active tabs found");
              if(exp_cond==1) {
                //chrome.tabs.sendMessage(tabs[0].id, { message: "change_likes" });
                likeschange1 = true;
                
                chrome.storage.local.set({ likeschange1: likeschange1 }, function() {
                  console.log('likeschange1 stored successfully.');
                });
              }
              else{
                //chrome.tabs.sendMessage(tabs[0].id, { message: "change_likes_condtion2" });
                likeschange = true;
                
                chrome.storage.local.set({ likeschange: likeschange }, function() {
                  console.log('likeschange stored successfully.');
                });
              }
              

              return;
            }
           
            // Send a message to the content script
            if(exp_cond==1) {
              chrome.tabs.sendMessage(tabs[0].id, { message: "change_likes" });
              likeschange1 = true;
              chrome.storage.local.set({ likeschange1: likeschange1 }, function() {
                console.log('likeschange1 stored successfully.');
              });

            }
            else{
              chrome.tabs.sendMessage(tabs[0].id, { message: "change_likes_condtion2" });
              likeschange = true;
              chrome.storage.local.set({ likeschange: likeschange }, function() {
                console.log('likeschange stored successfully.');
              });
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
                chrome.storage.local.set({ change_bgcolor: change_bgcolor }, function() {
                  console.log('change_bgcolor stored successfully.');
                });
                }
                else
                {
                 // chrome.tabs.sendMessage(tabs[0].id, { message: "change_bgcolor_condition2" });
                  change_bgcolor_condition2 = true;
                  chrome.storage.local.set({ change_bgcolor_condition2: change_bgcolor_condition2 }, function() {
                    console.log('change_bgcolor_condition2 stored successfully.');
                  });
                }
              return;
            }
          
            // Send a message to the content script
            if(exp_cond==1) {
            chrome.tabs.sendMessage(tabs[0].id, { message: "change_bgcolor" });
            change_bgcolor =true;
            chrome.storage.local.set({ change_bgcolor: change_bgcolor }, function() {
              console.log('change_bgcolor stored successfully.');
            });
            
            }
            else
            {
              chrome.tabs.sendMessage(tabs[0].id, { message: "change_bgcolor_condition2" });
              change_bgcolor_condition2 = true;
              chrome.storage.local.set({ change_bgcolor_condition2: change_bgcolor_condition2 }, function() {
                console.log('change_bgcolor_condition2 stored successfully.');
              });
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
            chrome.storage.local.set({ endexp: endexp }, function() {
              console.log('endexp stored successfully.');
            });
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
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "voteComment") {
    console.log("Received data from content script: ", request.data);
    insertUserVoteComments(userpid, request.data.action, request.data.comment, request.data.post);
    sendResponse({ message: "voteCommentSuccess" });
  } else if (request.message === "replyPost") {
    console.log("Received data from content script: ", request.data);
    insertUserReplyPosts(userpid, request.data.content, request.data.post);
    sendResponse({ message: "replyPostSuccess" });
  } else if (request.message === "votePost") {
    console.log("Received data from content script: ", request.data);
    insertUserVotePosts(userpid, request.data.action, request.data.post);
    sendResponse({ message: "votePostSuccess" });
  } else if (request.message === "replyComment") {
    console.log("Received data from content script: ", request.data);
    insertUserReplyComments(userpid, request.data.content, request.data.comment, request.data.post);
    sendResponse({ message: "replyCommentSuccess" });
  } else if (request.message === "updateViewedPost") {
    console.log("Received data from content script: ", request.data);
    updateUserViewedPost(userpid, request.data.post_url);
    sendResponse({ message: "updateViewedPostSuccess" });
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
      user_vote_onPosts:[],
      user_reply_onPosts:[],
      user_vote_onComments:[],
      user_reply_onComments:[],
      browser_history:[],
      active_onReddit:[]
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

// insert user vote on Comments 
function insertUserVoteComments(uid, action, comment, post) {
  const insert_date = new Date();
  fetch("https://redditchrome.herokuapp.com/api/updateUserVote_Comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userid: uid,
      user_vote_onComments: [{
        action_date: insert_date,
        user_action: action,
        action_comment: comment, 
        action_post: post
      }]
    })
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to insert user vote on comments ");
    }
  })
  .then(data => {
    console.log("User vote on comments inserted successfully:", data);
  })
  .catch(error => {
    console.error(error);
  });
}
// update the user action, reply a post
function insertUserReplyPosts(uid, content, post) {
  const insert_date = new Date();
  fetch("https://redditchrome.herokuapp.com/api/updateUserReply_Posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userid: uid,
      user_reply_onPosts: [{
        action_date: insert_date,
        reply_content: content,
        reply_post: post
      }]
    })
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to insert user vote on comments ");
    }
  })
  .then(data => {
    console.log("User vote on comments inserted successfully:", data);
  })
  .catch(error => {
    console.error(error);
  });
}


// insert user vote on post 
function insertUserVotePosts(uid, action, post) {
  const insert_date = new Date();
  fetch("https://redditchrome.herokuapp.com/api/updateUserVote_Posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userid: uid,
      user_vote_onPosts: [{
        action_date: insert_date,
        user_action: action,
        action_post: post
      }]
    })
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to insert user vote on Posts");
    }
  })
  .then(data => {
    console.log("User vote on posts inserted successfully:", data);
  })
  .catch(error => {
    console.error(error);
  });
}


// insert the user action, reply a comments
function insertUserReplyComments(uid, content,comment, post) {
  const insert_date = new Date();
  fetch("https://redditchrome.herokuapp.com/api/updateUserReply_Comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userid: uid,
      user_reply_onComments: [{
        action_date: insert_date,
        reply_content: content,
        reply_comment: comment,
        reply_post: post
      }]
    })
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to insert user vote on Posts");
    }
  })
  .then(data => {
    console.log("User vote on posts inserted successfully:", data);
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
function insertUserActive(uid,viewDate, total_time) {
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

function updateUserViewedPost(userid, post_url) {
  const viewpostDate = new Date();

  fetch("https://redditchrome.herokuapp.com/api/updateViwedPost", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userid: userid,
      viewed_posts: [{
        viewed_date: viewpostDate,
        post_url: post_url
      }]
    })
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to update viewed post");
    }
  })
  .then(data => {
    console.log("User viewed post updated successfully:", data);
  })
  .catch(error => {
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

// listen fro message from timder.js and send back survey time  
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "survey_time") {
    // Get the user ID from storage or other sources
    sendResponse({ survey: survey });
  }
});

// detect if user open new tab 
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.url) {
    if(userpid  != null && userpid != undefined)
    {
    console.log("URL changed to: " + changeInfo.url);
    insertBrowserHistory(userpid,changeInfo.url);
    }
  }
});


/* chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (tab.active && changeInfo.url) {
    console.log("URL changed to with current tab: " + changeInfo.url);
  }
}); */

// listen to active time from content js 

//let activetime_start_date =new Date(); 
//add 5 secondslet record_Date =  new Date(activetime_start_date.getTime() + 20000);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "active_time") {
  console.log("Active time: " + request.activeTime );
  if(activetime_start_date === new Date().toLocaleDateString() )
  {
    activetime=activetime+request.activeTime;

    chrome.storage.local.set({ activetime: activetime }, function() {
      console.log('activetime stored successfully.');
    });
    //insertUserActive(userpid,activetime ); 
  }
  else
  {
    console.log("a new date");
    insertUserActive(userpid,activetime_start_date,activetime ); 
    activetime=request.activeTime; 
    chrome.storage.local.set({ activetime: activetime }, function() {
      console.log('activetime stored successfully.');
    });
    activetime_start_date =new Date().toLocaleDateString(); 

    chrome.storage.local.set({ activetime_start_date: activetime_start_date }, function() {
      console.log('activetime_start_date stored successfully.');
    });
    //activetime_start_date =new Date(); 
  }
  }
  });



  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'changeSurveyValue') {
      survey = message.newValue;
      chrome.storage.local.set({ survey: survey }, function() {
        console.log('survey stored successfully.');
      });

      //console.log('Value updated to:', someValue);
    }
  });


  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === "everything_for_timer") {
      // Get the user ID from storage or other sources
      const user_id = userpid; // Replace with appropriate code to get user_id
  
      // Get the survey value
      const survey_value = survey; // Replace with appropriate code to get survey value
  
      // Get the end_exp value
      const end_exp = endexp; // Replace with appropriate code to get end_exp value
  
      console.log("Sending response with user_id:", user_id, "survey:", survey_value, "end_exp:", end_exp);
      sendResponse({ user_id: user_id, survey: survey_value, end_exp: end_exp });
    }
  });
  
  