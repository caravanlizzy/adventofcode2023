class Puzzle {
  constructor() {
    this.data = [];
    this.count = 0;
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

  test() {
    this.validIndex(x, y);
  }

  findNumbers(line) {
    return line.match(/\d+/g);
  }

  removeNumber(lineIndex, number) {
    this.data[lineIndex] = this.data[lineIndex].replace(
      number,
      ".".repeat(number.length)
    );
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
          neighbours.push(this.data[y][x]);
        }
      }
    }
    return neighbours;
  }

  nextToSymbol(neighbours) {
    let notASymbol = ".0123456789";
    for (let n = 0; n < neighbours.length; n++) {
      let neighbour = neighbours[n];
      if (!notASymbol.includes(neighbour)) return true;
    }
    return false;
  }

  examineNumber(number, pos) {
    const neighbours = this.getNeighbours(pos);
    if (this.nextToSymbol(neighbours)) this.count += parseInt(number);
  }

  examineLine(line, lineIndex) {
    let numbers = this.findNumbers(line);
    if (!numbers) return;
    for (let number of numbers) {
      let pos = this.getNumberPosition(line, lineIndex, number);
      this.examineNumber(number, pos);
      this.removeNumber(lineIndex, number);
    }
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

    }
    console.log(this.count);
  }
}

const puzzle = new Puzzle();
puzzle.run();
