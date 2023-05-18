export default class TurnControllerScene extends Phaser.Scene{
    constructor() {
        super('TurnControllerScene')
    }

    create(){
        console.log(this)
        // let uiTExt = this.add.bitmapText(100,500,'pressstart','Olá pessoal')
        
        this.input.on('pointerover', (element:any) =>{
            console.log(element)
        })

        this.input.on('pointerdown', (element:any) =>{
            console.log(element)
        })
    }
}