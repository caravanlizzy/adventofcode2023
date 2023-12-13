import { getData } from '../getData';

type Race = {time: number, distance: number};

class Puzzle {
  async getData():Promise<any>{
    let data = await getData(6);
    return data;
  }

  getRaces(data: string):Race[]{
    let races: Race[] = [];
    let [_time, _distance] = data.split('\n');
    let time = _time.split(' ').filter((e:string) => e.trim()!== '');
    let distance = _distance.split(' ').filter((e:string) => e.trim()!== '');
    for(let i = 1; i <time.length; i++){
      races.push({time:parseInt(time[i]), distance: parseInt(distance[i])});
    }
    return races;
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
    let races = this.getRaces(data);
    let product = 1;
    for(let race of races){
      product *= this.countWinningCombinations(race);
    }
    console.log(product);
  }
}

const puzzle = new Puzzle();
puzzle.run();
