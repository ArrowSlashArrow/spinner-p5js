let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

const TO_RADIANS = Math.PI / 180;
const SCALE = 1;

let total_time = 600;

let start_time = new Date();

let settings = {
    "line_count": Math.max(50.0, (total_time / 24.0)),
    "size": HEIGHT * 3/8
}

let font;
function preload() {
    font = loadFont('assets/JetBrainsMono-Italic.ttf') 
}

function format_time(seconds) {
    var hours = ("00" + String(Math.round(seconds / 3600))).slice(-2);
    var minutes = ("00" + String(Math.round(seconds / 60))).slice(-2);
    var seconds = ("00" + String(seconds % 60)).slice(-2);
    var time_str = hours + ":" + minutes + ":" + seconds;
    return time_str.slice;
}


function setup() {
    createCanvas(WIDTH, HEIGHT);
    background(0);
    stroke(255, 85);

    let url_params = new URLSearchParams(window.location.search);
    
    if ("time" in url_params) {
        let time_param = url_params.get('time');
        total_time = Number(time_param);
        settings["line_count"] = Math.max(50.0, (total_time / 12.0));
    }
    
    textSize(40);
    textFont(font);

}

function draw() {
    background(0);
    var elapsed_time = 360.0 * (new Date - start_time) / 1000.0 / total_time;
    var angle = elapsed_time * TO_RADIANS;

    stroke(255, 85);
    strokeWeight(1);
    
    for (let i = 0; i < settings["line_count"]; i++) { 
        let x_start = SCALE * settings["size"] * Math.sin(angle * i) + WIDTH / 2.0;
        let y_start = SCALE * settings["size"] * Math.cos(angle * i) + HEIGHT / 2.0;
        let x_end = SCALE * settings["size"] * Math.sin(angle * (i + 1)) + WIDTH / 2.0;
        let y_end = SCALE * settings["size"] * Math.cos(angle * (i + 1)) + HEIGHT / 2.0;
        
        line(x_start, y_start, x_end, y_end);
    }

    textAlign(CENTER, CENTER);
    strokeWeight(4);
    fill(255);
    stroke(0);
    let current_time = new Date();
    let time_str = current_time.toLocaleDateString() + "\n" + current_time.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false});
    text(time_str, WIDTH / 2, HEIGHT / 2)
    
    stroke(255, 85);
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
}