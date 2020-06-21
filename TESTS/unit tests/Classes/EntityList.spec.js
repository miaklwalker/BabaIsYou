import {describe,expect,test,jest} from "@jest/globals";
import EntityList from "../../../src/classes/EntityList.js";
import Sprite from "../../../src/classes/Sprite.js";
import SpriteBlock from "../../../src/classes/Blocks/spriteBlock.js";
import createContextMock from "../../__mocks__/context.mock.js";

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
    test('The render method should update frame count and render all entities',()=>{
        let spriteSheet = {
            spriteSheets: {
                sprites: {
                    BABA: {
                        animations:{
                            run:{
                                right:[
                                    new Sprite({x:0,y:0,w:24,h:24,name:'baba'},25),
                                    new Sprite({x:24,y:0,w:24,h:24,name:'baba'},25),
                                    new Sprite({x:48,y:0,w:24,h:24,name:'baba'},25),
                                ]
                            }
                        }
                    }
                }
            }
        }
        let baba = new SpriteBlock(1,1,"BABA");
        baba.action = 'run';
        entityList.addEntity(baba);
        let canvas = document.createElement('canvas');
        canvas.width = 480;
        canvas.height = 480;
        let context = createContextMock();
        let tint = jest.fn();
        let image = document.createElement('img');
        image.src = '../../../images/spritesheet.png';
        entityList.render(canvas,context,image,spriteSheet,tint);
        expect(entityList.frameCount).toBe(1);
        expect(tint).toHaveBeenCalled();
        expect(context.drawImage).toHaveBeenCalled()
    });
});