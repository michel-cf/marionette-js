$(function () {
    if (typeof (history.pushState) !== 'undefined') {

        // history is supported; do magical things

        // hijack the nav click event
        $("body").on("click", "a.internal", function (e) {
            var _href = $(this).attr("href");

            // change the url without a page refresh and add a history entry.
            history.pushState(null, null, _href);

            // load the content
            loadContent(_href); // fear not! we're going to build this function in the next code block

            e.preventDefault();
        });

        $("body").on("submit", "form.internal", function (e) {
            var form = $(this);
            var url = form.attr('action');

            if (url === undefined) {
                url = window.location.href;
            }

            loadFormContent(url, form.serialize());

            e.preventDefault();
        });
    }

    $(window).bind("popstate", function() {
        var link = location.pathname.replace(/^.*[\\/]/, ""); // get filename only
        loadContent(link);
    });


    // set up some variables
    var $mainContent = $("#content-wrapper");

    function loadContent(href) {
        $mainContent.fadeOut(200, function () { // fade out the content of the current page

            $.ajax({
                url: href,
                success: function(html) {
                    var content = $('<div />').html(html).find('#content');
                    $mainContent.html(content);
                    $mainContent.fadeIn(200);
                }
            });

        });

    }

    function loadFormContent(href, data) {
        console.log("LoadFormcontent");
        $mainContent.fadeOut(200, function () { // fade out the content of the current page

            $.ajax({
                type: "POST",
                url: href,
                data: data,
                success: function(html) {
                    var content = $('<div />').html(html).find('#content');
                    $mainContent.html(content);
                    $mainContent.fadeIn(200);
                }
            });

        });
    }

});
