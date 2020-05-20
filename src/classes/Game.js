import Timer from "./Timer.js";
import Renderer from "./Renderer.js";
import EntityList from "./EntityList.js";
import loadImage from "../asyncLoaders/loadImage.js";
import loadJSON from "../asyncLoaders/loadJSON.js";
import WallList from "./WallList.js";
import runTests from "../../TESTS/__tests__/test.js";

export default class Game {
    image;
    spriteSpec;
    constructor(messageCenter){

        this.timer = new Timer();
        this.gridDiminsions = 19;
        this.renderer = new Renderer(this);
        this.words = new EntityList(this,'WORD');
        this.tiles = new EntityList(this,'TILE');
        this.backgroundTiles = new EntityList(this,'TILE');
        this.walls = new WallList(this,'WALL');
        this.sprites =  new EntityList(this,'SPRITE');
        this.messageCenter = messageCenter;
    }
    setup = async() =>{

            const image = await loadImage('../images/spritesheet.png');
            const spriteSpec = await loadJSON('../json/sprites.json');
            const levelSpec = await loadJSON('../json/level-1.json');


            this.image = image;
            this.spriteSpec = spriteSpec;


            document.addEventListener('addmessage',this.messageCenter.handleAddMessage);
            
            runTests();

            return {image, spriteSpec,levelSpec};

    };
    get entities(){
        return [...this.walls.entities,...this.sprites.entities,...this.tiles.entities]
    }
    get allEntities(){
        return [...this.entities,...this.words.entities]
    }
    addWords(entity){
        this.words.addEntity(entity);
    }
    addWall(wall){
        this.walls.addEntity(wall);
    }
    addBackgroundTile(bgTile){
        this.backgroundTiles.addEntity(bgTile);
    }
    addTile(tile){
        this.tiles.addEntity(tile);
    }
    addLayer(...layer){
        this.renderer.addLayer(...layer);
    }
    addSprite(sprite){
        this.sprites.addEntity(sprite);
    }

}