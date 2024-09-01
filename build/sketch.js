// global WIDTH and HEIGHT vars
let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

// constant to convert degrees to radians
const TO_RADIANS = Math.PI / 180;

// cycle time default = 10 minutes
let total_time = 600;

// time since webpage load
let start_time = new Date();

// settings for drawing spinner
let settings = {
    "line_count": Math.max(50.0, (total_time / 24.0)),
    "size": HEIGHT * 3/8
}

let font;
function preload() {
    // get font
    font = loadFont('assets/JetBrainsMono-Italic.ttf') 
}

function setup() {
    // initialize canvas
    createCanvas(WIDTH, HEIGHT);
    background(0);

    // get total_time from 't' param in url
    let url_params = new URLSearchParams(window.location.search);
    let time_param = url_params.get('t');
    total_time = Number(time_param);

    // handles non-positives and 0 
    if (total_time <= 0) {
        // resets total_time to 10 minute default
        total_time = 600;
    }

    // update line_count setting
    settings["line_count"] = Math.max(50.0, (total_time / 12.0));


    // load font
    textSize(40);
    textFont(font);

}

function draw() {
    // set backgroudn to black
    background(0);

    // get relative time to start and convert it to an angle measurement
    var elapsed_time = 360.0 * (new Date - start_time) / 1000.0 / total_time;
    var angle = elapsed_time * TO_RADIANS;

    // adjust drawing settings for line
    stroke(255, 85);
    strokeWeight(1);
    
    for (let i = 0; i < settings["line_count"]; i++) { 
        // get all line position arguments
        let x_start = settings["size"] * Math.sin(angle * i) + WIDTH / 2.0;
        let y_start = settings["size"] * Math.cos(angle * i) + HEIGHT / 2.0;
        let x_end = settings["size"] * Math.sin(angle * (i + 1)) + WIDTH / 2.0;
        let y_end = settings["size"] * Math.cos(angle * (i + 1)) + HEIGHT / 2.0;
        
        line(x_start, y_start, x_end, y_end);
    }

    // adjust drawing settings for text
    textAlign(CENTER, CENTER);
    strokeWeight(4);
    fill(255);
    stroke(0);

    // get current time and convert it to a string
    let current_time = new Date();
    let time_str = current_time.toLocaleDateString() + "\n" + current_time.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false});
    
    // render the text at the centre of the screen
    text(time_str, WIDTH / 2, HEIGHT / 2)
    
}

// vars WIDTH and HEIGHT are updated upon window resize
function windowResized() {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    resizeCanvas(WIDTH, WIDTH);
}