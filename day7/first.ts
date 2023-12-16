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

  sortString(str:string):string{
    return str.split('').sort().join('');
  }

  sortStringReverse(str:string):string{
    return str.split('').sort().reverse().join('');
  }

  getSequence(cards:string):string{
    let sequence = '';
    let counter = 1;
    const sortedCards = this.sortString(cards);
    for(let i = 1; i < cards.length; i++){
      if(sortedCards[i] === sortedCards[i-1]){
        counter += 1;
      } else{
        sequence += counter;
        counter = 1;
      }
    }
    sequence += counter;
    return this.sortStringReverse(sequence);
  }

  getHandValue(cards:string){
    let value = 0;
    let handType = this.getHandType(cards);
    value += handType * 16**6;
    let power = 5;
    for(let i = 0; i < cards.length; i++){
      value += this.cardToNumber(cards[i]) * 16**power;
      power -= 1;
    }
    return value;
  }

  getHandType(hand: string):number{
    let sequence = this.getSequence(hand);
    if(sequence == '5') return 13;
    if(sequence == '41') return 12;
    if(sequence == '32') return 11;
    if(sequence == '311') return 10;
    if(sequence == '221') return 9;
    if(sequence == '2111') return 8;
    if(sequence == '11111') return 7;
    else{
      console.log('Not in valid change range: '+ sequence);
      return 0;
    }
  }

  createHandObject(hand:string):Hand{
      let [cards, bid] = hand.split(' ');
      return { cards: cards, bid: parseInt(bid), value: this.getHandValue(cards) }
  } 

  createHandList(data:string[]):Hand[]{
    let hands:Hand[] = [];
    for(let hand of data){
      if(hand){
        hands.push(this.createHandObject(hand));
      }
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

  sortHands(hands:Hand[]):Hand[]{
    return hands.sort((a,b) => a.value-b.value);
  }

  getProduct(hands:Hand[]):number{
    return hands.reduce((total, current, index) => total+current.bid*(index + 1), 0);
  }

  async run(){
    const dataString = await this.getData();
    const data = this.toArrray(dataString);
    const hands = this.createHandList(data);
    const sortedHands = this.sortHands(hands);
    const product = this.getProduct(sortedHands);
    console.log(product);
  }
}

const puzzle = new Puzzle();
puzzle.run();
