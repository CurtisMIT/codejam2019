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
let cursors
function preload() {
    this.load.image('sky', 'assets/sky.png')
    this.load.spritesheet('trainer', 'assets/trainer.png', { frameWidth: 51, frameHeight: 54 })
}

function create() {
    this.add.image(400, 300, 'sky')

    trainer = this.physics.add.sprite(100, 450, 'trainer')
    trainer.setCollideWorldBounds(true)

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

    cursors = this.input.keyboard.createCursorKeys()

}

function update() {
    if (cursors.left.isDown) {
        trainer.setVelocityX(-160)
        trainer.setVelocityY(0)

        trainer.anims.play('west', true)
    } else if (cursors.right.isDown) {
        trainer.setVelocityX(160)
        trainer.setVelocityY(0)
        
        trainer.anims.play('east', true)
    } else if (cursors.up.isDown) {
        trainer.setVelocityX(0)
        trainer.setVelocityY(-160)

        trainer.anims.play('north', true)
    } else if (cursors.down.isDown) {
        trainer.setVelocityX(0)
        trainer.setVelocityY(160)

        trainer.anims.play('south', true)
    } else {
        trainer.setVelocityX(0)
        trainer.setVelocityY(0)

        trainer.anims.play('still')
    }
}