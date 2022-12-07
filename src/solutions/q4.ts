import * as fs from 'fs';
import * as path from 'path';

function syncReadFile(filename: string): string[] {
    const content = fs.readFileSync(path.resolve(process.cwd(), filename), 'utf-8');
    const arr = content.split(/\r\n/);
    return arr;
}

export function main() {
    const data = syncReadFile('src/data/q4.txt');
    return data.filter((line) => {
        const parseLine = line.split(",").map(x => x.split('-')).flat().map(y => parseInt(y));
        if(parseLine[0] <= parseLine[2] && parseLine[1] >= parseLine[3]){
            return true;
        } else if (parseLine[0] >= parseLine[2] && parseLine[1] <= parseLine[3]) {
            return true
        } else {
            return false;
        }
    }).length;
}

export function main2() {
    const data = syncReadFile('src/data/q4.txt');
    return data.filter((line) => {
        const parseLine = line.split(",").map(x => x.split('-')).flat().map(y => parseInt(y));

        if(parseLine[0] < parseLine[2] && parseLine[0] < parseLine[3] && parseLine[1] < parseLine[2] && parseLine[1] < parseLine[3]){
            return false;
        } else if (parseLine[0] > parseLine[2] && parseLine[0] > parseLine[3] && parseLine[1] > parseLine[2] && parseLine[1] > parseLine[3]) {
            return false
        } else {
            return true;
        }
    }).length;
}