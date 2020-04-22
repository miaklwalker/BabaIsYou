export default function drawGrid(canvas,context,divisions){
    context.strokeStyle = 'white';
    for(let i = 0 ; i < canvas.width ; i += canvas.width/divisions){
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, canvas.height);
        context.stroke();

    }
    for (let i = 0; i < canvas.height; i += canvas.height / divisions) {
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(canvas.width, i);
        context.stroke();
    }
}