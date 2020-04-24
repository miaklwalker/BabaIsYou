import Timer from "./Timer.js";
import Renderer from "./Renderer.js";
import EntityList from "./EntityList.js";

export default class Game {
    constructor(){
        this.timer = new Timer();
        this.gridDiminsions = 15;
        this.renderer = new Renderer(this.gridDiminsions);
        this.entities = new EntityList();
    }
}