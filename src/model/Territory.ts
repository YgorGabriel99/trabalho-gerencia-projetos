import eventsCenter from "../services/EventsCenter";
import { GamePlayer } from "./GamePlayer";

export class Territory extends Phaser.GameObjects.Container {
    
    

    public id: number;
    public owner?: GamePlayer;
    public name: string;
    public armies: number;
    public scene: Phaser.Scene;
    public slug: string;
    public spriteTerritory: Phaser.GameObjects.Sprite;
    public armiesText: Phaser.GameObjects.BitmapText;
    public neighbors: number[];
    public isSelected: boolean = false;
    public isHighlighted:boolean = false;
    constructor(data: any) {
        let {id, name, slug, armies, scene, x, y, spriteSource, neighbors} = data;
        let spriteTerritory = new Phaser.GameObjects.Sprite(scene, 0, 0, 'territorios', slug).setOrigin(0)
        .setDepth(-1).setAlpha(0.85)
        let textX = spriteSource['x'] + spriteSource['w']/2
        let textY = spriteSource['y'] + spriteSource['h']/2
        let armiesText = new Phaser.GameObjects.BitmapText(scene, textX, textY, 'pressstart', armies, 16, Phaser.GameObjects.BitmapText.ALIGN_CENTER)
        .setDepth(100)
        let territoryText = new Phaser.GameObjects.BitmapText(scene, textX - 20, textY - 20, 'pressstart', name, 10, Phaser.GameObjects.BitmapText.ALIGN_LEFT)
        .setDepth(10).setTintFill(0x000)
        super(scene, x, y, [spriteTerritory, armiesText, territoryText]);
        this.setScale(0.8).setX(x+200)
        this.setInteractive(new Phaser.Geom.Circle(textX, textY, 45), Phaser.Geom.Circle.Contains)
        this.spriteTerritory = spriteTerritory;
        this.armiesText = armiesText;
        this.neighbors = neighbors;
        this.id = id;
        this.slug = slug;
        this.armies = armies;
        this.name = name;
        this.scene = scene;
        this.scene.add.existing(this);
        this.on("pointerdown", ()=>{
            eventsCenter.emit("territory-clicked", this)
        });
        this.on("pointerover", this.hoverIn)
        this.on("pointerout", this.hoverOut)
    }

    hoverIn(){
        this.spriteTerritory.setAlpha(0.4)
    }

    hoverOut(){
        this.updateTint();
    }

    mobilizar() {
        
        if(this.owner?.isCurrentPlayer() && this.owner.hasArmiesToPlace()){
            this.placeArmies(1);
            this.owner.placeArmie("all",1)
        }
        // else{
        //     this.unplaceArmies(1)
        //     this.owner?.unplaceArmie("all",1)
        // }
        eventsCenter.emit("armies-placed")
    }

    
    changeSelected():void{
        this.isSelected = !this.isSelected
    }

    changeHighlighted():void{
        this.isHighlighted = !this.isHighlighted
    }

    public highlight():void{
        this.changeHighlighted()
        this.spriteTerritory.setAlpha(0.4)
    }

    public unhighlight():void{
        this.changeHighlighted()
        this.updateTint()
    }
    
    public select():void{
        this.changeSelected()
        this.updateTint()
        this.spriteTerritory.setAlpha(1)
    }

    public unselect():void{
        this.isSelected = false;
        this.armies++
        this.spriteTerritory.setTintFill(0xffffff)
        this.spriteTerritory.clearAlpha()
        this.updateText()
        this.updateTint()
    }

    public setOwner(gamePlayer: GamePlayer){
        this.owner = gamePlayer
        this.updateTint()
    }

    updateText(){
        this.armiesText.setText(this.armies.toString())
    }

    updateTint() {
        this.spriteTerritory.setAlpha(0.85)
        this.spriteTerritory.setTintFill(this.owner?.color)
    }

    highlightNeighbours(territories:Array<Territory>) {
        territories.filter(territory => {
            return this.neighbors.includes(territory.id) && this.owner !== territory.owner
        }).forEach(territory =>{
            territory.highlight()
        })
    }

    unhighlightNeighbours(territories:Array<Territory>) {
        // const neighbors = 
        territories.filter(territory => {
            return this.neighbors.includes(territory.id) && this.owner !== territory.owner
        }).forEach(territory =>{
            territory.unhighlight()
        })
    }

    isNeighbour(other: Territory):boolean{
        return this.neighbors.includes(other.id)
    }

    attack(territory: Territory){
        if(this.armies < 2){
            alert("Movimento inválido, você não tem exércitos suficientes")
            return
        }else{
            let attackArmies = Math.min(this.armies - 1, 3)
            let defenseArmies = Math.min(territory.armies, 3)
            alert(`${this.name} - ${attackArmies} x ${defenseArmies} - ${territory.name}`)
        }
    }

    placeArmies(quantity: number){
        this.armies += quantity;
        this.updateText();
    }

    unplaceArmies(quantity: number){
        if(this.armies > quantity){
            this.armies -= quantity;
            this.updateText();
        }
    }

    setInitialArmies(){
        this.armies = 1;
    }

    conquer(owner: GamePlayer | undefined, transfer: number) {
        this.owner = owner;
        this.armies = transfer;
    }
}