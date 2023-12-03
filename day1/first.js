class Puzzle {
 
    constructor(){
        this.count = 0;
    }
 
    async getData() {
        const data = await fetch('https://adventofcode.com/2023/day/1/input');
        return data.text();
    }
 
    getFirstNumber(line) {
        return line.match(/[0-9]+/)[0][0];
    }
 
    getLastNumber(line) {
        let reversed = line.split("").reverse().join("");
        return this.getFirstNumber(reversed);
    }
 
    examineLine(line) {
        let first = this.getFirstNumber(line);
        let last = this.getLastNumber(line);
        this.count += parseInt(first+last);
    }
 
    async run() {
        const data = await this.getData();
        const dataArray = data.split('\n');
	console.log(dataArray);
        for(let line of dataArray) {
            if(line){
                this.examineLine(line);
            }
        }
        console.log(this.count);
    }
}

const puzzle = new Puzzle();

puzzle.run();
