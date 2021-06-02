export default function createBorder ([x,y]){
    const pattern = (x,y,name="?") =>({x,y,name});
    let blocks = [];
    if(x === y) {
        for (let i = 0; i < x; i++) {
            let left = pattern(-1,i);
            let right = pattern(x,i);
            let top =  pattern(i,-1);
            let bottom = pattern(i,y);
            blocks.push(left, right, top, bottom);
        }
        return blocks;
    }else{
        for (let i = 0; i < x; i++) {
            let left = pattern(-1,i);
            let right = pattern(x,i);
            blocks.push(left, right);
        }
        for (let i = 0; i < y; i++) {
            let top =  pattern(i,-1);
            let bottom = pattern(i,y);
            blocks.push(top, bottom);
        }

        return blocks;

    }}
