import {describe, expect, test, jest, beforeEach} from "@jest/globals";
import RuleParser from "../../../src/classes/RuleParser.js";
import NounBlock from "../../../src/classes/Blocks/NounBlock.js";
import OperatorBlock from "../../../src/classes/Blocks/OperatorBlock.js";
import PropertyBlock from "../../../src/classes/Blocks/PropertyBlock.js";

describe('Rule Parser',()=>{
    let masterList,callback,ruleParser;
    beforeEach(()=>{
        masterList = {
            blocks:[],
            allOfFlags:jest.fn(),
        };
        callback = jest.fn();
        ruleParser =  new RuleParser(callback,masterList);
    });
    describe("Getter 'words' ",()=>{
        test("Should Call Masterlist.allOfFlags with isWord flag",()=>{
            ruleParser.words;
            expect(masterList.allOfFlags).toHaveBeenCalledWith("isWord")
        });
    });
    describe("makeRule",()=>{
        test("make rule should create a rule object and add it too the rules array",()=>{
            let name = 'BABA';
            let operator = 'IS';
            let property = 'YOU';
            let expected = {name,property,operator};
            ruleParser.makeRule(name,operator,property);
            expect(ruleParser.rules).toHaveLength(1);
            expect(ruleParser.rules[0]).toEqual(expected);
        })
    });
    describe("ParseRules",()=>{
        let noun, operator, property,expected;
        beforeEach(()=>{
            noun = new NounBlock(0,0,"BABA");
            operator = new OperatorBlock(1,0,"IS");
            property = new PropertyBlock(2,0,"YOU");
            expected = {name:noun,operator,property};
            masterList.blocks.push(noun,operator,property);
            masterList.allOfFlags.mockReturnValue([noun,operator,property]);
            ruleParser.makeRule = jest.fn(ruleParser.makeRule);
            ruleParser.parseRules();
        });
        test("Should call make rule with BABA , IS , YOU",()=>{
            expect(ruleParser.makeRule).toHaveBeenCalledWith(noun,operator,property);
        });
        test("That a new rule was added",()=>{
            expect(ruleParser.rules).toHaveLength(1);
        });
        test("The rule matches the expected output",()=>{
            expect(ruleParser.rules[0]).toEqual(expected);
        });
        test("Should call the updateAndFindMethodNeighbors method on is block",()=>{
            noun.updateAndFindNeighbors = jest.fn();
            operator.updateAndFindNeighbors = jest.fn(operator.updateAndFindNeighbors);
            ruleParser.parseRules();
            expect(noun.updateAndFindNeighbors).not.toHaveBeenCalled();
            expect(operator.updateAndFindNeighbors).toHaveBeenCalled();

        })

    });
    describe("onMessage",()=>{
        test("Should call parseRules and callback",()=>{
            let message = {
                from:"controls",
            };
            ruleParser.parseRules = jest.fn();
            ruleParser.onMessage(message);
            expect(ruleParser.parseRules).toHaveBeenCalled();
            expect(callback).toHaveBeenCalled();
        });
        test("Should NOT call parseRules and callback",()=>{
            let message = {
                from:"collision",
            };
            ruleParser.parseRules = jest.fn();
            ruleParser.onMessage(message);
            expect(ruleParser.parseRules).not.toHaveBeenCalled();
            expect(callback).not.toHaveBeenCalled();
        })
    })
});