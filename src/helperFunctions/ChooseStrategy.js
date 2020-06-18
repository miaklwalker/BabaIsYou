export let sprites = ["BABA","KIKI","ME","ANNIE","ROBOT","GHOST","HAND","SKULL","KNIGHT","BAT","BIRD","BOLT","BUBBLE","BUG","COG","CRAB","ROCKET","BELT"];
export let tiles = [ "ALGAE", "BOX", "BALL", "DOOR", "DUST", "FEAR", "FLAG", "FLOWER", "FRUIT", "FUNGUS", "KEY", "LOVE", "MOON", "ORB", "PILLAR", "ROCK", "ROSE", "BLOSSOM", "STAR", "TILE", "TREE", "CAKE", "CASH", "CUP", "GATE", "?", "DOT", "FIRE", "FOLIAGE", "FUNGI", "!", "!?", "SPORES", "JELLY", "LADDER", "LEAF", "FOLIAG", "ST4R", "SHIRT", "SPIKES", "STUMP", "SUN", "TREES", "TREE-KEY", "UFO"];
export let walls = ["wall", "clouds", "foliage", "ice", "snow", "moss", "ocean", "cliff", "fence", "hedge", "smallpipe", "water", "lava", "pipe", "base",];

export default function chooseStrategy ({name}) {
    if(sprites.includes(name)){
        return "SPRITE";
    }else if(tiles.includes(name)){
        return "TILE";
    }else if(walls.includes(name.toLowerCase())){
        return 'WALL'
    }
}