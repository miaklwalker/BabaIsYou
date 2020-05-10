import EntityList from "./EntityList.js";

export default  class TileList extends EntityList{
    constructor(game) {
        super(game)
    }
    render=(canvas,context,image,spriteSheets,tint)=>{
        this.entities
            .map(entity=>entity.draw())
            .forEach(([x,y,name,,type])=>{
                let spritesSheet = spriteSheets.spriteSheets;
                let sprite = spritesSheet[type][name].sprites[this.frame];
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