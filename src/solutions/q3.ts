import * as fs from 'fs';
import * as path from 'path';

function syncReadFile(filename: string): string[] {
    const content = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
    const arr = content.split(/\r\n/);
    return arr;
}

function getNumCode(str: string): number {
    const charToCode = str.charCodeAt(0);
    return charToCode >= 96 ? charToCode - 96 : charToCode - 38;
}

export function main() {
    const data = syncReadFile('../data/q3.txt');
    const chars = data.map((r) => {
        const len = r.length;
        const r1 = r.substring(0,len/2);
        const r2 = r.substring(len/2, len);
        const rgx = new RegExp(`[${r1}]`);
        const match = r2.match(rgx);
        if(match && match[0]) {
            return match[0];
        } else {
            return ""; //to appease the compiler
        }
    });
    return chars.reduce((acc, curr) => {
        return acc + getNumCode(curr);
    }, 0);
}

export function main2() {
    let sum = 0;
    const data = syncReadFile('../data/q3.txt');
    for(let i = 0; i < data.length; i+= 3) {
        const rgx = new RegExp(`(?=[${data[i]}])[${data[i+1]}]`);
        const match = data[i+2].match(rgx);
        if(match && match[0]) {
            sum += getNumCode(match[0]);
        }
    }
    return sum;
}