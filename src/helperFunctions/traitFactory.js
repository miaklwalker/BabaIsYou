import You from "../classes/Traits/You.js";
import Stop from "../classes/Traits/Stop.js";
import Push from "../classes/Traits/Push.js";
import Win from "../classes/Traits/Win.js";

export default function traitFactory(trait){
switch (trait) {
    case 'YOU':
        return new You();
    case 'STOP':
        return new Stop();
    case 'PUSH':
        return new Push();
    case 'WIN' :
        return new Win();
    }
}