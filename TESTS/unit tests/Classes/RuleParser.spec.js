import {describe,expect,test,jest} from "@jest/globals";
import RuleParser from "../../../src/classes/RuleParser.js";
import NounBlock from "../../../src/classes/Blocks/NounBlock.js";

describe.skip('Rule Parser',()=>{
    let callback = jest.fn();
    let ruleParser = new RuleParser(callback);
    test.todo('Rule Parser On Message Should call the callback with internal rules property',()=>{
        ruleParser.onMessage({from:'controls'});
        expect(callback).toHaveBeenCalled();
    });
    test('Make Rule should make a "rule" object and add it to rules',()=>{
        let name = 'test';
        let operator = 'is';
        let property = 'passing';
        let mockRule = {name,operator,property};
        ruleParser.makeRule(name,operator,property);
       expect(ruleParser.rules).toHaveLength(1);
       expect(ruleParser.rules[0]).toEqual(mockRule);
    });
    test('onMessage',()=>{
        ruleParser.parseRules = jest.fn();
        let message = {
            from:'controls',
        };
        ruleParser.onMessage(message);
        expect(ruleParser.parseRules).toHaveBeenCalled();
        expect(callback).toHaveBeenCalled();
    });
});