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

  removeSymbolOccurences(cards: string, symbol: string):string {
    return cards.replaceAll(symbol, '');
  }

  getSymbolSequence(cards:string):string{
    let sequence = '';
    let counter = 1;
    const sortedCards = this.sortString(this.removeSymbolOccurences(cards, 'J'));
    for(let i = 1; i < sortedCards.length; i++){
      else if(sortedCards[i] === sortedCards[i-1]) counter += 1; 
      else {
        sequence += counter;
        counter = 1;
      }
    }
    sequence += sortedCards.length > 0 ? counter : '';
    return this.sortStringReverse(sequence);
  }

  countJokers(cards:string):number{
    return cards.split('J').length-1;
  }

  getSequence(cards: string):string {
    let symbols = this.getSymbolSequence(cards);
    let jokers = this.countJokers(cards);
    if(cards === 'JJJJJ') console.log(jokers, symbols);
    if(!symbols) return '5';
    else{
      return (parseInt(symbols[0])+jokers) + symbols.slice(1);
    }
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
    if(parseInt(card)) return parseInt(card);
    switch(card){
      case 'T':
        return 10;
      case 'J':
        return 1;
      case 'Q':
        return 12;
      case 'K':
        return 13
      case 'A':
        return 15;
    }
    console.log('warning: code shoul not reach this part since all cases are covered.')
    return -1;
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
