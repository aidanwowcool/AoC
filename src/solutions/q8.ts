import * as fs from 'fs';
import * as path from 'path';

function syncReadFile(filename: string): string[] {
    const content = fs.readFileSync(path.resolve(process.cwd(), filename), 'utf-8');
    const arr = content.split(/\r\n/);
    return arr;
}

//bleagh

export function main() {
    const data = syncReadFile('src/data/q8.txt');
    const visibleArr: string[][] = new Array(data.length).fill("").map(x => new Array(data.length).fill(""));
    for(let a = 1; a < data.length - 1; a++) {
        let row = data[a].split('').map(x => parseInt(x));
        let currlargest = row[0];
        for(let b = 1; b < row.length - 1; b++) {
            if(currlargest < row[b]) {
                visibleArr[a][b] = "V";
                currlargest = row[b]
            }
        }
        currlargest = row[row.length - 1];
        for(let b = row.length - 2; b > 0; b--) {
            if(currlargest < row[b]) {
                visibleArr[a][b] = "V";
                currlargest = row[b];
            }
        }
    }
    for(let a = 1; a < data[0].length - 1; a++) {
        let row = data.map(x => x[a]).map(x => parseInt(x));
        let currlargest = row[0];
        for(let b = 1; b < row.length - 1; b++) {
            if(currlargest < row[b]) {
                visibleArr[b][a] = "V";
                currlargest = row[b];
            }
        }
        currlargest = row[row.length - 1];
        for(let b = row.length - 2; b > 0; b--) {
            if(currlargest < row[b]) {
                visibleArr[b][a] = "V";
                currlargest = row[b];
            }
        }
    }
    return visibleArr.flat().filter(x => x === 'V').length + data.length * 4 - 4;
}

function getScenicScore(x:number ,y:number , data:string[]) {
    let sscore = [0,0,0,0];
    const value = parseInt(data[x][y]);
    let nblocked = false;
    let sblocked = false;
    let eblocked = false;
    let wblocked = false;
    let xn = x-1;
    let xs = x+1;
    let ye = y+1;
    let yw = y-1;
    while(!(nblocked && sblocked && eblocked && wblocked)){
        if(xn >= 0 && !nblocked && value > parseInt(data[xn][y])){
            sscore[0]++;
            xn--
        } else {
            if(!nblocked && xn >= 0) sscore[0]++;
            nblocked = true;
        }
        if(xs <= 98 && !sblocked && value > parseInt(data[xs][y])){
            sscore[1]++;
            xs++
        } else {
            if(!sblocked && xs <= data.length - 1) sscore[1]++;
            sblocked = true;
        }
        if(ye <= 98 && !eblocked && value > parseInt(data[x][ye])){
            sscore[2]++;
            ye++
        } else {
            if(!eblocked && ye <= data.length - 1) sscore[2]++;
            eblocked = true;
        }
        if(yw >= 0 && !wblocked && value > parseInt(data[x][yw])){
            sscore[3]++;
            yw--
        } else {
            if(!wblocked && yw >= 0) sscore[3]++;
            wblocked = true;
        }
    }
    return sscore.reduce((prev, curr) => prev * curr, 1);
}

export function main2() {
    const data = syncReadFile('src/data/q8.txt');
    const visibleArr: number[][] = new Array(data.length).fill(0).map(x => new Array(data.length).fill(0));
    for(let i = 0; i < data.length; i++) {
        for(let j = 0; j < data[0].length; j++)
        visibleArr[i][j] = getScenicScore(i,j,data);
    }
    return Math.max(...visibleArr.flat());
}

