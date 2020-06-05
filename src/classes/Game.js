import Timer from "./Timer.js";
import Renderer from "./Renderer.js";
import EntityList from "./EntityList.js";
import loadImage from "../asyncLoaders/loadImage.js";
import loadJSON from "../asyncLoaders/loadJSON.js";
import startTest from "../../testLibrary/modules/startTest.js";

export default class Game {
    image;
    spriteSpec;

    constructor() {
        this.timer =            new Timer();
        this.gridDiminsions =   19;
        this.renderer =         new Renderer(this);
        this.words =            new EntityList(this);
        this.tiles =            new EntityList(this);
        this.backgroundTiles =  new EntityList(this);
        this.walls =            new EntityList(this);
        this.sprites =          new EntityList(this);

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

    addWords(entity) {
        this.words.addEntity(entity);
    }

    addWall(wall) {
        this.walls.addEntity(wall);
    }

    addBackgroundTile(bgTile) {
        this.backgroundTiles.addEntity(bgTile);
    }

    addTile(tile) {
        this.tiles.addEntity(tile);
    }

    addLayer(...layer) {
        this.renderer.addLayer(...layer);
    }

    addSprite(sprite) {
        this.sprites.addEntity(sprite);
    }

}