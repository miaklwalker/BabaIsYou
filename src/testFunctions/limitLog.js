export default function limitedLog (limit) {
    let count = 0 ;
    return (value)=>{
        if(count < limit){
            console.log(value);
            count++
        }
    }
}