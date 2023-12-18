import { getData } from '../getData';

class Solver {
  start: string;
  stop: string;
  map: string[][];
  directions: string;

  constructor(){ 
    this.start = 'AAA';
    this.stop = 'ZZZ';
    this.map = [];
    this.directions = '';
  }

  async getData():Promise<string>{
    return await getData(8);
  }

  setMap(data:string):void {
    let split = data.split('\n');
    split.shift();
    split.shift();
    split.pop();
    this.map = split.map((e:string) => [e.split('=')[0].trim(), e.split('=')[1].split(',')[0].trim().slice(1), e.split('=')[1].split(',')[1].trim().slice(0, 3)]);
  }

  setDirections(data:string): void {
    this.directions = data.split('\n')[0];
  }

  findNext(current:string[], direction: string):string[] {
    const dirIndex: number = direction === 'L' ? 1 : 2; 
    const nextRow = this.map.find((e:string[]) => e[0] === current[dirIndex]);
    const next = nextRow ? nextRow : ['shit'];
    return next;
  }

  getNextDirection(counter: number){
    return this.directions[counter%this.directions.length];
  }

  async runFirst() {
    this.prepareData();
    let counter = 0;
    let position = this.map.find((e) => e[0] === 'AAA');
    if(position){
      while(position[0] !== this.stop){
        const direction = this.getNextDirection(counter);
        position = this.findNext(position, direction);
        counter++;
      }
      console.log(counter);
    }
  }

  getMultiStarts(): string[][] {
    return this.map.filter(row => row[0][2] === 'A');
  }

  checkEnd(positions:string[][]){
    for(let i = 0; i < positions.length; i++) {
      if(positions[i][2] !== 'Z') return false;
    }
    return true;
  }

  async test(){
    this.prepareData();
    console.log(this.findNext(['AAA', 'DXX', 'SVG'], 'L'));
  }

  prepareData(){
    let data = await this.getData();
    this.setMap(data);
    this.setDirections(data);
  }

  async runSecond() {
    this.prepareData();
    let positions = this.getMultiStarts();
    let counter = 0;
    let end = false;
    console.log(positions);
    while(!end) {
      for(let i = 0; i < positions.length; i++) {
        const direction = this.getNextDirection(counter);
        const currentPosition = positions[i];
        const newPosition = this.findNext(currentPosition, direction)
        positions[i] = newPosition;
      }
      end = this.checkEnd(positions)
      counter++;
    }
    console.log(counter)
  }
}

const solver = new Solver();
// solver.runFirst();
solver.runSecond();
