
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

    // start the experiment(listening the upvote and downvote buttons)
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (tabs.length === 0) {
        console.error("No active tabs found");
        return;
      }
    
      // Send a message to the content script
      chrome.tabs.sendMessage(tabs[0].id, { message: "listen_buttons" });
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
      console.log("userid:" ,request.data.userid );
      insertdata(request.data.userid,request.data.action, request.data.target_content);
      console.log("this is after insertdata function");
      //insertdata(2131,"fdf", "fdeefde");
      data_export();
      // Send a response back to the content script
      sendResponse({
          message: "success"
      });
  }
});

//insertdata(2131,"fdf", "fdeefde");

////// local database .....
/* var uniquekey = 0;

const DB_NAME = 'my_database';
const DB_VERSION = 1;

// Open a connection to the database
let openRequest = indexedDB.open(DB_NAME, DB_VERSION);

openRequest.onupgradeneeded = function() {
  let db = openRequest.result;
  let objectStore = db.createObjectStore('my_object_store', {keyPath: 'row_number'});
  objectStore.createIndex("id", "id", { unique: false });
  objectStore.createIndex("action", "action", { unique: false });
  objectStore.createIndex("target_content", "target_content", { unique: false });
};

function insertdata(userid, useraction, target) {
  let openRequest = indexedDB.open(DB_NAME, DB_VERSION);
  openRequest.onsuccess = function() {
    let db = openRequest.result;
    console.log('Successfully opened database');

    // Insert data into the database
    let transaction = db.transaction(['my_object_store'], 'readwrite');
    let objectStore = transaction.objectStore('my_object_store');
    let request = objectStore.add({row_number:uniquekey, id: userid, action: useraction, target_content: target});

    request.onsuccess = function() {
      console.log('Successfully inserted data into the database');
      uniquekey =uniquekey+1;
    };

    request.onerror = function(error) {
      console.error('Failed to insert data into the database:', error);
    };
  };

  openRequest.onerror = function(error) {
    console.error('Failed to open database:', error);
  };
}

function data_export() {
  console.log("data exported has been called");
  let openRequest = indexedDB.open(DB_NAME, DB_VERSION);
  openRequest.onsuccess = function() {
    let db = openRequest.result;
    console.log('Successfully opened database');

    let transaction = db.transaction(['my_object_store'], 'readonly');
    let objectStore = transaction.objectStore('my_object_store');

    let request = objectStore.openCursor();

    request.onsuccess = function(event) {
      let cursor = event.target.result;
      if (cursor) {
        console.log('Data:', cursor.value);
        cursor.continue();
      } else {
        console.log('No more data');
      }
    };

    request.onerror = function(error) {
      console.error('Failed to retrieve data:', error);
    };
  };
} */

// Insert data into the database two times
//insertdata("user1", "like", "post1");
//data_export();
//insertdata("user2", "dislike", "post2");

// Print all data two times
//data_export();
////// end of local database 


///// let's try connect with mongodb database

function insertdata(uid, action, target)
{
  fetch("https://redditchrome.herokuapp.com/api/insert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userid: uid,
      user_action: action,
      target_content:target
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






