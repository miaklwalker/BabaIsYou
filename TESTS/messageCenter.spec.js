import Test from "../testLibrary/modules/Test.js";
import makeUniqueId from "../src/helperFunctions/MakeID.js";
import Mock from "../testLibrary/modules/Mock.js";
import MessageCenter from "../src/classes/MessageCenter.js";
import expect from "../testLibrary/modules/Expect.js";
import {describe} from "../testLibrary/modules/TestRunner.js";

export default Test(()=>{
    describe('Message Center',()=>{
        const id = 123123124124
        const update = (...args) => {};
        const mockUpdate = Mock.fn(update);
        const entity = {
            id,
            onMessage:mockUpdate,
        };
        const testMessageCenter = new MessageCenter();
        testMessageCenter.subscribe(entity);
        testMessageCenter.messages.push('test');
        testMessageCenter.update();
        expect(testMessageCenter.recipients).toHaveLength(1);
        expect(mockUpdate).toHaveBeenCalled();
        expect(mockUpdate).toHaveBeenCalledWith('test');
        testMessageCenter.unsubscribe(id);
        expect(testMessageCenter.recipients).toHaveLength(0)
    })
})