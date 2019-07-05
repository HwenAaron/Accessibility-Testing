document.getElementById("testing").innerHTML = "js works to here 1";

/* 5. Alert! You're offline
-----------------------------------------------------------------------------------------
*/

// Function to run when going offline

var offline = function() {
  if (!$('#status').hasClass('offline')) {
    $('#status')
      .attr('class', 'offline')
      .text('There\'s no internets. Go to the pub!');
  }
}

// Function to run when back online

var online = function() {
  if (!$('#status').hasClass('online')) {
    $('#status')
      .attr('class', 'online')
      .text('You are online.');
  }
}

// Test by trying to poll a file

function testConnection(url) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
      online();
    }
    xmlhttp.onerror = function() {
      offline();
    }
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
}

// Loop the test every ten seconds for "test_resource.html"

function start() {
  rand = Math.floor(Math.random()*90000) + 20000;
  testConnection('http://localhost:3000/projects?fresh=' + rand);
  setTimeout(start, 20000);
}

// Start the first test

start();

document.getElementById("p1").innerHTML = "js works to here 2";


