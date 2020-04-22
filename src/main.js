import drawBackground from "./drawFunctions/drawBackground.js";
import drawGrid from "./drawFunctions/drawGrid.js";
import Layer from "./classes/Layer.js";
import Block from "./classes/Block.js";
import Game from "./classes/Game.js";
import loadImage from "./asyncLoaders/loadImage.js";
import {loadJSON} from "./asyncLoaders/loadJSON.js";

const game_canvas = document.getElementById('screen');
const game_context = game_canvas.getContext('2d');


let game = new Game();

class SpriteSheet{
    constructor(image,sprites){
        this.image = image;
        this.sprites = sprites;
        this.animations = [];
    }
    norm(num){
        return num * (game_canvas.width/15);
    }
    drawSprite=(canvas,context,coords)=>{
        let {x,y,w,h} =coords;
        context.drawImage(this.image,
            x, y, w, h,
            this.norm(5),
            this.norm(5),
            30, 30)
    };
    drawAnimation=()=>{
        let frame = 0;
        let frames = this.sprites;
        let frameRate = 5;
        let frameCounter = 0;
        return (canvas,context)=>{
            frameCounter++;
            if(frameCounter % frameRate === 0){
                frame++;
            }
           this.drawSprite(canvas,context,frames[frame%frames.length])
        }
    }
}

async function setup (){
    let image = await loadImage('../images/spritesheet.png');
    const JSON = await loadJSON('../json/sprites.json');
    const sprites = new SpriteSheet(image, JSON.sprites[0]);
    game.renderer.addLayer(new Layer(1, drawBackground,['black']));
    game.renderer.addLayer(new Layer(1, drawGrid,[15]));
    game.renderer.addLayer(new Layer(1,game.entities.render));
    game.renderer.addLayer(new Layer(2,sprites.drawSprite,[{
        "name": "",
        "x": 0,
        "y": 2,
        "w": 24,
        "h": 24
    }]))

}

game.timer.update = (deltaTime) =>{

game.renderer.render(game_canvas,game_context);

};




setup()
.then(()=>{
    game.timer.start()
});