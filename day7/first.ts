import { getData } from '../getData';


type Hand = { cards: string, bid: number, value: number }

class Puzzle{

  async getData():Promise<any>{
    return await getData(7);
  }

  toArrray(dataString: string):any[]{
    return dataString.split('\n');
  }

  splitHandBid(rowString: string):string[]{
    return rowString.split(' ');
  }

  sortString(hand:string):string{
    return hand.split('').sort().join('');
  }

  sortStringReverse(hand:string):string{
    return hand.split('').sort().reverse().join('');
  }

  getChanges(hand:string):string{
    let changes = '';
    let counter = 1;
    for(let i = 1; i < hand.length; i++){
      if(hand[i] === hand[i-1]){
        counter += 1;
      } else{
        counter + 1;
        changes += counter;
      }
    }
    const reversed = this.sortStringReverse(hand);
    console.log(reversed);
    return reversed;
  }

  getHandValue(hand:string){
    let value = 0;
    let handType = this.getHandType(hand);
    value += handType * 16**6;
    let power = 5;
    for(let i = 0; i < hand.length; i++){
      value += this.cardToNumber(hand) * 16**power;
    }
    return value;
  }

  getHandType(hand: string):number{
    let changes = this.getChanges(hand);
    if(changes == '5') return 13;
    if(changes == '41') return 12;
    if(changes == '32') return 11;
    if(changes == '311') return 10;
    if(changes == '221') return 9;
    if(changes == '2111') return 8;
    if(changes == '11111') return 7;
    else{
      console.log('Not in valid change range: '+ changes);
      return 0;
    }
  }

  createHandObject(hand:string):Hand{
      let [cards, bid] = hand.split(' ');
      return { cards: cards, bid: parseInt(bid), value: this.getHandValue(hand) }
  } 

  createHandList(data:string[]):Hand[]{
    let hands:Hand[] = [];
    for(let hand of data){
      hands.push(this.createHandObject(hand));
    }
    return hands;
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
    const dataString = await this.getData();
    const data = this.toArrray(dataString);
    const hands = this.createHandList(data);
    console.log(hands);
    //    console.log( this.transformData(data) );
  }
}

const puzzle = new Puzzle();
puzzle.run();
