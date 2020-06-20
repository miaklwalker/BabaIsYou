export default function chooseShape([left,down,right,up]){
    if(!left && !down && !right && !up ){
        return 'single'
    }
    if(left  && !down && !right && !up ){
        return 'right'
    }
    if(!left &&  down && !right && !up ){
        return 'top'
    }
    if(!left && !down &&  right &&  up ){
        return'bottomLeft'
    }
    if(!left && !down && right &&  !up ){
        return'left'
    }
    if(left  && !down &&  right && !up ){
        return'middle'
    }
    if(left  && !down && !right &&  up ){
        return'bottomRight'
    }
    if(left  && !down &&  right &&  up ){
        return'middleJoint'
    }
    if(!left && !down && !right &&  up ){
        return'bottom'
    }
    if(!left &&  down &&  right && !up ){
        return'topLeft'
    }
    if(!left &&  down && !right &&  up ){
        return'verticalMiddle'
    }
    if(!left &&  down &&  right &&  up ){
        return'verticalMiddleRight'
    }
    if(left  &&  down && !right && !up ){
        return'topRight'
    }
    if(left  &&  down &&  right && !up ){
        return'middleDown'
    }
    if(left  &&  down && !right &&  up ){
        return'verticalMiddleLeft'
    }
    if(left  &&  down &&  right &&  up ){
        return'fourWay'
    }
}
