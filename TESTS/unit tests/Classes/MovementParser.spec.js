import {describe, expect, test, jest, beforeEach} from "@jest/globals";
import MovementParser from "../../../src/classes/MovementParser.js";

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
    })
    test.todo(`
    handleNoCollision
    sendMessage
    handleStop
    handleMessageFromCollider
    notifyAll
    onMessage
    addEntity
    removeEntity
    `)

});