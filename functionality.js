
var _text_content;

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

// Load the saved note.
function load() {
    if(check_web_storage_support() == true) {
        result = localStorage.getItem('note');
    }
    if(result === null) {
        result = "No note saved";
    }
    with (document.getElementById('textbox')) {
    	textContent = result;
    	_text_content = textContent;
	}
}

// Save the current text field as a note.
function save() {
    if(check_web_storage_support() == true) {
        var textbox = document.getElementById("textbox");
        if(textbox.textContent != '') {
            localStorage.setItem("note", textbox.textContent);
        }
        else {
            alert("Nothing to save");
        }
    }
}

// Clear the current text field.
function clear() {
    document.getElementById('textbox').textContent = "";
}

// Load data from file.
function load_data() {
	fetch("data/notes.txt")  // Object promise.
	.then( response => response.text() )  // Object response.
	.then( data => document.getElementById('textbox').textContent = data);
}

// Apply formatting.
function apply_formatting() {
	with (document.getElementById('textbox')) {
		_text_content = textContent;
		innerHTML = marked(_text_content);
	}
}

// Clear formatting.
function clear_formatting() {
	with (document.getElementById('textbox')) {
		innerHTML = _text_content;
	}
}

//*/