import { getData } from '../getData';


type Hand =  [number[], number];
type Deck = Hand[];
class Puzzle{

  async getData():Promise<any>{
    return await getData(7);
  }

  transformData(data:string):any[] {
    let rows = data.split('\n');
    let splitRows = rows.map((e:string) => e.split(' '));
    console.log(splitRows.map((e:string[]) => e[0].split('').map((s:string) => this.cardToNumber(s)).sort((a,b) => a-b)));
    return splitRows.map((e:string[]) => [e[0].split('').map((s:string) => this.cardToNumber(s)).sort((a,b) => a-b), parseInt(e[1])]);
  }

  getHandType(changes: number[]):number{
    if(changes.length == 0) return 13;
    if(changes.toString() == '4') return 12;
    if(changes.toString() == '3') return 11;
    if(changes.toString() == '3,4') return 10;
    if(changes.toString() == '2,4') return 9;
    if(changes.toString() == '2,3,4') return 8;
    else return 8;
  }

  detectSymbolChange(hand:number[]):number[]{
    let changes = [];
    let previous = hand[0];
    for(let i = 1; i < hand.length; i++){
      if(hand[i] == previous) {
        changes.push(i);
        previous = hand[i];
      }
    }
    return changes;
  }
  determineHandType(hand: number[]):number{
    const symbolChanges = this.detectSymbolChange(hand);
    return this.getHandType(symbolChanges);
  }
sortHands(deck: Deck):Deck{
  return deck.sort((a:Hand, b: Hand) => {
      const handA = a[0];
      const handB = b[0];
     let typeA = this.determineHandType(handA);
     let typeB = this.determineHandType(handB);
     if(typeA !== typeB) return typeB - typeA;
     else {
       for (let index = 0; index < handA.length; index++) {
         if (handA[index] !== handB[index]) {
           return handB[index] - handA[index];
         }
       }
     }
    })
  }

  cardToNumber(card:string):number{
    if(parseInt(card)) return parseInt(card) - 1;
    switch(card){
      case 'T':
        return 9;
      case 'J':
        return 10;
      case 'Q':
        return 11;
      case 'K':
        return 12
      case 'A':
        return 13;
    }
    return 0;
  }

  async run(){
    const data = await this.getData();
//    console.log( this.transformData(data) );
  }
}

const puzzle = new Puzzle();
puzzle.run();
