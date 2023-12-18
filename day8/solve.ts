import { getData } from '../getData';

class Solver {
  start: string;
  stop: string;
  map: any;
  directions: string;

  constructor(){ 
    this.start = 'AAA';
    this.stop = 'ZZZ';
    this.map = {};
    this.directions = '';
  }

  async getData():Promise<string>{
    return await getData(8);
  }

  async prepareData(){
    let data = await this.getData();
    this.setMap(data);
    this.setDirections(data);
  }

  setMap(data:string):void {
    let split = data.split('\n');
    split.shift();
    split.shift();
    split.pop();
    const tempMap = split.map((e:string) => [e.split('=')[0].trim(), e.split('=')[1].split(',')[0].trim().slice(1), e.split('=')[1].split(',')[1].trim().slice(0, 3)]);
    for(let i = 0; i < tempMap.length; i++){
      const tempRow: string[] = tempMap[i];
      this.map[tempRow[0]] = {L: tempRow[1], R: tempRow[2]};
    }
  }

  setDirections(data:string): void {
    this.directions = data.split('\n')[0];
  }

  findNext(current:string, direction: string):string {
    return this.map[current][direction];
  }

  getNextDirection(counter: number){
    return this.directions[counter%this.directions.length];
  }

  async runFirst() {
    await this.prepareData();
    let counter = 0;
    let position = 'AAA';
    while(position !== this.stop){
      const direction = this.getNextDirection(counter);
      position = this.findNext(position, direction);
      counter++;
    }
    console.log(counter);
  }

  getMultiStarts(): string[]{
    let starts = [];
    for(let key of Object.keys(this.map)){
      if(key[2] === 'A') starts.push(key);
    }
    return starts;
  }

  checkEnd(positions:string[]){
    for(let i = 0; i < positions.length; i++) {
      const position = positions[i];
      if(this.map[position[2]] !== 'Z') return false;
    }
    return true;
  }

  multiNext(currentPositions: string[], direction: string): string[] {
    let nextPos = [];
      for(let i = 0; i < currentPositions.length; i++) {
        const currentPosition = currentPositions[i];
        const newPosition = this.findNext(currentPosition, direction);
        nextPos.push(newPosition);
      }
    return nextPos;
  }

  async runSecond() {
    await this.prepareData();
    let positions: string[] = this.getMultiStarts(); // setup initial positions
    let counter = 0; // count iterations
    let end = false; // is final state?
    console.log(positions);
    while(!end) {
      const direction = this.getNextDirection(counter); // L or R
      positions = this.multiNext(positions, direction); // execute map once on all positions simultaneously
      console.log(positions);
      end = this.checkEnd(positions)
      counter++;
    }
    console.log(counter)
  }
}

const solver = new Solver();
// solver.runFirst();
solver.runSecond();
