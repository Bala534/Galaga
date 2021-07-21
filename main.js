/* 
This is the main class where we access all other classes through objects
*/

class Start{
    game(){
        var obj = new Main();
        obj.movement();

        var games = new sgame();
        games.start();
    }}


var obj = new Start();
obj.game();
