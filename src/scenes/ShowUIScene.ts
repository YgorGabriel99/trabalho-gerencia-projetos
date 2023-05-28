import { WarMatch } from "../game/WarMatch";
import eventsCenter from "../services/EventsCenter";
export default class ShowUIScene extends Phaser.Scene {
    public warMatch: WarMatch;
    public isOpen: boolean = false;
    public INITIALX: number = 20;
    public INITIALY: number = 450;
    finishPhaseButton: Phaser.GameObjects.Text;
    displayPhase: Phaser.GameObjects.Text;
    displayMessage: Phaser.GameObjects.Text;


    constructor() {
        super("ShowUIScene")
    }

    preload(){
        this.load.html('show-ui' , 'assets/html/show-ui.html');
    }

    init(data: { warMatch: any; }){
        let {warMatch} = data;
        this.warMatch = warMatch;
    }

    destroyUI(){

    }

    refresh(){
        
        // this.displayMessage.destroy()
        let counter = 0;
        this.warMatch.turn.playersOrders.forEach(playerId => {
            let player = this.warMatch.getPlayerById(playerId);
            if(player.playerText){
                player.destroyPlayerText()
            }
            let currentPlayerId = this.warMatch.turn.getCurrentPlayerId();
            this.warMatch.setPlayerTotalArmies(player)
            this.warMatch.setPlayerTotalTerritories(player)
            player.showGamePlayer(this.INITIALX, this.INITIALY + (counter * 20),currentPlayerId,this)
            counter++;
        })

        this.finishPhaseButton = this.add.text(this.INITIALX, this.INITIALY + (counter * 20), "Finalizar")
        .setOrigin(0).setInteractive({ useHandCursor: true  }).setBackgroundColor("#fcefse")

        this.displayPhase = this.add.text(this.INITIALX, this.INITIALY + (++counter * 20), 
        `Fase Atual: ${this.warMatch.turn.getCurrentPhaseName()}`).setColor("#000")

        this.displayMessage = this.add.text(this.INITIALX, this.INITIALY + (++counter * 20),
        ``)
        .setColor("#000")
        this.updateArmies()

        //Eventos
        this.finishPhaseButton.on("pointerdown", () =>{
            eventsCenter.emit("next-phase",this.warMatch.getCurrentPlayer())
            this.nextPhase()
        })

        this.finishPhaseButton.on("pointerover", () =>{
            this.finishPhaseButton.setAlpha(0.5)
        })
        this.finishPhaseButton.on("pointerout", () =>{
            this.finishPhaseButton.setAlpha(1)
        })
    }

    updateArmies(){
        let placedArmies = this.warMatch.turn.getCurrentPlayer(this.warMatch.players)?.placed["all"]
        let placebleArmies = this.warMatch.turn.getCurrentPlayer(this.warMatch.players)?.placeble["all"]
        this.displayMessage.setText(
            `Exércitos Disponíveis: ${placebleArmies} Exércitos alocados: ${placedArmies}`
        )
    }

    create(){
        this.input.keyboard.on("keydown-Q",()=>{
            this.scene.stop("ShowUIScene");
        })

        this.input.keyboard.on("keydown-F",()=>{
            // this.scene.stop("ShowUIScene");
            this.nextPhase()
        })

        eventsCenter.on("territory-clicked", ()=>{
            this.displayPhase.destroy()
            this.displayMessage.destroy()
            this.refresh()
        })
        this.refresh();
    }

    nextPhase(){
        this.warMatch.turn.nextPhase()
        this.displayPhase.destroy()
        this.displayMessage.destroy()
        this.refresh()
    }
}