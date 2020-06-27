import Timer from "./Timer.js";
import Renderer from "./Renderer.js";
import EntityList from "./EntityList.js";
import loadImage from "../asyncLoaders/loadImage.js";
import loadJSON from "../asyncLoaders/loadJSON.js";

export default class Game {
    image;
    spriteSpec;
    constructor(masterList) {
        this.timer =            new Timer();
        this.gridDiminsions =   19;
        this.masterList =       masterList;
        this.foreGround =       new EntityList(this,"isForeground");
        this.backGround =       new EntityList(this,"isBackground");
        this.renderer =         new Renderer(this);
    }

    setup = async (level) => {
        const image = await loadImage('../images/spritesheet.png');
        const spriteSpec = await loadJSON('../json/sprites.json');
        const levelSpec = await loadJSON(`../json/level-${level}.json`);
        this.image = image;
        this.spriteSpec = spriteSpec;
        return {image, spriteSpec, levelSpec};
    };

    get entities() {
        return [...this.walls.entities, ...this.sprites.entities, ...this.tiles.entities]
    }

    get allEntities() {
        return [...this.entities, ...this.words.entities]
    }
    addForeground(id){
        this.masterList.getEntity(id).isForeground = true;
    }
    addBackground(id){
        this.masterList.getEntity(id).isBackground = true;
    }
    addLayer(...layer) {
        this.renderer.addLayer(...layer);
    }



}