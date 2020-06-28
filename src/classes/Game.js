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
        this.topLevel   =       new EntityList(this,'isTopLevel');
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
        return [...this.masterList.allOfFlags('useRender')]
    }
    addTopLevel(id){
        this.masterList.changeEntityFlag(id,'isTopLevel',true);
    }
    addForeground(id){
        this.masterList.changeEntityFlag(id,'isForeground',true);
    }
    addBackground(id){
        this.masterList.changeEntityFlag(id,'isBackground',true);
    }
    addLayer(...layer) {
        this.renderer.addLayer(...layer);
    }
}