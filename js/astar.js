var openSet = new Array();
var closedSet = new Array();
var nodeSet = new Array();

var path = new Array();

var n = 100;

var canvasWidth = 800;
var canvasHeight = 800;
var canvas;
var ctx;

var w = canvasWidth / n;
var h = canvasHeight / n;

var Node = function(x,y) {
    this.x = x;
    this.y = y;
    this.g = Infinity;
    this.f = Infinity;
    this.cameFrom = undefined;
    this.neighbors = Array();
    this.isObstacle = false;

    this.setNeighbors = function(set) {
        if(this.y - 1 >= 0) {                                           // top
            this.neighbors.push(set[this.y - 1][this.x]);
        }
        if(this.x + 1 < set.length) {                                   // right
            this.neighbors.push(set[this.y][this.x + 1]);
        }
        if(this.y + 1 < set.length) {                                   // bottom
            this.neighbors.push(set[this.y + 1][this.x]);
        }
        if(this.x - 1 >= 0) {                                           // left
            this.neighbors.push(set[this.y][this.x - 1]);
        }
        if(this.x - 1 >= 0 && this.y - 1 >= 0) {                        // top left
            this.neighbors.push(set[this.y - 1][this.x - 1]);
        }
        if(this.x + 1 < set.length && this.y - 1 >= 0) {                // top right
            this.neighbors.push(set[this.y - 1][this.x + 1]);
        }
        if(this.x + 1 < set.length && this.y + 1 < set.length) {        // bottom right
            this.neighbors.push(set[this.y + 1][this.x + 1]);
        }
        if(this.x - 1 >= 0 && this.y + 1 < set.length) {                // bottom left
            this.neighbors.push(set[this.y + 1][this.x - 1]);
        }        
    }

    this.render = function(ctx, asPath) {
        if(asPath) {
            ctx.strokeStyle = 'pink';
            ctx.beginPath();
            ctx.moveTo((this.x * w)  + (w / 2), (this.y * h) + (h / 2));
            ctx.lineTo((this.cameFrom.x * w) + (w / 2), (this.cameFrom.y * h)  + (h / 2));
            ctx.closePath();
            ctx.stroke();
        }
        else {
            ctx.fillStyle = 'white';
            if(this.isObstacle) {
                ctx.fillStyle = 'black';
            }
            ctx.fillRect((this.x * w)  + (w / 2), (this.y * h) + (h / 2), w / 4, h / 4);
        }
    }
}

function distance(start, end) {
    return Math.sqrt(((start.y - start.x) * 2) + ((end.y - end.x) * 2));
}

function reconstructPath(node) {
    var tempPath = Array();
    while(node.cameFrom != undefined) {
        tempPath.push(node);
        node = node.cameFrom;
    }
    return tempPath;
}

function aStar(start, end) {
    openSet.push(start);
    start.g = 0;
    start.h = distance(start, end);

    var current = start;
    while(openSet.length > 0) {

        var currentIndex = 0;
        for(var i = 0; i < openSet.length; i++) {
            if(openSet[i].g < current.g) {
                currentIndex = i;
            }
        }

        current = openSet[currentIndex];

        if(current == end) {
            return reconstructPath(current);
        }
        

        openSet.splice(openSet[currentIndex], 1);

        for(var i = 0; i < current.neighbors.length; i++) {
            if(!current.neighbors[i].isObstacle) {
                var tG = (current.g + 1) + distance(current, current.neighbors[i]);
                if(tG < current.neighbors[i].g) {
                    current.neighbors[i].cameFrom = current;
                    current.neighbors[i].g = tG;
                    current.neighbors[i].f = tG + distance(current.neighbors[i], end);
                    if(!openSet.includes(current.neighbors[i])) {
                        openSet.push(current.neighbors[i]);
                    }
                }
            }
        }
    }
    return Array();
}


window.onload = function() {
    for(var i = 0; i < n; i++) {
        nodeSet.push(new Array(n));
    }

    for(var i = 0; i < n; i++) {
        for(var j = 0; j < n; j++) {
            nodeSet[i][j] = new Node(j, i);
            if(Math.random(1) < 0.2) {
                nodeSet[i][j].isObstacle = true;
            }
        }
    }

    for(var i = 0; i < n; i++) {
        for(var j = 0; j < n; j++) {
            nodeSet[i][j].setNeighbors(nodeSet);
        }
    }

    

    var start = nodeSet[0][0];
    var end = nodeSet[n-1][n-1];

    start.isObstacle = false;
    end.isObstacle = false;

    path = aStar(start,end);

    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    document.body.appendChild(canvas);

    for(var i = 0; i < n; i++) {
        for(var j = 0; j < n; j++) {
            nodeSet[i][j].render(ctx, false);
        }
    }

    for(var i = 0; i < path.length; i++) {
        path[i].render(ctx, true);
    }
}