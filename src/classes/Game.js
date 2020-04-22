import Timer from "./Timer.js";
import Renderer from "./Renderer.js";
import EntityList from "./EntityList.js";

export default class Game {
    constructor(){
        this.timer = new Timer();
        this.renderer = new Renderer();
        this.entities = new EntityList();
    }
}