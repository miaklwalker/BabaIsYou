export default function chooseStrategy(strategy){
    switch(strategy){
        case 'WORD' :
            return wordStrategy;
        case 'TILE':
            return tileStrategy;
        case 'WALL':
            return wallStrategy;
        case 'SPRITE':
            return spriteStrategy;
        default:
            return strategy;
    }
}

function wordStrategy(spriteSheets,[x, y, name, group, type, alias],frame){
   return spriteSheets.spriteSheets[group][type][name].sprites[frame]
}
function spriteStrategy(spriteSheets,[x, y, name, group, type, alias,direction, action],frame,list){
    let spritesSheet = spriteSheets.spriteSheets;
    let animation = spritesSheet[type][name].animations[action][direction];
    list.frameLength = animation.length;
    return animation[list.frame];
}
function tileStrategy(spriteSheets,[x, y, name, group, type, alias],frame){
    return spriteSheets.spriteSheets[type][name].sprites[frame];
}
function wallStrategy(spriteSheets,[x, y, name, group, type, alias, texture],frame,list,sprite){
    return list.buffer[texture].get(alias)[list.frame]
}



/*
Based on stratagies render could have different layers
And then every redraw reassign entities to a layer
That way if they change they can be reassigned a type safely
Also need to decouple the texture packs from the wall class
and just pass in a name and let the renderer do the heavy lifting



 */



