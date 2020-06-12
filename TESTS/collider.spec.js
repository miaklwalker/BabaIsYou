import {describe,expect,test,jest} from "@jest/globals";
import Collider from "../src/classes/Collider.js";
import Block from "../src/classes/Block.js";


describe('Collider Spec',()=>{
    let collider = new Collider();

    collider.addMessage = jest.fn((message)=>{});

    let baba = new Block(1,1,'BABA','SPRITE');
    baba.YOU = true;

    let wall = new Block(1,2,'WALL','WALL');
    wall.canCollide = true;

    let entityOther = [baba,wall];

    baba.updateAndFindNeighbors = jest.fn(baba.updateAndFindNeighbors);
    wall.updateAndFindNeighbors = jest.fn(wall.updateAndFindNeighbors);

    test('Collider Should call add message',()=>{
        collider.update(entityOther,'down');
        expect(collider.addMessage).toHaveBeenCalled();
    });

    test('It should call the updateAndFindNeighbor routine on non-YOU-blocks',()=>{
        collider.update(entityOther,'down');
        expect(baba.updateAndFindNeighbors).not.toHaveBeenCalled();
        expect(wall.updateAndFindNeighbors).toHaveBeenCalled();
    });


})
