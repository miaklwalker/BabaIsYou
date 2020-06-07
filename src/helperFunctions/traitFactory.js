import You from "../classes/Traits/You.js";
import Stop from "../classes/Traits/Stop.js";
import Push from "../classes/Traits/Push.js";
import Win from "../classes/Traits/Win.js";
import Defeat from "../classes/Traits/Defeat.js";
import Float from "../classes/Traits/Float.js";
import Hot from "../classes/Traits/Hot.js";
import Melt from "../classes/Traits/Melt.js";
import More from "../classes/Traits/More.js";
import Move from "../classes/Traits/Move.js";
import Open from "../classes/Traits/Open.js";
import Pull from "../classes/Traits/Pull.js";
import Shut from "../classes/Traits/Shut.js";
import Sink from "../classes/Traits/Sink.js";
import Tele from "../classes/Traits/Tele.js";
import Weak from "../classes/Traits/Weak.js";

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
    case 'DEFEAT':
        return new Defeat();
    case 'FLOAT':
        return new Float();
    case 'HOT':
        return new Hot();
    case 'MELT':
        return new Melt();
    case 'MORE':
        return new More();
    case 'MOVE':
        return new Move();
    case 'OPEN':
        return new Open();
    case 'PULL':
        return new Pull();
    case 'SHUT':
        return new Shut();
    case 'SINK':
        return new Sink();
    case 'TELE':
        return new Tele();
    case 'WEAK':
        return new Weak();
    }

}