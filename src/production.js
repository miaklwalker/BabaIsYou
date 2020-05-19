let production = `
<header>BABA IS YOU</header>
<div class="container">
    <aside>
        <p>
            Baba Is You is an award-winning puzzle game where you can change the rules by which you play.
            In every level,
            the rules themselves are present as blocks you can interact with; by manipulating them,
            you can change how the level works and cause surprising,
            unexpected interactions! With some simple block-pushing you can turn yourself into a rock,
            turn patches of grass into dangerously hot obstacles,
            and even change the goal you need to reach to something entirely different.[1]
            Baba Is You was created by Arvi "Hempuli" Teikari,
            a Finnish game developer known for other titles such as Environmental Station Alpha and Stumblehill.
            More of Hempuli's works can be found at their website.
        </p>
        <cite>from babaiswiki.fandom.com/wiki/baba_is_you_wiki</cite>
    </aside>
    <canvas id="screen" width=480 height=480 ></canvas>
    <aside>
        <p>
            Baba Is You is an award-winning puzzle game where you can change the rules by which you play.
            In every level,
            the rules themselves are present as blocks you can interact with; by manipulating them,
            you can change how the level works and cause surprising,
            unexpected interactions! With some simple block-pushing you can turn yourself into a rock,
            turn patches of grass into dangerously hot obstacles,
            and even change the goal you need to reach to something entirely different.[1]
            Baba Is You was created by Arvi "Hempuli" Teikari,
            a Finnish game developer known for other titles such as Environmental Station Alpha and Stumblehill.
            More of Hempuli's works can be found at their website.
        </p>
        <cite>from babaiswiki.fandom.com/wiki/baba_is_you_wiki</cite>
    </aside>
    <div id="selectContainer">
    </div>
</div>
`;

let test = `

<canvas id="screen" width=480 height=480 ></canvas>
<input type="text" id="name"/>
<select name="" id="select">
    <option value="0">Object</option>
    <option value="1">Array</option>
</select>
<button id="export">Export</button>
`;

let style =`
<style>
body{
     display:flex;
     flex-direction: column;
     background:black;
     color:white;
     text-align: center;
     font-family: sans-serif;
 }
header{
    height:10vh;
    display: flex;
    align-content: center;
    justify-content: center;
    font-size: 32pt;
}
.container{
    display: flex
}
canvas{
    border:3px white dashed;
}
</style>
`;
export default function makePage(mode,cb){
    if(mode){
        document.head.append(style);
        document.body.innerHTML = production;
    }else{
        document.body.innerHTML = test;
    }
}