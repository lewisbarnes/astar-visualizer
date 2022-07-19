var openSet = new Array();
var closedSet = new Array();

var w;
var h;
var n;

function distance(start, end) {
    return Math.sqrt(((start.y - start.x) * 2) + ((end.y - end.x) * 2));
}

function reconstructPath(node) {
    var tempPath = new Array();
    while(node.cameFrom != undefined) {
        node.isPath = true;
        tempPath.push(node);
        node = node.cameFrom;
    }
    console.log('reconstruct');
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
                var tG = (current.g + 1) + distance(start, end);
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

function buildNodeSet(np, wp, hp) {
    w = wp;
    h = hp;
    n = np;
    var set = new Array();

    for(var i = 0; i < n; i++) {
        set.push(new Array(n));
    }

    for(var i = 0; i < n; i++) {
        for(var j = 0; j < n; j++) {
            set[i][j] = new Node(j, i, w, h);
            if(Math.random(1) < 0.2) {
                set[i][j].isObstacle = true;
            }
        }
    }

    for(var i = 0; i < n; i++) {
        for(var j = 0; j < n; j++) {
            set[i][j].setNeighbors(set);
        }
    }

    return set;
}