import Phaser from "phaser";
import { TerritoryFactory } from './services/territory-factory'
import { WarMatch } from "./game/WarMatch";
import { Turn } from "./game/Turn";
import { GamePlayer } from "./model/GamePlayer";
import { Territory } from "./model/Territory";
import { Board } from "./game/Board";

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
        let data = this.load.json('frame', 'assets/images/mapa_war.json');
        this.load.json('territories', 'assets/data/territories.json');
        // console.log(territories)
        
        
        
    }
    
    create(): void {

        this.warMatch = new WarMatch(new Board(), new Turn(2));
        this.warMatch.addPlayer(new GamePlayer({id: 1, name: "Paulo"},COLORS["black"]))
        // this.warMatch.addPlayer(new GamePlayer({id: 2, name: "Thalita"}, COLORS["red"]))
        this.warMatch.addPlayer(new GamePlayer({id: 3, name: "Rafa"}, COLORS["yellow"]))
        this.warMatch.addPlayer(new GamePlayer({id: 4, name: "Ygor"}, COLORS["green"]))
        // this.warMatch.addPlayer(new GamePlayer({id: 5, name: "Edu"}, COLORS["blue"]))
        // this.warMatch.addPlayer(new GamePlayer({id: 6, name: "Tiago"}, COLORS["pink"]))

        this.warMatch.board.setTerritories(TerritoryFactory.loadCountries(this))
        
        this.warMatch.shufflePlayerInBoard()
        
        this.warMatch.getPlayerTotalTerritories(this.warMatch.players[0])

        this.warMatch.showPlayers(this)

        this.input.on('gameobjectover', (pointer:Phaser.Input.Pointer, territory:Territory) =>
        {
            if(!this.warMatch.board.hasSelectedTerritory()){
                territory.highlight();
            }
        });

        this.input.on('gameobjectout', (pointer:Phaser.Input.Pointer, territory:Territory) =>
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
        })
        this.add.bitmapText(10,10,'pressstart','WAR')
    }

    update(time: number, delta: number): void {

    }
}