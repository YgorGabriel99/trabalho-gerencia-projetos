import { WarMatch } from "../game/WarMatch"

export default class Util{

    static shuffle(items:any){
        items = items.map((value: any) => ({ value, sort: Math.random() }))
        .sort((a: { sort: number }, b: { sort: number }) => a.sort - b.sort)
        .map(function ( value : any) {
            return value
        })  
        return items
    }

    static shuffleTerritories(warMatch:WarMatch){
        console.log(warMatch)
    }
    
}