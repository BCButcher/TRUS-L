//import "https://use.fontawesome.com/releases/v5.8.2/css/all.css";

function generateStars(rows) {
    let starsCount = rows.reduce((a, b) => a + b, 0);
    console.log(starsCount);
    let starsAverage = (starsCount / rows.length).toFixed(1);
    console.log(starsAverage);
    let stars = [];
    for(let i=0; i<Math.floor(starsAverage); i++) {
      stars.push('<i class="fas fa-star"></i>');
    }
    if(parseInt(starsAverage) < starsAverage) {
      stars.push('<i class="fas fa-star-half-alt"></i>'); 
    }

    let remainingStars = 5 - stars.length;
    for(let i=0; i<remainingStars; i++){
        stars.push('<i class="far fa-star"></i>');
    }
    return stars.join('').toString();  
}

let rows = [5, 4, 5, 4, 5];
console.log(generateStars(rows));

rows = [1, 2, 3, 1, 2];
console.log(generateStars(rows));

