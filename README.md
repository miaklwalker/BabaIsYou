# BabaIsYou

Baba is you is a 2d puzzle game made by Hempuli,
a Swedish Video Game Developer.

This game's core concept is rules.

Anything can be a rule, what character you control,
What objects have collision, even how you win a level.

In-game you create, edit, and bend these rules in creative ways 
to overcome any obstacles you encounter. 

The game already has a marketing team as well as several awards so I won't linger for too long on what it is.

## Interesting Code.

While programming any games one will often find interesting problems.

The game is a 2d tile based game with Arrow key controls.

Moving actors on the screen is a simple matter of changing a X or Y value and redrawing the sprites at the new location.

### Rendering
The games art assets are all black and white meaning you have to color the sprites yourself.

They are also provided as one static sprite sheet.

With this challenge in mind i designed my rendering class.

The sprite sheet for the game also has specified palettes that I indexed ahead of time.

#### Layers
The main component of my rendering system is the Layer class
This unassuming class consists of only three properties, 
* A Priority
* A Rendering function to call 
* A set of arguments to call the rendering function with
This class acted as a interface for the Renderer Class

#### Renderer
This class maintains an internal list of Array of Layers.
Using priority as the ordering system.

Higher Priority Layers are invoked last to allow them to appear on top of other layers
This class also has a built pixel sprite tinting function.

Upon invoking it , takes a specified image and converts it to Image Data.

 This Image data has an Unsigned 8 Bit Clamped integer array of RGBA values.
 
By looping over this array it is possible to tint a sprite with a color palette.

