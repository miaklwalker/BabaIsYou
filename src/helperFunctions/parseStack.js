const STOP = "STOP";
const MOVE = "MOVE";
const CHECK = "CHECK";

export default function parseStack (collision){
    let command;
    let toMove = 0;

    const S = "Strict";
    const C = "CanCollide";
    const T = "CanTouch";

    let mapTags = collision.map(item=>{
        let name;
        let id = item.id;
        let position = item.position;
        let overlap = item.overlap;
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
            id,
            overlap
        }
    });
        for (let i = 0; i < mapTags.length; i++) {
            let item = mapTags[i];
            let {name,overlap} = item;

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
                // noinspection JSUnusedAssignment
                if (command === CHECK) {
                    if(overlap){
                        toMove++
                    }
                    command = MOVE;
                    break;
                }
                else { // noinspection JSUnusedAssignment
                    if(command === MOVE){
                                        if(!overlap){
                                            command = CHECK;
                                        }
                                        toMove++;
                                    }else{
                                        toMove++;
                                        command = CHECK;
                                    }
                }
            }

            else if (name === C) {
                // noinspection JSUnusedAssignment,JSUnusedAssignment,JSUnusedAssignment
                if(command === CHECK) {
                    if(overlap){
                        toMove++
                    }
                    command = MOVE;
                }else{
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

