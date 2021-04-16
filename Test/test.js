function getK(i) {
    let k = 0;
    if(i>1) k = k + (i-2);
    return k;
}

let x = [   
            ['x','x','x','x','x'],
            ['x','x','x','x','x'],
            ['x','x','x','x','x'],
            ['x','x','x','x','x'],
            ['x','x','x','x','x']
        ];

for (let i = 0; i < x.length; i++) {
    for (let j = 0; j < x.length; j++) {
        if(i===j) {
            if(i%2===0) x[i][j] = (x.length * 10);
            else if(i%2===1) x[i][j] = 0;
        }
        if(i<j) {

        }  
        if(i>j) {
            let k = getK(i);
            x[i][j] = i + j + k;
        }
    }  
}

for(const element of x) {
    console.log(`${element[0]} ${element[1]} ${element[2]} ${element[3]} ${element[4]}`);
}