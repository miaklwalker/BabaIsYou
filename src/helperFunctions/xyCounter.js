
/**
 *
 *
 * @export
 * @param {*} breakPoint sets the increment point for x in the x y counter
 * @returns ()=>[x++,y++];
 */
export default function xyCounter(breakPoint){
    let x = 0;
    let y = 0;
    return ()=>{
        x++;
        if(x%breakPoint === 0
            && x !== 0){
            y++;
            x=0
        }
        return [x,y]
    }
}