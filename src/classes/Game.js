import Timer from "./Timer.js";
import Renderer from "./Renderer.js";
import EntityList from "./EntityList.js";
import loadImage from "../asyncLoaders/loadImage.js";
import loadJSON from "../asyncLoaders/loadJSON.js";
import TileList from "./TileList.js";
import WallList from "./WallList.js";
import runTests from "../../TESTS/__tests__/test.js";
import Controls from "./Controls.js"
import MessageCenter from "./MessageCenter.js";

export default class Game {
    image;
    spriteSpec;
    constructor(){
        this.timer = new Timer();
        this.gridDiminsions = 20;
        this.renderer = new Renderer(this);
        this.entities = new EntityList(this);
        this.tiles = new TileList(this);
        this.walls = new WallList(this);
        this.messageCenter = new MessageCenter();
    }
    setup = async() =>{
            const image = await loadImage('../images/spritesheet.png');
            const spriteSpec = await loadJSON('../json/sprites.json');
            const levelSpec = await loadJSON('../json/level.json');

            this.messageCenter.subscribe({onMessage(msg){console.log(msg)}})
            this.image = image;
            this.spriteSpec = spriteSpec;

            const controls = new Controls();

            document.addEventListener('keydown',controls.keyDown);
            document.addEventListener('keyup',controls.keyUp);
            document.addEventListener('addmessage',this.messageCenter.handleAddMessage)
            
            runTests();
            return {image, spriteSpec,levelSpec};

    };
    addEntity(entity){
        this.entities.addEntity(entity);
    }
    addWall(wall){
        this.walls.addEntity(wall);
    }
    addTile(tile){
        this.tiles.addEntity(tile);
    }
    addLayer(layer){
        this.renderer.addLayer(layer);
    }
}