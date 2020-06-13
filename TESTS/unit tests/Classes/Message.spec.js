import {describe,expect,test,jest} from "@jest/globals";
import Message from "../../../src/classes/Message.js";

describe('Messge',()=>{
    test('Message Carries info for the project',()=>{
        let message = new Message('YOU','TEST','Hello From Test')
        expect(message.to).toBe('YOU');
        expect(message.from).toBe('TEST')
        expect(message.data).toBe('Hello From Test')
    });
});