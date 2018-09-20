document.getElementById("myForm").addEventListener("submit", send);

function send(event){
    event.preventDefault();
    var username = document.getElementById("username").value;
    var score = window.score;

    var text = "username=" + encodeURIComponent(username) + "&score=" + encodeURIComponent(score);


    var XHR = new XMLHttpRequest();

    // for url pattern in urls.py
    XHR.open("POST", "server", true);
    XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');


    XHR.onreadystatechange = function() {//Call a function when the state changes.

        switch(this.readyState) {
        case 0:
            console.log("responseText:" + this.responseText);
            console.log(this.readyState + ": request not initialized");
            break;
        case 1:
            console.log("responseText:" + this.responseText);
            console.log(this.readyState + ": server connection established");
            break;
        case 2:
            console.log("responseText:" + this.responseText);
            console.log(this.readyState + ": request received");
            break;
        case 3:
            console.log("responseText:" + this.responseText);
            console.log(this.readyState + ": processing request");
            break;
        case 4:
            console.log("responseText:" + this.responseText);
            console.log(this.readyState + ": request finished and response is ready");
            if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                alert(this.responseText);
            } else {
                console.log("readyState: " + this.readyState);
                console.log("status: " + this.status);
                alert('There was a problem with the request. \n' + this.responseText);
            }
            break;
        default:
            console.log(this.readyState + ": Error");
        }
    }

    XHR.send(text);
}

function open_form() {
    document.getElementById("user_entry").style.display = "block";
}

function close_form() {
    document.getElementById("user_entry").style.display = "none";
}


