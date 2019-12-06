let endpoint = "https://api.myjson.com/bins/18ce70";

fetch(endpoint)
  .then(response => {
    return response.json();
  })
  .then(payload => {

    /******************************************************************************
     * Date -- this was hard to get!  Saving this link for posterity
     * https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
     * sets the date in placeholder_date div on index.html
     ******************************************************************************/
    var options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    let dateNum = new Date(payload.data.messages[0].timestamp);
    let omgDate = dateNum.toLocaleDateString("en-US", options);
    document.getElementById("placeholder_date").innerHTML = omgDate;

    let messageIDName = "";
    let usernameID = "";
    let messageContainerName = "";
    let avatarName = "";

    let output = "";

    payload.data.messages.forEach(elem => {
      const {
        username,
        image,
        message,
        focused,
        timestamp
      } = elem;

      /***************************************************
       * Get time for each message
       ***************************************************/
      let date1 = new Date(timestamp);
      let myTime = date1.toLocaleTimeString('en-US');

      // this feels gross hardcoding this but it is late and I have work soon
      if (username === "Mygel van Trabel") {
        messageIDName = "messageText-girl";
        usernameID = "username-girl";
        messageContainerName = "messageContainer-girl";
        avatarName = "avatar-girl";
      } else {
        messageIDName = "messageText-boy"
        usernameID = "username-boy";
        messageContainerName = "messageContainer-boy";
        avatarName = "avatar-boy";
      }

      // use a different background if focused is true
      if (focused) {
        messageIDName = "messageText-focused";
      }

      output += `
      
      <div id="${messageContainerName}">
        <div id="${avatarName}"><img src="${image}"></div>
        <div id=${messageIDName}>
          <div id="messageContent">
            ${message}
          </div>
          <div id="usernameTimeContainer">
            <div id="${usernameID}">${username}</div>
            <div id="time"><img src="dist/img/Clock_icon.png">${myTime}</div>
          </div>
        </div>
      </div>

      `;
    });

    document.getElementById("output").innerHTML = output;
  })
  .catch(err => {
    console.log(err);
  });