class Puzzle1 {
 
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

    replaceStrings(line){
        const map = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        let transformedLine = line;
        for(let i=0; i<map.length; i++){
            let string = map[i];
            transformedLine = transformedLine.replaceAll(string, i+1);
        }
        return transformedLine;
    }

    async prepareData(){
        const data = await this.getData();
        return data.split('\n');
    }
 
    async run() {
        const data = await this.prepareData();
        for(let line of data) {
            if(line){
                this.examineLine(this.replaceStrings(line));
            }
        }
        console.log(this.count);
    }
}
