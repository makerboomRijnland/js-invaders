class Enemy {
    x;
    y;
    size;
    hp;

    constructor(x, y, size, hp) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.hp = hp;
    }

    draw(context) {
        
    }
}

// new Enemy(10, 20, 5, 50);

class Bullet {
    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    update() {
        this.y -= 20;
    }

    draw(context) {
        context.fillStyle = "red";
        context.beginPath();
        context.arc(this.x, this.y, 5, 0, Math.PI * 2);
        context.fill();
    }
}

// new Bullet(20, 10);

let player = {
    x: 400,
    y: 580,

    shoot: function() {
        return new Bullet(this.x, this.y);
    },

    update: function() {
        if(direction.left == true) {
            if(this.x > 10) {
                this.x -= 10;
            }
        }
        if(direction.right == true) {
            if(this.x < 790) {
                this.x += 10;
            }
        }
        if(direction.up == true) {
            if(this.y > 0) {
                this.y -= 10;
            }
        }
        if(direction.down == true) {
            if(this.y < 580) {
                this.y += 10;
            }
        }
    },

    draw: function(context) {
        context.fillStyle = "yellow";
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x - 10, this.y + 20);
        context.lineTo(this.x + 10, this.y + 20);
        context.fill();
    }
};

let bullets = [];

let direction = {
    left: false,
    right: false,
    up: false,
    down: false,
    shoot: false,
};

function update() {
    player.update();

    if(direction.shoot) {
        let bullet = player.shoot();
        bullets.push( bullet );
    }

    // update()
    for(let index = 0; index < bullets.length; index++) {
        const bullet = bullets[index];
        bullet.update();
    }

    draw();
}

function draw() {
    let canvas = document.getElementById('invaders-canvas');
    let context = canvas.getContext('2d');

    context.fillStyle = "black";
    context.fillRect(0, 0, 800, 600);

    context.fillStyle = "white";
    context.font = '48px serif';
    context.fillText("Space Invaders", 10, 50);

    player.draw(context);

    // draw()
    for(let index = 0; index < bullets.length; index++) {
        const bullet = bullets[index];
        bullet.draw(context);
    }

}

function setup() {
    draw();
}

function keyDown(event) {
    switch(event.key) {
        case "ArrowLeft":
            direction.left = true;
            break;
        case "ArrowRight":
            direction.right = true;
            break;

        case "ArrowUp":
            direction.up = true;
            break;

        case "ArrowDown":
            direction.down = true;
            break;

        case " ":
            direction.shoot = true;
            // let bullet = player.shoot();
            // bullets.push( bullet );
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

        case " ":
            direction.shoot = false;
            break;
    }
}

window.addEventListener('load', setup);
window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

setInterval(update, 50);