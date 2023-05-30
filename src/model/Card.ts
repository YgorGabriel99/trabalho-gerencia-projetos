export class Card extends Phaser.GameObjects.Container {

    constructor(data: any) {
        console.log(data)
        let {x,y, scene, card, territory, continent} = data
        
        console.log(data)
        
        // let cardText = new Phaser.GameObjects.BitmapText(x , y, scene, "pressstart", territory.name, 12, Phaser.GameObjects.BitmapText.ALIGN_CENTER)
        let cardRectangle = new Phaser.GameObjects.Rectangle(scene, x, y, 100, 150, 0x000).setAlpha(0.2).setOrigin(0.5)
        let cardText = new Phaser.GameObjects.Text(scene, x , y, territory.name, {color: "black", align:"center"}).setOrigin(0.5)
        super(scene, x, y, [cardText, cardRectangle])
        this.setScale(0.5)

        cardRectangle.setInteractive()
        cardRectangle.on("pointerover",()=>{
            this.scene.tweens.add({
                targets: this,
                props: {
                    scale: 0.8,
                    x: x-100,
                    y: y - 150
                },
                duration: 500,
                ease: 'Power3'
            })
        })
        cardRectangle.on("pointerout",()=>{
            this.scene.tweens.add({
                targets: this,
                props: {
                    scale: 0.5,
                    x: x,
                    y: y
                },
                duration: 500,
                ease: 'Power3'
            })
        })

        this.scene.add.existing(this)

    }


}