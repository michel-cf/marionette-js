document.addEventListener("DOMContentLoaded", function () {
    const live = function (eventType, selector, handler) {
        document.addEventListener(eventType, e => {
            if (e.target.closest(selector)) {
                handler(e);
            }
        });
    }

    if (typeof (history.pushState) !== 'undefined') {

        // history is supported; do magical things

        // hijack the nav click event
        live('click', 'a.internal', function (e) {
            const _href = e.target.getAttribute("href");

            // change the url without a page refresh and add a history entry.
            history.pushState(null, null, _href);

            // load the content
            loadContent(_href); // fear not! we're going to build this function in the next code block

            e.preventDefault();
        });

        live('submit', 'form.internal', function (e) {
            const url = e.target.getAttribute('action') || window.location.href;

            loadFormContent(url, form.serialize());

            e.preventDefault();
        });
    }

    window.addEventListener('popstate', (event) => {
        const link = location.pathname.replace(/^.*[\/]/, ""); // get filename only
        loadContent(link);
    });


    function loadContent(href) {
        // TODO fade out

        fetch(href).then(response => {
            return response.text();
        }).then(data => updateWindow(data)
        ).catch(error => {
            console.log(error)
        });
    }

    function loadFormContent(href, data) {
        console.log("LoadFormcontent");
        // TODO fade out

        fetch(href, {
            method: 'POST',
            body: data
        }).then(response => {
            return response.text();
        }).then(data => updateWindow(data)
        ).catch(error => {
            console.log(error)
        });
    }

    function updateWindow(response) {
        const domData = new DOMParser().parseFromString(response, "text/html");
        domData.querySelectorAll('[data-mjs-content]').forEach(content => {
            console.log(content);
            const targetName = content.getAttribute('data-mjs-content');
            console.log(targetName);
            const target = document.querySelector('[data-mjs-target="' + targetName + '"]');
            target.replaceChildren(content);
        });
    }

});
