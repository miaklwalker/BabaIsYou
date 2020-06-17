import addMessage from "../CustomEvents/addmessage.js";
import Message from "./Message.js";

export default class MovementParser{
    constructor(){
        this.entities = [];
    }
    parseFromControls(msg,globalContext){
        globalContext.dispatchEvent(addMessage(new Message(
            'collision',
            'parser',
            {entities:this.entities.flat(),msg}
        )));
    }
    handleNoCollisions(candidates,direction,globalContext){
        candidates.forEach(entity=>{
            globalContext.dispatchEvent(
                addMessage(
                    new Message(
                        entity.id,
                        'parser',
                        {direction}
                        )
                    )
                );
        })
    }
    handleStop(globalContext){
        globalContext.dispatchEvent(
            addMessage(
                new Message(
                    'controls',
                    'parser',
                    'finished'
                    )
                )
            );
    }
    onMessage(msg,globalContext=document){
        if(msg.to === 'parser' && msg.from === 'controls' && msg.data.action ==='run'){

            this.parseFromControls(msg,globalContext);

        }else if(msg.to === 'parser' && msg.from === 'collider'){
            let{results,candidates,direction} = msg.data;
            // No Collisions.
            if(results.length === 0){
                this.handleNoCollisions(candidates,direction,globalContext);
            }

            else if(results.map(entity=>entity.STOP).some(trait=>trait !== undefined)){
                this.handleStop(globalContext);
                return;
            }
            else{
                [...candidates,...results].forEach(entity=>{
                    globalContext.dispatchEvent(
                        addMessage(
                            new Message(
                                entity.id,
                                'parser',
                                {direction,msg}
                                )
                            )
                        );
                })
            }
            this.handleStop(globalContext);
        }
    }
    purge(){
        this.entities = [];
    }
    removeEntity(targetId){
        let filteredEntities = this.entities.filter( entity => entity.id === targetId.id);
        this.entities = filteredEntities
    }

}