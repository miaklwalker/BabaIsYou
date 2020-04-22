const NUMBER = 'NUMBER';
const LOWER = 'LOWER';
const UPPER = 'UPPER';

const alphaNumeric = () => Math.random() > .5 ? NUMBER : Math.random() > .5 ? UPPER : LOWER ;
const alphaNumericLowerCase = () => Math.random() > .5 ? NUMBER : LOWER;
const alpha = ()=> Math.random() > .5 ? UPPER : LOWER;
const alphaLower =()=> LOWER;
const alphaUpper =()=> UPPER;

const strategy = {
    alphaNumeric,
    alphaNumericLowerCase,
    alpha,
    alphaLower,
    alphaUpper,
    "0":alphaNumeric,
    "1":alphaNumericLowerCase,
    "2": alpha,
    "3": alphaLower,
    "4": alphaUpper,
};
const charTypes = {NUMBER:{min:48,max:57},UPPER:{min:65,max:90},LOWER:{min:97,max:122}};

const pickNumber = ({min,max})=> Math.floor(Math.random() * (max-min) + min);

const chooseChar = (ranNum) => String.fromCharCode(ranNum);


/**
 *
 * @param length The Length of the id specified in character count
 * @param idConfigString - [0 - 4 ] or [alphaNumeric ,alphaNumericLowerCase ,alpha ,alphaLower, alphaUpper]
 * @returns {string} matching the length and config property
 */

export default function makeUniqueId(length,idConfigString = 4){
    let i = 0;
    let ID = '';
    while(i < length){
        ID+=chooseChar(pickNumber(charTypes[strategy[idConfigString]()]));
        i++
    }
    return ID;
}