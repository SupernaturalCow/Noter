// Window loading event.
window.onload = function() {

    // Load text.
    TEXTBOX = document.getElementById('textbox');
    load();

    // On keyup, save textContent to localStorage.
    with (TEXTBOX) {
        addEventListener( 'keyup', function() {
            save();
        });
    } 
}

// Check the browser supports web storage.
function check_web_storage_support() {
    if(typeof(Storage) !== "undefined") {
        return(true);
    }
    else {
        alert("Web storage unsupported!");
        return(false);
    }
}

// Save the current text field as a note.
function save() {
    if(check_web_storage_support() == true) {
        with (TEXTBOX) {
            if (innerHTML != '') {
                localStorage.setItem("note", innerHTML);  // Save as markdown only.
            }
        }
    }
}

// Load the saved note.
function load() {
    TEXTBOX.innerHTML = localStorage.getItem("note");
}

// Clear the current text field.
function clear() {
    TEXTBOX.innerHTML = "";
}

// Load data from file.
function load_data() {
    // Object promise.
    fetch("data/notes.txt") 
        // Object response.
       .then(function(response) {
            return response.text();
       })
       // Object value.
       .then(function(text) {
            TEXTBOX.innerHTML = text;
       });

    var _result = TEXTBOX.innerHTML;
    console.log("loaded note: "+_result);
}

// Convert text to HTML formatting.
function convert_html() {
    with (TEXTBOX) {
        var _converter = new showdown.Converter();
        innerHTML = _converter.makeHtml(innerHTML);
        console.log("Converted to HTML: \n"+innerHTML);
    }
}

// Convert text to Markdown formatting.
function convert_markdown() {
    with (TEXTBOX) {
        var _converter = new showdown.Converter();
        innerHTML = _converter.makeMarkdown(innerHTML);
        console.log("Converted to MD: \n"+innerHTML);
    }
}

// Log HTML to console.
function log_html() {
    console.log(TEXTBOX.innerHTML);
}

// Clear HTML.
function clear_html() {
    //innerHTML = textContent; // This doesn't include new lines.
    // Alternative:
    with (TEXTBOX) {
        innerHTML = innerHTML.replace(/<br>/g, "__NEWLINE__");
        innerHTML = innerHTML.replace(/<\/div>/g, "__NEWLINE__");
        innerHTML = innerHTML.replace(/\n/g, "");
        innerHTML = innerHTML.replace(/<\/?[^>]+(>|$)/g, "");
        innerHTML = innerHTML.replace(/__NEWLINE__/g, "<br /> ");
    }
    console.log("Cleared HTML: \n"+TEXTBOX.innerHTML);
}

//*/


