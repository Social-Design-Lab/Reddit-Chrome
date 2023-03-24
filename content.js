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

// this is used for user is on post page and then back to main page
let homePageObserved = false;
const redditBaseUrl = "https://www.reddit.com/";
const urlObserver = new MutationObserver(function(mutations) {
mutations.forEach(function(mutation) {
if (!homePageObserved && (window.location.href === "https://www.reddit.com/" || window.location.href === "https://www.reddit.com/?feed=home")) {
alert("User has navigated to the Reddit home page");
homePageObserved = true;
chrome.runtime.sendMessage({ message: "get_all_setup" }, function(response) {
  
   
    if(response.allbutton_and_activetime)
    {
      monitor_viewed_post();
      
    }

  
  
});
urlObserver.disconnect();
}
});
});

urlObserver.observe(document.body, {
childList: true,
subtree: true
});

// this is used when user is on home page and click the post and then back to home page
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
      //console.log(" change likes");
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
      if (location.hostname === "www.reddit.com" && location.pathname === "/") {
        alert("This is the Reddit main page.");
        monitor_viewed_post();
        
      } else {
        alert("This is not the Reddit main page.");
        monitor_new_comment();
        insert_comment();
        listentobuttons();
        
      }
     
      
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
      //console.log(" change likes");
/*       document.addEventListener('DOMContentLoaded', function() {
        // Your code here will run when the DOM is fully loaded
        
        changelikes(100);
      }); */
      changelikes(100);
    }
    if(response.likeschange)
    {
      
 /*      document.addEventListener('DOMContentLoaded', function() {
        // Your code here will run when the DOM is fully loaded
      }); */
      
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
      if (location.hostname === "www.reddit.com" && location.pathname === "/") {
        alert("This is the Reddit main page.");
        //monitor_viewed_post();
        
      } else {
        alert("This is not the Reddit main page.");
        monitor_new_comment();
        insert_comment();
        listentobuttons();
        
      }
     
      
    }

  
  
});
}
//});


function listentobuttons()
{
  const upvoteButtons = document.querySelectorAll('[aria-label="upvote"]');
  upvoteButtons.forEach((button) => {
    if (!button.getAttribute('data-listener-attached')) {
      button.addEventListener('click', () => {
        var post = button.parentNode.parentNode.parentNode.getElementsByClassName('_292iotee39Lmt0MkQZ2hPV');
        var text = post[0].innerText;
        //var uid = get_user_id_from_background();
        if (text=='')
        {
          const currentUrl = window.location.href;
          console.log(`downvote button clicked for post: "${currentUrl}"`);
          send_votePost_to_background("downvote",currentUrl);
        }
        //var uid = get_user_id_from_background();
        
        else
        {
        console.log(`upvote button clicked for post: "${text}"`);
        //senddatatodb(uid,"upvote", text);
        send_voteComment_to_background("upvote",text,window.location.href );
        }
      });
      button.setAttribute('data-listener-attached', 'true');
    }
  });
  const downvoteButtons = document.querySelectorAll('[aria-label="downvote"]');
  downvoteButtons.forEach((button) => {
    if (!button.getAttribute('data-listener-attached')) {
      button.addEventListener('click', () => {
        var post = button.parentNode.parentNode.parentNode.getElementsByClassName('_292iotee39Lmt0MkQZ2hPV');
        var text = post[0].innerText;
        if (text=='')
        {
          const currentUrl = window.location.href;
          console.log(`downvote button clicked for post: "${currentUrl}"`);
          send_votePost_to_background("downvote",currentUrl);
        }
        //var uid = get_user_id_from_background();
        
        else
        {
          console.log(`downvote button clicked for post: "${text}"`);
          //send_data_to_background("downvote_comment", text);
          send_voteComment_to_background("downvote",text,window.location.href );
        }
      //senddatatodb(uid,"downvote", text);

      });
      button.setAttribute('data-listener-attached', 'true');
    }
  });

 


}
// change number of likes function 
function changelikes(num)
{
    //console.log("change likes has been called");
   
      // Your code here will run when the DOM is fully loaded
   
    
        // Select all elements with the class "_1rZYMD_4xjzK" (which represents the like button)
        const likeButtons = document.getElementsByClassName("_1rZYMD_4xY3gRcSS3p8ODO _25IkBM0rRUqWX5ZojEMAFQ _3ChHiOyYyUkpZ_Nm3ZyM2M");
    
        //console.log("print out likebuttons length: ");
        //console.log(likeButtons['length'] );
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
// this is when the experimenet first start
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "listen_buttons") {
    user_active_time();
    if (location.hostname === "www.reddit.com" && location.pathname === "/") {
      alert("This is the Reddit main page.");
      monitor_viewed_post();
      
    } else {
      alert("This is not the Reddit main page.");
      monitor_new_comment();
      insert_comment();
      listentobuttons();
      
    }
   
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

// fake comments test
function insert_comment()
{
const parentContainer = document.querySelector('div._1YCqQVO-9r-Up6QPB9H6_4');
const commentDiv = document.querySelector('div.Comment');
const clonedCommentDiv = commentDiv.cloneNode(true);

const pElement = clonedCommentDiv.querySelector('p');
const aElement = clonedCommentDiv.querySelector('a.wM6scouPXXsFDSZmZPHRo');

// Change the content of the <p> element
aElement.textContent = 'COVID19_user';

// Change the content of the <a> element
pElement.textContent = 'Vaccine is bad for you!!';

// Store the parent of the pElement
const pElementParent = pElement.parentElement;

// Remove all other <p> elements
const allPElements = clonedCommentDiv.querySelectorAll('p');
allPElements.forEach(element => {
  pElementParent.removeChild(element);
});

// Append the modified pElement back to the parent
pElementParent.appendChild(pElement);


parentContainer.insertBefore(clonedCommentDiv, parentContainer.children[0]);

}


function changebg(bgcl)
{
    const elements = document.getElementsByClassName("uI_hDmU5GSiudtABRz_37");

    for (let i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = bgcl;
    }
}

/// send user actions to backgroun then send to database section
function send_voteComment_to_background( action, comment, post) {
  chrome.runtime.sendMessage({
    message: "voteComment",
    data: {
      action: action,
      comment: comment,
      post: post
    }
  });
}

function send_replyPost_to_background( content, post) {
  chrome.runtime.sendMessage({
    message: "replyPost",
    data: {
      content: content,
      post: post
    }
  });
}

function send_votePost_to_background( action, post) {
  chrome.runtime.sendMessage({
    message: "votePost",
    data: {
      action: action,
      post: post
    }
  });
}

function send_replyComment_to_background(content, comment, post) {
  chrome.runtime.sendMessage({
    message: "replyComment",
    data: {
      content: content,
      comment: comment,
      post: post
    }
  });
}

/// send of the section 

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
  //console.log("monitor_new_comment is called");
  
  const div = document.querySelector('._3MknXZVbkWU8JL9XGlzASi');
const firstSubmitButtons = div.querySelector('button');
//console.log("top submit comments: " ,firstSubmitButtons);
//const firstSubmitButtons = document.querySelector('button[type="submit"]');
            //console.log(commentSubmitButton);
            if (firstSubmitButtons && !firstSubmitButtons.hasEventListener) {
              firstSubmitButtons.addEventListener('click', function(event) {
                console.log('Comment submit button clicked!');
                console.log('My span:', firstSubmitButtons.parentNode.parentNode.parentNode.innerText);
                //var uid =get_user_id_from_background();
                const post_link =  window.location.href; 
                //send_data_to_background("insert_comment", firstSubmitButtons.parentNode.parentNode.parentNode.innerText);
                send_replyPost_to_background(firstSubmitButtons.parentNode.parentNode.parentNode.innerText,post_link );
              });
              // Set flag to indicate that event listener has been added
              firstSubmitButtons.hasEventListener = true;
            }
//user insert new comments 

const allButtons = document.querySelectorAll('button._374Hkkigy4E4srsI2WktEd');
const replyButtons = Array.from(allButtons).filter(button => button.innerText === "Reply");

replyButtons.forEach(replyButton => {
  if (replyButton && !replyButton.hasEventListener) 
  {
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
                    const reply_to = commentSubmitButtons.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('_292iotee39Lmt0MkQZ2hPV')[0].innerText;
                    const post_link =  window.location.href; 
                    //var uid =get_user_id_from_background();
                    //send_data_to_background("insert_comment", commentSubmitButtons.parentNode.parentNode.parentNode.innerText);
                    send_replyComment_to_background(commentSubmitButtons.parentNode.parentNode.parentNode.innerText,reply_to,window.location.href);
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
      replyButton.hasEventListener = true;
  }
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

function monitor_viewed_post() {
alert("monitor new post is called");
function isInViewport(el) {
  var rect = el.getBoundingClientRect();


  if (rect.top === 0 && rect.left === 0 && rect.bottom === 0 && rect.right === 0) {
    return false;
  } else {
    
  
  var elemTop = rect.top;
  var elemBottom = rect.bottom;

  // Only completely visible elements return true:
  var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
  // Partially visible elements return true:
  //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
  return isVisible;
  }
}

let elements = document.querySelectorAll('._1RYN-7H8gYctjOQeL8p2Q7');
let filteredElements = Array.from(elements).filter(element => !element.classList.contains("promotedlink"));

  // Function to add event listeners to upvote and downvote buttons
  function addVoteEventListeners(elements) {
    elements.forEach((element) => {
      const upvoteButton = element.querySelector('[aria-label="upvote"]');
      if (upvoteButton && !upvoteButton.getAttribute("data-listener-attached")) {
        upvoteButton.addEventListener("click", () => {
        
          var text = element.querySelector(`[data-click-id="body"][class="SQnoC3ObvgnGjWt90zD9Z _2INHSNB8V5eaWp4P0rY_mE"]`).getAttribute("href");
          const fullUrl = redditBaseUrl + text;
          console.log(`upvote button clicked for post: "${fullUrl}"`);
          //send_data_to_background("upvote_post", fullUrl);
          send_votePost_to_background("upvote",fullUrl);
        });
        upvoteButton.setAttribute("data-listener-attached", "true");
      }

      const downvoteButton = element.querySelector('[aria-label="downvote"]');
      if (downvoteButton && !downvoteButton.getAttribute("data-listener-attached")) {
        downvoteButton.addEventListener("click", () => {
          //var post = downvoteButton.parentNode.parentNode.parentNode.getElementsByClassName("_292iotee39Lmt0MkQZ2hPV");
          var text = element.querySelector(`[data-click-id="body"][class="SQnoC3ObvgnGjWt90zD9Z _2INHSNB8V5eaWp4P0rY_mE"]`).getAttribute("href");
          const fullUrl = redditBaseUrl + text;
          console.log(`downvote button clicked for post: "${fullUrl}"`);
          //send_data_to_background("downvote_post", fullUrl);
          send_votePost_to_background("downvote",fullUrl)
        });
        downvoteButton.setAttribute("data-listener-attached", "true");
      }
    });
  }

  // Add event listeners to the initial filtered elements
  addVoteEventListeners(filteredElements);

  /// end of post vote section 

const post_observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    //listentobuttons();
    elements = document.querySelectorAll('._1RYN-7H8gYctjOQeL8p2Q7');
    filteredElements = Array.from(elements).filter(element => !element.classList.contains("promotedlink"));
    addVoteEventListeners(filteredElements);
  });
});

post_observer.observe(document.body, {
  childList: true,
  subtree: true
});
//const viewedPosts = new Set();
const viewedPosts = new Set();
for (let i = 0; i < filteredElements.length; i++) {
  console.log("this is first time :" ,filteredElements[i]);
} 
window.addEventListener("scroll", function() {
  
  for (let i = 0; i < filteredElements.length; i++) {
    //console.log("is the element in viewport:",  isInViewport(filteredElements[i]));
    //console.log("index number: ", i+1);

    if (isInViewport(filteredElements[i])) {
      const post_url = filteredElements[i].querySelector(`[data-click-id="body"][class="SQnoC3ObvgnGjWt90zD9Z _2INHSNB8V5eaWp4P0rY_mE"]`).getAttribute("href");
      const fullUrl = redditBaseUrl + post_url;
      if (!viewedPosts.has(fullUrl)) {
        //console.log(filteredElements[i].getBoundingClientRect());
       //const fullUrl = redditBaseUrl + post_url;
       
        console.log("The href of the post", fullUrl);
        //send_data_to_background("viewed_post", fullUrl);
        sendUpdateViewedPostToBackground(fullUrl);
        viewedPosts.add(fullUrl);
        //console.log(Array.from(viewedPosts));
      }
    }
  }
});
}



// this function is used for only post page(sub reddit page ) when user scroll the page or clicked more reply(new elements added into the DOM)
function add_all_event()
{
  // this funciton is used for update number of likes when user
  window.addEventListener('scroll', function() {
    // Your code here will run when the user scrolls the page
    //changelikes(10);
    chrome.runtime.sendMessage({ message: "get_all_setup" }, function(response) {
      if(response.likeschange1)
      {
        //console.log(" change likes");
        changelikes(100);
      }
      if(response.likeschange)
      {
        

        changelikes(56);
        
      }
      if(response.allbutton_and_activetime)
      {
        
          listentobuttons();
          monitor_new_comment();
        
      }
    });
  });
  // this is used to monitor if any elemenet added into the post page then we want to update the likes and listen button
  const post_individual_observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(function(addedNode) {
          // Check if the added node is an element
          if (addedNode.nodeType === Node.ELEMENT_NODE) {
            
            chrome.runtime.sendMessage({ message: "get_all_setup" }, function(response) {
              if(response.likeschange1)
              {
                //console.log(" change likes");
                changelikes(100);
              }
              if(response.likeschange)
              {
                
          
                changelikes(56);
                
              }
              if(response.allbutton_and_activetime)
                {
                  
                    listentobuttons();
                    monitor_new_comment();
                
                  
                }
            });
          }
        });
      }
    });
  });

  // Start observing the entire document
  post_individual_observer.observe(document, {
    childList: true,
    subtree: true
  });
}
// end of the section 


if (location.hostname === "www.reddit.com" && location.pathname === "/") {
  
  
} else {
  add_all_event();
  
}

function sendUpdateViewedPostToBackground( post_url) {
  chrome.runtime.sendMessage({
    message: "updateViewedPost",
    data: {
      post_url: post_url
    }
  });
}

// Call the function with appropriate parameters
// sendUpdateViewedPostToBackground(userid, viewed_date, post_url);
