import { WarMatch } from "../game/WarMatch";
import eventsCenter from "../services/EventsCenter";
import ContadorExercitos from "../view/ContadorExercitos";
import { Player } from "../model/Player";
import StatusJogador from "../view/StatusJogador";
import ObjetivoJogador from "../view/ObjetivoJogador";
import IconeCarta from "../view/IconeCarta";
export default class ShowUIScene extends Phaser.Scene {
    public warMatch: WarMatch;
    public isOpen: boolean = false;
    public INITIALX: number = 20;
    public INITIALY: number = 450;
    finishPhaseButton: Phaser.GameObjects.Text;
    displayPhase: Phaser.GameObjects.Text;
    displayMessage: Phaser.GameObjects.Text;
    items: ContadorExercitos;
    items2: ContadorExercitos;
    objetivo: any;
    iconCarta: any;


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
            this.warMatch.setPlayerTotalArmies(player)
            this.warMatch.setPlayerTotalTerritories(player)
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

        count = 0;
        // this.warMatch.players.forEach(player =>{
        //     this.warMatch.setPlayerTotalArmies(player)
        //     this.warMatch.setPlayerTotalTerritories(player)
            this.items2 = new StatusJogador({
                scene:this,
                x: 250,
                y: 500,
                fundo: 'barra_azul',
                // player: player,
            });
            // count++;
        //     console.log(this)
        // })
       
        this.objetivo = new ObjetivoJogador({
            scene:this,
            x: 250,
            y: 500,
            fundo: 'ellipse',
            // player: player,
        });

        this.iconCarta = new IconeCarta({
            scene:this,
            x: 250,
            y: 500,
            fundo: 'carta',
            // player: player,
        });
        


    }
}