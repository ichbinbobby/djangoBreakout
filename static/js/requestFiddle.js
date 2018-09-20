var submit = document.getElementById("button").addEventListener("click", getInput);

function getInput() {
    console.log("ANFANG");

    var username = document.getElementById("username").value;
    var score = document.getElementById("score").value;
    var text = username + score;

    var xmlhttp = new XMLHttpRequest();

    // download
    xmlhttp.addEventListener("progress", updateProgress);
    xmlhttp.addEventListener("load", transferComplete);
    xmlhttp.addEventListener("error", transferFailed);
    xmlhttp.addEventListener("abort", transferCanceled);
    // upload
    xmlhttp.upload.addEventListener("progress", updateProgress);
    xmlhttp.upload.addEventListener("load", transferComplete);
    xmlhttp.upload.addEventListener("error", transferFailed);
    xmlhttp.upload.addEventListener("abort", transferCanceled);

    xmlhttp.open("GET", "", true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xmlhttp.onreadystatechange = function() {//Call a function when the state changes.
        console.log(this.readyState);
        if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            document.getElementById("demo").innerHTML = text;
        }
    }
    xmlhttp.send();
    console.log("ENDE");
}

// progress on transfers from the server to the client (downloads)
function updateProgress (oEvent) {
  if (oEvent.lengthComputable) {
    var percentComplete = oEvent.loaded / oEvent.total * 100;
    console.log("Progress: " + percentComplete);
  } else {
    console.log("Unable to compute progress information since the total size is unknown");
  }
}

function transferComplete(evt) {
  console.log("The transfer is complete.");
}

function transferFailed(evt) {
  console.log("An error occurred while transferring the file.");
}

function transferCanceled(evt) {
  console.log("The transfer has been canceled by the user.");
}

// TODO django handler der request entgegennimmt, mit sleep um code zu beobachten
// was passiert mit dem status
// datenuebertragung x-www-form-urlencoded