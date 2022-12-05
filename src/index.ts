import {main, main2} from './solutions/q5';

const timeStartP1 = Date.now();
const resultsP1 = main();
const timeEndP1 = Date.now();

const timeStartP2 = Date.now();
const resultsP2 = main2();
const timeEndP2 = Date.now();

console.log(`Part 1 result: ${resultsP1} in ${timeEndP1 - timeStartP1}`);
console.log(`Part 2 result: ${resultsP2} in ${timeEndP2 - timeStartP2}`);