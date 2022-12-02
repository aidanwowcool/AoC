import * as fs from 'fs';
import * as path from 'path';

const values = new Map<string,number>();
values.set("A X", 4);
values.set("A Y", 8);
values.set("A Z", 3);
values.set("B X", 1);
values.set("B Y", 5);
values.set("B Z", 9);
values.set("C X", 7);
values.set("C Y", 2);
values.set("C Z", 6);

const values2 = new Map<string,number>();
values2.set("A X", 3);
values2.set("A Y", 4);
values2.set("A Z", 8);
values2.set("B X", 1);
values2.set("B Y", 5);
values2.set("B Z", 9);
values2.set("C X", 2);
values2.set("C Y", 6);
values2.set("C Z", 7);


function syncReadFile(filename: string): string[] {
    const content = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
    const arr = content.split(/\r\n/);
    return arr;
}

export function main() {
    const data = syncReadFile('../data/q2.txt');
    return data.reduce((x,y) => x + values.get(y)!, 0);
}

export function main2() {
    const data = syncReadFile('../data/q2.txt');
    return data.reduce((x,y) => x + values2.get(y)!, 0);
}