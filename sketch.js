let canvas;
let video;
let poseNet;
let poses = [];
let sucess;
let songOne, songTwo, songThree, songFour, songFive, songsix, songSeven, songEight;
let soundNames = ['l','u','l','l','a', 'b','y','e']
let img;

function preload(){
  songOne = loadSound('https://res.cloudinary.com/de3c6e2g5/video/upload/v1597614375/illus_sel01_normA_p4rgdg.wav');
  songTwo = loadSound('https://res.cloudinary.com/de3c6e2g5/video/upload/v1597614375/illus_sel01_normB_fva9kl.wav');
  songThree = loadSound('https://res.cloudinary.com/de3c6e2g5/video/upload/v1597614375/illus_sel01_normC_r8krxq.wav');
  songFour = loadSound('https://res.cloudinary.com/de3c6e2g5/video/upload/v1597614375/illus_sel01_normD_jq1wr7.wav');
  songFive = loadSound('https://res.cloudinary.com/de3c6e2g5/video/upload/v1597825732/illus_sel01_normAreverse_blphyd.wav');
  songSix = loadSound('https://res.cloudinary.com/de3c6e2g5/video/upload/v1597825734/illus_sel01_normBreverse_udqpgc.wav');
  songSeven = loadSound('https://res.cloudinary.com/de3c6e2g5/video/upload/v1597825732/illus_sel01_normCreverse_sciqcy.wav');
  songEight = loadSound('https://res.cloudinary.com/de3c6e2g5/video/upload/v1597825735/illus_sel01_normDreverse_y7wac3.wav');

}

function setup() {
  
  //canvas = createCanvas(900, 600);
  canvas = createCanvas(960, 720);
  canvas.position((windowWidth - width)/2, 50);


  //Capture the video and hide it.
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  img = loadImage('redGrunge.png');

  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', function (results) {
    poses = results;
 });

/*

 delay = new p5.Delay();
 delay.process(songOne, 0.23, 0.7, 3700);
 delay.setType('pingPong'); // a stereo effect


 reverb = new p5.Reverb();
 reverb.process(songTwo, 13, 0.3);
 reverb.amp(5); // turn it up!

 */
}

function modelReady() {
  success = createP('Allow camera access, raise your right hand to the level of your webcam, and then sway your hand back and forth to begin playing!');
  success.class('success');
}

function draw() {
      
      //Push the hidden video onto the canvas
			push();
			translate(video.width , 0);
			scale(-1, 1);
      image(video, 0, 0, width, height);
			pop();

      image(img, 0, 0);
      // Function to draw multiple rectangles onto the screen
      drawRect();
      // Function to draw the ellipse and trigger samples
      wristPlayer();
      //Function to draw text onto the rectangles
      writeText();

}

/*

function emptyState(){
  background(245,245,245)
  fill(25);
  textAlign(CENTER);
  textSize(16);
  text('' , width/2, height/2);
}
*/

function drawRect() {
    for(let k = 0; k < width; k = k + width/8){
       let colB = map(k, 0, width, 0, 255);
       let colR = map(k, 0, width, 0, 100);
       let colG = map(k, 0, width, 0, 255);
       
       noStroke();
       fill(colR, colG, colB, 127);
       rect(k, 0, width/8, height);
  }
}

function writeText(){
  fill(255, 150);
  textAlign(CENTER);
  textSize(20);
  text(soundNames[0] , width/16, height/2);
  text(soundNames[1] , 3*width/16, height/2);
  text(soundNames[2] , 5*width/16, height/2);
  text(soundNames[3] , 7*width/16, height/2);
  text(soundNames[4] , 9*width/16, height/2);
  text(soundNames[5] , 11*width/16, height/2);
  text(soundNames[6] , 13*width/16, height/2);
  text(soundNames[7] , 15*width/16, height/2);
}

function wristPlayer()  {

  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
      // For each pose detected, loop through all the keypoints
      let pose = poses[i].pose;
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
			
			let rightWrist = pose.keypoints[10];

      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (rightWrist.score > 0.2) {
        //Draw an ellipse at the nose
        fill(127, 0, 127, 77);
        noStroke();
        ellipse(width - rightWrist.position.x, rightWrist.position.y, 30, 30);
		

        //The conditions for the different sounds to load.
        if (rightWrist.position.x < width/8  &&  !songOne.isPlaying()) {
				//	songTwo.pause();
				//	songThree.pause();
				//	songFour.pause();
          songOne.play();
         // songFive.pause();
         // songSix.pause();
         // songSeven.pause();
         // songEight.pause();
        } else if(rightWrist.position.x >= width/8  &&  rightWrist.position.x < 2*width/8 && !songTwo.isPlaying()) {
         // songOne.pause();
         // songTwo.pause();
				//	songThree.pause();
          songTwo.play();
          //songFive.pause();
          //songSix.pause();
         // songSeven.pause();
         // songEight.pause();
        } else if(rightWrist.position.x >= 2*width/8  &&  rightWrist.position.x < 3*width/8 && !songThree.isPlaying() ){
         // songOne.pause();
			   // songTwo.pause();
         // songFour.pause();
          songThree.play();
         // songFive.pause();
         // songSix.pause();
         // songSeven.pause();
         // songEight.pause();
        } else if(rightWrist.position.x >= 3*width/8  &&  rightWrist.position.x < 4*width/8 && !songFour.isPlaying() ){
				 // songOne.pause();
          //songTwo.pause();
         // songThree.pause();
          songFour.play();
          //songFive.pause();
         // songSix.pause();
         // songSeven.pause();
         // songEight.pause();
        } else if(rightWrist.position.x >= 4*width/8  &&  rightWrist.position.x < 5*width/8 && !songFive.isPlaying() ){
				 // songOne.pause();
         // songTwo.pause();
         // songThree.pause();
         // songFour.pause();
          songFive.play();
         // songSix.pause();
         //songSeven.pause();
         // songEight.pause();
        } else if(rightWrist.position.x >= 5*width/8  &&  rightWrist.position.x < 6*width/8 && !songSix.isPlaying() ){
				 // songOne.pause();
        //  songTwo.pause();
         // songThree.pause();
        //  songFour.pause();
        //  songFive.pause();
          songSix.play();
         // songSeven.pause();
         // songEight.pause();
        } else if(rightWrist.position.x >= 6*width/8  &&  rightWrist.position.x < 7*width/8 && !songSeven.isPlaying() ){
				 // songOne.pause();
        //  songTwo.pause();
        //  songThree.pause();
        //  songFour.pause();
        //  songFive.pause();
        // songSix.pause();
          songSeven.play();
         // songEight.pause();
        }
        else if(rightWrist.position.x >= 7*width/8  &&  rightWrist.position.x < width && !songEight.isPlaying() ){
				 // songOne.pause();
         // songTwo.pause();
        //  songThree.pause();
         // songFour.pause();
         // songFive.pause();
         // songSix.pause();
        //  songSeven.pause();
          songEight.play();
        }
        else{
          /*
          songOne.pause();
          songTwo.pause();
          songThree.pause();
          songFour.pause();
          songFive.pause();
          songSix.pause();
          songSeven.pause();
          songEight.pause();
         */

        }
    }
  }
}
