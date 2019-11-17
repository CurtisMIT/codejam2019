class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame")
    }

    preload = () => {
        this.load.image('background', 'assets/background.png')
        this.load.image('star', 'assets/star.png')
        this.load.spritesheet('trainer', 'assets/trainer.png', { frameWidth: 51, frameHeight: 54 })
        this.load.spritesheet('belt', 'assets/belt.png', { frameWidth: 383.75, frameHeight: 37})
        this.load.spritesheet('barista', 'assets/barista.png',  { frameWidth: 75, frameHeight: 86 })
        this.load.spritesheet('explode', 'assets/explosion.png', { frameWidth: 16, frameHeight: 16 })
    }

    create = () => {
        this.add.text(20, 20, 'Loading game...')
        this.scene.start('playGame')
    }
}