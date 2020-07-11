const STOP = "STOP";
const MOVE = "MOVE";
const CHECK = "CHECK";

export default function parseStack (collision){

    let command;
    let toMove = 0;
    let checked = 0;

    const S = "Strict";
    const C = "CanCollide";
    const T = "CanTouch";

    let mapTags = collision.map(item=>{
        let name;
        let id = item.id;
        let position = item.position;
        if(item.strictCollide){
            name = S;
        }else if(item.canCollide){
            name = C;
        }else {
            name = T;
        }
        return {
            name,
            position,
            id
        }
    });

    if(mapTags.length === 0){
        command = MOVE;
    }
    else {
        for (let i = 0; i < mapTags.length; i++) {
            let item = mapTags[i];
            let {name} = item;
            let overlapFlag = false;
            mapTags.forEach(({position,id})=>{
                if(position.same(item.position) && item.id !== id){
                    overlapFlag = true;
                }
            });
            if (name === S) {
                if(command === CHECK){
                    command = MOVE;

                    break;
                }else{
                    command = STOP;
                    toMove = 0;
                    break;
                }
            }
            else if (name === T) {
                if (command === undefined) {
                    toMove++;
                    command = CHECK;
                }
                else if (command === CHECK) {
                    if(overlapFlag){
                        toMove++
                    }
                    command = MOVE;
                    break;
                }
                else {
                    toMove++;
                    command = CHECK;
                }
            }
            else if (name === C) {
                if(command === CHECK) {
                    command = CHECK;
                    break;
                }
                toMove++;
                command = MOVE;
            }
        }
    }

    command = command === CHECK ? MOVE : command;

    return {
        command,
        toMove
    };
}