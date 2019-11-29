function filterUnique( rows ) {
    rows.sort(
      function(a, b) {
        return a.id - b.id;
      }
    );
    console.log(rows.map(row => {console.log(row.id)}));

    for(let i=0; i<rows.length; i++) {
      let j=i+1;
      if(j>=rows.length) {
        break;
      }

      let row1 = rows[i];
      let row2 = rows[j];
      
      if(row1.id === row2.id) {
        rows.splice(i, 1); // remove the i-th element in the array
        i = i-1; // need to compare the previous element with the next element
      }
    }

    return rows;
}

// Sorted: 0, 1, 2, 3, 3, 3, 5, 5
// Unique: 0, 1, 2, 3, 5
let rows = [
  {id: 5},
  {id: 1},
  {id: 3},
  {id: 2},
  {id: 3},
  {id: 1},
  {id: 3},
  {id: 2},
  {id: 1},
  {id: 3},
  {id: 2},
  {id: 1},
  {id: 3},
  {id: 2},
  {id: 1},
  {id: 3},
  {id: 2},
  {id: 0},
  {id: 3},
  {id: 5}
];

console.log("original rows ", rows.map(row => {console.log(row.id)}));
console.log("uniqueRows ", filterUnique(rows).map(row => {console.log(row.id)}));

