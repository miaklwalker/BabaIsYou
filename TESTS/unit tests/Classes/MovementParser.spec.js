import {describe, expect, test, jest, beforeEach} from "@jest/globals";
import MovementParser from "../../../src/classes/MovementParser.js";

describe('Movement Parser',()=>{
    let movementParser = new MovementParser();
    beforeEach(()=>{
        movementParser = new MovementParser();
    });
    describe('Testing onMessage',()=>{
        // There are 5 happy paths to test
        // from controls
        // from collider
        // - with no collisions
        // - with a block containing a stop
        // - collisions with no stop
    test('From controls path',()=>{
        let msg = {
            to:'parser',
            from:'controls',
            data:{
                action:'run'
            }
        };
        movementParser.parseFromControls = jest.fn(movementParser.parseFromControls);
        let executionContext =  {
            dispatchEvent:jest.fn(),
        };
        movementParser.onMessage(msg,executionContext);
        expect(movementParser.parseFromControls).toHaveBeenCalledWith(msg,executionContext);
        expect(executionContext.dispatchEvent).toHaveBeenCalled();
        })
    });

    test('Purge Should remove all entities from movement parser',()=>{
        movementParser.entities.push({foo:'Bar'});
        movementParser.purge()
        expect(movementParser.entities).toHaveLength(0);

    });

    test('Remove entity should remove a specified entity from list',()=>{
        let entity = {
            id:1013,
        };
        movementParser.entities.push(entity);
        movementParser.removeEntity(1013);
        expect(movementParser.entities).toHaveLength(0);
    });
});