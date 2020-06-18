import {describe, expect, jest} from "@jest/globals";
import Controls from "../../src/classes/Controls.js";
import MovementParser from "../../src/classes/MovementParser.js";
import Collider from "../../src/classes/Collider.js";
import SpriteBlock from "../../src/classes/Blocks/spriteBlock.js";
import You from "../../src/classes/Traits/You.js";
import Wall from "../../src/classes/Blocks/Wall.js";
import Stop from "../../src/classes/Traits/Stop.js";
import MessageCenter from "../../src/classes/MessageCenter.js";
import Message from "../../src/classes/Message.js";

function simulateKeyPress(context,code){
    let keyEvent = new KeyboardEvent('keydown',{
        code
    });
    context.dispatchEvent(keyEvent);
}

describe('The Main Control Chain',()=>{
    // Setting the individual Components for the system
    let controls = new Controls();
    let messageCenter = new MessageCenter();
    let parser = new MovementParser();
    let collider = new Collider();

    // Setting up mocks for listeners
    let keydown = jest.fn(controls.keyDown);
    let keyup = jest.fn(controls.keyUp);
    let addMessage = jest.fn(messageCenter.handleAddMessage);

    // Setting up listeners
    document.addEventListener('keydown',keydown);
    document.addEventListener('keyup',keyup);
    document.addEventListener('addmessage',addMessage);
    // Setting up other mocks
    let mockRecipient = {
        onMessage:jest.fn(),
    };
    parser.onMessage = jest.fn(parser.onMessage);
    collider.onMessage = jest.fn(collider.onMessage);
    // Setting up the actors
    let baba = new SpriteBlock(1,1,'BABA');
    baba.addTrait(new You());

    let wall = new Wall(2,1,'WALL');
    wall.addTrait(new Stop());



    // adding entities to System
    parser.entities.push(baba,wall);

    messageCenter.subscribe(baba);
    messageCenter.subscribe(wall);
    messageCenter.subscribe(controls);
    messageCenter.subscribe(collider);
    messageCenter.subscribe(parser);
    messageCenter.subscribe(mockRecipient);

    describe(' moveRight "Collision" ',()=>{
        test('When Pressing Right We should collide we should recieve a message from controls',()=>{

            simulateKeyPress(document,'KeyD');

            expect(messageCenter.queue).toHaveLength(0);
            expect(messageCenter.messages).toHaveLength(1);

            messageCenter.update();

            expect(mockRecipient.onMessage).toBeCalledWith(expect.any(Message));
            expect(mockRecipient.onMessage).toBeCalledWith(expect.objectContaining({
                to:'parser',
                from:'controls',
                data:expect.anything()
            }));
        });
        test('Parser should send a message to collider with entities and direction',()=>{
            expect(parser.onMessage).toHaveBeenCalledTimes(1);
            expect(messageCenter.messages).toHaveLength(1);
            messageCenter.update();
            expect(mockRecipient.onMessage).toBeCalledWith(expect.any(Message));
            expect(mockRecipient.onMessage).toBeCalledWith(expect.objectContaining({
                to:'collision',
                from:'parser',
                data:expect.objectContaining({
                    entities:expect.any(Array),
                    msg:expect.objectContaining({
                        to:'parser',
                        from:'controls',
                        data:expect.anything()
                    })
                })
            }));
        });
        test('Collider should check any block with the you property for collision',()=>{
            expect(collider.onMessage).toHaveBeenCalledTimes(2);
            let expected = {
                results:[],
                candidates:[],
                collidePool:[],
                direction:'direction'
            };
            messageCenter.update();
            expect(mockRecipient.onMessage).toBeCalledWith(expect.any(Message));
            expect(mockRecipient.onMessage).toHaveBeenCalledWith(expect.objectContaining({
                to:'parser',
                from:'collider',
                data:{
                    results:expect.arrayContaining([wall]),
                    candidates:expect.arrayContaining([baba]),
                    collidePool:expect.arrayContaining([wall]),
                    direction:'right'
                }
            }))
        });
        test('Parser Should be updated about the collision and message entities from there',()=>{
            messageCenter.update();
            expect(mockRecipient.onMessage).toHaveBeenCalledWith(expect.objectContaining({
                to:'controls',
                from:'parser',
                data:'finished'
            }))
        });
        messageCenter.update();
    })










});