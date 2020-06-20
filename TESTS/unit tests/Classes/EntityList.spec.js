import {describe,expect,test} from "@jest/globals";
import EntityList from "../../../src/classes/EntityList.js";

describe('EntityList',()=>{
    let game = {
        gridDiminsions:[20,20],
    };
    let entityList = new EntityList(game);
    test('Add Entity should add an entity',()=>{
        let entity = {
            id:1223
        };
        entityList.addEntity(entity);
        expect(entityList.entities).toHaveLength(1);
    });
    test('Remove Entity should remove an entity with matching ID',()=>{
        entityList.removeEntity(1223);
        expect(entityList.entities).toHaveLength(0)
    });
    test('Purge should remove all entities',()=>{
        let entities = Array(9).fill((()=>({}))());
        entities.forEach(entity=>{
            entityList.addEntity(entity);
        });
        expect(entityList.entities).toHaveLength(9);
        entityList.purge();
        expect(entityList.entities).toHaveLength(0);
    });


    test('Divisions should return the current levels layout',()=>{
        expect(entityList.divisions).toEqual([20,20]);
    });

    test.todo(' The render method should update frame count and render all entities');
    test.todo(' makeTextures');


});