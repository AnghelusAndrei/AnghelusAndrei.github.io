"use strict";

const speed = 3;
const ray_num = 60;
const check = 120;
const divider = 4;
const adder = 1/divider;
const checkMultiplyer = 3;
const RGBmultiplyer = 1.3;
const resMult = 0.1;
var fullScr = true;
const s = 35000;

const grid = 500;
const square = 50;

const texWall1 = 
[
    [1,3,1,3,1,3,1,3,1,3],
    [3,1,3,1,3,1,3,1,3,1],
    [1,3,1,3,1,3,1,3,1,3],
    [3,1,3,1,3,1,3,1,3,1],
    [1,3,1,3,1,3,1,3,1,3],
    [3,1,3,1,3,1,3,1,3,1],
    [1,3,1,3,1,3,1,3,1,3],
    [3,1,3,1,3,1,3,1,3,1],
    [1,3,1,3,1,3,1,3,1,3],
    [3,1,3,1,3,1,3,1,3,1]
];

const texWall2 = 
[
    [1,2,1,2,1,2,1,2,1,2],
    [2,1,2,1,2,1,2,1,2,1],
    [1,2,1,2,1,2,1,2,1,2],
    [2,1,2,1,2,1,2,1,2,1],
    [1,2,1,2,1,2,1,2,1,2],
    [2,1,2,1,2,1,2,1,2,1],
    [1,2,1,2,1,2,1,2,1,2],
    [2,1,2,1,2,1,2,1,2,1],
    [1,2,1,2,1,2,1,2,1,2],
    [2,1,2,1,2,1,2,1,2,1]
];

const texWall3 = 
[
    [3,3,1,3,3,3,3,3,3,3],
    [1,1,1,1,1,1,1,1,1,1],
    [3,3,3,3,3,3,1,3,3,3],
    [1,1,1,1,1,1,1,1,1,1],
    [3,3,1,3,3,3,3,3,3,3],
    [1,1,1,1,1,1,1,1,1,1],
    [3,3,3,3,3,3,3,1,3,3],
    [1,1,1,1,1,1,1,1,1,1],
    [3,3,3,3,1,3,3,3,3,3],
    [1,1,1,1,1,1,1,1,1,1]
];

const texWall4 = 
[
    [2,2,1,2,2,2,2,2,2,2],
    [1,1,1,1,1,1,1,1,1,1],
    [2,2,2,2,2,2,1,2,2,2],
    [1,1,1,1,1,1,1,1,1,1],
    [2,2,1,2,2,2,2,2,2,2],
    [1,1,1,1,1,1,1,1,1,1],
    [2,2,2,2,2,2,2,1,2,2],
    [1,1,1,1,1,1,1,1,1,1],
    [2,2,2,2,1,2,2,2,2,2],
    [1,1,1,1,1,1,1,1,1,1]
];

const texWall5 = 
[
    [1,1,1,1,1,1,1,1,1,1],
    [1,5,5,5,5,5,5,5,5,1],
    [1,5,5,5,5,5,5,5,5,1],
    [1,5,5,5,5,5,5,5,5,1],
    [1,5,5,5,5,5,5,5,5,1],
    [1,5,5,5,5,5,5,5,5,1],
    [1,5,5,5,5,5,5,5,5,1],
    [1,5,5,5,5,5,5,5,5,1],
    [1,5,5,5,5,5,5,5,5,1],
    [1,1,1,1,1,1,1,1,1,1]
];

const texWall6 = 
[
    [1,1,1,1,1,1,1,1,1,1],
    [1,4,4,4,4,4,4,4,4,1],
    [1,4,4,4,4,4,4,4,4,1],
    [1,4,4,4,4,4,4,4,4,1],
    [1,4,4,4,4,4,4,4,4,1],
    [1,4,4,4,4,4,4,4,4,1],
    [1,4,4,4,4,4,4,4,4,1],
    [1,4,4,4,4,4,4,4,4,1],
    [1,4,4,4,4,4,4,4,4,1],
    [1,1,1,1,1,1,1,1,1,1]
];

//document.body.innerHTML += `<canvas id="3Dcanvas" width="${canvasHeight}" height="${canvasWidth}" style="background-color: black;">Your browser does not support HTML5</canvas>`
//document.body.innerHTML += `<canvas id="canvas" width="${canvasHeight}" height="${canvasWidth}" style="background-color: black;">Your browser does not support HTML5</canvas>`
const Dc = document.getElementById("3Dcanvas");
//var c = document.getElementById("3Dcanvas");

const Dcanvas=document.getElementById("3Dcanvas").getContext("2d");
//var canvas=document.getElementById("canvas").getContext("2d");

Dc.requestPointerLock = Dc.requestPointerLock ||
Dc.mozRequestPointerLock;

Dc.width = window.innerWidth;
Dc.height = window.innerHeight;

const canvasHeight=Dc.height;
const canvasWidth=Dc.width;

var j = canvasHeight/2+canvasHeight/4;

Dc.addEventListener("click", (ev)=>
{
    if(fullScr == false){Dc.style.cursor = 'none';}
    else if(fullScr == true){Dc.style.cursor = 'crosshair';}
    openFullscreen()
    Dc.requestPointerLock()
    fullScr = true;
})

window.addEventListener("keydown", (event)=>
{
    var keyCode = event.keyCode;
    switch(keyCode){
        case 27:
            fullScr = false;
        break;
    }
})

function openFullscreen() {
    if (Dc.requestFullscreen) {
        Dc.requestFullscreen();
    } else if (Dc.webkitRequestFullscreen) { /* Safari */
        Dc.webkitRequestFullscreen();
    } else if (Dc.msRequestFullscreen) { /* IE11 */
        Dc.msRequestFullscreen();
    }
}

var map = [
    [2,   2,   2,   2,   2,   2,   2,   2,   2,2],
    [2,r(7),r(7),r(7),r(7),r(7),r(7),r(7),r(7),2],
    [2,r(7),r(7),r(7),r(8),r(8),r(7),r(7),r(7),2],
    [2,r(7),r(7),r(8),r(9),r(9),r(8),r(7),r(7),2],
    [2,r(7),r(8),r(9),   0,   0,r(9),r(8),r(7),2],
    [2,r(7),r(8),r(9),   0,   0,r(9),r(8),r(7),2],
    [2,r(7),r(7),r(8),r(9),r(9),r(8),r(7),r(7),2],
    [2,r(7),r(7),r(7),r(8),r(8),r(7),r(7),r(7),2],
    [2,r(7),r(7),r(7),r(7),r(7),r(7),r(7),r(7),2],
    [2,   2,   2 ,  2,   2,   2,   2,   2,   2,2]
];

function r(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

/*function drawMap(){
const [width, height] = [map[0].length, map.length]
for(var i=0; i<height; i++)
{
    for(var j=0;j<width;j++)
    {
        if(map[i][j] >= 1 && map[i][j] <= 4){
            canvas.fillStyle='white';
            canvas.fillRect(canvasWidth / width * j, canvasHeight / height * i, canvasWidth / width,  canvasHeight / height);
            canvas.fill();
        }else{
            canvas.fillStyle='gray';
            canvas.fillRect(canvasWidth / width * j, canvasHeight / height * i, canvasWidth / width,  canvasHeight / height);
            canvas.fill();
        }
    }
}

}*/
var collider = {
    x: x - 10,
    y: y - 10,
    width: 20,
    height: 20
}
function pointInside(wall, x, y)
{
    return wall.x - 0.01 < x && wall.x + wall.width + 0.01 > x && wall.y - 0.01 < y && wall.y + wall.height + 0.01 > y
}
function pointIs(wall, x, y)
{
    return wall.x == x || wall.x + wall.width == x || wall.y == y || wall.y + wall.height == y
}

function Collide(){
    const [width, height] = [map[0].length, map.length];
    for(var i=0; i<height; i++)
    {
        for(var j=0;j<width;j++)
        {
            if(map[i][j] >= 1  && map[i][j] <= 4){
                var wall = {
                    x: grid / width * j,
                    y: grid / height * i,
                    height: grid / height,
                    width: grid / width,
                }
                
                if(pointInside(wall, x-5, y-5) || pointInside(wall, x-5 ,y+5) || pointInside(wall, x+5, y-5) || pointInside(wall, x+5, y+5)){
                    x = lastX;
                    y = lastY;
                    tickX = x;
                    tickY = y;
                }
        }
        }
    }
}
(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);
var x = grid / 2;
var y = grid / 2;
var radius = 10;

function onKeyDown(event) {
    var keyCode = event.keyCode;
    switch (keyCode) {
    case 68: //d
        keyD = true;
        break;
    case 83: //s
        keyS = true;
        break;
    case 65: //a
        keyA = true;
        break;
    case 87: //w
        keyW = true;
        break;
    }
}

function onKeyUp(event) {
    var keyCode = event.keyCode;

    switch (keyCode) {
    case 68: //d
        keyD = false;
        break;
    case 83: //s
        keyS = false;
        break;
    case 65: //a
        keyA = false;
        break;
    case 87: //w
        keyW = false;
        break;
    }
}

var tickX = grid / 2;
var tickY = grid / 2;

var keyW = false;
var keyA = false;
var keyS = false;
var keyD = false;

var lastX;
var lastY;
function drawPlayer(){
    lastX = x;
    lastY = y;
    if (keyD == true) {
    var cX = x + Math.cos(-(mouse.x - 90) * Math.PI / 180) * speed;
    var cY = y + Math.sin(-(mouse.x - 90) * Math.PI / 180) * speed;
    x=cX;
    y=cY;
    }
    if (keyS == true) {
    var cX = x + Math.cos(-(mouse.x - 180) * Math.PI / 180) * speed;
    var cY = y + Math.sin(-(mouse.x - 180) * Math.PI / 180) * speed;
    x=cX;
    y=cY;
    }
    if (keyA == true) {
    var cX = x + Math.cos(-(mouse.x + 90) * Math.PI / 180) * speed;
    var cY = y + Math.sin(-(mouse.x + 90) * Math.PI / 180) * speed;
    x=cX;
    y=cY;
    }
    if (keyW == true) {
    var cX = x + Math.cos(-(mouse.x) * Math.PI / 180) * speed;
    var cY = y + Math.sin(-(mouse.x) * Math.PI / 180) * speed;
    x=cX;
    y=cY;
    }
}
/*function reDoPlayer(){
window.requestAnimationFrame(reDoPlayer);
canvas.beginPath();
canvas.fillStyle = 'black';
canvas.arc(x, y, radius, 0, 2 * Math.PI, false);
canvas.fill();
}
window.requestAnimationFrame(reDoPlayer);*/

function Distance(x1,x2,y1,y2){
    return Math.sqrt((x1-x2) * (x1-x2) + (y1-y2)*(y1-y2))
}
    
function rotate(velocity, angle){
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };
    return rotatedVelocities;
}
let mouse = {
x: 0,
y: 0
}

addEventListener("mousemove", function(event){
    mouse.x -= event.movementX;
    mouse.y += event.movementY;
});
 
window.requestAnimationFrame(Ray);

function Ray(){
    window.requestAnimationFrame(Ray);
    clearCanvas();
    for(var b = 0; b < ray_num; b+=adder)
    {
        const [width, height] = [map[0].length, map.length];
        var distArray = [];

        var found = false;

        var ray = {x: undefined,y: undefined};
        var yCheck = {x: undefined,y: undefined};
        var xCheck = {x: undefined,y: undefined};

        var ang = 360-FixAng(mouse.x+(ray_num/2-b));

        var xFound = false;
        var yFound = false;

        for(var offset = 0; offset < 11 && found == false; offset++){
            var tile = {
                x: offset*(square),
                y: offset*(square)
            };
            var wall;
            
            //DDA
        
            if(ang < 90){ //down-right
                yCheck.x = x+(grid-x-Math.floor((grid - x)/(square))*(square))+tile.x;
                yCheck.y = y+((grid-x-Math.floor((grid - x)/(square))*(square))+tile.x)*Math.abs(Math.tan(degToRad(ang)));
        
                xCheck.y = y+(grid-y-Math.floor((grid - y)/(square))*(square))+tile.y;
                xCheck.x = x+((grid-y-Math.floor((grid - y)/(square))*(square))+tile.y)*Math.abs(Math.tan(degToRad(90-ang)));
            }else if(ang >= 90 && ang < 180){ //down-left
                yCheck.x = Math.floor((x)/(square))*(square)-tile.x;
                yCheck.y = y+(x-Math.floor((x)/(square))*(square)+tile.x)*Math.abs(Math.tan(degToRad(180-ang)));
        
                xCheck.y = y+(grid-y-Math.floor((grid - y)/(square))*(square))+tile.y;
                xCheck.x = x-((grid-y-Math.floor((grid - y)/(square))*(square))+tile.y)*Math.abs(Math.tan(degToRad(ang-90)));
            }else if(ang >= 180 && ang < 270){ //up-left
                yCheck.x = Math.floor((x)/(square))*(square)-tile.x;
                yCheck.y = y-(x-Math.floor((x)/(square))*(square)+tile.x)*Math.abs(Math.tan(degToRad(ang-180)));
        
                xCheck.y = y-(y-Math.floor((y)/(square))*(square))-tile.y;
                xCheck.x = x-((y-Math.floor((y)/(square))*(square))+tile.y)*Math.abs(Math.tan(degToRad(270-ang)));
            }else if(ang >= 270 && ang < 360){ //up-right
                yCheck.x = x+(grid-x-Math.floor((grid - x)/(square))*(square))+tile.x;
                yCheck.y = y-((grid-x-Math.floor((grid - x)/(square))*(square))+tile.x)*Math.abs(Math.tan(degToRad(360-ang)));
        
                xCheck.y = y-(y-Math.floor((y)/(square))*(square))-tile.y;
                xCheck.x = x+((y-Math.floor((y)/(square))*(square))+tile.y)*Math.abs(Math.tan(degToRad(ang-270)));
            }
        
        
            //check
            for(var i=0; i<height; i++)
            {
                for(var j=0;j<width;j++)
                {
                    if(map[i][j] > 0 && map[i][j] <= 4){
                        wall = {
                            x: square * j,
                            y: square * i,
                            height: square,
                            width: square,
                            color: map[i][j]
                        };
                        if(pointInside(wall, xCheck.x, xCheck.y)){
                            ray.x = xCheck.x;
                            ray.y = xCheck.y;
                            //drawRay(x,y,ray.x,ray.y);
                            distArray.push({dist:Distance(x,ray.x,y,ray.y), wall:wall, l:50, xPixel:xCheck.x-wall.x});
                            xFound = true;
                        }
                        if(pointInside(wall, yCheck.x, yCheck.y)){
                            ray.x = yCheck.x;
                            ray.y = yCheck.y;
                            //drawRay(x,y,ray.x,ray.y);
                            distArray.push({dist:Distance(x,ray.x,y,ray.y), wall:wall, l:0, xPixel:yCheck.y-wall.y});
                            yFound = true;
                        }
                    }
                }
            }

            if(xFound && yFound){
                found == true;
            }
        }

        var dist,CorrDist;
        var MIN=999999;
        for(var i=0;i<distArray.length;i++)
        {
            if(distArray[i].dist<MIN) 
            {
                MIN = distArray[i].dist;
                dist=distArray[i];

                dist.dist *= Math.cos(degToRad(ray_num/2-b));
            }

        }

        draw3D(dist, b);
    }
}




/*function drawRay(x1,y1,x2,y2) {
    canvas.beginPath();
    canvas.strokeStyle = 'red';
    canvas.moveTo(x1,y1);
    canvas.lineTo(x2,y2);   
    canvas.stroke();
}*/

    function draw3D(dist, b) {
        var Rdist = Math.round(255-dist.dist/RGBmultiplyer-dist.l);
        if(Rdist<0){
            Rdist = 0;
        }
        if(Rdist>255){
            Rdist = 255;
        }
        var Sdist = Rdist.toString();
    
        var texWall;

        switch(dist.wall.color){
            case 1: texWall = texWall6;
            break;
            case 2: texWall = texWall1;
            break;
            case 3: texWall = texWall2;
            break;
            case 4: texWall = texWall3;
            break;
            case 5: texWall = texWall4;
            break;
            case 6: texWall = texWall5;
            break;
        }
    

        for(var i=0; i<texWall.length; i++){
            Dcanvas.beginPath();

            switch(texWall[i][Math.floor((dist.xPixel/square)*texWall.length)])
            {
                case 0:Dcanvas.fillStyle = `rgb(${Sdist},${Sdist},${Sdist})`;
                break;
                case 1:
                    Dcanvas.fillStyle = `rgb(${(Rdist-150).toString()},${(Rdist-150).toString()},${(Rdist-150).toString()})`;
                break;
                case 2:Dcanvas.fillStyle = `rgb(${Sdist},0,0)`;
                break;
                case 3:Dcanvas.fillStyle = `rgb(0,${Sdist},0)`;
                break;
                case 4:Dcanvas.fillStyle = `rgb(0,${Sdist},${Sdist})`;
                break;
                case 5:Dcanvas.fillStyle = `rgb(${(Rdist-150).toString()},${(Rdist-150).toString()},${Sdist})`;
                break;
            }
            
            var size = s/dist.dist;
            var pos = canvasHeight-(size)/2+canvasHeight/4;

            Dcanvas.fillRect(
                canvasWidth/ray_num * b,
                pos-canvasHeight/2-canvasHeight/4+(size/texWall.length)*i,
                canvasWidth/ray_num/divider,
                size/texWall.length);
            Dcanvas.fill();
        }
    }


function arrayMin(arr) { return Math.min.apply(Math, arr); }
function arrayMax(arr) { return Math.max.apply(Math, arr); }
function FixAng(ang){         
    if(ang>360)
    {
        var mult = Math.ceil(ang/360);
        ang = (360*mult)-ang;
    } 
    if(ang<0)
    {
        var ap = Math.abs(ang);
        var mult = Math.ceil(ap/360);
        ang = (360*mult)-ap;
    } return ang;}
function distance(ax,ay,bx,by,ang){ return Math.cos(Math.degToRad(ang))*(bx-ax)-sin(Math.degToRad(ang))*(by-ay);}
function degToRad(degrees){var pi = Math.PI;return degrees * (pi/180);}


    function clearCanvas(){
    
        Dcanvas.beginPath();
        Dcanvas.fillStyle = `rgb(255,255,255)`;
        Dcanvas.fillRect(0, 0, canvasWidth, Math.round(canvasHeight));
        
        var grd = Dcanvas.createLinearGradient(0, canvasHeight/2/*-fixAng2(mouse.y)*/-j, 0, canvasHeight*2/*-fixAng2(mouse.y)*/-j);
        
        grd.addColorStop(0, `rgb(0,0,0)`);
        grd.addColorStop(.50, `rgb(10,10,10)`);
        grd.addColorStop(.65, `rgb(190,190,190)`);
        grd.addColorStop(1, `rgb(255,255,255)`);
        
        Dcanvas.fillStyle = grd;
        Dcanvas.fillRect(0, 0, canvasWidth, canvasHeight);
        Dcanvas.fill();
    }

function CPoints(angle, radius, distance){
    return {
        x: x + radius * Math.cos(angle * Math.PI / 180) * distance,
        y: y + radius * Math.sin(angle * Math.PI / 180) * distance
    
    }
}

setInterval(drawPlayer, 20);
//setInterval(drawMap, 15);
setInterval(Collide, 1);

