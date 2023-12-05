class Puzzle4{
  async getData() {
    const data = await fetch("https://adventofcode.com/2023/day/4/input");
    let text = await data.text();
    let dataArray = text.split('\n');
    dataArray.pop();
    return dataArray;
  }

  getWinnerNumbers(line){
    return line.split('|')[0].split(':')[1].trim().split(' ').filter(e => e.trim() !== "").map(e => parseInt(e.trim()));
  }

  getNumbers(line){
    return line.split('|')[1].trim().split(' ').filter(e => e.trim() !== "").map(e => parseInt(e.trim()));
  }

  score(winners, numbers){
    let count = 0;
    for(let winner of winners){
      if(numbers.includes(winner)){
        count += 1;
      }
    }
    if(count === 0) return 0;
    return 2**(count-1);
  }

  async run(){
    const data = await this.getData();
    let score = 0;
    for(let line of data){
      if(line){
        let winners = this.getWinnerNumbers((line));
        let numbers = this.getNumbers(line);
        score += this.score(winners, numbers);
      }
    }
    console.log(score);
  }
}

const puzzle = new Puzzle4();
puzzle.run();
