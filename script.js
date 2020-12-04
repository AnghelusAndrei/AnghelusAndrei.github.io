"use strict";
const Dc = document.getElementById("3Dcanvas");

const speed = 5;


const ray_num = 100;
const resolution = 25;
const check = 100*(resolution/10);


const jTime = 50;

const RGBmultiplyer = 1;
const dMult = 1.1;
const resMult = 0.1;
var fullScr = true;

var j = 0;

const Dcanvas=document.getElementById("3Dcanvas").getContext("2d");


Dcanvas.canvas.width  = window.innerWidth;
Dcanvas.canvas.height = window.innerHeight;


const canvasHeight=Dc.height;
const canvasWidth=Dc.width;

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
    } else if (Dc.webkitRequestFullscreen) {
        Dc.webkitRequestFullscreen();
    } else if (Dc.msRequestFullscreen) {
        Dc.msRequestFullscreen();
    }
}

var map = [
    [2,   2,   2,   2,   2,     2,    2,   2,   2,     2],
    [2,r(10),r(11),r(13),r(13),r(13),r(11),r(11),r(10),2],
    [2,r(10),r(11),r(13),r(16),r(16),r(15),r(13),r(13),2],
    [2,r(11),r(13),r(16),r(16),r(16),r(16),r(15),r(11),2],
    [2,r(13),r(16),r(16),    0,    0,r(16),r(16),r(15),2],
    [2,r(15),r(16),r(16),    0,    0,r(16),r(16),r(15),2],
    [2,r(13),r(15),r(16),r(16),r(16),r(16),r(15),r(11),2],
    [2,r(11),r(13),r(15),r(15),r(16),r(15),r(13),r(11),2],
    [2,r(10),r(11),r(13),r(15),r(15),r(13),r(10),r(10),2],
    [2,   2,   2 ,  2,   2,     2,    2,   2,   2,     2]
];

const XcheckMultiplyer = canvasHeight/map[0].length/resolution;
const YcheckMultiplyer = canvasHeight/map.length/resolution;



function r(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function drawMap(){
const [width, height] = [map[0].length, map.length]
for(var i=0; i<height; i++)
{
    for(var j=0;j<width;j++)
    {
        if(map[i][j] >= 1 && map[i][j] <= 6){
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
function pointInside(wall, x, y,s)
{
    return wall.x - s < x && wall.x + wall.width + s >x && wall.y - s <y && wall.y + wall.height + s > y
}
function Collide(){
    const [width, height] = [map[0].length, map.length];
    for(var i=0; i<height; i++)
    {
        for(var j=0;j<width;j++)
        {
            if(map[i][j] >= 1  && map[i][j] <= 6){
                var wall = {
                    x: canvasWidth / width * j,
                    y: canvasHeight / height * i,
                    height: canvasHeight / height,
                    width: canvasWidth / width,
                }
                
                if(pointInside(wall, x-5, y-5,6) || pointInside(wall, x-5 ,y+5,6) || pointInside(wall, x+5, y-5,6) || pointInside(wall, x+5, y+5,6)){
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
    case 32:
        for(var i = 0; i <= 100; i++){
            if(i<=35){
                setTimeout(() => {j-=2},jTime);
            }else if(i>35&&i<=50)
            {
                setTimeout(() => {j-=0.5},jTime);
            }else if(i>50&&i<=65)
            {
                setTimeout(() => {j+=0.5},jTime);
            }else if(i>65)
            {
                setTimeout(() => {j+=2},jTime);
            }
        }
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
window.requestAnimationFrame(reDoPlayer);
canvas.beginPath();
canvas.fillStyle = 'black';
canvas.arc(x, y, radius, 0, 2 * Math.PI, false);
canvas.fill();
}

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
y: innerHeight * 2

}

addEventListener("mousemove", function(event){
    
    mouse.x -= event.movementX;
    mouse.y += event.movementY;
    
    
});
 
window.requestAnimationFrame(Ray);

function Ray(){

    clearCanvas();
    window.requestAnimationFrame(Ray);

    for(var b = 0; b < ray_num; b+=0.5)
    {
        const [width, height]=[map[0].length, map.length];
        var distArray = [];


        var ray = {
        x,
        y
        };

        var found = false;

        for(var p = 0; p <= check; p++)
        {
            if(found==false){
                ray.x = Math.round(x + Math.cos(-(mouse.x - b) * Math.PI / 180) * p*XcheckMultiplyer);
                ray.y = Math.round(y + Math.sin(-(mouse.x - b) * Math.PI / 180) * p*YcheckMultiplyer);
                            
                for(var i=0; i<height; i++)
                {
                    for(var j=0;j<width;j++)
                    {
                        if(map[i][j] > 0 && map[i][j] <= 6){
        
                            var wall = {
                                x: canvasWidth / width * j,
                                y: canvasHeight / height * i,
                                height: canvasHeight / height,
                                width: canvasWidth / width,
                                color: map[i][j]
                            };
                            
                            if(pointInside(wall, ray.x, ray.y,6)){
                                //var lightLevel;
                                found = true;
                                //if(ray.x<=wall.x){lightLevel = 0;}
                                //else{lightLevel = 1;}
                                distArray.push({dist:Distance(x,ray.x,y,ray.y), wall:wall/*, light:lightLevel*/});
                            }
                        }        
                    }
                }
            }   
        }
        var dist;
        var MIN=canvasHeight;
        for(var i=0;i<distArray.length;i++)
        {
            if(distArray[i].dist<MIN) 
            {
                MIN = distArray[i].dist;
                dist=distArray[i];

                dist.dist *= Math.cos(degToRad(Math.abs(ray_num/2-b)));
            }
        }
        draw3D(dist, b);
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

    dist.dist = Math.round(dist.dist);

    //var l = dist.light * 70;

    if(dist.dist>canvasHeight/2){
        dist.dist = Math.round(canvasHeight/2);
    }



    var Rdist = Math.round(255-dist.dist/RGBmultiplyer/*-l*/);
    
    if(Rdist<0){
        Rdist = 0;
    }
    
    var Sdist = Rdist.toString();

    var a = ['0',Sdist,'0'];

    //Dcanvas.fillStyle = `rgb(${a[r(a.length)]},${a[r(a.length)]},${a[r(a.length)]})`;
    
    switch(dist.wall.color)
    {
        case 1:Dcanvas.fillStyle = `rgb(${Sdist},0,0)`;
        break;
        case 2:Dcanvas.fillStyle = `rgb(0,${Sdist},0)`;
        break;
        case 3:Dcanvas.fillStyle = `rgb(0,0,${Sdist})`;
        break;
        case 4:Dcanvas.fillStyle = `rgb(${Sdist},${Sdist},0)`;
        break;
        case 5:Dcanvas.fillStyle = `rgb(0,${Sdist},${Sdist})`;
        break;
        case 6:Dcanvas.fillStyle = `rgb(${Sdist},${Sdist},${Sdist})`;
        break;
    }
    
    
    Dcanvas.fillRect(
        Math.round(canvasWidth/ray_num) * b,
        canvasHeight+dist.dist/2-fixAng2(mouse.y)-j,
        Math.round(canvasWidth/ray_num),
        canvasHeight/2-dist.dist);
    Dcanvas.fill();
}


function arrayMin(arr) { return Math.min.apply(Math, arr); }
function arrayMax(arr) { return Math.max.apply(Math, arr); }
function FixAng(a){ if(a>360){ a-=361;} if(a<1){ a+=361;} return a;}
function fixAng2(a){ if(a>canvasHeight*2){ a-=canvasHeight*3;} if(a<-canvasHeight){ a+=canvasHeight*3;} return a;}
function distance(ax,ay,bx,by,ang){ return Math.cos(Math.degToRad(ang))*(bx-ax)-sin(Math.degToRad(ang))*(by-ay);}
function degToRad(degrees){var pi = Math.PI;return degrees * (pi/180);}


function clearCanvas(){

    Dcanvas.beginPath();
    Dcanvas.fillStyle = `rgb(255,255,255)`;
    Dcanvas.fillRect(0, 0, canvasWidth, Math.round(canvasHeight));
    
    var grd = Dcanvas.createLinearGradient(0, canvasHeight/2-fixAng2(mouse.y)-j, 0, canvasHeight*2-fixAng2(mouse.y)-j);
    
    grd.addColorStop(0, `rgb(255,255,255)`);
    grd.addColorStop(.45, `rgb(0,0,0)`);
    grd.addColorStop(.55, `rgb(0,0,0)`);
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
//window.requestAnimationFrame(reDoPlayer);
//setInterval(drawMap, 15);
setInterval(Collide, 20);
