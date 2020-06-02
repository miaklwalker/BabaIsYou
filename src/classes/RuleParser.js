import OperatorBlock from "./Blocks/OperatorBlock.js";
import NounBlock from "./Blocks/NounBlock.js";
import PropertyBlock from "./Blocks/PropertyBlock.js";

let handleFilter =(word)=>{ return (other) =>{if(word.id !== other.id )return other;}};
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
    constructor(callback){
        this.words = [];
        this.rules = [];
        this.callback = callback;
    }
    makeRule(name,operator,property){
        this.rules.push({
            name,
            operator,
            property,
        })
    }

    parseRules(){
        this.rules = [];
        this.words.forEach(word=>{
            if(word instanceof OperatorBlock){
                // removes word from list of items to check
                let filteredWords = this.words.filter(handleFilter(word));

                let matches = word.updateAndFindNeighbors(filteredWords);

                let ruleDirection = checkIfValid(Object.values(word.neighbors));

                let {left,down,right,up} = matches;
                let rulesToParse = [];

                if(ruleDirection === 'both'){
                     rulesToParse.push([left,right],[up,down])
                }else if(ruleDirection === 'left-right'){
                     rulesToParse.push([left,right])
                }else if( ruleDirection === 'up-down' ){
                     rulesToParse.push([up,down])
                }

                rulesToParse.forEach(([noun,property])=>{
                    this.makeRule(noun,word,property);
                })
            }
        })
    }
    onMessage({from}){
        if(from === 'controls'){
            this.parseRules();
            this.callback(this.rules);
        }
    }
    addWords(words){
        this.words.push(...words);
    }
}