// The following sample code uses modern ECMAScript 6 features 
// that aren't supported in Internet Explorer 11.
// To convert the sample for environments that do not support ECMAScript 6, 
// such as Internet Explorer 11, use a transpiler such as 
// Babel at http://babeljs.io/. 
//
// See Es5-chat.js for a Babel transpiled version of the following code:

// $(document).ready(function(e) {

    const connection = new signalR.HubConnection(
        "/chathub", { logger: signalR.LogLevel.Information });
    
    connection.on("ReceiveMessage", (user, message) => { 
    const encodedMsg = user + ": " + message;
    const li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").prepend(li);
    });

    document.getElementById("sendButton").addEventListener("click", event => {
    event.preventDefault();
    const user = document.getElementById("userInput").value;
    const message = document.getElementById("messageInput").value;
    if( user.length == 0 || message.length == 0 )
    {
        return;
    }
    connection.invoke("SendMessage", user, message).catch(err => console.error);
    $("#messageInput").val("");
    });

    connection.on("ReceiveCoordinates",(lat,lon)=>{
        
    })
    connection.start().catch(err => console.error);

// });