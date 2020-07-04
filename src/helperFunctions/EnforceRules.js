import traitFactory from "./traitFactory.js";
import NounBlock from "../classes/Blocks/NounBlock.js";
import PropertyBlock from "../classes/Blocks/PropertyBlock.js";

function clearRules(entities){
    entities.forEach(entity=>{
        entity.traits.forEach(trait=>{
            delete entity[trait.NAME];
        });
        entity.traits.length = 0
    });
}

function enforceRules(rules,masterList){
    let useRules = masterList.allOfFlags("useRules");
    clearRules(useRules);
        rules.forEach(({name, operator, property}) => {
            if(property instanceof NounBlock){
                let temp = [];
                useRules.forEach(block=>{
                    if(block.name === name.name){

                        temp.push(block.id);
                    }
                });
                temp.forEach(id=>{
                    masterList.changeEntity(id,property.name);
                });
            }else if(property instanceof PropertyBlock){
                useRules.forEach(entity => {
                    if ((entity.name === name.name) && operator.name === 'IS') {
                            entity.addTrait(traitFactory(property.name))
                    }
                })
            }
        });
    }

export default function enforcerFactory(entities){
    return (rules) => enforceRules(rules,entities)
}