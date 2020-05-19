import setStored from "./Functions/setStored.js";

/**
 * @description Takes and ID and options array as arguments and returns a select element that can be attached to the dom body
 * @export
 * @param {*} id  The string to be set as the elements ID so i can be later used and read
 * @param {*} options an array of options that will be attached as HTMLOptionElements to the HTMLSelectElement
 * @returns HTMLSelectElement with all options provided
 */
function selectFactory(id,options) {
    let select = document.createElement('select');
    select.id = id;
    options.forEach(option=>{
        let choice = document.createElement('option');
        choice.innerText = option;
        choice.value = option;
        select.append(choice);
    });
    return select
}
/**
 * @name setStored
 * @description acts like a toggle for Sets , when provided a Set and a value checks if the set has the value and either deletes it from the set or adds it to the set
 * @export
 * @param {*} set The set to check
 * @param {*} value The value to check the set for.
 */



let typeConversion = (element, type) => {
    const [x, y] = element;
    return {
        x: x,
        y: y,
        name: type
    };
};
/**
 * @description Exposes methods that greatly speed up the mapping of 2d tile based games
 * @export
 * @class TileMapper A tool for mapping 2d tile based games
 */
export default class TileMapper {
    /**
     *Creates an instance of TileMapper.
     * @param {*} canvas
     * @param {*} context
     * @memberof TileMapper
     */
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.divisions = 0;
        this.tiles = [];
        this.clickedTiles = new Set();
        this.types = [];
        this.typeColor = {};
        this.selectElements = [];
        this.outputType = true;
        this.tileFormat = true;
    }
    /**
     *@name addScreenMap
     *@description Maps the canvas to an array based on the grid dimensions
     *
     */
    addScreenMap() {
        this.tiles = screenMapper(this.canvas, this.divisions);
    }
    /**
     *
     * @param {string} type adds a new type of tile to the tile mapper
     * @param {string} color Colors selections of this type this color
     */
    addNewType(type, color) {
        this[type] = new Set();
        this.typeColor[type] = color;
        this.types.push(type);
    }
    /**
     *
     * @param {{type:color}} typeList An object containing the types as keys, and the colors as values
     */
    addNewTypes(typeList) {
        Object.keys(typeList).forEach(type => {
            this.addNewType(type, typeList[type]);
        });
    }
    /**
     *
     * @param  {...[number,number]} dimensions The Height and Width of your projects grid
     * @param dimensions
     */
    addTileDimensions(...dimensions) {
        if (dimensions.length === 2) {
            this.divisions = [...dimensions];
        }
    }

    /**
     * @name clearTiles
     * @description This will clear all tiles on screen
     */
    clearTiles() {
        this.clickedTiles.clear();
        this.types.forEach(type => {
            this[type].clear();
        });
    }

    /**
     * @name createExportButton
     * @description Creates an HTMLButtonElement with an onClick event listener that exports the tiles and copies them to your clipboard
     */
    createExportButton() {
        let exportButton = document.createElement("button");
        exportButton.innerText = "Export All";
        document.body.appendChild(exportButton);
        exportButton.addEventListener("click", () => this.copyToClipBoard());
    }

    /**
     * @name copyToClipBoard
     * @description internally calls export all then writes the results to the clipboard for easy copy/paste access
     */
    copyToClipBoard() {
        let output = this.outputType ? this.exportAllAsObject : this.exportAllAsArray
        navigator.clipboard.writeText(JSON.stringify(output()));
    }

    /**
     * @name clickTile
     * @description adds an event listener to the canvas allowing the user to click to add tiles
     */
    clickTile() {
        this.canvas.addEventListener("click", event => {
            let activatedTile;
            let selectedTypes;
            activatedTile = clicked(event, this.tiles);
            if (this.selectElements.length > 0) {
                selectedTypes = this.selectElements.map(
                    selectedElement => selectedElement.value
                );
                let selectedSet = this[selectedTypes];
                setStored(selectedSet, activatedTile);
            }
            setStored(this.clickedTiles, activatedTile);
        });
    }

    /**
     * @name drawSelection
     * @description will draw all userClicked tiles to the screen once
     */
    drawSelection() {
        const { width: w, height: h } = this.canvas;
        const [x1, y1] = this.divisions;
        if (this.clickedTiles.size > 0) {
            if (this.types.length > 0) {
                this.types.forEach(type => {
                    this[type].forEach(tile => {
                        const [x, y] = tile;
                        this.context.fillStyle = this.typeColor[type];
                        let dimensions = [x, y, w / x1, h / y1];
                        this.context.fillRect(...dimensions);
                    });
                });
            } else {
                this.clickedTiles.forEach(tile => {
                    const [x, y] = tile;
                    this.context.fillStyle = "white";
                    let dimensions = [x, y, w / x1, h / y1];
                    this.context.fillRect(...dimensions);
                });
            }
        }
    }
    /**
     * @name exportAll
     * @description Exports all clicked tiles into type Object or if no types then exports them to one Array
     */
    exportAllAsObject() {
        let all = {};
        if (this.types.length > 0) {
            this.types.forEach(type => {
                let placeholder = [];
                if (this[type] instanceof Set) {
                    this[type].forEach(element =>
                        placeholder.push(typeConversion(element, type))
                    );
                    all[type] = placeholder;
                }
            });
        } else {
            all = [...this.clickedTiles];
        }
        if (this.tileFormat){
            return tileFormatOutput(all,...this.divisions)
        }else{
            return all;
        }
    }

    /**
     * @name exportAll
     * @description Exports all clicked tiles into one Array with [X ,Y , Type] format
     */
    exportAllAsArray() {
        let all = [];
        if (this.types.length > 0) {
            let obj = this.exportAllAsObject();
            Object.keys(obj).forEach(key => {
                obj[key].forEach(unit => {
                    let { x, y, name } = unit;
                    all.push([x, y, name]);
                });
            });
        } else {
            all = [this.clickedTiles];
        }
        return all;
    }
    /**
     * @name makeGrid
     * @description Takes to numbers as arguments and draws a grid to the screen, this also declares the grid dimensions for TileMapper default is three for each
     */
    makeGrid() {
        this.context.strokeStyle = "white";
        gridMaker(...this.divisions, this.canvas, this.context);
    }
    /**
     *
     * @param {string} id This ID used to set the id for the HTMLSelectElement
     * @param {Array} options This is an array of options for the HTMLSelectElement
     */
    makeSelectElement(id, options) {
        let select = selectFactory(id, options);
        this.selectElements.push(select);
        document.body.appendChild(select);
    }
    /**
     * @name makeSubSelect
     * @description Makes a conditional Select element that only appears if a specific main type chosen
     * @param id
     */

    removeSelectElement(id) {
        let el = document.getElementById(id);
        this.selectElements.pop();
        document.body.removeChild(el);
    }
    /**
     * @param {string} outputType
     */
    set output(outputType) {
        if (typeof outputType === "string") {
            if (outputType.toLowerCase() === "array") {
                this.outputType = false;
            } else if (outputType.toLowerCase() === "object") {
                this.outputType = true;
            } else {
                console.log(
                    'Please Make Sure To Use Only The String "Object" Or "Array"'
                );
            }
        }
    }
}
/**
 * @description
 * @param rawInput
 * @param {*} xDiv
 * @param {*} yDiv
 */
export function tileFormatOutput(rawInput, xDiv, yDiv) {
    let final = {};
    Object.keys(rawInput).forEach(type => {
        final[type] = [];
        rawInput[type].forEach(unit => {
            unit.x = Math.floor(unit.x / xDiv);
            unit.y = Math.floor(unit.y / yDiv);

            final[type].push(unit);
        });
    });
    console.log(final);
}
export function tilemapperInit(canvas, context, diminsions) {
    let tilemapper = new TileMapper(canvas, context);
    tilemapper.addTileDimensions(...diminsions);
    tilemapper.createExportButton();
    tilemapper.addScreenMap();
    tilemapper.clickTile();
    return tilemapper;
}




