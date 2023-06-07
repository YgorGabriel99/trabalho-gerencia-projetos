import { WarMatch } from "../game/WarMatch";
import { GamePlayer } from "./GamePlayer";
import PlayerType from "./Player";
import { Territory } from "./Territory";

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
        let possibleExchages:Territory[][] = this.warMatch.board.checkPossibleExchanges(this.hand)
        if(possibleExchages.length > 0){
            // this.warMatch.board.exchangeCards(currentPlayer, playerCardsToExchange)
            let index = Math.round(Math.random() * (possibleExchages.length-1))
            this.warMatch.board.exchangeCards(this,possibleExchages[index])
        }
        
        //Analisar situação
        
        /*let possibleExchanges: Territory[][] = this.warMatch.board.checkPossibleExchanges(this.hand);
            
        if (possibleExchanges.length > 0) {
            // Análise da situação e tomada de decisão
             let bestExchange: Territory[] = this.analyzeSituation(possibleExchanges);
                
            if (bestExchange) 
                 this.warMatch.board.exchangeCards(this, bestExchange);
            
         }

        }    
        analyzeSituation(possibleExchanges: Territory[][]): Territory[] | null {
            let bestExchange: Territory[] | null = null;
            let bestExchangeScore = 0;
        
            // Percorrer todas as combinações de trocas possíveis
            for (let exchange of possibleExchanges) {
            // Realizar uma análise da qualidade da troca
            let exchangeScore = this.evaluateExchange(exchange);
        
            // Comparar o score com o melhor score atual
            if (exchangeScore > bestExchangeScore) {
                bestExchange = exchange;
                bestExchangeScore = exchangeScore;
            }
            }
        
            return bestExchange;
        }
            
        evaluateExchange(exchange: Territory[]): number {
            let exchangeValue = 0;
          
            // Avaliar o valor estratégico de cada carta na troca
            for (let territory of exchange) {
              let cardValue = this.evaluateCard(territory.card);
              exchangeValue += cardValue;
            }
          
            // Verificar se a troca forma um conjunto especial
            if (this.isSpecialSet(exchange)) {
              // Atribuir um valor adicional para conjuntos especiais
              exchangeValue += 100;
            }
          
            // Considerar o estado atual do jogo e ajustar o valor da troca conforme necessário
            let gameStatus = this.evaluateGameStatus();
            if (gameStatus === 'desvantagem') {
              exchangeValue += 50; // Valor adicional para trocas que ajudem a compensar a desvantagem
            } else if (gameStatus === 'vitória eminente') {
              exchangeValue += 100; // Valor adicional para trocas que aproximem da vitória
            }
          
            return exchangeValue;
          }
          
        evaluateCard(card: Card): number {
            // Atribuir valores estratégicos para cada tipo de carta
            
            }
            
       
        
        evaluateGameStatus(): 'desvantagem' | 'vitória eminente' | 'equilíbrio' {
            // Avaliar o estado atual do jogo e retornar uma indicação do status
            // Exemplo: Verificar se a IA está em desvantagem em termos de territórios ou tropas
            // ou se a IA está perto de alcançar uma condição de vitória
            return 'equilíbrio';
        }*/
        //Tomar decisão

    }

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
        
        //Analisar situação
    
        /*let territories = this.warMatch.board.getOwnedTerritories(this); // Obtém todos os territórios controlados pela IA
        let prioritizedTerritories = [];
        
        // Analisar cada território
        for (let territory of territories) {
            let priority = 0;
        
            // Avaliar a prioridade de mobilização com base nos critérios estratégicos
            // Exemplo:
            if (territory.isBorderTerritory()) {
            priority += 3; // Prioridade alta para territórios de fronteira
            }
        
            if (territory.isInDanger()) {
            priority += 2; // Prioridade alta para territórios em perigo de ataque
            }
        
            // Adicione outros critérios estratégicos relevantes aqui
        
            if (priority > 0) {
            prioritizedTerritories.push({ territory, priority });
            }
        }
        
        // Ordenar os territórios com base nas prioridades
        prioritizedTerritories.sort((a, b) => b.priority - a.priority);
        
        // Mobilizar as tropas nos territórios prioritários
        for (let { territory } of prioritizedTerritories) {
            while (this.placeble[territory.continent] > 0) {
            territory.mobilize(this.warMatch.board.continents);
            this.placeble[territory.continent] -= 1;
            
        
        
        // Tomar decisões adicionais, se necessário
        */ 
        //Tomar decisão

    }

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
    }

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