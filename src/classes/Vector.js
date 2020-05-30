export default class Vector{
    constructor( x = 0 , y = 0){
        this.x = x;
        this.y = y;
    }
    addVector(factor){
        this.addX(factor);
        this.addY(factor);
        return this
    }
    addX(factor){
        if(factor instanceof Vector){
            this.x += factor.x
        }else if(typeof factor === 'number'){
            this.x += factor
        }
    }
    addY(factor){
        if(factor instanceof Vector){
            this.y += factor.y
        }else if(typeof factor === 'number'){
            this.y += factor
        }
    }

    subVector(factor){
        this.subX(factor);
        this.subY(factor);
    }
    subX(factor){
        if(factor instanceof Vector){
            this.x -= factor.x
        }else if(typeof factor === 'number'){
            this.x -= factor
        }
    }
    subY(factor){
        if(factor instanceof Vector){
            this.y -= factor.y
        }else if(typeof factor === 'number'){
            this.y -= factor
        }
    }

    divVector(factor){
        this.divX(factor);
        this.divY(factor);
    }
    divX(factor){
        if(factor instanceof Vector){
            this.x /= factor.x
        }else if(typeof factor === 'number'){
            this.x /= factor
        }
    }
    divY(factor){
        if(factor instanceof Vector){
            this.y /= factor.y
        }else if(typeof factor === 'number'){
            this.y /= factor
        }
    }

    mulVector(factor){
        this.mulX(factor);
        this.mulY(factor);
    }
    mulX(factor){
        if(factor instanceof Vector){
            this.x *= factor.x
        }else if(typeof factor === 'number'){
            this.x *= factor
        }
    }
    mulY(factor){
        if(factor instanceof Vector){
            this.y *= factor.y
        }else if(typeof factor === 'number'){
            this.y *= factor
        }
    }

    same(other){
        return this.x === other.x && this.y === other.y
    }
}