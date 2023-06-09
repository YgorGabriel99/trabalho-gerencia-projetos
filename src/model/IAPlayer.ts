import { WarMatch } from "../game/WarMatch";
import { GamePlayer } from "./GamePlayer";
import PlayerType, { Player } from "./Player";
import { Territory } from "./Territory";
import { Board } from "./Boards";

export default class IaPlayer extends GamePlayer{

    public coesionWeight = 1;
    public totalitynWeight = 1;
    public aggressiveWeight = 1;
    public survivalWeight = 1;
    public objectiveWeight = 1;

    constructor(data:PlayerType, color: number, warMatch: WarMatch) {
        super(data, color, warMatch);
    }

    cardExchange(){
        // alert("IA trocando cartas")
        let possibleExchanges:Territory[][] = this.warMatch.board.checkPossibleExchanges(this.hand)
        if(possibleExchanges.length > 0){
            // this.warMatch.board.exchangeCards(currentPlayer, playerCardsToExchange)
            let index = Math.round(Math.random() * (possibleExchanges.length-1))
            this.warMatch.board.exchangeCards(this,possibleExchanges[index])
        }
        
        // início da análise de troca
        let possibleExchanges: Territory[][] = this.warMatch.board.checkPossibleExchanges(this.hand)
            
        if (possibleExchanges.length > 0) {
            // Análise da situação e tomada de decisão
            let bestExchange: Territory[][] = this.analyzeSituation(possibleExchanges);
                
            if (bestExchange) 
                this.warMatch.board.exchangeCards(this, bestExchange);
            else{
                let index = Math.round(Math.random() * (possibleExchanges.length-1));
                this.warMatch.board.exchangeCards(this,possibleExchanges[index]);
            }
        }

    }    
    //Analisar situação 
    analyzeSituation(possibleExchanges: Territory[][]): Territory[][] | null {

        let bestExchange: Territory[][] | null = null;
        let bestExchangeScore = 0;
    
        // Percorrer todas as combinações de trocas possíveis
        for (let exchange:Territory[][] of possibleExchanges) {
             
             let exchangeScore = this.evaluateExchange(exchange);
    
            // Comparar o score com o melhor score atual
            if (exchangeScore > bestExchangeScore) {
                bestExchange = exchange;
                bestExchangeScore = exchangeScore;
            }
        }
    
        return bestExchange;
    }
        
    evaluateExchange(exchange: Territory[][]): number {
        let exchangeValue = 0;
        let currentPlayerArmies = this.totalArmies;
       //ver se faz sentido
        let enemyArmies =

        // Considerar a relação de forças para ajustar o valor da troca
        if (currentPlayerArmies > enemyArmies) 
            // O jogador atual possui mais tropas do que as tropas inimigas
            exchangeValue += 10; // Valor adicional para incentivar a troca e fortalecer ainda mais o jogador
         else if (currentPlayerArmies < enemyArmies) 
            // O jogador atual possui menos tropas do que as tropas inimigas
            exchangeValue -= 10; // Valor penalizado para desencorajar a troca e priorizar a defesa
        
        return exchangeValue;
    }
          
    
            
       
        
    evaluateGameStatus(): 'desvantagem' | 'vitória eminente' | 'equilíbrio' {
            // Avaliar o estado atual do jogo e retornar uma indicação do status
            // Exemplo: Verificar se a IA está em desvantagem em termos de territórios ou tropas
            // ou se a IA está perto de alcançar uma condição de vitória
            // Implemente a lógica específica do jogo aqui
            return 'equilíbrio';
    }
        //Tomar decisão

    

    mobilize(){
        // alert("IA mobilizando")
        //Mobilizando de forma aleatória
        Object.keys(this.placeble).forEach(place =>{
            let territories = this.warMatch.board.getTerritoriesByContinent(place, this)
            while(this.placeble[place] > 0){
                let index = Math.round(Math.random() * (territories.length-1))
                let territory = territories[index]
                territory.mobilize(this.warMatch.board.continents)
                console
            }
        })
    }   
        //Analisar situação
   
    analiticMobilize(){

        let aiTerritories = this.Board.getPlayerTerritories(this); // Obtém todos os territórios controlados pela IA
        aiTerritories.sort((a, b) => b.armies - a.armies);//territórios com maior número de tropas ficam na frente
    
        // Analisar cada território
        aiTerritories.forEach((territory) =>{
            let neighborTerritories = territory.neighbors;  
            let maxDanger = 0;
            let target = null;

            for (let neighbor of neighborTerritories){
               let danger = 0;

                if(neighbor.owner !== this)
                  danger = neighbor.armies/territory.armies;    

                if(danger > maxDanger){
                    maxDanger = danger;
                    target = neighbor;
                }
            }
       });
    }   
        
    // Tomar decisões adicionais, se necessário

    attack(){
        // alert("IA atacando")
        // Aleatório
        let attackerTerritories = this.warMatch.board.getPlayerTerritoriesByArmiesNumber(this,1)
        attackerTerritories.forEach(attacker =>{
            attacker.highlightNeighbours(this.warMatch.board.territories)
            while(this.warMatch.board.hasHighlightedTerritory(attacker) && attacker.armies > 1){
                attacker.select()
                let highlightedTerritories = this.warMatch.board.getHighlighted()
                let index = Math.round(Math.random() * (highlightedTerritories.length-1))
                this.warMatch.board.checkAttackCondition(highlightedTerritories[index], attacker.owner)
                attacker.unhighlightNeighbours(this.warMatch.board.territories)
                attacker.highlightNeighbours(this.warMatch.board.territories)
            }
            this.warMatch.board.clearBoard()
        })
    }    
        //Analisar situação
        /*
        attack() {
            let attackerTerritories = this.warMatch.board.getPlayerTerritoriesByArmiesNumber(this, 1);attackerTerritories.forEach(attacker => {
                
                // Analisar situação
                let targetTerritories = attacker.getNeighbouringEnemyTerritories(); // Obter territórios vizinhos inimigos
                let prioritizedTargets = this.prioritizeTargets(targetTerritories); // Priorizar alvos estratégicos

                // Tomar decisão de ataque
                if (prioritizedTargets.length > 0) {
                let selectedTarget = this.chooseAttackTarget(prioritizedTargets); // Escolher alvo de ataque
                this.warMatch.board.checkAttackCondition(selectedTarget, attacker);
                }

            this.warMatch.board.clearBoard();
            });
        }
        */
        
        //Tomar decisão
        /*
            prioritizeTargets(targets: Territory[]): Territory[] {
            // Implemente sua lógica para priorizar alvos estratégicos
            // Considere critérios como territórios-chave, territórios de jogadores mais fortes, etc.
            // Retorne uma nova lista com os alvos priorizados
            }

            chooseAttackTarget(targets: Territory[]): Territory {
            // Implemente sua lógica para escolher um alvo de ataque
            // Considere fatores como a força relativa do território atacante e dos alvos, o risco envolvido, etc.
            // Retorne o alvo escolhido para o ataque
            }

            getNeighbouringEnemyTerritories(): Territory[] {
            let enemyTerritories: Territory[] = [];
            let ownedTerritories = this.warMatch.board.getPlayerTerritories(this);

            ownedTerritories.forEach(territory => {
                let neighbouringTerritories = territory.getNeighbours();
                neighbouringTerritories.forEach(neighbour => {
                if (neighbour.owner !== this) {
                    enemyTerritories.push(neighbour);
                }
                });
            });

            return enemyTerritories;
            }
        */
    

    fortify(){
        // alert("IA fortificando")
        //Aleatório
        let outnumberedTerritories = this.warMatch.board.getPlayerTerritoriesByArmiesNumber(this,1)
        // let withOneTerritories = this.warMatch.board.getPlayerTerritoriesByArmiesNumber(this,1)
        outnumberedTerritories.forEach(territory =>{
            territory.highlightOwnedNeighbors(this.warMatch.board.territories)
            let highlightedTerritories = this.warMatch.board.getHighlighted()
            let index = Math.round(Math.random() * (highlightedTerritories.length-1))
            territory.select()
            if(highlightedTerritories[index]){
                this.warMatch.board.checkFortifyCondition(
                    highlightedTerritories[index], this
                )
            }
            // territory.unselect()
            territory.unHighlightOwnedNeighbors(this.warMatch.board.territories)
            this.warMatch.board.clearBoard()
        })

        this.warMatch.board.clearBoard()

        //Analisar situação

        //Tomar decisão
    }

}