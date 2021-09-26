import chooseStrategy from "./Stratagies/EntityList.Strategies.js";
import makeWallSprites from "../helperFunctions/makeWallSprites.js";


export default class EntityList {
    constructor(game,flag) {
        this.flag = flag;
        this._divisions = game;
        this.frameCount = 0;
        this.frame_length = 2;
        this.frameRate = 12;
        this.buffer = null;
    }
    get entities(){
    return this._divisions.masterList
    }
    get divisions(){
        return this._divisions.gridDiminsions
    }
    get frame(){
        return Math.floor((this.frameCount / this.frameRate) % this.frame_length);
    }
    addEntity(entity) {
        this.entities.push(entity);
    }
    makeTextures({texture:textures,colorMap}){
        let result = {};
        for(let texture in textures){
            if(textures.hasOwnProperty(texture)) {
                let textureToMap = textures[texture];
                let colorForMap = colorMap[texture];
                result[texture] = makeWallSprites(textureToMap, colorForMap);
            }
        }
        this.buffer = result;
    }
    render = (canvas, context, image, spriteSheets, tint) => {
        this.entities
            .forEach((member) => {
                if(member.isRendered && member[this.flag]){
                    let {block:rawEntity}= member;
                    let isRendered = this.entities.allOfFlags("isRendered");
                    let entity = rawEntity.draw(isRendered);
                    let strategy = chooseStrategy(rawEntity.strategy);
                    let [x,y] = entity;
                    let sprite = strategy(spriteSheets,entity,this.frame,this);
                    sprite.render(
                        canvas, context,
                        tint,
                        x * canvas.width / this.divisions[0],
                        y * canvas.height / this.divisions[1],
                        image
                    )
                }
            });
        this.frameCount++
    }
}