// Write your JavaScript code.
$(document).ready(function() {
    $("#sendButton").click(function() {
        if($("#userInput").val().length > 0)
        {
            $("#userInput").attr("disabled","true");
        }
    })
})