export const timefunctions = (f1: () => any, f2: () => any) => {

    const timefn = (fn: () => any) => {
        const timeStart = Date.now();
        fn();
        const timeEnd = Date.now();
        return timeEnd - timeStart
    }
    
    let totalTime1 = 0;
    let totalTime2 = 0;
    for(let i = 0; i < 100; i++) {
        totalTime1 += timefn(f1);
        totalTime2 += timefn(f2);
    }

    console.log(`average time for part 1: ${totalTime1/100}`);
    console.log(`average time for part 2: ${totalTime2/100}`);
}