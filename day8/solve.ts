import { getData } from '../getData';

type Replacements = { [key:string]: number};
type MapElement = [number, number];
type Position = number;

class Solver {
  map: MapElement[];
  replacements: Replacements;
  directions: string;

  constructor(){ 
    this.map = [];
    this.replacements = {};
    this.directions = '';
  }

  async getData():Promise<string>{
    return await getData(8);
  }

  async prepareData(){
    let data = await this.getData();
    const parsedData = this.parseData(data);
    this.setDirections(data);
    this.setReplacementMap(parsedData);
    this.setMap(parsedData);
  }

  parseData(data:string): string[][] {
    let split = data.split('\n');
    split.shift();
    split.shift();
    split.pop();
    return split.map((e:string) => [e.split('=')[0].trim(), e.split('=')[1].split(',')[0].trim().slice(1), e.split('=')[1].split(',')[1].trim().slice(0, 3)]);
  }

  setMap(parsedData:string[][]):void {
    for(let row of parsedData) {
      let leftKey: string = row[1];
      let rightKey: string = row[2];
      this.map.push([this.replacements[leftKey], this.replacements[rightKey]]);
    }
  }

  setReplacementMap(parsedData:string[][]): void {
    for( let i = 0; i < parsedData.length; i++ ) {
      this.replacements[parsedData[i][0]] = i;
    }
  }

  getPosition(id:string): number {
    return this.replacements[id];
  }

  setDirections(data:string): void {
    this.directions = data.split('\n')[0].trim();
    this.directions = this.directions.replaceAll('L', '0');
    this.directions = this.directions.replaceAll('R', '1');
  }

  findNext(current:Position, direction: number):Position {
    return this.map[current][direction];
  }

  getDirection(counter: number): number {
    return parseInt(this.directions[counter%this.directions.length]);
  }

  async runFirst() {
    await this.prepareData();
    let counter = 0;
    let position = this.getPosition('AAA');
    const final = this.getPosition('ZZZ');
    while(position !== final){
      const direction = this.getDirection(counter);
      position = this.findNext(position, direction);
      counter++;
    }
    console.log(counter);
  }

  getPositions(endsWith: string): number[]{
    let positions = [];
    for(let [key, pos] of Object.entries(this.replacements)){
      if(key[2] === endsWith) positions.push(pos); 
    }
    return positions;
  }

  checkDone(positions: Position[], finals: Position[]){
    for(let i = 0; i < positions.length; i++){
      if(!finals.includes(positions[i])) return false;
    }
    return true;
  }

  findMultiNext(positions: Position[], direction: number): Position[]{
    return positions.map((e: Position) => this.findNext(e, direction));
  }

  async runSecond(){
    await this.prepareData();
    let counter = 0;
    let positions: Position[] = this.getPositions('A'); // initial positions
    let finals: Position[] = this.getPositions('Z');
    let done = false;
    while(!done) {
      const direction = this.getDirection(counter);
      positions = this.findMultiNext(positions, direction);
      counter++;
      done = this.checkDone(positions, finals);
    }
    console.log(counter);
  }
}

const solver = new Solver();
solver.runFirst();
solver.runSecond();
