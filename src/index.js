// bruuuuh
import * as Phaser from 'phaser'


const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 2000 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// fatt oof
const game = new Phaser.Game(config);
let player;
let platforms;
let boosting;
let cursors;
let lastTime = Date.now();;
let curTime;
let jumpAcc = -100000;


function preload() {
    this.load.image('ground', 'assets/platform.png');
    this.load.image('guy', 'assets/G.png');
}

function create() {
    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(50, 250, 'ground');

    player = this.physics.add.image(100, 200, 'guy');
    player.setCollideWorldBounds(true);
    player.body.setMaxSpeed(400);
    // le friction
    player.setDragX(1600);
    player.setDragY(100);
    player.isOnFloor;

    // cursors = this.input.keyboard.addKeys({
    //     left: Phaser.Input.Keyboard.KeyCodes.LEFT,
    //     right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
    //     up: Phaser.Input.Keyboard.KeyCodes.UP
    // });

    cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(player, platforms);
}

function update() {
    // le dt
    curTime = Date.now();
    let dt = curTime - lastTime;
    lastTime = curTime;

    // TODO its fucked, jumping while running makes you fall slower??
    // also jumping and running feels wrong
    if (cursors.left.isDown) {
        player.setAccelerationX(-100 * dt);
    } else if (cursors.right.isDown) {
        player.setAccelerationX(100 * dt);
    } else {
        player.setAccelerationX(0);
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setAccelerationY(-Math.pow(10, 5));
    } else {
        player.setAccelerationY(0);
    }
}

function jump(dt, acc) {
    let canJump = player.body.touching.down;
    if (canJump || boosting) {
        boosting = true;
        player.setVelocityY(acc * dt);
    }
    return canJump;
}

function stopJumpBoost() {
    boosting = false;
}