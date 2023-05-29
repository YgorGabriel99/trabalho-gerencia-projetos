import Phaser from "phaser";
import { TerritoryFactory } from './services/territory-factory'
import { WarMatch } from "./game/WarMatch";
import { Phases, Turn } from "./game/Turn";
import { GamePlayer } from "./model/GamePlayer";
import { Territory } from "./model/Territory";
import { Board } from "./game/Board";
import eventsCenter from "./services/EventsCenter";
import PlayerType from "./model/Player";
import InitGameScene from "./scenes/InitGameScene";
import Util from "./services/Util";



const COLORS = {
    'black': 0x4f4f4d,
    'green': 0x03a95e,
    'yellow': 0xe9ae02,
    'blue': 0x1a54a5,
    'pink': 0xde2587,
    'red': 0xec3829,
}

export class MainGameScene extends Phaser.Scene {

    public warMatch!: WarMatch;
    public inputKeys: object;
    continentsData: any;
    constructor() {
        super('MainGameScene');
        
    }

    preload():void{
        //Carregando os territórios
        let territorios = this.load.aseprite('territorios', 
        '../assets/images/mapa_war.png',
        '../assets/images/mapa_war.json')    

        //Carregando a fonte
        this.load.bitmapFont('pressstart', 'assets/fonts/pressstart.png','assets/fonts/pressstart.fnt') 
        
        // //Carregando dados do mapa
        this.load.json('frame', 'assets/images/mapa_war.json');
        this.load.json('territories', 'assets/data/territories.json');
        this.load.json('continents', 'assets/data/continents.json');
        
    }
    
    create(): void {
        this.continentsData = this.cache.json.get('continents').continents;
  
        this.warMatch = new WarMatch(new Board(), new Turn(), this);
       
        this.add.bitmapText(10,10,'pressstart','WAR')
      
        //Eventos
        eventsCenter.on("init", (players: PlayerType[]) => {
            if(this.warMatch.init(players)){
                console.log(players)
                this.scene.stop("InitGameScene")
                this.scene.run("ShowUIScene",{warMatch: this.warMatch})
            }else{
                this.scene.launch("InitGameScene")
            }
        })

        eventsCenter.on("restart", (msg:string) => {
            this.scene.restart()
        })

        eventsCenter.on("showModal", (msg:string) => {
            console.log(msg)
        })

        this.input.keyboard.on("keydown-Q",()=>{
            this.scene.launch("ShowUIScene",{warMatch: this.warMatch})
        })

        eventsCenter.on(this.warMatch.turn.phasesNames[Phases.MOBILIZAR],(msg: any)=>{
            //FALTA O MÉTODO DE CÁLCULO DA TOTALIDADE!!!!!!
            //Calcular total de exercitos
            this.warMatch.getTotalArmiesToPlace()
        })

        eventsCenter.on(this.warMatch.turn.phasesNames[Phases.ATACAR],(msg: any)=>{
            console.log(msg)
            // console.log(this.warMatch)
        })

        eventsCenter.on(this.warMatch.turn.phasesNames[Phases.FORTIFICAR],(msg: any)=>{
            console.log(msg)
            // console.log(this.warMatch)
        })

        eventsCenter.on("territory-clicked", (territory:Territory) =>{
            if(this.warMatch.turn.currentPhase === Phases.MOBILIZAR){
                territory.mobilize(this.warMatch.board.continents)
            }else if(this.warMatch.turn.currentPhase === Phases.ATACAR){
                this.warMatch.board.checkAttackCondition(
                    territory, this.warMatch.getCurrentPlayer()
                )
            }else if(this.warMatch.turn.currentPhase === Phases.FORTIFICAR){
                this.warMatch.board.checkFortifyCondition(
                    territory, this.warMatch.getCurrentPlayer()
                )
            }
        })

        eventsCenter.on("next-phase", (player:GamePlayer) =>{
            player.clearPlaced();
        })

        let players = [
            {id: 1, name: 'Tiago', ia: 'false', color: 'black'},
            {id: 2, name: 'Paulo', ia: 'false', color: 'blue'},
            {id: 3, name: 'Rafa', ia: 'false', color: 'red'},
            {id: 4,name: "Ygor",ia: false,color: 'green'},
            {id: 5,name: "Thali",ia: false,color: 'yellow'},
            {id: 6,name: "Edu",ia: false,color: 'pink'}

        ]
        // this.scene.run("InitGameScene")
        // eventsCenter.emit('init', players);

        if(this.warMatch.init(players)){
            this.scene.run("ShowUIScene",{warMatch: this.warMatch})
        }
        
    }

    update(): void {

    }
}