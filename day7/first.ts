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
