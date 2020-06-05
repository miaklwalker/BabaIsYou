const SELECT_CONTAINER = document.getElementById('selectContainer');

function screenMapper (canvas,divisions) {
    const {width , height} = canvas;
    let tiles = [];
    let cHeight = height/divisions[0];
    let cWidth = width/divisions[1];

    for (let i = 0; i < height; i+=cHeight) {
        for (let j = 0; j < width; j+=cWidth) {
            let mapped = [j,i,j+cWidth,i+cHeight];
            tiles.push(mapped);
        }
    }
    return tiles
}
function clicked(event, map) {
    const { clientX: x, clientY: y } = event;
    for (let i = 0; i < map.length; i++) {
        const [mx, my, mw, mh] = map[i];
        if (x >= mx && x <= mw && y >= my && y <= mh) {
            return map[i];
        }
    }
}
function setStored(set,value){
    if (set.has(value)) {
        set.delete(value);
    } else {
        set.add(value);
    }
}

function addSelect(obj){

}



export default function TileMapper (canvas,divisions) {
    let tiles = screenMapper(canvas,divisions);
    let clickedTilesSet = new Set();
    let cHeight = canvas.height/divisions[0];
    let cWidth = canvas.width/divisions[1];
return{
    handleClick(event){
    let clickedTile = clicked(event,tiles);
    setStored(clickedTilesSet,clickedTile);
    },
    render(canvas,context){
        clickedTilesSet.forEach(([x,y])=>{
            context.fillStyle = 'red';
            context.fillRect(x,y,cWidth,cHeight);
        })

    },
    export:(name,option)=>{
        let temp = [];
        if(+option === 0) {
            clickedTilesSet.forEach(tile => {
                let [x1, y1] = tile;
                let tileObj = {
                    x: Math.round(x1 / cHeight),
                    y: Math.round(y1 / cWidth),
                    name
                };
                temp.push(tileObj);
            });
            copyToClipboard(JSON.stringify(temp));
        }else{
            clickedTilesSet.forEach(tile => {
                let [x1, y1] = tile;
                let tileObj = [Math.round(x1 / cHeight), Math.round(y1 / cWidth), name];
                temp.push(tileObj);
            });
            copyToClipboard(JSON.stringify(temp));
        }
    }
}
}

function copyToClipboard(text){
    navigator.clipboard.writeText(text).then(()=>console.log('Copied to clipboard'))
}
