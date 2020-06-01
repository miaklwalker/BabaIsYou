import Vector from "./Vector.js";
//
//
//
// export default function newCollider(allEntities){
//     let candidates = [];
//     let collideCandidates = [];
//     allEntities.forEach(entity=>{
//         if(entity.YOU){
//             candidates.push(entity);
//         }
//         if(entity.canCollide){
//             collideCandidates.push(entity);
//         }
//     })
//     console.log(candidates);
//     console.log(collideCandidates)
//     return {
//         onMessage: (message)=>{
//             if(message.to === 'parser'){
//                 console.log(message);
//             }
//         }
//     }
// }
//
// function orthogonalMap({x,y}){
//     let left = new Vector(x - 1, y);
//     let right = new Vector(x + 1, y);
//     let up = new Vector(x, y - 1);
//     let down = new Vector(x, y + 1);
//     return {left,down,right,up}
// }
//
// function spriteCollision(other){
//     const {position:{x,y}} = other.position;
//
// }