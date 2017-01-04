$(document).ready(function() {

    $("#hashtagError").hide();

    /**
     * Controls the "typing text" graphic
     *
     */
    $('#typingText').typeIt({
            speed: 100,
            breakLines: false,
            autoStart: false,
            loop: true
        }).tiType("what's on your mind?").tiPause(1000).tiDelete(20).tiPause(1000)
        .tiType("say it, don't spray it").tiPause(1000).tiDelete(22).tiPause(1000)
        .tiType("created by Brandon Assing").tiPause(1000).tiDelete(25).tiPause(1000)
        .tiType("hope Twitter doesn't sue").tiPause(1000).tiDelete(24);


    /**
     * Called after verification. Separates hashtag from text and posts tweet using angular
     * 
     */
    function post(text) {
        var key = "";
        var here = 0;
        while (text[here] != " " && here < text.length) {
            key += text[here];
            here++;
        }
        text = text.replace(key, "");
        angular.element($('#conId')).scope().postTweet(text, key);
        angular.element($('#conId')).scope().$apply();

    }

    /**
     * Called when submit button or enter key is pressed
     * 
     */
    function submited() {
        var text = $("#input-tweetField").val();

        //Text must be less than 200 characters
        if (text.length > 200) {
            window.alert("Over 200");
        }

        //Must start with a hashtag
        else if (text[0] != "#" || text.length == 0) {
            $("#hashtagError").show();
            $("#input-tweetField").addClass("red accent-3");
            $("#input-tweetField").fadeOut("fast", function() {
                $(this).removeClass("red accent-1").fadeIn("fast", function() {
                    $(this).css({
                        opacity: 1.0
                    })
                });
            });
        }

        //Calls post()
        else {
            post(text);
            $("#input-tweetField").val("");
            $("#hashtagError").hide();
        }

        //Resets character counter
        $("#charCount").html((200 - $("#input-tweetField").val().length).toString() + " characters left");
        $("#input-tweetField").focus();
    }

    /**
     * Called when button is pressed
     *
     */
    $("#but-submit").click(function() {
        submited();
    });

    /**
     * Called when key is pressed
     *
     */
    $("#input-tweetField").keypress(function(event) {
        //If enter key is pressed...
        if (event.which == 13 || event.keyCode == 13) {
            submited();
            return event.keyCode != 13;
        }
    });

    //Updates character count
    $("#input-tweetField").on('input', function(event) {
        $("#charCount").html((200 - $("#input-tweetField").val().length).toString() + " characters left")
    });
});
