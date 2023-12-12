import { getData } from '../getData';

type Race = {time: number, distance: number};

class Puzzle {
  async getData():Promise<any>{
    let data = await getData(6);
    return data;
  }

  getNumber(s:string){
    return s.split(':')[1].split('').filter((e:string) => e.trim() !== '').join('')
  }

  getRace(data: string):Race{
    let [_time, _distance] = data.split('\n');
    let time = this.getNumber(_time);
    let distance = this.getNumber(_distance);
    return {time:parseInt(time), distance: parseInt(distance)};
  }

  countWinningCombinations(race:Race):number{
    for(let r = 0; r < race.time + 1; r++){
      if(r * (race.time - r) > race.distance){
        return race.time + 1 - 2 * r;
      }
    }
    return 0;
  }

  async run(){
    let data = await this.getData();
    let race = this.getRace(data);
    console.log(race);
    console.log(this.countWinningCombinations(race));
  }
}

const puzzle = new Puzzle();
puzzle.run();
