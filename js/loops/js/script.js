const charac = '☕';
const lines = 10;

for(let l=0; l<lines; l++) {
    let rep = '';
    for(let c=0; c<=l; c++) {
        rep += charac;
    }

    console.log(rep);
}