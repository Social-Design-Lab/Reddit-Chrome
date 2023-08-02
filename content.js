// content.js
// Wait for the DOM to be fully loaded
// content cannot load axios 
//let uid;
//document.addEventListener("DOMContentLoaded", function(event) {
  // Your code here

// Create a loading overlay element
// Create a loading overlay element



let new_active_triggered =false;
const title = "A new proof of vaccine is bad for you";
const likebuttonSelector = '[aria-label="upvote"]';
const dislikebuttonSelector = '[aria-label="downvote"]';
const commentTextClassName = '_292iotee39Lmt0MkQZ2hPV';
const commentLikeclassName = "_1rZYMD_4xY3gRcSS3p8ODO _25IkBM0rRUqWX5ZojEMAFQ _3ChHiOyYyUkpZ_Nm3ZyM2M";
const bgColorClassName = "uI_hDmU5GSiudtABRz_37";
//const replyPostClassName ="_22S4OsoDdOqiM-hPTeOURa _2iuoyPiKHN3kfOoeIQalDT _10BQ7pjWbeYP63SAPNS8Ts _3uJP0daPEH2plzVEYyTdaH";
const filterText = 'Reply';
const commentSelector ='._292iotee39Lmt0MkQZ2hPV';
const replyPostButtonSelector ='._22S4OsoDdOqiM-hPTeOURa._2iuoyPiKHN3kfOoeIQalDT._10BQ7pjWbeYP63SAPNS8Ts._3uJP0daPEH2plzVEYyTdaH';
const replyCommentSelector = "_374Hkkigy4E4srsI2WktEd";
const ButtonColorClass = "_8dpZTfzgKPKCUTjp9SAn1";
let fakeCommnetContent =" THIS IS A FAKE COMMENT"; 
let fakeCommentUserName = "Experimental Team";
let parentContainer = document.querySelector('div._1YCqQVO-9r-Up6QPB9H6_4');
let fakeCommentInsertIndex =-1;
let fakecommentID = -1;
// below code is make sure even there is no fresh on page ,when user click post on reddit main page the effect still apply
//chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  //if (request.message === "run_my_code") {
  //alert(" background calls run my code funtion");
  //alert("from main page to post age");

// this is used for user is on post page and then back to main page
const fakepost_fullUrl = "https://www.reddit.com/r/lehighvalley/comments/12s1gu9/ott_st_allentown/"; 

let homePageObserved = false;
const redditBaseUrl = "https://www.reddit.com";
const urlObserver = new MutationObserver(function(mutations) {
mutations.forEach(function(mutation) {
if (!homePageObserved && (window.location.href === "https://www.reddit.com/" || window.location.href === "https://www.reddit.com/?feed=home")) {
console.log("User has navigated to the Reddit home page");
homePageObserved = true;
chrome.runtime.sendMessage({ message: "get_all_setup" }, function(response) {
  
   
    if(response.allbutton_and_activetime)
    {
      
      
      // Delay execution of fakepost() and monitor_viewed_post() by two seconds
setTimeout(() => {
  fakepost();
  monitor_viewed_post();
  setTimeout(() => {
    document.documentElement.style.visibility = 'visible';
  }, 100); 
}, 2000); // 2000 milliseconds = 2 seconds

      
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
  console.log("change background color to green 2: " + response.change_bgcolor_condition2);
  
  
    //alert("window on load is called");
    if(response.likeschange1)
    {
      //console.log(" change likes");
      //changelikes(100);
      changeLikes(100, commentLikeclassName);

    }
    if(response.likeschange)
    {
      

      //changelikes(56);
      changeLikes(56, commentLikeclassName);

      
    }
    if(response.change_bgcolor)
    {
      changebg("red",bgColorClassName);
    }
    if(response.change_bgcolor_condition2)
    {
      changebg("green",bgColorClassName);
    }
    if(response.allbutton_and_activetime)
    {
      console.log("allbutton_and_activetime ");
      if (location.hostname === "www.reddit.com" && location.pathname === "/") {
        console.log("This is the Reddit main page.");
        fakepost();
        monitor_viewed_post();
        setTimeout(() => {
          document.documentElement.style.visibility = 'visible';
        }, 100); 
        
      } else {
        console.log(`This is not the Reddit main page: ${window.location.href}`);
       // alert(fakepost_fullUrl);
        
         // changefakepost_dom();
         read_fakecomment_from_database();
        monitor_new_comment(replyPostButtonSelector,replyCommentSelector,filterText , commentSelector);
        //insert_comment(parentContainer,likebuttonSelector,dislikebuttonSelector,ButtonColorClass, commentTextClassName,commentLikeclassName, replyCommentSelector);
        //read_csv();
        
        //likebuttonSelector, dislikebuttonSelector=null,ButtonColorClass, commentTextClassName,commentLikeclassName,replyCommentSelector
        listentobuttons(likebuttonSelector,dislikebuttonSelector,commentTextClassName);
        
        
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
  chrome.runtime.sendMessage({ message: "get_all_setup" }, function(response) {
    console.log("All button and Active time: " + response.allbutton_and_activetime);
    console.log("change likes to 100: " + response.likeschange1);
    console.log("change likes to 56: " + response.likeschange);
    console.log("change background color to red: " + response.change_bgcolor);
    console.log("change background color to green 1: " + response.change_bgcolor_condition2);
    
    
    
    // Handle background color changes
    if(response.change_bgcolor)
      {changebg("red",bgColorClassName);}
    
    console.log("response.change_bgcolor_condition2 is strictly equal to true: ", response.change_bgcolor_condition2 === true);
    if(response.change_bgcolor_condition2 === true) {
          console.log("Checking if this is triggered");
          changebg("green",bgColorClassName);
    }
     
    // Handle like changes
    if(response.likeschange1)
     { changeLikes(100,commentLikeclassName);}
    
    if(response.likeschange)
      {changeLikes(56,commentLikeclassName);}
      
    
    
    
    // Handle all button and active time
    if(response.allbutton_and_activetime) {
      console.log("allbutton_and_activetime ");
      
      if(!new_active_triggered)
        user_active_time();
      
      if (location.hostname === "www.reddit.com" && location.pathname === "/") {
        console.log("This is the Reddit main page.");
      } else {
        console.log(`This is not the Reddit main page: ${window.location.href}`);
        
       
          //changefakepost_dom();
          read_fakecomment_from_database();
        monitor_new_comment(replyPostButtonSelector,replyCommentSelector,filterText , commentSelector);
        //insert_comment(likebuttonSelector,dislikebuttonSelector,likeDislikeButtonColorClass,commentTextClassName,replyCommentSelector);
        //insert_comment(parentContainer,likebuttonSelector,dislikebuttonSelector,ButtonColorClass, commentTextClassName,commentLikeclassName, replyCommentSelector);
        //read_csv();
        //read_fakecomment_from_database();
        listentobuttons(likebuttonSelector,dislikebuttonSelector,commentTextClassName);
      }
    }
  });
}

//});
// Recursive function to find ancestor with given class name and return elements by class within it
function findAncestorWithClass(node, targetClassName) {
  if (node == null) {
    return null;
  } else {
    let elements = node.getElementsByClassName(targetClassName);
    if (elements && elements.length > 0) {
      return elements;
    } else {
      return findAncestorWithClass(node.parentNode, targetClassName);
    }
  }
}


function listentobuttons(likebuttonSelector, dislikebuttonSelector = null, commentTextClassName) 
  
{
  const upvoteButtons = document.querySelectorAll(likebuttonSelector);
  upvoteButtons.forEach((button) => {
    if (!button.getAttribute('data-listener-attached')) {
      button.addEventListener('click', () => {
        //var post = button.parentNode.parentNode.parentNode.getElementsByClassName('_292iotee39Lmt0MkQZ2hPV');
        var post = findAncestorWithClass(button, commentTextClassName);
        var text = post[0].innerText;
        //var uid = get_user_id_from_background();
        if (text=='')
        {
          const currentUrl = window.location.href;
          console.log(`upvote button clicked for post: "${currentUrl}"`);
          send_votePost_to_background("upvote",currentUrl);
          let parent = button.parentNode;
          if (parent) {
            // Found the nearest parent with the target class name
            var childElement = parent.getElementsByClassName(commentLikeclassName)[0];
            childElement.textContent = parseInt(childElement.textContent) +1;
            // Perform any actions you need with the child element here
          } else {
            //alert("parent is not found");
          }
        }
        //var uid = get_user_id_from_background();
        
        else
        {
        console.log(`upvote button clicked for post comment teest: "${text}"`);
        //senddatatodb(uid,"upvote", text);
        send_voteComment_to_background("upvote",text,window.location.href );
        //alert("whyyyy");
        let parent = button.parentNode;
          while (parent && !parent.getElementsByClassName(commentLikeclassName).length) {
            parent = parent.parentNode;
          }

          if (parent) {
            // Found the nearest parent with the target class name
            var childElement = parent.getElementsByClassName(commentLikeclassName)[0];
            childElement.textContent = parseInt(childElement.textContent) +1;
            // Perform any actions you need with the child element here
          } else {
            //alert("parent is not found");
          }




        //  change number of likes when user click it 


        }

       
      });
      button.setAttribute('data-listener-attached', 'true');
    }
  });
  
  if(dislikebuttonSelector)
  {
    const downvoteButtons = document.querySelectorAll(dislikebuttonSelector);
    downvoteButtons.forEach((button) => {
      if (!button.getAttribute('data-listener-attached')) {
        button.addEventListener('click', () => {
          //var post = button.parentNode.parentNode.parentNode.getElementsByClassName('_292iotee39Lmt0MkQZ2hPV');
          var post = findAncestorWithClass(button, commentTextClassName);
          var text = post[0].innerText;
          if (text=='')
          {

            let parent = button.parentNode;
            if (parent) {
              // Found the nearest parent with the target class name
              var childElement = parent.getElementsByClassName(commentLikeclassName)[0];
              childElement.textContent = parseInt(childElement.textContent) -1;
              // Perform any actions you need with the child element here
            } else {
             // alert("parent is not found");
            }
            const currentUrl = window.location.href;
            console.log(`downvote button clicked for post: "${currentUrl}"`);
            send_votePost_to_background("downvote",currentUrl);
          }
          //var uid = get_user_id_from_background();
          
          else
          {
            let parent = button.parentNode;
            if (parent) {
              // Found the nearest parent with the target class name
              var childElement = parent.getElementsByClassName(commentLikeclassName)[0];
              childElement.textContent = parseInt(childElement.textContent) -1;
              // Perform any actions you need with the child element here
            } else {
              //alert("parent is not found");
            }
            console.log(`downvote button clicked for post comment: "${text}"`);
            //send_data_to_background("downvote_comment", text);
            send_voteComment_to_background("downvote",text,window.location.href );
          }
        //senddatatodb(uid,"downvote", text);

        });
        button.setAttribute('data-listener-attached', 'true');
      }
    });
  }

 


}
// change number of likes function 
function changeLikes(num, className) {
  // Select all elements with the specified class
  const likeButtons = document.getElementsByClassName(className);
  
  // For each like button, change the text content to the desired number
    for (let i = 0; i < likeButtons.length; i++) {

      if (!likeButtons[i].hasAttribute('change-likeNumber-attached'))  {
        // Your code here
      //alert("this should be a lot");
      
        likeButtons[i].textContent = num;
        likeButtons[i].setAttribute('change-likeNumber-attached', 'true');
      }
    }
      
  
}


// content.js
// receive request from background js and call change number likes 
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "change_likes") {
      //changelikes(100);
      changeLikes(100, commentLikeclassName);

      console.log("Received message from the background script for change likes:", request.message);
      
    }
  });

// conditon 2 change number likes 
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "change_likes_condtion2") {
    //changelikes(56);
    changeLikes(56, commentLikeclassName);

    console.log("Received message from the background script for change likes:", request.message);
    
  }
});
  
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "change_bgcolor") {
      changebg("red",bgColorClassName);
      startSurveyPopup();
        surveyInterval = setInterval(() => {
            startSurveyPopup();
        }, 10000);

      
      console.log("Received message from the background script for change bg colro:", request.message);
      
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "change_bgcolor_condition2") {
    changebg("green",bgColorClassName);
    startSurveyPopup();
        surveyInterval = setInterval(() => {
            startSurveyPopup();
        }, 10000);

    
    console.log("Received message from the background script for change bg colro:", request.message);
    
  }
});
// this is when the experimenet first start
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "listen_buttons") {
    user_active_time();
    if (location.hostname === "www.reddit.com" && location.pathname === "/") {
      console.log("This is the Reddit main page.");
      fakepost();
      monitor_viewed_post();
      setTimeout(() => {
        document.documentElement.style.visibility = 'visible';
      }, 100); 
      
    } else {
      console.log(`This is not the Reddit main page: ${window.location.href}`);
      //alert(fakepost_fullUrl);

      
         // changefakepost_dom();
         read_fakecomment_from_database(); 
      monitor_new_comment(replyPostButtonSelector,replyCommentSelector,filterText , commentSelector);
      //insert_comment(likebuttonSelector,dislikebuttonSelector,likeDislikeButtonColorClass,commentTextClassName,replyCommentSelector);
      //insert_comment(parentContainer,likebuttonSelector,dislikebuttonSelector,ButtonColorClass, commentTextClassName,commentLikeclassName, replyCommentSelector);
      //read_csv();
      //read_fakecomment_from_database();
      listentobuttons(likebuttonSelector,dislikebuttonSelector,commentTextClassName);
      
    }
   
    new_active_triggered=true;
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
function insert_comment(idofcomment, parentContainer, likebuttonSelector, dislikebuttonSelector=null,ButtonColorClass, commentTextClassName,commentLikeclassName,replyCommentSelector)
{

const commentDiv = document.querySelector('div.Comment');
const clonedCommentDiv = commentDiv.cloneNode(true);

const pElement = clonedCommentDiv.querySelector('p');
const aElement = clonedCommentDiv.querySelector('a.wM6scouPXXsFDSZmZPHRo');



let newComment = document.createElement('div');

        // You would have to inspect an existing comment to replicate its structure and classes
newComment.innerHTML =`<div><div><div><div id="t1_jph4rri" style="padding-left:16px" tabindex="-1" class="_3sf33-9rVAO_v4y0pIW_CH"><div class="_1DooEIX-1Nj5rweIc5cw_E"><div class="_3Wv3am0TXfTcugZJ6niui"><div class="_36AIN2ppxy_z-XSDxTvYj5 t1_jph4rri undefined"><i class="threadline"></i></div></div></div><div class="Comment t1_jph4rri P8SGAKMtRxNwlmLz1zdJu HZ-cv9q391bm8s7qT54B3 _1z5rdmX8TDr6mqwNv7A70U"><button class="_1nGapmdexvR0BuOkfAi6wa t1_jph4rri _1zN1-lYh2LfbYOMAho_O8g _2Gzh48SaLz7dQBCULfOC6V"><i class="icon icon-expand _1tnrhhM9S7dYjApTfvd14l"></i></button><div class="_2mHuuvyV9doV3zwbZPtIPG ZvAy-PJfJmB8pzQxpz1sS"><div id="AvatarUserInfoTooltip--t1_jph4rri"><a class="_3GfQMgsm3HGd3838lwqCST" data-testid="comment_author_icon" href="/user/nolij420/"><div class="_2p14AQvJBvTrEEa4csiW9v "><img alt="User avatar" class="_2TN8dEgAQbSyKntWpSPYM7 _13ScjOmi6dGdJw0JAonQEr " src="https://www.redditstatic.com/avatars/avatar_default_02_24A0ED.png"><span></span></div></a></div></div><div class="_3tw__eCCe7j-epNCKGXUKk"><span class="_1RIl585IYPW6cmNXwgRz0J">level 1</span><div class="-Xcv3XBXmgiY2X5RqaPbO _1S45SPAIb30fsXtEcKPSdt _3LqBzV8aCO9tge99jHiUGy " data-testid="post-comment-header"><span class="_1a_HxF03jCyxnx706hQmJR"><div class="_3QEK34iVL1BjyHAVleVVNQ"><div class="_2mHuuvyV9doV3zwbZPtIPG"><div id="UserInfoTooltip--t1_jph4rri"><a class="wM6scouPXXsFDSZmZPHRo DjcdNGtVXPcxG0yiFXIoZ _23wugcdiaj44hdfugIAlnX " data-testid="comment_author_link" href="/user/nolij420/">${fakeCommentUserName}</a></div></div></div><span class="_2ETuFsVzMBxiHia6HfJCTQ _8b8fUdBRxCYj9MkNpFvvv"> · </span><a class="_3yx4Dn0W3Yunucf5sVJeFU" data-testid="comment_timestamp" href="https://www.reddit.com/r/orlando/comments/14ioh2s/comment/jph4rri/?utm_source=reddit&amp;utm_medium=web2x&amp;context=3" id="CommentTopMeta--Created--t1_jph4rri" target="_blank" rel="nofollow noopener noreferrer">1 day ago</a><div class="_3XoW0oYd5806XiOr24gGdb"></div></span></div><div data-testid="comment" class="_3cjCphgls6DH-irkVaA0GM "><div class="_292iotee39Lmt0MkQZ2hPV RichTextJSON-root"><p class="_1qeIAgB0cPwnLhDF9XSiJM">${fakeCommnetContent}</p></div></div><div class="_3KgrO85L1p9wQbgwG27q4y"><div class="_1E9mcoVn4MYnuBQSVDt1gC _2oM1YqCxIwkvwyeZamWwhW _1ewTEGuogtFmDvDII2T2Yy" id="vote-arrows-t1_jph4rri"><button aria-label="upvote" aria-pressed="false" data-click-id="upvote" data-adclicklocation="upvote" class="_2k73nZrjAYiwAj9hv7K-kq  _22nWXKAY6OzAfK5GcUqWV2" style="--verticalvotes-customupvote-active:url(https://styles.redditmedia.com/t5_2qh7s/styles/postUpvoteIconActive_wpyq4wbvuam61.PNG);--verticalvotes-customupvote-inactive:url(https://styles.redditmedia.com/t5_2qh7s/styles/postUpvoteIconInactive_fuyuuzpuuam61.PNG)" data-listener-attached="false"></button><div class="_1rZYMD_4xY3gRcSS3p8ODO _25IkBM0rRUqWX5ZojEMAFQ _3ChHiOyYyUkpZ_Nm3ZyM2M" style="color:#1A1A1B">56</div><button aria-label="downvote" aria-pressed="false" data-click-id="downvote" data-adclicklocation="downvote" class="ceU_3ot04pOVIcrrXH9fY  _783RL1AYIib59nxLCXhgv" style="--verticalvotes-customdownvote-active:url(https://styles.redditmedia.com/t5_2qh7s/styles/postDownvoteIconActive_lzcp1idwuam61.PNG);--verticalvotes-customdownvote-inactive:url(https://styles.redditmedia.com/t5_2qh7s/styles/postDownvoteIconInactive_rd3dm4tvuam61.PNG)" data-listener-attached="true"></button></div><div class="XZK-LTFT5CgGo9MvPQQsy _1LXnp2ufrzN6ioaTLTjGQ1 _2t8wLytikHzPCUnvXdS_wu _2hXOR2fIcfnUg0p-Env7KQ _3rHRwVOKmBBlBOQ4kIW_vq _2_lhaFUJdP8q0o2L9MN2TN"><button class="_374Hkkigy4E4srsI2WktEd"><i class="icon icon-comment _1g4YvNNIFoV_5_EhsVfyRy"></i>Reply</button><button class="_374Hkkigy4E4srsI2WktEd _2hr3tRWszeMRQ0u_Whs7t8 _14hLFU5cIJCyxH9DSgsCov">Give Award</button><div id="t1_jph4rri-comment-share-menu"><button class="_374Hkkigy4E4srsI2WktEd">Share</button></div><button class="_374Hkkigy4E4srsI2WktEd _2hr3tRWszeMRQ0u_Whs7t8 _14hLFU5cIJCyxH9DSgsCov">Report</button><button class="_374Hkkigy4E4srsI2WktEd _2hr3tRWszeMRQ0u_Whs7t8 _14hLFU5cIJCyxH9DSgsCov">Save</button><button class="_374Hkkigy4E4srsI2WktEd _2hr3tRWszeMRQ0u_Whs7t8 _14hLFU5cIJCyxH9DSgsCov">Follow</button><div class="hrV8gUgmt0V7wM2wgZ81l _1YnPvd-E5MbmcM3PvRRcX _14hLFU5cIJCyxH9DSgsCov"><button aria-expanded="false" aria-haspopup="true" aria-label="more options" id="t1_jph4rri-overflow-menu" data-adclicklocation="overflow_menu" class="_2pFdCpgBihIaYh9DSMWBIu _1VR6DV38j4rMT5OMeU4gJZ uMPgOFYlCc5uvpa2Lbteu"><i class="_38GxRFSqSC-Z2VLi5Xzkjy icon icon-overflow_horizontal"></i></button></div></div></div></div></div></div></div></div></div>`; 
// Change the content of the <p> element

let replyContainer = document.createElement('div');
replyContainer.innerHTML= `<div class="_1r4smTyOEZFO91uFIdWW6T JchsqHyN3thfSnN8dUM3 _2jhbZV6mVCM5Ma7Z376DW2 "><div class="" style="left: 33px;"><div class="_3YZ-jFfccqhepgq1dDuLEv"><div class="_3MknXZVbkWU8JL9XGlzASi _3wl1bRnSzxHkKJfvqakrNI _1UhKfcyzvaWRtDdXZmzg6D "><div><div class="tVQ1dB4n0mAWdcQNxFq-K "></div></div><div class="_2baJGEALPiEMZpWB2iWQs7 " data-test-id="comment-submission-form-richtext"><style>.public-DraftStyleDefault-block[data-offset-key="f424d9_initial-0-0"]::after {bottom: 0;color: var(--newCommunityTheme-actionIcon);content: 'What are your thoughts?';cursor: text;left: 0;position: absolute;top: 0;}</style><div class="_13Sj3UMDKkCCJTq88berCB "><div><div class="DraftEditor-root"><div class="DraftEditor-editorContainer"><div class="notranslate public-DraftEditor-content" contenteditable="true" role="textbox" spellcheck="true" style="outline: none; user-select: text; white-space: pre-wrap; overflow-wrap: break-word;"><div data-contents="true"><div data-offset-key="f424d9_initial-0-0" class="_3LuG0YVLLHE2azRNVaKz7O"><div class="" data-block="true" data-editor="f424d9" data-offset-key="f424d9_initial-0-0"><div data-offset-key="f424d9_initial-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="f424d9_initial-0-0"><br data-text="true"></span></div></div></div></div></div></div></div></div><div class="tVQ1dB4n0mAWdcQNxFq-K _1z9S1KmnM79xn-UA0FnbP6 "></div></div></div><div class="_17TqawK-44tH0psnHPIhzS RQTXfVRnnTF5ont3w58rx  "><div class="_3SNMf5ZJL_5F1qxcZkD0Cp"><button role="button" tabindex="0" type="submit" disabled="" class="_22S4OsoDdOqiM-hPTeOURa _2iuoyPiKHN3kfOoeIQalDT _10BQ7pjWbeYP63SAPNS8Ts _3uJP0daPEH2plzVEYyTdaH ">Reply</button><button role="button" tabindex="0" type="reset" class="cZz52cPDbNgzrR1Oo1k27 _2iuoyPiKHN3kfOoeIQalDT _2tU8R9NTqhvBrhoNAXWWcP _3uJP0daPEH2plzVEYyTdaH ">Cancel</button></div><div class="_2YcMhGs5-uIg9Fj4a9J2Xr"><div class="_1wi_3uF8fUynqe5reIop-G"><div class="_3oLr47tuKGv2mNpavCZ2X0"><span><div class="_6E4bLu7N3_WO5HyAtaJx8"><button role="button" tabindex="-1" aria-label="Add Emoji" class="_2lAJkFZXhr5kbH7YF-sYFf _1H0LLEwUP5ys6cgxr9KhMa _2iuoyPiKHN3kfOoeIQalDT _3zbhtNO0bdck0oYbYRhjMC HNozj_dKjQZ59ZsfEegz8 _1tPpYVD73ugqp4k-VMFRki _3ojSE1JW7jxNzUzZK8kt7m"><svg class="kZEfwKUF_b6N-MPjQuYFA" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="inherit" fill-rule="evenodd" d="M13 9.0074c-.777 0-1.406-.63-1.406-1.406 0-.777.629-1.407 1.406-1.407.777 0 1.406.63 1.406 1.407 0 .776-.629 1.406-1.406 1.406m-3 5.581c-2.206 0-4-1.57-4-3.5 0-.276.224-.5.5-.5h7c.276 0 .5.224.5.5 0 1.93-1.794 3.5-4 3.5m-3-8.394c.777 0 1.406.63 1.406 1.407 0 .776-.629 1.406-1.406 1.406-.777 0-1.406-.63-1.406-1.406 0-.777.629-1.407 1.406-1.407m3-4.194c-4.411 0-8 3.588-8 8 0 4.411 3.589 8 8 8s8-3.589 8-8c0-4.412-3.589-8-8-8"></path></svg><div class="Nb7NCPTlQuxN_WDPUg5Q2"><div class="ki2VbfBhU-qxg1S6VyET6 _8fNGSBGvr1Ds8PbrsUGzN">Add Emoji</div></div><div class="_2nE7oF1_HdWt-s31zYmYB6 _26-n7Hn4ggLG2AJ7kmR8i6"><img class="_3D93rMnM8022kmI5JTG4fb" src="https://www.redditstatic.com/marketplace-assets/v1/core/emotes/snoomoji_emotes/free_emotes_pack/cry.gif"><img class="_3D93rMnM8022kmI5JTG4fb" src="https://www.redditstatic.com/marketplace-assets/v1/core/emotes/snoomoji_emotes/free_emotes_pack/disapproval.gif"><img class="_3D93rMnM8022kmI5JTG4fb" src="https://www.redditstatic.com/marketplace-assets/v1/core/emotes/snoomoji_emotes/free_emotes_pack/dizzy_face.gif"></div></button></div></span><span><div class="_1_GKN8UW8t3pCAZhMgZOoL"></div></span><span><button role="button" tabindex="-1" aria-label="Bold" aria-selected="false" class="_2lAJkFZXhr5kbH7YF-sYFf _1H0LLEwUP5ys6cgxr9KhMa _2iuoyPiKHN3kfOoeIQalDT _3zbhtNO0bdck0oYbYRhjMC HNozj_dKjQZ59ZsfEegz8 _1tPpYVD73ugqp4k-VMFRki _3ojSE1JW7jxNzUzZK8kt7m"><i class="_1mvTX6krm3Q2d1CSyUm28s  icon icon-bold"></i><div class="Nb7NCPTlQuxN_WDPUg5Q2"><div class="ki2VbfBhU-qxg1S6VyET6 dMXy0l6Saub8-fPDkQvGC _8fNGSBGvr1Ds8PbrsUGzN">Bold</div></div></button></span><span class="_2x_bJPl7Q970NCRxOS36QB"><button role="button" tabindex="-1" aria-label="Italics" aria-selected="false" class="_2lAJkFZXhr5kbH7YF-sYFf _1H0LLEwUP5ys6cgxr9KhMa _2iuoyPiKHN3kfOoeIQalDT _3zbhtNO0bdck0oYbYRhjMC HNozj_dKjQZ59ZsfEegz8 _1tPpYVD73ugqp4k-VMFRki _3ojSE1JW7jxNzUzZK8kt7m"><i class="_1mvTX6krm3Q2d1CSyUm28s  icon icon-italic"></i><div class="Nb7NCPTlQuxN_WDPUg5Q2"><div class="ki2VbfBhU-qxg1S6VyET6 dMXy0l6Saub8-fPDkQvGC _8fNGSBGvr1Ds8PbrsUGzN">Italics</div></div></button></span><span class="_2x_bJPl7Q970NCRxOS36QB"><button role="button" tabindex="-1" aria-label="Link" aria-selected="false" class="_2lAJkFZXhr5kbH7YF-sYFf _1H0LLEwUP5ys6cgxr9KhMa _2iuoyPiKHN3kfOoeIQalDT _3zbhtNO0bdck0oYbYRhjMC HNozj_dKjQZ59ZsfEegz8 _1tPpYVD73ugqp4k-VMFRki _3ojSE1JW7jxNzUzZK8kt7m"><i class="_1mvTX6krm3Q2d1CSyUm28s  icon icon-link_post"></i><div class="Nb7NCPTlQuxN_WDPUg5Q2"><div class="ki2VbfBhU-qxg1S6VyET6 dMXy0l6Saub8-fPDkQvGC _8fNGSBGvr1Ds8PbrsUGzN">Link</div></div></button></span><span class="_2x_bJPl7Q970NCRxOS36QB"><button role="button" tabindex="-1" aria-label="Strikethrough" aria-selected="false" class="_2lAJkFZXhr5kbH7YF-sYFf _1H0LLEwUP5ys6cgxr9KhMa _2iuoyPiKHN3kfOoeIQalDT _3zbhtNO0bdck0oYbYRhjMC HNozj_dKjQZ59ZsfEegz8 _1tPpYVD73ugqp4k-VMFRki _3ojSE1JW7jxNzUzZK8kt7m"><i class="_1mvTX6krm3Q2d1CSyUm28s  icon icon-strikethrough"></i><div class="Nb7NCPTlQuxN_WDPUg5Q2"><div class="ki2VbfBhU-qxg1S6VyET6 dMXy0l6Saub8-fPDkQvGC _8fNGSBGvr1Ds8PbrsUGzN">Strikethrough</div></div></button></span><span class="_2x_bJPl7Q970NCRxOS36QB"><button role="button" tabindex="-1" aria-label="Inline Code" aria-selected="false" class="_2lAJkFZXhr5kbH7YF-sYFf _1H0LLEwUP5ys6cgxr9KhMa _2iuoyPiKHN3kfOoeIQalDT _3zbhtNO0bdck0oYbYRhjMC HNozj_dKjQZ59ZsfEegz8 _1tPpYVD73ugqp4k-VMFRki _3ojSE1JW7jxNzUzZK8kt7m"><i class="_1mvTX6krm3Q2d1CSyUm28s  icon icon-code_inline"></i><div class="Nb7NCPTlQuxN_WDPUg5Q2"><div class="ki2VbfBhU-qxg1S6VyET6 dMXy0l6Saub8-fPDkQvGC _8fNGSBGvr1Ds8PbrsUGzN">Inline Code</div></div></button></span><span class="_2x_bJPl7Q970NCRxOS36QB"><button role="button" tabindex="-1" aria-label="Superscript" aria-selected="false" class="_2lAJkFZXhr5kbH7YF-sYFf _1H0LLEwUP5ys6cgxr9KhMa _2iuoyPiKHN3kfOoeIQalDT _3zbhtNO0bdck0oYbYRhjMC HNozj_dKjQZ59ZsfEegz8 _1tPpYVD73ugqp4k-VMFRki _3ojSE1JW7jxNzUzZK8kt7m"><i class="_1mvTX6krm3Q2d1CSyUm28s  icon icon-superscript"></i><div class="Nb7NCPTlQuxN_WDPUg5Q2"><div class="ki2VbfBhU-qxg1S6VyET6 dMXy0l6Saub8-fPDkQvGC _8fNGSBGvr1Ds8PbrsUGzN">Superscript</div></div></button></span><span class="_2x_bJPl7Q970NCRxOS36QB"><button role="button" tabindex="-1" aria-label="Spoiler" aria-selected="false" class="_2lAJkFZXhr5kbH7YF-sYFf _1H0LLEwUP5ys6cgxr9KhMa _2iuoyPiKHN3kfOoeIQalDT _3zbhtNO0bdck0oYbYRhjMC HNozj_dKjQZ59ZsfEegz8 _1tPpYVD73ugqp4k-VMFRki _3ojSE1JW7jxNzUzZK8kt7m"><i class="_1mvTX6krm3Q2d1CSyUm28s  icon icon-spoiler"></i><div class="Nb7NCPTlQuxN_WDPUg5Q2"><div class="ki2VbfBhU-qxg1S6VyET6 dMXy0l6Saub8-fPDkQvGC _8fNGSBGvr1Ds8PbrsUGzN">Spoiler</div></div></button></span><span class="_2x_bJPl7Q970NCRxOS36QB"><div class="_1_GKN8UW8t3pCAZhMgZOoL"></div></span><span class="_2x_bJPl7Q970NCRxOS36QB"><button role="button" tabindex="-1" aria-label="Heading" aria-selected="false" class="_2lAJkFZXhr5kbH7YF-sYFf _1H0LLEwUP5ys6cgxr9KhMa _2iuoyPiKHN3kfOoeIQalDT _3zbhtNO0bdck0oYbYRhjMC HNozj_dKjQZ59ZsfEegz8 _1tPpYVD73ugqp4k-VMFRki _3ojSE1JW7jxNzUzZK8kt7m"><i class="_1mvTX6krm3Q2d1CSyUm28s  icon icon-text_size"></i><div class="Nb7NCPTlQuxN_WDPUg5Q2"><div class="ki2VbfBhU-qxg1S6VyET6 dMXy0l6Saub8-fPDkQvGC _8fNGSBGvr1Ds8PbrsUGzN">Heading</div></div></button></span><span class="_2x_bJPl7Q970NCRxOS36QB"><button role="button" tabindex="-1" aria-label="Bulleted List" aria-selected="false" class="_2lAJkFZXhr5kbH7YF-sYFf _1H0LLEwUP5ys6cgxr9KhMa _2iuoyPiKHN3kfOoeIQalDT _3zbhtNO0bdck0oYbYRhjMC HNozj_dKjQZ59ZsfEegz8 _1tPpYVD73ugqp4k-VMFRki _3ojSE1JW7jxNzUzZK8kt7m"><i class="_1mvTX6krm3Q2d1CSyUm28s  icon icon-list_bulleted"></i><div class="Nb7NCPTlQuxN_WDPUg5Q2"><div class="ki2VbfBhU-qxg1S6VyET6 dMXy0l6Saub8-fPDkQvGC _8fNGSBGvr1Ds8PbrsUGzN">Bulleted List</div></div></button></span><span class="_2x_bJPl7Q970NCRxOS36QB"><button role="button" tabindex="-1" aria-label="Numbered List" aria-selected="false" class="_2lAJkFZXhr5kbH7YF-sYFf _1H0LLEwUP5ys6cgxr9KhMa _2iuoyPiKHN3kfOoeIQalDT _3zbhtNO0bdck0oYbYRhjMC HNozj_dKjQZ59ZsfEegz8 _1tPpYVD73ugqp4k-VMFRki _3ojSE1JW7jxNzUzZK8kt7m"><i class="_1mvTX6krm3Q2d1CSyUm28s  icon icon-list_numbered"></i><div class="Nb7NCPTlQuxN_WDPUg5Q2"><div class="ki2VbfBhU-qxg1S6VyET6 dMXy0l6Saub8-fPDkQvGC _8fNGSBGvr1Ds8PbrsUGzN">Numbered List</div></div></button></span><span class="_2x_bJPl7Q970NCRxOS36QB"><button role="button" tabindex="-1" aria-label="Quote Block" aria-selected="false" class="_2lAJkFZXhr5kbH7YF-sYFf _1H0LLEwUP5ys6cgxr9KhMa _2iuoyPiKHN3kfOoeIQalDT _3zbhtNO0bdck0oYbYRhjMC HNozj_dKjQZ59ZsfEegz8 _1tPpYVD73ugqp4k-VMFRki _3ojSE1JW7jxNzUzZK8kt7m"><i class="_1mvTX6krm3Q2d1CSyUm28s  icon icon-quote"></i><div class="Nb7NCPTlQuxN_WDPUg5Q2"><div class="ki2VbfBhU-qxg1S6VyET6 dMXy0l6Saub8-fPDkQvGC _8fNGSBGvr1Ds8PbrsUGzN">Quote Block</div></div></button></span><span class="_2x_bJPl7Q970NCRxOS36QB"><button role="button" tabindex="-1" aria-label="Code Block" aria-selected="false" class="_2lAJkFZXhr5kbH7YF-sYFf _1H0LLEwUP5ys6cgxr9KhMa _2iuoyPiKHN3kfOoeIQalDT _3zbhtNO0bdck0oYbYRhjMC HNozj_dKjQZ59ZsfEegz8 _1tPpYVD73ugqp4k-VMFRki _3ojSE1JW7jxNzUzZK8kt7m"><i class="_1mvTX6krm3Q2d1CSyUm28s  icon icon-code_block"></i><div class="Nb7NCPTlQuxN_WDPUg5Q2"><div class="ki2VbfBhU-qxg1S6VyET6 dMXy0l6Saub8-fPDkQvGC _8fNGSBGvr1Ds8PbrsUGzN">Code Block</div></div></button></span><span class="_2x_bJPl7Q970NCRxOS36QB"><div class="_1_GKN8UW8t3pCAZhMgZOoL"></div></span><span class="_2x_bJPl7Q970NCRxOS36QB"><button role="button" tabindex="-1" aria-label="Table" aria-selected="false" class="_2lAJkFZXhr5kbH7YF-sYFf _1H0LLEwUP5ys6cgxr9KhMa _2iuoyPiKHN3kfOoeIQalDT _3zbhtNO0bdck0oYbYRhjMC HNozj_dKjQZ59ZsfEegz8 _1tPpYVD73ugqp4k-VMFRki _3ojSE1JW7jxNzUzZK8kt7m"><i class="_1mvTX6krm3Q2d1CSyUm28s  icon icon-table"></i><div class="Nb7NCPTlQuxN_WDPUg5Q2"><div class="ki2VbfBhU-qxg1S6VyET6 dMXy0l6Saub8-fPDkQvGC _8fNGSBGvr1Ds8PbrsUGzN">Table</div></div></button></span><div class="_3nQ7w1VIzZvzFawddOYgBC"><button aria-expanded="false" aria-haspopup="true" aria-label="more options" id="Comment--Overflow-Dropdown__f424d9" data-adclicklocation="overflow_menu" class="_2pFdCpgBihIaYh9DSMWBIu _2aOuodBenLHlceR3j0AlIM uMPgOFYlCc5uvpa2Lbteu"><i class="_38GxRFSqSC-Z2VLi5Xzkjy icon icon-overflow_horizontal"></i></button></div></div></div><div class="_1_GKN8UW8t3pCAZhMgZOoL _3rYrfakWyDh7Y1L9ULn4ve"></div><div class="_3SWQgWX2fzvWmGCv463r_-"><button role="button" tabindex="-1" aria-label="Switch to markdown" class="_1Wn5lpE9yF7YQX-XVL6AUI _2iuoyPiKHN3kfOoeIQalDT _3zbhtNO0bdck0oYbYRhjMC _3uJP0daPEH2plzVEYyTdaH "><span>Markdown Mode</span></button></div></div></div><div class="tVQ1dB4n0mAWdcQNxFq-K " style="left: -23px; top: 182px;"></div><div class="tVQ1dB4n0mAWdcQNxFq-K _1l8806duAP4T6f7-NQkUTp "></div></div></div></div></div>`;
const upvoteButtons = newComment.querySelector(likebuttonSelector);




//const fakeCommentallButtons = newComment.querySelectorAll(`button.${className}`);
//console.log(fakeCommentallButtons);
//const fakeCommentreplyButton = Array.from(fakeCommentallButtons).find(button => button.innerText === innerText);


const fakeCommentreplyButton = newComment.querySelector('.' + replyCommentSelector);
console.log(newComment,replyCommentSelector );
console.log(fakeCommentreplyButton);

console.log("fake replay button");
console.log(fakeCommentreplyButton);
if (fakeCommentreplyButton) {
  fakeCommentreplyButton.addEventListener('click', function(event) {
    // Find the div where the reply container should be inserted
    const wheretoinsert = newComment.querySelector('._3tw__eCCe7j-epNCKGXUKk');
    
    
    
    if (wheretoinsert) {
      console.log('Target element found.');
      
      const fakeCancelButton = replyContainer.querySelector('.cZz52cPDbNgzrR1Oo1k27');
    fakeCancelButton.addEventListener('click', function(event) {
      // Handle the click event here
      console.log('Fake cancel button clicked!');
      
      wheretoinsert.removeChild(replyContainer);
    });
      // Check if replyContainer is already present
      if (replyContainer.parentElement === wheretoinsert) {
        wheretoinsert.removeChild(replyContainer);
        console.log('Reply container removed.');
      } else {
        const replyInput = replyContainer.querySelector('.public-DraftEditor-content');      

        function inputEventHandler() {
          //alert("User is inputting.");
          
          // Clear the original content
          replyInput.innerText = '';
          const userSubmitButtonInFakeCommnet = replyContainer.querySelector('button[type="submit"]');
          userSubmitButtonInFakeCommnet.disabled = false;
          // Remove the event listener
          replyInput.removeEventListener('input', inputEventHandler);
        }

replyInput.addEventListener('input', inputEventHandler);

const userSubmitButtonInFakeCommnet = replyContainer.querySelector('button[type="submit"]');

userSubmitButtonInFakeCommnet.addEventListener('click', function() {
  // Get the content of replyInput
  const userReplyInFake = replyInput.innerText;
  send_replyComment_to_background(userReplyInFake,fakeCommnetContent,window.location.href);
  // Perform actions with the reply content
  //alert(userReplyInFake);
  //let insertUsersCommentToFakeComment = newComment; 
  

  let insertUsersCommentToFakeComment = document.createElement('div');

  // Select the element with class name "_2BMnTatQ5gjKGK5OWROgaG"
let userRedditName = document.querySelector("._2BMnTatQ5gjKGK5OWROgaG").innerText;


        // You would have to inspect an existing comment to replicate its structure and classes
insertUsersCommentToFakeComment.innerHTML =`<div><div><div><div id="t1_jph4rri" style="padding-left:16px" tabindex="-1" class="_3sf33-9rVAO_v4y0pIW_CH"><div class="_1DooEIX-1Nj5rweIc5cw_E"><div class="_3Wv3am0TXfTcugZJ6niui"><div class="_36AIN2ppxy_z-XSDxTvYj5 t1_jph4rri undefined"><i class="threadline"></i></div></div></div><div class="Comment t1_jph4rri P8SGAKMtRxNwlmLz1zdJu HZ-cv9q391bm8s7qT54B3 _1z5rdmX8TDr6mqwNv7A70U"><button class="_1nGapmdexvR0BuOkfAi6wa t1_jph4rri _1zN1-lYh2LfbYOMAho_O8g _2Gzh48SaLz7dQBCULfOC6V"><i class="icon icon-expand _1tnrhhM9S7dYjApTfvd14l"></i></button><div class="_2mHuuvyV9doV3zwbZPtIPG ZvAy-PJfJmB8pzQxpz1sS"><div id="AvatarUserInfoTooltip--t1_jph4rri"><a class="_3GfQMgsm3HGd3838lwqCST" data-testid="comment_author_icon" href="/user/nolij420/"><div class="_2p14AQvJBvTrEEa4csiW9v "><img alt="User avatar" class="_2TN8dEgAQbSyKntWpSPYM7 _13ScjOmi6dGdJw0JAonQEr " src="https://www.redditstatic.com/avatars/avatar_default_02_24A0ED.png"><span></span></div></a></div></div><div class="_3tw__eCCe7j-epNCKGXUKk"><span class="_1RIl585IYPW6cmNXwgRz0J">level 1</span><div class="-Xcv3XBXmgiY2X5RqaPbO _1S45SPAIb30fsXtEcKPSdt _3LqBzV8aCO9tge99jHiUGy " data-testid="post-comment-header"><span class="_1a_HxF03jCyxnx706hQmJR"><div class="_3QEK34iVL1BjyHAVleVVNQ"><div class="_2mHuuvyV9doV3zwbZPtIPG"><div id="UserInfoTooltip--t1_jph4rri"><a class="wM6scouPXXsFDSZmZPHRo DjcdNGtVXPcxG0yiFXIoZ _23wugcdiaj44hdfugIAlnX " data-testid="comment_author_link" href="/user/nolij420/">${userRedditName}</a></div></div></div><span class="_2ETuFsVzMBxiHia6HfJCTQ _8b8fUdBRxCYj9MkNpFvvv"> · </span><a class="_3yx4Dn0W3Yunucf5sVJeFU" data-testid="comment_timestamp" href="https://www.reddit.com/r/orlando/comments/14ioh2s/comment/jph4rri/?utm_source=reddit&amp;utm_medium=web2x&amp;context=3" id="CommentTopMeta--Created--t1_jph4rri" target="_blank" rel="nofollow noopener noreferrer">1 day ago</a><div class="_3XoW0oYd5806XiOr24gGdb"></div></span></div><div data-testid="comment" class="_3cjCphgls6DH-irkVaA0GM "><div class="_292iotee39Lmt0MkQZ2hPV RichTextJSON-root"><p class="_1qeIAgB0cPwnLhDF9XSiJM">${userReplyInFake}</p></div></div><div class="_3KgrO85L1p9wQbgwG27q4y"><div class="_1E9mcoVn4MYnuBQSVDt1gC _2oM1YqCxIwkvwyeZamWwhW _1ewTEGuogtFmDvDII2T2Yy" id="vote-arrows-t1_jph4rri"><button aria-label="upvote" aria-pressed="false" data-click-id="upvote" data-adclicklocation="upvote" class="_2k73nZrjAYiwAj9hv7K-kq  _22nWXKAY6OzAfK5GcUqWV2" style="--verticalvotes-customupvote-active:url(https://styles.redditmedia.com/t5_2qh7s/styles/postUpvoteIconActive_wpyq4wbvuam61.PNG);--verticalvotes-customupvote-inactive:url(https://styles.redditmedia.com/t5_2qh7s/styles/postUpvoteIconInactive_fuyuuzpuuam61.PNG)" data-listener-attached="false"></button><div class="_1rZYMD_4xY3gRcSS3p8ODO _25IkBM0rRUqWX5ZojEMAFQ _3ChHiOyYyUkpZ_Nm3ZyM2M" style="color:#1A1A1B">56</div><button aria-label="downvote" aria-pressed="false" data-click-id="downvote" data-adclicklocation="downvote" class="ceU_3ot04pOVIcrrXH9fY  _783RL1AYIib59nxLCXhgv" style="--verticalvotes-customdownvote-active:url(https://styles.redditmedia.com/t5_2qh7s/styles/postDownvoteIconActive_lzcp1idwuam61.PNG);--verticalvotes-customdownvote-inactive:url(https://styles.redditmedia.com/t5_2qh7s/styles/postDownvoteIconInactive_rd3dm4tvuam61.PNG)" data-listener-attached="true"></button></div><div class="XZK-LTFT5CgGo9MvPQQsy _1LXnp2ufrzN6ioaTLTjGQ1 _2t8wLytikHzPCUnvXdS_wu _2hXOR2fIcfnUg0p-Env7KQ _3rHRwVOKmBBlBOQ4kIW_vq _2_lhaFUJdP8q0o2L9MN2TN"><button class="_374Hkkigy4E4srsI2WktEd"><i class="icon icon-comment _1g4YvNNIFoV_5_EhsVfyRy"></i>Reply</button><button class="_374Hkkigy4E4srsI2WktEd _2hr3tRWszeMRQ0u_Whs7t8 _14hLFU5cIJCyxH9DSgsCov">Give Award</button><div id="t1_jph4rri-comment-share-menu"><button class="_374Hkkigy4E4srsI2WktEd">Share</button></div><button class="_374Hkkigy4E4srsI2WktEd _2hr3tRWszeMRQ0u_Whs7t8 _14hLFU5cIJCyxH9DSgsCov">Report</button><button class="_374Hkkigy4E4srsI2WktEd _2hr3tRWszeMRQ0u_Whs7t8 _14hLFU5cIJCyxH9DSgsCov">Save</button><button class="_374Hkkigy4E4srsI2WktEd _2hr3tRWszeMRQ0u_Whs7t8 _14hLFU5cIJCyxH9DSgsCov">Follow</button><div class="hrV8gUgmt0V7wM2wgZ81l _1YnPvd-E5MbmcM3PvRRcX _14hLFU5cIJCyxH9DSgsCov"><button aria-expanded="false" aria-haspopup="true" aria-label="more options" id="t1_jph4rri-overflow-menu" data-adclicklocation="overflow_menu" class="_2pFdCpgBihIaYh9DSMWBIu _1VR6DV38j4rMT5OMeU4gJZ uMPgOFYlCc5uvpa2Lbteu"><i class="_38GxRFSqSC-Z2VLi5Xzkjy icon icon-overflow_horizontal"></i></button></div></div></div></div></div></div></div></div></div>`; 
// Change the content of the <p> element
  //insertUsersCommentToFakeComment = insertUsersCommentToFakeComment.replaceAll(fakeCommnetContent, userReplyInFake);
  
  // Remove the replyContainer from its parent
  //const wheretoinsert = document.getElementById('wheretoinsert');
  wheretoinsert.removeChild(replyContainer);
  wheretoinsert.appendChild(insertUsersCommentToFakeComment);

  // Assuming you have the variables comment_id, userRedditName, and comment_content
chrome.runtime.sendMessage({
  message: "insert user reply in fake comments to db",
  commentId: fakecommentID,
  userRedditName: userRedditName,
  commentContent: userReplyInFake
}, function(response) {
  // Handle the response from the background script if needed
});

  //const fakeCommnetContent = temp; 
});



        wheretoinsert.appendChild(replyContainer);
        console.log('Reply container inserted.');
      }
    } else {
      console.log('Target element not found.');
    }
  
    // Add more logging or perform other actions as needed
    console.log('Button clicked!');
  });
  
} else {
  console.log('No matching button found.');
}









upvoteButtons.addEventListener('click', function() {
  upvoteButtons.setAttribute('aria-pressed', 'true');
  

  
    //var post = button.parentNode.parentNode.parentNode.getElementsByClassName('_292iotee39Lmt0MkQZ2hPV');
    var post = findAncestorWithClass(upvoteButtons, commentTextClassName);
    var text = post[0].innerText;
    //var uid = get_user_id_from_background();
    if (text=='')
    {
      
      const currentUrl = window.location.href;
      console.log(`upvote button clicked for post: "${currentUrl}"`);
      send_votePost_to_background("upvote",currentUrl);
    }
    //var uid = get_user_id_from_background();
    
    else
    {
    console.log(`upvote button clicked for post comment 1111: "${text}"`);
    //senddatatodb(uid,"upvote", text);
    send_voteComment_to_background("upvote",text,window.location.href );
    }
    let parent = upvoteButtons.parentNode;
          if (parent) {
            // Found the nearest parent with the target class name
            var childElement = parent.getElementsByClassName(commentLikeclassName)[0];
            childElement.textContent = parseInt(childElement.textContent) +1;
            // Perform any actions you need with the child element here
          } else {
            //alert("parent is not found");
          }
  
    upvoteButtons.setAttribute('data-listener-attached', 'true');

  
  console.log("like button clicked");


  //let currentElement = upvoteButtons;
      let ancestorWithClass = newComment.querySelector('.' + commentLikeclassName);

    
      

  if (dislikebuttonSelector) {
    
    const downvoteButtons = newComment.querySelector(dislikebuttonSelector);

   

    downvoteButtons.classList.remove(ButtonColorClass);
  }
  else  // no dislike button 
  {
    if (ancestorWithClass) {
      // Ancestor element with class found
      const likeButton = ancestorWithClass.querySelector('.' + commentLikeclassName);

      if (likeButton) {
        if(!upvoteButtonvoteButtons.classList.contains(ButtonColorClass))
          {
            //alert("the number should icncreases ");
            likeButton.textContent = parseInt(likeButton.textContent) + 1;
          }
        else{
          likeButton.textContent = parseInt(likeButton.textContent) - 1;
        }
        
      }

    } else {
      // Ancestor element not found
      console.log("Cannot find the number of likes class");
    }
  }
  upvoteButtons.classList.toggle(ButtonColorClass);
});

if (dislikebuttonSelector) 
  {
    const downvoteButtons = newComment.querySelector(dislikebuttonSelector);
    downvoteButtons.addEventListener('click', function() {

      let parent = downvoteButtons.parentNode;
          if (parent) {
            // Found the nearest parent with the target class name
            var childElement = parent.getElementsByClassName(commentLikeclassName)[0];
            childElement.textContent = parseInt(childElement.textContent) -1;
            // Perform any actions you need with the child element here
          } else {
            //alert("parent is not found");
          }
      downvoteButtons.setAttribute('aria-pressed', 'true');
      
      //let currentElement = downvoteButtons;


      
      upvoteButtons.classList.remove(ButtonColorClass);
          //var post = button.parentNode.parentNode.parentNode.getElementsByClassName('_292iotee39Lmt0MkQZ2hPV');
          var post = findAncestorWithClass(downvoteButtons, commentTextClassName);
          var text = post[0].innerText;
          if (text=='')
          {
            const currentUrl = window.location.href;
            console.log(`downvote button clicked for post: "${currentUrl}"`);
            send_votePost_to_background("downvote",currentUrl);
            let parent = button.parentNode;
            if (parent) {
              // Found the nearest parent with the target class name
              var childElement = parent.getElementsByClassName(commentLikeclassName)[0];
              childElement.textContent = parseInt(childElement.textContent) -1;
              // Perform any actions you need with the child element here
            } else {
              //alert("parent is not found");
            }
          }
          //var uid = get_user_id_from_background();
          
          else
          {
            console.log(`downvote button clicked for post: "${text}"`);
            //send_data_to_background("downvote_comment", text);
            send_voteComment_to_background("downvote",text,window.location.href );
          }
        //senddatatodb(uid,"downvote", text);
       

        downvoteButtons.setAttribute('data-listener-attached', 'true');
        downvoteButtons.classList.toggle(ButtonColorClass);
      
    });
    
  }
//listentobuttons(likebuttonSelector,dislikebuttonSelector,commentTextClassName);
//upvoteButtons.setAttribute('aria-pressed', 'true');


aElement.textContent = 'COVID19_user';

// Change the content of the <a> element
pElement.textContent = 'Vaccine is bad for you!!';

// Store the parent of the pElement
const pElementParent = pElement.parentElement;

// Remove all other <p> elements
const allPElements = clonedCommentDiv.querySelectorAll('p');
allPElements.forEach(element => {
  const parentElement = element.parentElement; // get the parent of the current element
  if (parentElement) { // check if the parent exists
    parentElement.removeChild(element); // remove the element from its own parent
  }
});

// Append the modified pElement back to the parent
pElementParent.appendChild(pElement);

//parentContainer.insertBefore(clonedCommentDiv, parentContainer.children[0]);
parentContainer.insertBefore(newComment, parentContainer.children[fakeCommentInsertIndex]);


chrome.runtime.sendMessage({ message: "need_uid_from_backgroun" }, function (response) {
  const userpid = response.value;
  console.log("Received userpid from background script:", userpid);
  fetch(`https://redditchrome.herokuapp.com/api/user_reply_tofakecomment?userid=${userpid}`)
    .then(response => response.json())
    .then(data => {
      // Check if the data contains the expected structure
      if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0].user_reply_tofakecomment)) {
        const userReplyToFakeComment = data[0].user_reply_tofakecomment;
        console.log("User reply to fake comment retrieved successfully:", userReplyToFakeComment);

        // Process each user reply to fake comment
        userReplyToFakeComment.forEach(reply => {
          // Access the properties of each reply
          const { fake_comment_id, userRedditName, userReplyInFake } = reply;
          console.log("Fake comment ID:", fake_comment_id);
          console.log("User Reddit Name:", userRedditName);
          console.log("User Reply in Fake:", userReplyInFake);
          if(fake_comment_id == idofcomment)
          {
            // insert user reply in fake comment into fake comment 
            const wheretoinsert = newComment.querySelector('._3tw__eCCe7j-epNCKGXUKk');
            if (wheretoinsert) {
              console.log('Target element found.');
              
            
             
    
          // Get the content of replyInput
         
          //send_replyComment_to_background(userReplyInFake,fakeCommnetContent,window.location.href);
          // Perform actions with the reply content
          //alert(userReplyInFake);
          //let insertUsersCommentToFakeComment = newComment; 
          
        
          let insertUsersCommentToFakeComment = document.createElement('div');
        
          // Select the element with class name "_2BMnTatQ5gjKGK5OWROgaG"
        
        
        
                // You would have to inspect an existing comment to replicate its structure and classes
        insertUsersCommentToFakeComment.innerHTML =`<div><div><div><div id="t1_jph4rri" style="padding-left:16px" tabindex="-1" class="_3sf33-9rVAO_v4y0pIW_CH"><div class="_1DooEIX-1Nj5rweIc5cw_E"><div class="_3Wv3am0TXfTcugZJ6niui"><div class="_36AIN2ppxy_z-XSDxTvYj5 t1_jph4rri undefined"><i class="threadline"></i></div></div></div><div class="Comment t1_jph4rri P8SGAKMtRxNwlmLz1zdJu HZ-cv9q391bm8s7qT54B3 _1z5rdmX8TDr6mqwNv7A70U"><button class="_1nGapmdexvR0BuOkfAi6wa t1_jph4rri _1zN1-lYh2LfbYOMAho_O8g _2Gzh48SaLz7dQBCULfOC6V"><i class="icon icon-expand _1tnrhhM9S7dYjApTfvd14l"></i></button><div class="_2mHuuvyV9doV3zwbZPtIPG ZvAy-PJfJmB8pzQxpz1sS"><div id="AvatarUserInfoTooltip--t1_jph4rri"><a class="_3GfQMgsm3HGd3838lwqCST" data-testid="comment_author_icon" href="/user/nolij420/"><div class="_2p14AQvJBvTrEEa4csiW9v "><img alt="User avatar" class="_2TN8dEgAQbSyKntWpSPYM7 _13ScjOmi6dGdJw0JAonQEr " src="https://www.redditstatic.com/avatars/avatar_default_02_24A0ED.png"><span></span></div></a></div></div><div class="_3tw__eCCe7j-epNCKGXUKk"><span class="_1RIl585IYPW6cmNXwgRz0J">level 1</span><div class="-Xcv3XBXmgiY2X5RqaPbO _1S45SPAIb30fsXtEcKPSdt _3LqBzV8aCO9tge99jHiUGy " data-testid="post-comment-header"><span class="_1a_HxF03jCyxnx706hQmJR"><div class="_3QEK34iVL1BjyHAVleVVNQ"><div class="_2mHuuvyV9doV3zwbZPtIPG"><div id="UserInfoTooltip--t1_jph4rri"><a class="wM6scouPXXsFDSZmZPHRo DjcdNGtVXPcxG0yiFXIoZ _23wugcdiaj44hdfugIAlnX " data-testid="comment_author_link" href="/user/nolij420/">${userRedditName}</a></div></div></div><span class="_2ETuFsVzMBxiHia6HfJCTQ _8b8fUdBRxCYj9MkNpFvvv"> · </span><a class="_3yx4Dn0W3Yunucf5sVJeFU" data-testid="comment_timestamp" href="https://www.reddit.com/r/orlando/comments/14ioh2s/comment/jph4rri/?utm_source=reddit&amp;utm_medium=web2x&amp;context=3" id="CommentTopMeta--Created--t1_jph4rri" target="_blank" rel="nofollow noopener noreferrer">1 day ago</a><div class="_3XoW0oYd5806XiOr24gGdb"></div></span></div><div data-testid="comment" class="_3cjCphgls6DH-irkVaA0GM "><div class="_292iotee39Lmt0MkQZ2hPV RichTextJSON-root"><p class="_1qeIAgB0cPwnLhDF9XSiJM">${userReplyInFake}</p></div></div><div class="_3KgrO85L1p9wQbgwG27q4y"><div class="_1E9mcoVn4MYnuBQSVDt1gC _2oM1YqCxIwkvwyeZamWwhW _1ewTEGuogtFmDvDII2T2Yy" id="vote-arrows-t1_jph4rri"><button aria-label="upvote" aria-pressed="false" data-click-id="upvote" data-adclicklocation="upvote" class="_2k73nZrjAYiwAj9hv7K-kq  _22nWXKAY6OzAfK5GcUqWV2" style="--verticalvotes-customupvote-active:url(https://styles.redditmedia.com/t5_2qh7s/styles/postUpvoteIconActive_wpyq4wbvuam61.PNG);--verticalvotes-customupvote-inactive:url(https://styles.redditmedia.com/t5_2qh7s/styles/postUpvoteIconInactive_fuyuuzpuuam61.PNG)" data-listener-attached="false"></button><div class="_1rZYMD_4xY3gRcSS3p8ODO _25IkBM0rRUqWX5ZojEMAFQ _3ChHiOyYyUkpZ_Nm3ZyM2M" style="color:#1A1A1B">56</div><button aria-label="downvote" aria-pressed="false" data-click-id="downvote" data-adclicklocation="downvote" class="ceU_3ot04pOVIcrrXH9fY  _783RL1AYIib59nxLCXhgv" style="--verticalvotes-customdownvote-active:url(https://styles.redditmedia.com/t5_2qh7s/styles/postDownvoteIconActive_lzcp1idwuam61.PNG);--verticalvotes-customdownvote-inactive:url(https://styles.redditmedia.com/t5_2qh7s/styles/postDownvoteIconInactive_rd3dm4tvuam61.PNG)" data-listener-attached="true"></button></div><div class="XZK-LTFT5CgGo9MvPQQsy _1LXnp2ufrzN6ioaTLTjGQ1 _2t8wLytikHzPCUnvXdS_wu _2hXOR2fIcfnUg0p-Env7KQ _3rHRwVOKmBBlBOQ4kIW_vq _2_lhaFUJdP8q0o2L9MN2TN"><button class="_374Hkkigy4E4srsI2WktEd"><i class="icon icon-comment _1g4YvNNIFoV_5_EhsVfyRy"></i>Reply</button><button class="_374Hkkigy4E4srsI2WktEd _2hr3tRWszeMRQ0u_Whs7t8 _14hLFU5cIJCyxH9DSgsCov">Give Award</button><div id="t1_jph4rri-comment-share-menu"><button class="_374Hkkigy4E4srsI2WktEd">Share</button></div><button class="_374Hkkigy4E4srsI2WktEd _2hr3tRWszeMRQ0u_Whs7t8 _14hLFU5cIJCyxH9DSgsCov">Report</button><button class="_374Hkkigy4E4srsI2WktEd _2hr3tRWszeMRQ0u_Whs7t8 _14hLFU5cIJCyxH9DSgsCov">Save</button><button class="_374Hkkigy4E4srsI2WktEd _2hr3tRWszeMRQ0u_Whs7t8 _14hLFU5cIJCyxH9DSgsCov">Follow</button><div class="hrV8gUgmt0V7wM2wgZ81l _1YnPvd-E5MbmcM3PvRRcX _14hLFU5cIJCyxH9DSgsCov"><button aria-expanded="false" aria-haspopup="true" aria-label="more options" id="t1_jph4rri-overflow-menu" data-adclicklocation="overflow_menu" class="_2pFdCpgBihIaYh9DSMWBIu _1VR6DV38j4rMT5OMeU4gJZ uMPgOFYlCc5uvpa2Lbteu"><i class="_38GxRFSqSC-Z2VLi5Xzkjy icon icon-overflow_horizontal"></i></button></div></div></div></div></div></div></div></div></div>`; 
        // Change the content of the <p> element
          //insertUsersCommentToFakeComment = insertUsersCommentToFakeComment.replaceAll(fakeCommnetContent, userReplyInFake);
          
          // Remove the replyContainer from its parent
          //const wheretoinsert = document.getElementById('wheretoinsert');
          //wheretoinsert.removeChild(replyContainer);
          wheretoinsert.appendChild(insertUsersCommentToFakeComment);


            }
          }
          // Proceed with further actions using the user reply data
        });
      } else {
        console.error("Invalid data format received");
      }
    })
    .catch(error => console.error('Error:', error));
});

}



function changebg(bgcl, className) {
  // Select all elements with the specified class
  const elements = document.getElementsByClassName(className);
  
  // For each element, change the background color to the desired color
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
function monitor_new_comment(replyPostButtonSelector,replyCommentSelector,filterText , commentSelector)
{
  //_3MknXZVbkWU8JL9XGlzASi
  //console.log("monitor_new_comment is called");
  // reply to the post 
  //const div = document.querySelector('._3MknXZVbkWU8JL9XGlzASi');
const firstSubmitButtons = document.querySelector(replyPostButtonSelector);
//console.log(firstSubmitButtons);
//console.log(firstSubmitButtons.hasEventListener);
//console.log("top submit comments: " ,firstSubmitButtons);
//const firstSubmitButtons = document.querySelector('button[type="submit"]');
            //console.log(commentSubmitButton);
            
            if (firstSubmitButtons && !firstSubmitButtons.hasEventListener) {
              firstSubmitButtons.addEventListener('click', function(event) {
                console.log('Comment submit button clicked!');
                let currentNode = firstSubmitButtons;

                // Go up the tree until a node has innerText
                
                while (currentNode) {
                  const childWithTextbox = currentNode.querySelector('[role="textbox"]');
                  if (childWithTextbox) {
                    // Found the nearest ancestor with a child having role="textbox"
                    console.log('Nearest ancestor with textbox:', currentNode);
                    break;
                  }
                  currentNode = currentNode.parentNode;
                }

                if (!currentNode) {
                  console.log('No ancestor with textbox found');
                }
                console.log('My span: 2', currentNode.innerText);
                //currentNode.innerText = '';

                var spanElement = currentNode.querySelector("span[data-text='true']");
spanElement.textContent = '';
                //var uid =get_user_id_from_background();
                const post_link =  window.location.href; 
                //send_data_to_background("insert_comment", firstSubmitButtons.parentNode.parentNode.parentNode.innerText);
                send_replyPost_to_background(currentNode.innerText,post_link );
              });
              // Set flag to indicate that event listener has been added
              firstSubmitButtons.hasEventListener = true;
            }
//user reply new comments to the comments in the post 

const replyButtons = selectButtonsByClassAndInnerText(replyCommentSelector,filterText);


replyButtons.forEach(replyButton => {
  if (replyButton && !replyButton.hasEventListener) 
  {
    //const listeners = getEventListeners(replyButton);

//console.log(listeners);

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
                    let currentNode = commentSubmitButtons;

                // Go up the tree until a node has innerText
                console.log(currentNode);
                while (currentNode) {
                  const childWithTextbox = currentNode.querySelector('[role="textbox"]');
                  if (childWithTextbox) {
                    // Found the nearest ancestor with a child having role="textbox"
                    console.log('Nearest ancestor with textbox:', currentNode);
                    break;
                  }
                  currentNode = currentNode.parentNode;
                }
                    console.log('My span: 1', currentNode.innerText);

                let current = commentSubmitButtons;
                while (current && !current.querySelector(commentSelector)) {
                  current = current.parentNode;
                }
                current = current.querySelector(commentSelector);

                    const reply_to = current.innerText;
                    const post_link =  window.location.href; 
                    //var uid =get_user_id_from_background();
                    //send_data_to_background("insert_comment", commentSubmitButtons.parentNode.parentNode.parentNode.innerText);
                    send_replyComment_to_background(currentNode.innerText,reply_to,window.location.href);
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


function selectButtonsByClassAndInnerText(className, innerText) {
  const allButtons = document.querySelectorAll(`button.${className}`);
  const replyButtons = Array.from(allButtons).filter(button => button.innerText === innerText);
  return replyButtons;
}



chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "newcomments_buttons") {
    monitor_new_comment(replyPostButtonSelector,replyCommentSelector,filterText , commentSelector);
    console.log("Received message from the background script for listen new comments:", request.message);
    
  }
});

function user_active_time(){
var idleTime = 0;
var activetime = 0; 
var lastactivetime = 0;
console.log("user active time is inserted");
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
console.log("monitor new post is called");
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
        //changelikes(100);
        changeLikes(100, commentLikeclassName);

      }
      if(response.likeschange)
      {
        

       // changelikes(56);
        changeLikes(56, commentLikeclassName);

        
      }
      if(response.allbutton_and_activetime)
      {
        
        listentobuttons(likebuttonSelector,dislikebuttonSelector,commentTextClassName);
        monitor_new_comment(replyPostButtonSelector,replyCommentSelector,filterText , commentSelector);
        
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
                //changelikes(100);
                changeLikes(100, commentLikeclassName);

              }
              if(response.likeschange)
              {
                
          
                //changelikes(56);
                changeLikes(56, commentLikeclassName);

                
              }
              if(response.allbutton_and_activetime)
                {
                  
                  listentobuttons(likebuttonSelector,dislikebuttonSelector,commentTextClassName);
                  monitor_new_comment(replyPostButtonSelector,replyCommentSelector,filterText , commentSelector);
                
                  
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

function fakepost()
{

  chrome.runtime.sendMessage({ message: "need_uid_from_backgroun" }, function (response) {
    const userpid = response.value;
    console.log("Received userpid from background script:", userpid);

    
    fetch(`https://redditchrome.herokuapp.com/api/fake_posts?userid=${userpid}`)
      .then(response => response.json())
      .then(data => {
        // Check if the data contains the expected structure
        if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0].fake_post)) {
          const fakePosts = data[0].fake_post;
          console.log("Fake post retrieved successfully:", fakePosts);
    
          // Process each fake comment
          fakePosts.forEach(post => {
            // Access the properties of each comment
            const { fakepost_url, fakepost_index, fakepost_title, fakepost_content, fakepost_image } = post;
            

            var fakepost = document.createElement("div");
            fakepost.innerHTML=`<div class="_1oQyIsiPHYt6nx7VOmd1sz _1RYN-7H8gYctjOQeL8p2Q7 scrollerItem _3Qkp11fjcAw9I9wtLo8frE _1qftyZQ2bhqP62lbPjoGAh  Post t3_14x007q " data-testid="post-container" id="t3_14x007q" tabindex="-1" data-adclicklocation="background"><div></div><div class="_23h0-EcaBUorIHC-JZyh6J" style="width:40px;border-left:4px solid transparent"><div class="_1E9mcoVn4MYnuBQSVDt1gC" id="vote-arrows-t3_14x007q"><button aria-label="upvote" aria-pressed="false" class="voteButton " data-click-id="upvote" data-adclicklocation="upvote" id="upvote-button-t3_14x007q" data-listener-attached="true"><span class="_2q7IQ0BUOWeEZoeAxN555e _3SUsITjKNQ7Tp0Wi2jGxIM qW0l8Af61EP35WIG6vnGk _3edNsMs0PNfyQYofMNVhsG"><i class="icon icon-upvote _2Jxk822qXs4DaXwsN7yyHA"></i></span></button><div class="_1rZYMD_4xY3gRcSS3p8ODO _3a2ZHWaih05DgAOtvu6cIo " style="color:#1A1A1B">68</div><button aria-label="downvote" aria-pressed="false" class="voteButton" data-click-id="downvote" data-adclicklocation="downvote" data-listener-attached="true"><span class="_1iKd82bq_nqObFvSH1iC_Q Q0BxYHtCOJ_rNSPJMU2Y7 _2fe-KdD2OM0ciaiux-G1EL _3yQIOwaIuF6gn8db96Gu7y"><i class="icon icon-downvote ZyxIIl4FP5gHGrJDzNpUC"></i></span></button></div></div><div class="_1poyrkZ7g36PawDueRza-J _11R7M_VOgKO1RJyRSRErT3 " style="background:#FFFFFF" data-adclicklocation="background" data-click-id="background"><div class="_292iotee39Lmt0MkQZ2hPV RichTextJSON-root nAL34ZVf4KfyEoZIzUgmN _3hWVRt6y8PqOoC2VuZETZI"><p class="_1qeIAgB0cPwnLhDF9XSiJM">Because you've shown interest in a similar community</p></div><div class="_14-YvdFiW5iVvfe5wdgmET"><div class="_2dr_3pZUCk8KfJ-x0txT_l"><a data-click-id="subreddit" class="_3ryJoIoycVkA88fy40qNJc" href="/r/USPS/"><img style="background-color:#EA0027" alt="Subreddit Icon" role="presentation" src="https://styles.redditmedia.com/t5_2r25j/styles/communityIcon_rjykadp5gdab1.png" class="_34CfAAowTqdbNDYXz5tBTW _1WX5Y5qFVBTdr6hCPpARDB "></a></div><div class="cZPZhMe-UCZ8htPodMyJ5"><div class="_3AStxql1mQsrZuUIFP9xSg nU4Je7n-eSXStTBAPMYt8" data-adclicklocation="top_bar"><div class="_2mHuuvyV9doV3zwbZPtIPG"><a data-click-id="subreddit" class="_3ryJoIoycVkA88fy40qNJc" href="/r/USPS/">r/USPS</a><div id="SubredditInfoTooltip--t3_14x007q--USPS"></div></div><span class="_3LS4zudUBagjFS7HjWJYxo _37gsGHa8DMRAxBmQS-Ppg8 _3V4xlrklKBP2Hg51ejjjvz" role="presentation">•</span><span style="color:#787C7E" class="_2fCzxBE1dlMh4OFc7B3Dun">Posted by</span><div class="_2mHuuvyV9doV3zwbZPtIPG"><div id="UserInfoTooltip--t3_14x007q"><a class="_2tbHP6ZydRpjI44J3syuqC  _23wugcdiaj44hdfugIAlnX oQctV4n0yUb0uiHDdGnmE" data-click-id="user" data-testid="post_author_link" href="/user/Midliferenewal/" style="color: rgb(120, 124, 126);">u/Midliferenewal</a></div></div><span class="_2VF2J19pUIMSLJFky-7PEI" data-testid="post_timestamp" data-click-id="timestamp" style="color:#787C7E">3 hours ago</span></div><div class="_2wFk1qX4e1cxk8Pkw1rAHk"></div><div class="_3XoW0oYd5806XiOr24gGdb"></div></div><button role="button" tabindex="0" id="subscribe-button-t3_14x007q" class="_35dG7dsi4xKTT-_2MB74qq _2iuoyPiKHN3kfOoeIQalDT _10BQ7pjWbeYP63SAPNS8Ts UEPNkU0rd1-nvbkOcBatc "><span>Join</span></button></div><div class="_2FCtq-QzlfuN-SwVMUZMM3 _3wiKjmhpIpoTE2r5KCm2o6 t3_14x007q" data-adclicklocation="title"><div class="y8HYJ-y_lTUHkQIc1mdCq _2INHSNB8V5eaWp4P0rY_mE"><a data-click-id="body" class="SQnoC3ObvgnGjWt90zD9Z _2INHSNB8V5eaWp4P0rY_mE" href=${fakepost_url}><div class="_2SdHzo12ISmrC8H86TgSCp _3wqmjmv3tb_k-PROt7qFZe " style="--posttitletextcolor:#222222"><h3 class="_eYtD2XCVieq6emjKBH3m">${fakepost_title}</h3></div></a></div><div class="_2xu1HuBz1Yx6SP10AGVx_I" data-ignore-click="false"><div class="lrzZ8b0L6AzLkQj5Ww7H1"></div><div class="lrzZ8b0L6AzLkQj5Ww7H1"><a href="/r/USPS/?f=flair_name%3A%22Work%20Discussion%22"><span class="_1jNPl3YUk6zbpLWdjaJT1r _2VqfzH0dZ9dIl3XWNxs42y aJrgrewN9C8x1Fusdx4hh _1Dl-kvSxyJMWO9nuoTof8N " style="background-color:#0079D3;color:#FFFFFF">Work Discussion</span></a></div></div><div class="_1hLrLjnE1G_RBCNcN9MVQf"><img alt="" src="https://www.redditstatic.com/desktop2x/img/renderTimingPixel.png" style="width: 1px; height: 1px;" onload="(__markFirstPostVisible || function(){})();"></div><style>.t3_14x007q._2FCtq-QzlfuN-SwVMUZMM3 {--postTitle-VisitedLinkColor: #9b9b9b;--postTitleLink-VisitedLinkColor: #9b9b9b;--postBodyLink-VisitedLinkColor: #989898;}</style></div><div class="STit0dLageRsa2yR4te_b"><div class="m3aNC6yp8RrNM_-a0rrfa " data-click-id="media"><div class="_3gBRFDB5C34UWyxEe_U6mD" style="padding-bottom:133.28125%"></div><div class="_3JgI-GOrkmyIeDeyzXdyUD _2CSlKHjH7lsjx0IpjORx14"><div class="_1NSbknF8ucHV2abfCZw2Z1 "><a href=${fakepost_url}><div class="_3Oa0THmZ3f5iZXAQ0hBJ0k " style="max-height:512px;margin:0 auto"><div><img alt="Post image" class="_2_tDEnGMLxpM6uOa2kaDB3 ImageBox-image media-element _1XWObl-3b9tPy64oaG6fax" src=${fakepost_image} style="max-height:512px"></div></div></a></div></div></div></div><div class="_1ixsU4oQRnNfZ91jhBU74y"><div class="_1E9mcoVn4MYnuBQSVDt1gC _2oM1YqCxIwkvwyeZamWwhW uFwpR-OdmueYZxdY_rEDX" id="vote-arrows-t3_14x007q"><button aria-label="upvote" aria-pressed="false" class="voteButton " data-click-id="upvote" data-adclicklocation="upvote"><span class="_2q7IQ0BUOWeEZoeAxN555e _3SUsITjKNQ7Tp0Wi2jGxIM qW0l8Af61EP35WIG6vnGk _3edNsMs0PNfyQYofMNVhsG"><i class="icon icon-upvote _2Jxk822qXs4DaXwsN7yyHA"></i></span></button><div class="_1rZYMD_4xY3gRcSS3p8ODO _25IkBM0rRUqWX5ZojEMAFQ" style="color:#1A1A1B">68</div><button aria-label="downvote" aria-pressed="false" class="voteButton" data-click-id="downvote" data-adclicklocation="downvote"><span class="_1iKd82bq_nqObFvSH1iC_Q Q0BxYHtCOJ_rNSPJMU2Y7 _2fe-KdD2OM0ciaiux-G1EL _3yQIOwaIuF6gn8db96Gu7y"><i class="icon icon-downvote ZyxIIl4FP5gHGrJDzNpUC"></i></span></button></div><div class="_3-miAEojrCvx_4FQ8x3P-s"><a rel="nofollow" data-click-id="comments" data-adclicklocation="comments" data-test-id="comments-page-link-num-comments" class="_1UoeAeSRhOKSNdY_h3iS1O _1Hw7tY9pMr-T1F4P1C-xNU _3U_7i38RDPV5eBv7m4M-9J _2qww3J5KKzsD7e5DO0BvvU" href=${fakepost_url}><i class="icon icon-comment _3DVrpDrMM9NLT6TlsTUMxC" role="presentation"></i><span class="FHCV02u6Cp2zYL0fhQPsO">2 comments</span></a><div data-ignore-click="false" class="_3U_7i38RDPV5eBv7m4M-9J" data-adclicklocation="fl_unknown"><button class="_10K5i7NW6qcm-UoCtpB3aK YszYBnnIoNY8pZ6UwCivd _3yh2bniLq7bYr4BaiXowdO _1EWxiIupuIjiExPQeK4Kud _28vEaVlLWeas1CDiLuTCap"><span class="pthKOcceozMuXLYrLlbL1"><i class="_3yNNYT3e1avhAAWVHd0-92 icon icon-award" id="View--GiveAward--t3_14x007q"></i></span><span class="_2-cXnP74241WI7fpcpfPmg _70940WUuFmpHbhKlj8EjZ">Award</span></button></div><div class="_JRBNstMcGxbZUxrrIKXe _3U_7i38RDPV5eBv7m4M-9J _3yh2bniLq7bYr4BaiXowdO _1pShbCnOaF7EGWTq6IvZux _28vEaVlLWeas1CDiLuTCap" id="t3_14x007q-share-menu"><button data-click-id="share" data-adclicklocation="fl_share" class="kU8ebCMnbXfjCWfqn0WPb"><i class="icon icon-share _1GQDWqbF-wkYWbrpmOvjqJ"></i><span class="_6_44iTtZoeY6_XChKt5b0">share</span></button></div><div data-ignore-click="false" class="_3U_7i38RDPV5eBv7m4M-9J" data-adclicklocation="fl_unknown"><button class="_10K5i7NW6qcm-UoCtpB3aK YszYBnnIoNY8pZ6UwCivd _3yh2bniLq7bYr4BaiXowdO _2sAFaB0tx4Hd5KxVkdUcAx _28vEaVlLWeas1CDiLuTCap"><span class="pthKOcceozMuXLYrLlbL1"><i class="_1Xe01txJfRB9udUU85DNeR icon icon-save"></i></span><span class="_2-cXnP74241WI7fpcpfPmg _70940WUuFmpHbhKlj8EjZ">save</span></button></div><div class="OccjSdFd6HkHhShRg6DOl"></div><div class="_3MmwvEEt6fv5kQPFCVJizH"><div><button aria-expanded="false" aria-haspopup="true" aria-label="more options" id="t3_14x007q-overflow-menu" data-adclicklocation="overflow_menu" class="_2pFdCpgBihIaYh9DSMWBIu _1EbinKu2t3KjaT2gR156Qp uMPgOFYlCc5uvpa2Lbteu"><i class="_38GxRFSqSC-Z2VLi5Xzkjy icon icon-overflow_horizontal"></i></button></div></div><div class="_21pmAV9gWG6F_UKVe7YIE0"></div></div></div></div></div>`;
            let elements = document.querySelector('.rpBJOHq2PR60pnwJlUyP0');
            
          
          
          
            fakepost.addEventListener('click', function() {
              // Replace 'https://example.com' with the desired URL
              window.location.href = fakepost_url;
            });
          
          // Insert the cloned post with the modified img src
          elements.insertBefore(fakepost, elements.children[fakepost_index]);
            
        
            // Proceed with further actions using the decoded data
          });
        } else {
          console.error("Invalid data format received");
        }
      })
      .catch(error => console.error('Error:', error));
      
  
    // Proceed with further actions using the userpid
  });




}


function removeDivs() {
  const commentDivs = document.querySelectorAll('div.Comment');
  
    commentDivs[1].remove();
    commentDivs[3].remove();
  console.log(`Length of commentDivs: ${commentDivs.length}`);

  const targetDivs = document.querySelectorAll('div._3_mqV5-KnILOxl1TvgYtCk');
  targetDivs.forEach(div => div.remove());
  //console.log(`Length of targetDivs: ${targetDivs.length}`);
}

function changecomment_content(cd, username, content)
{
  var pElement = cd.querySelector('p');
  var aElement = cd.querySelector('a.wM6scouPXXsFDSZmZPHRo');

// Change the content of the <p> element
aElement.textContent = username;

// Change the content of the <a> element
pElement.textContent = content;


}

const covidKeywords = [
  'COVID-19',
  'coronavirus',
  'pandemic',
  'SARS-CoV-2',
  'lockdown',
  'quarantine',
  'social distancing',
  'face mask',
  'hand sanitizer',
  'vaccine',
  'vaccination',
  'testing',
  'symptoms',
  'asymptomatic',
  'incubation',
  'transmission',
  'ventilator',
  'intensive care',
  'epidemic',
  'outbreak',
  'contact tracing',
  'immunity'
];
let highlightedNodes ; // Keep track of highlighted nodes
let replacedNodes ; // Keep track of replaced nodes
// Retrieve the highlightedNodes array from Chrome storage
chrome.storage.local.get('highlightedNodes', function(result) {
  highlightedNodes = result.highlightedNodes;
 // Remove the highlighting from all the stored nodes

});

chrome.storage.local.get('', function(result) {
   replacedNodes = result.replacedNodes;
  // Remove the highlighting from all the stored nodes

});





chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "send_options") {
    let options = request.optionalValue;
    const nodes = document.querySelectorAll('*:not(:has(*))');
    highlightedNodes = []; // Keep track of highlighted nodes
    replacedNodes = []; // Keep track of replaced nodes
    const commentDivs = document.querySelectorAll('div.Comment');
    //alert(options);
    switch (options) {
      case 2:
        nodes.forEach(function (node) {
          let nodeHTML = node.innerHTML;
            
          covidKeywords.forEach(function (keyword) {
            if (node.textContent.includes(keyword)) {
              const className = `highlighted-${highlightedNodes.length}`;
              const highlightedKeyword = `<span class="${className}" style="background-color: yellow">${keyword}</span>`;
              nodeHTML = nodeHTML.split(keyword).join(highlightedKeyword);
              highlightedNodes.push(className);
            }
          });
            
          node.innerHTML = nodeHTML;
        });
        
        chrome.storage.local.set({ 'highlightedNodes': highlightedNodes }, function () {
          console.log('Highlighted nodes stored in Chrome storage');
        });
        
        break;
      case 3: 
        nodes.forEach(function (node) {
          let nodeHTML = node.innerHTML;
        
          covidKeywords.forEach(function (keyword) {
            if (node.textContent.includes(keyword)) {
              const id = `replaced-${replacedNodes.length}`;
              const replaceWords = `<span id="${id}">Chenchen</span>`;
              const keywordRegex = new RegExp(keyword, 'g'); // create a RegExp object with the keyword to match all occurrences
              const nodeData = {
                id: id,
                originalKeyword: keyword // store only the original keyword
              };
              nodeHTML = nodeHTML.replace(keywordRegex, replaceWords); // replace all occurrences of the keyword with the replacement HTML
              replacedNodes.push(nodeData);
            }
          });
        
          node.innerHTML = nodeHTML;
        });
        
        chrome.storage.local.set({ 'replacedNodes': replacedNodes }, function () {
          console.log('Replaced nodes stored in Chrome storage');
        });
        
        break;
      case 4: 
        

        // Hide all comments
        commentDivs.forEach((commentDiv) => {
          commentDiv.style.display = 'none';
        });
              
        break; 
      case 5:

        // Hide comments containing keywords
        commentDivs.forEach((commentDiv) => {
          const commentText = commentDiv.textContent.toLowerCase();
          const containsKeyword = covidKeywords.some((keyword) => commentText.includes(keyword));
          if (containsKeyword) {
            commentDiv.style.display = 'none';
          }
        });
        break; 

      case -1:
        undoHighlighting();
        undoReplacement();
        unhideComments();
        break;
      // Other cases...
    }
  }
});

function undoHighlighting() {
  chrome.storage.local.get(['highlightedNodes'], function (result) {
    if (result.highlightedNodes) {
      result.highlightedNodes.forEach(function (className) {
        const highlightedNodes = document.querySelectorAll(`.${className}`);
        highlightedNodes.forEach(function (node) {
          node.outerHTML = node.innerHTML; // replace the node with its inner HTML to remove the highlight span element
          node.classList.remove(className); // remove the unique class name
        });
      });

      chrome.storage.local.remove(['highlightedNodes'], function () {
        console.log('Highlighted nodes removed from Chrome storage');
      });
    }
  });
}


function undoReplacement() {
  chrome.storage.local.get(['replacedNodes'], function (result) {
    if (result.replacedNodes) {
      result.replacedNodes.forEach(function (nodeData) {
        const replacedNode = document.querySelector(`#${nodeData.id}`);
        if (replacedNode) {
          const keywordRegex = new RegExp('Chenchen', 'g'); // create a RegExp object with the replacement keyword to match all occurrences
          replacedNode.innerHTML = replacedNode.innerHTML.replace(keywordRegex, nodeData.originalKeyword);
          replacedNode.removeAttribute('id');
        }
      });

      chrome.storage.local.remove(['replacedNodes'], function () {
        console.log('Replaced nodes removed from Chrome storage');
      });
    }
  });
}

function unhideComments() {
  const commentDivs = document.querySelectorAll('div.Comment');

  commentDivs.forEach((commentDiv) => {
    commentDiv.style.display = 'block'; // or 'inline-block', depending on the original display value
  });
}




////  dan 
var surveyQuestionsCoutner = 0,
surveyPopup,
surveyInterval;
let q1selected = 0,
q2selected = 0;


var surveyQuestions = [
    [`1 is bad, 10 is good (i.e., "How happy are you feeling today?")`,
        `How likely are you to do this experiment again (i.e. "1 least likely and
        10 most likely")`
    ],
    [`To what extent are you feeling tense while using the Reddit interface?`,
        `To what extent are you disinterested in the content you are viewing?`
    ],
    [`How captivating do you find the content you are viewing?`,
        `How valuable do you find the information presented in the content you are viewing?`
    ],
    [`To what extent are you invested in the content you are viewing?`,
        `How joyful do you feel about the content you are viewing?`
    ],
    [`To what extent are you annoyed while using the Reddit interface?`,
        `How comprehensible do you find the content you are viewing?`
    ],
];

function getSurveyHTML() {
    return `
<div id='midpop' class="container">
<div class="row">
    <div class="col-xs-12">
        <p class="page-header">${surveyQuestions[surveyQuestionsCoutner][0]}</p>
        <div class="chart-scale">
            <button class="q1 btn btn-scale btn-scale-desc-1">1</button>
            <button class="q1 btn btn-scale btn-scale-desc-2">2</button>
            <button class="q1 btn btn-scale btn-scale-desc-3">3</button>
            <button class="q1 btn btn-scale btn-scale-desc-4">4</button>
            <button class="q1 btn btn-scale btn-scale-desc-5">5</button>
            <button class="q1 btn btn-scale btn-scale-desc-6">6</button>
            <button class="q1 btn btn-scale btn-scale-desc-7">7</button>
            <button class="q1 btn btn-scale btn-scale-desc-8">8</button>
            <button class="q1 btn btn-scale btn-scale-desc-9">9</button>
            <button class="q1 btn btn-scale btn-scale-desc-10">10</button>
            <hr>
            </div>

            <p class="page-header">${surveyQuestions[surveyQuestionsCoutner][1]}</p>
            <div class="chart-scale">
                <button class="q2 btn btn-scale btn-scale-desc-1">1</button>
                <button class="q2 btn btn-scale btn-scale-desc-2">2</button>
                <button class="q2 btn btn-scale btn-scale-desc-3">3</button>
                <button class="q2 btn btn-scale btn-scale-desc-4">4</button>
                <button class="q2 btn btn-scale btn-scale-desc-5">5</button>
                <button class="q2 btn btn-scale btn-scale-desc-6">6</button>
                <button class="q2 btn btn-scale btn-scale-desc-7">7</button>
                <button class="q2 btn btn-scale btn-scale-desc-8">8</button>
                <button class="q2 btn btn-scale btn-scale-desc-9">9</button>
                <button class="q2 btn btn-scale btn-scale-desc-10">10</button>
            </div>

    </div>

    <button type="submit" id="midpop-submit" class="btn btn-success" onsumbit="">Submit</button>
</div>
</div>
`
}

function surveyPopupShow() {
    surveyPopup = new smq.Popup({
        title: 'Reddit Extension Survey',
        innerHtml: getSurveyHTML()
    });
    surveyPopup.show();
}



function initSurveyQ() {
    var arr = document.querySelectorAll(".btn-scale");

    for (var i = 0; i < arr.length; i++) {
        arr[i].addEventListener("click", surveyButtonSelect);
    }
}

function surveyButtonSelect(event) {
  var array = event.target.classList;

  for (var i = 0; i < array.length; i++) {
    if (array[i] == "q1") {
      if (q1selected != 0) {
        // remove highlight class from previously selected button
        document.querySelector(".q1.btn-scale-desc-" + q1selected).classList.remove("highlight");
      }
      q1selected = event.target.innerHTML;
      // add highlight class to selected button
      event.target.classList.add("highlight");
    } else if (array[i] == "q2") {
      if (q2selected != 0) {
        // remove highlight class from previously selected button
        document.querySelector(".q2.btn-scale-desc-" + q2selected).classList.remove("highlight");
      }
      q2selected = event.target.innerHTML;
      // add highlight class to selected button
      event.target.classList.add("highlight");
    }
  }
}


function surveySubmit() {

    
    var surveyObj = {
        q1: {
            q: surveyQuestions[surveyQuestionsCoutner][0],
            a: q1selected,
        },
        q2: {
            q: surveyQuestions[surveyQuestionsCoutner][1],
            a: q2selected,
        }
    }

    chrome.runtime.sendMessage({
        message: "send_question_data_from_timerjs",
        data: surveyObj
    });

    surveyPopup.close();
    console.log(surveyObj);
    /*chrome.runtime.sendMessage({
        message: "send_question_data_from_timerjs",
        q1selected: q1selected,
        q2selected: q2selected
    });
    chrome.runtime.sendMessage({
        message: "question_submitted"
    });*/
}

function startSurveyPopup() {
    surveyPopupShow();
    initSurveyQ();
    document.querySelector("#midpop-submit").addEventListener("click", surveySubmit);
    surveyQuestionsCoutner += 1;
}

/* chrome.storage.local.get('fakepost_fullUrl', (result) => {
  console.log('Retrieved fakepost_fullUrl value:', result.fakepost_fullUrl);
});

function onFakePostPageLoaded() {
  
  if (window.location.href === fakepost_fullUrl) {
    // Perform your action here when the fake post URL is fully loaded
    console.log('Fake post URL loaded:', fakepost_fullUrl);
  }
}

// Listen for the load event to check if the URL has changed and is fully loaded
window.addEventListener('load', onFakePostPageLoaded);

// Check the initial URL when the content script is loaded
onFakePostPageLoaded(); */






var smq = {

  Popup: function(config) {

    this.conf = config || {};

    this.init = function() {
      var conf = config || {};
      //if there are <smq-popup>, remove nodes
      var existingNodes = document.getElementsByTagName("smq-popup");
      if(existingNodes && existingNodes.length > 0) {
        for(var i = 0; i<existingNodes.length; i++) {
          document.body.removeChild(existingNodes[i]);
        }
      }

      //create popup nodes
      this.nodePopup = document.createElement("smq-popup");
      this.nodePopup.innerHTML = '<div class="window"><header class="api-header"><h1 class="api-title"></h1></header><div class="api-content"></div></div>';
      this.nodePopup.getElementsByClassName("api-title")[0].innerHTML = this.conf.title || "";
      this.nodePopup.getElementsByClassName("api-content")[0].innerHTML = this.conf.innerHtml || "";

      

    };

    this.show = function() {
      //insert nodePopup in body
      document.body.appendChild(this.nodePopup);
    };

    this.close = function() {
      this.nodePopup ? document.body.removeChild(this.nodePopup) : null;
      this.nodePopup = undefined;
    };

    this.init(config);

  }
};

// Daniel's work lets comment it out for now 
/* chrome.tabs.insertCSS(tabId, {
  file: 'popup.css'
}); */

function read_fakecomment_from_database ()
{
  



  chrome.runtime.sendMessage({ message: "need_uid_from_backgroun" }, function (response) {
    const userpid = response.value;
    console.log("Received userpid from background script:", userpid);

    fetch(`https://redditchrome.herokuapp.com/api/fake_posts?userid=${userpid}`)
      .then(response => response.json())
      .then(data => {
        // Check if the data contains the expected structure
        if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0].fake_post)) {
          const fakePosts = data[0].fake_post;
          console.log("Fake post retrieved successfully:", fakePosts);
    
          // Process each fake comment
          fakePosts.forEach(post => {
            // Access the properties of each comment
            const { fakepost_url, fakepost_index, fakepost_title, fakepost_content, fakepost_image } = post;
            
            
            if (window.location.href === fakepost_url) 
            {
              console.log("fake post first");
              // The current page URL matches the post_url
              console.log('Current page matches the post URL in change fake post dom');

              var commentDivsforFakePost = document.querySelectorAll('div.Comment');
  
              //const commentDivs = document.querySelectorAll('div.Comment');
                // Hide all comments
                commentDivsforFakePost.forEach((commentDiv) => {
                  commentDiv.style.display = 'none';
                });

              // Find the element with the specified class name
              const element = document.querySelector('._1oQyIsiPHYt6nx7VOmd1sz');

              // Replace its inner HTML
              if (element) {
                element.innerHTML = `<div class="_1oQyIsiPHYt6nx7VOmd1sz _2rszc84L136gWQrkwH6IaM  Post t3_12s1gu9 " data-testid="post-container" id="t3_12s1gu9" tabindex="-1" data-adclicklocation="background"><div data-test-id="post-content"><div class="_23h0-EcaBUorIHC-JZyh6J" style="width:40px;border-left:4px solid transparent"><div class="_1E9mcoVn4MYnuBQSVDt1gC" id="vote-arrows-t3_12s1gu9"><button aria-label="upvote" aria-pressed="false" class="voteButton " data-click-id="upvote" data-adclicklocation="upvote" id="upvote-button-t3_12s1gu9"><span class="_2q7IQ0BUOWeEZoeAxN555e _3SUsITjKNQ7Tp0Wi2jGxIM qW0l8Af61EP35WIG6vnGk _3edNsMs0PNfyQYofMNVhsG"><i class="icon icon-upvote _2Jxk822qXs4DaXwsN7yyHA"></i></span></button><div class="_1rZYMD_4xY3gRcSS3p8ODO _3a2ZHWaih05DgAOtvu6cIo _2iiIcja5xIjg-5sI4ECvcV" style="color:#1A1A1B">155</div><button aria-label="downvote" aria-pressed="false" class="voteButton" data-click-id="downvote" data-adclicklocation="downvote"><span class="_1iKd82bq_nqObFvSH1iC_Q Q0BxYHtCOJ_rNSPJMU2Y7 _2fe-KdD2OM0ciaiux-G1EL _3yQIOwaIuF6gn8db96Gu7y"><i class="icon icon-downvote ZyxIIl4FP5gHGrJDzNpUC"></i></span></button></div></div><div class="_14-YvdFiW5iVvfe5wdgmET"><div class="cZPZhMe-UCZ8htPodMyJ5"><div class="_3AStxql1mQsrZuUIFP9xSg nU4Je7n-eSXStTBAPMYt8" data-adclicklocation="top_bar"><span style="color:#787C7E" class="_2fCzxBE1dlMh4OFc7B3Dun">Posted by</span><div class="_2mHuuvyV9doV3zwbZPtIPG"><div id="UserInfoTooltip--t3_12s1gu9"><a class="_2tbHP6ZydRpjI44J3syuqC  _23wugcdiaj44hdfugIAlnX oQctV4n0yUb0uiHDdGnmE" data-click-id="user" data-testid="post_author_link" href="/user/thanbini/" style="color: rgb(120, 124, 126);">u/thanbini</a></div></div><span class="_2VF2J19pUIMSLJFky-7PEI" data-testid="post_timestamp" data-click-id="timestamp" style="color:#787C7E">3 months ago</span></div><div class="_2wFk1qX4e1cxk8Pkw1rAHk"></div><div class="_3XoW0oYd5806XiOr24gGdb"></div></div><button class="_3KTYozwt91D81Yub-OQ4S3"><i class="SDzveG4fJf98RLE5vll2w icon icon-notification" aria-label="Follow post to stay updated"></i></button></div><div class="_2FCtq-QzlfuN-SwVMUZMM3 _2v9pwVh0VUYrmhoMv1tHPm t3_12s1gu9" data-adclicklocation="title"><div class="y8HYJ-y_lTUHkQIc1mdCq _2INHSNB8V5eaWp4P0rY_mE"><div class="_2SdHzo12ISmrC8H86TgSCp _29WrubtjAcKqzJSPdQqQ4h " style="--posttitletextcolor:#1A1A1B"><h1 class="_eYtD2XCVieq6emjKBH3m">${fakepost_title}</h1></div></div><div class="_1hLrLjnE1G_RBCNcN9MVQf"><img alt="" src="https://www.redditstatic.com/desktop2x/img/renderTimingPixel.png" style="width: 1px; height: 1px;" onload="(__markFirstPostVisible || function(){})();"></div><style>.t3_12s1gu9._2FCtq-QzlfuN-SwVMUZMM3 {--postTitle-VisitedLinkColor: #9b9b9b;--postTitleLink-VisitedLinkColor: #9b9b9b;--postBodyLink-VisitedLinkColor: #989898;}</style></div><div class="_1NSbknF8ucHV2abfCZw2Z1 "><div class="_3Oa0THmZ3f5iZXAQ0hBJ0k " style="margin:0 auto"><a href="https://i.redd.it/zw08rpjvrwua1.jpg" target="_blank" rel="noopener noreferrer" class="_3m20hIKOhTTeMgPnfMbVNN"><img alt="r/lehighvalley - a road with cars and trees on the side" class="_2_tDEnGMLxpM6uOa2kaDB3 ImageBox-image media-element _1XWObl-3b9tPy64oaG6fax" src=${fakepost_image} style="max-height:700px"></a></div></div><div class="_1Bdk-WLPvP2xHwSSQ3qsHq"><div class="_292iotee39Lmt0MkQZ2hPV RichTextJSON-root"><p class="_1qeIAgB0cPwnLhDF9XSiJM">${fakepost_content}</p></div></div><div class="_1hwEKkB_38tIoal6fcdrt9"><div class="_3-miAEojrCvx_4FQ8x3P-s"><div class="_1UoeAeSRhOKSNdY_h3iS1O _3m17ICJgx45k_z-t82iVuO _3U_7i38RDPV5eBv7m4M-9J _2qww3J5KKzsD7e5DO0BvvU"><i class="icon icon-comment _3DVrpDrMM9NLT6TlsTUMxC" role="presentation"></i><span class="FHCV02u6Cp2zYL0fhQPsO">7 comments</span></div><div data-ignore-click="false" class="_3U_7i38RDPV5eBv7m4M-9J" data-adclicklocation="fl_unknown"><button class="_10K5i7NW6qcm-UoCtpB3aK YszYBnnIoNY8pZ6UwCivd _3yh2bniLq7bYr4BaiXowdO _1EWxiIupuIjiExPQeK4Kud _28vEaVlLWeas1CDiLuTCap"><span class="pthKOcceozMuXLYrLlbL1"><i class="_3yNNYT3e1avhAAWVHd0-92 icon icon-award" id="View--GiveAward--t3_12s1gu9"></i></span><span class="_2-cXnP74241WI7fpcpfPmg _70940WUuFmpHbhKlj8EjZ">Award</span></button></div><div class="_JRBNstMcGxbZUxrrIKXe _3U_7i38RDPV5eBv7m4M-9J _3yh2bniLq7bYr4BaiXowdO _1pShbCnOaF7EGWTq6IvZux _28vEaVlLWeas1CDiLuTCap" id="t3_12s1gu9-share-menu"><button data-click-id="share" data-adclicklocation="fl_share" class="kU8ebCMnbXfjCWfqn0WPb"><i class="icon icon-share _1GQDWqbF-wkYWbrpmOvjqJ"></i><span class="_6_44iTtZoeY6_XChKt5b0">share</span></button></div><div data-ignore-click="false" class="_3U_7i38RDPV5eBv7m4M-9J" data-adclicklocation="fl_unknown"><button class="_10K5i7NW6qcm-UoCtpB3aK YszYBnnIoNY8pZ6UwCivd _3yh2bniLq7bYr4BaiXowdO _2sAFaB0tx4Hd5KxVkdUcAx _28vEaVlLWeas1CDiLuTCap"><span class="pthKOcceozMuXLYrLlbL1"><i class="_1Xe01txJfRB9udUU85DNeR icon icon-save"></i></span><span class="_2-cXnP74241WI7fpcpfPmg _70940WUuFmpHbhKlj8EjZ">save</span></button></div><div class="OccjSdFd6HkHhShRg6DOl"></div><div class="_3MmwvEEt6fv5kQPFCVJizH"><div><button aria-expanded="false" aria-haspopup="true" aria-label="more options" id="t3_12s1gu9-overflow-menu" data-adclicklocation="overflow_menu" class="_2pFdCpgBihIaYh9DSMWBIu _1EbinKu2t3KjaT2gR156Qp uMPgOFYlCc5uvpa2Lbteu"><i class="_38GxRFSqSC-Z2VLi5Xzkjy icon icon-overflow_horizontal"></i></button></div></div><div class="_21pmAV9gWG6F_UKVe7YIE0"></div></div><span></span><span></span></div></div></div>`;
                //var newbutton = element.getElementsByClassName(commentLikeclassName)[0];
                //childElement.textContent = parseInt(childElement.textContent) +1;
              

                // disable the comment button on the top of the post 
                var targetClassName = '._22S4OsoDdOqiM-hPTeOURa';

                // Get the button element with the specified class name
                var button = document.querySelector( targetClassName);

                if (button) {
                  // Button element found, you can use it here
                var clonedButton = button.cloneNode(true);
                

                  button.parentNode.replaceChild(clonedButton, button);
                  


// handle the input box is empty issue 

function handleInput(event) {
  var element = event.target;
  if (element.innerText.trim() === '') {
    console.log('Inner text is empty.');
    clonedButton.disabled = true;
    
  } else {
    console.log('Inner text is not empty:', element.innerText);

    clonedButton.disabled = false;
  }
}

var  targetClassName = '_13Sj3UMDKkCCJTq88berCB';
                    var parent = clonedButton.parentNode;
                    while (parent && !parent.querySelector(`.${targetClassName}`)) {
                      parent = parent.parentNode;
                    }

                    if (parent) {
                      // Found the nearest parent with the target class name
                      var childElement = parent.querySelector(`.${targetClassName}`);

                      // Add input event listener to the target element
                      childElement.addEventListener('keyup', handleInput);
                    }


                


                  clonedButton.addEventListener('click', function() {
                    // Your event handler code here
                    //console.log('Cloned button clicked!');
                    var  targetClassName = '_13Sj3UMDKkCCJTq88berCB';
                    var parent = clonedButton.parentNode;
                    while (parent && !parent.querySelector(`.${targetClassName}`)) {
                      parent = parent.parentNode;
                    }

                    if (parent) {
                      // Found the nearest parent with the target class name
                      var childElement = parent.querySelector(`.${targetClassName}`);

                      //alert('Inner text of the element with class name:', childElement.innerText);
                      if(childElement.innerText.trim()  !== '' ){

console.log("do",childElement.innerText);
                        fakecommentID = -1; 
              fakeCommentInsertIndex = 0; 
              fakeCommentUserName = document.querySelector("._2BMnTatQ5gjKGK5OWROgaG").innerText;; 
              fakeCommnetContent = childElement.innerText; 

              chrome.runtime.sendMessage({
                message: "insert user reply in fake post to db",
                commentId: fakecommentID,
                userRedditName: fakeCommentUserName,
                commentContent: fakeCommnetContent, 
                insertindex: fakeCommentInsertIndex,
                posturl: window.location.href,
              }, function(response) {
                // Handle the response from the background script if needed
              }); 
              //alert("should not pop up");
             // childElement.textContent = '';
                        insert_comment(fakecommentID, parentContainer, likebuttonSelector, dislikebuttonSelector, ButtonColorClass, commentTextClassName, commentLikeclassName, replyCommentSelector);
                      
                        clonedButton.disabled = true;
                      
                      
                      }
                    } else {
                      //alert('Parent node with class name not found.');
                    }
                    //insert_comment(fakecommentID, parentContainer, likebuttonSelector, dislikebuttonSelector, ButtonColorClass, commentTextClassName, commentLikeclassName, replyCommentSelector);
                  
                  });
                 


                } else {
                  console.log('Button not found in the DOM.');
                }


              
              }

              
            

            } else {
              // The current page URL does not match the post_url
              //console.log(window.location.href);
              //console.log(rowData.post_url);
              console.log('Current page does not match the post URL in fake post dom');
            }
            // Proceed with further actions using the decoded data
          });

          fetch(`https://redditchrome.herokuapp.com/api/fake_comments?userid=${userpid}`)
      .then(response => response.json())
      .then(data => {
        // Check if the data contains the expected structure
        if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0].fake_comment)) {
          const fakeComments = data[0].fake_comment;
          console.log("Fake comments retrieved successfully:", fakeComments);
    
          // Process each fake comment
          fakeComments.forEach(comment => {
            // Access the properties of each comment
            const { fake_comment_id, user_name, content, where_to_insert, post_url } = comment;
            //console.log("Fake comment ID:", fake_comment_id);
            //console.log("User name:", user_name);
            //console.log("Content:", content);
            //console.log("Where to insert:", where_to_insert);
            //console.log("Post URL:", post_url);
            
            if (window.location.href === post_url) {
              console.log("fake comment first");
              // The current page URL matches the post_url
              console.log('Current page matches the post URL');
              fakecommentID = fake_comment_id; 
              fakeCommentInsertIndex = where_to_insert; 
              fakeCommentUserName = user_name; 
              fakeCommnetContent = content; 
              insert_comment(fakecommentID, parentContainer, likebuttonSelector, dislikebuttonSelector, ButtonColorClass, commentTextClassName, commentLikeclassName, replyCommentSelector);
            } else {
              // The current page URL does not match the post_url
              //console.log(window.location.href);
              //console.log(rowData.post_url);
              console.log('Current page does not match the post URL');
            }
            // Proceed with further actions using the decoded data
          });
        } else {
          console.error("Invalid data format received");
        }
      })
      .catch(error => console.error('Error:', error));
      
        } else {
          console.error("Invalid data format received");
        }
      })
      .catch(error => console.error('Error:', error));







    
  
    // Proceed with further actions using the userpid
  });

  setTimeout(() => {
    document.documentElement.style.visibility = 'visible';
  }, 100); // Delay of 2000 milliseconds (2 seconds)
  
  
}






/* if (window.location.href === rowData.post_url) {
  // The current page URL matches the post_url
  console.log('Current page matches the post URL');
  insert_comment(parentContainer, likebuttonSelector, dislikebuttonSelector, ButtonColorClass, commentTextClassName, commentLikeclassName, replyCommentSelector);
} else {
  // The current page URL does not match the post_url
  console.log(window.location.href);
  console.log(rowData.post_url);
  console.log('Current page does not match the post URL');
}
 */

//document.documentElement.style.visibility = 'visible';

