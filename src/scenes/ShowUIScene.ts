import { WarMatch } from "../game/WarMatch";
export default class ShowUIScene extends Phaser.Scene {
    public warMatch: WarMatch;
    public isOpen: boolean = false;
    public INITIALX: number = 20;
    public INITIALY: number = 450;


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

        let finishPhaseButton = this.add.text(this.INITIALX, this.INITIALY + (counter * 20), "Finalizar")
        .setOrigin(0).setInteractive({ useHandCursor: true  }).setBackgroundColor("#fcefse")

        let displayPhase = this.add.text(this.INITIALX, this.INITIALY + (++counter * 20), 
        `Fase Atual: ${this.warMatch.turn.getCurrentPhaseName()}`)

        //Eventos
        finishPhaseButton.on("pointerdown", () =>{
            this.warMatch.turn.nextPhase()
            displayPhase.destroy()
            this.refresh()
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