// Window loading event.
window.onload = function() {

    // Load text.
    HTML = document.getElementById('html');
    MARKDOWN = document.getElementById('markdown');
    TEXT_MODE = MARKDOWN;
    load_text();
    convert_html();
    console.clear();
    log_text();
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
function save_text() {
    if(check_web_storage_support() == true) {
        with (TEXT_MODE) {
            if (innerHTML != '') {
                localStorage.setItem("note", innerHTML);  // Save as markdown only.
            }
        }
    }
}

// Load the saved note.
function load_text() {
    var _result = localStorage.getItem("note");
    if (_result == null) _result = "# Welcome to Noter.\n_Try clicking __'View as Markdown'.___";
    TEXT_MODE.innerHTML = _result;
}

// Load data from file.
function load_data() {
    // Object promise.
    fetch("README.md") 
        // Object response.
       .then(function(response) {
            return response.text();
       })
       // Object value.
       .then(function(text) {
            convert_markdown();  // Load text from file in Markdown.
            TEXT_MODE.innerHTML = text;
       });
}

// Apply colour to the active TEXT_MODE button.
function apply_active_style() {
    switch (TEXT_MODE) {
        case MARKDOWN:
            document.getElementById('btn_html').style.color = "";
            document.getElementById('btn_html').style.backgroundColor = "";
            document.getElementById('btn_markdown').style.color = "#d8deec";
            document.getElementById('btn_markdown').style.backgroundColor = "#ff9955";
            break;

        case HTML:
            document.getElementById('btn_markdown').style.color = "";
            document.getElementById('btn_markdown').style.backgroundColor = "";
            document.getElementById('btn_html').style.color = "#d8deec";
            document.getElementById('btn_html').style.backgroundColor = "#ff9955";
            break;
    }
}

// Convert text to HTML formatting.
function convert_html() {
    if (TEXT_MODE == HTML) return;
    var _converter = new showdown.Converter();
    HTML.innerHTML = _converter.makeHtml(MARKDOWN.innerHTML);
    MARKDOWN.innerHTML = "";
    TEXT_MODE = HTML;
    apply_active_style();
    log_text();
}

// Convert text to Markdown formatting.
function convert_markdown() {
    if (TEXT_MODE == MARKDOWN) return;
    var _converter = new showdown.Converter();
    MARKDOWN.innerHTML = _converter.makeMarkdown(HTML.innerHTML);
    HTML.innerHTML = "";
    TEXT_MODE = MARKDOWN;
    apply_active_style();
    log_text();
}

// Log text to console.
function log_text() {
    var _str;
    switch (TEXT_MODE) {
        case MARKDOWN:
            _str = "Markdown: \n";
            break;
        case HTML:
            _str = "HTML: \n";
            break;
    }
    console.log(_str+TEXT_MODE.innerHTML);
}

//*/


