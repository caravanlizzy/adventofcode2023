class Puzzle4{
  constructor(){
    this.distribution = [];
  }
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

  getWins(winners, numbers){
    let count = 0;
    for(let winner of winners){
      if(numbers.includes(winner)){
        count += 1;
      }
    }
    return count;
  }

  prepareDistribution(data){
    for(let i in data){
      this.distribution.push(1);
    }
  }

  updateDistribution(wins, lineIndex){
    for(let i = lineIndex + 1; i < lineIndex + wins + 1; i++){
      this.distribution[i] += this.distribution[lineIndex];
    }
  }

  sumUp(){
    return this.distribution.reduce((acc, value) => acc + value, 0);
  }

  async run(){
    const data = await this.getData();
    this.prepareDistribution(data);
    for(let lineIndex = 0; lineIndex < data.length; lineIndex++){
      let content = data[lineIndex];
      if(content){
        let winners = this.getWinnerNumbers((content));
        let numbers = this.getNumbers(content);
        let wins = this.getWins(winners, numbers);
        this.updateDistribution(wins, lineIndex);
      }
    }
    console.log(this.sumUp());
  }
}

const puzzle = new Puzzle4();
puzzle.run();
