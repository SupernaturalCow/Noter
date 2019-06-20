
// Window loading event.
window.onload = function() {

    // Load text.
    load();

    // On keyup, save textContent to localStorage.
    with (document.getElementById('textbox')) {
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
        with (document.getElementById("textbox")) {
            if (innerHTML != '') {
                localStorage.setItem("note", innerHTML);  // Save as markdown only.
            }
        }
    }
}

// Load the saved note.
function load() {
    document.getElementById('textbox').innerHTML = localStorage.getItem("note");
}

// Clear the current text field.
function clear() {
    document.getElementById('textbox').innerHTML = "";
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
            document.getElementById('textbox').innerHTML = text;
       });

    var _result = document.getElementById('textbox').innerHTML;
    console.log("loaded note: "+_result);
}

// Convert text to HTML formatting.
function convert_html() {
	with (document.getElementById('textbox')) {
        var _converter = new showdown.Converter(),
		innerHTML = _converter.makeHtml(innerHTML);
        console.log("converted to HTML: "+innerHTML);
	}
}

// Convert text to Markdown formatting.
function convert_markdown() {
    with (document.getElementById('textbox')) {
        var _converter = new showdown.Converter(),
            _html_text = _converter.makeMarkdown(innerHTML);
        innerHTML = _html_text;
        console.log("converted to MD: "+innerHTML);
    }
}

/*

// Clear formatting.
function clear_formatting() {
    with (document.getElementById('textbox')) {
        //innerHTML = textContent; // This can be better.
        innerHTML = innerHTML.replace(/<div>/g, "NNN");
        innerHTML = innerHTML.replace(/<br>/g, "NNN");
        innerHTML = innerHTML.replace(/\n/g, "NNN");
        innerHTML = innerHTML.replace(/<\/?[^>]+(>|$)/g, "");
        innerHTML = innerHTML.replace(/NNN/g, "\n");  // Eh, faster to do this.
    }
}

//*/


