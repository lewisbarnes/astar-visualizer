var nodeSet = new Array();

var n = 100;

var ctx;

var canvasWidth = 800;
var canvasHeight = 800;
var canvas;

window.onload = function() {
    nodeSet = buildNodeSet(n, canvasWidth / n, canvasHeight / n );

    

    var start = nodeSet[0][0];
    var end = nodeSet[n-1][n-1];

    start.isStart = true;
    start.isObstacle = false;

    end.isEnd = true;
    end.isObstacle = false;

    path = aStar(start,end);

    console.log(path.length);
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    document.body.appendChild(canvas);

    for(var i = 0; i < n; i++) {
        for(var j = 0; j < n; j++) {
            nodeSet[i][j].render(ctx);
        }
    }
}