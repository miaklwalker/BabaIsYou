import TileMapper from "./levelEditor.js";
import Layer from "../classes/Layer.js";

const handleMapper = tileMapper => ()=> {
    let name = document.getElementById('name').value;
    let output = document.getElementById('select').value;
    tileMapper.export(name, output);
};

export default function tileMapperInit(game,canvas,priority){
    let TM = TileMapper(canvas, game.gridDiminsions);
    canvas.addEventListener('click', TM.handleClick);
    game.addLayer(new Layer(priority, TM.render));
    document.getElementById('export').addEventListener('click',handleMapper(TM));
    return TM;
}