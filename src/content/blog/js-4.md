---
title: ES6 Features
description: ""
pubDate: 2025-03-12T21:05:59.668Z
image: "/images/blog/js.png"
categories: ["Javascript"]
---

ES6 is an important update to JavaScript that introduced various features to improve development productivity and make code more concise and readable.

## 1. let and const

These are variable declaration methods with **block scope**, replacing var.

- **let**: Can be reassigned
- **const**: Cannot be reassigned (constant)

```javascript
let a = 10;
a = 20; // Possible

const b = 30;
b = 40; // Error: Cannot reassign to a constant
```

## 2. Arrow Functions

A concise function expression where **this retains the upper scope**.

```javascript
// Regular function
function sum(a, b) {
  return a + b;
}

// Arrow function
const sum = (a, b) => a + b; // return can be omitted for single expressions

// Parentheses can be omitted for a single parameter
const square = x => x * x;

// Empty parentheses are required when there are no parameters
const sayHello = () => console.log("Hello!");
```

## 3. Template Literals

Useful for string interpolation and writing multi-line strings.

```javascript
const name = "Alice";
const age = 25;

// String interpolation
console.log(`My name is ${name} and I am ${age} years old.`);

// Multi-line string
const multiLine = `
  This is a 
  multi-line string.
`;
```

**Pre-ES6 method:**

```javascript
const name = "Alice";
const age = 25;

console.log("My name is " + name + " and I am " + age + " years old.");

const multiLine = "This is a \nmulti-line string.";
// Or
const multiLine = [
  "This is a",
  "multi-line string."
].join("\n");
```

## 4. Destructuring Assignment

Breaking down arrays or objects and assigning their values to variables.

Personal experience: I frequently use this for better readability.

### Array Destructuring

```javascript
const arr = [1, 2, 3];
const [a, b, c] = arr;

console.log(a); // 1
console.log(b); // 2
console.log(c); // 3

// Default values
const [x, y, z = 10] = [1, 2];
console.log(z); // 10
```

### Object Destructuring

```javascript
const person = { name: "Bob", age: 30 };
const { name, age } = person;

console.log(name); // "Bob"
console.log(age);  // 30

// Assigning to variables with different names
const { name: fullName, age: yearsOld } = person;
console.log(fullName); // "Bob"
console.log(yearsOld); // 30
```

## 5. Spread Operator (...)

Used to **copy** or **merge** arrays or objects.

### Arrays

```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4]
```

### Objects

```javascript
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3 };
const merged = { ...obj1, ...obj2 }; // { a: 1, b: 2, c: 3 }
```

## 6. Default Parameters

Set default values for function parameters.

```javascript
function greet(name = "Guest") {
  console.log(`Hello, ${name}!`);
}

greet();           // Hello, Guest!
greet("Charlie");  // Hello, Charlie!
```

## 7. Classes

ES6 introduced classes for object-oriented programming.

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old.`);
  }
}

const alice = new Person("Alice", 25);
alice.greet(); // Hi, I'm Alice and I'm 25 years old.
```

## 8. Modules (Import/Export)

A standard way to share code between files.

### Default Export and Import

```javascript
// math.js
export default function add(a, b) {
  return a + b;
}

// main.js
import add from './math.js';
console.log(add(2, 3)); // 5
```

### Named Exports and Imports

```javascript
// math.js
export const pi = 3.14;
export function multiply(a, b) {
  return a * b;
}

// main.js
import { pi, multiply } from './math.js';
console.log(pi); // 3.14
console.log(multiply(2, 3)); // 6
```

## 9. Promise

An object for handling asynchronous operations.

```javascript
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("Data fetched!"), 1000);
  });
};

fetchData()
  .then(data => console.log(data)) // Data fetched!
  .catch(error => console.error(error));
```

## 10. async/await

A way to write asynchronous operations in a synchronous manner.

```javascript
const fetchData = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchData();
```

## 11. Map and Set

Personal experience: I find these useful for algorithm HashTable problems.

### Map - An object that stores key-value pairs

```javascript
const map = new Map();
map.set('key1', 'value1');
map.set('key2', 'value2');
console.log(map.get('key1')); // value1
```

### Set - A collection of unique values

```javascript
const set = new Set([1, 2, 3, 3]);
console.log(set); // Set { 1, 2, 3 }
```

## 12. Symbol

Creates unique and immutable identifiers.

```javascript
const sym1 = Symbol('id');
const sym2 = Symbol('id');
console.log(sym1 === sym2); // false
```

## 13. Iterators and Generators

### Iterators

```javascript
const iterable = [1, 2, 3];
const iterator = iterable[Symbol.iterator]();
console.log(iterator.next()); // { value: 1, done: false }
```

### Generators

```javascript
function* generator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = generator();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
```

## 14. Rest Parameters

Handles variable arguments as an array.

```javascript
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4)); // 10
```