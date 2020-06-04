import chooseStrategy from "./Stratagies/EntityList.Strategies.js";
import makeWallSprites from "../helperFunctions/makeWallSprites.js";





export default class EntityList {
    constructor(game) {
        this.entities = [];
        this._divisions = game;
        this.frameCount = 0;
        this.frameLength = 3;
        this.frameRate = 12;
        this.buffer = null;
    }
    get divisions(){
        return this._divisions.gridDiminsions
    }
    get frame(){
        return Math.floor(this.frameCount / this.frameRate % this.frameLength);
    }
    addEntity(entity) {
        this.entities.push(entity);
    }
    makeTextures({texture,colorMap}){
        let result = {}
        for(let single in texture){
            result[single] = makeWallSprites(texture[single],colorMap[single]);
        }
            this.buffer = result;
    }
    purge(){
        this.entities = [];
        this.entities.length = 0;
        this.buffer = null;
    }
    render = (canvas, context, image, spriteSheets, tint) => {
        this.entities
            .forEach((rawEntity) => {
                let entity = rawEntity.draw(this.entities);
                let strategy = chooseStrategy(rawEntity.strategy);
                let [x,y] = entity;
                let sprite = strategy(spriteSheets,entity,this.frame,this,rawEntity);
                sprite.render(
                    canvas, context,
                    tint,
                    x * canvas.width / this.divisions[0],
                    y * canvas.height / this.divisions[1], image
                )
            });
        this.frameCount++
    }
}