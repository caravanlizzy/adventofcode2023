import { getData } from '../getData';
type RuleSet = number[][];

class Puzzle {

  constructor(public mapNames: string[] = [], public rules: RuleSet[] = [], public data: string[] = [], public lowest?: number){}

  transformData(data: string): void{
    this.data = data.split('\n').filter(( i: string ) => i.trim() !== '');
  }

  getSeeds(): number[]{
    return this.data[0].split(':')[1].split(' ').filter((e: string) => e.trim() !== '').map((e:string) => parseInt(e.trim()));
  }

  parseRulesList(): void {
    let currentRules: RuleSet = []; 
    for(let i = 2; i < this.data.length; i++){
      let dataString = this.data[i];
      if(dataString.includes(':')){
        if(currentRules.length > 0){
          this.rules.push(currentRules);
          currentRules = [];
        }
        this.mapNames.push(dataString.slice(0,-1));
      }
      else {
        let rowData = dataString.split(' ').map(( e: string ) => parseInt(e.trim()));
        currentRules.push(rowData);
      }
    }
    this.rules.push(currentRules);
  }

  applyRule(number: number, ruleSet: RuleSet){
    for(let i = 0; i < ruleSet.length; i++){
      let rule = ruleSet[i];
      if(number >= rule[1] && number < rule[1] + rule[2]){
        return rule[0] + number- rule[1] ;
      }
    }
    return number;
  }

  iterateSeeds(): void{
    for( let seed of this.getSeeds()){
      let result = this.runSeed(seed);
      this.storeIfLower(result);
    }
  }

  runSeed(seed: number): number{
    let currentValue = seed;
    for(let index in this.rules){
      let ruleSet = this.rules[index]; 
      currentValue = this.applyRule(currentValue, ruleSet);
    }
    return currentValue;
  }

  storeIfLower(num: number): void{
    this.lowest = this.lowest ? Math.min(num, this.lowest) : num;
  }

  async run(): Promise<void> {
    let data = await getData(5);
    this.transformData(data);
    this.parseRulesList();
    this.iterateSeeds();
    console.log(this.lowest);
  }
}

const puzzle = new Puzzle();
puzzle.run();
