import NounBlock from "../classes/Blocks/NounBlock.js";
import PropertyBlock from "../classes/Blocks/PropertyBlock.js";
import OperatorBlock from "../classes/Blocks/OperatorBlock.js";
import Tile from "../classes/Blocks/Tile.js";


export default function blockFactory(type,sprite){
    let types = {
        nouns:(sprite) =>new NounBlock(...sprite),
        operators:(sprite) => new OperatorBlock(...sprite),
        properties:(sprite) => new PropertyBlock(...sprite),
        tiles:(sprite) => new Tile(...sprite)
};
    return types[type](sprite);
}