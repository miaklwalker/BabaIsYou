import {describe,expect,test} from "@jest/globals";
import SpriteBlock from "../../../src/classes/Blocks/spriteBlock.js";
import Push from "../../../src/classes/Traits/Push.js";
import NounBlock from "../../../src/classes/Blocks/NounBlock.js";
import OperatorBlock from "../../../src/classes/Blocks/OperatorBlock.js";
import PropertyBlock from "../../../src/classes/Blocks/PropertyBlock.js";
import enforcerFactory from "../../../src/helperFunctions/EnforceRules.js";

describe('Enforce Rules',()=>{
    // act
    let baba = new SpriteBlock(1,1,'BABA');
    let _baba = new NounBlock(1,1,"BABA");
    let is = new OperatorBlock(1,1,'IS');
    let you = new PropertyBlock(1,1,'YOU');
    // arrange
    baba.addTrait(new Push());
    let rule = {name:_baba,operator:is,property:you};
    let rules = [rule];
    let entities =  [baba];
    let ruleEnforcer = enforcerFactory(entities);
    // assert
    test('Enforce Rules should remove the push trait',()=>{
        expect(baba.PUSH).not.toBeUndefined();
        ruleEnforcer(rules);
        expect(baba.PUSH).toBeUndefined();
    });
    test('It Should Also add the YOU trait',()=>{
        expect(baba.YOU).not.toBeUndefined();
    });
    test('It should also be able to change a blocks name',()=>{
        you = new NounBlock(1,1,'ROCK');
        rule.property = you;
        rules = [rule];
        ruleEnforcer(rules);
        expect(baba.name).toBe('ROCK');
    })
});