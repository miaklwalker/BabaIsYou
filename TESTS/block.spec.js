import {describe,expect,test,jest} from "@jest/globals";
import Block from "../src/classes/Block.js";
import Vector from "../src/classes/Vector.js";
import NounBlock from "../src/classes/Blocks/NounBlock.js";
import OperatorBlock from "../src/classes/Blocks/OperatorBlock.js";
import PropertyBlock from "../src/classes/Blocks/PropertyBlock.js";
import SpriteBlock from "../src/classes/Blocks/spriteBlock.js";
import blockFactory from "../src/helperFunctions/blockFactory.js";
import Tile from "../src/classes/Blocks/Tile.js";
import Wall from "../src/classes/Blocks/Wall.js";



    describe('Block Class',()=>{
        test('that block has properties',()=>{
            const block = new Block(1,1);
            block.draw = jest.fn(block.draw)
            expect(block).toBeInstanceOf(Block);
            expect(block.position).toBeInstanceOf(Vector);
            block.draw();
            expect(block.draw).toHaveReturnedWith([1,1])
        })


    });
    describe('Noun Block',()=>{
        let testBlock = new NounBlock(1,1,'FRANK');
        testBlock.id = 'FRANK';
        testBlock.draw = jest.fn(testBlock.draw);
        testBlock.draw()
        expect(testBlock.draw).toHaveReturnedWith([1,1,'FRANK','words','noun','FRANK'])
    });
    describe('Operator Block',()=>{
        let testBlock = new OperatorBlock(1,1,'FRANK');
        testBlock.id = 'FRANK';
        testBlock.draw = jest.fn(testBlock.draw);
        testBlock.draw()
        expect(testBlock.draw).toHaveReturnedWith([1,1,'FRANK','words','operators','FRANK'])
    });
    describe('Property Block',()=>{
        let testBlock = new PropertyBlock(1,1,'FRANK');
        testBlock.id = 'FRANK';
        testBlock.draw = jest.fn(testBlock.draw);
        testBlock.draw()
        expect(testBlock.draw).toHaveReturnedWith([1,1,'FRANK','words','properties','FRANK'])
    });
    describe('Sprite Block',()=>{
        let testBlock = new SpriteBlock(1,1,'FRANK');
        testBlock.id = 'FRANK';
        testBlock.draw = jest.fn(testBlock.draw);
        testBlock.draw()
        expect(testBlock.draw).toHaveReturnedWith([1,1,'FRANK','sprites','sprites','FRANK','right','idle'])
    });
    describe('Block Factory',()=>{
        let sprite = [1,1,'FRANK'];
        let nouns = blockFactory('nouns',sprite);
        let operators = blockFactory('operators',sprite);
        let properties = blockFactory('properties',sprite);
        let tiles = blockFactory('tiles',sprite);
        let sprites = blockFactory('sprites',sprite);
        let walls = blockFactory('wall',sprite);
        expect(nouns).toBeInstanceOf(NounBlock);
        expect(operators).toBeInstanceOf(OperatorBlock);
        expect(properties).toBeInstanceOf(PropertyBlock);
        expect(tiles).toBeInstanceOf(Tile);
        expect(sprites).toBeInstanceOf(SpriteBlock);
        expect(walls).toBeInstanceOf(Wall)
    });

