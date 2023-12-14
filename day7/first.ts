import { getData } from '../getData';


class Puzzle{

  async getData():Promise<any>{
    return await getData(7);
  }

  transformData(data:string):any[] {
    let rows = data.split('\n');
    let splitRows = rows.map((e:string) => e.split(' '));
    return splitRows.map((e:string[]) => [e[0].split('').map((s:string) => this.cardToNumber(s)), parseInt(e[1])]);
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
sortHands<deck>(deck: deck[]):deck[]{
    return deck.sort((a,b) => {
     let typeA = this.determineHandType(a);
     let typeB = this.determineHandType(b);
     if(typeA !== typeB) return typeB - typeA;
     else {
       for (let index = 0; index < a.length; index++) {
         if (a[index] !== b[index]) {
           return b[index] - a[index];
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
    console.log( this.transformData(data) );
  }
}

const puzzle = new Puzzle();
puzzle.run();
