import { Phases } from "../game/Turn";
import { WarMatch } from "../game/WarMatch";
import { MainGameScene } from "../main-scene";
import eventsCenter from "../services/EventsCenter";

export default class ShowUIScene extends Phaser.Scene {
    public warMatch: WarMatch;
    public isOpen: boolean = false;
    public INITIALX: number = 20;
    public INITIALY: number = 320;


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

    refresh(){
        let counter = 0;

        this.warMatch.turn.playersOrders.forEach(playerId => {
            let player = this.warMatch.getPlayerById(playerId);
            let currentPlayerId = this.warMatch.turn.getCurrentPlayerId();
            this.warMatch.setPlayerTotalArmies(player)
            this.warMatch.setPlayerTotalTerritories(player)
            player.showGamePlayer(this.INITIALX, this.INITIALY + (counter * 20),currentPlayerId,this)
            counter++;
        })
        let finishPhaseButton = this.add.text(this.INITIALX, this.INITIALY + (counter * 20), "Finalizar")
        .setOrigin(0).setInteractive({ useHandCursor: true  }).setBackgroundColor("#fcefse")

        let displayPhase = this.add.text(this.INITIALX, this.INITIALY + (++counter * 20), 
        `Fase Atual: ${this.warMatch.turn.getCurrentPhaseName()}`)


        //Eventos
        finishPhaseButton.on("pointerdown", () =>{
            console.log("Clicked")
        })

        finishPhaseButton.on("pointerover", () =>{
            finishPhaseButton.setAlpha(0.5)
        })
        finishPhaseButton.on("pointerout", () =>{
            finishPhaseButton.setAlpha(1)
        })
    }

    create(){
        this.input.keyboard.on("keydown-Q",()=>{
            this.scene.stop("ShowUIScene");
        })
        this.refresh();
    }

    
}