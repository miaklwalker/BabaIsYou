import {describe} from '../components/Describe.js';
import testRunner from '../components/TestRunner.js';
import expect from '../components/Expect.js';
import {getColorCoords} from "../../src/classes/Renderer.js";
import buildTexturePack from "../../src/helperFunctions/buildTexturePack.js";
import Block from '../../src/classes/Block.js';
import Vector from '../../src/classes/Vector.js';

describe('getColorCordinates',
expect(getColorCoords(488,24,0)).toMatchArray([488,24,8,8]),
expect(getColorCoords(488,24,1)).toMatchArray([496,24,8,8]),
expect(getColorCoords(488,24,6)).toMatchArray([536,24,8,8]),
expect(getColorCoords(488,24,7)).toMatchArray([488,32,8,8]),
expect(getColorCoords(488,24,14)).toMatchArray([488,40,8,8]),
expect(getColorCoords(488,24,21)).toMatchArray([488,48,8,8]),
expect(getColorCoords(488,24,28)).toMatchArray([488,56,8,8]),
expect(getColorCoords(488,24,34)).toMatchArray([536,56,8,8]),

)

describe('buildTexturePack',
expect(buildTexturePack(384,1512).single[0]).toEqual({x:384,y:1512,width:24,height:24})
)

const block = new Block(1,1);

describe('Block Class',
expect(block).toBeInstanceOf(Block),
expect(block.position).toBeInstanceOf(Vector),
expect(block.draw()).toMatchArray([1,1]),
)



export default function runTests(){
    return testRunner();
}