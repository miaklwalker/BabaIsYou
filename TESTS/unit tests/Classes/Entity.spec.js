import {beforeEach, describe, expect, test, jest} from "@jest/globals";
import Entity from "../../../src/classes/Entity.js";
import Block from "../../../src/classes/Block.js";
import Wall from "../../../src/classes/Blocks/Wall.js";


describe('Entity Class Spec', ()=> {
    describe('Entity Constructor', () => {
        // Block Can Be Anything, Entity just provides an interface
        // for the the system
            let block = {};
            let entity = new Entity(block);
            test("Should contain a reference to the original block",()=>{
                expect(entity.block).toEqual(block);
            });
            test("Flags",()=>{
                 expect(entity.isWord).toBe(false);
                 expect(entity.isTopLevel).toBe(false);
                 expect(entity.isForeground).toBe(false);
                 expect(entity.isRendered).toBe(true);
                 expect(entity.useMessage).toBe(true);
                 expect(entity.useCollision).toBe(true);
                 expect(entity.useRules).toBe(true);
            })

        });
    describe('changeBlockType', () => {
        // If the isWord flag is false;
        //      The Entity should make a whole new block and assign it
        //      too its internal block reference
        test("Should make block into a Wall Block",()=>{
            let block = new Block(1,1,"WALL");
            let entity = new Entity(block);
            entity.changeBlockType("WALL");
            expect(entity.block).not.toEqual(block);
            expect(entity.block).toEqual(expect.any(Wall));
            expect(entity.block.position.same(block.position)).toBe(true);
        })
    });
    describe('Get id', () => {
        test("If no id then make and assign one",()=>{
            let block = {};
            let entity = new Entity(block);
            let id = entity.id;
            expect(id).not.toBeUndefined();
        });
        test("if it does have an id then return it",()=>{
            let id = "test";
            let block = {id};
            let entity = new Entity(block);
            expect(entity.id).toBe(id);
        })

    });
    describe("onMessage",()=>{
        let block = {
            onMessage:jest.fn(),
        };
        let entity = new Entity(block);
        let message = "TEST";
        entity.onMessage(message);
        expect(entity.block.onMessage)
            .toHaveBeenCalledWith(message);

    });
    describe('strategy', () => {
        let block = {strategy:"TEST"};
        let entity = new Entity(block);
        expect(entity.strategy).toBe(block.strategy);
    });
});