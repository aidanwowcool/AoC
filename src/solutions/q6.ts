import * as fs from 'fs';
import * as path from 'path';

function syncReadFile(filename: string): string {
    return fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
}

function doTheThing(size: number) {
    const data = syncReadFile('../data/q6.txt');
    let currString = data.substring(0,size).split('');
    for(let i = size; i < data.length; i++){
        let numdups = currString.filter((x, i) => 
            currString
                .slice(i+1, size)
                .some((y) => y === x))
            .length;
        if(numdups < 1) {
            return i;
        } else {
            currString.shift();
            currString.push(data[i]);
        }
    }
}

export function main() {
    return doTheThing(4);
}

export function main2() {
    return doTheThing(14);
}