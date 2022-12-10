import * as fs from 'fs';
import * as path from 'path';

interface Pos {
    x: number;
    y: number;
}

function syncReadFile(filename: string): string[] {
    const content = fs.readFileSync(path.resolve(process.cwd(), filename), 'utf-8');
    const arr = content.split(/\r\n/);
    return arr;
}

function tFollowH(t:Pos, h:Pos): Pos {
    const xdiff = h.x - t.x;
    const ydiff = h.y - t.y;
    let newx = t.x;
    let newy = t.y;
    if(Math.max(Math.abs(xdiff), Math.abs(ydiff)) <= 1) return t;
    if(xdiff > 0) newx++;
    if(xdiff < 0) newx--;
    if(ydiff > 0) newy++;
    if(ydiff < 0) newy--;
    return {x: newx, y: newy} as Pos;
}

export function main() {
    const data = syncReadFile('src/data/q9.txt');
    const posMap = new Map<string,number>();
    let hpos = { x: 0, y: 0 } as Pos;
    let tpos = { x: 0, y: 0 } as Pos;
    data.forEach((line) => {
        const lineslpit = line.split(' ');
        const direction = lineslpit[0];
        let magnitude = parseInt(lineslpit[1]);
        while(magnitude > 0) {
            if(direction === 'U') {
                hpos = {x: hpos.x, y: hpos.y + 1} as Pos;
            } else if(direction === 'L') {
                hpos = {x: hpos.x - 1, y: hpos.y} as Pos;
            } else if(direction === 'R') {
                hpos = {x: hpos.x + 1, y: hpos.y} as Pos;
            } else {
                hpos = {x: hpos.x, y: hpos.y - 1} as Pos;
            }
            magnitude--;
            tpos = tFollowH(tpos, hpos);
            const posString = `${tpos.x},${tpos.y}`;
            posMap.has(posString) ? posMap.set(posString, posMap.get(posString)! + 1) : posMap.set(posString, 1);
        }
    })
    return posMap.size;

}

export function main2() {
    const data = syncReadFile('src/data/q9.txt');
    const posMap = new Map<string,number>();
    let hpos = { x: 0, y: 0 } as Pos;
    let tails: Pos[] = new Array(9).fill({x:0, y:0});
    data.forEach((line) => {
        const lineslpit = line.split(' ');
        const direction = lineslpit[0];
        let magnitude = parseInt(lineslpit[1]);
        while(magnitude > 0) {
            if(direction === 'U') {
                hpos = {x: hpos.x, y: hpos.y + 1} as Pos;
            } else if(direction === 'L') {
                hpos = {x: hpos.x - 1, y: hpos.y} as Pos;
            } else if(direction === 'R') {
                hpos = {x: hpos.x + 1, y: hpos.y} as Pos;
            } else {
                hpos = {x: hpos.x, y: hpos.y - 1} as Pos;
            }
            magnitude--;
            tails[0] = tFollowH(tails[0], hpos);
            for(let i = 1; i < tails.length; i++) {
                tails[i] = tFollowH(tails[i], tails[i-1]);
            }
            const posString = `${tails[8].x},${tails[8].y}`;
            posMap.has(posString) ? posMap.set(posString, posMap.get(posString)! + 1) : posMap.set(posString, 1);
        }
    })
    return posMap.size;

}