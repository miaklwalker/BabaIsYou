export default function drawBackground(canvas,context,color){
    const dimensions = [ 0 , 0, canvas.width, canvas.height];
    context.clearRect(...dimensions);
    context.fillStyle = color;
    context.fillRect(...dimensions);
}
