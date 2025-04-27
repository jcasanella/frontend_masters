// Type JavaScript here and click "Run Code" or press Ctrl + s
console.log('Hello, world!');


// Challenge 1
function addTwo(num) {
	return num + 2;
}

// To check if you've completed it, uncomment these console.logs!
console.log(addTwo(3));
console.log(addTwo(10));


// Challenge 2
function addS(word) {
	return word + "s";
}

// uncomment these to check your work
console.log(addS('pizza'));
console.log(addS('bagel'));


// Challenge 3
function map(array, callback) {
	const output = [];
  
  for (const elem of array) {
    output.push(callback(elem));
  }
  
  return output;
}

console.log(map([1, 2, 3], addTwo));


// Challenge 4
function forEach(array, callback) {
	const output = [];
  
  for (const elem of array) {
    output.push(callback(elem));    
  }
}

// see for yourself if your forEach works!
let alphabet = '';
const letters = ['a', 'b', 'c', 'd'];
forEach(letters, function(char) {
  alphabet += char;
});
console.log(alphabet);   //prints 'abcd'


// Challenge 5
function mapWith(array, callback) {
	const output = [];
  forEach(array, elem => output.push(callback(elem)));
  return output;
}

console.log(map([1, 2, 3], addTwo));

// Challenge 6
function reduce(array, callback, initialValue) {
	let result = initialValue;
  
  for(const elem of array) {
      result = callback(result, elem);
  }
  
  return result;
}

const nums = [4, 1, 3];
const add = function(a, b) { return a + b; }
console.log(reduce(nums, add, 0));   //-> 8


// Challenge 7
function intersection(arrays) {
	return arrays.reduce((acc, currentValue) => currentValue.filter(elem => acc.includes(elem)));
}

console.log(intersection([[5, 10, 15, 20], [15, 88, 1, 5, 7], [1, 10, 15, 5, 20]]));
// should log: [5, 15]


// Challenge 8
function union(arrays) {
	return arrays.reduce((acc, currentValue) => {
    const elems = currentValue.filter(elem => !acc.includes(elem));
    return acc.concat(elems);
  });
}

console.log(union([[5, 10, 15], [15, 88, 1, 5, 7], [100, 15, 10, 1, 5]]));
// should log: [5, 10, 15, 88, 1, 7, 100]


// Challenge 9
function objOfMatches(array1, array2, callback) {
  const match = {};
  
  for(let idx=0; idx<array1.length; idx++) {
    const resCallback = callback(array1[idx]);
    if (resCallback === array2[idx]) {
  		match[array1[idx]] = array2[idx];      
    }
  }
	
  return match;
}

console.log(objOfMatches(['hi', 'howdy', 'bye', 'later', 'hello'], ['HI', 'Howdy', 'BYE', 'LATER', 'hello'], function(str) { return str.toUpperCase(); }));
// should log: { hi: 'HI', bye: 'BYE', later: 'LATER' }
