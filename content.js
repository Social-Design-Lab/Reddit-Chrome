// content.js
// Wait for the DOM to be fully loaded
/* window.addEventListener('load', function() {
    // Select all elements with the class "_1rZYMD_4xjzK" (which represents the like button)
    const likeButtons = document.getElementsByClassName("_1rZYMD_4xY3gRcSS3p8ODO _25IkBM0rRUqWX5ZojEMAFQ _3ChHiOyYyUkpZ_Nm3ZyM2M");

    console.log("print out likebuttons length: ");
    console.log(likeButtons['length'] );
    // For each like button, change the text content to the desired number
    for (let i = 0; i < likeButtons['length']; i++) {
        likeButtons[i].textContent=0;
      }
  }); */
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



