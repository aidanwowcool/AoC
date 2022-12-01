import * as fs from 'fs';
import * as path from 'path';

function syncReadFile(filename: string): string[] {
    const content = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
    const arr = content.split(/\r\n\r\n/);
    return arr;
}

export function main() {
    const data = syncReadFile('../data/q1.txt');
    const sums = data.map((x) => {
        return x.split(/\r\n/).map(y => parseInt(y)).reduce((a,b) => a + b, 0);
    });
    return Math.max(...sums);
}

export function main2() {
    const data = syncReadFile('../data/q1.txt');
    const sums = data.map((x) => {
        return x.split(/\r\n/).map(y => parseInt(y)).reduce((a,b) => a + b, 0);
    });
    const sortedSums = sums.sort((x, y) => y - x);
    return sortedSums[0] + sortedSums[1] + sortedSums[2];
}