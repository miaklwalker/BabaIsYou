import NounBlock from "../classes/Blocks/NounBlock.js";
import PropertyBlock from "../classes/Blocks/PropertyBlock.js";
import OperatorBlock from "../classes/Blocks/OperatorBlock.js";
import Tile from "../classes/Blocks/Tile.js";
import SpriteBlock from "../classes/Blocks/spriteBlock.js";
import Wall from "../classes/Blocks/Wall.js";


export default function blockFactory(type,sprite){
    let types = {
        nouns:(sprite) =>new NounBlock(...sprite),
        operators:(sprite) => new OperatorBlock(...sprite),
        properties:(sprite) => new PropertyBlock(...sprite),
        tiles:(sprite) => new Tile(...sprite),
        sprites:(sprite) => new SpriteBlock(...sprite),
        wall:(sprite) => new Wall(...sprite),
};
    return types[type](sprite);
}