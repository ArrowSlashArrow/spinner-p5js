let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

const TO_RADIANS = Math.PI / 180;

let total_time = 60.0;

let start_time = new Date();

let settings = {
    "line_count": Math.max(50.0, (total_time / 24.0)),
    "size": HEIGHT * 3/8
}

let font;
function preload() {
    font = loadFont("C:/Users/anton/Desktop/webdev/timer_bg/assets/JetBrainsMono-Italic.ttf")
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

    textSize(40);
    textFont(font);

}

function draw() {
    background(0);
    var elapsed_time = (new Date - start_time + 100000) / 1000.0;
    var angle = elapsed_time * TO_RADIANS;

    
    for (let i = 0; i < settings["line_count"]; i++) {
        for (let j = 0; j < 3; j++) {
            strokeWeight(j + 1);
            let scale = (j * 2 / 3 + 1);
            let x_start = scale * settings["size"] * Math.sin(angle * i) + WIDTH / 2.0;
            let y_start = scale * settings["size"] * Math.cos(angle * i) + HEIGHT / 2.0;
            let x_end = scale * settings["size"] * Math.sin(angle * (i + 1)) + WIDTH / 2.0;
            let y_end = scale * settings["size"] * Math.cos(angle * (i + 1)) + HEIGHT / 2.0;
            
            line(x_start, y_start, x_end, y_end);
        }
        
    }


    strokeWeight(4);
    fill(255);
    stroke(0);
    let current_time = new Date();
    let time_str = current_time.toLocaleDateString() + "\n" + current_time.toLocaleTimeString();
    text(time_str, WIDTH / 2, HEIGHT / 2)
    textAlign(CENTER, CENTER);
    stroke(255, 85);
}

function windowResize() {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
}