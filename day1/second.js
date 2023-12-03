class Puzzle {
 
    constructor(){
        this.count = 0;
        this.numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        this.backwardNumbers = this.numbers.map(number => number.split("").reverse().join(""));
    }

    async getData() {
        const data = await fetch('https://adventofcode.com/2023/day/1/input');
        return data.text();
    }
 
    invertString(str){
        return str.split("").reverse().join("");
    }

    getFirstNumber(line) {
        return line.match(/[0-9]+/)[0][0];
    }
 
    getLastNumber(line) {
        let reversed = this.invertString(line);
        return this.getFirstNumber(reversed);
    }
 
    transformNumbers(line){
        return this.transformFirst(this.transformLast(line));
    }

    transformFirst(line){
        return line.replace(/(one|two|three|four|five|six|seven|eight|nine)/, (match) => this.numbers.indexOf(match) + 1)
    }

    transformLast(line){
        return this.invertString(this.invertString(line).replace(/(eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)/, (match) => this.backwardNumbers.indexOf(match) + 1));
    }

    examineLine(line) {
        let first = this.getFirstNumber(line);
        let last = this.getLastNumber(line);
        this.count += parseInt(first.toString()+last.toString());
        console.log(line, first+last, this.count);
    }

    async prepareData(){
        const data = await this.getData();
        return data.split('\n');
    }
 
    async run() {
        const data = await this.prepareData();
        for(let line of data) {
            if(line){
                let transformedLine = this.transformNumbers(line);
                this.examineLine(transformedLine);
            }
        }
        console.log(this.count);
    }
}

const puzzle = new Puzzle();

puzzle.run();