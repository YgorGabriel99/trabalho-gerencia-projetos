import { GamePlayer, playerCOLORS } from "../model/GamePlayer";
import PlayerType, { Player } from "../model/Player";
import { Territory } from "../model/Territory";
import eventsCenter from "../services/EventsCenter";
import { TerritoryFactory } from "../services/territory-factory";
import { Board } from "./Board";
import { Phases, Turn } from "./Turn";

enum Status {
    SETUP = 0,
    STARTED = 1,
    FINISHED = 2
}
export class WarMatch{
    public scene: Phaser.Scene;
    public players: Array<GamePlayer> = [];
    public turn: Turn;
    public board: Board;
    public status: number = Status.SETUP
    constructor(board: Board,  turn: Turn, scene: Phaser.Scene) {
        this.turn = turn;
        this.board = board;
        this.scene = scene;
    }

    getTotalPlayers(): number {
        return this.players.length;
    }

    addPlayer(player: GamePlayer): void {
        this.players.push(player);
    }

    getPlayerById(id: number): GamePlayer {
        const player: GamePlayer = this.players.find(player => player.id === id);
        return player
    }

    shufflePlayerInBoard(): void {
        this.board.territoryCards.forEach((territoryCard) =>{
            let territory = this.board.getTerritoryById(territoryCard)
            this.board.discard.push(territoryCard)
            let player = this.getPlayerById(this.turn.getCurrentPlayerId())
            territory?.setOwner(player)
            territory?.setInitialArmies()
            territory?.updateText()
            this.turn.nextPlayer()
        })
    }

    setPlayerTotalTerritories(player:GamePlayer){
        const territoriesOwned =  this.board.territories.filter((territory) =>{
            return territory.owner?.id === player.id
        })
        player.totalTerritories = territoriesOwned.length
    }   

    getPlayerTerritories(player:GamePlayer):Array<Territory> {
        const territoriesOwned =  this.board.territories.filter((territory) =>{
            return territory.owner?.id === player.id
        })
        return territoriesOwned
    }

    //Está com erro no reduce !!!!!!!!!
    setPlayerTotalArmies(player:GamePlayer){
        const totalArmies = this.getPlayerTerritories(player).reduce(
            function(previousValue, currentValue:Territory){
                return previousValue + currentValue.armies
            },0
        )
        player.totalArmies = totalArmies;
    }

    init(players: PlayerType[]):boolean {

        if(players.length < 3){
            let msg = "Deve haver pelo menos três jogadores"
            eventsCenter.emit('restart', msg)
            eventsCenter.emit('showModal', msg)
            return false
        }
        
        players.forEach((player: PlayerType) =>{
            this.addPlayer(new GamePlayer(player, playerCOLORS[player.color], this))
        })
        
        let playersIds = players.map(player => {
            return player.id
        })
        this.turn.init(playersIds);
        let territoryIds = this.scene.cache.json.get('territories').territories
        .map((territory:Territory) => {
            return territory.id;
        })
        this.board.setTerritories(TerritoryFactory.loadCountries(this.scene))
        this.board.init(territoryIds, this.scene.continentsData, this.scene.cardsData)

        this.shufflePlayerInBoard()
        this.board.reshuffleDeck()
        eventsCenter.emit(this.turn.phasesNames[Phases.MOBILIZAR],this.turn.phasesNames[Phases.MOBILIZAR])
        return true
    }

    getTotalArmiesToPlace() {
        let player = this.getCurrentPlayer()
        this.setPlayerTotalTerritories(player)
        player?.setPlaceble("all", Math.max(Math.floor(player.totalTerritories/2), 3))
        this.board.checkTotality(player)


        // let general = game.getPlayerTerritoriesCount(player)
        // player.placeble.all = Math.max(Math.floor(general/2), 3)
    }

    getCurrentPlayer(){
        return this.turn.getCurrentPlayer(this.players)
    }
}