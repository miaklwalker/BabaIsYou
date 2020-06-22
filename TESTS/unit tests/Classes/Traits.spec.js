import {describe, expect, test, jest, beforeEach, afterEach, beforeAll} from "@jest/globals";
import You from "../../../src/classes/Traits/You.js";
import Stop from "../../../src/classes/Traits/Stop.js";
import Push from "../../../src/classes/Traits/Push.js";
import Win from "../../../src/classes/Traits/Win.js";
import Defeat from "../../../src/classes/Traits/Defeat.js";
import Float from "../../../src/classes/Traits/Float.js";
import Hot from "../../../src/classes/Traits/Hot.js";
import Melt from "../../../src/classes/Traits/Melt.js";
import More from "../../../src/classes/Traits/More.js";
import Move from "../../../src/classes/Traits/Move.js";
import Open from "../../../src/classes/Traits/Open.js";
import Pull from "../../../src/classes/Traits/Pull.js";
import Shut from "../../../src/classes/Traits/Shut.js";
import Sink from "../../../src/classes/Traits/Sink.js";
import Tele from "../../../src/classes/Traits/Tele.js";
import Weak from "../../../src/classes/Traits/Weak.js";
import SpriteBlock from "../../../src/classes/Blocks/spriteBlock.js";
import MessageCenter from "../../../src/classes/MessageCenter.js";
import Message from "../../../src/classes/Message.js";
import addMessage from "../../../src/CustomEvents/addmessage.js";

describe('Traits',()=>{
    let messageCenter,id,sprite;
    messageCenter = new MessageCenter();
    sprite = new SpriteBlock(1,1,"BABA");
    messageCenter.subscribe(sprite);
    id = sprite.id;

    describe( 'YOU',()=>{
        beforeEach(()=>{
            messageCenter = new MessageCenter();
            sprite = new SpriteBlock(1,1,"BABA");
            messageCenter.subscribe(sprite);
            id = sprite.id;
            sprite.addTrait(new You())
        });
        test('Right',()=>{
            messageCenter.messages.push(new Message(id,'test',{direction:'right'}));
            messageCenter.update();
            expect(sprite.position.x).toBe(2);
        });
        test('Left',()=>{
            messageCenter.messages.push(new Message(id,'test',{direction:'left'}));
            messageCenter.update();
            expect(sprite.position.x).toBe(0);
        });
        test('Up',()=>{
            messageCenter.messages.push(new Message(id,'test',{direction:'up'}));
            messageCenter.update();
            expect(sprite.position.y).toBe(0);
        });
        test('Down',()=>{
            messageCenter.messages.push(new Message(id,'test',{direction:'down'}));
            messageCenter.update();
            expect(sprite.position.y).toBe(2);
        })
    });
    describe('STOP',()=>{
        sprite.addTrait(new Stop());
        messageCenter.messages.push(new Message(id,'test','test'));
        messageCenter.update();
        expect(sprite.strictCollide).toBe(true);
    });
    describe( 'PUSH',()=>{
        beforeEach(()=>{
            messageCenter = new MessageCenter();
            sprite = new SpriteBlock(1,1,"BABA");
            messageCenter.subscribe(sprite);
            id = sprite.id;
            sprite.addTrait(new Push())
        });
        test('Right',()=>{
            messageCenter.messages.push(new Message(id,'test',{direction:'right'}));
            messageCenter.update();
            expect(sprite.position.x).toBe(2);
        });
        test('Left',()=>{
            messageCenter.messages.push(new Message(id,'test',{direction:'left'}));
            messageCenter.update();
            expect(sprite.position.x).toBe(0);
        });
        test('Up',()=>{
            messageCenter.messages.push(new Message(id,'test',{direction:'up'}));
            messageCenter.update();
            expect(sprite.position.y).toBe(0);
        });
        test('Down',()=>{
            messageCenter.messages.push(new Message(id,'test',{direction:'down'}));
            messageCenter.update();
            expect(sprite.position.y).toBe(2);
        })
    });
    describe('WIN',()=>{
        sprite.addTrait(new Win());
        messageCenter.handleAddMessage = jest.fn(messageCenter.handleAddMessage);
        document.addEventListener('addmessage',messageCenter.handleAddMessage);
        let candidate = [new SpriteBlock(2,1,"FRANK")];
        let messageData = {
            msg:{
                data:{
                    candidates:candidate
                }
            }
        };
        document.dispatchEvent(addMessage(new Message(id,'test',messageData)));
        messageCenter.update();
        messageCenter.update();
        expect(messageCenter.handleAddMessage).toHaveBeenCalledTimes(2);
    })
    // test('WIN',()=>{});
    // test( 'DEFEAT',()=>{});
    // test( 'FLOAT',()=>{});
    // test( 'HOT',()=>{});
    // test( 'MELT',()=>{});
    // test( 'MORE',()=>{});
    // test( 'MOVE',()=>{});
    // test( 'OPEN',()=>{});
    // test( 'PULL',()=>{});
    // test( 'SHUT',()=>{});
    // test( 'SINK',()=>{});
    // test( 'TELE',()=>{});
    // test( 'WEAK',()=>{});
});