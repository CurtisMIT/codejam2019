class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame")
    }

    create = () => {
        // creating background
        this.background = this.add.image(0, 0, 'background')
        this.background.setOrigin(0, 0)
        
        // creating belt
        this.belt = this.physics.add.sprite(400, 570, 'belt')
        this.belt.setScale(2.5)

        // creating person and trainer
        this.person = this.physics.add.sprite(300, 450, 'barista')
        this.trainer = this.physics.add.sprite(100, 450, 'trainer')

        // creating steps for user to click
        this.steps = this.physics.add.group()
        let maxSteps = 222
        for (let i = 12; i <= maxSteps; i += 70) {
            let step = this.physics.add.sprite(i, 520, 'star')
            step.setInteractive()
            this.steps.add(step)
        }

        // this.step1 = this.add.sprite(12, 520, 'star')
        // this.step2 = this.add.sprite(82, 520, 'star')
        // this.step3 = this.add.sprite(152, 520, 'star')
        // this.step4 = this.add.sprite(222, 520, 'star')
        // this.step1.setInteractive()
        // this.step2.setInteractive()
        // this.step3.setInteractive()
        // this.step4.setInteractive()

        // listen for user clicking gameobjects
        this.input.on('gameobjectdown', this.execStep, this)



        // animations
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explode'),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        })

        this.anims.create({
            key: 'belt',
            frames: this.anims.generateFrameNumbers('belt', { start: 3, end: 0 }),
            frameRate: 10,
            repeat: -1
        })
    }

    update = () => {
        // this.moveStep(this.step1, 1)
        // this.moveStep(this.step2, 1)
        // this.moveStep(this.step3, 1)
        // this.moveStep(this.step4, 1)

        for (let i = 0; i < this.steps.getChildren().length; i++) {
            let steps = this.steps.getChildren()
            this.moveStep(steps[i], 1)
        }
        this.belt.anims.play('belt', true)
    }

    moveStep = (step, speed) => {
        step.x += speed
        if (step.x > config.width) {
            this.resetStep(step)
        }
    }
    
    resetStep = (step) => {
        step.x = 0
    }

    execStep = (pointer, gameObject) => {
        gameObject.setTexture('explosion')
        gameObject.play('explode')
        this.physics.moveToObject(this.person, this.trainer)
    }
}