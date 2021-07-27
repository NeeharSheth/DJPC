songs = [];
song_count = 0;
leftWristY = 0;
leftWristX = 0;
rightWristY = 0;
rightWristX = 0;
leftWristScore= 0;
rightWristScore= 0;
volume_change= false;
speed_change= false;

function preload() {
    songs[0] = loadSound("diamond_heart.mp3");
    songs[1] = loadSound("egirl_life.mp3");
    songs[2] = loadSound("No_Roots.mp3");
    songs[3] = loadSound("foryou_tostay.mp3");
    songs[4] = loadSound("Spectre.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotResults);
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#753422");
    stroke("#753422");
    if(volume_change == true){
    if (leftWristScore > 0.2) {
        circle(leftWristX - 20, leftWristY, 20);
        leftWristY = Number(leftWristY);
        volume = floor(leftWristY) / 500;
        console.log(volume);
        document.getElementById("volume_h3").innerHTML = "Volume is " + volume;
        songs[song_count].setVolume(volume);
    }}
    if(speed_change == true){
    if (rightWristScore > 0.2){
    if(rightWristY>=0 && rightWristY<100){
        speed= 0.5;
        document.getElementById("speed_h3").innerHTML = "Speed is " + speed;
        songs[song_count].rate(speed);
    }
    else{
        rightWristY = Number(rightWristY);
        speed = floor(rightWristY) / 200;
        console.log(speed);
        document.getElementById("speed_h3").innerHTML = "Speed is " + speed;
        songs[song_count].rate(speed);
    }
    circle(rightWristX, rightWristY, 20);
}}}

function play() {
    songs[song_count].play();
    songs[song_count].setVolume(1);
    songs[song_count].rate(1);
}

function changeSong() {
    songs[song_count].stop();
    song_count += 1;
    if (song_count > 4) {
        song_count = 0;
    }
    songs[song_count].play();
    songs[song_count].setVolume(1);
    songs[song_count].rate(1);
}

function Stop() {
    songs[song_count].stop();
}

function modelLoaded() {
    console.log("model loaded :D");
}

function gotResults(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristScore = results[0].pose.keypoints[9].score;
        rightWristScore = results[0].pose.keypoints[10].score;
        leftWristY = results[0].pose.leftWrist.y;
        leftWristX = results[0].pose.leftWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
    }
}

function changeRate(){
    if(speed_change == false){
        speed_change= true;
    }
        else{
            speed_change= false;
            songs[song_count].rate(1);
        }
}

function changeVolume(){
    if(volume_change == false){
    volume_change= true;}
    else{
        volume_change= false;
        songs[song_count].setVolume(1);
    }
}