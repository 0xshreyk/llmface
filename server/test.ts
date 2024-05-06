/*
const a : boolean = false;
const b : boolean = true;

const result : string = (a) ? ((b) ? 'yes' : 'no') : 'no';
const result2 : string = (a && b) ? 'yes' : 'no';
console.log(result === result2);
*/

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // Months are zero-based
const day = currentDate.getDate();

console.log(`${year}-${month}-${day}`);
