export default function getColorCoords(x,y,num){
    let cx = x + (num % 7 * 8 );
    let cy = y +  (num > 6 ? Math.floor(num / 7) : 0) * 8;
    return [cx, cy, 8, 8];
}