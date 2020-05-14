export default function chooseStrategy(strategy){
    switch(strategy){
        case 'WORD' :
            return (spriteSheets,[x, y, name, group, type],frame)=>spriteSheets.spriteSheets[group][type][name].sprites[frame];
        case 'TILE':
            return (spriteSheets,[,,name,,type],frame)=>spriteSheets.spriteSheets[type][name].sprites[frame];
        case 'WALL':
            return '';
        case 'SPRITE':
            return SpriteStrategy;
        default:
            return strategy;
    }
}



function SpriteStrategy(spriteSheets,[x,y,name,,type,id,direction,action],frame,list){
    let spritesSheet = spriteSheets.spriteSheets;
    let animation = spritesSheet[type][name].animations[action][direction];
    list.frameLength = animation.length;
    return animation[frame];
}