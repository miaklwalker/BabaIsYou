import {describe,expect,test,jest} from "@jest/globals";
import Block from "../../../src/classes/Block.js";
import Vector from "../../../src/classes/Vector.js";
import NounBlock from "../../../src/classes/Blocks/NounBlock.js";
import OperatorBlock from "../../../src/classes/Blocks/OperatorBlock.js";
import PropertyBlock from "../../../src/classes/Blocks/PropertyBlock.js";
import SpriteBlock from "../../../src/classes/Blocks/spriteBlock.js";
import blockFactory from "../../../src/helperFunctions/blockFactory.js";
import Tile from "../../../src/classes/Blocks/Tile.js";
import Wall from "../../../src/classes/Blocks/Wall.js";


describe('Block Class',()=>{
    describe('Base Block Class',()=>{
        const block = new Block(1,1,'frank','WALL');

        test('that block has properties',()=>{
            expect(block.position).toBeInstanceOf(Vector);
            expect(block.id).toHaveLength(12);
            expect(block.name).toBe('frank');
            expect(block.type).toBe('WALL');
            expect(block.neighbors).toEqual({
                left:false,
                right:false,
                up:false,
                down:false
            });
            expect(block.strictCollide).toBe(false);
            expect(block.canTouch).toBe(false);
            expect(block.canCollide).toBe(false);
        });

        describe('When the draw method is called Block returns',()=>{
            let drawCall = block.draw();
            test('Its position as in the first two indices',()=>{
                expect(drawCall[0]).toBe(block.position.x);
                expect(drawCall[1]).toBe(block.position.y);
            });
            test('Its name in the third indices',()=>{
               expect(drawCall[2]).toBe(block.name);
            });
            test('Its Group in the fourth indices',()=>{
                expect(drawCall[3]).toBe(block.group);
            });
            test('Its Type to be in the fifth indices',()=>{
                expect(drawCall[4]).toBe(block.type);
            });
            test(`It's alias to be in the sixth indices`,()=>{
                expect(drawCall[5]).toBe(block.alias);
            })
        });

        describe('Test Block Traits',()=>{
            let trait = {
                update:jest.fn(),
            };
            test('Add trait should add a trait to ownTraits',()=>{
                block.addTrait(trait);
                expect(block.traits).toHaveLength(1);
            });
            test('Should Call All Own Traits when updated',()=>{
                block.onMessage('Hello From Test');
                expect(trait.update).toHaveBeenCalled();
                expect(trait.update).toHaveBeenCalledWith(block,'Hello From Test')
            });
        });

        test('isNeighbor should return true if block isNeighboring',()=>{
           let otherBlock = new Block(1,2);
           let anotherBlock = new Block(10,10);
           expect(block.isNeighbor(otherBlock)).toBe(true);
           expect(block.isNeighbor(anotherBlock)).not.toBe(true);
        });

        test('Check Neighbors should return what side a object is',()=>{
            let otherBlock = new Block(1,2);
            let expected = [false,true,false,false];
            expect(block.checkNeighbors(otherBlock)).toEqual(expect.arrayContaining(expected));
        });

        test('updateAndFindNeighbors',()=>{
            let blockL = new Block(0,1);
            let blockR = new Block(2,1);
            let blockU = new Block(1,0);
            let blockD = new Block(1,2);

            let others = [blockD,blockL,blockR,blockU];
            block.checkNeighbors = jest.fn(block.checkNeighbors);
            let check = block.updateAndFindNeighbors(others);
            expect(block.checkNeighbors).toBeCalledTimes(4);
            expect(check).toEqual({
                left:blockL,
                right:blockR,
                up:blockU,
                down:blockD,
            });
            expect(block.neighbors).toEqual({
                left:true,
                right:true,
                up:true,
                down:true,
            })

        })


    });

    describe('Sprite Block',()=>{
        let testBlock = new SpriteBlock(1,1,'FRANK');
        test('sprite block draw Method',()=>{
            testBlock.id = 'FRANK';
            testBlock.draw = jest.fn(testBlock.draw);
            testBlock.draw();
            const{position:{x,y},name,group,type,alias,action,direction}=testBlock;
            expect(testBlock.draw).toHaveReturnedWith([x,y,name,group,type,alias,direction,action])
        });
        test('Sprite Block update method',()=>{
            let testMessage = {
                to:"YOU",
                from:'controls',
                data:{
                    action:'run',
                    direction:'right'
                }
            };
            testBlock.YOU = true;
            testBlock.onMessage(testMessage);
            expect(testBlock.direction).toBe('right');
            expect(testBlock.action).toBe('run');
        })


    });
    describe('Wall Block',()=>{
        let block = new Wall(1,1,'WALL');
        test('ChooseName',()=>{
            let others = [
                new Wall(1,2,"WALL"),
                new Wall(0,1,"WALL"),
                new Wall(2,1,"WALL"),
                new Wall(1,0,"WALL"),
            ];
            block.checkNeighbors = jest.fn(block.checkNeighbors);
            block.chooseName(others);
            expect(block.checkNeighbors).toBeCalledTimes(4);
            expect(block.neighbors).toEqual({
                left:true,
                right:true,
                up:true,
                down:true,
            });
            expect(block.alias).toBe('fourWay');
        })
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
});


