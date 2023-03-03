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
      get_user_id_from_background();
      console.log(`upvote button clicked for post: "${text}"`);
      //senddatatodb(uid,"upvote", text);
      send_data_to_background(  uid,"upvote", text);
    });
  });
  const downvoteButtons = document.querySelectorAll('[aria-label="downvote"]');
  downvoteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      var post = button.parentNode.parentNode.parentNode.getElementsByClassName('_292iotee39Lmt0MkQZ2hPV');
      var text = post[0].innerText;
      get_user_id_from_background();
      console.log(`downvote button clicked for post: "${text}"`);
      send_data_to_background(uid,"downvote", text);
      //senddatatodb(uid,"downvote", text);
    });
  });
}
// change number of likes function 
function changelikes(num)
{
    console.log("change likes has been called");
    
        // Select all elements with the class "_1rZYMD_4xjzK" (which represents the like button)
        const likeButtons = document.getElementsByClassName("_1rZYMD_4xY3gRcSS3p8ODO _25IkBM0rRUqWX5ZojEMAFQ _3ChHiOyYyUkpZ_Nm3ZyM2M");
    
        console.log("print out likebuttons length: ");
        console.log(likeButtons['length'] );
        // For each like button, change the text content to the desired number
        for (let i = 0; i < likeButtons['length']; i++) {
            likeButtons[i].textContent=num;
          }
      
}

// content.js
// receive request from background js and call change number likes 
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "change_likes") {
      changelikes(100);
      console.log("Received message from the background script for change likes:", request.message);
      
    }
  });

// conditon 2 change number likes 
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "change_likes_condtion2") {
    changelikes(56);
    console.log("Received message from the background script for change likes:", request.message);
    
  }
});
  
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "change_bgcolor") {
      changebg("red");
      console.log("Received message from the background script for change bg colro:", request.message);
      
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "change_bgcolor_condition2") {
    changebg("green");
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

function changebg(bgcl)
{
    const elements = document.getElementsByClassName("uI_hDmU5GSiudtABRz_37");

    for (let i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = bgcl;
    }
}


function send_data_to_background(  id, action, target)
{
  // Send data to the background script
chrome.runtime.sendMessage({
  message: "data",
  data: {
      userid: id,
      action: action,
      target_content: target
  }
});

}

// alert user the experiment has ended 
function end_exp_alert()
{
  alert("The experiment has ended. Please check the chrome extension for next step.");
}
// listen to end of experiment from backend js 
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "exp_ended"){
    send_data_to_background("", "User Scrolling Activity", scrollsArr);
    scrollsArr = [];
    // handle the message
    end_exp_alert();
    console.log("experiment has ended from content js");
  }
});

function get_user_id_from_background()
{
  // Send a message to the background script to request the user ID
chrome.runtime.sendMessage({ message: "get_user_id_frombackground" }, function(response) {
  // Handle the response from the background script
  if (response && response.userId) {
    // Do something with the user ID
    uid=response.userId;
    console.log(`Content Received user ID from background: ${response.userId}`);
  } else {
    console.log("User ID not found");
  }
});

}

var scrollsArr = [], updateEachPixel = window.innerHeight / 2;
var lastKnownScrollPosition = Math.round(window.scrollY / updateEachPixel);
window.onscroll = function () {
    currentScrollPosition = Math.round(window.scrollY / updateEachPixel);
    if (lastKnownScrollPosition != currentScrollPosition) {
        console.log(window.scrollY);

        if (lastKnownScrollPosition > currentScrollPosition) {
            console.log("up");
            scrollsArr.push("up")
            //send_data_to_background("", "scroll", "up")
        } else {
            console.log("down");
            scrollsArr.push("down")
            //send_data_to_background("", "scroll", "down")
        }

        lastKnownScrollPosition = currentScrollPosition;
        //send data to database
    }

};