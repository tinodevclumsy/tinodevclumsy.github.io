---
title: JavaScript Promise - Asynchronous Processing and Concept Overview
description: 'I successfully implemented login with OAuth and issued tokens.'
pubDate: 'Feb 26 2025'
image: "/images/blog/js.png"
---

# JavaScript Promise: Asynchronous Processing and Concept Overview

This article is a summary of my studies, briefly explaining JavaScript's asynchronous processing and Promises. 😊

## Background of Asynchronous Processing and the Emergence of Promises

JavaScript's asynchronous processing initially used callback patterns, but the Callback Hell problem made code readability and maintenance difficult. To solve this, Promises were introduced in ES6.

## Tasks Requiring Asynchronous Processing
* Timer (setTimeout/setInterval)
* HTTP requests
* DOM event handling

These tasks run separately from the main thread, enabling parallel processing without interfering with other operations.

## Structure and Characteristics of Promises

### States
A Promise has four states:
* **pending**: Initial state, operation in progress
* **fulfilled**: Operation successfully completed (resolve called)
* **rejected**: Operation failed (reject called)
* **settled**: Operation completed (either fulfilled or rejected)

### Promise Chaining
A core feature of Promises to solve callback hell:

```javascript
// Promise example
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve('Data has been retrieved!');
      } else {
        reject('Error occurred!');
      }
    }, 1000);
  });
};

// Chaining example
fetchData()
  .then((result) => {
    console.log(result);
    return 'Proceeding to next step';
  })
  .then((nextStep) => {
    console.log(nextStep);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Promise Methods
Promises provide four main methods:
* resolve
* reject
* all: Executes multiple Promises in parallel
* race

### Characteristics of Promise.all
* Returns results as an array when all Promises succeed
* Immediately rejects if even one fails

## Key Features Learned After Advanced Promise Study
* The then() method ignores non-function arguments
* Even if ignored, the original state or value is passed to the next then or catch
* finally() doesn't accept arguments
* Promise state can only be changed once
* resolve/reject means a state change, not the termination of the promise itself

## Keywords
* Asynchronous
* Callback
* Event Loop
* Promise Chaining
* State Management
* Error Handling

## Reference
Modern JavaScript Deep Dive - 6.9 Promises