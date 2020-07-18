import {describe, expect, jest, it, beforeEach} from "@jest/globals";
import Block from "../../../src/classes/Block.js";
import Vector from "../../../src/classes/Vector.js";



describe("Block Class Spec",()=>{
    let x = 5;
    let y = 5; 
    let name = "BABA";
    let type = "Sprite";
    let block = new Block(x,y,name,type);
    beforeEach(()=>{
        block = new Block(x,y,name,type) 
    });
    describe("Constructor",()=>{
       it("Should produce an object with these traits",()=>{
         expect(block.name).toEqual(name);
         expect(block.type).toEqual(type);
         expect(block.position).toEqual(expect.any(Vector));
         expect(block.traits).toHaveLength(0);
         expect(block.id).toMatch(/([A-Z]{12})/g);
         expect(block.group).toBeNull();
         expect(block.alias).toBeNull();
         expect(block.strategy).toBeNull();
         expect(block.neighbors).toEqual({
            left:false,
            right:false,
            up:false,
            down:false
         });
         expect(block.strictCollide).toBeFalsy();
         expect(block.canCollide).toBeFalsy();
         expect(block.canTouch).toBeFalsy();
       })
    });
    describe("Draw Function",()=>{
        it("Should return an array of properties",()=>{
            let group = null;
            let alias = null;
            expect(block.draw()).toEqual(
                expect.arrayContaining([
                    x,y,name,group,type,alias
                ]))
        })
    });
    describe("Reset Flags",()=>{
        block.canCollide = true;
        block.strictCollide = true;
        block.canTouch = true;
        block.resetFlags();
        it("Should reset the blocks collision flags",()=>{
            expect(block.canCollide).toBeFalsy();
            expect(block.strictCollide).toBeFalsy();
            expect(block.canTouch).toBeFalsy();
        })
    });
    describe("Add Trait",()=>{
        it("Should add a trait to the block both by name and to the traits array",()=>{
            let trait = {
                NAME:"test",
                update:jest.fn()
            };
            block.addTrait(trait);
            expect(block.traits).toHaveLength(1);
        });
    });
    describe("On Message",()=>{
        let trait, message;
        beforeEach(()=>{
            block.resetFlags = jest.fn(block.resetFlags);
            trait = {
                NAME:"test",
                update:jest.fn()
            };
            block.addTrait(trait);
            message = "test";
            block.onMessage(message)
        });

        it("Should reset the blocks flags before messaging",()=>{
            expect(block.resetFlags).toHaveBeenCalled(); 
        });
        it("Should call each traits update method with itself and the message",()=>{
            expect(trait.update).toBeCalledWith(block,message)
        })
    });
    describe("Check Neighbors",()=>{
        let leftBlock = new Block(4,5,"BABA","SPRITE");
        let rightBlock = new Block(6,5,"BABA","SPRITE");
        let upBlock = new Block(5,4,"BABA","SPRITE");
        let downBlock = new Block(5,6,"BABA","SPRITE");
        let overlapBlock = new Block(5,5,"BABA","SPRITE");

        let data = [
            [leftBlock,[true,false,false,false,false]],
            [rightBlock,[false,false,true,false,false]],
            [upBlock,[false,false,false,true,false]],
            [downBlock,[false,true,false,false,false]],
            [overlapBlock,[false,false,false,false,true]]
            ];
        it.each(data)("Should Be able to check all four sides of the block",(blockToTest,results)=>{
            expect(block.checkNeighbors(blockToTest)).toEqual(results);
        })
    });
});