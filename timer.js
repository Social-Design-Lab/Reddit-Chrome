
var time;
document.addEventListener('DOMContentLoaded', function () {
  load();
  document.querySelector('#start').addEventListener('click', startExp);
});
function load()
{
  
  hide("settings");
  hide("display");
  chrome.runtime.sendMessage({ message: "get_time" }, function(response) {
    //chrome.runtime.sendMessage({ message: "get_time" }, function(response) {
      time=response.value;
      if(time == null)
      {
        //alert("time is undefined");
        show("settings");
        hide("display");
       
      }
      else
      {
        //alert("time should be defined");
        hide("settings");
        show("display");
      }
      
    //});
  });


}
function show(section)
{
  document.getElementById(section).style.display = "block";
}

function showInline(section)
{
  document.getElementById(section).style.display = "inline";
}

function hide(section)
{
  document.getElementById(section).style.display = "none";
}

// call setExp function from background.js
function startExp()
{
  chrome.runtime.sendMessage({ message: "call_function" });
  hide("settings");
  show("display");
 
}
