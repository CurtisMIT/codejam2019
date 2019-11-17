const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}
const game = new Phaser.Game(config)
let trainer
let direction
let platforms
let cursors
function preload() {
    this.load.image('sky', 'assets/sky.png')
    this.load.spritesheet('trainer', 'assets/trainer.png', { frameWidth: 51, frameHeight: 54 })
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 })
    this.load.image('star', 'assets/star.png')
    this.load.spritesheet('belt', 'assets/belt.png', { frameWidth: 383.75, frameHeight: 37})
}

function listener() {
    console.log('clicked')
}

function create() {
    this.add.image(400, 300, 'sky')
    // this.add.image(400, 200, 'belt')
    // platforms = this.physics.add.staticGroup()
    // platforms.create(400, 568, 'belt').setScale(2).refreshBody()
    // platforms.create(400, 568, 'temp').setScale(2).refreshBody()
    belt = this.physics.add.sprite(400, 580, 'belt')
    belt.setScale(2.5)
    belt.body.static = true

    trainer = this.physics.add.sprite(100, 450, 'trainer')
    trainer.setCollideWorldBounds(true)
    trainer.setInteractive()
    trainer.on('pointerdown', listener)


    this.anims.create({
        key: 'still',
        frames: [ { key: 'trainer', frame: 0 } ],
        frameRate: 20
    })

    this.anims.create({
        key: 'west',
        frames: this.anims.generateFrameNumbers('trainer', { start: 4, end: 7}),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: 'east',
        frames: this.anims.generateFrameNumbers('trainer', { start: 8, end: 11}),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: 'north',
        frames: this.anims.generateFrameNumbers('trainer', { start: 12, end: 15 } ),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: 'south',
        frames: this.anims.generateFrameNumbers('trainer', { start: 1, end: 3 } ),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: 'belt',
        frames: this.anims.generateFrameNumbers('belt', { start: 3, end: 0 }),
        frameRate: 30,
        repeat: -1
    })

    cursors = this.input.keyboard.createCursorKeys()

}

function update() {
    if (cursors.left.isDown) {
        trainer.setVelocityX(-160)
        trainer.setVelocityY(0)

        trainer.anims.play('west', true)
        direction = 'west'
    } else if (cursors.right.isDown) {
        trainer.setVelocityX(160)
        trainer.setVelocityY(0)
        
        trainer.anims.play('east', true)
        direction = 'east'
    } else if (cursors.up.isDown) {
        trainer.setVelocityX(0)
        trainer.setVelocityY(-160)

        trainer.anims.play('north', true)
        direction = 'north'
    } else if (cursors.down.isDown) {
        trainer.setVelocityX(0)
        trainer.setVelocityY(160)

        trainer.anims.play('south', true)
        direction = 'south'
    } else {
        trainer.setVelocityX(0)
        trainer.setVelocityY(0)

        // if (direction === 'west') {
        //     trainer.anims.play('west')
        // } else if (direction === 'east') {
        //     trainer.anims.play('east')
        // } else if (direction === 'north') {
        //     trainer.anims.play('north')
        // } else if (direction === 'south') {
        //     trainer.anims.play('still')
        // } else {
        //     trainer.anims.play('still')
        // }

        trainer.anims.play('north', true)
        // platforms.anims.play('belt', true)
        belt.anims.play('belt', true)
    }
}