import traitFactory from "./traitFactory.js";

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
            entities.forEach(entity => {
                if ((entity.name === name.name) && operator.name === 'IS') {
                        entity.addTrait(traitFactory(property.name))
                }
            })
        });
    }

export default function enforcerFactory(entities){
    return (rules) => enforceRules(rules,entities)
}