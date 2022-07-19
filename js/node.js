var Node = function(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.g = Infinity;
    this.f = Infinity;
    this.cameFrom = undefined;
    this.neighbors = new Array();
    this.isObstacle = false;
    this.isPath = false;
    this.isStart = false;
    this.isEnd = false;
    this.w = w;
    this.h = h

    this.setNeighbors = function(set) {
        for(var i = -1; i < 2; i++) {
            for(var j = -1; j < 2; j++) {
                if(this.x + j >= 0 && this.x + j < set.length && this.y + i >= 0 && this.y + i < set.length) {
                    this.neighbors.push(set[this.y + i][this.x + j]);
                }
            }
        }    
    }

    this.render = function(ctx) {
        if(this.isObstacle || this.isStart || this.isEnd) {
            ctx.fillStyle = 'black';
            if(this.isStart) {
                ctx.fillStyle = 'green';
            } 
            else if(this.isEnd) {
                ctx.fillStyle = 'red';
            }
            ctx.fillRect((this.x * this.w)  + (this.w / 2) - (this.w / 2 / 2), (this.y * this.h) + (this.h / 2) - (this.h / 2 / 2), this.w / 2, this.h / 2);
            if(this.isObstacle) {
                ctx.strokeStyle = 'black';
                ctx.strokeRect(this.x * this.w, this.y * this.w, this.w, this.h);
            }

            
        }
        if(this.isPath) {
            ctx.strokeStyle = 'purple';
            ctx.beginPath();
            ctx.moveTo((this.x * this.w)  + (this.w / 2), (this.y * this.h) + (this.h / 2));
            ctx.lineTo((this.cameFrom.x * this.w) + (this.w / 2), (this.cameFrom.y * this.h)  + (this.h / 2));
            ctx.closePath();
            ctx.stroke();
        }
    }
}