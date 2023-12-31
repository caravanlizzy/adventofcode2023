class Puzzle {
  constructor() {
    this.data = [];
    this.count = 0;
    this.symbols = [];
  }

  async getData() {
    const data = await fetch("https://adventofcode.com/2023/day/3/input");
    return data.text();
  }

  async prepareData() {
    const data = await this.getData();
    this.data = data.split("\n");
    this.data.pop();
    // this.data = ['467..114..','...*......','..35..633.','......#...','617*......','.....+.58.','..592.....','......755.','...$.*....','.664.598..'];
  }

  findNumbers(line) {
    return line.match(/\d+/g);
  }

  removeNumber(line, number){
    return line.replace(number, '.'.repeat(number.length));
  }

  getNumberPosition(line, lineIndex, number) {
    return {
      line: lineIndex,
      index: line.indexOf(number),
      size: number.length,
    };
  }

  validIndex(x, y) {
    if (x < 0) return false;
    if (x > this.data[0].length - 1) return false;
    if (y < 0) return false;
    if (y > this.data.length - 1) return false;
    return true;
  }

  isNotSelf(x,y, pos){
    if(y !== pos.line) return true;
    if(x<pos.index) return true;
    if(x>pos.index+pos.size-1)return true;
    return false;
  }

  getNeighbours(pos) {
    let neighbours = [];
    for (let y of [pos.line - 1, pos.line, pos.line + 1]) {
      for (let x = pos.index - 1; x < pos.index + pos.size + 1; x++) {
        if (this.validIndex(x, y) && this.isNotSelf(x,y, pos)) {
          let neighbour = {symbol: this.data[y][x], position:[x,y]}
          neighbours.push(neighbour);
        }
      }
    }
    return neighbours;
  }

  handleSymbol(symbol, number){
    let existingSymbol = this.symbols.find(s => s.position[0] === symbol.position[0] && s.position[1] === symbol.position[1]);
    console.log(symbol, number)
    if(existingSymbol){
      this.symbols[existingSymbol.index].adjacentNumbers.push(number);
    } else {
      let newSymbol = {...symbol, adjacentNumbers: [number], index: this.symbols.length};
      this.symbols.push(newSymbol);
    }
  }

  nextToSymbol(neighbours, number) {
    let notASymbol = ".";
    for (let n = 0; n < neighbours.length; n++) {
      let neighbour = neighbours[n];
      if (!notASymbol.includes(neighbour.symbol)) {
        this.handleSymbol(neighbour, number);
        return true;
      }
    }
    return false;
  }

  examineNumber(number, pos) {
    const neighbours = this.getNeighbours(pos);
    if (this.nextToSymbol(neighbours, number)) this.count += parseInt(number);
  }

  examineLine(line, lineIndex) {
    let numbers = this.findNumbers(line);
    if (!numbers) return;
    let currentLine = line;
    for (let number of numbers) {
      let pos = this.getNumberPosition(currentLine, lineIndex, number);
      this.examineNumber(number, pos);
      currentLine = this.removeNumber(currentLine, number);
    }
  }

  getResult(){
    let result = 0;
    for(let symbol of this.symbols.filter(s => s.adjacentNumbers.length === 2)){
      result += symbol.adjacentNumbers[0]*symbol.adjacentNumbers[1];
    }
    return result;
  }

  async run() {
    await this.prepareData();
    for (let lineIndex = 0; lineIndex < this.data.length; lineIndex++) {
      let line = this.data[lineIndex];
      if (line) {
        this.examineLine(line, lineIndex);
      } else {
        console.log('run failed in line: ' + line);
      }
      console.log(this.getResult());
    }
  }
}

const puzzle = new Puzzle();
puzzle.run();
