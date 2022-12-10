import * as fs from 'fs';
import * as path from 'path';

function syncReadFile(filename: string): string[] {
    const content = fs.readFileSync(path.resolve(process.cwd(), filename), 'utf-8');
    const arr = content.split(/\r\n/);
    return arr;
}

export function main() {
    const data = syncReadFile('src/data/q10.txt');
    let cycle = 0;
    let X = 1;
    const freqs: number[] = [];
    const stopAt = [20,60,100,140,180,220];
    data.forEach((line) => {
        if(line.charAt(0) === 'n') {
            cycle++;
            if(stopAt.some(x => x === cycle)) freqs.push(X);
        } else {
            const val = parseInt(line.substring(5));
            cycle++;
            if(stopAt.some(x => x === cycle)) freqs.push(X);
            cycle++;
            if(stopAt.some(x => x === cycle)) freqs.push(X);
            X += val
        }
    })
    return freqs.reduce((x,y,i) => x + y * (20 + 40 * (i)), 0);
}

function printRow(arr: string[]) {
    for(let i = 0; i < arr.length; i++) {
        if(i % 40 === 0) console.log();
        else process.stdout.write(arr[i]);
    }
};

export function main2() {
    const drawSprite = (s:number , c:number) : boolean => {
        return s === c || s-1 === c || s+1 === c
    };
    const data = syncReadFile('src/data/q10.txt');
    let cycle = 0;
    let sprite = 1;
    const row: string[] = [];
    data.forEach((line) => {
        if(line.charAt(0) === 'n') {
            cycle++;
            drawSprite(sprite, (cycle-1)%40) ? row.push('#') : row.push('.');
        } else {
            const val = parseInt(line.substring(5));
            cycle++;
            drawSprite(sprite, (cycle-1)%40) ? row.push('#') : row.push('.');
            cycle++;
            drawSprite(sprite, (cycle-1)%40) ? row.push('#') : row.push('.');
            sprite+=val
        }
    })
    printRow(row);
}