/* 
This is the Main class. In this:
1. Will create objects for bullets,enemies and players.
2. calculating the health and score
3. calculating the collision where bullet and enemy hits.
*/

class Main{
  movement() {
    window.onload = function(){
      var c = document.querySelector("canvas");
      var canvas = document.querySelector("canvas");
      c.width = innerWidth;
      c.height = innerHeight;
      c = c.getContext("2d");
        
      //mouse and touch objects
      function startGame(){
        var mouse = {
          x: innerWidth/2,
          y: innerHeight-33
        };
          
        var touch = {
          x: innerWidth/2,
          y: innerHeight-33
        };
          
        //event listener for mouse object
        canvas.addEventListener("mousemove", function(event){
        mouse.x = event.clientX;
        });
        //eventListener for touch object
        canvas.addEventListener("touchmove", function(event){
          var rect = canvas.getBoundingClientRect();
          var root = document.documentElement;
          var touch = event.changedTouches[0];
          var touchX = parseInt(touch.clientX);
          var touchY = parseInt(touch.clientY) - rect.top - root.scrollTop;
          event.preventDefault();
          mouse.x = touchX;
        });

        //player
        var player_width = 32;
        var player_height = 32;
        var playerImg = new Image();
        var score = 0;
        var health = 100;
        
        function choosePlayer(){
          var orangeShip = "https://image.ibb.co/n8rayp/rocket.png";
          var blueShip = "https://image.ibb.co/dfbD1U/heroShip.png";
          var userInput = prompt("🚀SELECT BATTLESHIP!🚀\n1 is for orange and 2 is for blue ship", 1);   
          if(userInput==1){
            playerImg.src = orangeShip;
          }
          else if(userInput==2){
            playerImg.src = blueShip;
          }
          else{
            playerImg.src = orangeShip;
          }
        }choosePlayer();
        
        //bullet array
        var _bullets = []; //array to hold bullets
        var bullet_width = 6;
        var bullet_height = 8;
        var bullet_speed = 8;
        //enemy array
        var _enemies = []; //array to hold enemies
        var enemyImg = new Image();
        enemyImg.src = "https://image.ibb.co/bX9UuU/ufo_1.png";
        var enemy_width = 32;
        var enemy_height = 32;
        
        //Player object
        function Player(x, y, width, height){
          this.x = x;
          this.y = y;
          this.width = width;
          this.height = height;
          
          this.draw = function(){
            c.beginPath();
            c.drawImage(playerImg, mouse.x-player_width, mouse.y-player_height); //draw player and center cursor
          };
          
          this.update = function(){
            this.draw();
          };
        }
        
        //Bullet object
        function Bullet(x, y, width, height, speed){
          this.x = x;
          this.y = y;
          this.width = width;
          this.height = height;
          this.speed = speed;
          
          this.draw = function(){
            c.beginPath();
            c.rect(this.x, this.y, this.width, this.height);
            c.fillStyle = "#fff";
            c.fill();
            c.stroke();
          };
          
          this.update = function(){
            this.y -= this.speed;
            this.draw();
          };
        }
        
        //Enemy object
        function Enemy(x, y, width, height, speed){
          this.x = x;
          this.y = y;
          this.width = width;
          this.height = height;
          this.speed = speed;
          
          this.draw = function(){
            c.beginPath();
            c.drawImage(enemyImg, this.x, this.y);
          };
          
          this.update = function(){
            this.y += this.speed;
            this.draw();
          };
        }

        //draw Player
        var __player = new Player(mouse.x, mouse.y, player_width, player_height);
        
        //draw n enemies into enemies array
        function drawEnemies(){
          for (var _ = 0; _<4; _++){
            var x = Math.random()*(innerWidth-enemy_width);
            var y = -enemy_height; 
            var width = enemy_width;
            var height = enemy_height;
            var speed = Math.random()*4.5;
            var __enemy = new Enemy(x, y, width, height, speed);
            _enemies.push(__enemy); 
          }
        }setInterval(drawEnemies, 1234);
          
        //fire bullet function
        function fire(){
          for (var _ = 0; _<1; _++){
            var x = mouse.x-bullet_width/2;
            var y = mouse.y-player_height;
            var __bullet = new Bullet(x, y, bullet_width, bullet_height, bullet_speed);
            _bullets.push(__bullet);
          }
        }setInterval(fire, 200);
          
        //event listener for fire function
        canvas.addEventListener("click", function(){
          //fire();
        });
          
        //COLLISION DETECTION
        function collision(a,b){
          return a.x < b.x + b.width &&
                  a.x + a.width > b.x &&
                  a.y < b.y + b.height &&
                  a.y + a.height > b.y;
        }
        c.fillStyle = "white";
        c.font = "1em Arial";
        
        function stoperror() {
          return true;
        }  
        window.onerror = stoperror;
          
        //GAME LOOP
        function animate(){
          requestAnimationFrame(animate); 
          c.beginPath(); 
          c.clearRect(0,0,innerWidth,innerHeight); 
          c.fillText("Health: " + health, 5, 20); 
          c.fillText("Score: " + score, innerWidth-100, 20);

          //update _player
          __player.update();
          //update bullets from bullets array
          for (var i=0; i < _bullets.length; i++){
            _bullets[i].update();
            if (_bullets[i].y < 0){
              _bullets.splice(i, 1);
            }
          }
          //update enemies from enemies array
          for (var k=0; k < _enemies.length; k++){
            _enemies[k].update();
            if(_enemies[k].y > innerHeight){
              _enemies.splice(k, 1);
              health -= 10;
            if(health == -10){
              alert("You DIED!\nYour score was "+score);
              startGame();
              }
            }
          }
          //loop over both enemies and bullets to detect collisions
          for(var j = _enemies.length-1; j >= 0; j--){
            for(var l = _bullets.length-1; l >= 0; l--){
              if(collision(_enemies[j], _bullets[l])){
                _enemies.splice(j, 1);
                _bullets.splice(l, 1);
                score++;
              }
            }
          }
        }
        animate();
      }
      startGame();
    }
  }
}
