let mobilenet;
let video;
let label='';
let prob='';
let classifier;
let button1;
let button2;
let button3;
let clicks1=0;
let clicks2=0;
let cost;

function modelready(){
	console.log("Model Ready");
}

function videoready(){
	console.log("Video Ready");
}

function whileTraining(loss){
	if(loss==null){
		console.log("Training Complete");
		classifier.classify(gotresults);
	}else{
		console.log(loss);
		cost=loss;
	}

}

function gotresults(error,result){
	if(error){
		console.error(error);
	}else{
		label=result;
    classifier.classify(gotresults);
	}
}


function setup() {
	can=createCanvas(440,300);
  video=createCapture(VIDEO);

	createElement('h4','Artificial Intelligence Game');
  createElement('h5','Train your own gestures !');


	video.hide();
	background(0);
	mobilenet=ml5.featureExtractor('MobileNet',modelready);
	classifier=mobilenet.classification(video,videoready);

	button1=createButton('Run');
	button1.class('waves-effect waves-light btn-large light-blue');
	button1.mousePressed(function(){
		classifier.addImage('Run');
		clicks1=clicks1+1;
		button1.html('Run (' + clicks1 + ')');
	});


	button2=createButton('Jump');
	button2.class('waves-effect waves-light btn-large light-blue');
	button2.mousePressed(function(){
		classifier.addImage('Jump');
		clicks2=clicks2+1;
		button2.html('Jump ('+clicks2+')');
	});

	button3=createButton('Train Model');
  button3.class('waves-effect waves-light btn-large red');
	button3.mousePressed(function(){
		classifier.train(whileTraining);
	});

	er=createElement("h5","Loss : ");

}




// GAME
/////////////////////
//DECLARE VARIABLES//
/////////////////////

//Canvas Variables
var c;
var ctx;

//Player Variables
var img_player;
var player_x;
var player_y;
var player_width;
var player_height;
var gravity;

//Fork Variables
var img_fork;
var fork_x;
var fork_y;
var fork_width;
var fork_height;
var fork_speed;
var can_spawn;
var fork_count;

//Game State Variables
var has_started = false;
var is_playing;
var score = 0;


////////////
//Run Game//
////////////

if (has_started == false) {
    Start();
}
var nextInterval = setInterval(Draw, 10);
var nextUpdate = setInterval(Update, 1);


/////////////////
//THE GAME LOOP//
/////////////////

//Run at the start of our game
function Start() {

  	///////////////////////
  	//Set Variable Values//
  	///////////////////////

  	//Canvas Values
    c = document.getElementById("screen");
    ctx = c.getContext("2d");
    c.width = 600;
    c.height = 320;
    offset_x = 32;
    offset_y = c.height - 128;

  	//Player Values
    img_player = new Image();
    img_player.src = "https://image.ibb.co/jUqkD5/dodo.png";
    player_x = offset_x;
    player_y = offset_y;
    player_width = 64;
    player_height = 64;
    gravity = 2;

  	//Fork Values
    img_fork = new Image();
    img_fork.src = "https://image.ibb.co/d2iu6Q/fork.png";
    can_spawn = true;
    fork_count = 0;

	//Game State Values
    has_started = true;
    is_playing = false;
  	//score = 0;
}

//Runs every frame
function Update() {
    Input();

    if (is_playing) {
        if (can_spawn == true) {
            SpawnFork();
        }

        if (fork_count > 0) {
            CollisionHandling();
        }
    }
}

//Draws the graphics
function Draw() {

  	//Background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#03a9f4";
    ctx.fillRect(0, c.height - 64, c.width, c.height);

  	//Player
    ctx.drawImage(img_player, player_x, player_y);

  	//Score
  	ctx.font = "24px VT323";
	ctx.fillText("Score: " + score,10, 30);


    if (is_playing) {
        if (fork_count > 0) {

          	//Move Fork
          	fork_x -= fork_speed;
          	//Draw Fork
            ctx.drawImage(img_fork, fork_x, fork_y);
        }

        if (player_y < offset_y) {
          //Gravity
          player_y += gravity;
        }

        if (fork_x < -64) {
          	//Respawn Fork
            can_spawn = true;
        }
      //Add Score
      score += 1;
    }
}

function draw(){
	translate(width,0);
  scale(-1.0,1.0);
  image(video, 0, 0, 440,300);
	fill(255);
	document.getElementById("demo").innerHTML =
	"Predicted : " + label;
	if (label == ''){
	}else if(label == 'Jump'){
		if (player_y == offset_y) {
			//Jump
			player_y -= 150;
		}
	}else{
		if (is_playing == false)
			{
				is_playing = true;
				score = 0;
			}
}

	er.html('Loss : '+cost);
}

//Handles the input keyboard
function Input() {
    window.onkeydown = function(e) {
        var keyCode = e.keycode ? e.keycode : e.which;

        switch (keyCode) {
            case 32:

            	if (is_playing == false)
                {
                  //Start the Game
                  is_playing = true;
									score = 0;
                }
            	else
                {
                if (player_y == offset_y) {
                  //Jump
                  player_y -= 150;
                }
                }
                break;
            default:
                break;
        }
    }
}

//Spawns forks
function SpawnFork() {
    fork_x = c.width;
    fork_y = offset_y;
    fork_width = 64;
    fork_height = 64;
    fork_speed = 3;
    fork_count += 1;
    if (fork_count > 0) {
        can_spawn = false;
    }
}

//Handles the collisions
function CollisionHandling() {
    if (player_x < fork_x && player_x + player_width > fork_x) {
        if (player_y + player_height > fork_y) {
          	//Restart the game
            Start();
        }
    }
}
