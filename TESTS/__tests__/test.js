import {describe} from '../components/Describe.js';
import testRunner from '../components/TestRunner.js';
import expect from '../components/Expect.js';
import buildTexturePack from "../../src/helperFunctions/buildTexturePack.js";
import Block from '../../src/classes/Block.js';
import Vector from '../../src/classes/Vector.js';
import getColorCoords from '../../src/helperFunctions/getColorCoords.js';
import Mock from '../components/Mock.js';
import MessageCenter from '../../src/classes/MessageCenter.js'
import makeUniqueId from '../../src/helperFunctions/MakeID.js';
import traitFactory from "../../src/helperFunctions/traitFactory.js";
import You from "../../src/classes/Traits/You.js";

describe('getColorCordinates',

expect(getColorCoords(488,24,0)).toMatchArray([488,24,8,8]),
expect(getColorCoords(488,24,1)).toMatchArray([496,24,8,8]),
expect(getColorCoords(488,24,6)).toMatchArray([536,24,8,8]),
expect(getColorCoords(488,24,7)).toMatchArray([488,32,8,8]),
expect(getColorCoords(488,24,14)).toMatchArray([488,40,8,8]),
expect(getColorCoords(488,24,21)).toMatchArray([488,48,8,8]),
expect(getColorCoords(488,24,28)).toMatchArray([488,56,8,8]),
expect(getColorCoords(488,24,34)).toMatchArray([536,56,8,8]),

);

describe('buildTexturePack',

expect(buildTexturePack(384,1512,0,0).single[0]).toEqual({x:384,y:1512,width:24,height:24}),
expect(buildTexturePack(384,1512,0,9).single[0]).toEqual({x:384,y:1516.5,width:24,height:15})

);

const block = new Block(1,1);

describe('Block Class',

expect(block).toBeInstanceOf(Block),
expect(block.position).toBeInstanceOf(Vector),
expect(block.draw()).toMatchArray([1,1]),

);
const id = makeUniqueId(12);
const update = (...args) => console.log(args);
const mockUpdate = Mock.fn(update);
const entity = {
    id,
    onMessage:mockUpdate,
};
const testMessageCenter = new MessageCenter();
testMessageCenter.subscribe(entity);
testMessageCenter.messages.push('test');
testMessageCenter.update();

describe('Message Center',

expect(testMessageCenter.recipients).toHaveLength(1),
expect(mockUpdate).toHaveBeenCalled(),
expect(mockUpdate).toHaveBeenCalledWith('test'),

);
testMessageCenter.unsubscribe(id);
describe('Message Center unsubscribe',
expect(testMessageCenter.recipients).toHaveLength(0),
);


describe('Trait Factory',
    expect(traitFactory('YOU')).toBeInstanceOf(You)
);


export default function runTests(){
    return testRunner();
}