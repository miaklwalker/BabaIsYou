import traitFactory from "./traitFactory.js";

function clearRules(entities){
    entities.forEach(entity=>entity.traits = []);
}
export default function enforceRules(rules,entities){
    clearRules(entities);
    rules.forEach(({name,operator,property})=>{
        entities.forEach(entity=>{
            if(entity.name === name.name && operator.name === 'IS'){
                entity.addTrait(traitFactory(property.name))
            }
        })
    });

}