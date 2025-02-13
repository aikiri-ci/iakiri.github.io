class GraphAnimation {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.classList.add('background-animation');
        this.ctx = this.canvas.getContext('2d');
        this.points = [];
        this.numPoints = 50;
        this.connections = [];
        this.init();
    }

    init() {
        document.querySelector('.hero').appendChild(this.canvas);
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.createPoints();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createPoints() {
        for (let i = 0; i < this.numPoints; i++) {
            this.points.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });
        }
    }

    drawConnections() {
        this.connections = [];
        for (let i = 0; i < this.points.length; i++) {
            for (let j = i + 1; j < this.points.length; j++) {
                const dx = this.points[i].x - this.points[j].x;
                const dy = this.points[i].y - this.points[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 200) {
                    this.connections.push({
                        start: this.points[i],
                        end: this.points[j],
                        opacity: 1 - distance / 200
                    });
                }
            }
        }

        this.ctx.strokeStyle = '#2563eb';
        this.connections.forEach(connection => {
            this.ctx.beginPath();
            this.ctx.moveTo(connection.start.x, connection.start.y);
            this.ctx.lineTo(connection.end.x, connection.end.y);
            this.ctx.globalAlpha = connection.opacity * 0.2;
            this.ctx.stroke();
        });
        this.ctx.globalAlpha = 1;
    }

    updatePoints() {
        this.points.forEach(point => {
            point.x += point.vx;
            point.y += point.vy;

            if (point.x < 0 || point.x > this.canvas.width) point.vx *= -1;
            if (point.y < 0 || point.y > this.canvas.height) point.vy *= -1;
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawConnections();
        
        this.ctx.fillStyle = '#2563eb';
        this.points.forEach(point => {
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    animate() {
        this.updatePoints();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GraphAnimation();
});
