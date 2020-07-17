import {describe, expect, test, jest, beforeEach} from "@jest/globals";
import MovementParser from "../../../src/classes/MovementParser.js";
import Block from "../../../src/classes/Block.js";

describe('Movement Parser',()=>{
    let masterList,movementParser;
    beforeEach(()=>{
       masterList = {
           Blocks:[],
           allOfFlags: jest.fn()
       };
       movementParser = new MovementParser(masterList);
    });
    describe("getBlocksWithCollision",()=>{
        test("allOfFlags is called with useCollision",()=>{
            movementParser.getBlocksWithCollision();
            expect(masterList.allOfFlags)
                .toHaveBeenCalledWith("useCollision");
        })

    });
    describe("parseFromControls",()=>{
        test(" Calls Send Message with msg and entities",()=>{
            masterList.allOfFlags.mockReturnValue("Test Value");
            movementParser.sendMessage = jest.fn();
            movementParser.parseFromControls("Test Message");
            expect(movementParser.sendMessage)
                .toHaveBeenCalledWith(
                    'collision',
                    'parser',
                    {
                        entities:"Test Value",
                        msg:"Test Message"
                    }
                )
        })
    });
    describe("handleNoCollision",()=>{
        let candidates = [
            new Block(1,1,"BABA"),
        ];
        let direction = "left";
        let id = candidates[0].id;
        test("Should call the sendMessage Method once for each candidate",()=>{
            movementParser.sendMessage = jest.fn();
            movementParser.handleNoCollisions(candidates,direction);
            expect(movementParser.sendMessage).toHaveBeenCalledTimes(1);
        });
        test("Should be sent the entityID and include the direction",()=>{
            movementParser.sendMessage = jest.fn();
            movementParser.handleNoCollisions(candidates,direction);
            expect(movementParser.sendMessage).toHaveBeenCalledWith(id,'parser',{direction:"left"},false);
        })
    });
    describe("handleStop",()=>{
        test("Should call send message",()=>{
            movementParser.sendMessage = jest.fn(movementParser.sendMessage);
            movementParser.handleStop();
            expect(movementParser.sendMessage)
                .toHaveBeenCalledWith(
                    'controls',
                    'parser',
                    'finished'
                );
        });
    });
    describe("handleMessageFromCollider",()=>{
        let message;
        beforeEach(()=>{
            message = {
                data: {
                    results: [],
                    candidates: [],
                    direction: [],
                    overlaps: [],
                }
            };
        });
        test("Overlaps are automatically marked overlaps",()=>{
           let blockA = new Block(1,1,"FLAG");
           message.data.overlaps.push(blockA);
           movementParser.handleMessageFromCollider(message)
           expect(blockA.overlap).toBe(true);
        });
        test("Results Should get marked overlap",()=>{
            let blockA = new Block(1,1,"BABA");
            let blockB = new Block(1,1,"WALL");
            message.data.results.push(blockA,blockB);
            movementParser.handleMessageFromCollider(message);
            expect(blockA.overlap).toBe(true);
            expect(blockB.overlap).toBe(true);
        });
        test("If BlockA is overlap and blockB is result should still overlap",()=>{
            let blockA = new Block(1,1,"BABA");
            let blockB = new Block(1,1,"WALL");
            message.data.results.push(blockA);
            message.data.overlaps.push(blockB);
            movementParser.handleMessageFromCollider(message);
            expect(blockA.overlap).toBe(true);
            expect(blockB.overlap).toBe(true);
        })
        test("results.length = 0 handleNoStop",()=>{
            movementParser.handleStop = jest.fn(movementParser.handleStop);
            movementParser.handleMessageFromCollider(message);
            expect(movementParser.handleStop).toHaveBeenCalled();
        });
        test.todo("Need to test the else case")
    });
});