document.getElementById("myForm").addEventListener("submit", submitEntry);

function submitEntry (event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var score = window.score;
    var result = {username, score};

    close_form();

    send(result)
        .then(function(value){
            console.log("Request succesful: " + value);
        },
        function (value) {
            console.log(value);
        }
    );
}

function send(result){

    return new Promise(function(resolve, reject) {

        var text = form_query(result);
        var XHR = new XMLHttpRequest();

        XHR.open("POST", "server", true);
        XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        XHR.onreadystatechange = function() {
            if (this.readyState !== XMLHttpRequest.DONE) {
                return;
            }

            if (this.status < 300) {
                resolve(this.status);
            } else {
                var reason = new Error("Could not send Request: " + this.status);
                reject(reason);
            }
        }
        XHR.send(text);
    });
}

function open_form() {
    document.getElementById("user_entry").style.display = "block";
}

function close_form() {
    document.getElementById("user_entry").style.display = "none";
}

function pairs(object) {
  var array = [];
  var i = 0;

  if( typeof object !== 'object' )
    throw new TypeError("Is not an object!");

  for (var key in object){
    array[i] = [ key, object[key] ];
    i++;
  }
  return array;
}

function form_query(obj) {
  var array = pairs(obj);
  var query = array.map(x => handler(x)).join("&");
  return query;
}

function handler(pair){
  var query;

  if( Array.isArray(pair[1]) ) {
    query = pair[1].map(
      x => encodeURIComponent(pair[0]) + "=" + encodeURIComponent(x)
    ).join("&");

  } else if ( typeof pair[1] === 'object') {
    throw new TypeError("It is not sensible to assign values to names, if the parent object has the same name");

  } else if ( pair[1] === null || pair[1] === undefined ) {

  } else if ( pair[1] === false ) {

  } else if ( pair[1] === NaN ) {

  } else {
    query = encodeURIComponent(pair[0]) + "=" + encodeURIComponent(pair[1]);
  }
  return query;
}


