import {describe,expect,test,jest,it} from "@jest/globals";
import Collider from "../../../src/classes/Collider.js";
import Block from "../../../src/classes/Block.js";
import SpriteBlock from "../../../src/classes/Blocks/spriteBlock.js";
import You from "../../../src/classes/Traits/You.js";

describe(`Collider Class Spec`,()=>{
    let collider = new Collider();
    describe("Collider.getCollision Pool",()=>{
        it("Returns back all entities that can collide",()=>{
            let entityOne = new Block(1,1,"WALL","BLOCK");
            entityOne.canCollide = true;

            let entityTwo = new Block(1,2,"WALL","BLOCK");
            entityTwo.strictCollide = true;

            let entityThree = new Block(1,3,"TILE","TILE");
            entityThree.canTouch = true;

            let entityFour = new Block(1,4,"WALL","BLOCK");

            let entities = [entityTwo,entityOne,entityThree,entityFour];

            let collidePool = collider.getCollisionPool(entities);

            expect(collidePool).toHaveLength(3);
            expect(collidePool).toEqual(
                    expect.arrayContaining(
                            [
                                entityOne,
                                entityTwo,
                                entityThree
                            ]
                    )
            )
        })
    });

    describe.skip(`Collider.update `,()=>{
        let canTouch = block => block.canTouch = true;
        let canCollide = block => block.canCollide = true;
        let strictCollide = block => block.strictCollide = true;

        let actor = new Block(1,1,"BABA","Sprite");
        actor.addTrait(new You());
        let tile = new Block(1,2,"TILE","TILE");
        let wall = new Block(1,3,"WALL","WALL");
        let rock = new Block(1,4,"ROCK","TILE");




    })




});


