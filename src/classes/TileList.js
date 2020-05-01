import EntityList from "./EntityList.js";

export default  class TileList extends EntityList{
    constructor(game) {
        super(game)
    }
    render=(canvas,context,image,spriteSheets,tint)=>{
        let frame = Math.floor(this.frameCount/10 % 3);
        this.entities
            .map(entity=>entity.draw())
            .forEach(([x,y,name,group,type])=>{
                let spritesSheet = spriteSheets.spriteSheets;
                let sprite = spritesSheet[type][name].sprites[frame];
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