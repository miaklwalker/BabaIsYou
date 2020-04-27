export default function drawGrid(canvas,context,[x,y]){
    context.strokeStyle = 'white';
    for(let i = 0 ; i < canvas.width ; i += canvas.width/ x){
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, canvas.height);
        context.stroke();

    }
    for (let i = 0; i < canvas.height; i += canvas.height / y) {
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(canvas.width, i);
        context.stroke();
    }
}