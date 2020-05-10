import EntityList from "./EntityList.js";
import Sprite from "./Sprite.js";


function makeWallSprites(texturePack){
    let buffer = new Map();
    for(let texture in texturePack){
        let temp = []
        let i = 0 ;
        for(let set of texturePack[texture]){
            let sprite = {
                x:set.x,
                y:set.y,
                w:set.width,
                h:set.height,
                name:i
            };
            temp.push(new Sprite(sprite,7,'base'));
            i++
        }
        buffer.set(texture,temp);
    }
    return buffer
}


export default  class WallList extends EntityList{
    buffer;
    constructor(game) {
        super(game);
        this.buffer = null
    }
    render=(canvas,context,image,texturePack,tint)=>{
        if(this.buffer === null){
            this.buffer = makeWallSprites(texturePack);
        }

        let walls = this.entities.map(entity=>entity.draw(this.entities));
        walls.forEach(wall=>{
            const [x1,y1,texture] = wall;
            let toDraw = this.buffer.get(texture)[this.frame];
            toDraw.render(
                canvas,context,
                tint,
                x1*canvas.width/this.divisions,
                y1*canvas.height/this.divisions,
                image
            )
        });
        this.frameCount++
    }
}