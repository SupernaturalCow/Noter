
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
    document.getElementById('textbox').innerHTML = result;
}

// Save the current text field as a note.
function save() {
    if(check_web_storage_support() == true) {
        var textbox = document.getElementById("textbox");
        if(textbox.innerHTML != '') {
            localStorage.setItem("note", textbox.innerHTML);
        }
        else {
            alert("Nothing to save");
        }
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
	.then( data => document.getElementById('textbox').innerHTML = marked(data));
}
//*/