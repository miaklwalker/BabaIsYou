import EntityList from "./EntityList.js";

export default class SpriteList extends EntityList{
    constructor(game) {
        super(game)
    }
    render=(canvas,context,image,spriteSheets,tint)=>{
        this.entities
            .map(entity=>entity.draw())
            .forEach(([x,y,name,,type,id,direction,action])=>{
                let spritesSheet = spriteSheets.spriteSheets;
                let animation = spritesSheet[type][name].animations[action][direction];
                this.frameLength = animation.length;
                let sprite = animation[this.frame];
                sprite.render(
                    canvas,context,
                    tint,
                    x * canvas.width/this.divisions ,
                    y * canvas.height/this.divisions,image
                )
            });
        this.frameCount++
    }
}