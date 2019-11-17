class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame")
    }

    create = () => {
        // creating background
        this.background = this.add.image(0, 0, 'background')
        this.background.setOrigin(0, 0)
        
        this.location = "center"
        // creating belt
        this.belt = this.physics.add.sprite(400, 570, 'belt')
        this.belt.setScale(2.5)

        //creating stations
        this.mainWork = this.physics.add.sprite(303, 125, 'main').setScale(0.75)
        this.mainWork.setImmovable(true)
        this.iceTray = this.physics.add.sprite(700, 125, 'ice')
        this.iceTray.setImmovable(true)
        this.cups = this.physics.add.sprite(58, 410, 'cups')
        this.cups.setImmovable(true)

        // creating person and trainer
        this.person = this.physics.add.sprite(300, 450, 'barista')
        // this.trainer = this.physics.add.sprite(100, 450, 'trainer')
        // this.trainer.setImmovable(true)

        // creating steps for user to click
        // this.steps = this.physics.add.group()
        // let maxSteps = 12 + (100 * 7)
        // for (let i = 12; i <= maxSteps; i += 100) {
        //     let step = this.physics.add.sprite(i, 520, 'star')
        //     step.setInteractive()
        //     this.steps.add(step)
        // }

        this.steps = this.physics.add.staticGroup()
        this.stepIce = this.add.sprite(12, 520, 'iceCube')
        this.steps.add(this.stepIce)
        this.stepIce.on('pointerdown', this.goToIce)

        this.stepLCup = this.add.sprite(112, 520, 'large')
        this.steps.add(this.stepLCup)
        this.stepLCup.on('pointerdown', this.goToCups)

        this.stepSCup = this.add.sprite(212, 520, 'small')
        this.steps.add(this.stepSCup)
        this.stepSCup.on('pointerdown', this.goToCups)

        this.stepLSugar = this.add.sprite(312, 520, 'Hsugar')
        this.steps.add(this.stepLSugar)
        this.stepLSugar.on('pointerdown', this.goToSugar)

        this.stepHSugar = this.add.sprite(412, 520, 'Lsugar')
        this.steps.add(this.stepHSugar)
        this.stepHSugar.on('pointerdown', this.goToSugar)

        this.stepTop1 = this.add.sprite(512, 520, 'boba')
        this.steps.add(this.stepTop1)
        this.stepTop1.on('pointerdown', this.goToTop)

        this.stepTop2 = this.add.sprite(612, 520, 'jelly')
        this.steps.add(this.stepTop2)
        this.stepTop2.on('pointerdown', this.goToTop)

        this.stepTea = this.add.sprite(712, 520, 'tea')
        this.steps.add(this.stepTea)
        this.stepTea.on('pointerdown', this.goToTea)

        this.stepIce.setInteractive()
        this.stepLCup.setInteractive()
        this.stepSCup.setInteractive()
        this.stepLSugar.setInteractive()
        this.stepHSugar.setInteractive()
        this.stepTop1.setInteractive()
        this.stepTop2.setInteractive()
        this.stepTea.setInteractive()

        // listen for user clicking gameobjects
        // this.input.on('gameobjectdown', this.execStep, this)

        this.physics.add.collider(this.person, this.trainer)
        this.physics.add.collider(this.person, this.iceTray, this.halt)
        this.physics.add.collider(this.person, this.mainWork, this.halt)
        this.physics.add.collider(this.person, this.cups, this.halt)

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

        this.anims.create({
            key: 'still',
            frames: [ { key: 'barista', frame: 0 } ],
            frameRate: 20
        })

        this.anims.create({
            key: 'west',
            frames: this.anims.generateFrameNumbers('barista', { start: 4, end: 7}),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'east',
            frames: this.anims.generateFrameNumbers('barista', { start: 8, end: 11 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'north',
            frames: this.anims.generateFrameNumbers('barista', { start: 12, end: 15 } ),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'south',
            frames: this.anims.generateFrameNumbers('barista', { start: 1, end: 3 } ),
            frameRate: 10,
            repeat: -1
        })
    }

    update = () => {

        // for (let i = 0; i < this.steps.getChildren().length; i++) {
        //     let steps = this.steps.getChildren()
        //     this.moveStep(steps[i], 1)
        // }
        
        for (let i = 0; i < this.steps.getChildren().length; i++) {
            this.moveStep(this.steps.getChildren()[i], 1)
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
        console.log(gameObject)
        gameObject.setTexture('explosion')
        gameObject.play('explode')
        this.physics.moveToObject(this.person, this.trainer)
    }

    halt = () => {
        this.person.setVelocity(0, 0)
    }

    goToIce = () => {
        console.log('ice')
        console.log(this.location)
        if (this.location === 'center') {
            this.person.anims.play('east', true)
            this.tweens.add({
                targets: [this.person],
                x: 700,
                duration: 2000,
                callbackScope: this,
                onComplete: function() {
                    this.person.anims.play('north', true)
                    this.tweens.add({
                        targets: [this.person],
                        y: 200,
                        duration: 2000,
                        callbackScope: this,
                        onComplete: function() {
                            this.location = 'iceTray'
                            this.person.anims.play('still')
                            console.log('going up')
                        }
                    })
                }
            })
        } else if (this.location === 'cups') {
            this.person.anims.play('east', true)
            this.tweens.add({
                targets: [this.person],
                x: 700,
                duration: 3000,
                callbackScope: this,
                onComplete: function() {
                    this.person.anims.play('north', true)
                    this.tweens.add({
                        targets: [this.person],
                        y: 200,
                        duration: 3000,
                        callbackScope: this,
                        onComplete: function() {
                            this.location = 'iceTray'
                            this.person.anims.play('still')
                            console.log('going up')
                        }
                    })
                }
            })
        } else if (this.location === 'top') {
            this.person.anims.play('east', true)
            this.tweens.add({
                targets: [this.person],
                x: 700,
                duration: 2000,
                callbackScope: this,
                onComplete: function() {
                    this.location = 'iceTray'
                    this.person.anims.play('still')
                }
            })
        } else if (this.location === 'sugar') {
            this.person.anims.play('east', true)
            this.tweens.add({
                targets: [this.person],
                x: 700,
                duration: 3000,
                callbackScope: this,
                onComplete: function() {
                    this.location = 'iceTray'
                    this.person.anims.play('still')
                }
            })
        } else if (this.location === 'tea') {
            this.person.anims.play('east', true)
            this.tweens.add({
                targets: [this.person],
                x: 700,
                duration: 3000,
                callbackScope: this,
                onComplete: function() {
                    this.location = 'iceTray'
                    this.person.anims.play('still')
                }
            })
        }
        // this.physics.moveToObject(this.person, this.iceTray)
    }

    goToCups = () => {
        console.log('cups')
        if (this.location === 'center') {
            this.person.anims.play('west', true)
            this.tweens.add({
                targets: [this.person],
                x: 150,
                duration: 1000,
                callbackScope: this,
                onComplete: function() {
                    this.location = 'cups'
                    this.person.anims.play('still')
                }
            })
        } else if (this.location === 'iceTray') {
            this.person.anims.play('south', true)
            this.tweens.add({
                targets: [this.person],
                y: 410,
                duration: 3000,
                callbackScope: this,
                onComplete: function() {
                    this.person.anims.play('west', true)
                    this.tweens.add({
                        targets: [this.person],
                        x: 150,
                        duration: 3000,
                        callbackScope: this,
                        onComplete: function() {
                            this.location = 'cups'
                            this.person.anims.play('still')
                        }
                    })
                }
            })
        } else if (this.location === 'sugar') {
            this.person.anims.play('east', true)
            this.tweens.add({
                targets: [this.person],
                x: 150,
                duration: 1000,
                callbackScope: this,
                onComplete: function() {
                    this.person.anims.play('south', true)
                    this.tweens.add({
                        targets: [this.person],
                        y: 410,
                        duration: 2000,
                        callbackScope: this,
                        onComplete: function() {
                            this.location = 'cups'
                            this.person.anims.play('still')
                        }
                    })
                }
            })
        } else if (this.location === 'top') {
            this.person.anims.play('south', true)
            this.tweens.add({
                targets: [this.person],
                y: 410,
                duration: 3000,
                callbackScope: this,
                onComplete: function() {
                    this.person.anims.play('west', true)
                    this.tweens.add({
                        targets: [this.person],
                        x: 150,
                        duration: 3000,
                        callbackScope: this,
                        onComplete: function() {
                            this.location = 'cups'
                            this.person.anims.play('still')
                        }
                    })
                }
            })
        } else if (this.location === 'tea') {
            this.person.anims.play('south', true)
            this.tweens.add({
                targets: [this.person],
                y: 410,
                duration: 3000,
                callbackScope: this,
                onComplete: function() {
                    this.person.anims.play('west', true)
                    this.tweens.add({
                        targets: [this.person],
                        x: 150,
                        duration: 3000,
                        callbackScope: this,
                        onComplete: function() {
                            this.location = 'cups'
                            this.person.anims.play('still')
                        }
                    })
                }
            })
        }
        // this.physics.moveToObject(this.person, this.cups)
    }

    goToSugar = () => {
        if (this.location === 'center') {
            this.person.anims.play('north', true)
            this.tweens.add({
                targets: [this.person],
                y: 200,
                duration: 2000,
                callbackScope: this,
                onComplete: function() {
                    this.person.anims.play('west', true)
                    this.tweens.add({
                        targets: [this.person],
                        x: 80,
                        duration: 2000,
                        callbackScope: this,
                        onComplete: function() {
                            this.location = 'sugar'
                            this.person.anims.play('still')
                        }
                    })
                }
            })
        } else if (this.location === 'iceTray') {
            this.person.anims.play('west', true)
            this.tweens.add({
                targets: [this.person],
                x: 80,
                duration: 2000,
                callbackScope: this,
                onComplete: function() {
                    this.location = 'sugar'
                    this.person.anims.play('still')
                }
            })
        } else if (this.location === 'cups') {
            this.person.anims.play('north', true)
            this.tweens.add({
                targets: [this.person],
                y: 200,
                duration: 2000,
                callbackScope: this,
                onComplete: function() {
                    this.person.anims.play('west', true)
                    this.tweens.add({
                        targets: [this.person],
                        x: 80,
                        duration: 1000,
                        callbackScope: this,
                        onComplete: function() {
                            this.location = 'sugar'
                            this.person.anims.play('still')
                        }
                    })
                }
            })
        } else if (this.location === 'top') {
            this.person.anims.play('west', true)
            this.tweens.add({
                targets: [this.person],
                x: 80,
                duration: 2000,
                callbackScope: this,
                onComplete: function() {
                    this.location = 'sugar'
                    this.person.anims.play('still')
                }
            })
        } else if (this.location === 'tea') {
            this.person.anims.play('west', true)
            this.tweens.add({
                targets: [this.person],
                x: 80,
                duration: 2000,
                callbackScope: this,
                onComplete: function() {
                    this.location = 'sugar'
                    this.person.anims.play('still')
                }
            })
        }
    }

    goToTop = () => {
        if (this.location === 'center') {
            this.person.anims.play('north', true)
            this.tweens.add({
                targets: [this.person],
                y: 200,
                duration: 3000,
                callbackScope: this,
                onComplete: function() {
                    this.person.anims.play('west', true)
                    this.tweens.add({
                        targets: [this.person],
                        x: 207,
                        duration: 1000,
                        callbackScope: this,
                        onComplete: function() {
                            this.location = 'top'
                            this.person.anims.play('still')
                        }
                    })
                }
            })
        } else if (this.location === 'iceTray') {
            this.person.anims.play('west', true)
            this.tweens.add({
                targets: [this.person],
                x: 207,
                duration: 2000,
                callbackScope: this,
                onComplete: function() {
                    this.location = 'top'
                    this.person.anims.play('still')
                }
            })
        } else if (this.location === 'cups') {
            this.person.anims.play('north', true)
            this.tweens.add({
                targets: [this.person],
                y: 200,
                duration: 3000,
                callbackScope: this,
                onComplete: function() {
                    this.person.anims.play('east', true)
                    this.tweens.add({
                        targets: [this.person],
                        x: 207,
                        duration: 1000,
                        callbackScope: this,
                        onComplete: function() {
                            this.location = 'top'
                            this.person.anims.play('still')
                        }
                    })
                }
            })
        } else if (this.location === 'sugar') {
            this.person.anims.play('east', true)
            this.tweens.add({
                targets: [this.person],
                x: 207,
                duration: 2000,
                callbackScope: this,
                onComplete: function() {
                    this.location = 'top'
                    this.person.anims.play('still')
                }
            })
        } else if (this.location === 'tea') {
            this.person.anims.play('west', true)
            this.tweens.add({
                targets: [this.person],
                x: 207,
                duration: 2000,
                callbackScope: this,
                onComplete: function() {
                    this.location = 'top'
                    this.person.anims.play('still')
                }
            })
        }
    }

    goToTea = () => {
        console.log('tea')
        if (this.location === 'center') {
            this.person.anims.play('north', true)
            this.tweens.add({
                targets: [this.person],
                y: 200,
                duration: 2000,
                callbackScope: this,
                onComplete: function() {
                    this.person.anims.play('east', true)
                    this.tweens.add({
                        targets: [this.person],
                        x: 400,
                        duration: 1000,
                        callbackScope: this,
                        onComplete: function() {
                            this.location = 'tea'
                            this.person.anims.play('still')
                        }
                    })
                }
            })
        } else if (this.location === 'iceTray') {
            this.person.anims.play('west', true)
            this.tweens.add({
                targets: [this.person],
                x: 400,
                duration: 2000,
                callbackScope: this,
                onComplete: function() {
                    this.location = 'tea'
                    this.person.anims.play('still')
                }
            })
        } else if (this.location === 'cups') {
            this.person.anims.play('north', true)
            this.tweens.add({
                targets: [this.person],
                y: 200,
                duration: 2000,
                callbackScope: this,
                onComplete: function() {
                    this.person.anims.play('east', true)
                    this.tweens.add({
                        targets: [this.person],
                        x: 400,
                        duration: 1000,
                        callbackScope: this,
                        onComplete: function() {
                            this.location = 'tea'
                            this.person.anims.play('still')
                        }
                    })
                }
            })
        } else if (this.location === 'sugar') {
            this.person.anims.play('east', true)
            this.tweens.add({
                targets: [this.person],
                x: 400,
                duration: 2000,
                callbackScope: this,
                onComplete: function() {
                    this.location = 'tea'
                    this.person.anims.play('still')
                }
            })
        } else if (this.location === 'top') {
            this.person.anims.play('east', true)
            this.tweens.add({
                targets: [this.person],
                x: 400,
                duration: 2000,
                callbackScope: this,
                onComplete: function() {
                    this.location = 'tea'
                    this.person.anims.play('still')
                }
            })
        }
        // this.physics.moveToObject(this.person, this.mainWork)
    }
}