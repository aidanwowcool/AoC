import * as fs from 'fs';
import * as path from 'path';

interface Node {
    parentPos: number;
    size: number;
}

function syncReadFile(filename: string): string[] {
    const content = fs.readFileSync(path.resolve(process.cwd(), filename), 'utf-8');
    const arr = content.split(/\r\n/);
    return arr;
}

function handleInput(lines: string[]) {
    let root = {
        parentPos: -1,
        size: 0
    } as Node;
    let nodes: Node[] = [root];
    let currentPos = 0;
    for(let i = 1; i < lines.length; i++) {
        const parsedLine = lines[i].split(" ");
        const command = parsedLine[0];
        if(command === '$' ){ //add new node
            if(parsedLine[1] === "cd") {
                if(parsedLine[2] !== "..") {
                    let newNode = {
                        parentPos: currentPos,
                        size: 0
                    } as Node;
                    nodes.push(newNode);
                    currentPos = nodes.length - 1;
                    
                } else {
                    currentPos = nodes[currentPos].parentPos;
                }
            }
        } else if (command === 'dir') {
            //skip
        } else { //add sizes down to root
            let currentSize = parseInt(command);
            let parent = nodes[currentPos].parentPos;
            nodes[currentPos].size += currentSize
            while(parent != -1) {
                nodes[parent].size += currentSize;
                parent = nodes[parent].parentPos;
            }
        }
    }

    return nodes;
}

export function main() {
    const data = syncReadFile('src/data/q7.txt');
    const nodeTree = handleInput(data);
    return nodeTree.reduce((prev,curr) => {
        if(curr.size <= 100000) return curr.size + prev;
        else return prev;
    }, 0)
}

export function main2() {
    const TOTAL_SPACE = 70000000;
    const UPDATE_SPACE = 30000000;
    const data = syncReadFile('src/data/q7.txt');
    const nodeTree = handleInput(data);
    const AVAIL_SPACE = TOTAL_SPACE - nodeTree[0].size;
    const NEEDED_SPACE = UPDATE_SPACE - AVAIL_SPACE
    return Math.min(...nodeTree.map(y => y.size).filter(x => x > NEEDED_SPACE));
}