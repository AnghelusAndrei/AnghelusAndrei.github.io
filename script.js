"use strict";
const canvasHeight=600;
const canvasWidth=600;

const speed = 5;
const ray_num = 100;
const check = 120;
const checkMultiplyer = 3;
const RGBmultiplyer = 1.1;
const resMult = 0.1;
var fullScr = true;

document.body.innerHTML += `<canvas id="3Dcanvas" width="${canvasHeight}" height="${canvasWidth}" style="background-color: black;">Your browser does not support HTML5</canvas>`
//document.body.innerHTML += `<canvas id="canvas" width="${canvasHeight}" height="${canvasWidth}" style="background-color: black;">Your browser does not support HTML5</canvas>`
const Dc = document.getElementById("3Dcanvas");
//var c = document.getElementById("3Dcanvas");

const Dcanvas=document.getElementById("3Dcanvas").getContext("2d");
//var canvas=document.getElementById("canvas").getContext("2d");

Dc.requestPointerLock = Dc.requestPointerLock ||
Dc.mozRequestPointerLock;

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

function drawMap(){
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

}
var collider = {
    x: x - 10,
    y: y - 10,
    width: 20,
    height: 20
}
function pointInside(wall, x, y)
{
    return wall.x - 6 < x && wall.x + wall.width + 6 >x && wall.y - 6 <y && wall.y + wall.height + 6 > y
}
function Collide(){
    const [width, height] = [map[0].length, map.length];
    for(var i=0; i<height; i++)
    {
        for(var j=0;j<width;j++)
        {
            if(map[i][j] >= 1  && map[i][j] <= 4){
                var wall = {
                    x: canvasWidth / width * j,
                    y: canvasHeight / height * i,
                    height: canvasHeight / height,
                    width: canvasWidth / width,
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
var x = canvasWidth / 2;
var y = canvasHeight / 2;
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

var tickX = canvasWidth / 2;
var tickY = canvasHeight / 2;

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
    var cX = x + Math.cos(-(mouse.x - ray_num/2 - 90) * Math.PI / 180) * speed;
    var cY = y + Math.sin(-(mouse.x - ray_num/2 - 90) * Math.PI / 180) * speed;
    x=cX;
    y=cY;
    }
    if (keyS == true) {
    var cX = x + Math.cos(-(mouse.x - ray_num/2 - 180) * Math.PI / 180) * speed;
    var cY = y + Math.sin(-(mouse.x - ray_num/2 - 180) * Math.PI / 180) * speed;
    x=cX;
    y=cY;
    }
    if (keyA == true) {
    var cX = x + Math.cos(-(mouse.x - ray_num/2 + 90) * Math.PI / 180) * speed;
    var cY = y + Math.sin(-(mouse.x - ray_num/2 + 90) * Math.PI / 180) * speed;
    x=cX;
    y=cY;
    }
    if (keyW == true) {
    var cX = x + Math.cos(-(mouse.x - ray_num/2) * Math.PI / 180) * speed;
    var cY = y + Math.sin(-(mouse.x - ray_num/2) * Math.PI / 180) * speed;
    x=cX;
    y=cY;
    }
}
function reDoPlayer(){
//window.requestAnimationFrame(reDoPlayer);
canvas.beginPath();
canvas.fillStyle = 'black';
canvas.arc(x, y, radius, 0, 2 * Math.PI, false);
canvas.fill();
}
//window.requestAnimationFrame(reDoPlayer);

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
x: innerWidth / 2,
y: innerHeight / 2
}

addEventListener("mousemove", function(event){
    mouse.x -= event.movementX;
    mouse.y += event.movementY;
    
    
});
 
window.requestAnimationFrame(Ray);

function Ray(){
    window.requestAnimationFrame(Ray);
    for(var b = 0; b < ray_num; b++)
    {
        const [width, height] = [map[0].length, map.length];
        var distArray = [];
        for(var i=0; i<height; i++)
        {
            for(var j=0;j<width;j++)
            {
                if(map[i][j] > 0 && map[i][j] <= 4){
                    var wall = {
                        x: canvasWidth / width * j,
                        y: canvasHeight / height * i,
                        height: canvasHeight / height,
                        width: canvasWidth / width,
                        color: map[i][j]
                    };
                    var ray = {
                    x,
                    y
                    };
                    for(var p = 0; p <= check; p++)
                    {
                        ray.x = x + 100 * Math.cos(-(mouse.x - b) * Math.PI / 180) * ((p*checkMultiplyer)/100);
                        ray.y = y + 100 * Math.sin(-(mouse.x - b) * Math.PI / 180) * ((p*checkMultiplyer)/100);
                        
                        if(pointInside(wall, ray.x, ray.y)){
                            distArray.push({dist:Distance(x,ray.x,y,ray.y), wall:wall});
                        }
                    }
                    
                }
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

                if(b == ray_num/2){
                    CorrDist={dist:dist.dist, wall: dist.wall};
                }else{
                    CorrDist={
                        dist:Math.sqrt(dist.dist)*Math.cos(mouse.x-(b-ray_num/2)),
                        wall: dist.wall
                    };
                }

            }

        }


        draw3D(dist, b);
        /*drawRay(x,y,x + 300 * Math.cos(-(mouse.x - b) * Math.PI / 180),y + 300 * Math.sin(-(mouse.x - b) * Math.PI / 180));*/
    }
}



function drawRay(x1,y1,x2,y2) {
    canvas.beginPath();
    canvas.strokeStyle = 'red';
    canvas.moveTo(x1,y1);
    canvas.lineTo(x2,y2);   
    canvas.stroke();
}

function draw3D(dist, b) {
    Dcanvas.beginPath();
    
    //dist.dist = dist.dist/Math.cos(b+ray_num/2 - ray_num);

    if(dist.dist<0){
        dist.dist = 0;
    }else if(dist.dist>(canvasHeight/2)){
        dist.dist = (canvasHeight/2);
    }
    var Rdist = 255-dist.dist/RGBmultiplyer;
    
    if(Rdist<0){
        Rdist = 0;
    }

    
    var Sdist = Rdist.toString();
    switch(dist.wall.color)
    {
        case 1:Dcanvas.fillStyle = `rgb(${Sdist},0,0)`;
        break;
        case 2:Dcanvas.fillStyle = `rgb(0,${Sdist},0)`;
        break;
        case 3:Dcanvas.fillStyle = `rgb(0,0,${Sdist})`;
        break;
        case 4:Dcanvas.fillStyle = `rgb(${Sdist},${Sdist},${Sdist})`;
        break;
    }
    
    
    Dcanvas.fillRect((
      canvasWidth/ray_num) * b,
      canvasHeight/2+dist.dist/2,
      canvasWidth/ray_num,
      canvasHeight/2-dist.dist);

    Dcanvas.fill();
}


function arrayMin(arr) { return Math.min.apply(Math, arr); }
function arrayMax(arr) { return Math.max.apply(Math, arr); }
function FixAng(a){ if(a>360){ a-=361;} if(a<1){ a+=361;} return a;}
function distance(ax,ay,bx,by,ang){ return Math.cos(Math.degToRad(ang))*(bx-ax)-sin(Math.degToRad(ang))*(by-ay);}
function degToRad(degrees){var pi = Math.PI;return degrees * (pi/180);}


function clearCanvas(){
    Dcanvas.beginPath();
    Dcanvas.fillStyle = 'black';
    Dcanvas.fillRect(0, 0, canvasWidth, canvasHeight);
    Dcanvas.fill();
}

function CPoints(angle, radius, distance){
    return {
        x: x + radius * Math.cos(angle * Math.PI / 180) * distance,
        y: y + radius * Math.sin(angle * Math.PI / 180) * distance
    
    }
}


function line_intersect(x1, y1, x2, y2, x3, y3, x4, y4)
{
var ua, ub, denom = (y4 - y3)*(x2 - x1) - (x4 - x3)*(y2 - y1);
if (denom == 0) {
    return 0;
}
ua = ((x4 - x3)*(y1 - y3) - (y4 - y3)*(x1 - x3))/denom;
ub = ((x2 - x1)*(y1 - y3) - (y2 - y1)*(x1 - x3))/denom;
return {
    x: x1 + ua * (x2 - x1),
    y: y1 + ua * (y2 - y1),
    seg1: ua >= 0 && ua <= 1,
    seg2: ub >= 0 && ub <= 1
}
}   

setInterval(drawPlayer, 20);
//setInterval(drawMap, 15);
setInterval(Collide, 1);
setInterval(clearCanvas, 100);

