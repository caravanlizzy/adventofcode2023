"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const getData_1 = require("../getData");
class Solver {
    constructor() {
        this.map = [];
        this.replacements = {};
        this.directions = '';
    }
    getData() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, getData_1.getData)(8);
        });
    }
    prepareData() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.getData();
            const parsedData = this.parseData(data);
            this.setDirections(data);
            this.setReplacementMap(parsedData);
            this.setMap(parsedData);
        });
    }
    parseData(data) {
        let split = data.split('\n');
        split.shift();
        split.shift();
        split.pop();
        return split.map((e) => [e.split('=')[0].trim(), e.split('=')[1].split(',')[0].trim().slice(1), e.split('=')[1].split(',')[1].trim().slice(0, 3)]);
    }
    setMap(parsedData) {
        for (let row of parsedData) {
            let leftKey = row[1];
            let rightKey = row[2];
            this.map.push([this.replacements[leftKey], this.replacements[rightKey]]);
        }
    }
    setReplacementMap(parsedData) {
        for (let i = 0; i < parsedData.length; i++) {
            this.replacements[parsedData[i][0]] = i;
        }
    }
    getPosition(id) {
        return this.replacements[id];
    }
    setDirections(data) {
        this.directions = data.split('\n')[0].trim();
        this.directions = this.directions.replaceAll('L', '0');
        this.directions = this.directions.replaceAll('R', '1');
    }
    findNext(current, direction) {
        return this.map[current][direction];
    }
    getDirection(counter) {
        return parseInt(this.directions[counter % this.directions.length]);
    }
    runFirst() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prepareData();
            let counter = 0;
            let position = this.getPosition('AAA');
            const final = this.getPosition('ZZZ');
            while (position !== final) {
                const direction = this.getDirection(counter);
                position = this.findNext(position, direction);
                counter++;
            }
            console.log(counter);
        });
    }
    getPositions(endsWith) {
        let positions = [];
        for (let [key, pos] of Object.entries(this.replacements)) {
            if (key[2] === endsWith)
                positions.push(pos);
        }
        return positions;
    }
    checkDone(positions, finals) {
        for (let i = 0; i < positions.length; i++) {
            if (!finals.includes(positions[i]))
                return false;
        }
        return true;
    }
    findMultiNext(positions, direction) {
        return positions.map((e) => this.findNext(e, direction));
    }
    runSecond() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prepareData();
            let counter = 0;
            let positions = this.getPositions('A'); // initial positions
            let finals = this.getPositions('Z');
            let done = false;
            while (!done) {
                const direction = this.getDirection(counter);
                positions = this.findMultiNext(positions, direction);
                counter++;
                done = this.checkDone(positions, finals);
            }
            console.log(counter);
        });
    }
}
const solver = new Solver();
// solver.runFirst();
solver.runSecond();
