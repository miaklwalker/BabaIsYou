import Timer from "./Timer.js";
import Renderer from "./Renderer.js";
import EntityList from "./EntityList.js";
import loadImage from "../asyncLoaders/loadImage.js";
import loadJSON from "../asyncLoaders/loadJSON.js";
import runTest from "../testFunctions/TestRunner.js";
import {passLog} from "../testFunctions/expectFactory.js";

export default class Game {
    image;
    spriteSpec;
    constructor(){
        this.timer = new Timer();
        this.gridDiminsions = 15;
        this.renderer = new Renderer(this.gridDiminsions);
        this.entities = new EntityList();
    }
    setup = async() =>{
        if(runTest(0)) {
            const image = await loadImage('../images/spritesheet.png');
            const spriteSpec = await loadJSON('../json/sprites.json');
            this.image = image;
            this.spriteSpec = spriteSpec;
            return {image, spriteSpec};
        }else{
            console.log(runTest(2));
        }
    };
    addEntity(entity){
        this.entities.addEntity(entity);
    }
    addLayer(layer){
        this.renderer.addLayer(layer);
    }
}