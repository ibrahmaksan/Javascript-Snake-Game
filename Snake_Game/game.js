
var board = document.getElementById("myCanvas");
var scoreboard = document.querySelector(".scoreboard");
var c = board.getContext("2d");

var score = 0;
var box_size = 25;
var snake_x = 250;
var snake_y = 250;
var direction = "blank";

var snakeBody = [];

var columns = 500/box_size;

var foodX = Math.floor(Math.random()*columns)*25;
var foodY = Math.floor(Math.random()*columns)*25;

var velo_x = 0;
var velo_y = 0;

document.addEventListener("keyup",movement); // bu acilan sayfaya ekleme yapti. illa bir degiskene atamaya gerek yok.

setInterval(map_update,90); // interval = süre - aralık.


function gameOver(){

    if(snake_x == 500 || snake_y == 500 || snake_x <0 || snake_y < 0){

        let len = snakeBody.length;
        alert("Game over. Sinira carptiniz :<");

        for(let j = 0; j<len; j++){ // this loop turns the snake one length.
            snakeBody.pop();
        }
        snake_x = 250;
        snake_y = 250;
        velo_x = 0;
        velo_y = 0;
        score = 0;
        direction = "blank";
    }

    else{

        for(let y = 0; y<snakeBody.length; y++){

            if(snakeBody[y][0] == snake_x && snakeBody[y][1] == snake_y){
                alert("Kendinizi yediniz. :<");
                let len = snakeBody.length;
                for(let j = 0; j<len; j++){ // this loop turns the snake one length.
                    snakeBody.pop();
                }
                snake_x = 250;
                snake_y = 250;
                velo_x = 0;
                velo_y = 0;
                score = 0;
                direction = "blank";
            }
        }
    }

    
}


function control(){

    if(snake_x == foodX && snake_y == foodY){
        snakeBody.push([foodX,foodY]);  
        score++;
        return true;
    }

    else{
        return false;
    }
}

function foodSpawn(){

    foodX = Math.floor(Math.random()*columns)*25;
    foodY = Math.floor(Math.random()*columns)*25;

    c.fillStyle = "red";
    c.fillRect(foodX,foodY,box_size,box_size);
}


function movement(e){

    if(e.code == "ArrowUp"){ // code dan string döner.

        if(direction == "down"){
            return;
        }
        velo_x = 0;
        velo_y = -1;
        direction = "up";
    }

    else if(e.code == "ArrowDown"){
        if(direction == "up"){
            return;
        }
        velo_x = 0;
        velo_y = 1;
        direction = "down";
    }
    else if(e.code == "ArrowRight"){
        if(direction == "left"){
            return;
        }
        velo_x = 1;
        velo_y = 0;
        direction = "right";
    }

    else if(e.code == "ArrowLeft"){

        if(direction == "right"){
            return;
        }
        velo_x = -1;
        velo_y = 0;
        direction = "left";
    }
}




function map_update(){

    c.fillStyle = "lightgreen"; // bundan önce yapılan renklendirmelerin tamamının önüne geçer. Bu yüzden 
    // önce arka planı yerleştir.
    c.fillRect(0,0,500,500);

    scoreboard.innerHTML = "Score : " + score;

    if(control()){
        foodSpawn();
    }

    for(let j = snakeBody.length-1; j>0; j--){

        snakeBody[j][0] = snakeBody[j-1][0];
        snakeBody[j][1] = snakeBody[j-1][1];
    }

    if(snakeBody.length){
        snakeBody[0] = [snake_x,snake_y];
    }

    c.fillStyle = "green";
    snake_x = snake_x + velo_x*25;
    snake_y = snake_y + velo_y*25;
    c.fillRect(snake_x,snake_y,box_size,box_size);

    gameOver();

    c.fillStyle = "red";
    c.fillRect(foodX,foodY,box_size,box_size);
    
    for(let i = 0; i<snakeBody.length; i++){
        c.fillStyle = "green";
        c.fillRect(snakeBody[i][0],snakeBody[i][1],box_size,box_size);
    }
}


