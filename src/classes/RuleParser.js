import OperatorBlock from "./Blocks/OperatorBlock.js";
import NounBlock from "./Blocks/NounBlock.js";
import PropertyBlock from "./Blocks/PropertyBlock.js";

let handleFilter =(word)=>{ return (other) =>{if(word.id !== other.id && !(other instanceof OperatorBlock))return other;}};
let checkIfValid = ([left,right,up,down]) =>{
    if(left && right && up && down){
        return 'both'
    }else if(left && right){
        return 'left-right'
    }else if( up && down){
        return 'up-down'
    }else{
        return 'none';
    }
};

export default class RuleParser{
    constructor(){
        this.words = [];
        this.rules = [];
    }
    makeRule(name,operator,property){
        this.rules .push({
            name,
            operator,
            property,
        })
    }

    parseRules(){
        this.rules = [];
        this.words.forEach(word=>{
            if(word instanceof OperatorBlock){
                let filteredWords = this.words.filter(handleFilter(word));

                let matches = word.updateAndFindNeighbors(filteredWords);

                let ruleDirection = checkIfValid(Object.values(word.neighbors));

                if(ruleDirection !== 'none'){
                    let noun = matches [0] instanceof NounBlock ? matches[0] : matches[1];
                    let property = matches [1] instanceof PropertyBlock ? matches[1] : matches[0];
                    this.makeRule(noun,word,property);
                }
            }
        })
    }
    addWords(words){
        this.words.push(...words);
    }
}