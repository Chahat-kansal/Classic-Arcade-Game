
var Enemy = function(y, s) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = y;
    this.width = 70;
    this.height = 10;
    this.speed = s;
};


Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //velocity ensures a radom speed every time update is called
    var velocity = this.speed * dt * (Math.random() * 50);
    this.x += velocity;
    if (this.x > 500) {
        this.x = 0;
        this.y = this.newLoc();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Enemy.prototype.collisions = function() {
    if (this.x > (player.x - this.width) && (this.x - this.width) < player.x && (this.y + this.height) === player.y) {
        player.high = player.setHigh();
        player.score = 0;
        player.reset();
    }
};

Enemy.prototype.newLoc = function() {
    var rowLocations = [60, 140, 220];
    var random = rowLocations[Math.floor(Math.random() * rowLocations.length)];
    return random;
};

// ---------------------------PLAYER CLASS----------------------------------------------------------------

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 200;
    this.y = 390;
    this.score = 0;
    this.high = 0;
    this.sprite = 'images/char-horn-girl.png';
};

//Updates the player's position once the player has reached the water
//It also adds points to the current score
Player.prototype.update = function() {
    if (this.y === -10) {
        this.add();
        this.reset();
    }
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = "30px sans-serif";
    ctx.fillText(("Score: " + this.score), 10, 100);
    ctx.fillText(("High Score: " + this.high), 200, 100);
};


Player.prototype.handle = function(input) {
    switch (input) {
        case "down":
            if (this.y < 380) {
                this.y += 80;
            }
            break;
        case "left":
            if (this.x > 0) {
                this.x -= 100;
            }
            break;
        case "up":
            if (this.y > 50) {
                this.y -= 80;
            }
            break;
        case "right":
            if (this.x < 400) {
                this.x += 100;
            }
            break;
    }
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 390;
};

//Adds points to the player's current score
Player.prototype.add = function() {
    this.score += 10;
};

//Keeps track of the highest score during the session
//Gets updated every time the player dies depending on the higher score
Player.prototype.setHigh = function() {
    if (this.score > this.high) {
        this.high = this.score;
    }
    return this.high;
};

// ---------------------------Start of game----------------------------------------------------------------

var bug1 = new Enemy(60, (Math.random() * 10));
var bug2 = new Enemy(140, (Math.random() * 10));
var bug3 = new Enemy(220, (Math.random() * 10));

var allEnemies = [bug1, bug2, bug3];

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handle(allowedKeys[e.keyCode]);
});