class Puzzle {
	constructor(){
		this.limits = {
			red: 12,
			green: 13,
			blue: 14,
		};
		this.data = [];
		this.possibleIdCount = 0;
	}

	async getData(){
		const data = await fetch('https://adventofcode.com/2023/day/2/input');
		return data.text();
	}

	async prepareData(){
		const data = await this.getData();
		const dataArray = data.split('\n');
		return this.extractData(dataArray);
	}

	getId(line){
		return line.split(':')[0].split(' ')[1];
	}

	getDraws(line) {
		let draws = [];
		let games = line.split(':')[1].split(';');
		for(let game of games){
			let results = game.split(',');
			let draw = {};
			for(let result of results){
				let [_, value, color] = result.split(' ');
				draw[color] = value;
			}
			draws.push(draw);
		}
		return draws;
	}

	extractData(dataArray) {
		for(let line of dataArray) {
			if(line){
				let lineData = {id: this.getId(line), draws: this.getDraws(line)};
				this.data.push(lineData);
			}
		}
	}

	isPossible(line){
		for(let i = 0; i < line.draws.length; i++){
			let draw = line.draws[i];
			for(let key of Object.keys(draw)){
				if(draw[key] > this.limits[key]) return false;
			}
		}
		return true;
	}

	async run(){
		await this.prepareData();
		for(let line of this.data){
			if(this.isPossible(line)){
				this.possibleIdCount += parseInt(line.id);
			}
		}
		console.log(this.possibleIdCount);
	}
}

const puzzle = new Puzzle();

puzzle.run();