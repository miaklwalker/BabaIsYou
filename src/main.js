import drawBackground from "./drawFunctions/drawBackground.js";
import drawGrid from "./drawFunctions/drawGrid.js";
import Layer from "./classes/Layer.js";
import Game from "./classes/Game.js";
import parseJsonToSpriteSheet from "./helperFunctions/parseJsonToSpritesheet.js";
import makeLevelBuilder from "./helperFunctions/makeLevelBuilder.js";
import RuleParser from "./classes/RuleParser.js";
import enforcerFactory from "./helperFunctions/EnforceRules.js";
import Collider from "./classes/Collider.js";
import MessageCenter from "./classes/MessageCenter.js";
import makePage from "./production.js";
import Controls from "./classes/Controls.js";
import tileMapperInit from "./LevelEditor/init.js";
import Vector from "./classes/Vector.js";

makePage(false);

const game_canvas = document.getElementById('screen');
const game_context = game_canvas.getContext('2d');

let ruleParser;
const collider = new Collider();
const messageCenter = new MessageCenter();
const controls = new Controls();

document.addEventListener('keydown', controls.keyDown);
document.addEventListener('keyup', controls.keyUp);
document.addEventListener('addmessage', messageCenter.handleAddMessage);


let game;

class node{
    left;
    right;
    down;
    up;
    constructor(center){
        this.center = center;
    }
}
class quadLinkedList{
    constructor(){
        this.center = null
    }
}

function newCollider(allEntities){
    let candidates = [];
    let collideCandidates = [];
    allEntities.forEach(entity=>{
        if(entity.YOU){
            candidates.push(entity);
        }
        if(entity.canCollide){
            collideCandidates.push(entity);
        }
    });
    console.log(collideCandidates);
    let lists = [];
    candidates.forEach(candidate=>{
        let chain = new quadLinkedList(candidate);
        let position = candidate.position;
        let left = new Vector(-1,0).addVector(position);
        let down = new Vector(0,1).addVector(position);
        let right = new Vector(1,0).addVector(position);
        let up = new Vector(0,-1).addVector(position);
        let pool = [left,down,right,up];

    });
console.log(allEntities);
    return candidates

}



export default function MAIN() {
    game = new Game(messageCenter);
    let levelBuilder = makeLevelBuilder(game);
    const {tint} = game.renderer;

    game.setup()
        .then(({image, spriteSpec, levelSpec}) => {
            let spriteSheets = parseJsonToSpriteSheet(spriteSpec);
            let args = [image, spriteSheets, tint];
            levelBuilder(spriteSpec, levelSpec);

            game.walls.makeTextures(game.renderer.texture);
            let enforcer = enforcerFactory(game.entities);
            ruleParser = new RuleParser(enforcer);
            ruleParser.addWords(game.words.entities);
            ruleParser.parseRules();
            game.messageCenter.subscribe(ruleParser);

            tileMapperInit(game,game_canvas,5);

            game.addLayer(new Layer(1, drawBackground, ['black']),
                new Layer(1, drawGrid, [game.gridDiminsions]),
                new Layer(3, game.words.render, args),
                new Layer(3, game.tiles.render, args),
                new Layer(2, game.backgroundTiles.render, args),
                new Layer(4, game.sprites.render, args),
                new Layer(3, game.walls.render, args)
            );

            enforcer(ruleParser.rules);
            newCollider(game.allEntities);
            game.timer.start()
        });

    game.timer.update = (deltaTime) => {
        game.renderer.render(game_canvas, game_context);
        collider.update(game.allEntities);
        messageCenter.update();
    }
}
MAIN();
