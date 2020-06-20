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

function enforceRules(rules,entities){
    clearRules(entities);
        rules.forEach(({name, operator, property}) => {
            if(property instanceof NounBlock){
                entities.forEach(entity => {
                    if ((entity.name === name.name) && operator.name === 'IS') {
                            entity.name = property.name;
                    }
                })
            }else if(property instanceof PropertyBlock){
                entities.forEach(entity => {
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