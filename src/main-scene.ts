import Phaser from "phaser";
import { TerritoryFactory } from './services/territory-factory'
import { WarMatch } from "./game/WarMatch";
import { Turn } from "./game/Turn";
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
        
        
        
    }
    
    create(): void {

        this.warMatch = new WarMatch(new Board(), new Turn(), this);
       
        // this.warMatch.shufflePlayerInBoard()
        
        // this.warMatch.getPlayerTotalTerritories(this.warMatch.players[0])

        // this.warMatch.showPlayers(this)

        /* this.input.on('gameobjectover', (pointer:Phaser.Input.Pointer, territory:Territory) =>
        {
            if(!this.warMatch.board.hasSelectedTerritory()){
                // console.log(territory)
                territory.highlight();
            }
        });

        this.input.on('gameobjectout', (pointer:Phaser.Input.Pointer,  territory:Territory) =>
        {
            if(!this.warMatch.board.hasSelectedTerritory()){
                territory.updateTint();
            }
            
        });

        this.input.on('gameobjectdown', (pointer:Phaser.Input.Pointer, territory:Territory) =>{

            if (!this.warMatch.board.hasSelectedTerritory()){
                this.warMatch.board.clearBoard()
                territory.select()
                territory.highlightNeighbours(this.warMatch.board.territories);
                return
            }else if(territory.isSelected){
                territory.unselect()
                territory.unhighlightNeighbours(this.warMatch.board.territories);
                return
            }else if(territory.isHighlighted && this.warMatch.board.getSelected()){
                const selectedTerritory = this.warMatch.board.getSelected()
                if(territory.isNeighbour(selectedTerritory)){
                    alert(`${selectedTerritory.owner?.name} está atacando com ${selectedTerritory.name} o território ${territory.name} de ${territory.owner?.name}`)
                    selectedTerritory.attack(territory)
                    return
                }
                console.log(territory.isNeighbour(selectedTerritory))
                return
            }else {
                alert("Movimento inválido")
            }
        }) */
        this.add.bitmapText(10,10,'pressstart','WAR')

        // let players = [
        //     {id: 1,name: "Tiago",ia: false,color: 'black'},
        //     {id: 2,name: "Diogo",ia: false,color: 'blue'},
        //     {id: 3,name: "Julia",ia: false,color: 'red'},
        //     {id: 4,name: "Gaaby",ia: false,color: 'green'},
        //     {id: 5,name: "Baarb",ia: false,color: 'yellow'},
        //     {id: 6,name: "Lucca",ia: false,color: 'pink'}
        // ]
        let players = [
            {id: 1, name: 'Tiago', ia: 'false', color: 'black'},
            {id: 2, name: 'Diogo', ia: 'false', color: 'blue'},
            {id: 3, name: 'Julia', ia: 'false', color: 'red'},
            {id: 4, name: 'Gaaby', ia: 'false', color: 'yellow'},
            {id: 5, name: 'Baarb', ia: 'false', color: 'green'},
            {id: 6, name: 'Lucca', ia: 'false', color: 'pink'},
        ]
        // this.scene.run("InitGameScene")
        // eventsCenter.emit('init', players);
        if(this.warMatch.init(players)){
            this.scene.run("ShowUIScene",{warMatch: this.warMatch})
        }


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
    }

    update(): void {

    }
}