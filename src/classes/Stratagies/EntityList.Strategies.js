export default function chooseStrategy(strategy){

    switch(strategy){
        case 'WORD' :
            return (spriteSheets,[x, y, name, group, type],frame)=>spriteSheets.spriteSheets[group][type][name].sprites[frame];
        case 'TILE':
            return (spriteSheets,[,,name,,type],frame)=>spriteSheets.spriteSheets[type][name].sprites[frame];
        case 'WALL':
            return (spriteSheets,[,,texture],frame,list)=>list.buffer.get(texture)[list.frame];
        case 'SPRITE':
            return (spriteSheets,[x,y,name,,type,id,direction,action],frame,list)=>{
            let spritesSheet = spriteSheets.spriteSheets;
            let animation = spritesSheet[type][name].animations[action][direction];
            if(animation === undefined){
                console.log(x,y,name,type,id,direction,action);
            }
            list.frameLength = animation.length;
            return animation[list.frame];
        };
        default:
            return strategy;
    }
}



