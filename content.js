// content.js
// Wait for the DOM to be fully loaded
// content cannot load axios 
//let uid;
//document.addEventListener("DOMContentLoaded", function(event) {
  // Your code here
let active_triggered =false;
// below code is make sure even there is no fresh on page ,when user click post on reddit main page the effect still apply
//chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  //if (request.message === "run_my_code") {
  //alert(" background calls run my code funtion");
  //alert("from main page to post age");
  

  var newobserver = new MutationObserver(function(mutationsList, observer) {
    for (var mutation of mutationsList) {
      if (mutation.type === 'childList') {
        for (var node of mutation.addedNodes) {
          if (node.nodeName === 'DIV') {
            //console.log("The class of the added div is: " + node.className);
            if (node.classList.contains("_2M2wOqmeoPVvcSsJ6Po9-V") ) {
             // alert("A new div with the desired class name has been added to the HTML!");
              
             //alert("run my code is called");
// if user already start exerpeiment , we want to start the experiment when user open a new tab
chrome.runtime.sendMessage({ message: "get_all_setup" }, function(response) {
  console.log("All button and Active time: " + response.allbutton_and_activetime);
  //console.log("Active time start date: " + response.activetime_start_date);
  console.log("change likes to 100: " + response.likeschange1);
  console.log("change likes to 56: " + response.likeschange);
  console.log("change background color to red: " + response.change_bgcolor);
  console.log("change background color to green: " + response.change_bgcolor_condition2);
  
  
    //alert("window on load is called");
    if(response.likeschange1)
    {
      console.log(" change likes");
      changelikes(100);
    }
    if(response.likeschange)
    {
      

      changelikes(56);
      
    }
    if(response.change_bgcolor)
    {
      changebg("red");
    }
    if(response.change_bgcolor_condition2)
    {
      changebg("green");
    }
    if(response.allbutton_and_activetime)
    {
      console.log("allbutton_and_activetime ");
      listentobuttons();
      monitor_new_comment();
      
      
    }

  
  
});
            }
          }
        }
      }
    }
  });
  
  newobserver.observe(document.body, {childList: true, subtree: true});
  
  

  //alert("run my code is called");
//}
 // });
// this is used to make sure the content js change reddit page when user open a new tab or refresh the page since tabupdate does not work for this
 window.onload = function(){
runMyCode();
} 
  

function runMyCode() {
    // Your code here
//alert("run my code is called");
// if user already start exerpeiment , we want to start the experiment when user open a new tab
chrome.runtime.sendMessage({ message: "get_all_setup" }, function(response) {
  console.log("All button and Active time: " + response.allbutton_and_activetime);
  //console.log("Active time start date: " + response.activetime_start_date);
  console.log("change likes to 100: " + response.likeschange1);
  console.log("change likes to 56: " + response.likeschange);
  console.log("change background color to red: " + response.change_bgcolor);
  console.log("change background color to green: " + response.change_bgcolor_condition2);
  
  
    //alert("window on load is called");
    if(response.likeschange1)
    {
      console.log(" change likes");
      changelikes(100);
    }
    if(response.likeschange)
    {
      

      changelikes(56);
      
    }
    if(response.change_bgcolor)
    {
      changebg("red");
    }
    if(response.change_bgcolor_condition2)
    {
      changebg("green");
    }
    if(response.allbutton_and_activetime)
    {
      console.log("allbutton_and_activetime ");
      if(active_triggered )
      {
        
      }
      else{
        user_active_time();
      }
      listentobuttons();
      monitor_new_comment();
      
      
    }

  
  
});
}
//});


function listentobuttons()
{
  const upvoteButtons = document.querySelectorAll('[aria-label="upvote"]');
  upvoteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      var post = button.parentNode.parentNode.parentNode.getElementsByClassName('_292iotee39Lmt0MkQZ2hPV');
      var text = post[0].innerText;
      //var uid = get_user_id_from_background();
      console.log(`upvote button clicked for post: "${text}"`);
      //senddatatodb(uid,"upvote", text);
      send_data_to_background( "upvote", text);
    });
  });
  const downvoteButtons = document.querySelectorAll('[aria-label="downvote"]');
  downvoteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      var post = button.parentNode.parentNode.parentNode.getElementsByClassName('_292iotee39Lmt0MkQZ2hPV');
      var text = post[0].innerText;
      //var uid = get_user_id_from_background();
      console.log(`downvote button clicked for post: "${text}"`);
      send_data_to_background("downvote", text);
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
    user_active_time();
    active_triggered=true;
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


function send_data_to_background(  action, target)
{
  // Send data to the background script
chrome.runtime.sendMessage({
  message: "data",
  data: {
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
    // handle the message
    end_exp_alert();
    console.log("experiment has ended from content js");
  }
});

// dont need user id anymore
/* function get_user_id_from_background() {
  // Send a message to the background script to request the user ID
  chrome.runtime.sendMessage({ message: "get_user_id_frombackground" }, function(response) {
    // Handle the response from the background script
    if (response && response.userId) {
      // Do something with the user ID
      var uid = response.userId;
      console.log(`Content received user ID from background: ${uid}`);
      return uid;
    } else {
      console.log("User ID not found");
      return null;
    }
  });
}
 */


// set up user makes  new comments 
function monitor_new_comment()
{
  //_3MknXZVbkWU8JL9XGlzASi
  console.log("monitor_new_comment is called");
  
  const div = document.querySelector('._3MknXZVbkWU8JL9XGlzASi');
const firstSubmitButtons = div.querySelector('button');
console.log("top submit comments: " ,firstSubmitButtons);
//const firstSubmitButtons = document.querySelector('button[type="submit"]');
            //console.log(commentSubmitButton);
            if (firstSubmitButtons && !firstSubmitButtons.hasEventListener) {
              firstSubmitButtons.addEventListener('click', function(event) {
                console.log('Comment submit button clicked!');
                console.log('My span:', firstSubmitButtons.parentNode.parentNode.parentNode.innerText);
                //var uid =get_user_id_from_background();

                send_data_to_background("insert_comment", firstSubmitButtons.parentNode.parentNode.parentNode.innerText);
              });
              // Set flag to indicate that event listener has been added
              firstSubmitButtons.hasEventListener = true;
            }
//user insert new comments 

const allButtons = document.querySelectorAll('button._374Hkkigy4E4srsI2WktEd');
const replyButtons = Array.from(allButtons).filter(button => button.innerText === "Reply");

replyButtons.forEach(replyButton => {
  replyButton.addEventListener('click', function(event) {
    console.log('Reply button clicked!');
    const formContainer = replyButton.parentNode.parentNode.parentNode ;
    const observer = new MutationObserver((mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          // The DOM inside formContainer has changed
          //console.log('DOM inside formContainer has changed');
          const commentSubmitButtons = formContainer.querySelector('button[type="submit"]');
            //console.log(commentSubmitButton);
            if (commentSubmitButtons && !commentSubmitButtons.hasEventListener) {
              commentSubmitButtons.addEventListener('click', function(event) {
                console.log('Comment submit button clicked!');
                console.log('My span:', commentSubmitButtons.parentNode.parentNode.parentNode.innerText);
                //var uid =get_user_id_from_background();
                send_data_to_background("insert_comment", commentSubmitButtons.parentNode.parentNode.parentNode.innerText);
              });
              // Set flag to indicate that event listener has been added
              commentSubmitButtons.hasEventListener = true;
            }
        }
      }
    });
    
    // Start observing the formContainer for changes
    observer.observe(formContainer, { childList: true, subtree: true });
  });
});
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "newcomments_buttons") {
    monitor_new_comment();
    console.log("Received message from the background script for listen new comments:", request.message);
    
  }
});

function user_active_time(){
var idleTime = 0;
var activetime = 0; 
var lastactivetime = 0;
alert("user active time is inserted");
document.addEventListener("mousemove", function (e) {
  idleTime = 0;
});
document.addEventListener("keypress", function (e) {
  idleTime = 0;
});
document.addEventListener("click", function (e) {
  idleTime = 0;
});

document.addEventListener('scroll', function() {
  idleTime = 0;
});

let idleInterval = setInterval(timerIncrement, 1000);

function timerIncrement() {
  idleTime = idleTime + 1;
  if (idleTime > 5) {
    console.log("The user is inactive");
    if (lastactivetime !== 0) {
      activetime = Date.now() - lastactivetime;
      lastactivetime = 0;
      // send active time to background script
      try {
        if (chrome.runtime.id) {
          chrome.runtime.sendMessage({
            message: "active_time",
            activeTime: activetime
          });
        }
      } catch (error) {
        console.error(error);
      }
      
      console.log(activetime);
    }
  } else {
    if (lastactivetime === 0) {
      lastactivetime = Date.now();
    }
    console.log("The user is active");
  }
}
}
