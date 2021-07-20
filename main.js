/* 
This is the main class where we access all other classes through objects
*/

class Start{
    game(){
        console.log('sjdb')
        var obj = new Main();
        obj.movement();
        console.log("started")
    }}
var object = new Start();
object.game();