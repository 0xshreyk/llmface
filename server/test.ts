const a : boolean = false;
const b : boolean = true;

const result : string = (a) ? ((b) ? 'yes' : 'no') : 'no';
const result2 : string = (a && b) ? 'yes' : 'no';
console.log(result === result2);
