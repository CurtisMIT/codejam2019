class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame")
    }

    preload = () => {
        this.load.image('background', 'assets/background.png')

        this.load.image('star', 'assets/star.png')
        this.load.image('ice', 'assets/iceCan.png')
        this.load.image('main', 'assets/teaCounter2.svg')
        this.load.image('cups', 'assets/cup.png')
        this.load.image('bottom', 'assets/counterBot.png')

        this.load.image('iceCube', 'assets/terminals/ice.svg')
        this.load.image('boba', 'assets/terminals/boba.svg')
        this.load.image('jelly', 'assets/terminals/jelly.svg')
        this.load.image('large', 'assets/terminals/large.svg')
        this.load.image('small', 'assets/terminals/small.svg')
        this.load.image('Lsugar', 'assets/terminals/sugar.svg')
        this.load.image('Hsugar', 'assets/terminals/sugarH.svg')
        this.load.image('tea', 'assets/terminals/tea.svg')

        this.load.spritesheet('trainer', 'assets/trainer.png', { frameWidth: 51, frameHeight: 54 })
        this.load.spritesheet('belt', 'assets/belt.png', { frameWidth: 383.75, frameHeight: 37})
        this.load.spritesheet('barista', 'assets/person.svg',  { frameWidth: 99, frameHeight: 100 })
        this.load.spritesheet('explode', 'assets/explosion.png', { frameWidth: 16, frameHeight: 16 })
    }

    create = () => {
        this.add.text(20, 20, 'Loading game...')
        this.scene.start('playGame')
    }
}