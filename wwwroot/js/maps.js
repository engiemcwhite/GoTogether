
// you can specify the default lat long
var mapDiv,mapOptions,map;
var breadcrumbs = new google.maps.MVCArray();
var polylineOptions,polyline;
var currentPath, trailrunner;
var markdict = {};


$(document).ready(function() {
        initLocationProcedure();
});

const connection = new signalR.HubConnection(
    "/chathub", { logger: signalR.LogLevel.Information });

// connection.ready("ReceiveCoordinates", (lat,lon) => {

// });
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
    var point = new google.maps.LatLng(lat,lon);
   // mark.setPosition(point);
})
connection.start().catch(err => console.error);


function initLocationProcedure() {
        console.log("initLocationProcedure()");
        initializeMap();
        //initializePolyline();
        if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(displayAndWatch, locError);
        } else {
                // tell the user if a browser doesn't support this amazing API
                alert("Your browser does not support the Geolocation API!");
        }
}

function initializeMap() {
    console.log("initializeMap()");
    mapDiv = document.getElementById("map_canvas");
    mapOptions = {
        zoom: 18,
        center: new google.maps.LatLng(47.609787, -122.1966572),
        mapTypeId: 'satellite'
        //mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(mapDiv,mapOptions);
    trailrunner = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(47.609787, -122.1966572),
        title: "Hello World!"
    });
}

// function initializePolyline() {
//     console.log("initializePolyline()");
//     polylineOptions = {
//         path: breadcrumbs,
//         strokeColor: "#AAFFAA",
//         strokeweight: 3
//     };
//     polyline = new google.maps.Polyline(polylineOptions);
//     polyline.setMap(map);
// }

function locError(error) {
    // tell the user if the current position could not be located
    alert("The current position could not be found!");
}

function displayAndWatch(position) {
    // set current position
    setCurrentPosition(position);
    // watch position
    watchCurrentPosition();
}

function setCurrentPosition(position) {
    console.log("setCurrentPosition()");
    var point = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
    // currentPath = polyline.getPath();
    trailrunner.setPosition(point);
    map.panTo(point);
    // currentPath.push(point);
    //console.log(currentPath);
}

function watchCurrentPosition() {
    console.log("watchCurrentPosition");
    var positionTimer = navigator.geolocation.watchPosition(setCurrentPosition);
}
