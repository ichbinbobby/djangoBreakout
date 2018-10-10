// document.getElementById("myForm").addEventListener("submit", submitEntry);

function submitEntry (score, event) {
    // open_form()
    event.preventDefault();
    var username = document.getElementById("username").value;
    // <script>alert("unicorn")</script>
    console.log(this);
    console.log("this: " + this.score);
    console.log("username: " + username);
    console.log("score: " + score);

    var result = {username, score}; // [object Object]
    console.log("result: " + result);
    console.log("r.username: " + result.username);
    console.log("r.score: " + result.score);

    close_form();

    send(result)
        .then(function(value){
            console.log("Request succesful: " + value);
        },
        function (reason) {
            console.log(reason.responseText + reason.status);
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
                var reason = {};
                reason.responseText = "Could not send Request: ";
                reason.status = this.status;
                reject(reason);
            }
        }
        XHR.send(text);
    });
}

function onGameOver(score) {
    open_form();
    document.getElementById("myForm").addEventListener( "submit", submitEntry.bind(null, score) );
}

function open_form(score) {
    document.getElementById("user_entry").style.display = "block";
}

function close_form() {
    document.getElementById("user_entry").style.display = "none";
}

function form_query(obj) {
  var array = pairs(obj);
  var query = array.map(x => convertToString(x)).join("&");

  return query;

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

  function convertToString([key, value]){
      var query;

      if( Array.isArray(value) ) {
        query = value.map(
          x => encodeURIComponent(key) + "=" + encodeURIComponent(x)
        ).join("&");

      } else if ( typeof value === 'object') {
        throw new TypeError("It is not sensible to assign values to names, if the parent object has the same name");

      } else if ( value === null || value === undefined ) {

      } else if ( value === NaN ) {

      } else {
        query = encodeURIComponent(key) + "=" + encodeURIComponent(value);
      }
      return query;
  }
}




