import { WarMatch } from "../game/WarMatch";
import eventsCenter from "../services/EventsCenter";
import ContadorExercitos from "../model/ContadorExercitos";
import { Player } from "../model/Player";
export default class ShowUIScene extends Phaser.Scene {
    public warMatch: WarMatch;
    public isOpen: boolean = false;
    public INITIALX: number = 20;
    public INITIALY: number = 450;
    finishPhaseButton: Phaser.GameObjects.Text;
    displayPhase: Phaser.GameObjects.Text;
    displayMessage: Phaser.GameObjects.Text;
    items: ContadorExercitos;


    constructor() {
        super("DisplayScene")
    }
    

    init(data: { warMatch: WarMatch; }){
        let {warMatch} = data;
        this.warMatch = warMatch;
        console.log(this);
    }

    create(){
        let count = 0;
        this.warMatch.players.forEach(player =>{
            this.items = new ContadorExercitos({
                scene:this,
                x: 0,
                y: 50 + (90*count),
                fundo: 'retangulo_arredondado',
                player: player,
            });
            count++;
            console.log(this)
        })
    }
}