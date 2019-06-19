
var _raw_text;

// Load saved text on startup.
window.onload = function() {
    load();
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
        var textbox = document.getElementById("textbox");
        if(textbox.innerHTML != '') {
            localStorage.setItem("note", textbox._raw_text);  // Save raw markdown only.
        }
    }
}

// Load the saved note.
function load() {
    if(check_web_storage_support() == true) {
        result = localStorage.getItem('note');
    }
    if(result === null) {
        result = "No note saved";
    }
    with (document.getElementById('textbox')) {
        _raw_text = result;  // This is used to keep track of our markdown.
    	innerHTML = result;
	}
}

// Clear the current text field.
function clear() {
    document.getElementById('textbox').innerHTML = "";
}

// Load data from file.
function load_data() {
	fetch("data/notes.txt")  // Object promise.
	.then( response => response.text() )  // Object response.
	.then( data => document.getElementById('textbox').innerHTML = data);  // Object value.
}

// Apply formatting.
function apply_formatting() {
	with (document.getElementById('textbox')) {
        console.log(innerHTML);
        _raw_text = innerHTML;  // Remember this, before we fiddle with it.
        clear_formatting();  // Clear any previous formatting, bar newlines.
		innerHTML = marked(innerHTML);
        console.log(innerHTML);
	}
}

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

// Return text cache
function reset_text_to_markdown() {
    with (document.getElementById('textbox')) {
        innerHTML = _raw_text;
        console.log(_raw_text);
    }
}

//*/