class Puzzle{
	constructor(){
		this.dataLines = 0;
		this.lineLength = 0;
		this.data = [];
		this.count = 0;
	}


	async getData(){
		const data = await fetch('https://adventofcode.com/2023/day/3/input');
		return data.text();
	}

	async prepareData(){
		const data = await this.getData();
		this.data = data.split('\n');
		this.data.pop();
		this.dataLines = this.data.length;
		this.lineLength = this.data[0].length;
	}

	findNumbers(line){
		return line.match(/\d+/g);
	}

	getNumberPosition(line, lineIndex, number){
		return {line:lineIndex, index: line.indexOf(number), size:number.length};
	}

	isFirstLine(pos){
		return pos.line === 0;
	}

	isLastLine(pos){
		console.log(pos.line, this.dataLines);
		if(pos.line === this.dataLines-1){
			console.log("this is the last line");
		}
		return pos.line === this.dataLines-1;
	}

	isFirstItem(pos){
		return pos.index === 0;
	}

	isLastItem(pos){
		return pos.index + pos.size === this.lineLength;
	}

	getAbove(pos){
		if(this.isFirstLine(pos)) return [];
		return [...this.data[pos.line-1].slice(pos.index, pos.index + pos.size)];
	}

	getBelow(pos){
		if(this.isLastLine(pos)) return [];
		return this.data[pos.line+1].slice(pos.index, pos.index + pos.size);
	}

	getLeft(pos){
		if(this.isFirstItem(pos)) return [];
		let left = [this.data[pos.line][pos.index-1]];
		if(!this.isFirstLine(pos)) left.push(this.data[pos.line-1][pos.index-1]);
		if(!this.isLastLine(pos)) left.push(this.data[pos.line+1][pos.index-1]);
		return left;
	}

	getRight(pos){
		if(this.isLastItem(pos)) return [];
		let right = [this.data[pos.line][pos.index + pos.size]];
		if(!this.isFirstLine(pos)) right.push(this.data[pos.line-1][pos.index + pos.size]);
		if(!this.isLastLine(pos)) right.push(this.data[pos.line+1][pos.index + pos.size]);
		return right;
	}

	getNeighbours(pos){
		return [...this.getAbove(pos), ...this.getBelow(pos), ...this.getLeft(pos), ...this.getRight(pos)]
	}

	nextToSymbol(neighbours){
		let notASymbol = '0123456789.';
		console.log(neighbours);
		for(let n = 0; n < neighbours.length; n++){
			let neighbour = neighbours[n];
			if(!notASymbol.includes(neighbour)) return true
		}
		return false;
	}

	examineNumber(number, pos){
		const neighbours = this.getNeighbours(pos);
		if(this.nextToSymbol(neighbours)) this.count += parseInt(number);
	}


	examineLine(line, lineIndex){
		let numbers = this.findNumbers(line);
		console.log(numbers);
		for(let number of numbers){
			let pos = this.getNumberPosition(line, lineIndex, number);
			this.examineNumber(number, pos);
		}
	}

	async run(){
		await this.prepareData();
		for(let lineIndex = 0; lineIndex < this.dataLines; lineIndex++){
			let line = this.data[lineIndex];
			if(line){
				this.examineLine(line, lineIndex);
			}
		}
		console.log(this.count);
	}
}

const puzzle = new Puzzle();
puzzle.run();