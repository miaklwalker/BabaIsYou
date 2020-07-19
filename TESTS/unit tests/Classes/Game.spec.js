import {describe,expect,test,jest} from "@jest/globals";
import MasterList from "../../../src/classes/MasterList.js";
import Game from "../../../src/classes/Game.js";
import Timer from "../../../src/classes/Timer.js";
import EntityList from "../../../src/classes/EntityList.js";
import Renderer from "../../../src/classes/Renderer.js";
import Entity from "../../../src/classes/Entity.js";

describe('Game',()=>{
    let masterlist = new MasterList();
    let game = new Game (masterlist);
    describe('Game Constructor', () => {
        test("Properties",()=>{
            expect(game.timer).toEqual(expect.any(Timer));
            expect(game.gridDiminsions).toEqual(expect.any(Number));
            expect(game.masterList).toEqual(masterlist);
            expect(game.topLevel).toEqual(expect.any(EntityList));
            expect(game.backGround).toEqual(expect.any(EntityList));
            expect(game.renderer).toEqual(expect.any(Renderer));
        })
    });
});