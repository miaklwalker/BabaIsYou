import Test from "../testLibrary/modules/Test.js";
import makeUniqueId from "../src/helperFunctions/MakeID.js";
import Mock from "../testLibrary/modules/Mock.js";
import MessageCenter from "../src/classes/MessageCenter.js";
import expect from "../testLibrary/modules/Expect.js";
import {describe} from "../testLibrary/modules/TestRunner.js";

export default Test(()=>{
    const testMessageCenter = new MessageCenter();
    describe('Message Center Should Call update',()=>{
        const id = 123123124124;
        const update = (...args) => {};
        const mockUpdate = Mock.fn(update);
        const entity = {
            id,
            onMessage:mockUpdate,
        };
        testMessageCenter.subscribe(entity);
        testMessageCenter.messages.push('test');
        testMessageCenter.update();
        expect(testMessageCenter.recipients).toHaveLength(1);
        expect(mockUpdate).toHaveBeenCalled();
        expect(mockUpdate).toHaveBeenCalledWith('test');
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
        let listenerArray = Array(5)
            .fill(0)
            .map( slot => listenerFactory())
            .forEach(listener=>testMessageCenter.subscribe(listener));
            expect(testMessageCenter.recipients).toHaveLength(5);
        testMessageCenter.purge();
            expect(testMessageCenter.recipients).toHaveLength(0)

    })
})