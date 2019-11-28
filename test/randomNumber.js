
function generateRandom() {
    return Math.ceil(Math.random() * 5);
}

for(let i=0; i<20; i++) {
    console.log(generateRandom());
}