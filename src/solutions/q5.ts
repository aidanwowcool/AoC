import * as fs from 'fs';
import * as path from 'path';

function syncReadFile(filename: string): string[] {
    const content = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
    const arr = content.split(/\r\n/);
    return arr;
}

const startingPos = [
    ["D", "T", "W", "N", "L"].reverse(),
    ["H", "P", "C"].reverse(),
    ["J", "M", "G", "D", "N", "H", "P","W"].reverse(),
    ["L", "Q", "T", "N", "S", "W", "C"].reverse(),
    ["N", "C", "H", "P"].reverse(),
    ["B", "Q", "W", "M", "D", "N", "H", "T"].reverse(),
    ["L", "S", "G", "J", "R", "B", "M"].reverse(),
    ["T", "R", "B", "V", "G", "W", "N", "Z"].reverse(),
    ["L", "P", "N", "D", "G", "W"].reverse()
];

//had to create another because I didn't want to implement deep copy
const startingPos2 = [
    ["D", "T", "W", "N", "L"].reverse(),
    ["H", "P", "C"].reverse(),
    ["J", "M", "G", "D", "N", "H", "P","W"].reverse(),
    ["L", "Q", "T", "N", "S", "W", "C"].reverse(),
    ["N", "C", "H", "P"].reverse(),
    ["B", "Q", "W", "M", "D", "N", "H", "T"].reverse(),
    ["L", "S", "G", "J", "R", "B", "M"].reverse(),
    ["T", "R", "B", "V", "G", "W", "N", "Z"].reverse(),
    ["L", "P", "N", "D", "G", "W"].reverse()
];

export function main() {
    const data = syncReadFile('../data/q5.txt');
    //just get the numbers out of the input
    const dataNums = data.map(str => {
        const regex = new RegExp(/[0-9]+/g);
        const match = str.match(regex);
        return match ? [parseInt(match[0]), parseInt(match[1]), parseInt(match[2])] : [];
    });

    dataNums.forEach((step) => {
        for(let i = 0; i < step[0]; i++) {
            const curr = startingPos[step[1] - 1].pop();
            startingPos[step[2] - 1].push(curr!);
        }
    })

    return startingPos.map(x => x.pop());
}

export function main2() {
    const data = syncReadFile('../data/q5.txt');
    //just get the numbers out of the input
    const dataNums = data.map(str => {
        const regex = new RegExp(/[0-9]+/g);
        const match = str.match(regex);
        return match ? [parseInt(match[0]), parseInt(match[1]), parseInt(match[2])] : [];
    });

    dataNums.forEach((step) => {
        const curr = startingPos2[step[1]-1].splice(startingPos2[step[1]-1].length - step[0], step[0]);
        startingPos2[step[2]-1].push(...curr);
    });

    return startingPos2.map(x => x.pop());
}