import drawBackground from "./drawFunctions/drawBackground.js";
import drawGrid from "./drawFunctions/drawGrid.js";
import Layer from "./classes/Layer.js";
import Game from "./classes/Game.js";
import loadImage from "./asyncLoaders/loadImage.js";
import {loadJSON} from "./asyncLoaders/loadJSON.js";
import {NounBlock} from './classes/Block.js'
const game_canvas = document.getElementById('screen');
const game_context = game_canvas.getContext('2d');


let game = new Game();

class Sprite {
    constructor({x,y,w,h,name},tint,palette){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.name = name;
        this.tint = tint;
        this.palette = palette;
    }
    render=(canvas, context, tint, x, y, image)=>{
        let buffer = document.createElement('canvas');
        let ctx = buffer.getContext('2d');
        tint(buffer,ctx,[this.x,this.y,this.w,this.h],image,this.tint);
        context.drawImage(buffer,x,y);
        return buffer; 
    }
}

function parseJsonToSpriteSheet(obj,current={},name){
    let result = {};
    if(Array.isArray(obj)){
        current[name] = obj.map(sprite=>new Sprite(sprite,current.tint,current.palette));
        return current[name];
    }else if(typeof obj === 'number' || typeof obj === 'string'){
        current[name] = obj;
        return current[name];
    }else{
        for(let key in obj){
            if(obj.hasOwnProperty(key)) {
                result[key] = parseJsonToSpriteSheet(obj[key], result, key);
            }
        }
        return result;
    }
}

function n(num){
    return num * (game_canvas.width / 15);
}



async function setup (){
    const image = await loadImage('../images/spritesheet.png');
    const spriteSpec = await loadJSON('../json/sprites.json');
    let spriteSheets = parseJsonToSpriteSheet(spriteSpec.spriteSheets);
    let baba = new NounBlock(n(2),n(2),'AB');
    game.entities.addEntity(baba);
    game.renderer.changePalette(spriteSpec.palettes.base);
    game.renderer.addLayer(new Layer(1, drawBackground,['black']));
    game.renderer.addLayer(new Layer(1, drawGrid,[15]));
    game.renderer.addLayer(new Layer(2,game.entities.render,[image,spriteSheets,game.renderer.tint]));

    return {image,spriteSpec};
}

game.timer.update = (deltaTime) =>{
game.renderer.render(game_canvas,game_context);
};

setup()
.then(({image,spriteSpec})=>{
    game.timer.start()
});