songs = [];
song_count = 0;
song = "";
leftWristY= 0;
rightWristY= 0;


function preload() {
    //song=loadSound("No_Roots.mp3");
    songs[0] = loadSound("diamond_heart.mp3");
    songs[1] = loadSound("egirl_life.mp3");
    songs[2]= loadSound("No_Roots.mp3");
    songs[3]= loadSound("foryou_tostay.mp3");
    songs[4]= loadSound("Spectre.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
        canvas.center();
        video = createCapture(VIDEO);
        video.hide();
        poseNet= ml5.poseNet(video,modelLoaded);
        poseNet.on('pose',gotResults);
}

function draw() {
    image(video, 0, 0, 600, 500);
}
function play() {
    songs[song_count].play();
    songs[song_count].setVolume(2);
    songs[song_count].rate(0.5);
    //song.play();
}

function changeSong() {
    songs[song_count].stop();
    song_count += 1;
    if (song_count > 4) {
        song_count = 0;
    }
    songs[song_count].play();
    songs[song_count].setVolume(2);
    songs[song_count].rate(2);
}

function Stop() {
    songs[song_count].stop();
}

function modelLoaded(){
    console.log("model loaded :D");
}

function gotResults(results){
    if(results.length>0){
        console.log(results);
        leftWristY= results[0].pose.leftWrist.y;
        rightWristY= results[0].pose.rightWrist.y;
    }
}