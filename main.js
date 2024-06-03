song = "";

leftWristX = 0;
leftWristY = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;
scoreRightWrist = 0;

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on ('pose',  gotPoses);
}

function draw() {
image(video, 0 ,3,600,500);

fill("#bf1b1b");
stroke("#bf1b1b");

if (scoreRightWrist > 0.2){

circle(rightWristX, rightWristY, 51 );

if(rightWristY > 0 && rightWristY <= 100)
{
song.rate(0.5);
document.getElementById("speed-text").innerHTML = "speed equals 0.5x Grandpa";
}

else if(rightWristY > 100 && rightWristY <= 200)
{
song.rate(1);
document.getElementById("speed-text").innerHTML = "speed equals 1x Grandpa";
}

else if(rightWristY > 200 && rightWristY <= 300)
{
song.rate(1.5);
document.getElementById("speed-text").innerHTML = "speed equals 1.5x Grandpa";
}

else if(rightWristY > 300 && rightWristY <= 400)
{
song.rate(2);
document.getElementById("speed-text").innerHTML = "speed equals 2x Grandpa";
}


else if(rightWristY > 400 && rightWristY <= 500)
{
song.rate(2.5);
document.getElementById("speed-text").innerHTML = "speed equals 2.5x Grandpa";
}
};





if(scoreLeftWrist > 0.2 )
{
circle(leftWristX,leftWristY,50);
numberleftwristY = Number(leftWristY);
remove_deciamals = floor(numberleftwristY);
volume = remove_deciamals/500;
document.getElementById("volume").innerHTML = "volume =" + volume;
song.setVolume(volume);
}
}



function preload() 
{
    song = loadSound("music.mp3");
}

function play () 
{
    song.play();
    song.rate(1);
    song.setVolume(1);
}

function modelLoaded() {
    console.log("assimalation is completing");
}

function gotPoses(results)
{
if (results.length > 0 ){
    console.log(results);
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("LWscore =" + scoreLeftWrist );



    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;

    console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY );

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.Y;

    console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY );






    scoreRightWrist = results[0].pose.keypoints[10].score;
    console.log("RWscore  =" + scoreRightWrist );

}
}