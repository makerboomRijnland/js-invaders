class Bullet {
    color = 'red';
    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    move() {
        this.y -= 5;
    }

    draw(context) {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, 5, 0, 2 * Math.PI);
        context.fill();
    }

}

// let bullet = new Bullet(10, 20);

const player = {
    x: 390,
    y: 580,

    move: function() {
        if(direction.up) {
            this.y -= 10;
        }
        if(direction.down) {
            this.y += 10;
        }
        if(direction.left) {
            this.x -= 10;
        }
        if(direction.right) {
            this.x += 10;
        }
    },

    draw: function(context) {
        context.fillStyle = 'yellow';
        context.fillRect(this.x, this.y, 20, 20);
    }
};

let bullets = [];

let direction = {
    up: false,
    down: false,
    left: false,
    right: false
};

function setup() {
    
}

function update() {
    player.move();

    for(let index = 0; index < bullets.length; index++){
        bullets[index].move();
    }

    draw();
}

function draw() {
    const canvas = document.getElementById('invaders-canvas');
    const context = canvas.getContext('2d');

    context.fillStyle = 'black';
    context.fillRect(0, 0, 800, 600);
    
    context.font = "48px Verdana";
    context.fillStyle = 'white';
    context.fillText("Space Invaders", 10, 50);

    player.draw(context);

    for(let index = 0; index < bullets.length; index++){
        bullets[index].draw(context);
    }
}

function movePlayer(event) {
    switch(event.key) {
        case "ArrowLeft":
            direction.left = true;
            // player.x -= 10;
            break;
        case "ArrowRight":
            direction.right = true;
            // player.x += 10;
            break;
        case "ArrowUp":
            // player.y -= 10;
            direction.up = true;
            break;
        case "ArrowDown":
            direction.down = true;
            // player.y += 10;
            break;
        case " ":
            let bullet = new Bullet(player.x + 10, player.y);
            bullets.push(bullet);
            break;
    }
}

function keyUp(event) {
    switch(event.key) {
        case "ArrowLeft":
            direction.left = false;
            break;
        case "ArrowRight":
            direction.right = false;
            break;
        case "ArrowUp":
            direction.up = false;
            break;
        case "ArrowDown":
            direction.down = false;
            break;
    }
}

window.addEventListener('load', setup);
window.addEventListener('keydown', movePlayer);
window.addEventListener('keyup', keyUp);

setInterval(update, 50);