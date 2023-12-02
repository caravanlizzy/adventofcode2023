class Puzzle2 {
	constructor(){
		this.limits = {
			red: 12,
			green: 13,
			blue: 14,
		};
		this.data = [];
		this.powerSum = 0;
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

	findMinimum(line){
		let minimum = {blue:0, red:0, green:0};
		for(let draw of line.draws){
			for(let key of Object.keys(minimum)){
				if(parseInt(draw[key]) > minimum[key]){
					minimum[key] = parseInt(draw[key]);
				}
			}
		}
		return minimum;
	}

	minimumProduct(minimum){
		return minimum.blue*minimum.green*minimum.red
	}

	async run(){
		await this.prepareData();
		for(let line of this.data){
			let minimum = this.findMinimum(line);
			this.powerSum += this.minimumProduct(minimum);
		}
		console.log(this.powerSum);
	}
}
