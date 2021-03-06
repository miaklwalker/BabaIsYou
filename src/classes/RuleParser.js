import OperatorBlock from "./Blocks/OperatorBlock.js";


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
    constructor(callback,masterList){
        this.masterList = masterList;
        this.rules = [];
        this.callback = callback;
    }
    get words (){
        return this.masterList.allOfFlags("isWord");
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

                rulesToParse.forEach(([first,second])=>{
                    this.makeRule(first,word,second);
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
}