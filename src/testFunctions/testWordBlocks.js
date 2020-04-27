import NounBlock from "../classes/Blocks/NounBlock.js";
import PropertyBlock from "../classes/Blocks/PropertyBlock.js";
import OperatorBlock from "../classes/Blocks/OperatorBlock.js";



function n(num){
    return num * (480 / 15);
}


function makeTest(testObj,offsetX=0,offsetY=0){
    let result = [];
    let keys = Object.keys(testObj);
    outer:for(let i = 0 ; i < 6 ; i++){
        for(let j = 0 ; j < 15 ; j++){
            if(keys[j+(i*15)]!==undefined) {
                result.push([n(i+offsetX), n(j+offsetY), keys[j + (i * 15)]])
            }else{
                break outer;
            }
        }
    }
    return result;
}




export default function testWords(spriteSheets,game){
    let nounBlocks = makeTest(spriteSheets.words.noun);
    let propBlocks = makeTest(spriteSheets.words.properties,9,);
    let opBlocks =   makeTest(spriteSheets.words.operators,7);
    nounBlocks.forEach(entity=>{
        game.addEntity(new NounBlock(...entity));
    });
    propBlocks.forEach(entity=>{
        game.addEntity(new PropertyBlock(...entity));
    });
    opBlocks.forEach(entity=>{
        game.addEntity(new OperatorBlock(...entity));
    });
}