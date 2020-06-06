import test from "../testLibrary/modules/Test.js";
import Collider from "../src/classes/Collider.js";
import Mock from "../testLibrary/modules/Mock.js";
import Vector from "../src/classes/Vector.js";
import {describe} from "../testLibrary/modules/TestRunner.js";
import expect from "../testLibrary/modules/Expect.js";
import Block from "../src/classes/Block.js";


export default test(()=>{
    let collider = new Collider();

    collider.addMessage = Mock.fn((message)=>{
        console.log(message);
    });

    let baba = new Block(1,1,'BABA','SPRITE');
    baba.YOU = true;

    let wall = new Block(1,2,'WALL','WALL');
    wall.canCollide = true;

    let entityOther = [baba,wall];

    baba.updateAndFindNeighbors = Mock.fn(baba.updateAndFindNeighbors);
    wall.updateAndFindNeighbors = Mock.fn(wall.updateAndFindNeighbors);
    describe('Collider Should call add message',()=>{
        collider.update(entityOther,'down');
        expect(collider.addMessage).toHaveBeenCalled();
    });

    describe('It should call the updateAndFindNeighbor routine on non-YOU-blocks',()=>{
        collider.update(entityOther,'down');
        expect(baba.updateAndFindNeighbors).not.toHaveBeenCalled();
        expect(wall.updateAndFindNeighbors).toHaveBeenCalled();
    })
})