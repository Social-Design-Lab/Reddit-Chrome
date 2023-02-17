// content.js
// Wait for the DOM to be fully loaded
// content cannot load axios 
let uid;

function listentobuttons()
{
  const upvoteButtons = document.querySelectorAll('[aria-label="upvote"]');
  upvoteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      var post = button.parentNode.parentNode.parentNode.getElementsByClassName('_292iotee39Lmt0MkQZ2hPV');
      var text = post[0].innerText;
      console.log(`upvote button clicked for post: "${text}"`);
      //senddatatodb(uid,"upvote", text);
    });
  });
  const downvoteButtons = document.querySelectorAll('[aria-label="downvote"]');
  downvoteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      var post = button.parentNode.parentNode.parentNode.getElementsByClassName('_292iotee39Lmt0MkQZ2hPV');
      var text = post[0].innerText;
      console.log(`downvote button clicked for post: "${text}"`);
      //senddatatodb(uid,"downvote", text);
    });
  });
}
// change number of likes function 
function changelikes()
{
    console.log("change likes has been called");
    
        // Select all elements with the class "_1rZYMD_4xjzK" (which represents the like button)
        const likeButtons = document.getElementsByClassName("_1rZYMD_4xY3gRcSS3p8ODO _25IkBM0rRUqWX5ZojEMAFQ _3ChHiOyYyUkpZ_Nm3ZyM2M");
    
        console.log("print out likebuttons length: ");
        console.log(likeButtons['length'] );
        // For each like button, change the text content to the desired number
        for (let i = 0; i < likeButtons['length']; i++) {
            likeButtons[i].textContent=100;
          }
      
}
// content.js
// receive request from background js and call change number likes 
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "change_likes") {
      changelikes();
      console.log("Received message from the background script for change likes:", request.message);
      
    }
  });
  
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "change_bgcolor") {
      changebg();
      console.log("Received message from the background script for change bg colro:", request.message);
      
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "listen_buttons") {
    listentobuttons();
    console.log("Received message from the background script for listen the button:", request.message);
    
  }
});
  
 
/* chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        window.addEventListener('load', function() {
            // Select all elements with the class "_1rZYMD_4xjzK" (which represents the like button)
            const likeButtons = document.getElementsByClassName("_1rZYMD_4xY3gRcSS3p8ODO _25IkBM0rRUqWX5ZojEMAFQ _3ChHiOyYyUkpZ_Nm3ZyM2M");
        
            console.log("print out likebuttons length: ");
            console.log(likeButtons['length'] );
            // For each like button, change the text content to the desired number
            for (let i = 0; i < likeButtons['length']; i++) {
                likeButtons[i].textContent=0;
              }
          });
}); */

function changebg()
{
    const elements = document.getElementsByClassName("uI_hDmU5GSiudtABRz_37");

    for (let i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = "red";
    }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.userId) {
    console.log("Received user ID:", request.userId);
    uid = request.userId;
  }
});
// the following code use new Fetch API to send data to mongodb however it is too new so the CORS cannot be bypassed. 
/*  function senddatatodb(uid, action, content) {
  console.log("database has been called");

  // Data to be sent to the database
  var data = {
    database: "reddit",
    collection: "users",
    dataSource: "Cluster0",
    document: {
      userid: uid,
      action: action,
      target_content: content,
    },
  };

  // Configuration for the Fetch request
  var config = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": "mhIkGApzSP3ZbITuH17wjyHwaIaiy2Igg3muuleBiSUoCqb5lg5PpTYR6HoT6gOW",
    },
    body: JSON.stringify(data),
  };

  // Make the HTTP request using Fetch
  fetch(
    "https://us-east-1.aws.data.mongodb-api.com/app/data-iycrr/endpoint/data/v1/action/insertOne",
    config
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Document inserted successfully");
      console.log(JSON.stringify(data));
    })
    .catch((error) => {
      console.log("Something went wrong");
      console.log(error);
    });
}  */
// using axios method to post data 
// it does not work due to Content Security Policy
/* var script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";
document.head.appendChild(script);
function senddatatodb(uid, action, content) {
  var axios = require('axios');

  var data = JSON.stringify({
      "database": "reddit",
      "collection": "users",
      "dataSource": "Cluster0",
      "document": 
          {
              "userid": uid,
              "action": action, 
              "target_content": content
          }

  });

  var config = {
      method: 'post',
      url: 'https://us-east-1.aws.data.mongodb-api.com/app/data-iycrr/endpoint/data/v1/action/insertOne',
      headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': 'mhIkGApzSP3ZbITuH17wjyHwaIaiy2Igg3muuleBiSUoCqb5lg5PpTYR6HoT6gOW',
      },
      data: data
  };

  axios(config)
      .then(function (response) {
          console.log("Data inserted successfully");
          console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
          console.log("Failed to insert data");
          console.log(error);
      });

}

var uuid =99999999 ; 
var text ="thisia atets";

senddatatodb(uuid,"upvote", text); */


