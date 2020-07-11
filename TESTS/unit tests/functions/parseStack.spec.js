import {describe, expect} from "@jest/globals"
import Block from "../../../src/classes/Block.js";
import CollisionStack from "../../../src/classes/CollisionStack.js";
import parseStack from "../../../src/helperFunctions/parseStack.js";

const STOP = "STOP";
const MOVE = "MOVE";

function makeBlock ( type ){
    let block = new Block(1,1,"block","block");
    block[type]=true;
    return block;
}

describe("Parse Stack Spec",()=>{
    // ACT
    let C = "canCollide";
    let T = "canTouch";
    let S = "strictCollide";

    describe("Should be something of a finite state",()=>{
        let tests = [
            [[],MOVE      ,0,[]],
            [[S],STOP     ,0,[[1,1]]],
            [[T],MOVE     ,1,[[1,1]]],
            [[C],MOVE     ,1,[[1,1]]],
            [[C,S],STOP   ,0,[[1,1],[1,2]]],
            [[C,C],MOVE   ,2,[[1,1],[1,2]]],
            [[C,T],MOVE   ,2,[[1,1],[1,2]]],
            [[T,T],MOVE   ,1,[[1,1],[1,2]]],
            [[T,C],MOVE   ,1,[[1,1],[1,2]]],
            [[T,S],MOVE   ,1,[[1,1],[1,2]]],
            [[S,S,S],STOP ,0,[[1,1],[1,2],[1,3]]],
            [[C,C,C],MOVE ,3,[[1,1],[1,2],[1,3]]],
            [[C,C,S],STOP ,0,[[1,1],[1,2],[1,3]]],
            [[C,T,S],MOVE ,2,[[1,1],[1,2],[1,3]]],
            [[C,T,C],MOVE ,2,[[1,1],[1,2],[1,3]]],
            [[C,C,T],MOVE ,3,[[1,1],[1,2],[1,3]]],
            [[T,T],MOVE   ,1,[[1,1],[1,2]]],
            [[T,S],MOVE   ,1,[[1,1],[1,2]]]
        ];
        test.each(tests)(" %p  expect -> command: %s , move: %i ",(names,cmd,toMv,positions)=>{
            let stack = new CollisionStack();
            names
            .map((name,index)=>makeBlock(name,positions[index][0],positions[index][1]))
            .forEach(entity=>stack.add(entity));

            const {command,toMove} = parseStack(stack);
            expect(command).toEqual(cmd);
            expect(toMove).toEqual(toMv);

        })
/*
[T|C]      => MOVE 2
[T|C] -> S => STOP 0
 */
    })
});