---
title: JavaScript Array Methods Summary
description: ""
pubDate: 2025-03-02T02:33:52.440Z
image: "/images/blog/js.png"
---

### 1\. `push()`
- Adds values to the end of an array and returns the new length of the array.
```js
let numbers = [1, 2, 3];
numbers.push(4, 5, 6); // return 6
// numbers: [1, 2, 3, 4, 5, 6]
```

### 2\. `pop()`
- Removes the last element from an array and returns the removed element.
```js
let numbers = [1, 2, 3, 4];
numbers.pop(); // removes 4
let removedNumber = numbers.pop(); // 3
```

### 3\. `unshift()`
- Adds elements to the beginning of an array and returns the new length.
```js
let numbers = [2, 3, 4];
numbers.unshift(1); // return 4
// numbers: [1, 2, 3, 4]
```

### 4\. `shift()`
- Removes the first element from an array and returns the removed element.
```js
let numbers = [1, 2, 3, 4];
numbers.shift(); // removes 1
let removedNumber = numbers.shift(); // 2
```

### 5\. `concat()`
- Merges two or more arrays and returns a new array. (original arrays remain unchanged)
```js
let numbers1 = [1, 2, 3];
let numbers2 = [4, 5, 6];
let combinedNumbers = numbers1.concat(numbers2); // [1, 2, 3, 4, 5, 6]
```

### 6\. `slice()`
- Extracts a section of an array and returns a new array. (original array remains unchanged)
- `slice(startIndex, endIndex)`: Includes elements up to but not including `endIndex`.
```js
let numbers = [1, 2, 3, 4, 5];
let slicedNumbers = numbers.slice(1, 4); // [2, 3, 4]
let slicedNumbers2 = numbers.slice(2); // [3, 4, 5]
let slicedNumbers3 = numbers.slice(-2); // [4, 5]
```

### 7\. `splice()`
- Used to add or remove elements from an array and modifies the original array.
- `splice(startIndex, deleteCount, item1, item2, ...)`
```js
let numbers = [1, 2, 3, 4, 5];
let splicedNumbers = numbers.splice(2, 2, 6, 7);
console.log(numbers); // [1, 2, 6, 7, 5]
console.log(splicedNumbers); // [3, 4]
```

### 8\. `fill()`
- Fills an array with a specific value.
- `fill(value, start, end)`: Fills from `start` up to but not including `end`.
```js
let fillArray = new Array(5).fill(0); // [0, 0, 0, 0, 0]
let fillArrayByRange = [1, 2, 3, 4, 5];
fillArrayByRange.fill(0, 1, 3); // [1, 0, 0, 4, 5]
```

### 9\. `join()`, `split()`, `reverse()`
- `join(separator)`: Converts array to string
- `split(separator)`: Converts string to array
- `reverse()`: Reverses an array (modifies original array)
```js
const strArr = "abc".split(''); // ['a', 'b', 'c']
const joinedStr = strArr.join(','); // "a,b,c"
const reversedStr = strArr.reverse().join(''); // "cba"
```

### 10\. `sort()`
- Sorts an array. By default, sorts as strings; for numbers, use a comparison function.
```js
let numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
numbers.sort((a, b) => a - b); // [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]
```

### 11\. `indexOf()`, `lastIndexOf()`
- Returns the index of a specific element, or `-1` if not found
- `lastIndexOf()` searches from the end of the array
```js
let fruits = ['apple', 'banana', 'orange', 'apple', 'grape'];
const lastIndex = fruits.lastIndexOf('apple'); // 3
const kiwiIndex = fruits.indexOf('kiwi'); // -1
```

### 12\. `findIndex()`
- Returns the index of the first element that satisfies a condition.
```
let numbers = [10, 20, 30, 40, 50];
const index = numbers.findIndex(element => element > 30); // 3
```

### 13\. `find()`
- Returns the first element that satisfies a condition.
```js
let persons = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];
const foundPerson = persons.find(person => person.name === 'Charlie');
console.log(foundPerson); // { id: 3, name: 'Charlie' }
```

### 14\. `some()`, `every()`
- `some()`: Returns `true` if at least one element satisfies the condition
- `every()`: Returns `true` only if all elements satisfy the condition
```js
const array1 = [1, 2, 3, 4, 5];
const result1 = array1.some(element => element > 4); // true
const result2 = array1.every(element => element > 4); // false
```

### 15\. `map()`
- Transforms each element and returns a new array.
```js
const numbers = [1, 2, 3, 4, 5];
const squaredNumbers = numbers.map(num => num * num); // [1, 4, 9, 16, 25]
```

### 16\. `reduce()`
- Accumulates array values into a single value.
```js
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, curr) => acc + curr, 0); // 15
```

### 17\. `filter()`
- Returns a new array with elements that satisfy a condition.
```js
const numbers = [1, 2, 3, 4, 5, 6];
const evenNumbers = numbers.filter(num => num % 2 === 0); // [2, 4, 6]
```