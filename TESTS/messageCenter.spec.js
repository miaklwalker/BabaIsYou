import {describe,expect,test,jest} from "@jest/globals";
import makeUniqueId from "../src/helperFunctions/MakeID.js";
import MessageCenter from "../src/classes/MessageCenter.js";

    const testMessageCenter = new MessageCenter();
    describe('Message Center Should Call update',()=>{
        const id = 123123124124;
        const update = (...args) => {};
        const entity = {
            id,
            onMessage:jest.fn(update),
        };

        testMessageCenter.subscribe(entity);
        expect(testMessageCenter.recipients).toHaveLength(1);
        testMessageCenter.messages.push('test');
        testMessageCenter.update();
        expect(entity.onMessage).toHaveBeenCalledWith('test');
        testMessageCenter.unsubscribe(id);
        expect(testMessageCenter.recipients).toHaveLength(0)
    });
    describe('Purge Should remove all messages and recipients',()=>{
        function listenerFactory(){
            return {
                id:Math.floor(Math.random() * 999),
                onMessage(args){
                    console.log(args)
                }
            }
        }
        test('expect purge to remove all',()=>{
                Array(5)
                .fill(0)
                .map( slot => listenerFactory())
                .forEach(listener=>testMessageCenter.subscribe(listener));
            expect(testMessageCenter.recipients).toHaveLength(5);
            testMessageCenter.purge();
            expect(testMessageCenter.recipients).toHaveLength(0)
        })
    });